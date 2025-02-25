'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Users, 
  Calendar, 
  FileText, 
  Pill, 
  TrendingUp, 
  Clock,
  AlertCircle,
  ChevronRight,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import {
  Heading1,
  Heading4,
  Paragraph,
  SmallParagraph,
  Label,
  Caption,
  LargeDataDisplay
} from '@/components/ui/typography';

// Dynamically import components that use browser APIs with no SSR
const DashboardLayout = dynamic(() => import('@/components/layout/DashboardLayout'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-dark-background">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-gray-700 dark:text-gray-300 text-2xl font-bold">L</span>
        </div>
        <Heading1 className="mt-4 text-gray-900 dark:text-white">Lavender Health Records</Heading1>
        <Paragraph className="mt-2 text-gray-500 dark:text-gray-400">Loading dashboard...</Paragraph>
      </div>
    </div>
  )
});

const DashboardBanner = dynamic(() => import('@/components/ui/DashboardBanner'), { ssr: false });

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sample data for dashboard
  const stats = [
    {
      title: 'Active Patients',
      value: '1,248',
      icon: <Users className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
      change: '+12% from last month',
      positive: true,
      description: 'Total registered patients in your care'
    },
    {
      title: 'Today\'s Schedule',
      value: '24',
      icon: <Calendar className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
      change: '4 pending confirmations',
      positive: true,
      description: 'Appointments scheduled for today'
    },
    {
      title: 'Pending Results',
      value: '7',
      icon: <FileText className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
      change: '2 marked urgent',
      positive: false,
      description: 'Lab results awaiting review'
    },
    {
      title: 'Active Prescriptions',
      value: '56',
      icon: <Pill className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
      change: '8 renewals needed',
      positive: true,
      description: 'Current active medication orders'
    },
  ];

  // Sample recent patients
  const recentPatients = [
    {
      id: '1',
      name: 'Aisha Mohammed',
      age: 34,
      reason: 'Follow-up consultation',
      time: '09:00 AM',
      status: 'Checked In',
    },
    {
      id: '2',
      name: 'Emmanuel Okonkwo',
      age: 45,
      reason: 'Chest pain',
      time: '09:30 AM',
      status: 'Waiting',
    },
    {
      id: '3',
      name: 'Ngozi Eze',
      age: 28,
      reason: 'Prenatal checkup',
      time: '10:00 AM',
      status: 'Scheduled',
    },
    {
      id: '4',
      name: 'Oluwaseun Adeyemi',
      age: 52,
      reason: 'Diabetes management',
      time: '10:30 AM',
      status: 'Scheduled',
    },
    {
      id: '5',
      name: 'Chinedu Obi',
      age: 41,
      reason: 'Hypertension follow-up',
      time: '11:00 AM',
      status: 'Scheduled',
    },
  ];

  // Sample recent activities
  const recentActivities = [
    {
      id: '1',
      action: 'Updated medical record',
      patient: 'Aisha Mohammed',
      time: '15 minutes ago',
      user: 'Dr. John Doe',
    },
    {
      id: '2',
      action: 'Created new prescription',
      patient: 'Emmanuel Okonkwo',
      time: '45 minutes ago',
      user: 'Dr. John Doe',
    },
    {
      id: '3',
      action: 'Added lab results',
      patient: 'Ngozi Eze',
      time: '1 hour ago',
      user: 'Lab Technician',
    },
    {
      id: '4',
      action: 'Scheduled appointment',
      patient: 'Oluwaseun Adeyemi',
      time: '2 hours ago',
      user: 'Receptionist',
    },
  ];

  // Sample clinical insights for the banner
  const clinicalInsights = [
    {
      id: '1',
      text: '2 lab results marked urgent need review',
      priority: 'urgent' as const,
      link: '/medical-records'
    },
    {
      id: '2',
      text: '8 prescriptions need renewal this week',
      priority: 'high' as const,
      link: '/prescriptions'
    },
    {
      id: '3',
      text: 'Patient Aisha Mohammed has an upcoming appointment',
      priority: 'normal' as const,
      link: '/schedule'
    }
  ];

  // Handle search from banner
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement actual search functionality here
  };

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-dark-background">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-700 dark:text-gray-300 text-2xl font-bold">L</span>
          </div>
          <Heading1 className="mt-4 text-gray-900 dark:text-white">Lavender Health Records</Heading1>
          <Paragraph className="mt-2 text-gray-500 dark:text-gray-400">Loading dashboard...</Paragraph>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Heading1 className="text-gray-900 dark:text-white">Dashboard</Heading1>
        </div>

        {/* Dashboard Banner */}
        <DashboardBanner 
          userName="Dr. Adeyemi"
          insights={clinicalInsights}
          onSearch={handleSearch}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-5 transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-md bg-gray-50 dark:bg-dark-surface-secondary">
                  {stat.icon}
                </div>
                <Caption 
                  className={`flex items-center ${
                    stat.positive ? 'text-gray-700 dark:text-gray-300' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {stat.positive ? <TrendingUp className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                  {stat.change}
                </Caption>
              </div>
              <LargeDataDisplay className="mt-4 text-gray-900 dark:text-white">{stat.value}</LargeDataDisplay>
              <Label className="mt-1 text-gray-500 dark:text-gray-400">{stat.title}</Label>
              <SmallParagraph className="mt-1 text-gray-500 dark:text-gray-400 text-xs">{stat.description}</SmallParagraph>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Recent Activities & Quick Actions */}
          <div className="space-y-5">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 dark:border-dark-border">
                <Heading4 className="text-gray-900 dark:text-white">Quick Actions</Heading4>
                <SmallParagraph className="text-gray-500 dark:text-gray-400">Frequently used workflows</SmallParagraph>
              </div>
              <div className="p-5 grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-dark-surface-secondary rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface-tertiary transition-colors">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Plus className="w-4 h-4" />
                  </div>
                  <Label className="mt-2 text-gray-700 dark:text-gray-300">Register Patient</Label>
                  <SmallParagraph className="text-xs text-gray-500 dark:text-gray-400">Add new patient record</SmallParagraph>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-dark-surface-secondary rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface-tertiary transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <Label className="mt-2 text-gray-700 dark:text-gray-300">Schedule Visit</Label>
                  <SmallParagraph className="text-xs text-gray-500 dark:text-gray-400">Book new appointment</SmallParagraph>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-dark-surface-secondary rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface-tertiary transition-colors">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <Label className="mt-2 text-gray-700 dark:text-gray-300">Create Record</Label>
                  <SmallParagraph className="text-xs text-gray-500 dark:text-gray-400">Document patient visit</SmallParagraph>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-dark-surface-secondary rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface-tertiary transition-colors">
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Pill className="w-4 h-4" />
                  </div>
                  <Label className="mt-2 text-gray-700 dark:text-gray-300">Prescribe</Label>
                  <SmallParagraph className="text-xs text-gray-500 dark:text-gray-400">Create new prescription</SmallParagraph>
                </button>
              </div>
            </div>
            
            {/* Recent Activities */}
            <div className="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 dark:border-dark-border">
                <Heading4 className="text-gray-900 dark:text-white">Recent Activities</Heading4>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-dark-border">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-surface-secondary/50 transition-colors">
                    <Paragraph className="font-medium text-gray-900 dark:text-white">{activity.action}</Paragraph>
                    <SmallParagraph className="text-gray-500 dark:text-gray-400">
                      {activity.patient} • {activity.time}
                    </SmallParagraph>
                    <Caption className="mt-1 text-gray-500 dark:text-gray-400">by {activity.user}</Caption>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="lg:col-span-2 bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-dark-border">
              <Heading4 className="text-gray-900 dark:text-white">Recent Patients</Heading4>
              <button className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 text-sm font-medium flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-dark-border">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="p-5 hover:bg-gray-50 dark:hover:bg-dark-surface-secondary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
                        {patient.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <Paragraph className="font-medium text-gray-900 dark:text-white">{patient.name}</Paragraph>
                        <SmallParagraph className="text-gray-500 dark:text-gray-400">
                          {patient.age} years • {patient.reason}
                        </SmallParagraph>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                        patient.status === 'Checked In' 
                          ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300' 
                          : patient.status === 'Waiting' 
                          ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {patient.status}
                      </div>
                      <Caption className="mt-1 text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> {patient.time}
                      </Caption>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 