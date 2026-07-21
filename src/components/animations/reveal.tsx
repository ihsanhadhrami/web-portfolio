import { motion, type Variants } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the entrance begins. */
  delay?: number;
  variants?: Variants;
  /** Render element; defaults to a semantic `div`. */
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
}

/**
 * Scroll-triggered entrance wrapper. Respects reduced-motion automatically
 * because it defers to Framer Motion's `MotionConfig` set at the app root.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
