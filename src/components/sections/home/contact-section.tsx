import { ArrowUpRight } from 'lucide-react';
import { SITE, SOCIAL_LINKS } from '@/constants/site';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/animations/reveal';
import { SnapSection } from './snap-section';

const profileLinks = SOCIAL_LINKS.filter((link) =>
  link.href.startsWith('http'),
);

interface ContactSectionProps {
  number: string;
  label: string;
}

/**
 * Direct links only. This is the last panel of the snap flow, so it also
 * carries the copyright line the global footer would otherwise provide.
 */
export function ContactSection({ number, label }: ContactSectionProps) {
  return (
    <SnapSection id="contact" number={number} label={label}>
      <Reveal className="flex flex-col gap-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Let&apos;s work together.
        </h2>
        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          {SITE.availability}. The fastest way to reach me is email.
        </p>

        <a
          href={`mailto:${SITE.email}`}
          className="group inline-flex w-fit items-center gap-2 rounded-md font-display text-xl font-bold tracking-tight break-all text-foreground underline decoration-primary decoration-2 underline-offset-8 transition-colors hover:text-primary sm:text-3xl lg:text-4xl"
        >
          {SITE.email}
          <ArrowUpRight
            className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-7"
            aria-hidden="true"
          />
        </a>

        <ul className="mt-2 flex flex-wrap gap-2">
          {profileLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                <Icon name={link.icon} className="size-4" />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <p className="mt-12 font-mono text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {SITE.name}
      </p>
    </SnapSection>
  );
}
