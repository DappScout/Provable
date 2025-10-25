"use client";
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  disabled = false,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[--color-text-primary] mb-2">
          {label}
        </label>
      )}
      <div className="relative" ref={selectRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "flex items-center justify-between w-full h-12 px-4",
            "bg-[--color-bg-card] border border-[--color-text-tertiary]",
            "text-[--color-text-primary] rounded-md",
            "transition-all duration-200",
            "focus:outline-none focus:border-[--color-primary-turquoise]",
            "hover:border-[--color-primary-turquoise]/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-[--color-error] focus:border-[--color-error]",
            className
          )}
        >
          <span className={selectedOption ? "text-[--color-text-primary]" : "text-[--color-text-tertiary]"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className={cn(
              "w-4 h-4 text-[--color-text-secondary] transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-[--color-bg-card] border border-[--color-primary-turquoise] rounded-md shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full px-4 py-3 text-left text-[--color-text-primary]",
                  "hover:bg-[--color-bg-secondary] transition-colors duration-150",
                  "first:rounded-t-md last:rounded-b-md",
                  value === option.value && "bg-[--color-bg-secondary]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {value === option.value && (
                    <div className="w-2 h-2 bg-[--color-primary-turquoise] rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-[--color-error] flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
