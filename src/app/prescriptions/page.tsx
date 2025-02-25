'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Heading1, Paragraph } from '@/components/ui/typography';

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

  const prescriptionFeatures = [
    "E-prescribing with direct pharmacy integration",
    "Medication history and adherence tracking",
    "Drug interaction and allergy checking",
    "Dosage calculators and medication schedules",
    "Prescription renewal workflow with patient request handling"
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Heading1>Prescription Management</Heading1>
            <Paragraph className="text-gray-600 dark:text-gray-400 mt-1">
              Streamlined medication prescribing and tracking
            </Paragraph>
          </div>
        </div>
        
        <ComingSoon 
          title="Smart Prescription System Coming Soon" 
          description="Our advanced prescription management system is in final development. You'll soon have powerful tools to safely prescribe, track, and manage medications with built-in safety features and pharmacy integration."
          featureList={prescriptionFeatures}
          ctaText="Return to Dashboard"
        />
      </div>
    </DashboardLayout>
  );
} 