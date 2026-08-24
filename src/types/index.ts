/**
 * Central domain model for the portfolio's data-driven architecture.
 * All content-bearing components consume these types so that swapping
 * the data files never requires touching the UI layer.
 */

export type ProjectCategory =
  | 'Web App'
  | 'Website'
  | 'Automation'
  | 'Design System'
  | 'Mobile'
  | 'Open Source';

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
  /**
   * A small brand mark to center on the placeholder backdrop when no full
   * screenshot exists yet. Ignored if `cover` is set.
   */
  readonly logo?: string;
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

export interface Skill {
  readonly name: string;
  /**
   * simple-icons slug (e.g. 'react'), rendered from the npm package rather
   * than their CDN so the site's `img-src 'self'` CSP stays locked down.
   * Omitted for skills that have no brand mark, like "Arabic morphology".
   */
  readonly brand?: string;
}

export interface SkillGroup {
  readonly category: string;
  /** Lucide icon name for the group header, resolved via the Icon registry. */
  readonly icon: string;
  readonly skills: readonly Skill[];
}

/**
 * The two tracks the writing is split across. A recruiter scanning for
 * backend work and someone assessing Arabic NLP depth should each be able
 * to filter straight to their track without reading the other.
 */
export type ArticleTrack = 'Engineering' | 'Arabic NLP';

export interface Article {
  readonly slug: string;
  readonly title: string;
  readonly track: ArticleTrack;
  /** ISO date (YYYY-MM-DD), formatted for display at render time. */
  readonly date: string;
  readonly excerpt: string;
  readonly readingMinutes?: number;
  /**
   * True while the post is an unwritten placeholder. Draft cards render
   * as non-interactive and are excluded from the homepage preview, so
   * nothing links to a body that does not exist yet.
   */
  readonly draft?: boolean;
}
