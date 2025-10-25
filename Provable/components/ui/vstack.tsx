import React from "react";
import { cn } from "@/lib/utils";

interface VStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  space?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
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

export function VStack({ children, space = "md", className, ...props }: VStackProps) {
  return (
    <div className={cn("flex flex-col", spaceClasses[space], className)} {...props}>
      {children}
    </div>
  );
}
