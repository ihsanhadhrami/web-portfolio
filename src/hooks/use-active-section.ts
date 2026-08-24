import { useEffect, useState, type RefObject } from 'react';

/**
 * Scroll-spy for the snap-scrolled homepage.
 *
 * Uses IntersectionObserver against the scroll container rather than a
 * scroll listener: the homepage scrolls inside its own element (so
 * `window.scrollY` never changes), and a per-frame listener would re-render
 * the nav on every frame for a value that changes once per section.
 */
export function useActiveSection(
  ids: readonly string[],
  containerRef: RefObject<HTMLElement | null>,
): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Mandatory snapping means exactly one section is past half-visible
      // at rest, so a single 0.55 threshold resolves unambiguously.
      { root, threshold: 0.55 },
    );

    const sections = ids
      .map((id) => root.querySelector(`#${id}`))
      .filter((el): el is Element => el !== null);

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, containerRef]);

  return active;
}
