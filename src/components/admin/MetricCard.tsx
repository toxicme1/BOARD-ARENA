import type { ReactNode } from 'react';
import { Card } from '../ui/Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconColor: 'primary' | 'tertiary' | 'secondary' | 'purple';
  trend?: {
    value: string;
    label?: string;
    positive?: boolean;
  };
  subLabel?: string;
  sparkline?: ReactNode;
  className?: string;
}

const iconColorClasses = {
  primary: 'text-primary bg-primary/10',
  tertiary: 'text-tertiary bg-tertiary/10',
  secondary: 'text-secondary bg-secondary/10',
  purple: 'text-primary-fixed-dim bg-primary-fixed-dim/10',
};

export function MetricCard({
  title,
  value,
  icon,
  iconColor = 'primary',
  trend,
  subLabel,
  sparkline,
  className = '',
}: MetricCardProps) {
  return (
    <Card variant="elevated" padding="lg" className={`relative overflow-hidden flex flex-col justify-between ${className}`}>
      <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl pointer-events-none" style={{
        backgroundColor: `color-mix(in srgb, var(--color-${iconColor}) 10%, transparent)`
      }} />
      <div className="flex items-start justify-between relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">{title}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight font-headline">{value}</span>
            {trend && (
              <span className={`inline-flex items-center gap-1 font-mono text-[11px] ${trend.positive !== false ? 'text-tertiary' : 'text-error'}`}>
                <span className="material-symbols-outlined text-[15px]">{trend.positive !== false ? 'trending_up' : 'trending_down'}</span>
                {trend.value}
              </span>
            )}
          </div>
        </div>
        <div className={`p-2.5 rounded-lg ${iconColorClasses[iconColor]}`}>
          {icon}
        </div>
      </div>

      {sparkline && (
        <div className="my-3 py-1 relative z-10">
          {sparkline}
        </div>
      )}

      {(trend?.label || subLabel) && (
        <div className="flex items-center justify-between pt-2 text-xs relative z-10">
          {trend?.label && (
            <span className={`inline-flex items-center gap-1 font-mono ${trend.positive !== false ? 'text-tertiary' : 'text-on-surface-variant'} font-medium`}>
              <span className="material-symbols-outlined text-[15px]">{trend.positive !== false ? 'verified' : 'warning'}</span>
              {trend.label}
            </span>
          )}
          {subLabel && (
            <span className="text-on-surface-variant text-[11px] font-mono">{subLabel}</span>
          )}
        </div>
      )}
    </Card>
  );
}