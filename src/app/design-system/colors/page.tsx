'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Paragraph,
  LargeParagraph,
  SmallParagraph,
  Label,
  Caption,
  Code
} from '@/components/ui/typography';
import colors from '@/styles/colors';

// Color swatch component
const ColorSwatch = ({ color, name, value }: { color: string; name: string; value: string }) => (
  <div className="flex flex-col">
    <div 
      className="h-16 w-full rounded-md mb-2" 
      style={{ backgroundColor: color }}
    />
    <Label className="font-medium">{name}</Label>
    <Caption className="text-gray-500 dark:text-gray-400">{value}</Caption>
  </div>
);

// Color palette component
const ColorPalette = ({ 
  title, 
  colors, 
  description 
}: { 
  title: string; 
  colors: Record<string, string>; 
  description?: string 
}) => (
  <div className="space-y-4">
    <div>
      <Heading3>{title}</Heading3>
      {description && <Paragraph className="text-gray-600 dark:text-gray-300 mt-1">{description}</Paragraph>}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {Object.entries(colors).map(([name, value]) => (
        <ColorSwatch key={name} color={value} name={name} value={value} />
      ))}
    </div>
  </div>
);

// Semantic color component
const SemanticColorSet = ({ 
  title, 
  colorSet, 
  description 
}: { 
  title: string; 
  colorSet: { light: string; dark: string; bg: { light: string; dark: string } }; 
  description: string 
}) => (
  <div className="space-y-2">
    <Heading4>{title}</Heading4>
    <Paragraph className="text-gray-600 dark:text-gray-300 text-sm">{description}</Paragraph>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
      <ColorSwatch color={colorSet.light} name="Default (Light)" value={colorSet.light} />
      <ColorSwatch color={colorSet.dark} name="Text (Dark Mode)" value={colorSet.dark} />
      <ColorSwatch color={colorSet.bg.light} name="Background (Light)" value={colorSet.bg.light} />
      <ColorSwatch color={colorSet.bg.dark} name="Background (Dark)" value={colorSet.bg.dark} />
    </div>
  </div>
);

// Neutral color set component
const NeutralColorSet = ({ 
  title, 
  colorSet, 
  mode 
}: { 
  title: string; 
  colorSet: any; 
  mode: 'light' | 'dark' 
}) => (
  <div className="space-y-4">
    <Heading3>{title}</Heading3>
    
    <div className="space-y-6">
      <div>
        <Heading4>Background Colors</Heading4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          <ColorSwatch 
            color={colorSet.background.primary} 
            name="Primary" 
            value={colorSet.background.primary} 
          />
          <ColorSwatch 
            color={colorSet.background.secondary} 
            name="Secondary" 
            value={colorSet.background.secondary} 
          />
          <ColorSwatch 
            color={colorSet.background.tertiary} 
            name="Tertiary" 
            value={colorSet.background.tertiary} 
          />
        </div>
      </div>
      
      <div>
        <Heading4>Surface Colors</Heading4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          <ColorSwatch 
            color={colorSet.surface.primary} 
            name="Primary" 
            value={colorSet.surface.primary} 
          />
          <ColorSwatch 
            color={colorSet.surface.secondary} 
            name="Secondary" 
            value={colorSet.surface.secondary} 
          />
          <ColorSwatch 
            color={colorSet.surface.tertiary} 
            name="Tertiary" 
            value={colorSet.surface.tertiary} 
          />
        </div>
      </div>
      
      <div>
        <Heading4>Border Colors</Heading4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          <ColorSwatch 
            color={colorSet.border.subtle} 
            name="Subtle" 
            value={colorSet.border.subtle} 
          />
          <ColorSwatch 
            color={colorSet.border.default} 
            name="Default" 
            value={colorSet.border.default} 
          />
          <ColorSwatch 
            color={colorSet.border.strong} 
            name="Strong" 
            value={colorSet.border.strong} 
          />
        </div>
      </div>
      
      <div>
        <Heading4>Text Colors</Heading4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-2">
          <ColorSwatch 
            color={colorSet.text.primary} 
            name="Primary" 
            value={colorSet.text.primary} 
          />
          <ColorSwatch 
            color={colorSet.text.secondary} 
            name="Secondary" 
            value={colorSet.text.secondary} 
          />
          <ColorSwatch 
            color={colorSet.text.tertiary} 
            name="Tertiary" 
            value={colorSet.text.tertiary} 
          />
          <ColorSwatch 
            color={colorSet.text.disabled} 
            name="Disabled" 
            value={colorSet.text.disabled} 
          />
        </div>
      </div>
    </div>
  </div>
);

// Medical color set component
const MedicalColorSet = ({ title, colorSet }: { title: string; colorSet: Record<string, string> }) => (
  <div className="space-y-2">
    <Heading4>{title}</Heading4>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
      {Object.entries(colorSet).map(([name, value]) => (
        <ColorSwatch key={name} color={value} name={name} value={value} />
      ))}
    </div>
  </div>
);

