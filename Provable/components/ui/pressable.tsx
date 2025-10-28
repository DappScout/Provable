import React from "react";

interface PressableProps {
  children?: React.ReactNode;
  onPress?: () => void;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
  id?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  'aria-label'?: string;
  'data-testid'?: string;
}

export function Pressable({ children, onPress, className, onClick, onMouseEnter, onMouseLeave, style, id, type, disabled, 'aria-label': ariaLabel, 'data-testid': dataTestId }: PressableProps) {
  return (
    <button 
      onClick={onPress || onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      id={id}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      data-testid={dataTestId}
      className={`${className || ""} cursor-pointer`}
    >
      {children}
    </button>
  );
}
