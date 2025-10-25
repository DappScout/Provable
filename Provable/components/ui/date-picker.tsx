"use client";
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  label,
  error,
  disabled = false,
  className,
  minDate,
  maxDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).replace(/\//g, '-');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (date < today) return true; // Disable past dates
    
    return false;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return value && date.toDateString() === value.toDateString();
  };

  const handleDateSelect = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange?.(date);
      setIsOpen(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[--color-text-primary] mb-2">
          {label}
        </label>
      )}
      <div className="relative" ref={pickerRef}>
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
          <span className={value ? "text-[--color-text-primary]" : "text-[--color-text-tertiary]"}>
            {value ? formatDate(value) : placeholder}
          </span>
          <Calendar className="w-4 h-4 text-[--color-text-secondary]" />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-80 mt-1 bg-[--color-bg-card] border border-[--color-primary-turquoise] rounded-md shadow-lg p-4">
            {/* Month Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => navigateMonth('prev')}
                className="p-1 hover:bg-[--color-bg-secondary] rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-[--color-text-primary]" />
              </button>
              <h3 className="text-[--color-text-primary] font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                type="button"
                onClick={() => navigateMonth('next')}
                className="p-1 hover:bg-[--color-bg-secondary] rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-[--color-text-primary]" />
              </button>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs text-[--color-text-secondary] py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((date, index) => {
                if (!date) {
                  return <div key={index} className="h-10" />;
                }

                const disabled = isDateDisabled(date);
                const isCurrentDay = isToday(date);
                const isSelectedDate = isSelected(date);

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    disabled={disabled}
                    className={cn(
                      "w-10 h-10 rounded-md text-sm transition-colors",
                      "hover:bg-[--color-bg-secondary]",
                      disabled && "opacity-50 cursor-not-allowed",
                      isCurrentDay && !isSelectedDate && "text-[--color-primary-turquoise]",
                      isSelectedDate && "bg-[--color-primary-turquoise] text-[--color-text-tertiary]",
                      !disabled && !isSelectedDate && "text-[--color-text-primary]"
                    )}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
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
