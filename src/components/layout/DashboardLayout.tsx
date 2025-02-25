'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  Menu, 
  User, 
  LogOut, 
  Settings as SettingsIcon,
  ChevronDown,
  Hexagon,
  Calendar,
  MessageSquare,
  FileText,
  HelpCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun
} from 'lucide-react';
import Link from 'next/link';
import { useThemeContext } from '@/components/ThemeProvider';

// Dynamically import components that use browser APIs with no SSR
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });
// Import the SettingsModal component with proper typing
const SettingsModal = dynamic(() => import('../ui/SettingsModal').then(mod => mod.SettingsModal), { ssr: false });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useThemeContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const [userStatus, setUserStatus] = useState<'online' | 'away' | 'busy'>('online');
  const isLightTheme = resolvedTheme === 'light';

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

  // Add keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Cmd/Ctrl + S for Settings
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        setSettingsModalOpen(true);
      }
    }
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  // Toggle user status
  const toggleStatus = (status: 'online' | 'away' | 'busy') => {
    setUserStatus(status);
    setIsProfileOpen(false);
  };

  // Profile dropdown component
  const ProfileDropdown = () => {
    return (
      <div
        key={`profile-dropdown-${resolvedTheme}`}
        className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white dark:bg-dark-surface ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        {/* Profile header */}
        <div className="relative">
          {/* Background gradient */}
          <div className="h-20 bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-800 dark:to-primary-600"></div>
          
          {/* User avatar and info */}
          <div className="px-4 pb-4">
            <div className="flex items-end -mt-10">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-white dark:border-dark-surface bg-white dark:bg-dark-surface-secondary flex items-center justify-center overflow-hidden">
                  {/* Replace with actual avatar if available */}
                  <User className="h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                </div>
                <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white dark:border-dark-surface ${
                  userStatus === 'online' ? 'bg-green-500' : 
                  userStatus === 'away' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900 dark:text-white">Dr. Sarah Chen</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  Cardiologist
                  <span className="mx-1">•</span>
                  <span className="text-xs flex items-center">
                    {userStatus === 'online' ? (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                        Online
                      </>
                    ) : userStatus === 'away' ? (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-1"></span>
                        Away
                      </>
                    ) : (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1"></span>
                        Busy
                      </>
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Status selector */}
        <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-border">
          <div className="flex space-x-2">
            <button 
              onClick={() => toggleStatus('online')}
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium ${
                userStatus === 'online' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary'
              }`}
            >
              <div className="flex items-center justify-center">
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                Online
              </div>
            </button>
            <button 
              onClick={() => toggleStatus('away')}
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium ${
                userStatus === 'away' 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary'
              }`}
            >
              <div className="flex items-center justify-center">
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                Away
              </div>
            </button>
            <button 
              onClick={() => toggleStatus('busy')}
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium ${
                userStatus === 'busy' 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary'
              }`}
            >
              <div className="flex items-center justify-center">
                <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                Busy
              </div>
            </button>
          </div>
        </div>
        
        {/* Quick actions */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">QUICK ACTIONS</p>
          <div className="grid grid-cols-3 gap-2">
            <Link
              href="/schedule"
              className="flex flex-col items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
              onClick={() => setIsProfileOpen(false)}
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-1">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300">Schedule</span>
            </Link>
            <Link
              href="/messages"
              className="flex flex-col items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
              onClick={() => setIsProfileOpen(false)}
            >
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-1">
                <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300">Messages</span>
            </Link>
            <Link
              href="/patients"
              className="flex flex-col items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
              onClick={() => setIsProfileOpen(false)}
            >
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-1">
                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300">Patients</span>
            </Link>
          </div>
        </div>
        
        {/* Theme toggle */}
        <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button
              onClick={() => setTheme(isLightTheme ? 'dark' : 'light')}
              className="p-1.5 rounded-md bg-gray-100 dark:bg-dark-surface-secondary"
            >
              {!isLightTheme ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        
        {/* Menu items */}
        <div className="py-1" role="none">
          <Link
            href="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
            role="menuitem"
            onClick={() => setIsProfileOpen(false)}
          >
            <User className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            Your Profile
          </Link>
          <button
            onClick={() => {
              openSettingsModal();
              setIsProfileOpen(false);
            }}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
            role="menuitem"
          >
            <SettingsIcon className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            Settings
            <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">⌘S</span>
          </button>
          <Link
            href="/help"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
            role="menuitem"
            onClick={() => setIsProfileOpen(false)}
          >
            <HelpCircle className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            Help & Support
          </Link>
          <Link
            href="/logout"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
            role="menuitem"
            onClick={() => setIsProfileOpen(false)}
          >
            <LogOut className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            Sign out
          </Link>
        </div>
      </div>
    );
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
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-dark-surface">
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
        <div className="z-10">
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
                {/* Profile dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <div>
                    <button
                      type="button"
                      className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      id="user-menu"
                      aria-expanded={isProfileOpen}
                      aria-haspopup="true"
                      onClick={toggleProfile}
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="relative">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-white dark:border-dark-surface ${
                          userStatus === 'online' ? 'bg-green-500' : 
                          userStatus === 'away' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    </button>
                  </div>

                  {/* Dropdown menu */}
                  {isProfileOpen && <ProfileDropdown />}
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