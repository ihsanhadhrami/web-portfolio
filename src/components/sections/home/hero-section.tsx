import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE } from '@/constants/site';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { SnapSection } from './snap-section';

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <SnapSection id="hero" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-radial-glow pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-2/3"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex max-w-4xl flex-col"
      >
        <motion.h1
          variants={fadeUp}
          className="text-display font-display font-bold text-balance"
        >
          {SITE.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {SITE.role}. {SITE.focus}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => onNavigate('work')}
          >
            View work
            <ArrowDown className="size-4" />
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Link to="/articles">
              Read articles
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/*
        Kept despite being a pattern usually worth cutting: with mandatory
        snapping there is no content peeking above the fold, so the usual
        "there is more below" affordance is gone. On a phone this is the
        only cue that the page continues. Motion is handled by the global
        MotionConfig, so it goes static under reduced-motion.
      */}
      <motion.button
        type="button"
        onClick={() => onNavigate('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute inset-x-0 bottom-8 mx-auto flex w-fit items-center gap-2 rounded-full px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex"
        >
          <ArrowDown className="size-4" />
        </motion.span>
        <span className="hidden sm:inline">Scroll to explore</span>
        <span className="sm:hidden">Swipe to explore</span>
      </motion.button>
    </SnapSection>
  );
}
