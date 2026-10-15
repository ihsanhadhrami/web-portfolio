import { projects } from '@/data/projects';
import { publishedArticles } from '@/data/articles';
import { Reveal } from '@/components/animations/reveal';
import { SnapSection } from './snap-section';

/**
 * Counts are derived from the data rather than typed in, so they cannot
 * drift out of date the next time a project or article is added.
 */
const STATS = [
  { value: String(projects.length), label: 'Projects' },
  { value: String(publishedArticles.length), label: 'Articles published' },
  { value: '3', label: 'Languages · AR, MS, EN' },
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
            Where language meets software.
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>
              I build AI applications with retrieval-augmented generation and
              agentic AI. Right now that means a bilingual customer support
              assistant that answers in Arabic or English from a company&apos;s
              own documents, and writing about how models read Arabic.
            </p>
            <p>
              I also ship full-stack web apps and Python automation that turns
              hours of manual work into minutes, and I translate Arabic into
              Malay and English. Working across three languages is why Arabic is
              where my AI work focuses: English-first tooling breaks on it, and
              that gap is the interesting part.
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
