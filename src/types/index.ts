// Patient Types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phoneNumber: string;
  email?: string;
  address: string;
  bloodType?: string;
  allergies?: string[];
  createdAt: string;
  updatedAt: string;
}

// Medical Record Types
export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  symptoms: string[];
  notes: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VitalSigns {
  id: string;
  medicalRecordId: string;
  temperature?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  heartRate?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number;
  height?: number;
  bmi?: number;
  recordedAt: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  medicalRecordId?: string;
  testName: string;
  testDate: string;
  resultDate: string;
  result: string;
  normalRange?: string;
  units?: string;
  notes?: string;
  labTechnicianId: string;
  createdAt: string;
  updatedAt: string;
}

// Prescription Types
export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medications: Medication[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Medication {
  id: string;
  prescriptionId: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'doctor' | 'nurse' | 'lab_technician' | 'admin';
  department?: string;
  specialization?: string;
  createdAt: string;
  updatedAt: string;
}

// Appointment Types
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  reason: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Types
export interface DashboardStats {
  totalPatients: number;
  appointmentsToday: number;
  pendingLabResults: number;
  recentPrescriptions: number;
} 