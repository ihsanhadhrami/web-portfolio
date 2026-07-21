import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import { Seo } from '@/components/seo';
import { SITE } from '@/constants/site';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/animations/reveal';
import { TechStack } from '@/components/sections/tech-stack';

const VALUES = [
  {
    title: 'Craft over shortcuts',
    description:
      'I sweat the details others skip — the empty states, the focus rings, the 60fps transition. They add up to trust.',
  },
  {
    title: 'Architecture that lasts',
    description:
      'Typed contracts, clear boundaries, and data-driven views. Code that a future teammate (or future me) can extend without fear.',
  },
  {
    title: 'Accessible by default',
    description:
      'Keyboard navigation, semantic markup, and sensible contrast are not add-ons. They ship from the first commit.',
  },
  {
    title: 'Honest communication',
    description:
      'Clear estimates, visible progress, and no surprises. If something is at risk, you hear it from me early.',
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description={`${SITE.name} is a web developer and digital product engineer focused on craft, architecture, and accessibility.`}
        path="/about"
      />
      <PageHeader
        eyebrow="About"
        title="I build for the web, obsessively."
        description="A web developer and design engineer who treats how something works and how it feels as the same problem."
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <Reveal className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground lg:col-span-2">
            <p>
              Hi, I'm {SITE.name.split(' ')[0]}. I've spent the last six years
              building interfaces for startups and product teams — dashboards,
              storefronts, design systems, and the occasional cinematic
              marketing site.
            </p>
            <p>
              I started out fascinated by the seam where design meets code, and
              I've been chasing that intersection ever since. My favorite
              projects are the ones where good engineering makes the design feel
              inevitable, and good design makes the engineering worth it.
            </p>
            <p>
              When I'm not shipping, you'll find me contributing to open source,
              refining my own component library, or going deep on the latest in
              the React and TypeScript ecosystem.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button asChild size="sm">
                <Link to="/contact">
                  Work with me
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href="#" aria-label="Download résumé (PDF)">
                  <Download className="size-4" />
                  Résumé
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-secondary/30"
          >
            <img
              src="/profile.jpg"
              alt={SITE.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-primary">What I value</span>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Principles that shape my work.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <Reveal
              key={value.title}
              delay={i * 0.05}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <TechStack />
    </>
  );
}
