import { motion, type Variants } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'section';
}

/** A container whose direct `StaggerItem` children reveal in sequence. */
export function Stagger({ children, className, as = 'div' }: StaggerProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: 'div' | 'li' | 'article';
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  as = 'div',
}: StaggerItemProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={cn(className)} variants={variants}>
      {children}
    </MotionTag>
  );
}
