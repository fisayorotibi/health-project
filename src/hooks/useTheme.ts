'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Update theme
  const applyTheme = (theme: Theme) => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    setResolvedTheme(theme);
  };

  // Set theme on mount and when theme changes
  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  return {
    theme,
    setTheme,
    resolvedTheme,
    mounted
  };
} 