import type { Config } from "tailwindcss";
import { fontSizes, lineHeights, fontWeights, letterSpacing } from "./src/styles/typography";
import colors from "./src/styles/colors";

// Convert pixel values to rem
const pxToRem = (px: string): string => {
  const value = parseFloat(px);
  return `${value / 16}rem`;
};

// Convert typography values to Tailwind format
const convertTypographyValues = (values: Record<string, string>): Record<string, string> => {
  const result: Record<string, string> = {};
  
  Object.entries(values).forEach(([key, value]) => {
    // Convert px values to rem for font sizes
    if (value.endsWith('px')) {
      result[key] = pxToRem(value);
    } else {
      result[key] = value;
    }
  });
  
  return result;
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Typography system
      fontSize: convertTypographyValues(fontSizes),
      lineHeight: lineHeights,
      fontWeight: fontWeights,
      letterSpacing: letterSpacing,
      
      colors: {
        // Brand colors
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        
        // Semantic colors - Updated to use gray-based palette for dark mode
        success: {
          DEFAULT: colors.semantic.success.light,
          light: colors.semantic.success.bg.light,
          bg: colors.semantic.success.bg.dark,
          text: colors.semantic.success.dark,
        },
        warning: {
          DEFAULT: colors.semantic.warning.light,
          light: colors.semantic.warning.bg.light,
          bg: colors.semantic.warning.bg.dark,
          text: colors.semantic.warning.dark,
        },
        danger: {
          DEFAULT: colors.semantic.danger.light,
          light: colors.semantic.danger.bg.light,
          bg: colors.semantic.danger.bg.dark,
          text: colors.semantic.danger.dark,
        },
        info: {
          DEFAULT: colors.semantic.info.light,
          light: colors.semantic.info.bg.light,
          bg: colors.semantic.info.bg.dark,
          text: colors.semantic.info.dark,
        },
        
        // Neutral colors for light mode
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        
        // Background colors
        background: {
          light: colors.neutral.light.background.primary,
          secondary: colors.neutral.light.background.secondary,
          tertiary: colors.neutral.light.background.tertiary,
          DEFAULT: colors.neutral.light.background.primary,
        },
        
        // Dark mode specific colors - Updated to use gray palette
        dark: {
          background: colors.neutral.dark.background.primary,
          'background-secondary': colors.neutral.dark.background.secondary,
          'background-tertiary': colors.neutral.dark.background.tertiary,
          surface: colors.neutral.dark.surface.primary,
          'surface-secondary': colors.neutral.dark.surface.secondary,
          'surface-tertiary': colors.neutral.dark.surface.tertiary,
          border: colors.neutral.dark.border.default,
          'border-subtle': colors.neutral.dark.border.subtle,
          'border-strong': colors.neutral.dark.border.strong,
          text: {
            primary: colors.neutral.dark.text.primary,
            secondary: colors.neutral.dark.text.secondary,
            tertiary: colors.neutral.dark.text.tertiary,
            disabled: colors.neutral.dark.text.disabled,
          },
        },
        
        // Medical-specific colors - Updated with dark mode variants
        medical: {
          vitals: {
            normal: colors.medical.vitals.normal,
            elevated: colors.medical.vitals.elevated,
            critical: colors.medical.vitals.critical,
            low: colors.medical.vitals.low,
            'normal-dark': colors.medical.vitals.normalDark,
            'elevated-dark': colors.medical.vitals.elevatedDark,
            'critical-dark': colors.medical.vitals.criticalDark,
            'low-dark': colors.medical.vitals.lowDark,
          },
          departments: {
            cardiology: colors.medical.departments.cardiology,
            neurology: colors.medical.departments.neurology,
            pediatrics: colors.medical.departments.pediatrics,
            obstetrics: colors.medical.departments.obstetrics,
            orthopedics: colors.medical.departments.orthopedics,
            general: colors.medical.departments.general,
            'cardiology-dark': colors.medical.departments.cardiologyDark,
            'neurology-dark': colors.medical.departments.neurologyDark,
            'pediatrics-dark': colors.medical.departments.pediatricsDark,
            'obstetrics-dark': colors.medical.departments.obstetricsDark,
            'orthopedics-dark': colors.medical.departments.orthopedicsDark,
            'general-dark': colors.medical.departments.generalDark,
          },
        },
      },
      
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      
      boxShadow: {
        // Light mode shadows
        sm: colors.elevation.light.low,
        DEFAULT: colors.elevation.light.medium,
        md: colors.elevation.light.medium,
        lg: colors.elevation.light.high,
        
        // Dark mode shadows
        'dark-sm': colors.elevation.dark.low,
        'dark-md': colors.elevation.dark.medium,
        'dark-lg': colors.elevation.dark.high,
        
        // Specific component shadows
        card: colors.elevation.light.medium,
        dropdown: colors.elevation.light.high,
        'dark-card': colors.elevation.dark.medium,
      },
      
      borderRadius: {
        card: "0.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
