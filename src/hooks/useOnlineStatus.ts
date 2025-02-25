import { useState, useEffect } from 'react';
import { setupConnectivityListeners, isOnline, processSyncQueue } from '@/lib/offline-storage';

/**
 * Hook to track online/offline status and handle sync operations
 * when the application comes back online.
 */
export function useOnlineStatus() {
  // Default to true for server-side rendering
  const [online, setOnline] = useState<boolean>(true);
  const [syncInProgress, setSyncInProgress] = useState<boolean>(false);
  const [lastSyncAttempt, setLastSyncAttempt] = useState<Date | null>(null);

  useEffect(() => {
    // Update online status once on the client
    setOnline(isOnline());
    
    // Handle when the app comes online
    const handleOnline = async () => {
      setOnline(true);
      
      // Start sync process
      setSyncInProgress(true);
      try {
        await processSyncQueue();
        setLastSyncAttempt(new Date());
      } catch (error) {
        console.error('Error syncing data:', error);
      } finally {
        setSyncInProgress(false);
      }
    };

    // Handle when the app goes offline
    const handleOffline = () => {
      setOnline(false);
    };

    // Set up event listeners
    const cleanup = setupConnectivityListeners(handleOnline, handleOffline);

    // Clean up event listeners on unmount
    return cleanup;
  }, []);

  // Function to manually trigger sync
  const triggerSync = async () => {
    if (!online) {
      return false;
    }

    setSyncInProgress(true);
    try {
      await processSyncQueue();
      setLastSyncAttempt(new Date());
      return true;
    } catch (error) {
      console.error('Error syncing data:', error);
      return false;
    } finally {
      setSyncInProgress(false);
    }
  };

  return {
    online,
    syncInProgress,
    lastSyncAttempt,
    triggerSync
  };
} 