'use client';

import React, { useState, useEffect } from 'react';
import { X, User, Palette, Bell, Shield, HelpCircle, Monitor } from 'lucide-react';
import { useThemeContext } from '@/components/ThemeProvider';
import { Heading4, Paragraph, SmallParagraph, Caption } from '@/components/ui/typography';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'appearance' | 'system'>('appearance');
  const { theme, setTheme } = useThemeContext();
  const [animateQueryPlaceholders, setAnimateQueryPlaceholders] = useState(true);
  const [autoOpenSearchResults, setAutoOpenSearchResults] = useState(false);
  const [displayMarkdown, setDisplayMarkdown] = useState(false);
  const [showFollowUpSuggestions, setShowFollowUpSuggestions] = useState(true);
  const [wrapLongLines, setWrapLongLines] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-white dark:bg-dark-surface rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border">
          <Heading4 className="text-gray-900 dark:text-white">Settings</Heading4>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row">
          {/* Tabs */}
          <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-gray-200 dark:border-dark-border">
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible">
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === 'account' 
                    ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <User className="w-5 h-5 mr-3" />
                Account
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === 'appearance' 
                    ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Palette className="w-5 h-5 mr-3" />
                Appearance
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === 'system' 
                    ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Monitor className="w-5 h-5 mr-3" />
                System
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4">
            {activeTab === 'account' && (
              <div className="space-y-4">
                <Heading4 className="text-gray-900 dark:text-white">Account Settings</Heading4>
                <Paragraph className="text-gray-500 dark:text-gray-400">
                  Account settings will be implemented in a future update.
                </Paragraph>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <Heading4 className="text-gray-900 dark:text-white mb-4">Theme</Heading4>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                        theme === 'light'
                          ? 'border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-800'
                          : 'border-gray-200 dark:border-dark-border'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
                        <span className="text-gray-900">☀️</span>
                      </div>
                      <SmallParagraph className="font-medium text-gray-900 dark:text-white">Light</SmallParagraph>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                        theme === 'dark'
                          ? 'border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-800'
                          : 'border-gray-200 dark:border-dark-border'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-2 shadow-sm">
                        <span className="text-white">🌙</span>
                      </div>
                      <SmallParagraph className="font-medium text-gray-900 dark:text-white">Dark</SmallParagraph>
                    </button>
                    <button
                      onClick={() => setTheme('system')}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                        theme === 'system'
                          ? 'border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-800'
                          : 'border-gray-200 dark:border-dark-border'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-900 flex items-center justify-center mb-2 shadow-sm">
                        <span>💻</span>
                      </div>
                      <SmallParagraph className="font-medium text-gray-900 dark:text-white">System</SmallParagraph>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-6">
                <Heading4 className="text-gray-900 dark:text-white mb-4">System Preferences</Heading4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <SmallParagraph className="font-medium text-gray-900 dark:text-white">
                        Animate Query Placeholders
                      </SmallParagraph>
                      <Caption className="text-gray-500 dark:text-gray-400">
                        Show animated placeholders in search fields
                      </Caption>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={animateQueryPlaceholders}
                        onChange={() => setAnimateQueryPlaceholders(!animateQueryPlaceholders)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <SmallParagraph className="font-medium text-gray-900 dark:text-white">
                        Automatically Open Search Results
                      </SmallParagraph>
                      <Caption className="text-gray-500 dark:text-gray-400">
                        Open search results automatically when available
                      </Caption>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={autoOpenSearchResults}
                        onChange={() => setAutoOpenSearchResults(!autoOpenSearchResults)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <SmallParagraph className="font-medium text-gray-900 dark:text-white">
                        Display Your Message In Markdown
                      </SmallParagraph>
                      <Caption className="text-gray-500 dark:text-gray-400">
                        Show your messages with markdown formatting
                      </Caption>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={displayMarkdown}
                        onChange={() => setDisplayMarkdown(!displayMarkdown)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <SmallParagraph className="font-medium text-gray-900 dark:text-white">
                        Show Follow Up Suggestions
                      </SmallParagraph>
                      <Caption className="text-gray-500 dark:text-gray-400">
                        Display suggested follow-up questions
                      </Caption>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={showFollowUpSuggestions}
                        onChange={() => setShowFollowUpSuggestions(!showFollowUpSuggestions)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <SmallParagraph className="font-medium text-gray-900 dark:text-white">
                        Wrap Long Lines For Code Blocks By Default
                      </SmallParagraph>
                      <Caption className="text-gray-500 dark:text-gray-400">
                        Automatically wrap long lines in code blocks
                      </Caption>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={wrapLongLines}
                        onChange={() => setWrapLongLines(!wrapLongLines)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 