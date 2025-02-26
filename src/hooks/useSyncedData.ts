/**
 * File: useSyncedData.ts
 * Created: [Current Date]
 * Changes: Initial creation - Hook for syncing data between local storage and API
 */

import { useState, useEffect, useCallback } from 'react';
import { useOnlineStatus } from './useOnlineStatus';
import { storeData, getData, getAllData, addToSyncQueue } from '@/lib/offline-storage';
import { api } from '@/lib/api-client';

// Generic hook for syncing data between local storage and API
export function useSyncedData<T extends { id: string }>(
  storeName: string,
  apiEndpoint: keyof typeof api,
  apiMethod: string,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { online } = useOnlineStatus();

  // Fetch data from API or local storage
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let items: T[];

      if (online) {
        // If online, fetch from API
        // @ts-ignore - Dynamic access to API methods
        items = await api[apiEndpoint][apiMethod]();
        
        // Store in local storage for offline access
        for (const item of items) {
          await storeData(storeName, item);
        }
      } else {
        // If offline, fetch from local storage
        items = await getAllData<T>(storeName);
      }

      setData(items);
    } catch (err) {
      console.error(`Error fetching ${storeName}:`, err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      
      // If API request failed, try to get data from local storage
      try {
        const items = await getAllData<T>(storeName);
        setData(items);
      } catch (localErr) {
        console.error(`Error fetching ${storeName} from local storage:`, localErr);
      }
    } finally {
      setLoading(false);
    }
  }, [online, storeName, apiEndpoint, apiMethod]);

  // Create a new item
  const createItem = useCallback(async (item: Omit<T, 'id'>) => {
    try {
      if (online) {
        // If online, create via API
        // @ts-ignore - Dynamic access to API methods
        const createdItem = await api[apiEndpoint].create(item);
        
        // Store in local storage
        await storeData(storeName, createdItem);
        
        // Update state
        setData(prev => [...prev, createdItem]);
        
        return createdItem;
      } else {
        // If offline, generate a temporary ID and store locally
        const tempItem = {
          ...item,
          id: `temp_${Date.now()}`,
          _pendingSync: true,
        } as unknown as T;
        
        await storeData(storeName, tempItem);
        
        // Add to sync queue for later
        await addToSyncQueue({
          type: 'create',
          storeName,
          data: item,
          endpoint: `/${apiEndpoint}`,
          method: 'POST',
        });
        
        // Update state
        setData(prev => [...prev, tempItem]);
        
        return tempItem;
      }
    } catch (err) {
      console.error(`Error creating ${storeName}:`, err);
      throw err;
    }
  }, [online, storeName, apiEndpoint]);

  // Update an existing item
  const updateItem = useCallback(async (id: string, updates: Partial<T>) => {
    try {
      // Get the current item
      const currentItem = await getData<T>(storeName, id);
      
      if (!currentItem) {
        throw new Error(`${storeName} with ID ${id} not found`);
      }
      
      // Merge updates with current item
      const updatedItem = { ...currentItem, ...updates } as T;
      
      if (online) {
        // If online, update via API
        // @ts-ignore - Dynamic access to API methods
        const result = await api[apiEndpoint].update(id, updates);
        
        // Store updated item in local storage
        await storeData(storeName, result);
        
        // Update state
        setData(prev => prev.map(item => item.id === id ? result : item));
        
        return result;
      } else {
        // If offline, update locally
        await storeData(storeName, updatedItem);
        
        // Add to sync queue for later
        await addToSyncQueue({
          type: 'update',
          storeName,
          data: updates,
          endpoint: `/${apiEndpoint}/${id}`,
          method: 'PUT',
        });
        
        // Update state
        setData(prev => prev.map(item => item.id === id ? updatedItem : item));
        
        return updatedItem;
      }
    } catch (err) {
      console.error(`Error updating ${storeName}:`, err);
      throw err;
    }
  }, [online, storeName, apiEndpoint]);

  // Delete an item
  const deleteItem = useCallback(async (id: string) => {
    try {
      if (online) {
        // If online, delete via API
        // @ts-ignore - Dynamic access to API methods
        await api[apiEndpoint].delete(id);
        
        // Remove from local storage
        const db = await indexedDB.open('HealthRecordsDB', 1);
        const transaction = db.result.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        store.delete(id);
        
        // Update state
        setData(prev => prev.filter(item => item.id !== id));
      } else {
        // If offline, mark for deletion
        const item = await getData<T>(storeName, id);
        
        if (item) {
          // Mark as deleted
          const markedItem = { ...item, _deleted: true } as T;
          await storeData(storeName, markedItem);
          
          // Add to sync queue for later
          await addToSyncQueue({
            type: 'delete',
            storeName,
            data: { id },
            endpoint: `/${apiEndpoint}/${id}`,
            method: 'DELETE',
          });
          
          // Update state
          setData(prev => prev.filter(item => item.id !== id));
        }
      }
    } catch (err) {
      console.error(`Error deleting ${storeName}:`, err);
      throw err;
    }
  }, [online, storeName, apiEndpoint]);

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
    create: createItem,
    update: updateItem,
    delete: deleteItem,
  };
} 