/**
 * Offline Storage Utility
 * 
 * This utility provides functions for storing and retrieving data locally
 * when the application is offline. It uses IndexedDB for storage and
 * implements a synchronization mechanism to update the server when
 * connectivity is restored.
 */

// Check if we're running on the client
const isClient = typeof window !== 'undefined';

// Check if the browser is online
export const isOnline = (): boolean => {
  if (!isClient) return true; // Default to true on server
  return navigator.onLine;
};

// Listen for online/offline events
export const setupConnectivityListeners = (
  onOnline: () => void,
  onOffline: () => void
): (() => void) => {
  if (!isClient) {
    // Return a no-op function on server
    return () => {};
  }

  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  // Return a cleanup function
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};

// Open IndexedDB database
export const openDatabase = (): Promise<IDBDatabase> => {
  if (!isClient) {
    return Promise.reject(new Error('IndexedDB is not available on the server'));
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open('HealthRecordsDB', 1);

    request.onerror = () => {
      reject(new Error('Failed to open database'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      
      // Create object stores for each data type
      if (!db.objectStoreNames.contains('patients')) {
        db.createObjectStore('patients', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('medicalRecords')) {
        db.createObjectStore('medicalRecords', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('prescriptions')) {
        db.createObjectStore('prescriptions', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('pendingSync')) {
        db.createObjectStore('pendingSync', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

// Store data in IndexedDB
export const storeData = async <T>(
  storeName: string,
  data: T
): Promise<void> => {
  if (!isClient) {
    return Promise.reject(new Error('IndexedDB is not available on the server'));
  }

  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(data);
    
    request.onerror = () => {
      reject(new Error(`Failed to store data in ${storeName}`));
    };
    
    request.onsuccess = () => {
      resolve();
    };
  });
};

// Retrieve data from IndexedDB
export const getData = async <T>(
  storeName: string,
  id: string
): Promise<T | null> => {
  if (!isClient) {
    return Promise.reject(new Error('IndexedDB is not available on the server'));
  }

  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(id);
    
    request.onerror = () => {
      reject(new Error(`Failed to retrieve data from ${storeName}`));
    };
    
    request.onsuccess = () => {
      resolve(request.result || null);
    };
  });
};

// Get all data from a store
export const getAllData = async <T>(
  storeName: string
): Promise<T[]> => {
  if (!isClient) {
    return Promise.reject(new Error('IndexedDB is not available on the server'));
  }

  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    
    request.onerror = () => {
      reject(new Error(`Failed to retrieve all data from ${storeName}`));
    };
    
    request.onsuccess = () => {
      resolve(request.result || []);
    };
  });
};

// Add an operation to the sync queue
export const addToSyncQueue = async (
  operation: {
    type: 'create' | 'update' | 'delete';
    storeName: string;
    data: any;
    endpoint: string;
    method: string;
  }
): Promise<void> => {
  if (!isClient) {
    return Promise.reject(new Error('IndexedDB is not available on the server'));
  }

  await storeData('pendingSync', {
    ...operation,
    timestamp: new Date().toISOString(),
    attempts: 0
  });
};

// Process the sync queue when online
export const processSyncQueue = async (): Promise<void> => {
  if (!isClient) {
    return Promise.reject(new Error('IndexedDB is not available on the server'));
  }

  if (!isOnline()) {
    return;
  }
  
  const pendingOperations = await getAllData<any>('pendingSync');
  
  for (const operation of pendingOperations) {
    try {
      // Attempt to sync with the server
      const response = await fetch(operation.endpoint, {
        method: operation.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(operation.data),
      });
      
      if (response.ok) {
        // If successful, remove from the sync queue
        const db = await openDatabase();
        const transaction = db.transaction('pendingSync', 'readwrite');
        const store = transaction.objectStore('pendingSync');
        store.delete(operation.id);
      } else {
        // If failed, increment the attempt counter
        operation.attempts += 1;
        await storeData('pendingSync', operation);
      }
    } catch (error) {
      console.error('Sync operation failed:', error);
      // Increment the attempt counter
      operation.attempts += 1;
      await storeData('pendingSync', operation);
    }
  }
}; 