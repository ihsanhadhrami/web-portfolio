import type { Project } from '@/types';

/**
 * Portfolio projects. Placeholder content — replace with real work.
 * The UI renders entirely from this array; nothing is hardcoded in views.
 */
export const projects: readonly Project[] = [
  {
    slug: 'nova-analytics',
    title: 'Nova Analytics',
    tagline: 'Real-time product analytics, reimagined.',
    description:
      'A privacy-first analytics platform that turns raw event streams into legible, actionable dashboards. Built for teams that want clarity without surveillance.',
    category: 'Web App',
    year: 2025,
    role: 'Lead Frontend Engineer',
    featured: true,
    tech: ['React', 'TypeScript', 'Next.js', 'D3', 'Tailwind CSS', 'tRPC'],
    highlights: [
      'Sub-100ms interaction latency on dashboards rendering 1M+ events.',
      'Composable chart primitives adopted across five internal products.',
      'WCAG 2.2 AA compliant with full keyboard and screen-reader support.',
    ],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/',
    accent: 'violet',
  },
  {
    slug: 'atlas-design-system',
    title: 'Atlas Design System',
    tagline: 'One language across web, mobile, and marketing.',
    description:
      'A themeable, token-driven design system with 60+ accessible components, automated visual regression testing, and zero-runtime styling.',
    category: 'Design System',
    year: 2024,
    role: 'Design Systems Architect',
    featured: true,
    tech: ['React', 'TypeScript', 'Radix UI', 'Style Dictionary', 'Storybook'],
    highlights: [
      'Cut new-feature UI build time by 40% across three product teams.',
      'Design tokens synced automatically from Figma to code.',
      'Documented with live, editable examples in Storybook.',
    ],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/',
    accent: 'blue',
  },
  {
    slug: 'fern-commerce',
    title: 'Fern Commerce',
    tagline: 'A headless storefront that loads instantly.',
    description:
      'A modern e-commerce experience with edge-rendered product pages, optimistic cart updates, and a checkout that converts.',
    category: 'Web App',
    year: 2024,
    role: 'Frontend Engineer',
    featured: true,
    tech: ['React', 'Remix', 'TypeScript', 'Shopify', 'Tailwind CSS'],
    highlights: [
      'Lighthouse performance score of 98 on product detail pages.',
      'Improved conversion rate by 22% after checkout redesign.',
      'Edge-cached storefront serving 40 markets.',
    ],
    liveUrl: 'https://example.com',
    accent: 'emerald',
  },
  {
    slug: 'pulse-marketing-site',
    title: 'Pulse',
    tagline: 'A marketing site with cinematic motion.',
    description:
      'A conversion-focused marketing website with scroll-driven storytelling, tasteful motion, and a CMS that non-engineers actually enjoy using.',
    category: 'Website',
    year: 2023,
    role: 'Frontend Engineer',
    featured: false,
    tech: ['React', 'Astro', 'Framer Motion', 'Sanity', 'Tailwind CSS'],
    highlights: [
      'Reduced bounce rate by 31% with a rebuilt hero and narrative flow.',
      'Content editors ship pages without engineering involvement.',
    ],
    liveUrl: 'https://example.com',
    accent: 'amber',
  },
  {
    slug: 'orbit-scheduler',
    title: 'Orbit Scheduler',
    tagline: 'Team scheduling without the back-and-forth.',
    description:
      'A calendar and availability tool with timezone-aware scheduling, shareable booking links, and native calendar sync.',
    category: 'Web App',
    year: 2023,
    role: 'Full-Stack Engineer',
    featured: false,
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    highlights: [
      'Timezone engine tested against 400+ edge cases.',
      'Two-way sync with Google and Microsoft calendars.',
    ],
    repoUrl: 'https://github.com/',
    accent: 'rose',
  },
  {
    slug: 'focus-system',
    title: 'Focus System',
    tagline: 'A Pomodoro-style focus timer that turns intention into habit.',
    description:
      'A progressive web app for deep work: focus and break cycles paired with task tracking and session analytics, packaged as an installable, offline-capable timer.',
    category: 'Web App',
    year: 2026,
    role: 'Solo Developer',
    featured: true,
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Recharts',
      'Vite PWA',
      'Vitest',
    ],
    highlights: [
      'Pomodoro-style focus/break timer paired with an integrated task list.',
      'Weekly progress and streak charts visualized with Recharts.',
      'Installable PWA with offline support via a Workbox-powered service worker.',
      'Unit tested with Vitest and jsdom to keep timer logic reliable.',
    ],
    liveUrl: 'https://productivity-timer-app.netlify.app/',
    accent: 'emerald',
  },
  {
    slug: 'lumen-ui',
    title: 'Lumen UI',
    tagline: 'An open-source React component library.',
    description:
      'A small, dependency-light component library focused on accessibility, dark mode, and delightful defaults.',
    category: 'Open Source',
    year: 2022,
    role: 'Creator & Maintainer',
    featured: false,
    tech: ['React', 'TypeScript', 'Vite', 'Vitest'],
    highlights: [
      '2.4k GitHub stars and 30+ community contributors.',
      'Ships fully typed, tree-shakeable ESM bundles.',
    ],
    repoUrl: 'https://github.com/',
    accent: 'cyan',
  },
];

/** Convenience selectors kept beside the data for reuse across views. */
export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
