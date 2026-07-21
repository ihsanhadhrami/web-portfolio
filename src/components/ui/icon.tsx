import {
  Gauge,
  Github,
  HelpCircle,
  LayoutDashboard,
  Linkedin,
  type LucideIcon,
  type LucideProps,
  Mail,
  Palette,
  Rocket,
  Twitter,
} from 'lucide-react';

/**
 * Curated icon registry. Keeping a fixed map (rather than importing all of
 * `lucide-react`) lets the bundler tree-shake down to only what we use,
 * while data files stay declarative by referencing icons by name.
 *
 * Add an entry here when a data file introduces a new icon name.
 */
const REGISTRY: Record<string, LucideIcon> = {
  LayoutDashboard,
  Palette,
  Rocket,
  Gauge,
  Github,
  Linkedin,
  Twitter,
  Mail,
};

interface IconProps extends LucideProps {
  /** A registered icon name. Falls back to a neutral placeholder. */
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = REGISTRY[name] ?? HelpCircle;
  return <LucideIcon aria-hidden="true" {...props} />;
}
