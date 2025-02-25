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
  Hexagon,
  Calendar,
  Clock,
  FileText,
  Users,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun,
  CircleUser,
  Activity,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

// Dynamically import components that use browser APIs with no SSR
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });
// Import the SettingsModal component with proper typing
const SettingsModal = dynamic(() => import('../ui/SettingsModal').then(mod => mod.SettingsModal), { ssr: false });

// User status options
type UserStatus = 'available' | 'busy' | 'away' | 'offline';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [userStatus, setUserStatus] = useState<UserStatus>('available');
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { online, syncInProgress, lastSyncAttempt } = useOnlineStatus();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Quick actions for the profile dropdown
  const quickActions = [
    { icon: <Calendar className="h-4 w-4" />, label: 'My Schedule', href: '/schedule' },
    { icon: <Users className="h-4 w-4" />, label: 'My Patients', href: '/patients' },
    { icon: <FileText className="h-4 w-4" />, label: 'My Records', href: '/medical-records' }
  ];

  // Recent activities (would come from an API in a real app)
  const recentActivities = [
    { patient: 'John Doe', action: 'Updated prescription', time: '2 hours ago' },
    { patient: 'Jane Smith', action: 'Added lab results', time: '4 hours ago' }
  ];

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

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
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

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get status color based on user status
  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
    }
  };

  // Get status label
  const getStatusLabel = (status: UserStatus) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'away': return 'Away';
      case 'offline': return 'Offline';
    }
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-background">
      <Sidebar isOpen={isSidebarOpen} isMobile={false} toggleSidebar={toggleSidebar} />

      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-dark-surface shadow">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="lg:hidden">
                <button
                  type="button"
                  className="px-4 text-gray-500 dark:text-gray-400 focus:outline-none"
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
                    <div className="relative">
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                      </div>
                      <span className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white dark:ring-gray-800 ${getStatusColor(userStatus)}`}></span>
                    </div>
                  </button>
                </div>

                {/* Enhanced Profile Dropdown */}
                {isProfileOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white dark:bg-dark-surface ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    {/* Header with user info and greeting */}
                    <div className="px-4 py-3 bg-gray-50 dark:bg-dark-surface-secondary border-b border-gray-200 dark:border-dark-border">
                      <div className="flex items-center">
                        <div className="relative mr-3">
                          <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                            <User className="h-7 w-7 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                          </div>
                          <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white dark:ring-gray-800 ${getStatusColor(userStatus)}`}></span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{getGreeting()}, Dr. Sarah</p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Cardiologist • Mount Sinai Hospital</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status selector */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">SET STATUS</p>
                      <div className="grid grid-cols-2 gap-2">
                        {(['available', 'busy', 'away', 'offline'] as UserStatus[]).map((status) => (
                          <button
                            key={status}
                            onClick={() => setUserStatus(status)}
                            className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium ${
                              userStatus === status 
                                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary'
                            }`}
                          >
                            <span className={`h-2 w-2 rounded-full ${getStatusColor(status)} mr-2`}></span>
                            {getStatusLabel(status)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Quick actions */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">QUICK ACCESS</p>
                      <div className="grid grid-cols-3 gap-2">
                        {quickActions.map((action, index) => (
                          <Link
                            key={index}
                            href={action.href}
                            className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-secondary text-gray-700 dark:text-gray-300"
                          >
                            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1">
                              {action.icon}
                            </div>
                            <span className="text-xs">{action.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    {/* Recent activity */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">RECENT ACTIVITY</p>
                        <Link href="/activity" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">View all</Link>
                      </div>
                      <div className="space-y-2">
                        {recentActivities.map((activity, index) => (
                          <div key={index} className="flex items-start py-1">
                            <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                              <Activity className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-900 dark:text-white">{activity.patient}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{activity.action} • {activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* System status and theme toggle */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{online ? 'Online' : 'Offline'}</p>
                          {syncInProgress && <p className="text-xs text-gray-500 dark:text-gray-400 ml-2">(Syncing...)</p>}
                        </div>
                        <button
                          onClick={toggleTheme}
                          className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          {resolvedTheme === 'dark' ? (
                            <>
                              <Sun className="h-3.5 w-3.5 mr-1" />
                              Light Mode
                            </>
                          ) : (
                            <>
                              <Moon className="h-3.5 w-3.5 mr-1" />
                              Dark Mode
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Main actions */}
                    <div className="py-1" role="none">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
                        role="menuitem"
                      >
                        <CircleUser className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
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
                        href="/help"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary"
                        role="menuitem"
                      >
                        <Shield className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                        Privacy & Security
                      </Link>
                      <Link
                        href="/logout"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary border-t border-gray-200 dark:border-dark-border mt-1"
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

        {/* Main content area */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
    </div>
  );
} 