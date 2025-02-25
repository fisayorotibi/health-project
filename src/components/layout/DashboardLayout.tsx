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
const Breadcrumb = dynamic(() => import('../ui/Breadcrumb'), { ssr: false });

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
        className="origin-top-right absolute right-0 mt-2 w-72 rounded-xl shadow-lg bg-white dark:bg-dark-surface focus:outline-none z-50 overflow-hidden transition-all duration-200"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        {/* Profile header - simplified and elegant */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center">
        <div className="relative">
              <div className="h-14 w-14 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700">
                  {/* Replace with actual avatar if available */}
                <User className="h-7 w-7 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900 dark:text-white">Dr. Sarah Chen</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  Cardiologist
                </p>
            </div>
          </div>
        </div>
        
        {/* Status selector - simplified */}
        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/30">
          <div className="flex space-x-2">
            <button 
              onClick={() => toggleStatus('online')}
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all duration-150 ${
                userStatus === 'online' 
                  ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                Online
              </div>
            </button>
            <button 
              onClick={() => toggleStatus('away')}
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all duration-150 ${
                userStatus === 'away' 
                  ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-1.5"></div>
                Away
              </div>
            </button>
            <button 
              onClick={() => toggleStatus('busy')}
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all duration-150 ${
                userStatus === 'busy' 
                  ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5"></div>
                Busy
              </div>
            </button>
          </div>
        </div>
        
        {/* Quick actions - simplified and elegant */}
        <div className="px-5 py-4">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-3 tracking-wider">QUICK ACCESS</p>
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/schedule"
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-150"
              onClick={() => setIsProfileOpen(false)}
            >
              <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1.5">
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Schedule</span>
            </Link>
            <Link
              href="/messages"
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-150"
              onClick={() => setIsProfileOpen(false)}
            >
              <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1.5">
                <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Messages</span>
            </Link>
            <Link
              href="/patients"
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-150"
              onClick={() => setIsProfileOpen(false)}
            >
              <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1.5">
                <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Patients</span>
            </Link>
          </div>
        </div>
        
        {/* Theme toggle - simplified */}
        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/30">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Dark Mode</span>
            <button
              onClick={() => setTheme(isLightTheme ? 'dark' : 'light')}
              className="p-1.5 rounded-md bg-white dark:bg-gray-800 shadow-sm transition-all duration-150"
            >
              {!isLightTheme ? (
                <Sun className="h-4 w-4 text-gray-500" />
              ) : (
                <Moon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        
        {/* Menu items - simplified */}
        <div className="px-2 py-2" role="none">
          <Link
            href="/profile"
            className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-150"
            role="menuitem"
            onClick={() => setIsProfileOpen(false)}
          >
            <User className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            Your Profile
          </Link>
          <button
            onClick={() => {
              openSettingsModal();
              setIsProfileOpen(false);
            }}
            className="flex w-full items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-150"
            role="menuitem"
          >
            <SettingsIcon className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            Settings
            <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">⌘S</span>
          </button>
          <Link
            href="/help"
            className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-150"
            role="menuitem"
            onClick={() => setIsProfileOpen(false)}
          >
            <HelpCircle className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            Help & Support
          </Link>
          <Link
            href="/logout"
            className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-150"
            role="menuitem"
            onClick={() => setIsProfileOpen(false)}
          >
            <LogOut className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
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
          </div>
          <div className="mt-4 flex flex-col items-center">
            <div className="flex items-baseline">
              <span className="text-gray-900 dark:text-white text-base font-semibold tracking-tight">LAVENDER</span>
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
                {/* Breadcrumb navigation */}
                <div className="flex items-center ml-2">
                  <Breadcrumb 
                    items={[
                      { label: 'Dashboard', href: '/dashboard' },
                      { label: 'Home', href: '/dashboard/home', isCurrent: true }
                    ]} 
                  />
                </div>
              </div>
              <div className="flex items-center">
                {/* Profile dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <div>
                    <button
                      type="button"
                      className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-all duration-150"
                      id="user-menu"
                      aria-expanded={isProfileOpen}
                      aria-haspopup="true"
                      onClick={toggleProfile}
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="relative">
                        <div className="h-9 w-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center shadow-sm">
                          <User className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                        </div>
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