import {
  siCloudflare,
  siHuggingface,
  siLangchain,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siOpenrouter,
  siPandas,
  siPostgresql,
  siPytest,
  siPython,
  siReact,
  siSelenium,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons';

/**
 * Brand marks rendered from the official `simple-icons` package rather than
 * their CDN. The site ships `img-src 'self' data:` in its CSP, so a remote
 * <img> would be blocked in production; importing the path data keeps the
 * policy locked down and drops an external request from the critical path.
 *
 * Add an entry here when a skill in `data/skills.ts` introduces a new slug.
 */
const BRANDS = {
  cloudflare: siCloudflare,
  huggingface: siHuggingface,
  langchain: siLangchain,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  numpy: siNumpy,
  openrouter: siOpenrouter,
  pandas: siPandas,
  postgresql: siPostgresql,
  pytest: siPytest,
  python: siPython,
  react: siReact,
  selenium: siSelenium,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  vite: siVite,
} as const;

interface BrandIconProps {
  /** simple-icons slug. Renders nothing when unknown. */
  slug: string;
  className?: string;
}

/**
 * Always decorative: every call site pairs the mark with its visible text
 * label, so announcing the brand name again would just be noise.
 */
export function BrandIcon({ slug, className }: BrandIconProps) {
  const icon = BRANDS[slug as keyof typeof BRANDS];
  if (!icon) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}
