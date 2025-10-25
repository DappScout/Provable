import React from "react";

interface PressableProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onPress?: () => void;
  className?: string;
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
