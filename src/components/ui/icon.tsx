import {
  Gauge,
  Github,
  HelpCircle,
  Languages,
  LayoutDashboard,
  Linkedin,
  type LucideIcon,
  type LucideProps,
  Mail,
  Palette,
  Rocket,
  Server,
  Twitter,
  Workflow,
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
  Languages,
  Palette,
  Rocket,
  Server,
  Workflow,
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
