import React, { useState } from 'react';
import { Dialog, Switch } from '@headlessui/react';
import { X, Sun, Moon, Monitor } from 'lucide-react';
import { useThemeContext } from '@/components/ThemeProvider';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define a type system for text sizes
const textSizes = {
  title: 'text-lg',
  subtitle: 'text-sm',
  body: 'text-xs',
};

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useThemeContext();
  const [activeTab, setActiveTab] = useState('account');
  const [name, setName] = useState('Dr. Sarah Chen');
  const [email, setEmail] = useState('sarah.chen@example.com');
  const [notifications, setNotifications] = useState(true);
  const [is2faEnabled, setIs2faEnabled] = useState(false);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-lg p-6 w-120 h-96 relative shadow-lg border border-gray-300 dark:border-gray-800">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
          <Dialog.Title className="text-md font-normal text-gray-900 dark:text-gray-100">Profile Settings</Dialog.Title>
          <div className="mt-4 flex">
            <div className="flex flex-col mr-4 border-r border-gray-200 dark:border-gray-700 pr-4">
              <button onClick={() => setActiveTab('account')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'account' ? 'bg-gray-600 text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'} mb-1.5`}>Account Settings</button>
              <button onClick={() => setActiveTab('appearance')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'appearance' ? 'bg-gray-600 text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'} mb-1.5`}>Appearance</button>
              <button onClick={() => setActiveTab('help')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'help' ? 'bg-gray-600 text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'} mb-1.5`}>Help</button>
              <button onClick={() => setActiveTab('security')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'security' ? 'bg-gray-600 text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'} mb-1.5`}>Security & Privacy</button>
            </div>
            <div className="flex-1 mt-4 space-y-4 w-96">
              {activeTab === 'account' && (
                <>
                  <h2 className={`${textSizes.title} font-semibold text-gray-900 dark:text-gray-100`}>Account Settings</h2>
                  <div>
                    <label className={`${textSizes.body} block font-medium text-gray-700 dark:text-gray-300`}>Name</label>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-2' placeholder='Enter your name' />
                  </div>
                  <div>
                    <label className={`${textSizes.body} block font-medium text-gray-700 dark:text-gray-300`}>Email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-2' placeholder='Enter your email' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <label className={`${textSizes.body} block font-medium text-gray-700 dark:text-gray-300`}>Receive Notifications</label>
                    <input type='checkbox' checked={notifications} onChange={() => setNotifications(!notifications)} className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600' />
                  </div>
                </>
              )}
              {activeTab === 'appearance' && (
                <div className='flex space-x-4 mt-2 w-full'>
                  <button onClick={() => setTheme('light')} className={`flex flex-col items-center p-2 rounded-lg w-full border border-gray-300 dark:border-gray-800 ${theme === 'light' ? 'bg-gray-200 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} hover:bg-gray-300 dark:hover:bg-gray-700`}> 
                    <Sun className='w-4 h-4 mb-1' /> 
                    <span className='text-xs text-gray-900 dark:text-gray-100'>Light</span>
                  </button>
                  <button onClick={() => setTheme('dark')} className={`flex flex-col items-center p-2 rounded-lg w-full border border-gray-300 dark:border-gray-800 ${theme === 'dark' ? 'bg-gray-200 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} hover:bg-gray-300 dark:hover:bg-gray-700`}> 
                    <Moon className='w-4 h-4 mb-1' /> 
                    <span className='text-xs text-gray-900 dark:text-gray-100'>Dark</span>
                  </button>
                  <button onClick={() => setTheme('system')} className={`flex flex-col items-center p-2 rounded-lg w-full border border-gray-300 dark:border-gray-800 ${theme === 'system' ? 'bg-gray-200 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} hover:bg-gray-300 dark:hover:bg-gray-700`}> 
                    <Monitor className='w-4 h-4 mb-1' /> 
                    <span className='text-xs text-gray-900 dark:text-gray-100'>System</span>
                  </button>
                </div>
              )}
              {activeTab === 'help' && (
                <div>
                  <p className={`${textSizes.body} text-gray-700 dark:text-gray-300`}>Help content goes here.</p>
                </div>
              )}
              {activeTab === 'security' && (
                <div>
                  <div className='mt-4 flex items-center justify-between w-full'>
                    <div className='flex-1'>
                      <h3 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Two-Factor Authentication</h3>
                      <p className={`${textSizes.body} text-gray-600 dark:text-gray-400 mt-1`}>Two-Factor Authentication (2FA) adds an extra layer of security to your account by requiring not only your password but also a second factor, such as a code sent to your mobile device. This helps protect your account from unauthorized access.</p>
                    </div>
                    <Switch
                      checked={is2faEnabled}
                      onChange={setIs2faEnabled}
                      className={`${
                        is2faEnabled ? 'bg-blue-600' : 'bg-gray-200'
                      } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                      <span
                        className={`${
                          is2faEnabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full transition`}
                      />
                    </Switch>
                  </div>
                  <button className='mt-2 text-blue-500 hover:underline'>Manage 2FA Settings</button>
                  <div className='mt-4'>
                    <h3 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Password Management</h3>
                    <input type='password' placeholder='New Password' className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-2' />
                    <button className='mt-2 text-blue-500 hover:underline'>Reset Password</button>
                    <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>Password strength: <span className='font-semibold'>Strong</span></p>
                  </div>
                  <div className='mt-4'>
                    <h3 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Session Management</h3>
                    <ul className='list-disc pl-5'>
                      <li className='flex justify-between items-center'>
                        <span>Device 1 (Chrome on Windows)</span>
                        <button className='text-red-500 hover:underline'>Revoke</button>
                      </li>
                      <li className='flex justify-between items-center'>
                        <span>Device 2 (Safari on iPhone)</span>
                        <button className='text-red-500 hover:underline'>Revoke</button>
                      </li>
                    </ul>
                    <button className='mt-2 text-blue-500 hover:underline'>View All Sessions</button>
                  </div>
                  <div className='mt-4'>
                    <h3 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Privacy Settings</h3>
                    <div className='flex items-center'>
                      <input type='checkbox' id='activityLogs' className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600' />
                      <label htmlFor='activityLogs' className={`${textSizes.body} ml-2 text-gray-700 dark:text-gray-300`}>Allow others to view my activity logs</label>
                    </div>
                    <div className='flex items-center'>
                      <input type='checkbox' id='dataSharing' className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600' />
                      <label htmlFor='dataSharing' className={`${textSizes.body} ml-2 text-gray-700 dark:text-gray-300`}>Consent to share data with other practitioners</label>
                    </div>
                  </div>
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