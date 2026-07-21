import { Link } from 'react-router-dom';
import { NAV_LINKS, SITE, SOCIAL_LINKS } from '@/constants/site';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Logo } from './logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {SITE.shortBio}
            </p>
            <p className="text-sm text-muted-foreground">{SITE.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2">
            <nav aria-label="Footer">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Navigate
              </h2>
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Connect
              </h2>
              <ul className="flex flex-col gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon name={link.icon} className="size-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs">
            Built with React, TypeScript &amp; Tailwind CSS.
          </p>
        </div>
      </Container>
    </footer>
  );
}
