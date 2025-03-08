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
import AddPatientModal from '@/components/patients/AddPatientModal';
import { Patient } from '@/types';

// Dynamically import components that use browser APIs with no SSR
const DashboardLayout = dynamic(() => import('@/components/layout/DashboardLayout'), {
  ssr: false
});

const DashboardBanner = dynamic(() => import('@/components/ui/DashboardBanner'), { ssr: false });

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(true);
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'all'>('today');
  const [isAddPatientModalOpen, setAddPatientModalOpen] = useState(false);

  useEffect(() => {
    // No need to set isMounted here since it's already true
  }, []);

  // Sample data for dashboard
  const stats = [
    {
      title: 'Active Patients',
      value: '1,248',
      icon: <Users className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
      change: '12% increase',
      positive: true,
      description: 'Registered patients under care'
    },
    {
      title: 'Today\'s Schedule',
      value: '24',
      icon: <Calendar className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
      change: '4 unconfirmed',
      positive: true,
      description: 'Appointments today'
    },
    {
      title: 'Pending Results',
      value: '7',
      icon: <FileText className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
      change: '2 urgent',
      positive: false,
      description: 'Results awaiting review'
    },
    {
      title: 'Active Prescriptions',
      value: '56',
      icon: <Pill className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
      change: '8 renewals due',
      positive: true,
      description: 'Current medication orders'
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

  const handleSearch = (query: string) => {
    // Search functionality is now handled in the DashboardBanner component
  };

  const handleNewPatientClick = () => {
    setAddPatientModalOpen(true);
  };

  const handleAddPatient = (newPatientData: Partial<Patient>) => {
    // Logic to handle adding a new patient
    console.log('New patient data:', newPatientData);
    // Close the modal after adding the patient
    setAddPatientModalOpen(false);
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
        {/* Dashboard Banner */}
        <DashboardBanner 
          userName="Dr. Adeyemi"
          insights={clinicalInsights}
          onSearch={handleSearch}
        />

        {/* Combined Stats & Quick Actions Card */}
        <div className="bg-gray-100 dark:bg-dark-background border border-gray-200 dark:border-gray-900 rounded-lg overflow-hidden">
          <div className="p-5">
            {/* Stats Grid Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider">Key Metrics</Label>
                <div className="h-px bg-gray-100 dark:bg-gray-800 flex-grow mx-4"></div>
                <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center">
                  View Details <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
                    className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg group"
                  >
                    <div className="p-4">
                      {/* Header with icon and status */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
                  {stat.icon}
                </div>
                        
                        <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                          stat.positive 
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' 
                            : stat.change.includes('urgent')
                              ? 'bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}>
                          {stat.positive 
                            ? <TrendingUp className="w-3 h-3 mr-1.5 text-gray-500 dark:text-gray-400" /> 
                            : <AlertCircle className="w-3 h-3 mr-1.5 text-red-500 dark:text-red-400" />
                          }
                  {stat.change}
                        </div>
                      </div>
                      
                      {/* Main stat value */}
                      <div className="mb-1">
                        <LargeDataDisplay className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                          {stat.value}
                        </LargeDataDisplay>
                      </div>
                      
                      {/* Title and description */}
                      <div>
                        <Label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {stat.title}
                        </Label>
                        <SmallParagraph className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {stat.description}
                        </SmallParagraph>
                      </div>
                      
                      {/* Keeping the animated gradient bar */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200/0 via-gray-200/0 to-gray-200/0 group-hover:from-gray-300/30 group-hover:via-gray-400/40 group-hover:to-gray-300/0 dark:group-hover:from-gray-700/30 dark:group-hover:via-gray-600/40 dark:group-hover:to-gray-700/0 transition-all duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
        </div>

            {/* Quick Actions Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider">Quick Actions</Label>
                <div className="h-px bg-gray-100 dark:bg-gray-800 flex-grow mx-4"></div>
                <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center">
                  All Actions <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button className="relative flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg transition-colors group" onClick={handleNewPatientClick}>
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300">
                    <Plus className="w-4 h-4" />
                  </div>
                  <Label className="mt-2 text-gray-700 dark:text-gray-300">New Patient</Label>
                  <SmallParagraph className="text-xs text-gray-500 dark:text-gray-400">Create patient record</SmallParagraph>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200/0 via-gray-200/0 to-gray-200/0 group-hover:from-gray-300/30 group-hover:via-gray-400/40 group-hover:to-gray-300/0 dark:group-hover:from-gray-700/30 dark:group-hover:via-gray-600/40 dark:group-hover:to-gray-700/0 transition-all duration-300"></div>
                </button>
                <button className="relative flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <Label className="mt-2 text-gray-700 dark:text-gray-300">Schedule</Label>
                  <SmallParagraph className="text-xs text-gray-500 dark:text-gray-400">Book appointment</SmallParagraph>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200/0 via-gray-200/0 to-gray-200/0 group-hover:from-gray-300/30 group-hover:via-gray-400/40 group-hover:to-gray-300/0 dark:group-hover:from-gray-700/30 dark:group-hover:via-gray-600/40 dark:group-hover:to-gray-700/0 transition-all duration-300"></div>
                </button>
                <button className="relative flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300">
                    <FileText className="w-4 h-4" />
                  </div>
                  <Label className="mt-2 text-gray-700 dark:text-gray-300">New Record</Label>
                  <SmallParagraph className="text-xs text-gray-500 dark:text-gray-400">Document visit</SmallParagraph>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200/0 via-gray-200/0 to-gray-200/0 group-hover:from-gray-300/30 group-hover:via-gray-400/40 group-hover:to-gray-300/0 dark:group-hover:from-gray-700/30 dark:group-hover:via-gray-600/40 dark:group-hover:to-gray-700/0 transition-all duration-300"></div>
                </button>
                <button className="relative flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300">
                    <Pill className="w-4 h-4" />
                  </div>
                  <Label className="mt-2 text-gray-700 dark:text-gray-300">Prescribe</Label>
                  <SmallParagraph className="text-xs text-gray-500 dark:text-gray-400">Create prescription</SmallParagraph>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200/0 via-gray-200/0 to-gray-200/0 group-hover:from-gray-300/30 group-hover:via-gray-400/40 group-hover:to-gray-300/0 dark:group-hover:from-gray-700/30 dark:group-hover:via-gray-600/40 dark:group-hover:to-gray-700/0 transition-all duration-300"></div>
                </button>
              </div>
            </div>
              </div>
            </div>
            
        <div className="bg-gray-100 dark:bg-dark-background rounded-lg overflow-hidden border border-gray-200 dark:border-gray-900">
          <div className="px-5 py-4 bg-gray-100 dark:bg-dark-background border-b border-gray-100 dark:border-gray-800/50">
            <div className="flex items-center justify-between">
              <div>
                <Heading4 className="text-gray-800 dark:text-gray-200 mb-0.5">Today's Schedule</Heading4>
                <SmallParagraph className="text-gray-500 dark:text-gray-400">Manage your appointments for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</SmallParagraph>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setActiveTab('today')}
                  className={`text-xs px-3 py-1.5 rounded-md ${
                    activeTab === 'today' 
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } transition-colors`}
                >
                  Today
                </button>
                <button 
                  onClick={() => setActiveTab('week')}
                  className={`text-xs px-3 py-1.5 rounded-md ${
                    activeTab === 'week' 
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } transition-colors`}
                >
                  This Week
                </button>
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`text-xs px-3 py-1.5 rounded-md ${
                    activeTab === 'all' 
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } transition-colors`}
                >
                  All
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800/50">
            {/* Completed Appointments Section */}
            <div className="px-5 py-2 bg-gray-100 dark:bg-dark-background">
              <Label className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider">Completed appointments</Label>
            </div>
            
            {/* Checked In Patient - Now shown as completed */}
            <div className="p-0">
              <div className="p-4 hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
                      {recentPatients[0].name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-white dark:border-dark-surface">
                      <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"></div>
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[16px] leading-[1.5] font-medium text-gray-900 dark:text-white">{recentPatients[0].name}</p>
                      <div className="flex items-center">
                        <div className="text-[12px] leading-[1.5] font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                          Completed
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] leading-[1.5] text-gray-500 dark:text-gray-400">
                        {recentPatients[0].age} years • {recentPatients[0].reason}
                      </p>
                      <span className="text-[14px] leading-[1.5] text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> {recentPatients[0].time}
                      </span>
                    </div>
                    
                    {/* Related activity */}
                    <div className="mt-3 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                      <p className="text-[12px] leading-[1.5] text-gray-700 dark:text-gray-300">
                        <span className="font-medium">{recentActivities[0].action}</span> • {recentActivities[0].time}
                      </p>
                      <span className="text-[12px] leading-[1.5] text-gray-500 dark:text-gray-400">by Dr. John Doe</span>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="mt-3 flex space-x-2">
                      <button className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center">
                        <FileText className="w-3 h-3 mr-1" /> <span className="text-[12px] leading-[1.5] font-medium">View Record</span>
                      </button>
                      <button className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center">
                        <Calendar className="w-3 h-3 mr-1" /> <span className="text-[12px] leading-[1.5] font-medium">Schedule Follow-up</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming Appointments Section */}
            <div className="px-5 py-2 bg-gray-100 dark:bg-dark-background">
              <Label className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider">Upcoming appointments</Label>
            </div>
            
            {/* Waiting Patient */}
            <div className="p-4 hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
                    {recentPatients[1].name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-white dark:border-dark-surface">
                    <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"></div>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[16px] leading-[1.5] font-medium text-gray-900 dark:text-white">{recentPatients[1].name}</p>
                    <div className="flex items-center">
                      <div className="text-[12px] leading-[1.5] font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        {recentPatients[1].status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] leading-[1.5] text-gray-500 dark:text-gray-400">
                      {recentPatients[1].age} years • {recentPatients[1].reason}
                    </p>
                    <span className="text-[14px] leading-[1.5] text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {recentPatients[1].time}
                    </span>
                  </div>
                  
                  {/* Related activity */}
                  <div className="mt-3 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                    <p className="text-[12px] leading-[1.5] text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{recentActivities[1].action}</span> • {recentActivities[1].time}
                    </p>
                    <span className="text-[12px] leading-[1.5] text-gray-500 dark:text-gray-400">by {recentActivities[1].user}</span>
                  </div>
                  
                  {/* Quick actions */}
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center">
                      <FileText className="w-3 h-3 mr-1" /> <span className="text-[12px] leading-[1.5] font-medium">View Record</span>
                    </button>
                    <button className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> <span className="text-[12px] leading-[1.5] font-medium">Start Visit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scheduled Patient */}
            <div className="p-4 hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
                    {recentPatients[2].name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-white dark:border-dark-surface">
                    <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"></div>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[16px] leading-[1.5] font-medium text-gray-900 dark:text-white">{recentPatients[2].name}</p>
                    <div className="flex items-center">
                      <div className="text-[12px] leading-[1.5] font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        {recentPatients[2].status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] leading-[1.5] text-gray-500 dark:text-gray-400">
                      {recentPatients[2].age} years • {recentPatients[2].reason}
                    </p>
                    <span className="text-[14px] leading-[1.5] text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {recentPatients[2].time}
                    </span>
                  </div>
                  
                  {/* Related activity */}
                  <div className="mt-3 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                    <p className="text-[12px] leading-[1.5] text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{recentActivities[2].action}</span> • {recentActivities[2].time}
                    </p>
                    <span className="text-[12px] leading-[1.5] text-gray-500 dark:text-gray-400">by {recentActivities[2].user}</span>
                  </div>
                  
                  {/* Quick actions */}
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center">
                      <FileText className="w-3 h-3 mr-1" /> <span className="text-[12px] leading-[1.5] font-medium">View Record</span>
                    </button>
                    <button className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> <span className="text-[12px] leading-[1.5] font-medium">Reschedule</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* More Scheduled Patients */}
            <div className="p-4 hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
                    {recentPatients[3].name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-white dark:border-dark-surface">
                    <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"></div>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[16px] leading-[1.5] font-medium text-gray-900 dark:text-white">{recentPatients[3].name}</p>
                    <div className="flex items-center">
                      <div className="text-[12px] leading-[1.5] font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        {recentPatients[3].status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] leading-[1.5] text-gray-500 dark:text-gray-400">
                      {recentPatients[3].age} years • {recentPatients[3].reason}
                    </p>
                    <span className="text-[14px] leading-[1.5] text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {recentPatients[3].time}
                    </span>
                  </div>
                  
                  {/* Related activity */}
                  <div className="mt-3 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                    <p className="text-[12px] leading-[1.5] text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{recentActivities[3].action}</span> • {recentActivities[3].time}
                    </p>
                    <span className="text-[12px] leading-[1.5] text-gray-500 dark:text-gray-400">by {recentActivities[3].user}</span>
                  </div>
                  
                  {/* Quick actions */}
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center">
                      <FileText className="w-3 h-3 mr-1" /> <span className="text-[12px] leading-[1.5] font-medium">View Record</span>
                    </button>
                    <button className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> <span className="text-[12px] leading-[1.5] font-medium">Confirm</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* View more button */}
            <div className="p-4 flex justify-center">
              <button className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center">
                View more activities <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* This Week Section - Only show when not on Today tab */}
        {activeTab !== 'today' && (
          <div className="bg-gray-100 dark:bg-dark-background rounded-lg overflow-hidden border border-gray-200 dark:border-gray-900 mt-6">
            <div className="px-5 py-4 bg-gray-100 dark:bg-dark-background border-b border-gray-100 dark:border-gray-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <Heading4 className="text-gray-800 dark:text-gray-200 mb-0.5">Upcoming Schedule</Heading4>
                  <SmallParagraph className="text-gray-500 dark:text-gray-400">View your appointments for the week ahead</SmallParagraph>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800/50">
              {/* Other Patient - Moved from Yesterday */}
              <div className="p-4 hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
                    {recentPatients[4].name.charAt(0)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <Paragraph className="text-[16px] leading-[1.5] font-medium text-gray-900 dark:text-white">{recentPatients[4].name}</Paragraph>
                      <Caption className="text-gray-500 dark:text-gray-400">Yesterday</Caption>
                    </div>
                    <SmallParagraph className="text-gray-500 dark:text-gray-400">
                      {recentPatients[4].age} years • Last visit: Hypertension follow-up
                    </SmallParagraph>
                    
                    {/* Expandable section indicator */}
                    <button className="mt-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center">
                      View patient history <ChevronRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* View more button */}
              <div className="p-4 flex justify-center">
                <button className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center">
                  View more weekly activities <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isAddPatientModalOpen && <AddPatientModal isOpen={isAddPatientModalOpen} onClose={() => setAddPatientModalOpen(false)} onAddPatient={handleAddPatient} />}
    </DashboardLayout>
  );
} 