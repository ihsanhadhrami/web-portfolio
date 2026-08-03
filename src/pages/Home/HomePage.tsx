import { Seo } from '@/components/seo';
import { SITE, SOCIAL_LINKS } from '@/constants/site';
import { services } from '@/data/services';
import { Hero } from '@/components/sections/hero';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { ServicesSection } from '@/components/sections/services-section';
import { AboutSection } from '@/components/sections/about-section';
import { TechStack } from '@/components/sections/tech-stack';
import { ContactCta } from '@/components/sections/contact-cta';

const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;
const SERVICE_ID = `${SITE.url}/#service`;

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
  name: `${SITE.name} — Web Development & Digital Product Engineering`,
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

export default function HomePage() {
  return (
    <>
      <Seo
        path="/"
        jsonLd={[websiteJsonLd, personJsonLd, professionalServiceJsonLd]}
      />
      <Hero />
      <FeaturedProjects />
      <ServicesSection limit={4} />
      <AboutSection />
      <TechStack />
      <ContactCta />
    </>
  );
}
