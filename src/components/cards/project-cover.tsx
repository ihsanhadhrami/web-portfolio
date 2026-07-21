import { accentGradient } from '@/lib/accents';
import { cn } from '@/lib/utils';

interface ProjectCoverProps {
  title: string;
  accent?: string;
  /** Optional real image; when present it replaces the placeholder. */
  src?: string;
  className?: string;
}

/**
 * Renders a project's cover. Uses a real image when provided, otherwise
 * a tasteful gradient-and-grid placeholder derived from the accent token —
 * so the layout looks intentional before real screenshots exist.
 */
export function ProjectCover({
  title,
  accent,
  src,
  className,
}: ProjectCoverProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={`${title} preview`}
        loading="lazy"
        decoding="async"
        className={cn('h-full w-full object-cover', className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${title} preview`}
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden bg-secondary/40',
        className,
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br',
          accentGradient(accent),
        )}
      />
      <div className="bg-grid absolute inset-0 opacity-60" />
      <span className="relative select-none font-mono text-sm tracking-widest text-foreground/70">
        {title.toUpperCase()}
      </span>
    </div>
  );
}
