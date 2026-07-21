import { RouterProvider } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { ErrorBoundary } from '@/components/layout/error-boundary';
import { router } from './routes';

/**
 * App root. Composes global providers:
 *  - ErrorBoundary: catches render errors instead of crashing to blank.
 *  - ThemeProvider: dark-first theme with persistence.
 *  - MotionConfig: honors `prefers-reduced-motion` for all animations.
 *  - RouterProvider: the code-split route tree.
 */
export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <RouterProvider router={router} />
        </MotionConfig>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
