import type { SkillGroup } from '@/types';

/**
 * Grouped around the two tracks the site now covers rather than a generic
 * stack list: the first three groups speak to backend / automation / SaaS
 * support roles, the fourth to Arabic language technology.
 *
 * `brand` values are simple-icons slugs. Skills with no brand mark (an
 * area of study rather than a product) simply omit it and render as text.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    category: 'Frontend',
    icon: 'LayoutDashboard',
    skills: [
      { name: 'React', brand: 'react' },
      { name: 'TypeScript', brand: 'typescript' },
      { name: 'Next.js', brand: 'nextdotjs' },
      { name: 'Tailwind CSS', brand: 'tailwindcss' },
      { name: 'Framer Motion', brand: 'framer' },
      { name: 'Vite', brand: 'vite' },
    ],
  },
  {
    category: 'Backend & APIs',
    icon: 'Server',
    skills: [
      { name: 'Node.js', brand: 'nodedotjs' },
      { name: 'Python', brand: 'python' },
      { name: 'PostgreSQL', brand: 'postgresql' },
      { name: 'REST APIs' },
      { name: 'Cloudflare Workers', brand: 'cloudflare' },
    ],
  },
  {
    category: 'Automation',
    icon: 'Workflow',
    skills: [
      { name: 'Selenium', brand: 'selenium' },
      { name: 'pandas', brand: 'pandas' },
      { name: 'Pillow' },
      { name: 'Scheduled jobs' },
      { name: 'Email pipelines' },
    ],
  },
  {
    category: 'Arabic NLP & Data',
    icon: 'Languages',
    skills: [
      { name: 'Hugging Face', brand: 'huggingface' },
      { name: 'NumPy', brand: 'numpy' },
      { name: 'Arabic morphology' },
      { name: 'Tokenization' },
      { name: 'Corpus building' },
    ],
  },
];
