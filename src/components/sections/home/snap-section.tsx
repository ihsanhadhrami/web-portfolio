import * as React from 'react';
import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { cn } from '@/lib/utils';

interface SnapSectionProps {
  id: string;
  /** Zero-padded position label. Omitted on the hero, which needs no marker. */
  number?: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

/**
 * One full-viewport panel of the snap-scrolled homepage.
 *
 * Vertical padding clears the 64px fixed nav at the top. Height is a
 * minimum rather than a fixed value, so a section whose content outgrows a
 * short viewport scrolls normally instead of clipping.
 */
export function SnapSection({
  id,
  number,
  label,
  className,
  containerClassName,
  children,
}: SnapSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'snap-section relative flex flex-col justify-center py-20 sm:py-24',
        className,
      )}
    >
      <Container className={cn('w-full', containerClassName)}>
        {number && label && (
          <SectionLabel
            number={number}
            label={label}
            className="mb-6 sm:mb-8"
          />
        )}
        {children}
      </Container>
    </section>
  );
}
