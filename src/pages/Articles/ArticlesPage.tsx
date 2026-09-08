import { Seo } from '@/components/seo';
import { SITE } from '@/constants/site';
import {
  ARTICLE_TRACKS,
  articlesByDate,
  publishedArticles,
} from '@/data/articles';
import { PageHeader } from '@/components/sections/page-header';
import { FilterableIndex } from '@/components/sections/filterable-index';
import { ArticleCard } from '@/components/cards/article-card';

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

      <FilterableIndex
        items={articlesByDate}
        filters={ARTICLE_TRACKS}
        label="Filter articles by track"
        filterOf={(article) => article.track}
        keyOf={(article) => article.slug}
        emptyMessage="Nothing published in this track yet."
      >
        {(article) => <ArticleCard article={article} />}
      </FilterableIndex>
    </>
  );
}
