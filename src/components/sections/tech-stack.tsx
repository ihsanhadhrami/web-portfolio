import { skillGroups } from '@/data/skills';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/animations/reveal';
import { Stagger, StaggerItem } from '@/components/animations/stagger';

export function TechStack() {
  return (
    <Section id="stack" className="border-t border-border">
      <SectionHeading
        eyebrow="Toolkit"
        title="A stack chosen for the long run."
        description="Tools I reach for to build fast, typed, and maintainable products."
      />

      <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <StaggerItem
            key={group.category}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-sm text-foreground/90"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-6 text-center text-sm text-muted-foreground">
        …and a healthy curiosity for whatever comes next.
      </Reveal>
    </Section>
  );
}
