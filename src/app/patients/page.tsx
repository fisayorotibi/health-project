'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Heading1, 
  Paragraph, 
  Heading3, 
  SmallParagraph 
} from '@/components/ui/typography';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  AlertCircle,
  FileText,
  Pill,
  ChevronRight,
  X,
  Check,
  Clock,
  ArrowUpDown
} from 'lucide-react';
import { Patient } from '@/types';

// Dynamically import components that use browser APIs
const DashboardLayout = dynamic(() => import('@/components/layout/DashboardLayout'), { ssr: false });
const AddPatientModal = dynamic(() => import('@/components/patients/AddPatientModal'), { ssr: false });

// Mock data for patients
const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-05-15',
    gender: 'male',
    phoneNumber: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, CA 90210',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Peanuts'],
    lastVisit: '2023-05-10T09:30:00Z',
    status: 'active',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-05-10T09:30:00Z',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: '1990-08-20',
    gender: 'female',
    phoneNumber: '+1 (555) 987-6543',
    email: 'jane.smith@example.com',
    address: '456 Oak Ave, Somewhere, NY 10001',
    bloodType: 'O-',
    allergies: [],
    lastVisit: '2023-06-02T14:15:00Z',
    status: 'active',
    createdAt: '2023-02-20T11:30:00Z',
    updatedAt: '2023-06-02T14:15:00Z',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    dateOfBirth: '1978-11-30',
    gender: 'male',
    phoneNumber: '+1 (555) 876-5432',
    email: 'michael.brown@example.com',
    address: '654 Maple Dr, Somewhere Else, WA 98001',
    bloodType: 'O-',
    allergies: ['Ibuprofen'],
    lastVisit: '2023-04-18T11:00:00Z',
    status: 'inactive',
    createdAt: '2023-02-10T14:30:00Z',
    updatedAt: '2023-03-05T09:55:00Z',
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Williams',
    dateOfBirth: '1995-03-12',
    gender: 'female',
    phoneNumber: '+1 (555) 234-5678',
    email: 'emily.williams@example.com',
    address: '321 Cedar Ln, Nowhere, FL 33101',
    bloodType: 'AB+',
    allergies: ['Latex', 'Shellfish'],
    createdAt: '2023-02-05T11:20:00Z',
    updatedAt: '2023-03-01T13:10:00Z',
  },
  {
    id: '5',
    firstName: 'Robert',
    lastName: 'Johnson',
    dateOfBirth: '1978-11-30',
    gender: 'male',
    phoneNumber: '+1 (555) 456-7890',
    email: 'robert.johnson@example.com',
    address: '789 Pine Rd, Elsewhere, TX 75001',
    bloodType: 'B+',
    allergies: [],
    createdAt: '2023-02-01T09:45:00Z',
    updatedAt: '2023-02-28T16:20:00Z',
  },
];

