import { cn } from '@/lib/utils';

interface SectionLabelProps {
  /** Zero-padded position, e.g. "02". */
  number: string;
  label: string;
  className?: string;
}

/**
 * Wayfinding marker for the snap-scrolled homepage, e.g. "02 / About".
 *
 * This is deliberately a position indicator rather than a decorative
 * eyebrow: with one full-viewport section per screen and no persistent
 * scrollbar context, it is the only thing telling the visitor how far
 * through the page they are. It mirrors the active state in the nav.
 */
export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'font-mono text-xs tracking-widest text-muted-foreground',
        className,
      )}
    >
      <span className="text-primary">{number}</span>
      <span className="px-2 text-border" aria-hidden="true">
        /
      </span>
      <span className="uppercase">{label}</span>
    </p>
  );
}
