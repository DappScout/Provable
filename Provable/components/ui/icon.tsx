import React from "react";
import { GoHome } from "react-icons/go";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { BsPerson } from "react-icons/bs";

interface IconProps {
  as: React.ComponentType<{
    className?: string;
    onClick?: React.MouseEventHandler<SVGElement>;
    onMouseEnter?: React.MouseEventHandler<SVGElement>;
    onMouseLeave?: React.MouseEventHandler<SVGElement>;
    style?: React.CSSProperties;
    id?: string;
    'aria-label'?: string;
    'data-testid'?: string;
  }>;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
  onMouseEnter?: React.MouseEventHandler<SVGElement>;
  onMouseLeave?: React.MouseEventHandler<SVGElement>;
  style?: React.CSSProperties;
  id?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

const sizeClasses = {
  "2xs": "h-3 w-3",
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-[18px] w-[18px]",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

export function Icon({ as: IconComponent, size = "md", className, onClick, onMouseEnter, onMouseLeave, style, id, 'aria-label': ariaLabel, 'data-testid': dataTestId }: IconProps) {
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  
  return (
    <IconComponent 
      className={`${sizeClass} ${className || ""}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      id={id}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    />
  );
}

// Home Icon - using GoHome from react-icons
export function HomeIcon({ className, onClick, onMouseEnter, onMouseLeave, style, id, 'aria-label': ariaLabel, 'data-testid': dataTestId }: {
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
  onMouseEnter?: React.MouseEventHandler<SVGElement>;
  onMouseLeave?: React.MouseEventHandler<SVGElement>;
  style?: React.CSSProperties;
  id?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}) {
  return (
    <GoHome 
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      id={id}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    />
  );
}

// Offers Icon - using HiArrowsRightLeft from react-icons
export function OffersIcon({ className, onClick, onMouseEnter, onMouseLeave, style, id, 'aria-label': ariaLabel, 'data-testid': dataTestId }: {
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
  onMouseEnter?: React.MouseEventHandler<SVGElement>;
  onMouseLeave?: React.MouseEventHandler<SVGElement>;
  style?: React.CSSProperties;
  id?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}) {
  return (
    <HiArrowsRightLeft 
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      id={id}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    />
  );
}

// Profile Icon - using BsPerson from react-icons
export function ProfileIcon({ className, onClick, onMouseEnter, onMouseLeave, style, id, 'aria-label': ariaLabel, 'data-testid': dataTestId }: {
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
  onMouseEnter?: React.MouseEventHandler<SVGElement>;
  onMouseLeave?: React.MouseEventHandler<SVGElement>;
  style?: React.CSSProperties;
  id?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}) {
  return (
    <BsPerson 
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      id={id}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    />
  );
}
