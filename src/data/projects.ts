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
    year: 2025,
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
    liveUrl: 'https://productivity.ihsanhadhrami.com/',
    cover: '/og-image.png',
    accent: 'emerald',
  },
  {
    slug: 'lena-maison-spa',
    title: 'Léna Maison Spa',
    tagline:
      'A conversion-focused landing page that turns visitors into WhatsApp bookings.',
    description:
      'A production-quality marketing landing page for Léna Maison Spa, a private, appointment-only home spa serving women in the Sungai Buloh / Shah Alam area of Selangor, Malaysia. Every design and content decision is optimized around a single primary call to action: booking via WhatsApp.',
    category: 'Website',
    year: 2025,
    role: 'Frontend Developer',
    featured: true,
    tech: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'Framer Motion',
    ],
    highlights: [
      'Single primary CTA — "Book via WhatsApp" — with a prefilled deep link, no booking backend required.',
      'Clean, reusable component architecture built on the Next.js App Router.',
      'Fully responsive and SEO-optimized for local search in Selangor.',
      'Structured for easy expansion into future phases: booking system, CMS, admin dashboard.',
    ],
    liveUrl: 'https://lenaspa.netlify.app/',
    accent: 'rose',
  },
];

/** Convenience selectors kept beside the data for reuse across views. */
export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
