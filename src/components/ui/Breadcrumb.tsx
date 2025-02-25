'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SmallParagraph } from '../ui/typography';
import { useThemeContext } from '../ThemeProvider';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const { resolvedTheme } = useThemeContext();
  const isLightTheme = resolvedTheme === 'light';

  return (
    <nav className={`flex items-center ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className={`w-3 h-3 mx-1 ${
                  isLightTheme ? 'text-gray-400' : 'text-gray-500'
                }`} />
              )}
              
              {isLast ? (
                <span className={`text-sm font-medium ${
                  isLightTheme ? 'text-gray-800' : 'text-gray-200'
                }`}>
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className={`${
                    isLightTheme 
                      ? 'text-gray-600 hover:text-gray-900' 
                      : 'text-gray-400 hover:text-gray-200'
                  } text-sm font-medium transition-colors`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 