import { projects } from '@/data/projects';
import { Reveal } from '@/components/animations/reveal';
import { SnapSection } from './snap-section';

/**
 * Counts are derived from the projects data rather than typed in, so they
 * cannot drift out of date the next time a project is added.
 */
const automationCount = projects.filter(
  (p) => p.category === 'Automation',
).length;

const STATS = [
  { value: String(projects.length), label: 'Projects shipped' },
  { value: String(automationCount), label: 'Automation tools' },
  { value: 'AR / EN', label: 'Bilingual' },
] as const;

interface AboutSectionProps {
  number: string;
  label: string;
}

export function AboutSection({ number, label }: AboutSectionProps) {
  return (
    <SnapSection id="about" number={number} label={label}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal className="flex flex-col gap-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            AI for Arabic, built on solid engineering.
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>
              I build AI-powered applications. Right now that means Arabic NLP,
              and a bilingual customer support assistant that answers in Arabic
              or English from a company&apos;s own documents using
              retrieval-augmented generation.
            </p>
            <p>
              Arabic breaks most of the assumptions English-first tooling is
              built on, and that gap is the interesting part. Web development
              and automation are where I started, and they are still how the AI
              gets shipped: the backend, the pipelines, and the interface around
              the model.
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-1"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 bg-card p-4 sm:p-6"
            >
              <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </SnapSection>
  );
}
