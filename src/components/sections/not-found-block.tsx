import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface NotFoundBlockProps {
  title: string;
  description: string;
  actionLabel: string;
  actionTo: string;
  /** Large, decorative status code (e.g. "404"). */
  code?: string;
}

/** Centered empty-state used for 404s and missing resources. */
export function NotFoundBlock({
  title,
  description,
  actionLabel,
  actionTo,
  code,
}: NotFoundBlockProps) {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      {code && (
        <span className="text-gradient font-mono text-7xl font-semibold sm:text-8xl">
          {code}
        </span>
      )}
      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-md text-pretty text-muted-foreground">
        {description}
      </p>
      <Button asChild className="mt-8">
        <Link to={actionTo}>
          <ArrowLeft className="size-4" />
          {actionLabel}
        </Link>
      </Button>
    </Container>
  );
}
