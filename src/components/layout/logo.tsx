import { Link, useLocation } from 'react-router-dom';
import { SITE } from '@/constants/site';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Brand mark + wordmark that doubles as the home link. Behaves like a
 * "refresh" button: navigating here from another page returns home, and
 * clicking it while already on the home page scrolls back to the top.
 */
export function Logo({ className, onClick }: LogoProps) {
  const { pathname } = useLocation();

  function handleClick() {
    onClick?.();
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <Link
      to="/"
      onClick={handleClick}
      aria-label={`${SITE.name} — back to home`}
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
    </Link>
  );
}
