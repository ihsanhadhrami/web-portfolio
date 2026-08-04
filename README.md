# Portfolio v2

A production-ready personal portfolio for a modern web developer and digital
product engineer. Built with a dark-first, minimal aesthetic and a
data-driven architecture so content is trivial to maintain.

## Tech stack

- **React 19** + **TypeScript** (strict)
- **Vite 6** — fast dev server and optimized builds
- **Tailwind CSS v4** — design tokens via CSS variables, dark-first theme
- **shadcn/ui** conventions — `cn`, `class-variance-authority`, Radix `Slot`
- **Framer Motion** — subtle, reduced-motion-aware animations
- **React Router 7** — code-split routes
- **Lucide** — icons

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the dev server                     |
| `npm run build`        | Type-check and build for production      |
| `npm run preview`      | Preview the production build locally     |
| `npm run lint`         | Lint the project with ESLint             |
| `npm run format`       | Format the project with Prettier         |
| `npm run typecheck`    | Type-check without emitting              |

## Project structure

```
src/
├── app/              App root, router, entry point
├── assets/           Static images, icons, logos
├── components/
│   ├── ui/           Reusable primitives (Button, Card, Badge, …)
│   ├── layout/       Navbar, Footer, ThemeProvider, RootLayout
│   ├── sections/     Composed page sections (Hero, ContactForm, …)
│   ├── cards/        Domain cards (ProjectCard, ServiceCard, …)
│   └── animations/   Motion wrappers (Reveal, Stagger)
├── constants/        Site-wide config (nav, socials, metadata)
├── data/             Content: projects, services, skills, testimonials…
├── hooks/            Reusable hooks (useTheme, useReducedMotion, …)
├── lib/              Utilities (cn, motion tokens, theme context)
├── pages/            Route-level pages
├── styles/           Global CSS and theme tokens
└── types/            Shared domain types
```

## Editing content

All content lives in `src/data/*` and `src/constants/site.ts`. The UI renders
entirely from these files — add or edit a project in `src/data/projects.ts`
and it appears everywhere automatically (home grid, projects page, detail
route, related work).

## Deployment (Cloudflare Pages)

Deployed straight from GitHub by Cloudflare's standard build pipeline. All
configuration lives in the dashboard:

| Setting              | Value           |
| -------------------- | --------------- |
| Build command        | `npm run build` |
| Build output         | `dist`          |
| Root directory       | `/`             |
| Node version         | `22`            |

There is deliberately **no `wrangler.toml`**. The project has zero bindings,
so the file held nothing the dashboard does not already own — and its mere
presence makes Pages ignore the dashboard's environment variables and
secrets, which silently breaks the contact form. Add one only if a real
binding (KV, D1, R2, Durable Object) is ever introduced, and migrate every
dashboard value into it at the same time.

Routing and headers live in `public/_redirects` and `public/_headers`, which
are read from the publish root by **both** Cloudflare Pages and Netlify — so
the SPA fallback and security headers survive the migration. `netlify.toml`
retains build settings only and can be deleted once DNS has fully cut over.

### Contact form

Submissions are handled by a Cloudflare Pages Function at
`functions/api/contact.ts`, which relays the message through
[Resend](https://resend.com). This replaces Netlify Forms, which has no
Cloudflare equivalent.

Required environment variables (Workers & Pages → project → Settings →
Environment variables):

| Variable             | Notes                                          |
| -------------------- | ---------------------------------------------- |
| `RESEND_API_KEY`     | **Encrypted.** Never commit it.                 |
| `CONTACT_TO_EMAIL`   | Inbox that receives enquiries.                  |
| `CONTACT_FROM_EMAIL` | Must be on a domain verified in Resend.         |

Set all three in the dashboard, marking `RESEND_API_KEY` as **encrypted**. To
exercise the Function locally, put the same three in a `.dev.vars` file
(gitignored) and run `npm run build && npx wrangler pages dev dist`.

The form **never reports success unless the API confirms delivery** — it
requires a JSON `{ ok: true }` response, so a missing key or misconfigured
deploy surfaces a visible error rather than silently discarding enquiries.
Because the Function has no runtime under `vite preview`, the E2E suite stubs
the endpoint at the network layer rather than relying on app-level faking.

### SEO ownership

`index.html` owns the Open Graph and Twitter tags (social scrapers do not run
JavaScript, so they only ever see static HTML). The `<Seo>` component owns
`<title>`, the meta description, and the canonical link, so each route gets
its own. Declaring a tag in both places produces two conflicting copies —
`e2e/seo.spec.ts` asserts each appears exactly once. `sitemap.xml` is
generated at build time from `src/data/projects.ts`, so a new project can
never ship unindexed.
