import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from '@/lib/theme-context';

/** Access the current theme and setters. Must be used within `ThemeProvider`. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
