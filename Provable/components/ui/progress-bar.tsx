"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import { Text } from './text';

export interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  size?: 'small' | 'medium';
  className?: string;
}

export function ProgressBar({ 
  value, 
  label, 
  showPercentage = false,
  size = 'medium',
  className 
}: ProgressBarProps) {
  const sizeClasses = {
    small: "h-1",
    medium: "h-1.5",
  };

  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {/* Label and Percentage */}
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <Text size="xs" color="secondary">
              {label}
            </Text>
          )}
          {showPercentage && (
            <Text size="xs" color="primary">
              {Math.round(clampedValue)}%
            </Text>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className={cn(
        "w-full bg-[--color-bg-secondary] rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <div
          className={cn(
            "h-full bg-gradient-to-r from-[--color-primary-gradient-start] to-[--color-primary-gradient-end]",
            "transition-all duration-300 ease-out"
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
