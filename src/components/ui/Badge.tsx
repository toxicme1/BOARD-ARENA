import type { ReactNode, HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'tertiary' | 'secondary' | 'error' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  dotColor?: 'primary' | 'tertiary' | 'error' | 'secondary';
  children: ReactNode;
}

export function Badge({
  variant = 'primary',
  size = 'md',
  dot = false,
  dotColor = 'primary',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const variantClasses = {
    primary: 'bg-primary-container text-on-primary-container',
    tertiary: 'bg-tertiary-container text-tertiary',
    secondary: 'bg-surface-container-highest text-on-surface-variant',
    error: 'bg-error-container text-on-error-container',
    outline: 'bg-transparent border border-outline-variant text-on-surface-variant',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-[11px]',
  };

  const dotColorClasses = {
    primary: 'bg-primary',
    tertiary: 'bg-tertiary',
    error: 'bg-error',
    secondary: 'bg-secondary',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold tracking-wide ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColorClasses[dotColor]}`} />}
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'busy' | 'in-game' | 'away';
  size?: 'sm' | 'md';
  showText?: boolean;
}

export function StatusBadge({ status, size = 'md', showText = true }: StatusBadgeProps) {
  const statusConfig = {
    online: { label: 'Online', dotColor: 'tertiary' as const, variant: 'tertiary' as const },
    offline: { label: 'Offline', dotColor: 'secondary' as const, variant: 'secondary' as const },
    busy: { label: 'Busy', dotColor: 'error' as const, variant: 'error' as const },
    'in-game': { label: 'In Game', dotColor: 'primary' as const, variant: 'primary' as const },
    away: { label: 'Away', dotColor: 'secondary' as const, variant: 'secondary' as const },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size={size} dot dotColor={config.dotColor}>
      {showText && config.label}
    </Badge>
  );
}