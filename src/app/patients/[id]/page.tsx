'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  Paragraph, 
  SmallParagraph 
} from '@/components/ui/typography';
import { 
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Activity,
  Heart,
  Droplets,
  Weight,
  Ruler,
  AlertCircle,
  FileText,
  Pill,
  Clock,
  ChevronLeft,
  MoreVertical,
  Edit3,
  Trash2,
  Share2,
  Download,
  Plus,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  CalendarClock
} from 'lucide-react';
import { Patient, MedicalRecord, Prescription } from '@/types';

// Dynamically import components that use browser APIs
const DashboardLayout = dynamic(() => import('@/components/layout/DashboardLayout'), { ssr: false });

// Mock data (replace with API calls)
const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-05-15',
    gender: 'male' as const,
    phoneNumber: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, CA 94321',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-02-20T14:45:00Z',
  },
  // ... other patients
];

const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: 'dr-1',
    date: '2024-03-01T09:30:00Z',
    diagnosis: 'Upper Respiratory Infection',
    symptoms: ['Fever', 'Cough', 'Sore throat'],
    notes: 'Patient presents with symptoms of URI. Prescribed antibiotics and rest.',
    followUpDate: '2024-03-08T09:30:00Z',
    createdAt: '2024-03-01T09:30:00Z',
    updatedAt: '2024-03-01T09:30:00Z'
  },
  {
    id: '2',
    patientId: '1',
    doctorId: 'dr-1',
    date: '2024-02-15T14:00:00Z',
    diagnosis: 'Annual Physical Examination',
    symptoms: [],
    notes: 'Routine checkup. All vitals normal. Recommended lifestyle changes discussed.',
    createdAt: '2024-02-15T14:00:00Z',
    updatedAt: '2024-02-15T14:00:00Z'
  }
];

const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: 'dr-1',
    date: '2024-03-01T09:30:00Z',
    medications: [
      {
        id: 'med-1',
        prescriptionId: '1',
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Every 8 hours',
        duration: '7 days',
        instructions: 'Take with food',
        createdAt: '2024-03-01T09:30:00Z',
        updatedAt: '2024-03-01T09:30:00Z'
      }
    ],
    notes: 'Complete full course of antibiotics',
    createdAt: '2024-03-01T09:30:00Z',
    updatedAt: '2024-03-01T09:30:00Z'
  }
];

