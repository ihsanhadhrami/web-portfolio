import { RouterProvider } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { router } from './routes';

/**
 * App root. Composes global providers:
 *  - ThemeProvider: dark-first theme with persistence.
 *  - MotionConfig: honors `prefers-reduced-motion` for all animations.
 *  - RouterProvider: the code-split route tree.
 */
export function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </ThemeProvider>
  );
}
