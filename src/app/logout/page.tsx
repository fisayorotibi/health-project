'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading1, Paragraph } from '@/components/ui/typography';

export default function LogoutPage() {
  const [isMounted, setIsMounted] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // No need to set isMounted here since it's already true
    
    // Simulate logout process
    const timer = setTimeout(() => {
      router.push('/auth');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [router]);

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-dark-background">
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-dark-background">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-gray-700 dark:text-gray-300 text-2xl font-bold">L</span>
        </div>
        <Heading1 className="mt-4 text-gray-900 dark:text-white">Signing out...</Heading1>
        <Paragraph className="mt-2 text-gray-500 dark:text-gray-400">
          Thank you for using Lavender Health Records
        </Paragraph>
      </div>
    </div>
  );
} 