"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import { Text } from './text';

export interface InfoRowProps {
  label: string;
  value: string | React.ReactNode;
  variant?: 'default' | 'link' | 'success' | 'warning';
  onValueClick?: () => void;
  className?: string;
}

export function InfoRow({ 
  label, 
  value, 
  variant = 'default',
  onValueClick,
  className 
}: InfoRowProps) {
  const valueClasses = {
    default: "text-[--color-text-primary]",
    link: "text-[--color-primary-turquoise] hover:underline cursor-pointer",
    success: "text-[--color-success]",
    warning: "text-[--color-warning]",
  };

  const isClickable = variant === 'link' && onValueClick;

  return (
    <div className={cn(
      "flex justify-between items-center py-2",
      "border-b border-[--color-bg-secondary] last:border-b-0",
      className
    )}>
      <Text size="sm" color="secondary">
        {label}
      </Text>
      
      {isClickable ? (
        <button
          type="button"
          onClick={onValueClick}
          className={cn(
            "text-sm font-medium text-right",
            valueClasses[variant]
          )}
        >
          {value}
        </button>
      ) : (
        <Text 
          size="sm" 
          weight="medium"
          className={cn(
            "text-right",
            valueClasses[variant]
          )}
        >
          {value}
        </Text>
      )}
    </div>
  );
}
