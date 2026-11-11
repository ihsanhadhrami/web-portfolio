import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';

/**
 * PLACEHOLDER COPY: swap in a line of your own choosing. Each entry is
 * one rendering of the same sentence; keep the translations your own,
 * since this card is the first proof of the translation side of the work.
 */
const LINES = [
  { code: 'AR', lang: 'ar', dir: 'rtl', text: 'اللغة جسرٌ بين الناس.' },
  {
    code: 'MS',
    lang: 'ms',
    dir: 'ltr',
    text: 'Bahasa ialah jambatan antara manusia.',
  },
  {
    code: 'EN',
    lang: 'en',
    dir: 'ltr',
    text: 'Language is a bridge between people.',
  },
] as const;

/** The deterministic checks Rāṣid runs before a human signs off. */
const CHECKS = ['Numbers', 'Glossary', 'Human review'] as const;

/**
 * Hero side panel: one sentence in the three working languages, with the
 * review checks underneath. Shows "where language meets software" rather
 * than saying it. Desktop only; on phones the hero stays short.
 */
export function HeroTranslationCard() {
  return (
    <motion.figure
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      aria-label="One sentence translated into Arabic, Malay, and English"
      className="hidden w-full max-w-sm flex-col rounded-2xl border border-border bg-card/70 shadow-glow backdrop-blur-sm lg:flex"
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground"
      >
        <span>Translation</span>
        <span>AR · MS · EN</span>
      </motion.div>

      <div className="flex flex-col divide-y divide-border">
        {LINES.map((line) => (
          <motion.div
            key={line.code}
            variants={fadeUp}
            className="flex flex-col gap-1.5 px-5 py-4"
          >
            <span className="font-mono text-[0.7rem] tracking-widest text-primary">
              {line.code}
            </span>
            <p
              lang={line.lang}
              dir={line.dir}
              className={
                line.lang === 'ar'
                  ? 'font-arabic text-2xl leading-relaxed text-foreground'
                  : 'text-base leading-snug text-foreground/90'
              }
            >
              {line.text}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.ul
        variants={fadeUp}
        className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border px-5 py-3 text-xs text-muted-foreground"
      >
        {CHECKS.map((check) => (
          <li key={check} className="flex items-center gap-1.5">
            <Check className="size-3.5 text-emerald-500" aria-hidden="true" />
            {check}
          </li>
        ))}
      </motion.ul>
    </motion.figure>
  );
}
