import { testimonials } from '@/data/testimonials';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { TestimonialCard } from '@/components/cards/testimonial-card';
import { Stagger, StaggerItem } from '@/components/animations/stagger';

export function TestimonialsSection() {
  return (
    <Section id="testimonials" className="border-t border-border">
      <SectionHeading
        eyebrow="Kind words"
        title="Trusted by the people I build with."
        align="center"
        className="mx-auto"
      />

      <Stagger className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.id} className="h-full">
            <TestimonialCard testimonial={testimonial} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
