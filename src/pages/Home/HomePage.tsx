import { useCallback, useRef } from 'react';
import { Seo } from '@/components/seo';
import {
  HOME_SECTIONS,
  type HomeSectionId,
  SITE,
  SOCIAL_LINKS,
  sectionNumber,
} from '@/constants/site';
import { services } from '@/data/services';
import { useActiveSection } from '@/hooks/use-active-section';
import { HomeNav } from '@/components/sections/home/home-nav';
import { HeroSection } from '@/components/sections/home/hero-section';
import { AboutSection } from '@/components/sections/home/about-section';
import { SkillsSection } from '@/components/sections/home/skills-section';
import { WorkSection } from '@/components/sections/home/work-section';
import { WritingSection } from '@/components/sections/home/writing-section';
import { ContactSection } from '@/components/sections/home/contact-section';

const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;
const SERVICE_ID = `${SITE.url}/#service`;

/** Module-level so the scroll-spy's dependency array stays stable. */
const SECTION_IDS = HOME_SECTIONS.map((section) => section.id);

/** Position label lookup, e.g. about -> "02". */
const NUMBER_BY_ID = Object.fromEntries(
  HOME_SECTIONS.map((section, i) => [section.id, sectionNumber(i)]),
) as Record<HomeSectionId, string>;

/** Real profile links only — excludes the mailto: entry, which isn't a profile URL. */
const profileUrls = SOCIAL_LINKS.filter((link) =>
  link.href.startsWith('http'),
).map((link) => link.href);

const personJsonLd = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE.name,
  jobTitle: SITE.role,
  description: SITE.shortBio,
  url: SITE.url,
  image: `${SITE.url}/profile.jpg`,
  email: `mailto:${SITE.email}`,
  sameAs: profileUrls,
};

const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: SITE.shortBio,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
};

/**
 * Represents the freelance services actually listed on /services — not a
 * registered business with a physical address, so no address, telephone,
 * priceRange, or rating is declared. Omitting those is correct: Google
 * simply ignores absent optional fields rather than penalizing them, and
 * fabricating any of them would violate schema.org's factual-accuracy
 * guidelines.
 */
const professionalServiceJsonLd = {
  '@type': 'ProfessionalService',
  '@id': SERVICE_ID,
  name: `${SITE.name} — Web Development & Automation Engineering`,
  description: SITE.shortBio,
  url: `${SITE.url}/services`,
  image: `${SITE.url}/og-image.png`,
  areaServed: 'Worldwide',
  provider: { '@id': PERSON_ID },
  sameAs: profileUrls,
  makesOffer: services.map((service) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
    },
  })),
};

/**
 * The homepage scrolls inside its own snap container rather than on the
 * document, so only this route gets the one-section-per-viewport pacing and
 * every other route keeps normal document scrolling.
 */
export default function HomePage() {
  const containerRef = useRef<HTMLElement>(null);
  const activeId = useActiveSection(SECTION_IDS, containerRef);

  const goToSection = useCallback((id: string) => {
    // No `behavior` argument on purpose: the container sets
    // `scroll-behavior: smooth` in CSS and drops it under
    // `prefers-reduced-motion`, so the preference is honored here for free.
    containerRef.current?.querySelector(`#${id}`)?.scrollIntoView({
      block: 'start',
    });
  }, []);

  return (
    <>
      <Seo
        path="/"
        jsonLd={[websiteJsonLd, personJsonLd, professionalServiceJsonLd]}
      />

      <HomeNav activeId={activeId} onNavigate={goToSection} />

      {/* The scroll container is the main landmark itself: nesting it
          inside another <main> would put the section nav's <header>
          inside main, where it stops being a banner. */}
      <main id="main" ref={containerRef} className="snap-container">
        <HeroSection onNavigate={goToSection} />
        <AboutSection number={NUMBER_BY_ID.about} label="About" />
        <SkillsSection number={NUMBER_BY_ID.skills} label="Skills" />
        <WorkSection number={NUMBER_BY_ID.work} label="Work" />
        <WritingSection number={NUMBER_BY_ID.writing} label="Writing" />
        <ContactSection number={NUMBER_BY_ID.contact} label="Contact" />
      </main>
    </>
  );
}
