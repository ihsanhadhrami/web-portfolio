import { skillGroups } from '@/data/skills';
import { Icon } from '@/components/ui/icon';
import { BrandIcon } from '@/components/ui/brand-icon';
import { Stagger, StaggerItem } from '@/components/animations/stagger';
import { Reveal } from '@/components/animations/reveal';
import { SnapSection } from './snap-section';

interface SkillsSectionProps {
  number: string;
  label: string;
}

export function SkillsSection({ number, label }: SkillsSectionProps) {
  return (
    <SnapSection id="skills" number={number} label={label}>
      <Reveal>
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          What I work with.
        </h2>
      </Reveal>

      <Stagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-12 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <StaggerItem key={group.category} className="flex flex-col gap-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Icon name={group.icon} className="size-4 text-primary" />
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-2 py-1 text-xs text-foreground/90"
                >
                  {skill.brand && (
                    <BrandIcon
                      slug={skill.brand}
                      className="size-3 text-muted-foreground"
                    />
                  )}
                  {skill.name}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </SnapSection>
  );
}
