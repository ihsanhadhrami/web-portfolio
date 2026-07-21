import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { SITE } from '@/constants/site';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/animations/reveal';

export function ContactCta() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-16 sm:py-24">
          <div
            aria-hidden="true"
            className="bg-radial-glow pointer-events-none absolute inset-0"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              Have a project in mind?
            </h2>
            <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              I'm currently taking on new freelance and full-time work. Tell me
              what you're building and let's make it exceptional.
            </p>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/contact">
                  Start a conversation
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <a href={`mailto:${SITE.email}`}>
                  <Mail className="size-4" />
                  {SITE.email}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