// Timeline item component
const TimelineItem = ({ 
  date, 
  title, 
  description, 
  type, 
  status 
}: { 
  date: string; 
  title: string; 
  description: string; 
  type: 'record' | 'prescription' | 'appointment'; 
  status?: 'completed' | 'scheduled' | 'cancelled';
}) => {
  const getIcon = () => {
    switch (type) {
      case 'record':
        return <FileText className="h-4 w-4" />;
      case 'prescription':
        return <Pill className="h-4 w-4" />;
      case 'appointment':
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-3 w-3 text-green-500" />;
      case 'scheduled':
        return <Clock className="h-3 w-3 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative pb-8">
      <div className="relative flex items-start space-x-3">
        <div className="relative">
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ring-8 ring-white dark:ring-gray-900">
            {getIcon()}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-900 dark:text-white">
                {title}
              </div>
              <div className="flex items-center space-x-2">
                {status && (
                  <span className="inline-flex items-center space-x-1">
                    {getStatusIcon()}
                    <span className="text-xs capitalize text-gray-500 dark:text-gray-400">
                      {status}
                    </span>
                  </span>
                )}
                <time className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(date).toLocaleDateString()}
                </time>
              </div>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Vital sign card component
const VitalSignCard = ({ 
  icon, 
  label, 
  value, 
  unit, 
  trend 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number; 
  unit: string;
  trend?: 'up' | 'down' | 'stable';
}) => (
  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface">
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </p>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              {value}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {unit}
            </span>
          </div>
        </div>
      </div>
      {trend && (
        <div className={`
          flex items-center space-x-1 text-sm font-medium
          ${trend === 'up' ? 'text-red-600 dark:text-red-400' : 
            trend === 'down' ? 'text-green-600 dark:text-green-400' : 
            'text-gray-600 dark:text-gray-400'}
        `}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          <span className="sr-only">
            {trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : 'Stable'}
          </span>
        </div>
      )}
    </div>
  </div>
);

// Quick action button component
const QuickActionButton = ({ 
  icon, 
  label, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
  >
    <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
      {icon}
    </div>
    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
      {label}
    </span>
  </button>
);

// Main page component
export default function PatientDetailPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'prescriptions'>('overview');

  // Calculate age
  const age = useMemo(() => {
    if (!patient) return null;
    
    const birthDate = new Date(patient.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }, [patient?.dateOfBirth]);

  // Fetch patient data
  useEffect(() => {
    setIsMounted(true);
    
    // Simulate API call with mock data
    const timer = setTimeout(() => {
      const foundPatient = MOCK_PATIENTS.find(p => p.id === id);
      setPatient(foundPatient || null);
      setMedicalRecords(MOCK_MEDICAL_RECORDS.filter(r => r.patientId === id));
      setPrescriptions(MOCK_PRESCRIPTIONS.filter(p => p.patientId === id));
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Handle edit patient
  const handleEditPatient = () => {
    router.push(`/patients/${id}/edit`);
  };

  // Handle delete patient
  const handleDeletePatient = () => {
    // Add confirmation dialog and API call
    router.push('/patients');
  };

  // Handle add record
  const handleAddRecord = () => {
    router.push(`/medical-records/new?patientId=${id}`);
  };

  // Handle add prescription
  const handleAddPrescription = () => {
    router.push(`/prescriptions/new?patientId=${id}`);
  };

  // Handle schedule appointment
  const handleScheduleAppointment = () => {
    router.push(`/schedule/new?patientId=${id}`);
  };

  // Prevent hydration errors
  if (!isMounted) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Not found state
  if (!patient) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <AlertTriangle className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <Heading2>Patient Not Found</Heading2>
          <Paragraph className="mt-2 text-gray-600 dark:text-gray-400">
            The patient you're looking for doesn't exist or you don't have access.
          </Paragraph>
          <div className="mt-6">
            <button
              onClick={() => router.push('/patients')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
            >
              <ChevronLeft className="h-4 w-4 mr-1.5" />
              Back to Patients
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/patients')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
            <div>
              <Heading1>
                {patient.firstName} {patient.lastName}
              </Heading1>
              <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  {age} years ({new Date(patient.dateOfBirth).toLocaleDateString()})
                </span>
                <span className="mx-2">•</span>
                <span className="capitalize">{patient.gender}</span>
                {patient.bloodType && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Blood Type: {patient.bloodType}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEditPatient}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400"
            >
              <Edit3 className="h-4 w-4 mr-1.5" />
              Edit
            </button>
            <div className="relative">
              <button
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              {/* Dropdown menu would go here */}
            </div>
          </div>
        </div>
        
        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface">
          <QuickActionButton
            icon={<FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
            label="Add Record"
            onClick={handleAddRecord}
          />
          <QuickActionButton
            icon={<Pill className="h-5 w-5 text-green-600 dark:text-green-400" />}
            label="New Prescription"
            onClick={handleAddPrescription}
          />
          <QuickActionButton
            icon={<CalendarClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            label="Schedule"
            onClick={handleScheduleAppointment}
          />
          <QuickActionButton
            icon={<Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
            label="Share"
            onClick={() => {/* Add share functionality */}}
          />
        </div>
        
        {/* Contact information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <Phone className="h-4 w-4 mr-2" />
              Phone
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {patient.phoneNumber}
            </p>
          </div>
          
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {patient.email || 'Not provided'}
            </p>
          </div>
          
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <MapPin className="h-4 w-4 mr-2" />
              Address
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {patient.address}
            </p>
          </div>
        </div>
        
        {/* Allergies warning */}
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/20">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-500">
                  Allergies
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {patient.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Vital signs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Heading3>Vital Signs</Heading3>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
              View History
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <VitalSignCard
              icon={<Heart className="h-5 w-5 text-rose-500" />}
              label="Heart Rate"
              value="72"
              unit="bpm"
              trend="stable"
            />
            <VitalSignCard
              icon={<Activity className="h-5 w-5 text-indigo-500" />}
              label="Blood Pressure"
              value="120/80"
              unit="mmHg"
              trend="up"
            />
            <VitalSignCard
              icon={<Weight className="h-5 w-5 text-green-500" />}
              label="Weight"
              value="70"
              unit="kg"
              trend="down"
            />
          </div>
        </div>
        
        {/* Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Heading3>Recent Activity</Heading3>
            <div className="flex space-x-1">
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === 'overview'
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === 'records'
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('records')}
              >
                Records
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === 'prescriptions'
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('prescriptions')}
              >
                Prescriptions
              </button>
            </div>
          </div>
          
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface">
            <div className="flow-root">
              <ul className="-mb-8">
                {[...medicalRecords, ...prescriptions]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map((item, index) => {
                    const isMedicalRecord = 'diagnosis' in item;
                    return (
                      <li key={item.id}>
                        <TimelineItem
                          date={item.date}
                          title={isMedicalRecord 
                            ? (item as MedicalRecord).diagnosis 
                            : `Prescription - ${(item as Prescription).medications[0]?.name}`
                          }
                          description={isMedicalRecord
                            ? (item as MedicalRecord).notes
                            : (item as Prescription).notes || ''
                          }
                          type={isMedicalRecord ? 'record' : 'prescription'}
                          status={isMedicalRecord ? 'completed' : undefined}
                        />
                      </li>
                    );
                  })}
              </ul>
            </div>
            
            <div className="mt-6 text-center">
              <button className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                View full history
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 