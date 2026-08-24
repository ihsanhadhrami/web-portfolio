import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { ScrollToTop } from './scroll-to-top';
import { RouteFallback } from './route-fallback';

/**
 * App shell: skip link, navbar, routed page content, and footer.
 *
 * The homepage owns its own chrome. It scrolls inside a snap container
 * that has to BE the main landmark (not sit inside one), and it ships a
 * section nav in place of the global navbar, so this layout hands it the
 * bare outlet and lets it render its own <header> and <main>. Wrapping it
 * here instead would nest that header inside <main>, where it stops being
 * a banner landmark. Its closing Contact panel already carries the contact
 * links and copyright the footer would otherwise repeat.
 */
export function RootLayout() {
  const isHome = useLocation().pathname === '/';

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <ScrollToTop />

      {isHome ? (
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      ) : (
        <>
          <Navbar />
          <main id="main" className="flex-1 pt-16">
            <Suspense fallback={<RouteFallback />}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
