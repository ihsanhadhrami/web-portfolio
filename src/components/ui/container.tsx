import * as React from 'react';
import { cn } from '@/lib/utils';

type ContainerElement = 'div' | 'section' | 'main' | 'footer' | 'header';

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: ContainerElement;
  /** Narrower reading measure, used for text-heavy blocks. */
  size?: 'default' | 'prose';
}

/** Centered, responsively-padded page container. */
export function Container({
  as: Tag = 'div',
  size = 'default',
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-5 sm:px-8',
        size === 'default' ? 'max-w-7xl' : 'max-w-3xl',
        className,
      )}
      {...props}
    />
  );
}
