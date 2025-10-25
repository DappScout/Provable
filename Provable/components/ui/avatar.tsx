"use client";
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Avatar({ src, name, size = 'medium', className }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!src);

  const sizeClasses = {
    small: "w-10 h-10 text-sm",    // 40px
    medium: "w-12 h-12 text-base", // 48px
    large: "w-20 h-20 text-2xl",   // 80px
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden",
        "bg-[--color-bg-secondary] border-2 border-[--color-bg-secondary]",
        "flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      {/* Loading State */}
      {imageLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-[--color-bg-card] via-[--color-bg-secondary] to-[--color-bg-card] animate-pulse" />
      )}

      {/* Image */}
      {src && !imageError && (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {/* Initials Fallback */}
      {(!src || imageError) && name && (
        <span className="text-[--color-text-primary] font-semibold">
          {getInitials(name)}
        </span>
      )}

      {/* Default Fallback */}
      {(!src || imageError) && !name && (
        <div className="w-full h-full bg-[--color-bg-secondary] flex items-center justify-center">
          <div className="w-1/2 h-1/2 bg-[--color-text-tertiary] rounded-full" />
        </div>
      )}
    </div>
  );
}
