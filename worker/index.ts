/**
 * Worker entry point.
 *
 * Ported verbatim from the Pages Function that previously lived at
 * functions/api/contact.ts. Pages Functions (file-based `onRequestPost`
 * handlers) are not supported on Workers, so the same logic is reached
 * through a single `fetch` handler instead. The request/response
 * contract is unchanged, so the client in
 * src/components/sections/contact-form.tsx needed no edits.
 *
 * Routing: wrangler.jsonc sets `run_worker_first: ["/api/*"]`, so only
 * /api/* reaches this code. Every other path is served from static
 * assets, falling back to index.html for client-side routes.
 *
 * Contract: POST JSON { name, email, message, company? } and receive
 * JSON { ok: true } on success, or { ok: false, error } with a non-2xx
 * status. The client treats anything that is not a JSON body with
 * ok:true as a failure, so a misconfigured deploy surfaces a visible
 * error instead of silently swallowing enquiries.
 */

interface Env {
  /** Resend API key. Set with `wrangler secret put`; never commit it. */
  RESEND_API_KEY?: string;
  /** Inbox that receives enquiries. */
  CONTACT_TO_EMAIL?: string;
  /** Verified sender on your Resend domain. */
  CONTACT_FROM_EMAIL?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Honeypot — real users never see or fill this. */
  company?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD = 5_000;

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });

/** Keep header-injection and oversized payloads out of the email body. */
function sanitize(value: unknown): string {
  return typeof value === 'string'
    ? value.replace(/[\r\n]+/g, ' ').trim().slice(0, MAX_FIELD)
    : '';
}

function validate(
  payload: Partial<ContactPayload>,
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  const name = sanitize(payload.name);
  const email = sanitize(payload.email);
  // Newlines are legitimate in a message body, so only trim and cap it.
  const message =
    typeof payload.message === 'string'
      ? payload.message.trim().slice(0, MAX_FIELD)
      : '';

  if (!name) return { ok: false, error: 'Name is required.' };
  if (!EMAIL_RE.test(email))
    return { ok: false, error: 'A valid email address is required.' };
  if (message.length < 10)
    return { ok: false, error: 'Message must be at least 10 characters.' };

  return { ok: true, data: { name, email, message } };
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: 'Malformed request body.' }, 400);
  }

  const payload = (raw ?? {}) as Partial<ContactPayload>;

  // Honeypot: bots fill every field they find. Return 200 so they get no
  // signal that they were caught, but send nothing.
  if (sanitize(payload.company)) return json({ ok: true }, 200);

  const result = validate(payload);
  if (!result.ok) return json({ ok: false, error: result.error }, 400);

  const { name, email, message } = result.data;
  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL;
  const from = env.CONTACT_FROM_EMAIL;

  // Fail loudly rather than pretending the message was delivered.
  if (!apiKey || !to || !from) {
    console.error('Contact form is missing required environment variables.');
    return json(
      { ok: false, error: 'The contact form is not configured correctly.' },
      500,
    );
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Portfolio Contact <${from}>`,
      to: [to],
      reply_to: email,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    console.error('Resend rejected the request', {
      status: response.status,
      body: await response.text(),
    });
    return json(
      { ok: false, error: 'Could not send the message. Please email directly.' },
      502,
    );
  }

  return json({ ok: true }, 200);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      // The Pages Function only ever exported onRequestPost, so anything
      // other than POST was a 405 there too.
      return request.method === 'POST'
        ? handleContact(request, env)
        : json({ ok: false, error: 'Method not allowed.' }, 405);
    }

    // Only /api/* is routed here, so this is an unknown API path — not a
    // page. Returning JSON keeps the contract consistent for callers.
    return json({ ok: false, error: 'Not found.' }, 404);
  },
} satisfies ExportedHandler<Env>;
