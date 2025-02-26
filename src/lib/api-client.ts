/**
 * File: api-client.ts
 * Created: [Current Date]
 * Changes: Initial creation - API client for making requests to the backend
 */

// Base URL for API requests
const API_BASE_URL = '/api';

// Get token from localStorage
const getToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('auth_token');
};

// Set token in localStorage
export const setToken = (token: string): void => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem('auth_token', token);
};

// Remove token from localStorage
export const removeToken = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem('auth_token');
};

// Generic fetch function with authentication
async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized errors
  if (response.status === 401) {
    // Clear token and redirect to login
    removeToken();
    window.location.href = '/login';
    throw new Error('Authentication required');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data as T;
}

// API client functions
export const api = {
  // Auth
  auth: {
    login: async (email: string, password: string) => {
      const data = await fetchWithAuth<{ user: any; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setToken(data.token);
      return data;
    },
    register: async (name: string, email: string, password: string, role: string) => {
      const data = await fetchWithAuth<{ user: any; token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role }),
      });
      setToken(data.token);
      return data;
    },
    logout: () => {
      removeToken();
    },
  },

  // Patients
  patients: {
    getAll: async () => {
      return fetchWithAuth<any[]>('/patients');
    },
    getById: async (id: string) => {
      return fetchWithAuth<any>(`/patients/${id}`);
    },
    create: async (patientData: any) => {
      return fetchWithAuth<any>('/patients', {
        method: 'POST',
        body: JSON.stringify(patientData),
      });
    },
    update: async (id: string, patientData: any) => {
      return fetchWithAuth<any>(`/patients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(patientData),
      });
    },
    delete: async (id: string) => {
      return fetchWithAuth<any>(`/patients/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Medical Records
  medicalRecords: {
    getByPatientId: async (patientId: string) => {
      return fetchWithAuth<any[]>(`/patients/${patientId}/medical-records`);
    },
    create: async (patientId: string, recordData: any) => {
      return fetchWithAuth<any>(`/patients/${patientId}/medical-records`, {
        method: 'POST',
        body: JSON.stringify(recordData),
      });
    },
    update: async (id: string, recordData: any) => {
      return fetchWithAuth<any>(`/medical-records/${id}`, {
        method: 'PUT',
        body: JSON.stringify(recordData),
      });
    },
    delete: async (id: string) => {
      return fetchWithAuth<any>(`/medical-records/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Prescriptions
  prescriptions: {
    getByPatientId: async (patientId: string) => {
      return fetchWithAuth<any[]>(`/patients/${patientId}/prescriptions`);
    },
    create: async (patientId: string, prescriptionData: any) => {
      return fetchWithAuth<any>(`/patients/${patientId}/prescriptions`, {
        method: 'POST',
        body: JSON.stringify(prescriptionData),
      });
    },
    update: async (id: string, prescriptionData: any) => {
      return fetchWithAuth<any>(`/prescriptions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(prescriptionData),
      });
    },
    delete: async (id: string) => {
      return fetchWithAuth<any>(`/prescriptions/${id}`, {
        method: 'DELETE',
      });
    },
  },
}; 