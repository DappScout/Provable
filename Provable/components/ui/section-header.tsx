"use client";
import React from 'react';
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return (
    <h2
      className={cn(
        "text-xs font-bold uppercase tracking-wider",
        "text-[--color-text-tertiary]",
        "mt-6 mb-3",
        className
      )}
    >
      {children}
    </h2>
  );
}
