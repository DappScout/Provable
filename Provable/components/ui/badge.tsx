"use client";
import React from 'react';
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'error';
  size?: 'small' | 'medium';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'info', 
  size = 'medium',
  className 
}: BadgeProps) {
  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    medium: "px-3 py-1 text-xs",
  };

  const variantClasses = {
    success: "bg-[--color-success] text-[--color-text-tertiary]",
    warning: "bg-[--color-warning] text-[--color-text-tertiary]",
    info: "bg-transparent border border-[--color-text-tertiary] text-[--color-text-secondary]",
    error: "bg-[--color-error] text-[--color-text-primary]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
