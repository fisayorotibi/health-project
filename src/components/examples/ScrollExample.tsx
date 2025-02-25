'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Heading4, Paragraph } from '@/components/ui/typography';

/**
 * Example component demonstrating the ScrollArea usage with different configurations
 */
export const ScrollExample = () => {
  return (
    <div className="space-y-8 p-6">
      <div>
        <Heading4 className="mb-4">Default Scrollbar</Heading4>
        <ScrollArea className="border border-gray-200 dark:border-gray-800 rounded-lg p-4" maxHeight="200px">
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Paragraph key={i} className="pb-2">
                This is a paragraph of text that demonstrates the default scrollbar styling.
                It has our custom premium scrollbar that adapts to the current theme.
              </Paragraph>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <Heading4 className="mb-4">Thin Scrollbar</Heading4>
        <ScrollArea 
          thin 
          className="border border-gray-200 dark:border-gray-800 rounded-lg p-4" 
          maxHeight="200px"
        >
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Paragraph key={i} className="pb-2">
                This example uses the thin scrollbar variant, which is more subtle
                and takes up less space while still being easy to use.
              </Paragraph>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <Heading4 className="mb-4">Hidden Scrollbar (Visible on Hover)</Heading4>
        <ScrollArea 
          showOnHover 
          className="border border-gray-200 dark:border-gray-800 rounded-lg p-4" 
          maxHeight="200px"
        >
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Paragraph key={i} className="pb-2">
                This example hides the scrollbar until you hover over the content area.
                It provides a clean look while still allowing for scrolling functionality.
              </Paragraph>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <Heading4 className="mb-4">Completely Hidden Scrollbar</Heading4>
        <ScrollArea 
          hideScrollbar 
          className="border border-gray-200 dark:border-gray-800 rounded-lg p-4" 
          maxHeight="200px"
        >
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Paragraph key={i} className="pb-2">
                This example completely hides the scrollbar while still allowing scrolling.
                This is useful for touch interfaces or when you want a very clean look.
              </Paragraph>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}; 