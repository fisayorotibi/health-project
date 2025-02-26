/**
 * Color System for Lavender Health Records
 * 
 * This system provides a comprehensive color palette for both light and dark modes,
 * with a focus on accessibility, readability, and a professional medical aesthetic.
 * 
 * The system uses a sophisticated black/gray palette for backgrounds and a carefully
 * selected set of accent colors for different purposes in the application.
 * 
 * Key principles:
 * 1. Accessibility: All color combinations meet WCAG AA standards for contrast
 * 2. Consistency: Colors are used consistently across the application
 * 3. Semantic: Colors have specific meanings and purposes
 * 4. Adaptability: Colors work well in both light and dark modes
 */

// Primary Brand Color - Lavender
// A distinctive purple that represents the brand while being suitable for medical context
export const primary = {
  50: '#F4F3FF',
  100: '#EBE9FE',
  200: '#D9D6FE',
  300: '#BDB4FE',
  400: '#9B8AFB',
  500: '#7C66DC', // Main brand color
  600: '#6E56DB',
  700: '#5943BE',
  800: '#4A389F',
  900: '#3C2E7E',
  950: '#251A58',
};

// Secondary Color - Teal
// A calming, trustworthy color that complements the primary color
export const secondary = {
  50: '#EFFCF6',
  100: '#DEFAED',
  200: '#BCF2D7',
  300: '#8AE5B9',
  400: '#4ACF94',
  500: '#2AB07F', // Main secondary color
  600: '#1E9D6F',
  700: '#1A805A',
  800: '#17654A',
  900: '#14533D',
  950: '#0A2E22',
};

// Accent Color - Amber
// A warm, energetic color for highlights and calls to action
export const accent = {
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B', // Main accent color
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
  950: '#451A03',
};

// Semantic Colors - For specific meanings and states
export const semantic = {
  // Success - For positive actions, confirmations, and success states
  success: {
    light: '#10B981', // Green
    dark: '#34D399',
    bg: {
      light: '#F5F5F5', // Pure light gray
      dark: '#1E1E1E', // Pure dark gray
    },
  },
  // Warning - For alerts, warnings, and cautionary messages
  warning: {
    light: '#F59E0B', // Amber
    dark: '#FBBF24',
    bg: {
      light: '#F5F5F5', // Pure light gray
      dark: '#242424', // Pure dark gray
    },
  },
  // Danger - For errors, destructive actions, and critical alerts
  danger: {
    light: '#EF4444', // Red
    dark: '#F87171',
    bg: {
      light: '#F5F5F5', // Pure light gray
      dark: '#2A2A2A', // Pure dark gray
    },
  },
  // Info - For informational messages and help text
  info: {
    light: '#3B82F6', // Blue
    dark: '#60A5FA',
    bg: {
      light: '#F5F5F5', // Pure light gray
      dark: '#1F1F1F', // Pure dark gray
    },
  },
};

// Neutral Colors - For backgrounds, text, and UI elements
export const neutral = {
  // Light mode
  light: {
    // Background colors
    background: {
      primary: '#FFFFFF', // Main background
      secondary: '#FAFAFA', // Secondary background - Pure light gray
      tertiary: '#F5F5F5', // Tertiary background - Pure light gray
    },
    // Surface colors (cards, dialogs, etc.)
    surface: {
      primary: '#FFFFFF',
      secondary: '#FAFAFA',
      tertiary: '#F5F5F5',
    },
    // Border colors
    border: {
      subtle: '#E5E5E5',
      default: '#D4D4D4',
      strong: '#A3A3A3',
    },
    // Text colors
    text: {
      primary: '#171717', // High contrast text - Pure dark gray
      secondary: '#525252', // Medium contrast text - Pure medium gray
      tertiary: '#737373', // Low contrast text - Pure medium gray
      disabled: '#A3A3A3', // Disabled text - Pure light gray
    },
  },
  // Dark mode - Updated to use pure gray palette (neutral black-derived grays with no color tint)
  dark: {
    // Background colors
    background: {
      primary: '#121212', // Main background - Pure dark gray
      secondary: '#1A1A1A', // Secondary background - Pure gray
      tertiary: '#242424', // Tertiary background - Pure gray
    },
    // Surface colors (cards, dialogs, etc.)
    surface: {
      primary: '#1E1E1E', // Pure dark gray
      secondary: '#2C2C2C', // Pure medium gray
      tertiary: '#333333', // Pure light gray
    },
    // Border colors
    border: {
      subtle: '#3D3D3D', // Pure subtle gray border
      default: '#4D4D4D', // Pure default gray border
      strong: '#6E6E6E', // Pure strong gray border
    },
    // Text colors
    text: {
      primary: '#F5F5F5', // High contrast text - Almost white (pure gray)
      secondary: '#D4D4D4', // Medium contrast text - Light gray (pure gray)
      tertiary: '#A3A3A3', // Low contrast text - Medium gray (pure gray)
      disabled: '#6E6E6E', // Disabled text - Dark gray (pure gray)
    },
  },
};

// Elevation - For shadows and depth
export const elevation = {
  light: {
    low: '0 1px 2px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    high: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  dark: {
    low: '0 1px 2px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    high: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  },
};

// Medical-specific colors - For specialized medical UI elements
export const medical = {
  vitals: {
    normal: '#10B981', // Normal range
    elevated: '#F59E0B', // Elevated but not critical
    critical: '#EF4444', // Critical values
    low: '#3B82F6', // Below normal range
    // Dark mode variants with pure gray palette (no color tint)
    normalDark: '#2E2E2E', // Pure dark gray
    elevatedDark: '#333333', // Pure dark gray
    criticalDark: '#383838', // Pure dark gray
    lowDark: '#2A2A2A', // Pure dark gray
  },
  departments: {
    cardiology: '#EF4444', // Red
    neurology: '#8B5CF6', // Purple
    pediatrics: '#3B82F6', // Blue
    obstetrics: '#EC4899', // Pink
    orthopedics: '#F59E0B', // Amber
    general: '#10B981', // Green
    // Dark mode variants with pure gray palette (no color tint)
    cardiologyDark: '#3A3A3A', // Pure dark gray
    neurologyDark: '#333333', // Pure dark gray
    pediatricsDark: '#2C2C2C', // Pure dark gray
    obstetricsDark: '#363636', // Pure dark gray
    orthopedicsDark: '#3D3D3D', // Pure dark gray
    generalDark: '#2E2E2E', // Pure dark gray
  },
};

// Export all color categories
export const colors = {
  primary,
  secondary,
  accent,
  semantic,
  neutral,
  elevation,
  medical,
};

export default colors; 