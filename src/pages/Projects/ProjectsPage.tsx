import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Seo } from '@/components/seo';
import { projects } from '@/data/projects';
import type { ProjectCategory } from '@/types';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/ui/section';
import { ProjectCard } from '@/components/cards/project-card';
import { cn } from '@/lib/utils';

type Filter = ProjectCategory | 'All';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('All');

  const categories = useMemo<Filter[]>(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...unique];
  }, []);

  const visible = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <>
      <Seo
        title="Projects"
        description="A collection of web applications, design systems, and websites engineered end to end."
        path="/projects"
      />
      <PageHeader
        eyebrow="Portfolio"
        title="Projects & case studies."
        description="A collection of products I've designed and engineered — from data-heavy web apps to design systems and marketing sites."
      />

      <Section>
        {/* Filter bar */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2"
        >
          {categories.map((category) => {
            const active = filter === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(category)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'border-primary/30 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground',
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </>
  );
}
