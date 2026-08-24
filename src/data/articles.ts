import type { Article, ArticleTrack } from '@/types';

export const ARTICLE_TRACKS: readonly ArticleTrack[] = [
  'Engineering',
  'Arabic NLP',
];

/**
 * PLACEHOLDER CONTENT. Every entry below is `draft: true` scaffolding so the
 * index layout and track filter can be reviewed with realistic titles.
 *
 * To publish one: write the body, set `draft: false`, and add the
 * `/articles/:slug` detail route. Draft entries still render (so the layout
 * is reviewable) but are visibly marked, link nowhere, and never reach the
 * sitemap, so nothing advertises a post with no body behind it.
 */
export const articles: readonly Article[] = [
  {
    slug: 'scraping-job-boards-without-getting-blocked',
    title: 'Scraping job boards without getting blocked',
    track: 'Engineering',
    date: '2026-07-14',
    excerpt:
      'What actually keeps a Selenium scraper alive across a long run: pacing, resource cleanup, and treating every missing element as expected rather than exceptional.',
    readingMinutes: 7,
    draft: true,
  },
  {
    slug: 'arabic-tokenization-breaks-english-first-pipelines',
    title: 'Why Arabic tokenization breaks English-first pipelines',
    track: 'Arabic NLP',
    date: '2026-06-30',
    excerpt:
      'Clitics attach, vowels go unwritten, and one orthographic word can carry a whole clause. A walk through where whitespace tokenizers quietly lose information.',
    readingMinutes: 9,
    draft: true,
  },
  {
    slug: 'reporting-pipelines-should-fail-loudly',
    title: 'Reporting pipelines should fail loudly',
    track: 'Engineering',
    date: '2026-06-02',
    excerpt:
      'A report that silently ships wrong numbers is worse than one that never sends. Notes on validating input before a single KPI gets calculated.',
    readingMinutes: 6,
    draft: true,
  },
  {
    slug: 'diacritics-and-the-cost-of-normalization',
    title: 'Diacritics and the cost of normalization',
    track: 'Arabic NLP',
    date: '2026-05-18',
    excerpt:
      'Stripping diacritics makes text easier to match and harder to disambiguate. Where that tradeoff helps a search index and where it destroys meaning.',
    readingMinutes: 8,
    draft: true,
  },
  {
    slug: 'batch-jobs-that-survive-one-bad-file',
    title: 'Batch jobs that survive one bad file',
    track: 'Engineering',
    date: '2026-04-27',
    excerpt:
      'Processing a folder of images taught me more about error boundaries than any web framework did. On isolating failure to a single iteration.',
    readingMinutes: 5,
    draft: true,
  },
  {
    slug: 'building-a-root-and-pattern-test-set',
    title: 'Building a root-and-pattern test set',
    track: 'Arabic NLP',
    date: '2026-04-09',
    excerpt:
      'Arabic morphology is generative, so a lemmatizer needs test cases that cover patterns rather than words. How I started assembling one.',
    readingMinutes: 10,
    draft: true,
  },
];

export const publishedArticles = articles.filter((a) => !a.draft);

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
