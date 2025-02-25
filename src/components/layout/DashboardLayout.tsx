'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  Menu, 
  Bell, 
  User, 
  LogOut, 
  Settings as SettingsIcon,
  ChevronDown,
  Hexagon
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';

// Dynamically import components that use browser APIs with no SSR
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });
// Import the SettingsModal component with proper typing
const SettingsModal = dynamic(() => import('../ui/SettingsModal').then(mod => mod.SettingsModal), { ssr: false });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if settings should be opened from URL parameter
    if (searchParams?.get('settings') === 'open') {
      setSettingsModalOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    // Close sidebar on mobile when route changes
    setIsSidebarOpen(false);
  }, [pathname]);

  // Handle click outside of profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    // Add event listener when dropdown is open
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const openSettingsModal = () => {
    setSettingsModalOpen(true);
    setIsProfileOpen(false);
  };

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
              <Hexagon className="w-10 h-10 text-gray-200 absolute" strokeWidth={1.5} />
              <span className="text-gray-100 font-bold text-2xl relative z-10">L</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-500/10 to-transparent opacity-60"></div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full border-2 border-white dark:border-dark-surface"></div>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <div className="flex items-baseline">
              <span className="text-gray-900 dark:text-white text-xl font-semibold tracking-tight">LAVENDER</span>
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Health</span>
            </div>
            <div className="h-[2px] w-24 bg-gradient-to-r from-gray-300 via-gray-300 to-transparent dark:from-gray-700 dark:via-gray-700 mt-1"></div>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark-background">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <Sidebar isMobile={false} isOpen={true} toggleSidebar={toggleSidebar} />
      </div>

      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 z-40 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
      >
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
          onClick={toggleSidebar}
        ></div>
        <div className="fixed inset-y-0 left-0 flex max-w-xs w-full">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-dark-surface shadow-xl">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar isMobile={true} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="bg-white dark:bg-dark-surface shadow-sm z-10 border-b border-gray-200 dark:border-dark-border">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center md:hidden">
                  <button
                    type="button"
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary focus:outline-none"
                    onClick={toggleSidebar}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary focus:outline-none"
                >
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <div className="ml-3 relative" ref={profileDropdownRef}>
                  <div>
                    <button
                      type="button"
                      className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={toggleProfile}
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                      </div>
                    </button>
                  </div>

                  {/* Dropdown menu */}
                  {isProfileOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-dark-surface ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      {/* Profile owner info */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Dr. Sarah Chen</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Cardiologist</p>
                      </div>
                      <div className="py-1" role="none">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
                          role="menuitem"
                        >
                          <User className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                          Your Profile
                        </Link>
                        <button
                          onClick={openSettingsModal}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
                          role="menuitem"
                        >
                          <SettingsIcon className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                          Settings
                        </button>
                        <Link
                          href="/logout"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
                          role="menuitem"
                        >
                          <LogOut className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                          Sign out
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-gray-100 dark:bg-dark-background">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      {settingsModalOpen && <SettingsModal isOpen={settingsModalOpen} onClose={() => setSettingsModalOpen(false)} />}
    </div>
  );
} 