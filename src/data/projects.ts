import type { Project } from '@/types';

/**
 * Portfolio projects. The UI renders entirely from this array — add a
 * new entry here and it appears in the home grid, the projects page,
 * and its own detail route automatically.
 */
export const projects: readonly Project[] = [
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
    cover: '/og-image.png',
    accent: 'emerald',
  },
];

/** Convenience selectors kept beside the data for reuse across views. */
export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
