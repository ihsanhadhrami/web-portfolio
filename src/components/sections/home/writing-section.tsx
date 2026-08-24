import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { articlesByDate } from '@/data/articles';
import { ArticleCard } from '@/components/cards/article-card';
import { Reveal } from '@/components/animations/reveal';
import { Stagger, StaggerItem } from '@/components/animations/stagger';
import { SnapSection } from './snap-section';

/** A preview, not the index: three cards keeps the section inside one screen. */
const preview = articlesByDate.slice(0, 3);

interface WritingSectionProps {
  number: string;
  label: string;
}

export function WritingSection({ number, label }: WritingSectionProps) {
  return (
    <SnapSection id="writing" number={number} label={label}>
      <Reveal>
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Writing.
        </h2>
      </Reveal>

      <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {preview.map((article, i) => (
          <StaggerItem
            key={article.slug}
            /* The third card is noise on a phone; two is enough of a taste. */
            className={i === 2 ? 'hidden lg:block' : undefined}
          >
            <ArticleCard article={article} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.15} className="mt-6">
        <Link
          to="/articles"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowUpRight className="size-4" />
        </Link>
      </Reveal>
    </SnapSection>
  );
}
