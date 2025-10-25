"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import { Text } from './text';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn("border-b border-[--color-bg-secondary]", className)}>
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative h-12 px-6 flex items-center justify-center",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-[--color-primary-turquoise] focus:ring-offset-2 focus:ring-offset-[--color-bg-dark]",
                isActive
                  ? "text-[--color-primary-turquoise] border-b-2 border-[--color-primary-turquoise]"
                  : "text-[--color-text-secondary] hover:text-[--color-text-primary]"
              )}
            >
              <div className="flex items-center gap-2">
                <Text 
                  size="sm" 
                  weight="semibold"
                  color={isActive ? "primary" : "secondary"}
                  className={isActive ? "text-[--color-primary-turquoise]" : ""}
                >
                  {tab.label}
                </Text>
                {tab.count !== undefined && (
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    isActive 
                      ? "bg-[--color-primary-turquoise] text-[--color-text-tertiary]"
                      : "bg-[--color-bg-secondary] text-[--color-text-secondary]"
                  )}>
                    {tab.count}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
