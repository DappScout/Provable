"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import { Text } from './text';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export interface NotificationCardProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message?: string;
  details?: string;
  onDetailsClick?: () => void;
  className?: string;
}

export function NotificationCard({
  type = 'info',
  title,
  message,
  details,
  onDetailsClick,
  className,
}: NotificationCardProps) {
  const typeConfig = {
    info: {
      icon: ArrowRight,
      borderColor: "border-l-[--color-primary-turquoise]",
      iconColor: "text-[--color-primary-turquoise]",
    },
    warning: {
      icon: AlertTriangle,
      borderColor: "border-l-[--color-warning]",
      iconColor: "text-[--color-warning]",
    },
    success: {
      icon: CheckCircle,
      borderColor: "border-l-[--color-success]",
      iconColor: "text-[--color-success]",
    },
    error: {
      icon: XCircle,
      borderColor: "border-l-[--color-error]",
      iconColor: "text-[--color-error]",
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn(
      "bg-[--color-bg-card] border-l-4 rounded-md p-4",
      "flex items-start gap-3",
      config.borderColor,
      className
    )}>
      {/* Icon */}
      <div className="flex-shrink-0">
        <Icon className={cn("w-6 h-6", config.iconColor)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <Text size="sm" weight="bold" className="mb-1">
          {title}
        </Text>
        
        {message && (
          <Text size="xs" color="secondary" className="mb-2">
            {message}
          </Text>
        )}

        {details && (
          <button
            type="button"
            onClick={onDetailsClick}
            className="text-[--color-primary-turquoise] text-xs hover:underline transition-colors"
          >
            {details}
          </button>
        )}
      </div>
    </div>
  );
}
