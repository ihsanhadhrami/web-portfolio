import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { fadeUp, staggerContainer } from '@/lib/motion';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/** Consistent hero band for inner pages. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="bg-radial-glow pointer-events-none absolute inset-0 -z-10"
      />
      <Container className="py-20 sm:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex max-w-3xl flex-col gap-5"
        >
          {eyebrow && (
            <motion.div variants={fadeUp}>
              <Badge variant="accent" className="w-fit">
                {eyebrow}
              </Badge>
            </motion.div>
          )}
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
