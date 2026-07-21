import type { Service } from '@/types';

export const services: readonly Service[] = [
  {
    id: 'web-apps',
    icon: 'LayoutDashboard',
    title: 'Web Application Development',
    description:
      'Complex, data-heavy interfaces built to stay fast and maintainable as they grow — from dashboards to full SaaS products.',
    deliverables: [
      'Component-driven architecture',
      'State & data-fetching strategy',
      'Performance budgets & monitoring',
    ],
  },
  {
    id: 'design-engineering',
    icon: 'Palette',
    title: 'Design Engineering',
    description:
      'The bridge between design and code — pixel-accurate interfaces, motion, and design systems that scale across teams.',
    deliverables: [
      'Design systems & tokens',
      'Reusable component libraries',
      'Motion & interaction design',
    ],
  },
  {
    id: 'marketing-sites',
    icon: 'Rocket',
    title: 'Marketing & Landing Sites',
    description:
      'High-converting sites with cinematic motion, SEO baked in, and a CMS your team will actually enjoy using.',
    deliverables: [
      'SEO & Core Web Vitals',
      'Headless CMS integration',
      'Scroll-driven storytelling',
    ],
  },
  {
    id: 'performance',
    icon: 'Gauge',
    title: 'Performance & Accessibility Audits',
    description:
      'Deep audits that find what is slowing you down and locking users out — with a prioritized plan to fix it.',
    deliverables: [
      'Core Web Vitals optimization',
      'WCAG 2.2 AA remediation',
      'Bundle & runtime analysis',
    ],
  },
];