// Patient card component
const PatientCard = ({ patient }: { patient: Patient }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  const navigateToPatientDetail = () => {
    router.push(`/patients/${patient.id}`);
  };
  
  const age = useMemo(() => {
    const birthDate = new Date(patient.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }, [patient.dateOfBirth]);

  // Calculate last visit days ago
  const lastVisitDaysAgo = useMemo(() => {
    if (!patient.lastVisit) return null;
    const lastVisit = new Date(patient.lastVisit);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastVisit.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [patient.lastVisit]);
  
  // Get initials for avatar
  const getInitials = () => {
    return `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;
  };

  // Get blood type badge color - using more subtle colors
  const getBloodTypeColor = () => {
    return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
  };
  
  return (
    <div 
      className={
        `relative p-5 rounded-xl border border-gray-200 dark:border-gray-800 
        bg-gray-50 dark:bg-gray-900 transition-all duration-200 flex flex-col h-full` 
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={navigateToPatientDetail}
    >
      {/* Top section with avatar and basic info */}
      <div className="flex items-start">
        {/* Avatar without status indicator */}
        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
          {patient.avatarUrl ? (
            <img src={patient.avatarUrl} alt={`${patient.firstName} ${patient.lastName}`} className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{getInitials()}</span>
          )}
        </div>
        
        {/* Patient name and basic info */}
        <div className="flex-1 min-w-0 ml-3.5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {patient.firstName} {patient.lastName}
              </h3>
              <div className="flex items-center mt-0.5 flex-nowrap overflow-hidden">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span>{age} yrs</span>
                </div>
                <div className="mx-2 h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0"></div>
                <div className="text-xs text-gray-500 dark:text-gray-400 capitalize whitespace-nowrap">{patient.gender}</div>
                
                {patient.bloodType && (
                  <>
                    <div className="mx-2 h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0"></div>
                    <div className={`text-xs px-1.5 py-0.5 rounded-sm font-medium whitespace-nowrap ${getBloodTypeColor()}`}>
                      {patient.bloodType}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Action menu */}
            <button 
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Add action menu logic here
              }}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Middle section with contact info */}
      <div className="mt-4 grid grid-cols-1 gap-2.5 pl-0.5">
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
          <Phone className="h-3.5 w-3.5 mr-2.5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
          <span className="truncate">{patient.phoneNumber}</span>
        </div>
        {patient.email && (
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Mail className="h-3.5 w-3.5 mr-2.5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
            <span className="truncate">{patient.email}</span>
          </div>
        )}
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
          <MapPin className="h-3.5 w-3.5 mr-2.5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
          <span className="truncate">{patient.address}</span>
        </div>
      </div>
      
      {/* Allergies section with more subtle styling */}
      {patient.allergies && patient.allergies.length > 0 && (
        <div className="mt-4 p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <AlertCircle className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 mr-1.5" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Allergies</span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {patient.allergies.map((allergy, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Last visit info */}
      {patient.lastVisit && (
        <div className="mt-3 flex items-center">
          <Clock className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 mr-1.5" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Last visit: {lastVisitDaysAgo === 0 ? 'Today' : lastVisitDaysAgo === 1 ? 'Yesterday' : `${lastVisitDaysAgo} days ago`}
          </span>
        </div>
      )}
      
      {/* Spacer to push footer to bottom */}
      <div className="flex-grow"></div>
      
      {/* Footer section with patient ID and view action */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 dark:text-gray-500">ID: {patient.id.substring(0, 8)}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">Added {new Date(patient.createdAt).toLocaleDateString()}</span>
        </div>
        
        <button 
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
          onClick={navigateToPatientDetail}
        >
          Details <ChevronRight className="h-3 w-3 ml-0.5" />
        </button>
      </div>
      
      {/* Hover effect border - more subtle */}
      {isHovered && (
        <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-gray-300 dark:border-gray-700 opacity-30"></div>
      )}
    </div>
  );
};

// Empty state component
const EmptyState = ({ onAddPatient }: { onAddPatient: () => void }) => (
  <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800">
    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
      <User className="h-8 w-8 text-gray-400 dark:text-gray-500" />
    </div>
    <Heading3>No patients found</Heading3>
    <Paragraph className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
      You haven't added any patients yet or your search filters don't match any patients.
    </Paragraph>
    <div className="mt-6">
      <button
        onClick={onAddPatient}
        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 dark:focus:ring-gray-400"
      >
        <Plus className="h-4 w-4 mr-1.5" />
        Add Patient
      </button>
    </div>
  </div>
);

// Filter badge component
const FilterBadge = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
    {label}
    <button
      type="button"
      className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 focus:outline-none"
      onClick={onRemove}
    >
      <span className="sr-only">Remove filter for {label}</span>
      <X className="h-3 w-3" />
    </button>
  </div>
);

// Main page component
export default function PatientsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<{
    gender?: 'male' | 'female' | 'other';
    hasAllergies?: boolean;
  }>({});
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Patient;
    direction: 'asc' | 'desc';
  }>({ key: 'lastName', direction: 'asc' });
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: any[] }>({});

  const filterOptions = [
    { label: 'Gender', value: 'gender', options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ]},
    { label: 'Has Allergies', value: 'hasAllergies', options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false }
    ]}
  ];

  const handleFilterSelect = (key: string, value: any) => {
    setSelectedFilters(prev => ({ ...prev, [key]: [value] })); // Clear previous selections in the same category
    applyFilter(key, value); // Apply filter immediately
  };

  // Fetch patients data
  useEffect(() => {
    setIsMounted(true);
    
    // Simulate API call with mock data
    const timer = setTimeout(() => {
      setPatients(MOCK_PATIENTS);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle search params
  useEffect(() => {
    if (searchParams && isMounted) {
      const gender = searchParams.get('gender') as 'male' | 'female' | 'other' | null;
      const hasAllergies = searchParams.get('hasAllergies');
      
      const newFilters: typeof activeFilters = {};
      if (gender) newFilters.gender = gender;
      if (hasAllergies === 'true') newFilters.hasAllergies = true;
      
      setActiveFilters(newFilters);
      setSearchQuery(searchParams.get('search') || '');
    }
  }, [searchParams, isMounted]);

  // Filter and sort patients
  const filteredPatients = useMemo(() => {
    if (!patients.length) return [];
    
    // Apply filters
    let result = patients;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(patient => 
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(query) ||
        patient.email?.toLowerCase().includes(query) ||
        patient.phoneNumber.includes(query) ||
        patient.address.toLowerCase().includes(query)
      );
    }
    
    // Gender filter
    if (activeFilters.gender) {
      result = result.filter(patient => patient.gender === activeFilters.gender);
    }
    
    // Allergies filter
    if (activeFilters.hasAllergies) {
      result = result.filter(patient => 
        patient.allergies && patient.allergies.length > 0
      );
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
      if (bValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
      
      // Compare values
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    return result;
  }, [patients, searchQuery, activeFilters, sortConfig]);

  // Handle sorting
  const handleSort = (key: keyof Patient) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Apply filters
  const applyFilter = (key: string, value: string | boolean | null) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    
    if (value === null || value === undefined) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    
    router.push(`/patients?${newParams.toString()}`);
  };

  // Remove filter
  const removeFilter = (key: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.delete(key);
    router.push(`/patients?${newParams.toString()}`);
  };

  // Add new patient
  const handleAddPatient = () => {
    setIsAddPatientModalOpen(true);
  };

  // Handle adding a new patient from the modal
  const handleAddPatientSubmit = (patient: Partial<Patient>) => {
    // In a real app, this would make an API call to add the patient
    console.log('Adding patient:', patient);
    
    // For demo purposes, add the patient to the mock data
    const newPatient: Patient = {
      id: `${MOCK_PATIENTS.length + 1}`,
      firstName: patient.firstName || '',
      lastName: patient.lastName || '',
      dateOfBirth: patient.dateOfBirth || '',
      gender: patient.gender || 'other',
      phoneNumber: patient.phoneNumber || '',
      email: patient.email || '',
      address: patient.address || '',
      bloodType: patient.bloodType || '',
      allergies: patient.allergies || [],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setPatients([newPatient, ...patients]);
    
    // Show success message
    // This would typically be handled by a toast notification
    alert('Patient added successfully!');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const clearAllFilters = () => {
    setActiveFilters({});
    setSelectedFilters({}); // Unselect all options in the dropdown
    router.push('/patients'); // Reset the URL parameters
  };

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Heading1>Patients</Heading1>
            <Paragraph className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your patient records and information
            </Paragraph>
          </div>
          <button
            onClick={handleAddPatient}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 dark:focus:ring-gray-400"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Patient
          </button>
        </div>
        
        {/* Add Patient Modal */}
        <AddPatientModal 
          isOpen={isAddPatientModalOpen} 
          onClose={() => setIsAddPatientModalOpen(false)} 
          onAddPatient={handleAddPatientSubmit} 
        />
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                applyFilter('search', e.target.value || null);
              }}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm"
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400"
                id="filter-menu"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              {isFilterOpen && (
                <div ref={filterRef} className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="filter-menu">
                    {filterOptions.map(option => (
                      <div key={option.value} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                        <span className="font-medium">{option.label}</span>
                        <div className="flex flex-col mt-1">
                          {option.options.map(opt => (
                            <label key={String(opt.value)} className="flex items-center">
                              <input
                                type="radio"
                                className="mr-2"
                                checked={selectedFilters[option.value]?.includes(opt.value)}
                                onChange={() => handleFilterSelect(option.value, opt.value)}
                              />
                              {opt.label}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400"
              onClick={() => handleSort('lastName')}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </button>
          </div>
        </div>
        
        {/* Active filters */}
        {Object.keys(activeFilters).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.gender && (
              <FilterBadge 
                label={`Gender: ${activeFilters.gender}`} 
                onRemove={() => removeFilter('gender')} 
              />
            )}
            {activeFilters.hasAllergies && (
              <FilterBadge 
                label="Has allergies" 
                onRemove={() => removeFilter('hasAllergies')} 
              />
            )}
            {Object.keys(activeFilters).length > 0 && (
              <button
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
                onClick={clearAllFilters}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
        
        {/* Patient list */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 animate-pulse h-64">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map(patient => (
              <div key={patient.id} className="h-full">
                <PatientCard patient={patient} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState onAddPatient={handleAddPatient} />
        )}
        
        {/* Pagination would go here */}
        {filteredPatients.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">{filteredPatients.length}</span> patients
            </div>
            <div className="flex space-x-2">
              <button
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={true}
              >
                Previous
              </button>
              <button
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={true}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 