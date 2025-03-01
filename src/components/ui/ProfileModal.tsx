import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [name, setName] = useState('Dr. Sarah Chen');
  const [email, setEmail] = useState('sarah.chen@example.com');
  const [notifications, setNotifications] = useState(true);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg p-6 w-120 h-96 relative shadow-lg border border-gray-200 dark:border-gray-700">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
          <Dialog.Title className="text-md font-normal text-gray-900 dark:text-gray-100">Profile Settings</Dialog.Title>
          <div className="mt-4 flex">
            <div className="flex flex-col mr-4 border-r border-gray-200 dark:border-gray-700 pr-4">
              <button onClick={() => setActiveTab('account')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'account' ? 'bg-gray-600 text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Account Settings</button>
              <button onClick={() => setActiveTab('organization')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'organization' ? 'bg-gray-600 text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Organization Settings</button>
              <button onClick={() => setActiveTab('help')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'help' ? 'bg-gray-600 text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Help</button>
            </div>
            <div className="flex-1 mt-4 space-y-4 w-96">
              {activeTab === 'account' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-2" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-2" placeholder="Enter your email" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Receive Notifications</label>
                    <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" />
                  </div>
                </>
              )}
              {activeTab === 'organization' && (
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Organization settings content goes here.</p>
                </div>
              )}
              {activeTab === 'help' && (
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Help content goes here.</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button onClick={onClose} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">Cancel</button>
            <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700">Save Changes</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProfileModal;