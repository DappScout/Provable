"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import { Text } from './text';

export interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function Heading({ children, level = 1, className }: HeadingProps) {
  const sizeMap = {
    1: 'xl' as const,    // 24px
    2: 'lg' as const,    // 20px
    3: 'md' as const,    // 16px
    4: 'sm' as const,    // 14px
    5: 'sm' as const,    // 14px
    6: 'sm' as const,    // 14px
  };

  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Text
      as={Component}
      size={sizeMap[level]}
      weight="bold"
      className={cn(className)}
    >
      {children}
    </Text>
  );
}
