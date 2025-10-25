"use client";
import React from 'react';
import { cn } from "@/lib/utils";

export interface PillToggleOption {
  value: string;
  label: string;
}

export interface PillToggleProps {
  options: PillToggleOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function PillToggle({
  options,
  value,
  onChange,
  disabled = false,
  className,
}: PillToggleProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      {options.map((option) => {
        const isSelected = value === option.value;
        
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => !disabled && onChange?.(option.value)}
            disabled={disabled}
            className={cn(
              "px-4 py-2 h-9 rounded-full text-sm font-semibold",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-[--color-primary-turquoise] focus:ring-offset-2 focus:ring-offset-[--color-bg-dark]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isSelected
                ? "bg-[--color-primary-turquoise] text-[--color-text-tertiary]"
                : "bg-transparent text-[--color-text-primary] border border-[--color-text-tertiary] hover:border-[--color-primary-turquoise] hover:text-[--color-primary-turquoise]"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
