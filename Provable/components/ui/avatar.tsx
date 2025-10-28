"use client";
import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** User name for initials fallback */
  name?: string;
  /** Size variant */
  size?: AvatarSize;
  /** Online status indicator */
  status?: AvatarStatus;
  /** Additional CSS classes */
  className?: string;
  /** Click handler for interactive avatars */
  onClick?: () => void;
  /** Priority loading for above-the-fold avatars */
  priority?: boolean;
  /** Custom aria-label */
  'aria-label'?: string;
}

const sizeConfig = {
  xs: { container: "w-6 h-6", text: "text-xs", status: "w-1.5 h-1.5 -bottom-0.5 -right-0.5" },
  sm: { container: "w-8 h-8", text: "text-sm", status: "w-2 h-2 -bottom-0.5 -right-0.5" },
  md: { container: "w-10 h-10", text: "text-sm", status: "w-2.5 h-2.5 -bottom-0.5 -right-0.5" },
  lg: { container: "w-12 h-12", text: "text-base", status: "w-3 h-3 -bottom-1 -right-1" },
  xl: { container: "w-16 h-16", text: "text-lg", status: "w-3.5 h-3.5 -bottom-1 -right-1" },
  '2xl': { container: "w-20 h-20", text: "text-xl", status: "w-4 h-4 -bottom-1.5 -right-1.5" },
} as const;

const statusColors = {
  online: "bg-[#4CAF50]",
  offline: "bg-[#757575]",
  away: "bg-[#FFC107]",
  busy: "bg-[#F44336]",
} as const;

/**
 * Senior-level Avatar component with enterprise features:
 * - Next.js Image optimization with responsive sizing
 * - Comprehensive error handling and fallbacks
 * - Status indicators (online/offline/away/busy)
 * - Accessibility-first design
 * - Performance optimizations
 * - Type-safe API
 */
export function Avatar({
  src,
  name,
  size = 'md',
  status,
  className,
  onClick,
  priority = false,
  'aria-label': ariaLabel
}: AvatarProps) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>(
    src ? 'loading' : 'loaded'
  );

  // Memoized initials generation for performance
  const initials = useMemo(() => {
    if (!name) return '';
    return name
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }, [name]);

  // Memoized size configuration
  const config = useMemo(() => sizeConfig[size], [size]);

  // Optimized event handlers with useCallback
  const handleImageLoad = useCallback(() => {
    setImageState('loaded');
  }, []);

  const handleImageError = useCallback(() => {
    setImageState('error');
  }, []);

  // Computed accessibility label
  const computedAriaLabel = ariaLabel || (name ? `${name}'s avatar` : 'Avatar');

  // Interactive vs static styling
  const interactiveClasses = onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : "";

  return (
    <div className="relative inline-block">
      <div
        role={onClick ? "button" : "img"}
        tabIndex={onClick ? 0 : undefined}
        aria-label={computedAriaLabel}
        onClick={onClick}
        onKeyDown={onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        } : undefined}
        className={cn(
          // Base styles
          "relative rounded-full overflow-hidden",
          "bg-[#1E1E1E] border-2 border-[#757575]",
          "flex items-center justify-center",
          "transition-all duration-200 ease-in-out",
          // Size-specific styles
          config.container,
          // Interactive styles
          interactiveClasses,
          // Custom classes
          className
        )}
      >
        {/* Loading Skeleton */}
        {imageState === 'loading' && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] animate-pulse" />
        )}

        {/* Optimized Image with Next.js Image */}
        {src && imageState !== 'error' && (
          <Image
            src={src}
            alt={name ? `${name}'s avatar` : 'Avatar'}
            fill
            sizes={`${size === 'xs' ? 24 : size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : size === 'xl' ? 64 : 80}px`}
            className="object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={priority}
            quality={85}
          />
        )}

        {/* Initials Fallback */}
        {(!src || imageState === 'error') && initials && (
          <span className={cn(
            "font-semibold text-[#FFFFFF] select-none",
            config.text
          )}>
            {initials}
          </span>
        )}

        {/* Generic Icon Fallback */}
        {(!src || imageState === 'error') && !initials && (
          <div className="w-1/2 h-1/2 bg-[#757575] rounded-full" />
        )}
      </div>

      {/* Status Indicator */}
      {status && (
        <div
          className={cn(
            "absolute rounded-full border-2 border-[#121212]",
            config.status,
            statusColors[status]
          )}
          aria-label={`${status} status`}
        />
      )}
    </div>
  );
}

// Compound component for advanced use cases
export const AvatarGroup: React.FC<{
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
  className?: string;
}> = ({ children, max = 3, size = 'md', className }) => {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="relative">
          {avatar}
        </div>
      ))}
      {remaining > 0 && (
        <div className={cn(
          "relative rounded-full bg-[#1E1E1E] border-2 border-[#121212]",
          "flex items-center justify-center text-[#FFFFFF] font-semibold",
          sizeConfig[size].container,
          sizeConfig[size].text
        )}>
          +{remaining}
        </div>
      )}
    </div>
  );
};
