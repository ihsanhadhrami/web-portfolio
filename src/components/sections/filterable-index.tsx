import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/utils';

/** Prepended to every filter list; never supplied by a caller. */
const ALL = 'All';

interface FilterableIndexProps<TItem, TFilter extends string> {
  items: readonly TItem[];
  /** Filter values in display order. "All" is added automatically. */
  filters: readonly TFilter[];
  /** Accessible name for the tablist, e.g. "Filter articles by track". */
  label: string;
  /** Which filter an item belongs to. */
  filterOf: (item: TItem) => TFilter;
  keyOf: (item: TItem) => string;
  /** Shown when the active filter matches nothing. */
  emptyMessage: string;
  /** Renders one card. */
  children: (item: TItem) => ReactNode;
}

/**
 * A filterable card index: the tab bar, the active-filter state, the
 * enter/exit animation, and the empty state, behind one component.
 *
 * Both /projects and /articles previously carried their own copy of this
 * markup, which meant restyling the filter meant editing two files and
 * hoping they stayed in sync. Callers now supply only what actually
 * differs between the two: the data, how to read a filter off an item,
 * and how to render one.
 *
 * Filtering is not memoized on purpose. These catalogs are a handful of
 * items, so recomputing is cheaper than the stable-identity contract a
 * `useMemo` would impose on every caller's `filterOf`.
 */
export function FilterableIndex<TItem, TFilter extends string>({
  items,
  filters,
  label,
  filterOf,
  keyOf,
  emptyMessage,
  children,
}: FilterableIndexProps<TItem, TFilter>) {
  const [active, setActive] = useState<TFilter | typeof ALL>(ALL);

  const visible =
    active === ALL ? items : items.filter((item) => filterOf(item) === active);

  const tabs: ReadonlyArray<TFilter | typeof ALL> = [ALL, ...filters];

  return (
    <Section>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const selected = active === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                selected
                  ? 'border-primary/30 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground',
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.div
                key={keyOf(item)}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                {children(item)}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Section>
  );
}
