"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import { Text } from './text';
import { Avatar } from './avatar';

export interface ListItemProps {
  avatar?: string;
  name: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
  onClick?: () => void;
  className?: string;
}

export function ListItem({
  avatar,
  name,
  subtitle,
  actionText,
  onAction,
  onClick,
  className,
}: ListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center h-18 px-4 py-3",
        "border-b border-[--color-bg-secondary]",
        "transition-all duration-200",
        onClick && "cursor-pointer hover:bg-[--color-bg-card]",
        className
      )}
      onClick={onClick}
    >
      {/* Avatar */}
      <Avatar 
        src={avatar} 
        name={name} 
        size="medium"
        className="mr-3"
      />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <Text size="sm" weight="bold" className="truncate">
          {name}
        </Text>
        {subtitle && (
          <Text size="xs" color="secondary" className="truncate">
            {subtitle}
          </Text>
        )}
      </div>

      {/* Action */}
      {actionText && onAction && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAction();
          }}
          className="text-[--color-primary-turquoise] text-sm font-medium hover:underline transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
