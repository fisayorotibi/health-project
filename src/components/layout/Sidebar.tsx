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
  User
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
      name: 'Patients',
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
      name: 'Schedule',
      href: '/schedule',
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      name: 'Reports',
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
          className="p-2 rounded-md bg-primary dark:bg-gray-700 text-white"
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
      flex-col w-64 h-screen bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border
    `}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary dark:bg-gray-700 flex items-center justify-center">
            <span className="text-white font-bold">L</span>
          </div>
          <Heading4 className="text-gray-900 dark:text-white">Lavender</Heading4>
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
                    ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-gray-100' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface-secondary hover:text-gray-900 dark:hover:text-white'}
                `}
              >
                <span className={`mr-3 ${isActive ? 'text-primary-500 dark:text-gray-300' : ''}`}>
                  {item.icon}
                </span>
                <SmallParagraph className="font-medium">{item.name}</SmallParagraph>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-dark-border">
        <div className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-secondary cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary-500 dark:bg-gray-700 flex items-center justify-center text-white mr-2">
            <User className="w-4 h-4" />
          </div>
          <div>
            <Paragraph className="text-sm font-medium text-gray-900 dark:text-white">Dr. John Doe</Paragraph>
            <Caption className="text-gray-500 dark:text-gray-400">Cardiologist</Caption>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 