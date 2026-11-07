import type { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-headline transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary text-on-primary font-bold shadow-md hover:opacity-95',
    secondary: 'bg-surface-container-high text-on-surface font-semibold border border-outline-variant hover:bg-surface-container-highest',
    ghost: 'text-on-surface-variant font-medium hover:text-on-surface hover:bg-surface-container-high',
    icon: 'p-2.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 rounded-lg text-xs',
    md: 'px-4 py-2.5 rounded-xl text-sm',
    lg: 'px-6 py-3 rounded-xl text-base',
  };

  const iconSizeClasses = {
    sm: 'p-2',
    md: 'p-2.5',
    lg: 'p-3',
  };

  const isIconOnly = variant === 'icon';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${isIconOnly ? iconSizeClasses[size] : sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="material-symbols-outlined animate-spin mr-2" style={{ fontVariationSettings: "'FILL' 0" }}>
          progress_activity
        </span>
      )}
      {children}
    </button>
  );
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  'aria-label': string;
}

export function IconButton({ icon, size = 'md', 'aria-label': ariaLabel, className = '', ...props }: IconButtonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high active:scale-95 transition-colors ${sizeClasses[size]} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </button>
  );
}