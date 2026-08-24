/**
 * Single source of truth for site-wide metadata and contact details.
 * Swap these values to rebrand the portfolio.
 */
export const SITE = {
  name: 'Ihsan Hadhrami',
  /**
   * Kept concise on purpose: this string is appended to every page title,
   * which already sits near the ~60-character limit search results
   * truncate at. The Arabic NLP half of the positioning is carried by
   * `shortBio` (the meta description, where there is room for it) and by
   * `focus` in the hero.
   */
  role: 'Web Developer & Automation Engineer',
  shortBio:
    'Developer and automation engineer building backend tools that remove manual work, with a focus on Arabic language technology.',
  /** Hero sub-line. Carries both tracks under one identity. */
  focus:
    'I build automation and backend tools, and study Arabic computational linguistics.',
  url: import.meta.env.VITE_SITE_URL ?? 'https://ihsanhadhrami.com',
  location: 'Remote · Available worldwide',
  email: 'ihsan@ihsanhadhrami.com',
  availability: 'Available for freelance & full-time work',
  /** Used as the home link in the minimal nav. */
  initials: 'IH',
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
  { label: 'Articles', to: '/articles' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const;

/**
 * The snap-scrolled homepage sections, in order. The nav, the section
 * counters, and the scroll-spy all read from this one list, so adding a
 * section here wires it into every one of them.
 */
export const HOME_SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number]['id'];

/** Zero-padded position label, e.g. "02". */
export function sectionNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}
