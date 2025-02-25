'use client';

import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be scrolled
   */
  children: ReactNode;
  
  /**
   * Maximum height of the scroll area
   * @default 'auto'
   */
  maxHeight?: string | number;
  
  /**
   * Whether to use a thin scrollbar variant
   * @default false
   */
  thin?: boolean;
  
  /**
   * Whether to hide the scrollbar (still scrollable)
   * @default false
   */
  hideScrollbar?: boolean;
  
  /**
   * Whether to show the scrollbar only on hover
   * @default false
   */
  showOnHover?: boolean;
}

/**
 * ScrollArea component provides a customizable scrollable container with premium scrollbar styles.
 * It adapts to the theme (light/dark mode) automatically.
 */
const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ 
    children, 
    className, 
    maxHeight = 'auto', 
    thin = false, 
    hideScrollbar = false,
    showOnHover = false,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'overflow-auto',
          thin && 'thin-scrollbar',
          hideScrollbar && 'hide-scrollbar',
          showOnHover && 'hover:overflow-auto overflow-hidden',
          className
        )}
        style={{ 
          maxHeight: maxHeight,
          ...props.style 
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea }; 