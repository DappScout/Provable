import React from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  children?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  color?: "primary" | "secondary" | "tertiary";
  weight?: "regular" | "medium" | "semibold" | "bold";
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  isTruncated?: boolean;
  className?: string;
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
  id?: string;
  role?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

const sizeClasses = {
  xs: "text-xs",      // 12px
  sm: "text-sm",      // 14px
  md: "text-base",    // 16px
  lg: "text-lg",      // 20px
  xl: "text-xl",      // 24px
  "2xl": "text-2xl",  // 32px
  "3xl": "text-3xl",  // 48px
};

const colorClasses = {
  primary: "text-[--color-text-primary]",     // #FFFFFF
  secondary: "text-[--color-text-secondary]",   // #b3b3b3
  tertiary: "text-[--color-text-tertiary]",  // #6D6D6D
};

const weightClasses = {
  regular: "font-normal",    // 400
  medium: "font-medium",      // 500
  semibold: "font-semibold",  // 600
  bold: "font-bold",         // 700
};

export function Text({ 
  children, 
  size = "md", 
  color = "primary",
  weight = "regular",
  italic = false, 
  underline = false, 
  strikeThrough = false, 
  isTruncated = false,
  className,
  as: Component = "span",
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  id,
  role,
  'aria-label': ariaLabel,
  'data-testid': dataTestId
}: TextProps) {
  return (
    <Component 
      className={cn(
        sizeClasses[size],
        colorClasses[color],
        weightClasses[weight],
        italic && "italic",
        underline && "underline",
        strikeThrough && "line-through",
        isTruncated && "truncate",
        className
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      id={id}
      role={role}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {children}
    </Component>
  );
}
