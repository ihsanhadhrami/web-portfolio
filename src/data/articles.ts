import type { Article, ArticleTrack } from '@/types';

export const ARTICLE_TRACKS: readonly ArticleTrack[] = [
  'Engineering',
  'Arabic NLP',
];

/**
 * Published posts only. Every entry here has a body registered in
 * `content/articles/` and is reachable at `/articles/:slug`.
 *
 * To add one: write its body under `content/articles/`, register it in that
 * directory's index, then add it here. The `draft` flag still exists on the
 * type for work in progress; a draft renders on the index (visibly marked)
 * but links nowhere and never reaches the sitemap, so nothing advertises a
 * post with no body behind it.
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
  {
    slug: 'the-invisible-glue-why-apis-run-everything',
    title: 'The Invisible Glue: Why APIs Run Everything You Do Online',
    track: 'Engineering',
    date: '2026-08-26',
    excerpt:
      'An API is the invisible glue letting software talk to software without knowing how the other side works. From the radio dial to REST verbs, a tour of the abstraction behind every button press.',
    dek: 'From a radio dial to a REST verb: how the interface/implementation split quietly runs everything you touch online.',
    readingMinutes: 6,
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

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
