'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Pill, 
  Calendar, 
  BarChart, 
  Settings,
  Menu,
  X,
  User,
  Sparkles,
  ArrowRight,
  Hexagon,
  ChevronLeft,
  ChevronRight,
  Search,
  Star as NewStar
} from 'lucide-react';
import { Heading4, Paragraph, SmallParagraph, Caption } from '@/components/ui/typography';
import ProfileModal from '@/components/ui/ProfileModal';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Persist collapsed state in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);
  
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Define the type for nav items
  interface NavItem {
    name?: string;
    href?: string;
    icon: React.ReactNode;
    isDivider?: boolean;
  }

  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { name: 'Patient Records', href: '/patients', icon: <Users className="w-3.5 h-3.5" /> },
    { name: 'Medical Records', href: '/medical-records', icon: <FileText className="w-3.5 h-3.5" /> },
    // Divider
    { isDivider: true, icon: <div className="my-2 border-t border-gray-200 dark:border-gray-800" /> },
    { name: 'Prescriptions', href: '/prescriptions', icon: <Pill className="w-3.5 h-3.5" /> },
    { name: 'Appointments', href: '/schedule', icon: <Calendar className="w-3.5 h-3.5" /> },
    // Divider
    { isDivider: true, icon: <div className="my-2 border-t border-gray-200 dark:border-gray-800" /> },
    { name: 'Analytics', href: '/reports', icon: <BarChart className="w-3.5 h-3.5" /> },
  ];

  // Filter navigation items based on search query
  const filteredNavItems = searchQuery 
    ? navItems.filter(item => 
        item.name ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : false
      )
    : navItems;

  // If sidebar is closed on mobile, don't render the content
  if (isMobile && !isOpen) {
    return (
      <div className="fixed left-0 top-0 z-40 p-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 dark:text-gray-400"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className={`
      ${isMobile ? 'fixed inset-0 z-50 bg-gray-100 dark:bg-dark-background' : 'hidden md:flex'}
      flex-col ${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-gray-100 dark:bg-dark-background
      border-r border-gray-200/70 dark:border-gray-800/70
      transition-all duration-300 ease-in-out
      group
    `}>
      <div className="flex items-center justify-between py-3.5 px-4 relative">
        {!isCollapsed ? (
          <>
        <div className="flex items-center space-x-3">
          {/* Stylized brand name */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="w-5 h-5 border-4 border-[#7C66DC] rounded-full bg-transparent shadow-lg mr-1"></div>
              <span className="text-gray-900 dark:text-white text-md font-semibold tracking-tight font-funnel-display">lavender</span>
            </div>
          </div>
        </div>
        <div className="relative ml-auto">
            <button
              type="button"
              className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-0 hover:ring-2 hover:ring-gray-200 dark:hover:ring-gray-700 transition-all duration-150"
              id="user-menu"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
              onClick={toggleProfile}
            >
              <span className="sr-only">Open user menu</span>
              <div className="relative">
                <div className="h-6 w-6 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center shadow-sm">
                  <User className="h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                </div>
              </div>
            </button>
          </div>
          {/* Collapse button */}
          <button
            onClick={toggleCollapse}
            className="absolute right-0 transform translate-x-1/2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-dark-surface-secondary text-gray-500 dark:text-gray-400 transition-colors opacity-0 group-hover:opacity-100"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          </>
        ) : (
          <div className="flex justify-center w-full">
            <button
              onClick={toggleCollapse}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-dark-surface-secondary text-gray-500 dark:text-gray-400 transition-colors"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {isMobile && !isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="ml-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-secondary text-gray-500 dark:text-gray-400"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search bar - only show when not collapsed */}
      {!isCollapsed && (
        <div className="px-4 pb-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md 
                         focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 
                         text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
              aria-label="Search navigation"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Clear search"
              >
                <X className="h-3 w-3 text-gray-400 dark:text-gray-500" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search icon only - show when collapsed */}
      {isCollapsed && (
        <div className="flex justify-center py-2">
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-dark-surface-secondary text-gray-500 dark:text-gray-400"
            aria-label="Expand sidebar to search"
            title="Expand sidebar to search"
          >
            <Search className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-2">
        <nav className={`px-4 space-y-1.5`}>
          {filteredNavItems.map((item: NavItem, index) => {
            const isActive = item.href ? pathname === item.href : false;
            return (
              <React.Fragment key={index}>
                {item.isDivider ? (
                  <div className="my-2 border-t border-gray-200 dark:border-gray-800"></div>
                ) : (
                  item.href ? (
                    <Link
                      href={item.href}
                      className={
                        `flex items-center ${isCollapsed ? 'px-2' : 'px-4'} py-1.5 text-xs font-medium rounded-md transition-colors
                        ${isActive ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary hover:text-gray-900 dark:hover:text-white'}
                        `
                      }
                      title={isCollapsed ? (item.name || 'Unnamed') : ''}
                    >
                      <span className={`${isCollapsed ? '' : 'mr-2.5'} ${isActive ? 'text-gray-700 dark:text-gray-300' : ''}`}>{item.icon}</span>
                      {!isCollapsed && <span className="font-medium text-xs tracking-wide">{item.name || 'Unnamed'}</span>}
                    </Link>
                  ) : null
                )}
              </React.Fragment>
            );
          })}
          
          {/* Show "No results" message when search has no matches */}
          {!isCollapsed && searchQuery && filteredNavItems.length === 0 && (
            <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 text-center">
              No results found
            </div>
          )}
        </nav>
      </div>

      {/* Premium Promo Banner - Only show when not collapsed */}
      {!isCollapsed && (
      <div className="p-4">
        <div className="relative overflow-hidden rounded-lg p-4 transition-all group
          bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900
          border border-gray-200/80 dark:border-gray-700/50 shadow-sm hover:shadow-md">
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-gray-200/30 dark:bg-gray-700/20 rounded-full blur-xl"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-200/0 to-gray-200/20 dark:from-gray-700/0 dark:to-gray-700/20 rounded-full"></div>
          
          {/* Premium badge */}
          <div className="flex items-center space-x-1.5 mb-3">
            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-full p-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            </div>
            <Caption className="font-medium text-gray-700 dark:text-gray-400 tracking-wide uppercase text-[10px]">Premium</Caption>
          </div>
          
          {/* Content with improved hierarchy */}
          <Heading4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5">
            Elevate Patient Care
          </Heading4>
          
          <SmallParagraph className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
            AI-powered insights to improve clinical outcomes and efficiency.
          </SmallParagraph>
          
          {/* CTA button with improved styling */}
          <Link 
            href="/upgrade"
            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium 
              bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-400
              rounded-md transition-all hover:bg-gray-200 dark:hover:bg-gray-800/50
              group-hover:translate-x-0.5 duration-200"
          >
            <span>Upgrade now</span>
            <ArrowRight className="ml-1.5 w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      )}
      
      {/* Collapsed Premium Icon */}
      {isCollapsed && (
        <div className="p-3 flex justify-center">
          <Link 
            href="/upgrade"
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-dark-surface-secondary text-gray-500 dark:text-gray-400 transition-colors"
            title="Upgrade to Premium"
          >
            <Sparkles className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={toggleProfile} />
    </div>
  );
};

export default Sidebar; 