import React from "react";

interface PressableProps {
  children?: React.ReactNode;
  onPress?: () => void;
  className?: string;
  [key: string]: any;
}

export function Pressable({ children, onPress, className, ...props }: PressableProps) {
  return (
    <button 
      onClick={onPress}
      className={`${className || ""} cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
}
