import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * Slug to article body. Each body is its own lazy chunk, so the index page
 * never pays for prose nobody has opened yet.
 *
 * A post is only reachable when it appears here AND is listed in
 * `data/articles.ts`. Registering a body is the second half of publishing;
 * `articles.spec` fails if the two halves disagree.
 */
export const ARTICLE_BODIES: Record<
  string,
  LazyExoticComponent<ComponentType>
> = {
  'how-machines-learn-to-read-arabic': lazy(
    () => import('./how-machines-learn-to-read-arabic'),
  ),
};

export function getArticleBody(
  slug: string,
): LazyExoticComponent<ComponentType> | undefined {
  return ARTICLE_BODIES[slug];
}
