import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Settings</Dialog.Title>
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">Manage your account settings and preferences.</p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProfileModal;