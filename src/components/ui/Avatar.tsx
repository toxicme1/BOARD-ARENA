import type { ReactNode, ImgHTMLAttributes } from 'react';
import { useState } from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  online?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-24 h-24 text-xl',
};

const indicatorSizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
  '2xl': 'w-5 h-5',
};

export function Avatar({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  online = false,
  className = '',
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const showFallback = !src || imageError;

  return (
    <div className={`relative inline-flex ${className}`}>
      <div className={`avatar-base ${sizeClasses[size]} overflow-hidden`}>
        {!showFallback ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
            {...props}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-container-high text-on-surface-variant">
            {fallback || (
              <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>
                person
              </span>
            )}
          </div>
        )}
      </div>
      {online && (
        <span
          className={`absolute bottom-0 right-0 rounded-full bg-tertiary ring-2 ring-surface ${indicatorSizeClasses[size]}`}
          aria-label="Online"
        />
      )}
    </div>
  );
}

interface AvatarGroupProps {
  avatars: Array<{ src?: string; alt: string; size?: 'sm' | 'md' | 'lg' | 'xl' }>;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function AvatarGroup({ avatars, max = 4, size = 'md', className = '' }: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={`flex -space-x-2 ${className}`} aria-label={`${avatars.length} people`}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar key={index} size={size} src={avatar.src} alt={avatar.alt} online={false} />
      ))}
      {remainingCount > 0 && (
        <div
          className={`avatar-base ${sizeClasses[size]} bg-surface-container-high border-2 border-surface flex items-center justify-center text-on-surface-variant font-medium`}
          aria-label={`${remainingCount} more`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}