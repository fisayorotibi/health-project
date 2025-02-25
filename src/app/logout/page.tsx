'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading1, Paragraph } from '@/components/ui/typography';

export default function LogoutPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Simulate logout process
    const performLogout = async () => {
      // This is a placeholder for actual logout logic
      // In a real implementation, you would call your logout API here
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to auth page
      router.push('/auth');
    };
    
    performLogout();
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