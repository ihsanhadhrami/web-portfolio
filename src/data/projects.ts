import type { Project } from '@/types';
// Relative, not '@/': vite.config.ts imports this file to build the
// sitemap, and the alias does not exist yet when the config loads.
import { nobelChemistry2024 } from '../content/translations/nobel-chemistry-2024';

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
    cover: '/focus-system-cover.png',
    accent: 'emerald',
  },
  {
    slug: 'job-listings-scraper',
    title: 'Job Listings Scraper',
    tagline:
      'A Selenium scraper that collapses hours of manual job hunting into one spreadsheet.',
    description:
      'A Python web scraping tool that automatically collects job listings from job boards such as Indeed Malaysia and exports them to a structured Excel file. Built for job seekers who want their search in one place, and for recruiters and analysts doing salary benchmarking, competitive intelligence, and market trend analysis at scale.',
    category: 'Automation',
    year: 2026,
    role: 'Solo Developer',
    featured: false,
    tech: ['Python', 'Selenium', 'Pandas', 'openpyxl'],
    highlights: [
      'Turns a 2-3 hour manual search into a run that finishes in minutes.',
      'Exports timestamped Excel files capturing job title, company, location, salary, source, and collection time.',
      'Defensive scraping: handles network faults and missing page elements, and always releases browser resources.',
      'Configuration-driven design with file logging for audit trails.',
    ],
    repoUrl: 'https://github.com/ihsanhadhrami/web_scraping_python',
    cover: '/job-listings-scraper-cover.jpg',
    accent: 'blue',
  },
  {
    slug: 'image-automation-engine',
    title: 'Image Automation Engine',
    tagline:
      'Batch image processing that applies Lightroom-style edits consistently at scale.',
    description:
      'A batch image processing engine that applies iPhone/Lightroom-style adjustments — exposure, contrast, saturation, highlights, shadows, and sharpness — across entire folders of images. Built for automation, consistency, and production readiness rather than manual one-by-one editing, with e-commerce product shots, marketing assets, and web image optimization as the target workloads.',
    category: 'Automation',
    year: 2026,
    role: 'Solo Developer',
    featured: false,
    tech: ['Python', 'Pillow', 'NumPy'],
    highlights: [
      'Non-destructive sequential pipeline: resize → adjustments → watermark → optimized output.',
      'Gamma-based highlight and shadow recovery gives natural tone mapping without harsh clipping.',
      'Config-driven adjustment values, normalized to prevent over-processing and visual artifacts.',
      'Fault-tolerant batch — a single failed image is logged and never stops the run.',
    ],
    repoUrl: 'https://github.com/ihsanhadhrami/Image_Automation_Tool-Python',
    cover: '/image-automation-engine-cover.jpg',
    accent: 'amber',
  },
  {
    slug: 'ai-business-reports',
    title: 'AI Business Report Generator',
    tagline:
      'CSV in, scheduled HTML performance report out — with optional AI-written insights.',
    description:
      'A Python automation tool that turns raw CSV business data into a structured HTML performance report. It validates the data, calculates KPIs, writes the insight copy, and delivers the report over SMTP on a schedule. It runs fully offline with deterministic local insights by default, and can optionally generate AI commentary through OpenRouter or a locally cached Hugging Face model.',
    category: 'Automation',
    year: 2026,
    role: 'Solo Developer',
    featured: false,
    tech: ['Python', 'OpenRouter API', 'Hugging Face', 'SMTP', 'pytest'],
    highlights: [
      'Validates CSV input and fails fast on invalid dates or non-numeric metrics before a report ever goes out.',
      'Calculates KPIs across revenue, sales, customer count, orders, returns, and satisfaction.',
      'AI insights are opt-in: OpenRouter or a cached local model when enabled, deterministic local text when not.',
      'Dry-run mode renders the full HTML report while skipping SMTP, making every run safe to test.',
      'Ships a connectivity diagnostic for OpenRouter that never prints the API key value.',
    ],
    repoUrl: 'https://github.com/ihsanhadhrami/ai-powered-business-reports',
    liveUrl: 'https://aibusinessreports.ihsanhadhrami.com/',
    cover: '/ai-business-reports-cover.jpg',
    accent: 'cyan',
  },
  {
    slug: 'nobel-chemistry-2024-translation',
    title: 'Nobel Chemistry 2024 Translation',
    tagline:
      'An Al Jazeera report on the 2024 Chemistry Nobel, translated from Arabic into Malay and English.',
    description:
      'A personal translation sample. My client translation work involves confidential documents, so this piece uses a public source instead: an Al Jazeera Net report on the 2024 Nobel Prize in Chemistry and AlphaFold 2, translated from Arabic into both Malay and English. It shows the same skills client work needs: carrying scientific terminology, quoted speech, and Arabic news syntax into two very different target languages.',
    category: 'Translation',
    year: 2026,
    role: 'Translator',
    featured: false,
    tech: ['Arabic → Malay', 'Arabic → English'],
    highlights: [
      'Rebuilt verb-first Arabic news syntax and dual verb forms such as يأملان and حذرا into natural subject-first Malay and English.',
      'Restructured nationality nouns such as الأميركيان and البريطاني into "The two Americans … along with British Demis Hassabis" and "kedua-dua dari Amerika".',
      'Glossed computational biology as "biologi komputasi (Bioinformatik)" for Malay readers less familiar with the term.',
      'Kept scientific terms and proper nouns consistent across both targets: protein structures, AlphaFold 2, Google DeepMind.',
    ],
    cover: '/nobel-chemistry-2024-translation-cover.jpg',
    accent: 'violet',
    translation: nobelChemistry2024,
  },
];

/** Convenience selectors kept beside the data for reuse across views. */
export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
