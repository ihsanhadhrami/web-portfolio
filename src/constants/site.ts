/**
 * Single source of truth for site-wide metadata and contact details.
 * Swap these values to rebrand the portfolio.
 */
export const SITE = {
  name: 'Ihsan Hadhrami',
  role: 'Web Developer & Digital Product Engineer',
  shortBio:
    'I design and build fast, accessible, and beautifully engineered digital products.',
  url: import.meta.env.VITE_SITE_URL ?? 'https://ihsanhadhrami.com',
  location: 'Remote · Available worldwide',
  email: 'ihsan@ihsanhadhrami.com',
  availability: 'Available for freelance & full-time work',
} as const;

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/ihsanhadhrami', icon: 'Github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ihsan-hadhrami-ab0368287',
    icon: 'Linkedin',
  },
  { label: 'Email', href: 'mailto:ihsan@ihsanhadhrami.com', icon: 'Mail' },
] as const;

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const;
