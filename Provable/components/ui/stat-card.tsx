"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import { Text } from './text';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  value: number | string;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function StatCard({
  value,
  label,
  trend,
  size = 'medium',
  className,
}: StatCardProps) {
  const sizeClasses = {
    small: {
      value: "text-2xl", // 32px
      label: "text-sm",  // 14px
      icon: "w-4 h-4"
    },
    medium: {
      value: "text-3xl", // 48px
      label: "text-xs",  // 12px
      icon: "w-6 h-6"
    },
    large: {
      value: "text-4xl", // 64px
      label: "text-sm",  // 14px
      icon: "w-8 h-8"
    }
  };

  const currentSize = sizeClasses[size];

  const getTrendIcon = () => {
    if (trend === 'up') {
      return <TrendingUp className={cn("text-[--color-success]", currentSize.icon)} />;
    }
    if (trend === 'down') {
      return <TrendingDown className={cn("text-[--color-error]", currentSize.icon)} />;
    }
    return null;
  };

  return (
    <div className={cn(
      "bg-[--color-bg-card] border border-[--color-bg-secondary] rounded-md p-4",
      "flex items-center gap-3",
      className
    )}>
      {/* Large Number */}
      <div className="relative">
        <Text 
          size={size === 'small' ? '2xl' : size === 'large' ? '3xl' : '3xl'} 
          weight="bold"
          className="leading-none"
        >
          {value}
        </Text>
        
        {/* Trend Indicator */}
        {trend && (
          <div className="absolute -top-1 -right-1">
            {getTrendIcon()}
          </div>
        )}
      </div>

      {/* Label */}
      <Text 
        size={size === 'small' ? 'sm' : 'xs'} 
        color="secondary"
        className="flex-1"
      >
        {label}
      </Text>
    </div>
  );
}
