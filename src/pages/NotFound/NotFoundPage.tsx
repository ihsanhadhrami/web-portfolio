import { Seo } from '@/components/seo';
import { NotFoundBlock } from '@/components/sections/not-found-block';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you're looking for doesn't exist."
      />
      <NotFoundBlock
        code="404"
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        actionLabel="Back to home"
        actionTo="/"
      />
    </>
  );
}
