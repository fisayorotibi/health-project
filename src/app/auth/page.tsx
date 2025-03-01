'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heading1, Heading4, Paragraph, SmallParagraph } from '@/components/ui/typography';
import { LoginForm } from '../../components/auth/LoginForm';
import { SignupForm } from '../../components/auth/SignupForm';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-700 dark:text-gray-300 text-2xl font-bold">L</span>
          </div>
          <Heading1 className="mt-4 text-gray-900 dark:text-white">Lavender Health Records</Heading1>
          <Paragraph className="mt-2 text-gray-500 dark:text-gray-400">Loading...</Paragraph>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-white dark:bg-gray-900">
      {/* Left side - Branding and information */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-500/5 dark:bg-gray-800/10"></div>
        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          <div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center mr-3">
                <span className="text-white text-xl font-bold">L</span>
              </div>
              <div>
                <span className="text-gray-900 dark:text-gray-100 text-base font-semibold tracking-tight" style={{ fontFamily: 'Funnel Display' }}>lavender</span>
                <span className="ml-1 text-xs text-gray-700 dark:text-gray-300 uppercase tracking-wider font-medium">Health</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 max-w-md">
            <Heading1 className="text-gray-900 dark:text-gray-50">Secure Health Records for Nigerian Healthcare</Heading1>
            <Paragraph className="text-gray-800 dark:text-gray-200">
              Lavender provides a secure, reliable platform for managing patient records, prescriptions, and medical data - even when offline.
            </Paragraph>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <Heading4 className="text-gray-900 dark:text-gray-100">Secure & Compliant</Heading4>
                  <SmallParagraph className="text-gray-700 dark:text-gray-300">End-to-end encryption for all patient data</SmallParagraph>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <Heading4 className="text-gray-900 dark:text-gray-100">Works Offline</Heading4>
                  <SmallParagraph className="text-gray-700 dark:text-gray-300">Continue working during internet outages</SmallParagraph>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <Heading4 className="text-gray-900 dark:text-gray-100">Complete Solution</Heading4>
                  <SmallParagraph className="text-gray-700 dark:text-gray-300">Manage records, prescriptions, and appointments</SmallParagraph>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8">
            <SmallParagraph className="text-gray-700 dark:text-gray-300">
              © {new Date().getFullYear()} Lavender Health. All rights reserved.
            </SmallParagraph>
          </div>
        </div>
      </div>
      
      {/* Right side - Authentication forms */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 overflow-y-auto max-h-screen">
        <div className="w-full max-w-md my-4">
          {/* Mobile logo */}
          <div className="flex md:hidden items-center justify-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center mr-3">
              <span className="text-white text-xl font-bold">L</span>
            </div>
            <div>
              <span className="text-gray-900 dark:text-white text-base font-semibold tracking-tight" style={{ fontFamily: 'Funnel Display' }}>lavender</span>
              <span className="ml-1 text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium">Health</span>
            </div>
          </div>
          
          {/* Tab navigation */}
          <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-800 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`pb-3 px-2 text-sm font-medium ${
                activeTab === 'login'
                  ? 'text-gray-700 dark:text-gray-300 border-b-2 border-gray-700 dark:border-gray-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`pb-3 px-2 text-sm font-medium ${
                activeTab === 'signup'
                  ? 'text-gray-700 dark:text-gray-300 border-b-2 border-gray-700 dark:border-gray-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Create Account
            </button>
          </div>
          
          {/* Form container */}
          <div className="transition-all duration-300">
            {activeTab === 'login' ? (
              <LoginForm />
            ) : (
              <SignupForm onComplete={() => setActiveTab('login')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 