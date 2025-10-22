import React from "react";
import { GoHome } from "react-icons/go";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { BsPerson } from "react-icons/bs";

interface IconProps {
  as: React.ComponentType<any>;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  [key: string]: any;
}

const sizeClasses = {
  "2xs": "h-3 w-3",
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-[18px] w-[18px]",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

export function Icon({ as: IconComponent, size = "md", className, ...props }: IconProps) {
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  
  return (
    <IconComponent 
      className={`${sizeClass} ${className || ""}`}
      {...props}
    />
  );
}

// Home Icon - using GoHome from react-icons
export function HomeIcon({ className, ...props }: any) {
  return (
    <GoHome 
      className={className}
      {...props}
    />
  );
}

// Offers Icon - using HiArrowsRightLeft from react-icons
export function OffersIcon({ className, ...props }: any) {
  return (
    <HiArrowsRightLeft 
      className={className}
      {...props}
    />
  );
}

// Profile Icon - using BsPerson from react-icons
export function ProfileIcon({ className, ...props }: any) {
  return (
    <BsPerson 
      className={className}
      {...props}
    />
  );
}
