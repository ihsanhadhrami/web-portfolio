import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, GraduationCap } from 'lucide-react';
import { Seo } from '@/components/seo';
import { SITE } from '@/constants/site';
import {
  certificates,
  education,
  experience,
  formatMonth,
} from '@/data/background';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/animations/reveal';
import { Stagger, StaggerItem } from '@/components/animations/stagger';
import { CertificateCard } from '@/components/cards/certificate-card';

const breadcrumbJsonLd = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'About',
      item: `${SITE.url}/about`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Background',
      item: `${SITE.url}/about/background`,
    },
  ],
};

function Period({ start, end }: { start: string; end: string }) {
  return (
    <span className="font-mono text-xs text-muted-foreground">
      {formatMonth(start)} – {formatMonth(end)}
    </span>
  );
}

/** Education, early experience, and certificates: the "more about me" page. */
export default function BackgroundPage() {
  return (
    <>
      <Seo
        title="Background & certifications"
        description={`${SITE.name}'s education in Arabic Language and Literature, digital marketing experience, and certifications in AI, prompting, and Python.`}
        path="/about/background"
        jsonLd={breadcrumbJsonLd}
      />

      <Container className="pt-10">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link to="/about">
            <ArrowLeft className="size-4" />
            Back to About
          </Link>
        </Button>
      </Container>

      <PageHeader
        eyebrow="More about me"
        title="Background & certifications."
        description="I studied Arabic Language and Literature, which is where the translation work comes from. A digital marketing apprenticeship pulled me toward building for the web, and from there I moved into Python, full-stack development, and now AI applications."
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <GraduationCap
                className="size-5 text-primary"
                aria-hidden="true"
              />
              Education
            </h2>
            {education.map((item) => (
              <div
                key={item.institution}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6"
              >
                <Period start={item.start} end={item.end} />
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

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <Briefcase className="size-5 text-primary" aria-hidden="true" />
              Experience
            </h2>
            {experience.map((item) => (
              <div
                key={`${item.organization}-${item.start}`}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6"
              >
                <Period start={item.start} end={item.end} />
                <h3 className="text-lg font-semibold tracking-tight">
                  {item.role}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.organization} · {item.type} · {item.location}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
                <ul className="mt-1 flex flex-col gap-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
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
