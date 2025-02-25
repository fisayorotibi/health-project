import React from 'react';
import { ScrollExample } from '@/components/examples/ScrollExample';
import { Heading2, Paragraph } from '@/components/ui/typography';

export default function ScrollbarExamplePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Heading2 className="mb-4">Custom Scrollbar Examples</Heading2>
        <Paragraph className="mb-8 text-gray-600 dark:text-gray-400">
          These examples showcase our custom premium scrollbar designs that adapt to both light and dark modes.
          The scrollbars use our brand colors and provide a consistent, premium experience across the application.
        </Paragraph>
        
        <ScrollExample />
        
        <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Heading2 className="mb-4 text-lg font-medium">Implementation Notes</Heading2>
          <Paragraph className="mb-4">
            The custom scrollbar is implemented using CSS variables that adapt to the current theme.
            This ensures a consistent look and feel across the application while maintaining accessibility.
          </Paragraph>
          <Paragraph className="mb-4">
            The ScrollArea component provides a flexible way to apply these styles to specific containers,
            with options for thin scrollbars, hidden scrollbars, and scrollbars that only appear on hover.
          </Paragraph>
          <Paragraph>
            The global scrollbar styles apply to all scrollable elements in the application,
            providing a consistent premium experience throughout.
          </Paragraph>
        </div>
      </div>
    </div>
  );
} 