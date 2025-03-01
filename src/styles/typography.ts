/**
 * Typography System for Lavender Health Records
 * 
 * This system is designed to create a consistent, readable, and accessible
 * typography experience across the platform. It's inspired by modern design systems
 * like Linear, Stripe, and Vercel, but tailored for healthcare professionals.
 * 
 * Key principles:
 * 1. Readability: Ensuring text is easily readable in various contexts
 * 2. Hierarchy: Clear visual hierarchy to guide users through information
 * 3. Consistency: Predictable type styles across the platform
 * 4. Accessibility: Meeting WCAG AA standards for text contrast and size
 */

// Font families
export const fontFamilies = {
  sans: 'var(--font-funnel-display)', // Primary font for UI and content
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', // For code, data, and technical information
};

// Type scale (in pixels, will be converted to rem)
// Based on a 1.2 (minor third) scale for harmonious progression
export const fontSizes = {
  xs: '12px',    // 0.75rem - Small labels, metadata
  sm: '14px',    // 0.875rem - Secondary text, UI elements
  base: '16px',  // 1rem - Body text, default size
  lg: '18px',    // 1.125rem - Emphasized body text
  xl: '20px',    // 1.25rem - Subheadings
  '2xl': '24px', // 1.5rem - Section headings
  '3xl': '30px', // 1.875rem - Page headings
  '4xl': '36px', // 2.25rem - Major headings
  '5xl': '48px', // 3rem - Hero text
};

// Line heights
// Tighter for headings, more spacious for body text
export const lineHeights = {
  none: '1',      // For single-line elements
  tight: '1.25',  // For headings
  snug: '1.375',  // For subheadings
  normal: '1.5',  // For body text
  relaxed: '1.625', // For longer body text
  loose: '2',     // For very spacious text
};

// Font weights
export const fontWeights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// Letter spacing
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

// Define the base variant type with all possible properties
interface TypographyVariant {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
  fontFamily?: string;
}

// Text variants - Predefined combinations for common use cases
export const textVariants: Record<string, TypographyVariant> = {
  // Headings
  h1: {
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights.tight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamilies.sans,
  },
  h2: {
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights.tight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamilies.sans,
  },
  h3: {
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights.snug,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },
  h4: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.snug,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },
  h5: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },
  
  // Body text
  bodyLarge: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.relaxed,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },
  body: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },
  
  // UI elements
  label: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.tight,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamilies.sans,
  },
  caption: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamilies.sans,
  },
  button: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.none,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamilies.sans,
  },
  
  // Data display
  dataLarge: {
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights.none,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamilies.mono,
  },
  data: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.mono,
  },
  code: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.mono,
  },
};

// Typography usage guidelines
export const typographyGuidelines = {
  headings: {
    h1: 'Main page headings, only one per page',
    h2: 'Section headings for major page sections',
    h3: 'Subsection headings within major sections',
    h4: 'Card or panel headings',
    h5: 'Minor headings, such as sidebar sections',
  },
  body: {
    bodyLarge: 'Emphasized paragraphs, introductions, or important information',
    body: 'Default text style for paragraphs and general content',
    bodySmall: 'Secondary information, notes, or less important content',
  },
  ui: {
    label: 'Form labels, section labels, and other UI identifiers',
    caption: 'Helper text, metadata, timestamps, and supplementary information',
    button: 'Button text and interactive elements',
  },
  data: {
    dataLarge: 'Large numbers, statistics, or metrics',
    data: 'Tabular data, measurements, and technical values',
    code: 'Code snippets, technical identifiers, and system values',
  },
}; 