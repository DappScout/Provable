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

  // Base classes - 8px radius per design system, 200ms transition
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
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

  // Variant styles using design system colors
  const variantStyles: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> = {
    primary: {
      color: '#121212', // Dark text on bright gradient
      background: 'linear-gradient(to right, #98F7E9, #19D1B6)',
      border: 'none',
    },
    secondary: {
      color: '#98F7E9',
      background: 'transparent',
      border: '1px solid #98F7E9',
    },
    alt1: {
      color: '#FFFFFF',
      background: 'transparent',
      border: 'none',
      textDecoration: 'underline',
    },
    alt2: {
      color: '#F44336',
      background: 'transparent',
      border: 'none',
      textDecoration: 'underline',
    },
    round: {
      color: '#121212', // Dark text on bright gradient
      background: 'linear-gradient(to right, #98F7E9, #19D1B6)',
      border: 'none',
      borderRadius: '9999px',
    },
  };

  // Get variant-specific Tailwind classes (for non-style properties)
  const getVariantClasses = (variant: ButtonProps['variant']) => {
    const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary: '',
      secondary: '',
      alt1: 'underline',
      alt2: 'underline',
      round: 'rounded-full',
    };
    return variantClasses[variant!] || '';
  };

  // Disabled state styles
  const disabledStyles = disabled ? {
    color: '#6D6D6D',
    background: 'transparent',
    border: '1px solid #6D6D6D',
    cursor: 'not-allowed',
    opacity: 0.5,
  } : {};

  const isDisabled = disabled || loading;

  // Combine all styles
  const combinedStyles = {
    ...(disabled ? disabledStyles : variantStyles[variant]),
    ...(typeof width === 'string' && width !== 'auto' && width !== 'full' && width !== 'fit' 
      ? { width } 
      : {}),
    ...style
  };

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${getWidthClasses()}
        ${getVariantClasses(variant)}
        ${className}
      `}
      style={combinedStyles}
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