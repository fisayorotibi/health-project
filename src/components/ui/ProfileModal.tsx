import React, { useState } from 'react';
import { Dialog, Switch } from '@headlessui/react';
import { X, Sun, Moon, Monitor, Laptop, Smartphone, User, Palette, HelpCircle, Shield, Bell, Link2, LogOut } from 'lucide-react';
import { useThemeContext } from '@/components/ThemeProvider';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'account' | 'appearance' | 'help' | 'security' | 'theme' | 'notifications' | 'integrations';
type FontSizeType = 'text-xs' | 'text-sm' | 'text-lg';
type ThemeType = 'light' | 'dark' | 'system';

// Define a type system for text sizes
const textSizes = {
  title: 'text-lg',
  subtitle: 'text-sm',
  body: 'text-xs',
  link: 'text-xs',
};

const lightenColor = (color: string, percent: number): string => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
};

const darkenColor = (color: string, percent: number): string => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * -percent * 0.5);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
};

const getToggleClasses = (isEnabled: boolean, theme: ThemeType): string => {
  const baseClasses = 'relative inline-flex items-center h-6 rounded-full w-11';
  const enabledClasses = theme === 'light' && isEnabled ? 'bg-gray-800' : (theme === 'dark' && isEnabled ? 'bg-gray-100' : (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'));
  const disabledClasses = theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200';
  return `${baseClasses} ${isEnabled ? enabledClasses : disabledClasses}`;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useThemeContext();
  const [activeTab, setActiveTab] = useState<TabType>('account');
  const [name, setName] = useState('Dr. Sarah Chen');
  const [email, setEmail] = useState('sarah.chen@example.com');
  const [notifications, setNotifications] = useState(true);
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);
  const [accentColor, setAccentColor] = useState('#F5F5F5');
  const [fontSize, setFontSize] = useState<FontSizeType>('text-sm');

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = '/logout';
  };

  const handleTerminateSession = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Add session termination logic here
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-lg w-1/2 h-auto relative shadow-lg border border-gray-300 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between mb-4 px-6 pt-5">
            <Dialog.Title className="text-md font-normal text-gray-900 dark:text-gray-100">Settings</Dialog.Title>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex pl-4 pb-6">
            <div className="flex flex-col mr-4 border-r border-gray-200 dark:border-gray-800/50 pr-4">
              <button onClick={() => setActiveTab('account')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'account' ? 'bg-gray-200 dark:bg-gray-800/90 text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80'} mb-1.5 flex items-center`}>
                <User className="w-3.5 h-3.5 mr-2" />
                Account
              </button>
              <button onClick={() => setActiveTab('appearance')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'appearance' ? 'bg-gray-200 dark:bg-gray-800/90 text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80'} mb-1.5 flex items-center`}>
                <Palette className="w-3.5 h-3.5 mr-2" />
                Appearance
              </button>
              <button onClick={() => setActiveTab('help')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'help' ? 'bg-gray-200 dark:bg-gray-800/90 text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80'} mb-1.5 flex items-center`}>
                <HelpCircle className="w-3.5 h-3.5 mr-2" />
                Help
              </button>
              <button onClick={() => setActiveTab('security')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'security' ? 'bg-gray-200 dark:bg-gray-800/90 text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80'} mb-1.5 flex items-center`}>
                <Shield className="w-3.5 h-3.5 mr-2" />
                Security & Privacy
              </button>
              <button onClick={() => setActiveTab('notifications')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'notifications' ? 'bg-gray-200 dark:bg-gray-800/90 text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80'} mb-1.5 flex items-center`}>
                <Bell className="w-3.5 h-3.5 mr-2" />
                Notifications
              </button>
              <button onClick={() => setActiveTab('integrations')} className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${activeTab === 'integrations' ? 'bg-gray-200 dark:bg-gray-800/90 text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80'} mb-1.5 flex items-center`}>
                <Link2 className="w-3.5 h-3.5 mr-2" />
                Integrations
              </button>
              <div className='mt-auto'>
                <button onClick={handleLogout} className='py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80 flex items-center'>
                  <LogOut className="w-3.5 h-3.5 mr-2" />
                  Log out
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto h-80 space-y-4 pr-4">
              {activeTab === 'account' && (
                <>
                  <div>
                    <label className={`${textSizes.body} block font-medium text-gray-700 dark:text-gray-300`}>Name</label>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-2' placeholder='Enter your name' />
                  </div>
                </>
              )}
              {activeTab === 'appearance' && (
                <div className='flex flex-col space-y-4'>
                  <div className='flex flex-col space-y-1'>
                    <h4 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Theme Selector</h4>
                    <p className={`${textSizes.body} text-gray-600 dark:text-gray-400`}>Choose your preferred theme for the dashboard.</p>
                  </div>
                  <div className='flex space-x-4'>
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
                  <div className='inline-flex flex-col space-y-4 pb-10'>
                    <div className='flex flex-col space-y-1'>
                      <h4 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Accent Color</h4>
                      <p className={`${textSizes.body} text-gray-600 dark:text-gray-400`}>Choose your preferred accent color for the dashboard.</p>
                    </div>
                    <div className='flex space-x-4'>
                      <div className='flex space-x-2 mt-2 ml-1'>
                        {['#000000', '#8A2BE2', '#00BFFF', '#008080', '#FFFFFF'].map(color => (
                          <button
                            key={color}
                            onClick={() => setAccentColor(color)}
                            className={`w-8 h-8 rounded-full border-2 ${accentColor === color ? 'border-blue-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 ${theme === 'dark' ? 'focus:ring-offset-gray-900' : ''}`}
                            style={{ backgroundColor: color, borderColor: (theme === 'dark' ? lightenColor(color, 20) : darkenColor(color, 20)) }}
                          />
                        ))}
                      </div>
                      <div className='relative flex items-center'>
                        <span className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400'>#</span>
                        <input
                          className='border border-gray-300 rounded-md p-1 pl-5 w-24 h-10 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 text-sm'
                          placeholder='F5F5F5'
                          type='text'
                          value={accentColor.slice(1)}
                          onChange={(e) => setAccentColor(`#${e.target.value}`)}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                      <h4 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Font Size</h4>
                      <p className={`${textSizes.body} text-gray-600 dark:text-gray-400`}>Choose your preferred font size for the dashboard.</p>
                      <div className='flex space-x-4 mt-2'>
                        <button 
                          onClick={() => setFontSize('text-xs')} 
                          className={`py-2 px-4 rounded-lg text-xs font-medium ${
                            fontSize === 'text-xs' 
                              ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200' 
                              : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          Small
                        </button>
                        <button 
                          onClick={() => setFontSize('text-sm')} 
                          className={`py-2 px-4 rounded-lg text-xs font-medium ${
                            fontSize === 'text-sm' 
                              ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200' 
                              : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          Medium
                        </button>
                        <button 
                          onClick={() => setFontSize('text-lg')} 
                          className={`py-2 px-4 rounded-lg text-xs font-medium ${
                            fontSize === 'text-lg' 
                              ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200' 
                              : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          Large
                        </button>
                      </div>
                      
                      <div className='mt-4 py-8 px-4 border border-gray-300 dark:border-gray-800 rounded-lg flex justify-center items-center min-h-[100px]'>
                        <p className={`${fontSize} text-gray-800 dark:text-gray-200 text-center`}>
                          This is a preview text.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'help' && (
                <div>
                  <p className={`${textSizes.body} text-gray-700 dark:text-gray-300`}>Help content goes here.</p>
                </div>
              )}
              {activeTab === 'security' && (
                <div className='pb-10'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex-1'>
                      <h3 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Two-Factor Authentication</h3>
                      <p className={`${textSizes.body} text-gray-600 dark:text-gray-400 mt-1`}>Two-Factor Authentication (2FA) adds an extra layer of security by requiring a second factor, such as a code sent to your mobile device, in addition to your password.</p>
                    </div>
                    <Switch
                      checked={is2faEnabled}
                      onChange={setIs2faEnabled}
                      className={getToggleClasses(is2faEnabled, theme as ThemeType)}
                    >
                      <span
                        className={`${is2faEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform ${is2faEnabled ? (theme === 'dark' ? 'bg-gray-900' : 'bg-white') : (theme === 'dark' && !is2faEnabled ? 'bg-gray-800' : 'bg-white')} rounded-full transition`}
                      />
                    </Switch>
                  </div>
                  
                  <div className='mt-4 flex items-center justify-between'>
                    <div>
                      <h3 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Password</h3>
                      <div className='mt-1'>
                        <p className={`${textSizes.body} text-gray-600 dark:text-gray-400`}>Manage your password settings here.</p>
                      </div>
                    </div>
                    <button className={`py-2 px-4 text-xs text-left rounded-lg transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>Change Password</button>
                  </div>
                  
                  <div className='mt-4'>
                    <h3 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Active Sessions</h3>
                    <ul className='mt-1'>
                      <li className='flex items-center mb-2'>
                        <Laptop className="w-4 h-4 mr-2" />
                        <span className='text-xs w-32'>Chrome on Windows</span>
                        <a href="#" className='text-red-500 hover:underline text-xs ml-2' onClick={handleTerminateSession}>Terminate</a>
                      </li>
                      <li className='flex items-center mb-1'>
                        <Smartphone className="w-4 h-4 mr-2" />
                        <span className='text-xs w-32'>Safari on iPhone</span>
                        <a href="#" className='text-red-500 hover:underline text-xs ml-2' onClick={handleTerminateSession}>Terminate</a>
                      </li>
                    </ul>
                  </div>
                  <div className='mt-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex-1'>
                        <h4 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Allow others to view my activity logs</h4>
                        <p className={`${textSizes.body} text-gray-600 dark:text-gray-400`}>Enabling this option allows others to see your activity logs, enhancing transparency and collaboration.</p>
                      </div>
                      <Switch
                        checked={notifications}
                        onChange={setNotifications}
                        className={getToggleClasses(notifications, theme as ThemeType)}
                      >
                        <span
                          className={`${notifications ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform ${notifications ? (theme === 'dark' ? 'bg-gray-900' : 'bg-white') : (theme === 'dark' && !notifications ? 'bg-gray-800' : 'bg-white')} rounded-full transition`}
                        />
                      </Switch>
                    </div>
                  </div>
                  <div className='mt-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex-1'>
                        <h4 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Consent to share data with other practitioners</h4>
                        <p className={`${textSizes.body} text-gray-600 dark:text-gray-400`}>By enabling this option, you allow your data to be shared with other practitioners, facilitating better collaboration and care.</p>
                      </div>
                      <Switch
                        checked={dataSharing}
                        onChange={() => setDataSharing(!dataSharing)}
                        className={getToggleClasses(dataSharing, theme as ThemeType)}
                      >
                        <span
                          className={`${dataSharing ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform ${dataSharing ? (theme === 'dark' ? 'bg-gray-900' : 'bg-white') : (theme === 'dark' && !dataSharing ? 'bg-gray-800' : 'bg-white')} rounded-full transition`}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'notifications' && (
                <div className='flex flex-col space-y-4'>
                  <h4 className={`${textSizes.subtitle} font-medium text-gray-800 dark:text-gray-200`}>Notification Settings</h4>
                  <p className={`${textSizes.body} text-gray-600 dark:text-gray-400`}>Manage your notification preferences below.</p>
                  <div className='flex items-center justify-between'>
                    <span className={`${textSizes.body} text-gray-600 dark:text-gray-400`}>Email Notifications</span>
                    <Switch
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                      className={getToggleClasses(notifications, theme as ThemeType)}
                    >
                      <span
                        className={`${notifications ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform ${notifications ? (theme === 'dark' ? 'bg-gray-900' : 'bg-white') : (theme === 'dark' && !notifications ? 'bg-gray-800' : 'bg-white')} rounded-full transition`}
                      />
                    </Switch>
                  </div>
                </div>
              )}
              {activeTab === 'integrations' && (
                <div>
                  <h2 className='text-lg font-semibold'>Integrations</h2>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>Manage your integrations here.</p>
                  {/* Add integration management components or links here */}
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProfileModal;