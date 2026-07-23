import { Clock, Mail, MapPin } from 'lucide-react';
import { Seo } from '@/components/seo';
import { SITE, SOCIAL_LINKS } from '@/constants/site';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/ui/section';
import { Icon } from '@/components/ui/icon';
import { CopyEmail } from '@/components/ui/copy-email';
import { Reveal } from '@/components/animations/reveal';
import { ContactForm } from '@/components/sections/contact-form';

const DETAILS = [
  { icon: Mail, label: 'Email', value: SITE.email },
  { icon: MapPin, label: 'Location', value: SITE.location },
  { icon: Clock, label: 'Response time', value: 'Within 1–2 business days' },
] as const;

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description={`Get in touch with ${SITE.name} to discuss your next web project.`}
        path="/contact"
      />
      <PageHeader
        eyebrow="Contact"
        title="Let's build something."
        description="Tell me about your project and I'll get back to you shortly. I'm currently available for freelance and full-time work."
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="flex flex-col gap-8 lg:col-span-2">
            <div className="flex flex-col gap-6">
              {DETAILS.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/40 text-primary">
                    <detail.icon className="size-4" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {detail.label}
                    </span>
                    {detail.label === 'Email' ? (
                      <CopyEmail email={detail.value} />
                    ) : (
                      <span className="text-sm font-medium">
                        {detail.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-6">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Elsewhere
              </span>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={link.label}
                    className="flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                  >
                    <Icon name={link.icon} className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
