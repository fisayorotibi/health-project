'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Heading1, Paragraph } from '@/components/ui/typography';

// Dynamically import components that use browser APIs
const DashboardLayout = dynamic(() => import('@/components/layout/DashboardLayout'), { ssr: false });
const ComingSoon = dynamic(() => import('@/components/ui/ComingSoon'), { ssr: false });

export default function MedicalRecordsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return null;
  }

  const recordFeatures = [
    "Structured clinical documentation with customizable templates",
    "Chronological health history with searchable entries",
    "Lab results integration with trend analysis and abnormal value highlighting",
    "Diagnostic imaging reports with secure image viewing",
    "Allergy and medication interaction alerts"
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Heading1>Medical Records</Heading1>
            <Paragraph className="text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive electronic health records system
            </Paragraph>
          </div>
        </div>
        
        <ComingSoon 
          title="Advanced EHR System Coming Soon" 
          description="Our secure and comprehensive electronic health records system is in final testing. You'll soon have powerful tools to document, track, and analyze patient health information with unprecedented efficiency."
          featureList={recordFeatures}
          ctaText="Return to Dashboard"
        />
      </div>
    </DashboardLayout>
  );
} 