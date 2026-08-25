import { Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '@/components/seo';
import { SITE } from '@/constants/site';
import { formatArticleDate, getArticleBySlug } from '@/data/articles';
import { getArticleBody } from '@/content/articles';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/animations/reveal';
import { RouteFallback } from '@/components/layout/route-fallback';
import { NotFoundBlock } from '@/components/sections/not-found-block';

export default function ArticleDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const Body = slug ? getArticleBody(slug) : undefined;

  /*
    Two ways to land here with nothing to render: an unknown slug, and a
    post whose body has not been registered. Both are soft 404s — the SPA
    fallback serves them with an HTTP 200, so noindex is what actually
    keeps them out of the index rather than a canonical pointing at an
    empty page.
  */
  if (!article || !Body) {
    return (
      <>
        <Seo
          title="Article not found"
          path={`/articles/${slug ?? ''}`}
          noindex
        />
        <NotFoundBlock
          title="Article not found"
          description="This article may have been moved, renamed, or not published yet."
          actionLabel="Back to articles"
          actionTo="/articles"
        />
      </>
    );
  }

  const canonical = `${SITE.url}/articles/${article.slug}`;

  const articleJsonLd = {
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    headline: article.title,
    description: article.dek ?? article.excerpt,
    url: canonical,
    datePublished: article.date,
    inLanguage: 'en',
    articleSection: article.track,
    author: { '@id': `${SITE.url}/#person` },
    publisher: { '@id': `${SITE.url}/#person` },
    mainEntityOfPage: { '@id': `${canonical}#webpage` },
    ...(article.readingMinutes
      ? { timeRequired: `PT${article.readingMinutes}M` }
      : {}),
  };

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/articles/${article.slug}`}
        jsonLd={articleJsonLd}
      />

      <Container size="prose" className="pt-10">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link to="/articles">
            <ArrowLeft className="size-4" />
            All articles
          </Link>
        </Button>
      </Container>

      <Section flush className="pt-8 pb-20 sm:pb-28">
        <Container size="prose">
          <Reveal as="header" className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={article.track === 'Arabic NLP' ? 'accent' : 'muted'}
              >
                {article.track}
              </Badge>
              <time
                dateTime={article.date}
                className="font-mono text-xs text-muted-foreground"
              >
                {formatArticleDate(article.date)}
              </time>
              {article.readingMinutes && (
                <span className="font-mono text-xs text-muted-foreground">
                  {article.readingMinutes} min read
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              {article.title}
            </h1>

            {article.dek && (
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {article.dek}
              </p>
            )}
          </Reveal>

          <hr className="my-10 border-border" />

          <div className="article-body">
            <Suspense fallback={<RouteFallback />}>
              <Body />
            </Suspense>
          </div>
        </Container>
      </Section>
    </>
  );
}
