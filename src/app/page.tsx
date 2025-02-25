'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading1, Paragraph } from '@/components/ui/typography';

export default function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Redirect to dashboard
    router.push('/dashboard');
  }, [router]);

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">L</span>
          </div>
          <Heading1 className="mt-4">Lavender Health Records</Heading1>
          <Paragraph className="mt-2 text-gray-500">Loading...</Paragraph>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-2xl font-bold">L</span>
        </div>
        <Heading1 className="mt-4">Lavender Health Records</Heading1>
        <Paragraph className="mt-2 text-gray-500">Redirecting to dashboard...</Paragraph>
      </div>
    </div>
  );
}
