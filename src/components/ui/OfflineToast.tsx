import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const OfflineToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnline = () => setIsVisible(false);
  const handleOffline = () => setIsVisible(true);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md flex items-center space-x-2`}> 
      <AlertTriangle className="w-4 h-4" />
      <span>You are offline. Please check your internet connection.</span>
    </div>
  );
};

export default OfflineToast; 