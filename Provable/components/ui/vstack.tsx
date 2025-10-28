import React from "react";
import { cn } from "@/lib/utils";

interface VStackProps {
  children?: React.ReactNode;
  space?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
  id?: string;
  role?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

const spaceClasses = {
  xs: "gap-1",    // 4px
  sm: "gap-2",    // 8px
  md: "gap-3",    // 12px
  lg: "gap-4",    // 16px
  xl: "gap-6",    // 24px
  "2xl": "gap-8", // 32px
  "3xl": "gap-12", // 48px
};

export function VStack({ children, space = "md", className, onClick, onMouseEnter, onMouseLeave, style, id, role, 'aria-label': ariaLabel, 'data-testid': dataTestId }: VStackProps) {
  return (
    <div 
      className={cn("flex flex-col", spaceClasses[space], className)}
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
    </div>
  );
}