export default function ColorsPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <Heading1>Color System</Heading1>
          <LargeParagraph className="mt-4 text-gray-600 dark:text-gray-300">
            Our color system is designed to create a consistent, accessible, and professional
            visual experience across the Lavender Health Records platform. It uses a sophisticated
            black/gray palette for backgrounds and a carefully selected set of accent colors.
          </LargeParagraph>
        </div>
        
        <section className="space-y-6">
          <Heading2>Key Principles</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <Heading4>Accessibility</Heading4>
              <Paragraph className="mt-2 text-gray-600 dark:text-gray-300">
                All color combinations meet WCAG AA standards for contrast, ensuring the platform is usable by all.
              </Paragraph>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <Heading4>Consistency</Heading4>
              <Paragraph className="mt-2 text-gray-600 dark:text-gray-300">
                Colors are used consistently across the application, creating a cohesive and professional experience.
              </Paragraph>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <Heading4>Semantic</Heading4>
              <Paragraph className="mt-2 text-gray-600 dark:text-gray-300">
                Colors have specific meanings and purposes, helping users understand the interface intuitively.
              </Paragraph>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <Heading4>Adaptability</Heading4>
              <Paragraph className="mt-2 text-gray-600 dark:text-gray-300">
                Colors work well in both light and dark modes, providing a consistent experience regardless of preference.
              </Paragraph>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <Heading2>Brand Colors</Heading2>
          <div className="space-y-10">
            <ColorPalette 
              title="Primary (Lavender)" 
              colors={colors.primary} 
              description="Our primary brand color is a distinctive purple that represents the Lavender brand while being suitable for a medical context."
            />
            
            <ColorPalette 
              title="Secondary (Teal)" 
              colors={colors.secondary} 
              description="Our secondary color is a calming, trustworthy teal that complements the primary color and conveys professionalism."
            />
            
            <ColorPalette 
              title="Accent (Amber)" 
              colors={colors.accent} 
              description="Our accent color is a warm, energetic amber used for highlights and calls to action."
            />
          </div>
        </section>
        
        <section className="space-y-6">
          <Heading2>Semantic Colors</Heading2>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 space-y-8">
            <Paragraph>
              Semantic colors convey specific meanings and are used consistently across the platform to help users understand the interface.
            </Paragraph>
            
            <SemanticColorSet 
              title="Success" 
              colorSet={colors.semantic.success} 
              description="Used for positive actions, confirmations, and success states."
            />
            
            <SemanticColorSet 
              title="Warning" 
              colorSet={colors.semantic.warning} 
              description="Used for alerts, warnings, and cautionary messages."
            />
            
            <SemanticColorSet 
              title="Danger" 
              colorSet={colors.semantic.danger} 
              description="Used for errors, destructive actions, and critical alerts."
            />
            
            <SemanticColorSet 
              title="Info" 
              colorSet={colors.semantic.info} 
              description="Used for informational messages and help text."
            />
          </div>
        </section>
        
        <section className="space-y-6">
          <Heading2>Neutral Colors</Heading2>
          <div className="space-y-10">
            <NeutralColorSet 
              title="Light Mode" 
              colorSet={colors.neutral.light} 
              mode="light" 
            />
            
            <NeutralColorSet 
              title="Dark Mode" 
              colorSet={colors.neutral.dark} 
              mode="dark" 
            />
          </div>
        </section>
        
        <section className="space-y-6">
          <Heading2>Medical-Specific Colors</Heading2>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 space-y-8">
            <Paragraph>
              These specialized colors are used for medical-specific UI elements and data visualization.
            </Paragraph>
            
            <MedicalColorSet 
              title="Vital Signs" 
              colorSet={colors.medical.vitals} 
            />
            
            <MedicalColorSet 
              title="Departments" 
              colorSet={colors.medical.departments} 
            />
          </div>
        </section>
        
        <section className="space-y-6">
          <Heading2>Usage Guidelines</Heading2>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <Paragraph className="mb-4">
              To use these colors in your components, you can use Tailwind CSS classes:
            </Paragraph>
            
            <Code className="block p-4 mb-4 whitespace-pre">
{`// Primary colors
<button className="bg-primary-500 text-white">Primary Button</button>
<div className="text-primary-700">Primary Text</div>

// Secondary colors
<div className="bg-secondary-100 text-secondary-800">Secondary Container</div>

// Semantic colors
<div className="bg-success text-white">Success Message</div>
<div className="bg-danger-light text-danger">Error Message</div>

// Neutral colors (light mode)
<div className="bg-white text-gray-900">Light Mode Container</div>

// Neutral colors (dark mode)
<div className="dark:bg-dark-background dark:text-dark-text-primary">
  Dark Mode Container
</div>

// Medical-specific colors
<div className="text-medical-vitals-normal">Normal Range</div>
<div className="text-medical-vitals-critical">Critical Value</div>`}
            </Code>
            
            <Paragraph className="mb-4">
              For custom styles or when Tailwind classes aren't sufficient, you can import the color system directly:
            </Paragraph>
            
            <Code className="block p-4 whitespace-pre">
{`import colors from '@/styles/colors';

// In your component
const MyComponent = () => (
  <div style={{ backgroundColor: colors.primary[500] }}>
    Custom styled element
  </div>
);`}
            </Code>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
} 