"use client";
import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'alt1' | 'alt2' | 'round';
  size?: 'sm' | 'md' | 'lg';
  width?: 'auto' | 'full' | 'fit' | string; // Custom width support
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  width = 'auto',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  style,
  ...props
}: ButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: 'h-8 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  };

  // Base classes - 4px radius, 200ms transition
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-[--color-primary-turquoise] focus:ring-offset-2 focus:ring-offset-[--color-bg-dark]
    disabled:cursor-not-allowed
    hover:opacity-90
    active:scale-95
  `;

  // Width handling
  const getWidthClasses = () => {
    if (width === 'full') return 'w-full';
    if (width === 'fit') return 'w-fit';
    if (width === 'auto') return 'w-auto';
    return ''; // Custom width will be handled via style prop
  };

  // Variant classes based on Button_types.md specifications
  const variantClasses = {
    primary: `
      text-[--color-text-tertiary] 
      bg-gradient-to-r from-[--color-primary-gradient-start] to-[--color-primary-gradient-end]
      border-none
    `,
    secondary: `
      text-[--color-primary-turquoise] 
      bg-transparent 
      border border-[--color-primary-turquoise]
    `,
    alt1: `
      text-[--color-text-primary] 
      bg-transparent 
      border-none 
      underline
    `,
    alt2: `
      text-[--color-error] 
      bg-transparent 
      border-none 
      underline
    `,
    round: `
      text-[--color-text-tertiary] 
      bg-gradient-to-r from-[--color-primary-gradient-start] to-[--color-primary-gradient-end]
      border-none
      rounded-full
    `,
  };

  // Disabled state overrides all other variants
  const disabledClasses = disabled ? `
    text-[--color-disabled] 
    bg-transparent 
    border border-[--color-disabled]
    cursor-not-allowed
    opacity-50
  ` : '';

  const isDisabled = disabled || loading;

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${getWidthClasses()}
        ${disabled ? disabledClasses : variantClasses[variant]}
        ${className}
      `}
      style={{
        ...(typeof width === 'string' && width !== 'auto' && width !== 'full' && width !== 'fit' 
          ? { width } 
          : {}),
        ...style
      }}
      {...props}
    >
      <span
        className={`
          font-semibold
          ${loading ? 'opacity-0' : 'opacity-100'}
        `}
      >
        {children}
      </span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
}