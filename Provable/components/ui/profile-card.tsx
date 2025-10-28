"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import { Text } from './text';
import { Avatar } from './avatar';
import { Button } from './button';

export interface ProfileCardProps {
  name: string;
  subtitle?: string;
  avatar?: string;
  isSelected?: boolean;
  actionText?: string;
  onAction?: () => void;
  onClick?: () => void;
  className?: string;
}

export function ProfileCard({
  name,
  subtitle,
  avatar,
  isSelected = false,
  actionText,
  onAction,
  onClick,
  className,
}: ProfileCardProps) {
  return (
    <div
      className={cn(
        "bg-[--color-bg-card] border border-[--color-bg-secondary] rounded-md p-4",
        "transition-all duration-200",
        isSelected && "border-[--color-primary-turquoise]",
        onClick && "cursor-pointer hover:border-[--color-primary-turquoise]/50",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Avatar 
          src={avatar} 
          name={name} 
          size="md"
          className={isSelected ? "ring-2 ring-[--color-primary-turquoise]" : ""}
        />
        
        <div className="flex-1">
          <Text size="sm" weight="medium">
            {name}
          </Text>
          {subtitle && (
            <Text size="xs" color="secondary">
              {subtitle}
            </Text>
          )}
        </div>

        {actionText && onAction && (
          <Button
            variant="alt1"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAction();
            }}
          >
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
}
