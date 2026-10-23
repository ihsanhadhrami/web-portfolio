/**
 * Single source of truth for site-wide metadata and contact details.
 * Swap these values to rebrand the portfolio.
 */
export const SITE = {
  name: 'Ihsan Hadhrami',
  /**
   * Kept concise on purpose: this string is the homepage title, and search
   * results truncate at ~60 characters. The specifics (Arabic NLP, the
   * bilingual RAG work) are carried by `shortBio` in the meta description
   * and by `focus` in the hero, where there is room for them.
   *
   * Names the two sides of the work a visitor would not guess from the
   * other: building AI, and translating Arabic. Web and automation are
   * covered by "developer" here and spelled out in `focus`. "AI
   * developer" rather than "AI engineer" because the work is building on
   * language models, not training them.
   */
  role: 'AI Developer & Arabic Translator',
  shortBio:
    'AI developer and Arabic translator. I build RAG and agentic AI apps, full-stack web apps, and Python automation, and translate Arabic into Malay and English.',
  /** Hero sub-line. Every side of the work, held together by one thread. */
  focus:
    'I build AI applications with RAG and agentic AI, ship full-stack web apps and Python automation, and translate Arabic into Malay and English. Most of my work sits where language meets software.',
  url: import.meta.env.VITE_SITE_URL ?? 'https://ihsanhadhrami.com',
  location: 'Remote · Available worldwide',
  email: 'ihadhrami20@gmail.com',
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
  { label: 'Email', href: `mailto:${SITE.email}`, icon: 'Mail' },
] as const;

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Articles', to: '/articles' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/#about' },
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
