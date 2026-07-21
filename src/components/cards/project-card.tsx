import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { ProjectCover } from './project-cover';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
  /** Featured cards get a larger cover and more prominent type. */
  featured?: boolean;
}

export function ProjectCard({
  project,
  className,
  featured = false,
}: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      aria-label={`View case study: ${project.title}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-foreground/20 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          featured ? 'aspect-[16/10]' : 'aspect-[16/11]',
        )}
      >
        <ProjectCover
          title={project.title}
          accent={project.accent}
          src={project.cover}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="muted">{project.category}</Badge>
          <span className="font-mono text-xs text-muted-foreground">
            {project.year}
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              'font-semibold tracking-tight',
              featured ? 'text-xl' : 'text-lg',
            )}
          >
            {project.title}
          </h3>
          <ArrowUpRight
            className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden="true"
          />
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.slice(0, featured ? 5 : 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
