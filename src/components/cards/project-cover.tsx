import { accentGradient } from '@/lib/accents';
import { cn } from '@/lib/utils';

interface ProjectCoverProps {
  title: string;
  accent?: string;
  /** Full-bleed photo/screenshot; when present it replaces the placeholder. */
  src?: string;
  /**
   * A small brand mark (e.g. a square/circular logo) to center on the
   * gradient placeholder instead of the title text. Use this rather than
   * `src` for logos — stretching a small icon full-bleed via object-cover
   * upscales and crops it badly.
   */
  logo?: string;
  className?: string;
}

/**
 * Renders a project's cover. Uses a real image when provided, otherwise
 * a tasteful gradient-and-grid placeholder derived from the accent token —
 * so the layout looks intentional before real screenshots exist. A `logo`
 * renders centered on that same placeholder backdrop rather than being
 * stretched full-bleed, which is the wrong treatment for a small brand mark.
 */
export function ProjectCover({
  title,
  accent,
  src,
  logo,
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
      {logo ? (
        <img
          src={logo}
          alt={`${title} logo`}
          loading="lazy"
          decoding="async"
          className="relative z-10 size-20 object-contain drop-shadow-lg sm:size-24"
        />
      ) : (
        <span className="relative select-none font-mono text-sm tracking-widest text-foreground/70">
          {title.toUpperCase()}
        </span>
      )}
    </div>
  );
}
