import { services } from '@/data/services';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { ServiceCard } from '@/components/cards/service-card';
import { Stagger, StaggerItem } from '@/components/animations/stagger';

interface ServicesSectionProps {
  /** Limit the number of services shown (e.g. on the home page). */
  limit?: number;
}

export function ServicesSection({ limit }: ServicesSectionProps) {
  const items = limit ? services.slice(0, limit) : services;

  return (
    <Section id="services" className="border-t border-border">
      <SectionHeading
        eyebrow="What I do"
        title="Services built around outcomes."
        description="From architecture to the last pixel — I handle the full lifecycle of a modern web product."
      />

      <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((service) => (
          <StaggerItem key={service.id} className="h-full">
            <ServiceCard service={service} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
