"use client";
import React, { useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Text } from './text';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: "max-w-sm",
    medium: "max-w-md",
    large: "max-w-lg",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        "relative w-full mx-4",
        "bg-[--color-bg-card] border border-[--color-primary-turquoise] rounded-lg",
        "shadow-2xl",
        sizeClasses[size],
        className
      )}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-[--color-bg-secondary]">
            <Text size="lg" weight="bold">
              {title}
            </Text>
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-[--color-bg-secondary] rounded transition-colors"
            >
              <X className="w-5 h-5 text-[--color-text-secondary]" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 p-6 border-t border-[--color-bg-secondary]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn("flex justify-end gap-3", className)}>
      {children}
    </div>
  );
}
