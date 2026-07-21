import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SITE } from '@/constants/site';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { fadeUp, staggerContainer } from '@/lib/motion';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-24">
      {/* Ambient backdrop */}
      <div
        aria-hidden="true"
        className="bg-radial-glow pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
      />

      <Container className="py-20 sm:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {SITE.availability}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-display mt-8 font-semibold text-balance"
          >
            Building digital products that feel{' '}
            <span className="text-gradient">effortless</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I'm {SITE.name.split(' ')[0]}, a web developer and digital product
            engineer. I turn ambitious ideas into fast, accessible, and
            beautifully engineered interfaces.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/projects">
                View my work
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link to="/contact">
                <Sparkles className="size-4" />
                Start a project
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
