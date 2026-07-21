import { Check } from 'lucide-react';
import type { Service } from '@/types';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group relative flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-foreground/20 sm:p-8',
        className,
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
        <Icon name={service.icon} className="size-5" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold tracking-tight">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>

      <ul className="mt-auto flex flex-col gap-2 pt-2">
        {service.deliverables.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Check
              className="size-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
