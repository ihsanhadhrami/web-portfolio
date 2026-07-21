/**
 * Maps a project's `accent` token to a gradient used by placeholder covers.
 * Centralized so covers stay consistent and easy to extend.
 */
const ACCENT_GRADIENTS: Record<string, string> = {
  violet: 'from-violet-500/30 via-violet-500/10 to-transparent',
  blue: 'from-blue-500/30 via-blue-500/10 to-transparent',
  emerald: 'from-emerald-500/30 via-emerald-500/10 to-transparent',
  amber: 'from-amber-500/30 via-amber-500/10 to-transparent',
  rose: 'from-rose-500/30 via-rose-500/10 to-transparent',
  cyan: 'from-cyan-500/30 via-cyan-500/10 to-transparent',
};

const DEFAULT_GRADIENT = 'from-violet-500/30 via-violet-500/10 to-transparent';

export function accentGradient(accent?: string): string {
  return (accent && ACCENT_GRADIENTS[accent]) || DEFAULT_GRADIENT;
}
