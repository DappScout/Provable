"use client";
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  className?: string;
}

export function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  onClear,
  disabled = false,
  className,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(internalValue);
    }
  };

  const handleClear = () => {
    setInternalValue('');
    onChange?.('');
    onClear?.();
  };

  const currentValue = value !== undefined ? value : internalValue;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <input
          type="text"
          value={currentValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full h-12 px-5 pr-12",
            "bg-[--color-bg-card] border border-[--color-text-tertiary]",
            "text-[--color-text-primary] placeholder:text-[--color-text-tertiary]",
            "rounded-full",
            "transition-all duration-200",
            "focus:outline-none focus:border-[--color-primary-turquoise]",
            "hover:border-[--color-primary-turquoise]/50",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />
        
        {/* Search Icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Search className="w-5 h-5 text-[--color-primary-turquoise]" />
        </div>

        {/* Clear Button */}
        {currentValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[--color-bg-secondary] rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-[--color-text-secondary]" />
          </button>
        )}
      </div>
    </div>
  );
}
