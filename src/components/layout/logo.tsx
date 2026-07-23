import { SITE } from '@/constants/site';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

/**
 * Brand mark + wordmark. Deliberately a plain anchor rather than React
 * Router's Link: clicking it always triggers a full page reload back to
 * "/" — a literal refresh button, not a client-side route change — and
 * this works whether you're already on the home page or anywhere else.
 */
export function Logo({ className }: LogoProps) {
  return (
    <a
      href="/"
      aria-label={`${SITE.name} — reload home page`}
      className={cn(
        'group inline-flex items-center gap-2 rounded-md text-sm font-semibold tracking-tight',
        className,
      )}
    >
      <img
        src="/favicon-512.png"
        alt=""
        aria-hidden="true"
        className="size-8 shrink-0 rounded-lg object-contain transition-transform duration-200 group-hover:scale-105"
      />
      <span className="hidden sm:inline">{SITE.name}</span>
    </a>
  );
}
