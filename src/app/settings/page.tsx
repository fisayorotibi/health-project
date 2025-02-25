'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard?settings=open');
  }, [router]);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-dark-background">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-gray-700 dark:text-gray-300 text-2xl font-bold">L</span>
        </div>
        <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Redirecting to Dashboard...</h1>
      </div>
    </div>
  );
} 