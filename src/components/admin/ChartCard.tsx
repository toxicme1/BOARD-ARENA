import type { ReactNode } from 'react';
import { Card } from '../ui/Card';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  badge?: ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  icon,
  children,
  className = '',
  footer,
  badge,
}: ChartCardProps) {
  return (
    <Card variant="elevated" padding="lg" className={`flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between pb-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold uppercase tracking-wider font-headline text-on-surface">{title}</span>
            {badge}
          </div>
          {subtitle && <span className="text-xs text-on-surface-variant">{subtitle}</span>}
        </div>
        {icon && <span className="p-1.5 rounded bg-surface-container-highest text-primary">{icon}</span>}
      </div>
      <div className="flex-1">{children}</div>
      {footer && <div className="mt-4 pt-4 border-t border-outline-variant/50">{footer}</div>}
    </Card>
  );
}