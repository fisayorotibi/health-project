'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  Menu, 
  User, 
  LogOut, 
  Settings,
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
  Sun,
  Bell
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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

    // Load sidebar collapsed state from localStorage if available
    const savedCollapsedState = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsedState) {
      setIsSidebarCollapsed(savedCollapsedState === 'true');
    }
  }, [searchParams]);

  useEffect(() => {
    // Close sidebar on mobile when route changes
    setIsSidebarOpen(false);
  }, [pathname]);

  // Save sidebar collapsed state to localStorage when it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
    }
  }, [isSidebarCollapsed, isMounted]);

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

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
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
            <Settings className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
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
        <Sidebar 
          isMobile={false} 
          isOpen={true} 
          toggleSidebar={toggleSidebar}
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={toggleSidebarCollapse}
        />
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
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out`}>
        {/* Top navigation */}
        <div className="z-10">
          <header className="bg-white dark:bg-dark-surface shadow-sm">
            <div className="flex justify-between items-center py-4 px-4 sm:px-6 md:px-8">
              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                  <button
                    onClick={toggleSidebar}
                  className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary focus:outline-none"
                  aria-label="Open sidebar"
                  >
                  <Menu className="h-5 w-5" />
                  </button>
                </div>
              
              {/* Breadcrumb and page title */}
              <div className="flex-1 flex items-center min-w-0 ml-3 md:ml-0">
                <Breadcrumb items={[
                  { label: 'Dashboard', href: '/dashboard' },
                  { label: 'Home', href: '/dashboard', isCurrent: true }
                ]} />
              </div>
              
              {/* Right side actions */}
              <div className="flex items-center space-x-3">
                {/* Theme toggle */}
                <button
                  onClick={() => setTheme(isLightTheme ? 'dark' : 'light')}
                  className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary focus:outline-none"
                  aria-label={isLightTheme ? 'Switch to dark mode' : 'Switch to light mode'}
                >
                  {isLightTheme ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
                
                {/* Settings button */}
                <button
                  onClick={() => setSettingsModalOpen(true)}
                  className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary focus:outline-none"
                  aria-label="Open settings"
                >
                  <Settings className="h-5 w-5" />
                </button>
                
                {/* Notifications */}
                <button
                  className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary focus:outline-none relative"
                  aria-label="View notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                
                {/* Profile dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={toggleProfile}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-secondary focus:outline-none"
                    aria-label="Open user menu"
                    >
                      <div className="relative">
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 overflow-hidden">
                        <User className="h-5 w-5" />
                      </div>
                      <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-dark-surface
                        ${userStatus === 'online' ? 'bg-green-500' : userStatus === 'away' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                        </div>
                      </div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Dr. Sarah Chen</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Cardiologist</div>
                    </div>
                    </button>
                  
                  {/* Profile dropdown menu */}
                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-dark-surface ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary">
                          Your Profile
                        </Link>
                        <button 
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
                          onClick={() => {
                            setUserStatus(userStatus === 'online' ? 'away' : userStatus === 'away' ? 'busy' : 'online');
                            setIsProfileOpen(false);
                          }}
                        >
                          Set as {userStatus === 'online' ? 'Away' : userStatus === 'away' ? 'Busy' : 'Online'}
                        </button>
                        <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary">
                          Settings
                        </Link>
                        <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary">
                          Sign out
                        </Link>
                </div>
              </div>
                  )}
            </div>
          </div>
            </div>
          </header>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-10">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16">
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