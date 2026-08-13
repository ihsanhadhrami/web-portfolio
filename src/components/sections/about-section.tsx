import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { Button } from '@/components/ui/button';

const STATS = [
  { value: '10+', label: 'Tools & frameworks' },
  { value: '3+', label: 'Products shipped' },
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
            Engineering, design, and automation, treated as one discipline.
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>
              I believe the best products come from refusing to separate how
              something works from how it feels. I care about clean architecture
              and typed contracts as much as I care about spacing, motion, and
              the details most people never consciously notice.
            </p>
            <p>
              Since I started building professionally in late 2025, I've
              focused on shipping fast, maintainable interfaces and automation
              tools that turn hours of manual work into a single command — and
              I'm just getting started.
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
