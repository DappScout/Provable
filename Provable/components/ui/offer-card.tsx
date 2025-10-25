"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import { Text } from './text';
import { Avatar } from './avatar';
import { Badge } from './badge';

export interface OfferCardProps {
  title: string;
  timeRemaining?: string;
  userName: string;
  userSubtitle: string;
  userAvatar?: string;
  status?: 'complete' | 'pending' | 'draft' | 'disputed';
  statusText?: string;
  onClick?: () => void;
  className?: string;
}

export function OfferCard({
  title,
  timeRemaining,
  userName,
  userSubtitle,
  userAvatar,
  status,
  statusText,
  onClick,
  className,
}: OfferCardProps) {
  return (
    <div
      className={cn(
        "bg-[--color-bg-card] border border-[--color-bg-secondary] rounded-md p-4 mb-3",
        "transition-all duration-200",
        onClick && "cursor-pointer hover:border-[--color-primary-turquoise]/50",
        className
      )}
      onClick={onClick}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <Text size="md" weight="bold" className="flex-1">
          {title}
        </Text>
        {timeRemaining && (
          <Text size="xs" color="secondary">
            {timeRemaining}
          </Text>
        )}
      </div>

      {/* User Info Row */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar 
          src={userAvatar} 
          name={userName} 
          size="small" 
        />
        <div className="flex-1">
          <Text size="sm" weight="medium">
            {userName}
          </Text>
          <Text size="xs" color="secondary">
            {userSubtitle}
          </Text>
        </div>
      </div>

      {/* Status Badge */}
      {status && statusText && (
        <div className="flex justify-end">
          <Badge variant={status}>
            {statusText}
          </Badge>
        </div>
      )}
    </div>
  );
}
