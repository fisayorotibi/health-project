'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { textVariants } from '@/styles/typography';

// Types for our typography components
type VariantType = keyof typeof textVariants;
type AsType = React.ElementType;

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: VariantType;
  as?: AsType;
  className?: string;
  children: React.ReactNode;
}

// Helper function to generate Tailwind classes from our typography system
const getTypographyClasses = (variant: VariantType): string => {
  const variantStyles = textVariants[variant];
  
  // Convert our typography system values to Tailwind classes
  const fontSize = `text-[${variantStyles.fontSize}]`;
  const lineHeight = `leading-[${variantStyles.lineHeight}]`;
  const fontWeight = `font-[${variantStyles.fontWeight}]`;
  const letterSpacing = `tracking-[${variantStyles.letterSpacing}]`;
  
  // Get font family class
  let fontFamilyClass = '';
  if (variantStyles.fontFamily) {
    if (variantStyles.fontFamily.includes('--font-geist-mono')) {
      fontFamilyClass = 'font-mono';
    } else if (variantStyles.fontFamily.includes('--font-geist-sans')) {
      fontFamilyClass = 'font-sans';
    }
  }
  
  return cn(fontSize, lineHeight, fontWeight, letterSpacing, fontFamilyClass);
};

// Main Typography component
export function Typography({
  variant = 'body',
  as: Component = 'p',
  className,
  children,
  ...props
}: TypographyProps) {
  const variantClasses = getTypographyClasses(variant);
  
  return (
    <Component
      className={cn(variantClasses, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

// Specialized components for common typography elements
export function Heading1({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="h1" as="h1" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Heading2({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="h2" as="h2" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Heading3({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="h3" as="h3" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Heading4({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="h4" as="h4" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Heading5({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="h5" as="h5" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Paragraph({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="body" as="p" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function LargeParagraph({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="bodyLarge" as="p" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function SmallParagraph({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="bodySmall" as="p" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Label({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="label" as="span" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Caption({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="caption" as="span" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function DataDisplay({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="data" as="code" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function LargeDataDisplay({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="dataLarge" as="div" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Code({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'>) {
  return (
    <Typography variant="code" as="code" className={cn('bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded', className)} {...props}>
      {children}
    </Typography>
  );
} 