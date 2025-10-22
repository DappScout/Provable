import React from "react";

interface TextProps {
  children?: React.ReactNode;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  highlight?: boolean;
  isTruncated?: boolean;
  className?: string;
  [key: string]: any;
}

const sizeClasses = {
  "2xs": "text-2xs",
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

export function Text({ 
  children, 
  size = "md", 
  bold = false, 
  italic = false, 
  underline = false, 
  strikeThrough = false, 
  highlight = false, 
  isTruncated = false,
  className,
  ...props 
}: TextProps) {
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const boldClass = bold ? "font-bold" : "";
  const italicClass = italic ? "italic" : "";
  const underlineClass = underline ? "underline" : "";
  const strikeClass = strikeThrough ? "line-through" : "";
  const highlightClass = highlight ? "bg-yellow-500" : "";
  const truncateClass = isTruncated ? "truncate" : "";
  
  return (
    <span 
      className={`${sizeClass} ${boldClass} ${italicClass} ${underlineClass} ${strikeClass} ${highlightClass} ${truncateClass} ${className || ""}`}
      {...props}
    >
      {children}
    </span>
  );
}
