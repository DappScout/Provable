import React from "react";

interface BoxProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function Box({ children, className, ...props }: BoxProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
