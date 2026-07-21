import { Seo } from '@/components/seo';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/ui/section';
import { services } from '@/data/services';
import { ServiceCard } from '@/components/cards/service-card';
import { Stagger, StaggerItem } from '@/components/animations/stagger';
import { ContactCta } from '@/components/sections/contact-cta';

const PROCESS = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We align on goals, constraints, and success metrics. I ask a lot of questions so nothing important is assumed.',
  },
  {
    step: '02',
    title: 'Design & architect',
    description:
      'I map the information architecture, component model, and data flow — then prototype the critical paths.',
  },
  {
    step: '03',
    title: 'Build',
    description:
      'Typed, tested, and reviewed. I ship in small increments so you can see progress and steer early.',
  },
  {
    step: '04',
    title: 'Launch & iterate',
    description:
      'Performance budgets, accessibility checks, and analytics in place — then we refine based on real usage.',
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Web application development, design engineering, marketing sites, and performance audits."
        path="/services"
      />
      <PageHeader
        eyebrow="Services"
        title="How I can help."
        description="Whether you need a full product built or an existing one made faster and more accessible, I offer focused, senior-level engineering."
      />

      <Section>
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="border-t border-border">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-primary">How I work</span>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            A calm, transparent process.
          </h2>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((phase) => (
            <StaggerItem
              key={phase.step}
              className="flex flex-col gap-3 bg-card p-6 sm:p-8"
            >
              <span className="font-mono text-sm text-primary">
                {phase.step}
              </span>
              <h3 className="text-lg font-semibold tracking-tight">
                {phase.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {phase.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <ContactCta />
    </>
  );
}
