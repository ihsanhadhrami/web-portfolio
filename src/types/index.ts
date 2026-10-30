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
  | 'Open Source'
  | 'Translation';

/** Arabic is the source language; Malay and English are the targets. */
export type TranslationLanguage = 'ar' | 'ms' | 'en';

/** One unit of text in every language at once. */
export type AlignedText = Readonly<Record<TranslationLanguage, string>>;

/**
 * A side-by-side translation sample. Each passage carries all three
 * languages in one record rather than three parallel arrays, so the
 * columns cannot drift out of alignment when a paragraph is added.
 */
export interface TranslationSample {
  readonly source: {
    /** Original headline, in the source language. */
    readonly title: string;
    readonly publisher: string;
    /** ISO date, e.g. '2024-10-10'. */
    readonly date: string;
    readonly url: string;
  };
  readonly headline: AlignedText;
  readonly passages: readonly AlignedText[];
}

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
  /** Path to a self-hosted demo video, played inline on the detail page. */
  readonly demoVideo?: string;
  /** Short accent used to tint the placeholder cover, e.g. 'violet'. */
  readonly accent?: string;
  /** Rendered side by side on the detail page for Translation projects. */
  readonly translation?: TranslationSample;
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

/** Dates are ISO year-month (YYYY-MM), formatted at render time. */
export interface Education {
  readonly institution: string;
  readonly qualification: string;
  readonly location: string;
  readonly start: string;
  readonly end: string;
  readonly grade?: string;
}

export interface Certificate {
  readonly title: string;
  readonly issuer: string;
  /** ISO year-month (YYYY-MM). */
  readonly date: string;
  /** Short qualifier shown under the issuer, e.g. "4-course specialization". */
  readonly detail?: string;
  /** Path under /public to a rendered image of the certificate. */
  readonly image: string;
  readonly credentialId?: string;
  /** Public verification page, when the issuer provides one. */
  readonly verifyUrl?: string;
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
  /** Standfirst shown beneath the title on the article page itself. */
  readonly dek?: string;
  readonly readingMinutes?: number;
  /**
   * True while the post is an unwritten placeholder. Draft cards still
   * render (so the layout is reviewable) but are visibly marked, link
   * nowhere, and stay out of the sitemap. A post is only routable once
   * this is false AND a body is registered in content/articles.
   */
  readonly draft?: boolean;
}
