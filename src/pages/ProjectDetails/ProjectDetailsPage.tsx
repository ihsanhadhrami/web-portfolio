import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Seo } from '@/components/seo';
import { getProjectBySlug, projects } from '@/data/projects';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectCover } from '@/components/cards/project-cover';
import { ProjectCard } from '@/components/cards/project-card';
import { Reveal } from '@/components/animations/reveal';
import { NotFoundBlock } from '@/components/sections/not-found-block';

export default function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <>
        <Seo title="Project not found" path={`/projects/${slug ?? ''}`} />
        <NotFoundBlock
          title="Project not found"
          description="This project may have been moved or renamed."
          actionLabel="Back to projects"
          actionTo="/projects"
        />
      </>
    );
  }

  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);

  return (
    <>
      <Seo
        title={project.title}
        description={project.description}
        path={`/projects/${project.slug}`}
      />

      <Container className="pt-10">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link to="/projects">
            <ArrowLeft className="size-4" />
            All projects
          </Link>
        </Button>
      </Container>

      <Section flush className="pt-8">
        <Container>
          <Reveal className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{project.category}</Badge>
              <Badge variant="muted">{project.year}</Badge>
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button asChild size="sm">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Visit live site
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button asChild size="sm" variant="outline">
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    <Github className="size-4" />
                    Source
                  </a>
                </Button>
              )}
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-border"
          >
            <ProjectCover
              title={project.title}
              accent={project.accent}
              src={project.cover}
            />
          </Reveal>
        </Container>
      </Section>

      <Section flush className="pb-20 sm:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Overview */}
            <div className="flex flex-col gap-10 lg:col-span-2">
              <Reveal className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold tracking-tight">
                  Overview
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </Reveal>

              <Reveal className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold tracking-tight">
                  Highlights
                </h2>
                <ul className="flex flex-col gap-3">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Meta sidebar */}
            <Reveal
              delay={0.1}
              as="div"
              className="flex h-fit flex-col gap-6 rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Role
                </span>
                <span className="text-sm font-medium">{project.role}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Year
                </span>
                <span className="text-sm font-medium">{project.year}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Tech stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-secondary/60 px-2 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              More {project.category.toLowerCase()} work
            </h2>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All projects
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
