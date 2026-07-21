import type { SkillGroup } from '@/types';

export const skillGroups: readonly SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    category: 'Frameworks',
    skills: ['React', 'Next.js', 'Remix', 'Astro', 'Node.js'],
  },
  {
    category: 'Styling & Design',
    skills: ['Tailwind CSS', 'Framer Motion', 'Radix UI', 'shadcn/ui', 'Figma'],
  },
  {
    category: 'Tooling',
    skills: ['Vite', 'Vitest', 'Playwright', 'Storybook', 'ESLint'],
  },
  {
    category: 'Platform',
    skills: ['Netlify', 'Vercel', 'PostgreSQL', 'GraphQL', 'Git'],
  },
];

/**
 * A flat, ordered list of the core stack, used by the marquee-style
 * tech section on the home page.
 */
export const coreStack: readonly string[] = [
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'Framer Motion',
  'Vite',
  'Node.js',
  'PostgreSQL',
  'Figma',
  'Vercel',
];
