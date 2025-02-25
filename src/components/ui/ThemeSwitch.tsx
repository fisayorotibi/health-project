'use client';

import React from 'react';
import { useThemeContext } from '@/components/ThemeProvider';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeSwitch() {
  const { theme, setTheme } = useThemeContext();

  return (
    <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md ${
          theme === 'light' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        aria-label="Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md ${
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-100 shadow-sm' 
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        aria-label="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md ${
          theme === 'system' 
            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm' 
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        aria-label="System theme"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
} 