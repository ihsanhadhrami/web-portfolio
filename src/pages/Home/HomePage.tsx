import { Seo } from '@/components/seo';
import { SITE } from '@/constants/site';
import { Hero } from '@/components/sections/hero';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { ServicesSection } from '@/components/sections/services-section';
import { AboutSection } from '@/components/sections/about-section';
import { TechStack } from '@/components/sections/tech-stack';
import { ContactCta } from '@/components/sections/contact-cta';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  jobTitle: SITE.role,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  sameAs: [
    'https://github.com/ihsanhadhrami',
    'https://www.linkedin.com/in/ihsan-hadhrami-ab0368287',
  ],
};

export default function HomePage() {
  return (
    <>
      <Seo path="/" jsonLd={personJsonLd} />
      <Hero />
      <FeaturedProjects />
      <ServicesSection limit={4} />
      <AboutSection />
      <TechStack />
      <ContactCta />
    </>
  );
}
