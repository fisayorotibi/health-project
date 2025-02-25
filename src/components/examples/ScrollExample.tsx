'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Heading4, Paragraph } from '@/components/ui/typography';
import { useThemeContext } from '@/components/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

/**
 * Example component demonstrating the ScrollArea usage with different configurations
 */
export function ScrollExample() {
  const { theme, setTheme, resolvedTheme } = useThemeContext();
  
  const isDarkMode = resolvedTheme === 'dark';
  
  // Sample text for scrolling
  const paragraphs = Array(10).fill(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.'
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Default Scrollbar */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <Heading4 className="mb-2">Default Scrollbar</Heading4>
        <Paragraph className="text-gray-500 dark:text-gray-400 mb-4">
          Standard scrollbar with brand colors in dark mode.
        </Paragraph>
        <ScrollArea 
          maxHeight={200} 
          className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md"
        >
          {paragraphs.map((text, i) => (
            <Paragraph key={i} className="mb-4">
              {text}
            </Paragraph>
          ))}
        </ScrollArea>
      </div>

      {/* Thin Scrollbar */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <Heading4 className="mb-2">Thin Scrollbar</Heading4>
        <Paragraph className="text-gray-500 dark:text-gray-400 mb-4">
          A thinner scrollbar variant for a more subtle appearance.
        </Paragraph>
        <ScrollArea 
          maxHeight={200} 
          thin 
          className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md"
        >
          {paragraphs.map((text, i) => (
            <Paragraph key={i} className="mb-4">
              {text}
            </Paragraph>
          ))}
        </ScrollArea>
      </div>

      {/* Hidden Scrollbar (Visible on Hover) */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <Heading4 className="mb-2">Hidden Scrollbar (Visible on Hover)</Heading4>
        <Paragraph className="text-gray-500 dark:text-gray-400 mb-4">
          Scrollbar is hidden until you hover over the content area.
        </Paragraph>
        <ScrollArea 
          maxHeight={200} 
          showOnHover 
          className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md"
        >
          {paragraphs.map((text, i) => (
            <Paragraph key={i} className="mb-4">
              {text}
            </Paragraph>
          ))}
        </ScrollArea>
      </div>

      {/* Completely Hidden Scrollbar */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <Heading4 className="mb-2">Completely Hidden Scrollbar</Heading4>
        <Paragraph className="text-gray-500 dark:text-gray-400 mb-4">
          Scrollbar is completely hidden but content is still scrollable.
        </Paragraph>
        <ScrollArea 
          maxHeight={200} 
          hideScrollbar 
          className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md"
        >
          {paragraphs.map((text, i) => (
            <Paragraph key={i} className="mb-4">
              {text}
            </Paragraph>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
} 