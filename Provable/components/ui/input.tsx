"use client";
import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search';
  error?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant = 'default', 
    error, 
    label, 
    leftIcon, 
    rightIcon, 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = `
      flex items-center
      h-12 px-4
      bg-[--color-bg-card]
      border border-[--color-text-tertiary]
      text-[--color-text-primary]
      placeholder:text-[--color-text-tertiary]
      transition-all duration-200
      focus:outline-none focus:border-[--color-primary-turquoise]
      hover:border-[--color-primary-turquoise]/50
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variantClasses = {
      default: "rounded-md",
      search: "rounded-full px-5",
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[--color-text-primary] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[--color-text-secondary]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              baseClasses,
              variantClasses[variant],
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-[--color-error] focus:border-[--color-error]",
              className
            )}
            disabled={disabled}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[--color-text-secondary]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-[--color-error] flex items-center gap-1">
            <span>⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
