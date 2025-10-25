"use client";
import React from 'react';
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  error?: boolean;
}

export function Label({ 
  children, 
  className, 
  required = false, 
  error = false,
  ...props 
}: LabelProps) {
  return (
    <label
      className={cn(
        "block text-sm font-medium",
        "text-[--color-text-primary]",
        error && "text-[--color-error]",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-[--color-error] ml-1">*</span>
      )}
    </label>
  );
}
