import React from 'react';
import { ScrollExample } from '@/components/examples/ScrollExample';
import { Heading2, Heading3, Paragraph } from '@/components/ui/typography';

export default function ScrollbarExamplePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Heading2 className="mb-4">Custom Scrollbar Examples</Heading2>
      <Paragraph className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
        These examples showcase our custom scrollbar implementation that adapts to light and dark modes.
        The scrollbars use our brand colors and are designed to be accessible and visually appealing.
        Try toggling between light and dark mode to see how the scrollbars adapt.
      </Paragraph>
      
      <div className="mb-12">
        <ScrollExample />
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 max-w-3xl">
        <Heading3 className="mb-4">Implementation Notes</Heading3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Enhanced Dark Mode Palette</h4>
            <Paragraph className="text-gray-600 dark:text-gray-400">
              The dark mode scrollbar uses a dark grey color (#444444) for the thumb, creating a subtle
              element that integrates well with the dark background. The scrollbar track uses a grey
              color (#333333) that provides a neutral container with good contrast against the thumb.
            </Paragraph>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">CSS Variables for Theming</h4>
            <Paragraph className="text-gray-600 dark:text-gray-400">
              We use CSS variables to define scrollbar colors, making it easy to maintain consistency across
              the application. The variables are set in the root and overridden in dark mode:
            </Paragraph>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm mt-2 overflow-x-auto">
              <code className="text-gray-800 dark:text-gray-300">
{`/* Light mode */
--scrollbar-track: #f1f1f1;
--scrollbar-thumb: #d1d1d1;

/* Dark mode */
--scrollbar-track: #333333;
--scrollbar-thumb: #444444;`}
              </code>
            </pre>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Transition Effects</h4>
            <Paragraph className="text-gray-600 dark:text-gray-400">
              We've added subtle transition effects to the scrollbar thumb, creating a smoother experience
              when hovering. This adds a polished feel to the interface and improves the perceived quality.
            </Paragraph>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Scrollbar Variants</h4>
            <Paragraph className="text-gray-600 dark:text-gray-400">
              Our ScrollArea component supports several variants:
            </Paragraph>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Default: Standard scrollbar with our custom styling</li>
              <li>Thin: A more subtle, thinner scrollbar</li>
              <li>Hidden on blur: Scrollbar only appears when hovering over the content</li>
              <li>Completely hidden: No visible scrollbar, but content remains scrollable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 