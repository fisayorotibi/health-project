'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Settings, 
  Palette, 
  Bell, 
  Shield, 
  User, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import {
  Heading1,
  Heading4,
  Paragraph,
  SmallParagraph,
  Label,
  Caption
} from '@/components/ui/typography';

// Dynamically import components that use browser APIs with no SSR
const DashboardLayout = dynamic(() => import('@/components/layout/DashboardLayout'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-dark-background">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">L</span>
        </div>
        <Heading1 className="mt-4 text-gray-900 dark:text-white">Lavender Health Records</Heading1>
        <Paragraph className="mt-2 text-gray-500 dark:text-gray-400">Loading settings...</Paragraph>
      </div>
    </div>
  )
});

// Import the ThemeSwitch component
const ThemeSwitch = dynamic(() => import('@/components/ui/ThemeSwitch').then(mod => mod.ThemeSwitch), { ssr: false });

export default function SettingsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('appearance');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Settings sections
  const settingsSections = [
    {
      id: 'appearance',
      name: 'Appearance',
      icon: <Palette className="w-5 h-5" />,
      description: 'Customize the look and feel of the application'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      description: 'Configure notification preferences'
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: <Shield className="w-5 h-5" />,
      description: 'Manage security settings and data privacy'
    },
    {
      id: 'account',
      name: 'Account',
      icon: <User className="w-5 h-5" />,
      description: 'Update your account information'
    },
    {
      id: 'help',
      name: 'Help & Support',
      icon: <HelpCircle className="w-5 h-5" />,
      description: 'Get help and support'
    }
  ];

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-dark-background">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">L</span>
          </div>
          <Heading1 className="mt-4 text-gray-900 dark:text-white">Lavender Health Records</Heading1>
          <Paragraph className="mt-2 text-gray-500 dark:text-gray-400">Loading settings...</Paragraph>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Heading1 className="text-gray-900 dark:text-white">Settings</Heading1>
            <Paragraph className="mt-1 text-gray-500 dark:text-gray-400">
              Manage your preferences and account settings
            </Paragraph>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-border">
                <Heading4 className="text-gray-900 dark:text-white">Settings</Heading4>
              </div>
              <nav className="divide-y divide-gray-200 dark:divide-dark-border">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-4 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-dark-surface-secondary transition-colors ${
                      activeSection === section.id ? 'bg-gray-50 dark:bg-dark-surface-secondary' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-md ${
                      activeSection === section.id 
                        ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-gray-100' 
                        : 'bg-gray-100 text-gray-500 dark:bg-dark-surface-tertiary dark:text-gray-400'
                    }`}>
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <SmallParagraph className="font-medium text-gray-900 dark:text-white">
                        {section.name}
                      </SmallParagraph>
                      <Caption className="text-gray-500 dark:text-gray-400">
                        {section.description}
                      </Caption>
                    </div>
                    {activeSection === section.id && (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <div>
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-border">
                    <Heading4 className="text-gray-900 dark:text-white">Appearance</Heading4>
                    <Paragraph className="mt-1 text-gray-500 dark:text-gray-400">
                      Customize the look and feel of the application
                    </Paragraph>
                  </div>
                  <div className="px-4 py-5 sm:p-6 space-y-6">
                    {/* Theme Settings */}
                    <div>
                      <Label className="text-gray-900 dark:text-white block mb-2">Theme</Label>
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-surface-secondary rounded-lg">
                        <div>
                          <SmallParagraph className="font-medium text-gray-900 dark:text-white">
                            Color Mode
                          </SmallParagraph>
                          <Caption className="text-gray-500 dark:text-gray-400">
                            Choose between light and dark mode
                          </Caption>
                        </div>
                        <ThemeSwitch />
                      </div>
                    </div>
                    
                    {/* Additional appearance settings can be added here */}
                    <div>
                      <Label className="text-gray-900 dark:text-white block mb-2">Density</Label>
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-surface-secondary rounded-lg">
                        <div>
                          <SmallParagraph className="font-medium text-gray-900 dark:text-white">
                            Interface Density
                          </SmallParagraph>
                          <Caption className="text-gray-500 dark:text-gray-400">
                            Control the spacing and density of UI elements
                          </Caption>
                        </div>
                        <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <button
                            className="p-2 rounded-md bg-white text-gray-900 shadow-sm"
                            aria-label="Comfortable"
                          >
                            Comfortable
                          </button>
                          <button
                            className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                            aria-label="Compact"
                          >
                            Compact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <div>
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-border">
                    <Heading4 className="text-gray-900 dark:text-white">Notifications</Heading4>
                    <Paragraph className="mt-1 text-gray-500 dark:text-gray-400">
                      Configure notification preferences
                    </Paragraph>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <Paragraph className="text-gray-500 dark:text-gray-400">
                      Notification settings will be implemented in a future update.
                    </Paragraph>
                  </div>
                </div>
              )}

              {/* Security & Privacy Settings */}
              {activeSection === 'security' && (
                <div>
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-border">
                    <Heading4 className="text-gray-900 dark:text-white">Security & Privacy</Heading4>
                    <Paragraph className="mt-1 text-gray-500 dark:text-gray-400">
                      Manage security settings and data privacy
                    </Paragraph>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <Paragraph className="text-gray-500 dark:text-gray-400">
                      Security and privacy settings will be implemented in a future update.
                    </Paragraph>
                  </div>
                </div>
              )}

              {/* Account Settings */}
              {activeSection === 'account' && (
                <div>
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-border">
                    <Heading4 className="text-gray-900 dark:text-white">Account</Heading4>
                    <Paragraph className="mt-1 text-gray-500 dark:text-gray-400">
                      Update your account information
                    </Paragraph>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <Paragraph className="text-gray-500 dark:text-gray-400">
                      Account settings will be implemented in a future update.
                    </Paragraph>
                  </div>
                </div>
              )}

              {/* Help & Support */}
              {activeSection === 'help' && (
                <div>
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-border">
                    <Heading4 className="text-gray-900 dark:text-white">Help & Support</Heading4>
                    <Paragraph className="mt-1 text-gray-500 dark:text-gray-400">
                      Get help and support
                    </Paragraph>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <Paragraph className="text-gray-500 dark:text-gray-400">
                      Help and support resources will be implemented in a future update.
                    </Paragraph>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 