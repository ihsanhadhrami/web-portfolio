import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Article } from '@/types';
import { formatArticleDate } from '@/data/articles';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * Both tracks are tinted from the same single accent rather than getting a
 * colour each, so the page keeps one accent throughout.
 */
function TrackBadge({ track }: { track: Article['track'] }) {
  return (
    <Badge variant={track === 'Arabic NLP' ? 'accent' : 'muted'}>{track}</Badge>
  );
}

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  const meta = (
    <div className="flex flex-wrap items-center gap-2">
      <TrackBadge track={article.track} />
      <span className="font-mono text-xs text-muted-foreground">
        {formatArticleDate(article.date)}
      </span>
      {article.readingMinutes && (
        <span className="font-mono text-xs text-muted-foreground">
          {article.readingMinutes} min
        </span>
      )}
    </div>
  );

  const body = (
    <>
      {meta}
      <h3 className="font-display text-lg font-bold tracking-tight text-balance sm:text-xl">
        {article.title}
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>
    </>
  );

  const shell =
    'flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:p-6';

  return (
    <Link
      to={`/articles/${article.slug}`}
      className={cn(
        shell,
        'group transition-all duration-300 hover:border-foreground/20 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      {body}
      <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm text-foreground">
        Read
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
