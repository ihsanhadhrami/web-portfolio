import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { Seo } from '@/components/seo';
import { SITE } from '@/constants/site';
import { certificates, education, formatMonth } from '@/data/background';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/animations/reveal';
import { Stagger, StaggerItem } from '@/components/animations/stagger';
import { CertificateCard } from '@/components/cards/certificate-card';

/**
 * The "More about me" page, linked from the homepage's About section:
 * education and certificates. Work lives on the projects, so it is not
 * repeated here.
 */
export default function BackgroundPage() {
  return (
    <>
      <Seo
        title="Education & certifications"
        description={`${SITE.name}'s degree in Arabic Language and Literature, and certifications in AI, prompting, Python, and digital marketing.`}
        path="/about/background"
      />

      <Container className="pt-10">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link to="/#about">
            <ArrowLeft className="size-4" />
            Back to About
          </Link>
        </Button>
      </Container>

      <PageHeader
        eyebrow="More about me"
        title="Education & certifications."
        description="A degree in Arabic Language and Literature, which is where the translation work comes from, and the courses behind the move into Python, the web, and AI."
      />

      <Section>
        <Reveal className="flex flex-col gap-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <GraduationCap className="size-5 text-primary" aria-hidden="true" />
            Education
          </h2>
          {education.map((item) => (
            <div
              key={item.institution}
              className="flex max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-card p-6"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {formatMonth(item.start)} – {formatMonth(item.end)}
              </span>
              <h3 className="text-lg font-semibold tracking-tight">
                {item.institution}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.qualification}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.location}
                {item.grade && <> · Grade {item.grade}</>}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section className="border-t border-border">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Certifications
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Select a certificate to view it full size.
          </p>
        </div>
        <Stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <StaggerItem key={certificate.image}>
              <CertificateCard certificate={certificate} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
