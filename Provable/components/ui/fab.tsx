"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import { Plus } from 'lucide-react';

export interface FabProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export function Fab({
  onClick,
  icon,
  size = 'medium',
  position = 'bottom-right',
  className,
}: FabProps) {
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-14 h-14",
    large: "w-16 h-16",
  };

  const iconSizes = {
    small: "w-5 h-5",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  };

  const positionClasses = {
    'bottom-right': "bottom-4 right-4",
    'bottom-left': "bottom-4 left-4",
    'top-right': "top-4 right-4",
    'top-left': "top-4 left-4",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "fixed z-40",
        "bg-[--color-primary-turquoise] text-[--color-text-tertiary]",
        "rounded-full shadow-lg",
        "flex items-center justify-center",
        "transition-all duration-200",
        "hover:scale-105 hover:shadow-xl",
        "active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-[--color-primary-turquoise] focus:ring-offset-2 focus:ring-offset-[--color-bg-dark]",
        sizeClasses[size],
        positionClasses[position],
        className
      )}
    >
      {icon || <Plus className={iconSizes[size]} />}
    </button>
  );
}
