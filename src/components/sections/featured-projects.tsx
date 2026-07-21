import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { featuredProjects } from '@/data/projects';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/cards/project-card';
import { Stagger, StaggerItem } from '@/components/animations/stagger';

export function FeaturedProjects() {
  return (
    <Section id="work">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects with intent."
          description="A few products I've designed and engineered end to end."
        />
        <Button asChild variant="outline" size="sm" className="w-fit shrink-0">
          <Link to="/projects">
            All projects
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <StaggerItem
            key={project.slug}
            className={i === 0 ? 'md:col-span-2' : ''}
          >
            <ProjectCard project={project} featured={i === 0} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
