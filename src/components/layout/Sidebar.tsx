'use client';

import React from 'react';
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
  Hexagon
} from 'lucide-react';
import { Heading4, Paragraph, SmallParagraph, Caption } from '@/components/ui/typography';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      name: 'Patient Records',
      href: '/patients',
      icon: <Users className="w-4 h-4" />,
    },
    {
      name: 'Medical Records',
      href: '/medical-records',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      name: 'Prescriptions',
      href: '/prescriptions',
      icon: <Pill className="w-4 h-4" />,
    },
    {
      name: 'Appointments',
      href: '/schedule',
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      name: 'Analytics',
      href: '/reports',
      icon: <BarChart className="w-4 h-4" />,
    },
  ];

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
      ${isMobile ? 'fixed inset-0 z-50 bg-white dark:bg-dark-surface' : 'hidden md:flex'}
      flex-col w-64 h-screen bg-white dark:bg-dark-surface
    `}>
      <div className="flex items-center justify-between py-3.5 px-4">
        <div className="flex items-center space-x-3">
          {/* Stylized logo placeholder */}
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
              <Hexagon className="w-4.5 h-4.5 text-gray-200 absolute" strokeWidth={1.5} />
              <span className="text-gray-100 font-bold text-xs relative z-10">L</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-500/10 to-transparent opacity-60"></div>
            </div>
          </div>
          
          {/* Stylized brand name */}
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-gray-900 dark:text-white text-sm font-semibold tracking-tight">LAVENDER</span>
              <span className="ml-1 text-[8px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Health</span>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-secondary text-gray-500 dark:text-gray-400"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActive 
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary hover:text-gray-900 dark:hover:text-white'}
                `}
              >
                <span className={`mr-3 ${isActive ? 'text-gray-700 dark:text-gray-300' : ''}`}>
                  {item.icon}
                </span>
                <SmallParagraph className="font-medium">{item.name}</SmallParagraph>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Premium Promo Banner */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-border">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 p-4 shadow-sm transition-all hover:shadow-md group">
          {/* Sparkle effect in top right */}
          <div className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 opacity-70">
            <Sparkles className="w-4 h-4" />
          </div>
          
          {/* Content */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-1">
                <Sparkles className="w-3 h-3 text-primary-600 dark:text-primary-400" />
              </div>
              <SmallParagraph className="font-semibold text-gray-900 dark:text-gray-100">Lavender Pro</SmallParagraph>
            </div>
            
            <Paragraph className="text-sm text-gray-700 dark:text-gray-300">
              Unlock AI-powered clinical insights and advanced analytics for better patient outcomes.
            </Paragraph>
            
            <Link 
              href="/upgrade"
              className="mt-2 flex items-center text-xs font-medium text-primary-600 dark:text-primary-400 group-hover:underline"
            >
              <span>Explore Pro features</span>
              <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 