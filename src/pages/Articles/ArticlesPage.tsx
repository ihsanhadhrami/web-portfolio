import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Seo } from '@/components/seo';
import { SITE } from '@/constants/site';
import {
  ARTICLE_TRACKS,
  articlesByDate,
  publishedArticles,
} from '@/data/articles';
import type { ArticleTrack } from '@/types';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/ui/section';
import { ArticleCard } from '@/components/cards/article-card';
import { cn } from '@/lib/utils';

type Filter = ArticleTrack | 'All';

const FILTERS: readonly Filter[] = ['All', ...ARTICLE_TRACKS];

/**
 * Only published posts are advertised to search engines. Drafts still
 * render on the page so the layout is reviewable, but listing a post with
 * no body behind it would be a soft-404 waiting to happen.
 */
const collectionJsonLd = {
  '@type': 'CollectionPage',
  '@id': `${SITE.url}/articles#collection`,
  name: 'Articles',
  ...(publishedArticles.length > 0
    ? {
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: publishedArticles.map((article, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${SITE.url}/articles/${article.slug}`,
            name: article.title,
          })),
        },
      }
    : {}),
};

/**
 * A normally-scrolling route on purpose: a filterable post list does not
 * belong inside the homepage's one-screen-per-section pacing.
 */
export default function ArticlesPage() {
  const [filter, setFilter] = useState<Filter>('All');

  const visible = useMemo(
    () =>
      filter === 'All'
        ? articlesByDate
        : articlesByDate.filter((a) => a.track === filter),
    [filter],
  );

  return (
    <>
      <Seo
        title="Articles"
        description="Writing on backend engineering and automation, and on Arabic NLP and computational linguistics."
        path="/articles"
        jsonLd={collectionJsonLd}
      />
      <PageHeader
        eyebrow="Writing"
        title="Articles."
        description="Two tracks: engineering notes on backend, automation, and infrastructure, and work on Arabic language technology."
      />

      <Section>
        <div
          role="tablist"
          aria-label="Filter articles by track"
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((track) => {
            const active = filter === track;
            return (
              <button
                key={track}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(track)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'border-primary/30 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground',
                )}
              >
                {track}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Nothing published in this track yet.
          </p>
        ) : (
          <motion.div
            layout
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((article) => (
                <motion.div
                  key={article.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </Section>
    </>
  );
}
