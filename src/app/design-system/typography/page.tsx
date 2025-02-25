'use client';

import React, { useState } from 'react';
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  Heading4, 
  Heading5,
  Paragraph,
  LargeParagraph,
  SmallParagraph,
  Label,
  Caption,
  DataDisplay,
  LargeDataDisplay,
  Code,
  Typography
} from '@/components/ui/typography';
import { textVariants, typographyGuidelines } from '@/styles/typography';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function TypographyPage() {
  const [mounted, setMounted] = useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <Heading1>Typography System</Heading1>
          <LargeParagraph className="mt-4 text-gray-600 dark:text-gray-300">
            Our typography system is designed to create a consistent, readable, and accessible
            typography experience across the platform. It's inspired by modern design systems
            like Linear, Stripe, and Vercel, but tailored for healthcare professionals.
          </LargeParagraph>
        </div>
        
        <section className="space-y-6">
          <Heading2>Key Principles</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-dark-border">
              <Heading4>Readability</Heading4>
              <Paragraph className="mt-2 text-gray-600 dark:text-gray-300">
                Ensuring text is easily readable in various contexts, with appropriate contrast and sizing.
              </Paragraph>
            </div>
            <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-dark-border">
              <Heading4>Hierarchy</Heading4>
              <Paragraph className="mt-2 text-gray-600 dark:text-gray-300">
                Clear visual hierarchy to guide users through information, making it easy to scan and understand.
              </Paragraph>
            </div>
            <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-dark-border">
              <Heading4>Consistency</Heading4>
              <Paragraph className="mt-2 text-gray-600 dark:text-gray-300">
                Predictable type styles across the platform, creating a cohesive and professional experience.
              </Paragraph>
            </div>
            <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-dark-border">
              <Heading4>Accessibility</Heading4>
              <Paragraph className="mt-2 text-gray-600 dark:text-gray-300">
                Meeting WCAG AA standards for text contrast and size, ensuring the platform is usable by all.
              </Paragraph>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <Heading2>Headings</Heading2>
          <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-dark-border space-y-6">
            <div>
              <Heading1>Heading 1</Heading1>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.headings.h1} • 
                Font size: {textVariants.h1.fontSize} • 
                Line height: {textVariants.h1.lineHeight} • 
                Font weight: {textVariants.h1.fontWeight}
              </Caption>
            </div>
            <div>
              <Heading2>Heading 2</Heading2>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.headings.h2} • 
                Font size: {textVariants.h2.fontSize} • 
                Line height: {textVariants.h2.lineHeight} • 
                Font weight: {textVariants.h2.fontWeight}
              </Caption>
            </div>
            <div>
              <Heading3>Heading 3</Heading3>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.headings.h3} • 
                Font size: {textVariants.h3.fontSize} • 
                Line height: {textVariants.h3.lineHeight} • 
                Font weight: {textVariants.h3.fontWeight}
              </Caption>
            </div>
            <div>
              <Heading4>Heading 4</Heading4>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.headings.h4} • 
                Font size: {textVariants.h4.fontSize} • 
                Line height: {textVariants.h4.lineHeight} • 
                Font weight: {textVariants.h4.fontWeight}
              </Caption>
            </div>
            <div>
              <Heading5>Heading 5</Heading5>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.headings.h5} • 
                Font size: {textVariants.h5.fontSize} • 
                Line height: {textVariants.h5.lineHeight} • 
                Font weight: {textVariants.h5.fontWeight}
              </Caption>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <Heading2>Body Text</Heading2>
          <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-dark-border space-y-6">
            <div>
              <LargeParagraph>Large Paragraph</LargeParagraph>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.body.bodyLarge} • 
                Font size: {textVariants.bodyLarge.fontSize} • 
                Line height: {textVariants.bodyLarge.lineHeight} • 
                Font weight: {textVariants.bodyLarge.fontWeight}
              </Caption>
            </div>
            <div>
              <Paragraph>
                Regular paragraph text is used for most content. It should be easy to read and have good contrast.
                This is the default text style for paragraphs and general content throughout the application.
              </Paragraph>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.body.body} • 
                Font size: {textVariants.body.fontSize} • 
                Line height: {textVariants.body.lineHeight} • 
                Font weight: {textVariants.body.fontWeight}
              </Caption>
            </div>
            <div>
              <SmallParagraph>Small paragraph text is used for secondary information, notes, or less important content.</SmallParagraph>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.body.bodySmall} • 
                Font size: {textVariants.bodySmall.fontSize} • 
                Line height: {textVariants.bodySmall.lineHeight} • 
                Font weight: {textVariants.bodySmall.fontWeight}
              </Caption>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <Heading2>UI Elements</Heading2>
          <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-dark-border space-y-6">
            <div>
              <Label>Form Label</Label>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.ui.label} • 
                Font size: {textVariants.label.fontSize} • 
                Line height: {textVariants.label.lineHeight} • 
                Font weight: {textVariants.label.fontWeight}
              </Caption>
            </div>
            <div>
              <Caption>Caption Text</Caption>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.ui.caption} • 
                Font size: {textVariants.caption.fontSize} • 
                Line height: {textVariants.caption.lineHeight} • 
                Font weight: {textVariants.caption.fontWeight}
              </Caption>
            </div>
            <div>
              <button className="px-4 py-2 bg-primary-500 text-white rounded-md">
                <Typography variant="button">Button Text</Typography>
              </button>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.ui.button} • 
                Font size: {textVariants.button.fontSize} • 
                Line height: {textVariants.button.lineHeight} • 
                Font weight: {textVariants.button.fontWeight}
              </Caption>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <Heading2>Data Display</Heading2>
          <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-dark-border space-y-6">
            <div>
              <LargeDataDisplay>1,248</LargeDataDisplay>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.data.dataLarge} • 
                Font size: {textVariants.dataLarge.fontSize} • 
                Line height: {textVariants.dataLarge.lineHeight} • 
                Font weight: {textVariants.dataLarge.fontWeight}
              </Caption>
            </div>
            <div>
              <DataDisplay>BP: 120/80 mmHg</DataDisplay>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.data.data} • 
                Font size: {textVariants.data.fontSize} • 
                Line height: {textVariants.data.lineHeight} • 
                Font weight: {textVariants.data.fontWeight}
              </Caption>
            </div>
            <div>
              <Code>const patient = new Patient();</Code>
              <Caption className="mt-2 text-gray-500">
                {typographyGuidelines.data.code} • 
                Font size: {textVariants.code.fontSize} • 
                Line height: {textVariants.code.lineHeight} • 
                Font weight: {textVariants.code.fontWeight}
              </Caption>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <Heading2>Usage Guidelines</Heading2>
          <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-dark-border">
            <Paragraph className="mb-4">
              To use these typography components in your React components:
            </Paragraph>
            
            <Code className="block p-4 mb-4 whitespace-pre">
{`import { 
  Heading1, 
  Paragraph, 
  Label 
} from '@/components/ui/typography';

export function MyComponent() {
  return (
    <div>
      <Heading1>Page Title</Heading1>
      <Paragraph>This is a paragraph of text.</Paragraph>
      <Label>Form Label</Label>
    </div>
  );
}`}
            </Code>
            
            <Paragraph className="mb-4">
              For custom styling, you can pass className props:
            </Paragraph>
            
            <Code className="block p-4 whitespace-pre">
{`<Heading2 className="text-primary-500 mb-4">
  Custom Styled Heading
</Heading2>`}
            </Code>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
} 