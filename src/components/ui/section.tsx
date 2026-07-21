import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional anchor id for in-page navigation. */
  id?: string;
  /** Removes the default vertical padding when composing custom spacing. */
  flush?: boolean;
  containerClassName?: string;
}

/** A vertically-rhythmic page section wrapping its content in a Container. */
export function Section({
  id,
  flush = false,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(!flush && 'py-20 sm:py-28', className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
