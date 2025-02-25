'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Bell, Search, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Heading1, Paragraph, SmallParagraph } from '@/components/ui/typography';

// Dynamically import components that use browser APIs
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Check if we're on mobile and set mounted state
  useEffect(() => {
    setIsMounted(true);
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-dark-background">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">L</span>
          </div>
          <Heading1 className="mt-4 text-gray-900 dark:text-white">Lavender Health Records</Heading1>
          <Paragraph className="mt-2 text-gray-500 dark:text-gray-400">Loading...</Paragraph>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-background text-gray-900 dark:text-gray-50">
      <Sidebar 
        isMobile={isMobile} 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center flex-1">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-dark-border rounded-md bg-gray-50 dark:bg-dark-surface-secondary text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-5 w-5" />
                </button>

                <div className="relative" ref={profileDropdownRef}>
                  <button 
                    className="flex items-center space-x-2 focus:outline-none"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300">
                      <User className="h-4 w-4" />
                    </div>
                  </button>
                  
                  {/* Profile Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-surface rounded-md shadow-lg border border-gray-200 dark:border-dark-border overflow-hidden z-10">
                      <div className="py-2 px-4 border-b border-gray-200 dark:border-dark-border">
                        <SmallParagraph className="font-medium text-gray-900 dark:text-white">Dr. John Doe</SmallParagraph>
                        <SmallParagraph className="text-gray-500 dark:text-gray-400 text-xs">Cardiologist</SmallParagraph>
                      </div>
                      <div className="py-1">
                        <Link 
                          href="/profile" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Link>
                        <Link 
                          href="/settings" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                      </div>
                      <div className="py-1 border-t border-gray-200 dark:border-dark-border">
                        <button 
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-dark-background">
          {/* Main content */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 