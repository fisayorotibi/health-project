/**
 * Encryption Utility
 * 
 * This utility provides functions for encrypting and decrypting sensitive patient data
 * using the Web Crypto API. It implements AES-GCM encryption for secure data storage
 * and transmission.
 */

// Check if we're running on the client
const isClient = typeof window !== 'undefined';

// Generate a new encryption key
export const generateKey = async (): Promise<CryptoKey> => {
  if (!isClient) {
    throw new Error('Web Crypto API is not available on the server');
  }
  
  return await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true, // extractable
    ['encrypt', 'decrypt']
  );
};

// Export a key to string format for storage
export const exportKey = async (key: CryptoKey): Promise<string> => {
  if (!isClient) {
    throw new Error('Web Crypto API is not available on the server');
  }
  
  const exported = await window.crypto.subtle.exportKey('raw', key);
  return arrayBufferToBase64(exported);
};

// Import a key from string format
export const importKey = async (keyString: string): Promise<CryptoKey> => {
  if (!isClient) {
    throw new Error('Web Crypto API is not available on the server');
  }
  
  const keyData = base64ToArrayBuffer(keyString);
  return await window.crypto.subtle.importKey(
    'raw',
    keyData,
    {
      name: 'AES-GCM',
      length: 256,
    },
    true, // extractable
    ['encrypt', 'decrypt']
  );
};

// Encrypt data
export const encryptData = async (
  data: string,
  key: CryptoKey
): Promise<string> => {
  if (!isClient) {
    throw new Error('Web Crypto API is not available on the server');
  }
  
  // Generate a random initialization vector
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  // Convert data to ArrayBuffer
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  // Encrypt the data
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    dataBuffer
  );
  
  // Combine IV and encrypted data
  const result = new Uint8Array(iv.length + encryptedBuffer.byteLength);
  result.set(iv);
  result.set(new Uint8Array(encryptedBuffer), iv.length);
  
  // Convert to base64 string for storage
  return arrayBufferToBase64(result.buffer);
};

// Decrypt data
export const decryptData = async (
  encryptedData: string,
  key: CryptoKey
): Promise<string> => {
  if (!isClient) {
    throw new Error('Web Crypto API is not available on the server');
  }
  
  // Convert from base64 to ArrayBuffer
  const data = base64ToArrayBuffer(encryptedData);
  
  // Extract IV (first 12 bytes)
  const iv = data.slice(0, 12);
  
  // Extract encrypted data (everything after IV)
  const encryptedBuffer = data.slice(12);
  
  // Decrypt the data
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encryptedBuffer
  );
  
  // Convert decrypted data to string
  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
};

// Helper function to convert ArrayBuffer to base64 string
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  if (!isClient) {
    throw new Error('btoa is not available on the server');
  }
  
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

// Helper function to convert base64 string to ArrayBuffer
const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  if (!isClient) {
    throw new Error('atob is not available on the server');
  }
  
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// Encrypt sensitive patient data
export const encryptPatientData = async (
  patientData: any,
  key: CryptoKey
): Promise<any> => {
  if (!isClient) {
    throw new Error('Web Crypto API is not available on the server');
  }
  
  // Fields to encrypt (sensitive information)
  const sensitiveFields = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'phoneNumber',
    'email',
    'address',
    'bloodType',
    'allergies',
  ];
  
  const encryptedData = { ...patientData };
  
  // Encrypt each sensitive field
  for (const field of sensitiveFields) {
    if (encryptedData[field]) {
      if (Array.isArray(encryptedData[field])) {
        // Handle array fields (like allergies)
        encryptedData[field] = await encryptData(
          JSON.stringify(encryptedData[field]),
          key
        );
      } else {
        // Handle string fields
        encryptedData[field] = await encryptData(
          encryptedData[field].toString(),
          key
        );
      }
    }
  }
  
  return encryptedData;
};

// Decrypt sensitive patient data
export const decryptPatientData = async (
  encryptedPatientData: any,
  key: CryptoKey
): Promise<any> => {
  if (!isClient) {
    throw new Error('Web Crypto API is not available on the server');
  }
  
  // Fields to decrypt (sensitive information)
  const sensitiveFields = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'phoneNumber',
    'email',
    'address',
    'bloodType',
    'allergies',
  ];
  
  const decryptedData = { ...encryptedPatientData };
  
  // Decrypt each sensitive field
  for (const field of sensitiveFields) {
    if (decryptedData[field]) {
      const decryptedValue = await decryptData(decryptedData[field], key);
      
      // Check if the field was originally an array
      if (field === 'allergies') {
        try {
          decryptedData[field] = JSON.parse(decryptedValue);
        } catch (e) {
          decryptedData[field] = decryptedValue;
        }
      } else {
        decryptedData[field] = decryptedValue;
      }
    }
  }
  
  return decryptedData;
}; 