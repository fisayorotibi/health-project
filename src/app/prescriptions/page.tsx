'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Heading1 } from '@/components/ui/typography';

// Dynamically import components that use browser APIs
const DashboardLayout = dynamic(() => import('@/components/layout/DashboardLayout'), { ssr: false });
const ComingSoon = dynamic(() => import('@/components/ui/ComingSoon'), { ssr: false });

export default function PrescriptionsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <Heading1>Prescriptions</Heading1>
        </div>
        
        <ComingSoon 
          title="Prescription Management Coming Soon" 
          description="Our advanced prescription management system is under development. Soon you'll be able to create, track, and manage patient prescriptions with ease."
        />
      </div>
    </DashboardLayout>
  );
} 