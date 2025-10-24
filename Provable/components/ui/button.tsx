"use client";
import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'alt1' | 'alt2' | 'round';
  width?: 'auto' | 'full' | 'fit' | string; // Custom width support
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Button({
  children,
  variant = 'primary',
  width = 'auto',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  style,
  ...props
}: ButtonProps) {
  // Base classes - 48px height, 24px horizontal padding, 4px radius, 200ms transition
  const baseClasses = `
    inline-flex items-center justify-center
    h-12 px-6
    font-semibold rounded
    transition-all duration-200
    focus:outline-none
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
      text-[#2C2C2C] 
      bg-gradient-to-r from-[#98F7E9] to-[#19D1B6]
      border-none
    `,
    secondary: `
      text-[#98F7E9] 
      bg-transparent 
      border border-[#98F7E9]
    `,
    alt1: `
      text-white 
      bg-transparent 
      border-none 
      underline
    `,
    alt2: `
      text-[#FF6A6A] 
      bg-transparent 
      border-none 
      underline
    `,
    round: `
      text-[#2C2C2C] 
      bg-gradient-to-r from-[#98F7E9] to-[#19D1B6]
      border-none
      rounded-full
    `,
  };

  // Disabled state overrides all other variants
  const disabledClasses = disabled ? `
    text-[#6D6D6D] 
    bg-transparent 
    border border-[#6D6D6D]
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