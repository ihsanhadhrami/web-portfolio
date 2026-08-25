import type { Article, ArticleTrack } from '@/types';

export const ARTICLE_TRACKS: readonly ArticleTrack[] = [
  'Engineering',
  'Arabic NLP',
];

/**
 * Every entry here is a written post with a body registered in
 * `content/articles/`. Nothing is listed before its prose exists, so a card
 * on the index always leads somewhere real.
 */
export const articles: readonly Article[] = [
  {
    slug: 'how-machines-learn-to-read-arabic',
    title: 'How Machines Learn to Read Arabic',
    track: 'Arabic NLP',
    date: '2026-08-25',
    excerpt:
      'Arabic packs into a single written word what English spreads across a clause, and it drops most of its vowels on the way. Five specific consequences, with the numbers the research actually reports.',
    dek: "Five things that make Arabic one of the harder languages to process computationally — and what the research actually says about how far we've got.",
    readingMinutes: 9,
  },
];

/** Newest first, used by both the index page and the homepage preview. */
export const articlesByDate = [...articles].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
