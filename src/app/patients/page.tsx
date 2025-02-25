'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Heading1, Paragraph } from '@/components/ui/typography';

// Dynamically import components that use browser APIs
const DashboardLayout = dynamic(() => import('@/components/layout/DashboardLayout'), { ssr: false });
const ComingSoon = dynamic(() => import('@/components/ui/ComingSoon'), { ssr: false });

export default function PatientsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return null;
  }

  const patientFeatures = [
    "Comprehensive patient profiles with demographic and contact information",
    "Medical history timelines with visual indicators for critical events",
    "Secure document upload for patient identification and insurance",
    "Custom fields for practice-specific patient information",
    "Patient portal integration for self-service updates"
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Heading1>Patient Management</Heading1>
            <Paragraph className="text-gray-600 dark:text-gray-400 mt-1">
              Centralized patient information management system
            </Paragraph>
          </div>
        </div>
        
        <ComingSoon 
          title="Patient Management Coming Soon" 
          description="Our comprehensive patient management system is in final development. You'll soon have powerful tools to organize, track, and manage all your patient information in one secure place."
          featureList={patientFeatures}
          ctaText="Explore Dashboard"
        />
      </div>
    </DashboardLayout>
  );
} 