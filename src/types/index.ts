/**
 * Central domain model for the portfolio's data-driven architecture.
 * All content-bearing components consume these types so that swapping
 * the data files never requires touching the UI layer.
 */

export type ProjectCategory =
  'Web App' | 'Website' | 'Design System' | 'Mobile' | 'Open Source';

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  /** URL-safe unique identifier used for routing (`/projects/:slug`). */
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly category: ProjectCategory;
  readonly year: number;
  readonly role: string;
  /** Rendered on the home page when true. */
  readonly featured: boolean;
  readonly tech: readonly string[];
  readonly highlights: readonly string[];
  readonly liveUrl?: string;
  readonly repoUrl?: string;
  /** Path or remote URL for the cover image; optional so cards can fall back. */
  readonly cover?: string;
  /** Short accent used to tint the placeholder cover, e.g. 'violet'. */
  readonly accent?: string;
}

export interface Service {
  readonly id: string;
  /** Lucide icon name, resolved at render time. */
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly deliverables: readonly string[];
}

export interface SkillGroup {
  readonly category: string;
  readonly skills: readonly string[];
}

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly title: string;
  readonly company: string;
}
