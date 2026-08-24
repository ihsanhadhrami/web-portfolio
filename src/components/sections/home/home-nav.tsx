import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { HOME_SECTIONS, SITE, sectionNumber } from '@/constants/site';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

/**
 * The hero is reachable by the initials mark in the corner, so listing it
 * again would spend nav width on a duplicate destination.
 */
const NAV_SECTIONS = HOME_SECTIONS.map((section, index) => ({
  ...section,
  number: sectionNumber(index),
})).filter((section) => section.id !== 'hero');

interface HomeNavProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export function HomeNav({ activeId, onNavigate }: HomeNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollLock(menuOpen);

  // Escape closes the menu; a full-screen overlay with no keyboard exit is
  // a trap for anyone not using a pointer.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Homepage sections"
        className="pointer-events-auto mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="/"
          aria-label={`${SITE.name} — reload home page`}
          className="rounded-md font-display text-lg font-bold tracking-tight"
        >
          {SITE.initials}
        </a>

        <div className="flex items-center gap-1.5">
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_SECTIONS.map((section) => {
              const active = activeId === section.id;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => go(section.id)}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'rounded-full px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {section.label}
                  </button>
                </li>
              );
            })}
            <li>
              <Link
                to="/articles"
                className="ml-2 inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                Articles
                <ArrowUpRight className="size-3.5" />
              </Link>
            </li>
          </ul>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {NAV_SECTIONS.map((section, i) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="border-b border-border last:border-0"
                >
                  <button
                    type="button"
                    onClick={() => go(section.id)}
                    className="flex w-full items-baseline gap-4 py-4 text-left"
                  >
                    <span className="font-mono text-xs text-primary">
                      {section.number}
                    </span>
                    <span
                      className={cn(
                        'font-display text-2xl font-bold tracking-tight',
                        activeId === section.id
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      {section.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="px-5 pt-2">
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/articles">
                  Articles
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
