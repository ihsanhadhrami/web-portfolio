import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { Button } from '@/components/ui/button';

const STATS = [
  { value: '6+', label: 'Years building for the web' },
  { value: '40+', label: 'Products shipped' },
  { value: '98', label: 'Avg. Lighthouse score' },
  { value: '100%', label: 'Accessibility-first' },
] as const;

export function AboutSection() {
  return (
    <Section id="about" className="border-t border-border">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col gap-6">
          <span className="text-sm font-medium text-primary">About me</span>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Engineering and design, treated as one discipline.
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>
              I believe the best products come from refusing to separate how
              something works from how it feels. I care about clean architecture
              and typed contracts as much as I care about spacing, motion, and
              the details most people never consciously notice.
            </p>
            <p>
              Over the past six years I've partnered with startups and product
              teams to ship interfaces that are fast, maintainable, and
              genuinely enjoyable to use.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="w-fit">
            <Link to="/about">
              More about me
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>

        <Reveal
          delay={0.1}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 bg-card p-6 sm:p-8"
            >
              <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
