import { Link } from 'react-router-dom';
import { SITE } from '@/constants/site';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/** Wordmark that doubles as the home link. */
export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${SITE.name} — home`}
      className={cn(
        'group inline-flex items-center gap-2 rounded-md text-sm font-semibold tracking-tight',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 font-mono text-sm text-white shadow-sm"
      >
        A
      </span>
      <span className="hidden sm:inline">{SITE.name}</span>
    </Link>
  );
}
