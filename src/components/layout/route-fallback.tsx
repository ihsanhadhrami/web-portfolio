import { Loader2 } from 'lucide-react';
import { SITE } from '@/constants/site';

/**
 * Lightweight loading state shown while a lazy route chunk loads.
 *
 * It also renders a <title>, which matters more than it looks: every route
 * is code-split, index.html ships no static <title> (the per-route one is
 * owned by <Seo>), so without this the document has no title at all for as
 * long as the chunk takes to arrive. That window is what an axe scan and a
 * screen reader both land in. React swaps in the route's own title as soon
 * as the page mounts and this fallback unmounts.
 */
export function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <title>{`${SITE.name} — ${SITE.role}`}</title>
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
