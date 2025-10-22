import React from "react";

interface VStackProps {
  children?: React.ReactNode;
  space?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  className?: string;
  [key: string]: any;
}

const spaceClasses = {
  xs: "gap-1",
  sm: "gap-2", 
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-5",
  "2xl": "gap-6",
  "3xl": "gap-7",
  "4xl": "gap-8",
};

export function VStack({ children, space = "md", className, ...props }: VStackProps) {
  const spaceClass = spaceClasses[space] || spaceClasses.md;
  
  return (
    <div className={`flex flex-col ${spaceClass} ${className || ""}`} {...props}>
      {children}
    </div>
  );
}
