import type { Testimonial } from '@/types';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8',
        className,
      )}
    >
      <blockquote className="text-pretty text-base leading-relaxed text-foreground/90">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-secondary/60 font-mono text-sm text-muted-foreground"
        >
          {testimonial.author.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{testimonial.author}</span>
          <span className="text-xs text-muted-foreground">
            {testimonial.title}, {testimonial.company}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
