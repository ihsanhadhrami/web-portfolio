import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyEmailProps {
  email: string;
  className?: string;
}

/**
 * Email affordance that always does something useful: clicking copies
 * the address to the clipboard and shows a transient "Copied!"
 * confirmation, while the underlying `mailto:` still opens a compose
 * window for visitors who have a default mail client.
 */
export function CopyEmail({ email, className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — the mailto
      // navigation still fires, so the action degrades gracefully.
    }
  }

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleCopy}
      className={cn(
        'group inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary',
        className,
      )}
    >
      {email}
      <span className="text-muted-foreground transition-colors group-hover:text-primary">
        {copied ? (
          <Check className="size-3.5 text-emerald-500" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </a>
  );
}
