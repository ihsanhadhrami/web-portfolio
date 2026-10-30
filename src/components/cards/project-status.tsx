import { Badge } from '@/components/ui/badge';

/**
 * The "still being built" label, shared by the project card, the homepage
 * carousel, and the project page so it reads the same everywhere.
 * Renders nothing for shipped projects.
 */
export function ProjectStatus({ status }: { status?: string }) {
  if (!status) return null;

  return (
    <Badge variant="outline">
      <span className="size-1.5 rounded-full bg-amber-500" aria-hidden="true" />
      {status}
    </Badge>
  );
}
