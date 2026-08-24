import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectCover } from '@/components/cards/project-cover';
import { Reveal } from '@/components/animations/reveal';
import { SnapSection } from './snap-section';

interface WorkSectionProps {
  number: string;
  label: string;
}

/**
 * One project per view, matching the single-screen pacing of the rest of
 * the page. The track is a native horizontal scroll-snap list, so touch
 * swiping works with no JS; the arrows drive the same scroll for pointer
 * and keyboard users.
 */
export function WorkSection({ number, label }: WorkSectionProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(next, projects.length - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
  }, []);

  // Observe the slides instead of listening to the track's scroll event, so
  // a swipe updates the counter without running work on every frame.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const slide = entry.target as HTMLElement;
          setIndex(Number(slide.dataset.index ?? 0));
        }
      },
      { root: track, threshold: 0.6 },
    );

    const slides = track.querySelectorAll('[data-index]');
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  return (
    <SnapSection id="work" number={number} label={label}>
      <Reveal>
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Selected work.
        </h2>
      </Reveal>

      <div
        className="mt-8"
        role="group"
        aria-roledescription="carousel"
        aria-label="Selected projects"
      >
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
        >
          {projects.map((project, i) => (
            <li
              key={project.slug}
              data-index={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${projects.length}: ${project.title}`}
              className="w-full shrink-0 snap-start"
            >
              <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-border">
                  <ProjectCover
                    title={project.title}
                    accent={project.accent}
                    src={project.cover}
                    logo={project.logo}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="muted">{project.category}</Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {project.tagline}
                  </p>

                  <ul className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.slice(0, 4).map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md bg-secondary/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-3">
                    <Button asChild size="sm">
                      <Link to={`/projects/${project.slug}`}>
                        Case study
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                    {project.liveUrl && (
                      <Button asChild size="sm" variant="outline">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live site
                          <ExternalLink className="size-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous project"
            disabled={index === 0}
            onClick={() => scrollTo(index - 1)}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next project"
            disabled={index === projects.length - 1}
            onClick={() => scrollTo(index + 1)}
          >
            <ArrowRight className="size-4" />
          </Button>
          <p
            aria-live="polite"
            className="font-mono text-xs text-muted-foreground"
          >
            {String(index + 1).padStart(2, '0')}
            <span className="px-1 text-border">/</span>
            {String(projects.length).padStart(2, '0')}
          </p>

          <Link
            to="/projects"
            className="ml-auto inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            All projects
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </SnapSection>
  );
}
