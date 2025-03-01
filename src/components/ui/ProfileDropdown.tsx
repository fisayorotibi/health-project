import React from 'react';
import { User, Calendar, MessageSquare, FileText, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';

interface ProfileDropdownProps {
  isOpen: boolean;
  toggleProfile: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, toggleProfile }) => {
  return (
    <div
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
              <User className="h-7 w-7 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-gray-900 dark:text-white">Dr. Sarah Chen</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">Cardiologist</p>
          </div>
        </div>
      </div>

      {/* Quick actions - simplified and elegant */}
      <div className="px-5 py-4">
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-3 tracking-wider">QUICK ACCESS</p>
        <div className="grid grid-cols-3 gap-3">
          <Link href="/schedule" className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-150" onClick={toggleProfile}>
            <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1.5">
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Schedule</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-150" onClick={toggleProfile}>
            <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1.5">
              <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Messages</span>
          </Link>
          <Link href="/patients" className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-150" onClick={toggleProfile}>
            <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1.5">
              <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Patients</span>
          </Link>
        </div>
      </div>

      {/* Menu items - simplified */}
      <div className="px-2 py-2" role="none">
        <Link href="/profile" className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-150" role="menuitem" onClick={toggleProfile}>
          <User className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          Your Profile
        </Link>
        <Link href="/help" className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-150" role="menuitem" onClick={toggleProfile}>
          <HelpCircle className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          Help & Support
        </Link>
        <Link href="/logout" className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-150" role="menuitem" onClick={toggleProfile}>
          <LogOut className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          Sign out
        </Link>
      </div>
    </div>
  );
};

export default ProfileDropdown; 