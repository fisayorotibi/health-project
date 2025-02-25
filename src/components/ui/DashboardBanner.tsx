'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Search, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Command, 
  Bell, 
  X, 
  ChevronRight,
  AlertCircle,
  Calendar,
  FileText,
  Pill,
  ClipboardList,
  MoreHorizontal,
  CheckCircle2
} from 'lucide-react';
import { Heading2, Paragraph, SmallParagraph, Caption } from '@/components/ui/typography';
import Link from 'next/link';
import { useThemeContext } from '@/components/ThemeProvider';

interface InsightItem {
  id: string;
  text: string;
  priority: 'urgent' | 'high' | 'normal';
  link: string;
}

interface DashboardBannerProps {
  userName: string;
  insights?: InsightItem[];
  onSearch?: (query: string) => void;
}

const DashboardBanner: React.FC<DashboardBannerProps> = ({
  userName = 'Doctor',
  insights = [],
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [expandedNotifications, setExpandedNotifications] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme } = useThemeContext();
  const isLightTheme = resolvedTheme === 'light';
  
  // Force re-render when theme changes
  useEffect(() => {
    // This empty effect will cause the component to re-evaluate when resolvedTheme changes
  }, [resolvedTheme]);
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      
      // Command/Ctrl + / to toggle focus mode
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setFocusMode(!focusMode);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusMode]);
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Format time in 12-hour format
  const getFormattedTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  // Toggle voice listening (placeholder for actual implementation)
  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real implementation, this would activate the browser's speech recognition API
  };

  // Count insights by priority
  const urgentCount = insights.filter(insight => insight.priority === 'urgent').length;
  const highCount = insights.filter(insight => insight.priority === 'high').length;
  const normalCount = insights.filter(insight => insight.priority === 'normal').length;
  
  // Get today's date in a readable format
  const getTodayDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Quick actions based on common healthcare workflows
  const quickActions = [
    { icon: <Calendar className="w-3.5 h-3.5" />, label: "Today's appointments" },
    { icon: <AlertCircle className="w-3.5 h-3.5" />, label: "Urgent lab results" },
    { icon: <FileText className="w-3.5 h-3.5" />, label: "Patient records" },
    { icon: <Pill className="w-3.5 h-3.5" />, label: "Prescriptions" }
  ];
  
  // Group insights by type for smart summary
  const getGroupedInsights = () => {
    const labResults = insights.filter(i => i.text.toLowerCase().includes('lab result'));
    const prescriptions = insights.filter(i => i.text.toLowerCase().includes('prescription'));
    const appointments = insights.filter(i => i.text.toLowerCase().includes('appointment'));
    const other = insights.filter(i => 
      !i.text.toLowerCase().includes('lab result') && 
      !i.text.toLowerCase().includes('prescription') && 
      !i.text.toLowerCase().includes('appointment')
    );
    
    return { labResults, prescriptions, appointments, other };
  };
  
  const groupedInsights = getGroupedInsights();
  
  // Determine if we should show the notification summary section
  const hasNotifications = insights.length > 0;

  return (
    <div 
      key={`banner-${resolvedTheme}`}
      className={`relative mb-8 overflow-hidden rounded-xl ${
      isLightTheme 
        ? 'bg-gradient-to-br from-sky-50 to-white text-gray-800' 
        : 'bg-[#121212] dark:bg-[#121212] text-white'
    } z-0 transition-colors duration-300 ease-in-out ${
      focusMode ? 'shadow-lg ring-1 ring-primary-500/20' : ''
    }`}>
      {/* Subtle gradient background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 transition-colors duration-300 ease-in-out">
        <div className={`absolute top-0 left-1/4 w-64 h-64 rounded-full ${
          isLightTheme 
            ? 'bg-blue-400 blur-3xl' 
            : 'bg-primary-500 dark:bg-primary-600 blur-3xl'
        } transform -translate-y-1/2 transition-colors duration-300 ease-in-out`}></div>
        <div className={`absolute bottom-0 right-1/4 w-64 h-64 rounded-full ${
          isLightTheme 
            ? 'bg-blue-400 blur-3xl' 
            : 'bg-primary-500 dark:bg-primary-600 blur-3xl'
        } transform translate-y-1/2 transition-colors duration-300 ease-in-out`}></div>
      </div>
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      
      <div className="relative z-0 px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center">
                <Paragraph className={`${isLightTheme ? 'text-gray-800' : 'text-gray-300'} font-medium`}>
                  {getGreeting()}, {userName}
                </Paragraph>
              </div>
              <SmallParagraph className={`${isLightTheme ? 'text-gray-600' : 'text-gray-500'} mt-1 flex items-center`}>
                {getTodayDate()} <span className="mx-2">•</span> <Clock className="w-3.5 h-3.5 mr-1.5" /> {getFormattedTime()}
              </SmallParagraph>
            </div>
            
            {/* Focus mode toggle */}
            <button 
              onClick={() => setFocusMode(!focusMode)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center ${
                focusMode 
                  ? isLightTheme 
                    ? 'bg-primary-100 text-primary-700 shadow-sm' 
                    : 'bg-primary-500/20 text-primary-300 shadow-sm'
                  : isLightTheme 
                    ? 'bg-white text-gray-600 shadow-sm hover:bg-gray-50' 
                  : 'bg-[#1E1E1E] text-gray-400 shadow-sm hover:bg-[#242424]'
              }`}
              aria-label={focusMode ? "Disable focus mode" : "Enable focus mode"}
            >
              {focusMode ? (
                <>
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  Focus mode
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  Focus mode
                </>
              )}
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Notification indicator */}
            {hasNotifications && (
              <button 
                onClick={() => setExpandedNotifications(!expandedNotifications)}
                className={`relative flex items-center ${
                  isLightTheme 
                    ? 'text-gray-600 bg-white' 
                    : 'text-gray-400 dark:text-gray-500 bg-[#1A1A1A]'
                } px-3 py-1.5 rounded-full shadow-sm ${
                  expandedNotifications 
                    ? isLightTheme 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'bg-primary-500/10 text-primary-400'
                    : isLightTheme 
                      ? 'hover:bg-gray-50' 
                    : 'hover:bg-[#242424]'
                }`}
              >
                <Bell className="w-3.5 h-3.5 mr-1.5" />
                <Caption>{insights.length}</Caption>
                {urgentCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
            )}
          </div>
        </div>
        
        <div>
          <form onSubmit={handleSearch} className="relative">
            <div className={`flex items-center ${
              isLightTheme 
                ? 'bg-white' 
                : 'bg-[#1E1E1E] dark:bg-[#1E1E1E]'
            } rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-primary-500/30 transition-all`}>
              <div className={`flex items-center pl-4 ${isLightTheme ? 'text-gray-500' : 'text-gray-400'}`}>
                <Search className="w-4 h-4" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patients, records, or prescriptions..."
                className={`w-full py-3 px-3 bg-transparent ${
                  isLightTheme 
                    ? 'text-gray-800 placeholder-gray-400' 
                    : 'text-white placeholder-gray-500'
                } focus:outline-none text-sm`}
              />
              <div className="hidden md:flex items-center mr-2">
                <kbd className={`px-1.5 py-0.5 text-xs ${
                  isLightTheme 
                    ? 'text-gray-500 bg-gray-100' 
                    : 'text-gray-500 bg-[#252525]'
                } rounded shadow-sm`}>⌘K</kbd>
              </div>
              <button
                type="button"
                onClick={toggleListening}
                className={`px-4 ${
                  isLightTheme 
                    ? 'text-gray-500 hover:text-primary-600' 
                    : 'text-gray-400 hover:text-primary-400'
                } transition-colors ${isListening ? 'text-primary-600' : ''}`}
                aria-label="Voice search"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
        
        {/* Quick actions - always visible but simplified */}
        <div className="mt-5 flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <button 
              key={index}
              className={`px-3 py-1.5 ${
                isLightTheme 
                  ? 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm' 
                  : 'bg-[#1E1E1E] hover:bg-[#242424] text-gray-300 shadow-sm'
              } rounded-lg text-sm transition-colors flex items-center`}
            >
              <span className="text-primary-500 mr-1.5">{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
        
        {/* Smart Notification Summary - conditionally rendered based on focus mode and expandedNotifications */}
        {hasNotifications && (expandedNotifications || focusMode) && (
          <div className={`mt-6 ${
            isLightTheme 
              ? 'bg-white rounded-lg shadow-md' 
              : 'bg-[#1A1A1A] rounded-lg shadow-md'
          } overflow-hidden`}>
            <div className={`flex items-center justify-between px-4 py-3 ${
              isLightTheme 
                ? 'bg-gray-50' 
                : 'bg-[#222222]'
            }`}>
              <div className="flex items-center">
                {focusMode ? (
                  <SmallParagraph className={`${
                    isLightTheme ? 'text-gray-800' : 'text-gray-300'
                  } font-medium flex items-center`}>
                    <Sparkles className="w-3.5 h-3.5 mr-2 text-primary-500" />
                    Focus Mode
                  </SmallParagraph>
                ) : (
                  <SmallParagraph className={`${
                    isLightTheme ? 'text-gray-800' : 'text-gray-300'
                  } font-medium flex items-center`}>
                    <ClipboardList className={`w-3.5 h-3.5 mr-2 ${
                      isLightTheme ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    Notifications
                  </SmallParagraph>
                )}
                
                {urgentCount > 0 && (
                  <span className={`ml-2 px-1.5 py-0.5 text-xs ${
                    isLightTheme 
                      ? 'bg-red-50 text-red-700 border border-red-100' 
                      : 'bg-red-900/30 text-red-300 border border-red-800/30'
                  } rounded`}>
                    {urgentCount} urgent
                  </span>
                )}
              </div>
              <button 
                onClick={() => {
                  if (focusMode) {
                    setFocusMode(false);
                  } else {
                    setExpandedNotifications(false);
                  }
                }}
                className={`${isLightTheme ? 'text-gray-500 hover:text-gray-700' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Smart grouping of notifications */}
              {focusMode ? (
                // Focus mode only shows urgent matters
                <>
                  <Caption className={`${isLightTheme ? 'text-gray-500' : 'text-gray-500'} mb-2 block`}>
                    Showing only urgent matters. Other notifications are temporarily hidden.
                  </Caption>
                  
                  <div className="space-y-2">
                    {insights
                      .filter(insight => insight.priority === 'urgent')
                      .map((insight) => (
                        <Link 
                          key={insight.id}
                          href={insight.link}
                          className={`flex items-center ${
                            isLightTheme 
                              ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200' 
                              : 'bg-[#242424] hover:bg-[#2A2A2A] border border-[#333333]'
                          } rounded-lg px-4 py-3 transition-colors group`}
                        >
                          <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0 bg-red-500 animate-pulse"></div>
                          <SmallParagraph className={`${
                            isLightTheme ? 'text-gray-800' : 'text-gray-200'
                          } flex-1`}>{insight.text}</SmallParagraph>
                          <ChevronRight className={`w-4 h-4 ${
                            isLightTheme 
                              ? 'text-gray-400 group-hover:text-gray-600' 
                              : 'text-gray-500 group-hover:text-gray-300'
                          }`} />
                        </Link>
                      ))}
                    
                    {insights.filter(insight => insight.priority === 'urgent').length === 0 && (
                      <div className="flex items-center justify-center py-6 text-center">
                        <div>
                          <div className={`mx-auto w-10 h-10 rounded-full ${
                            isLightTheme ? 'bg-gray-100' : 'bg-[#242424]'
                          } flex items-center justify-center mb-2`}>
                            <CheckCircle2 className={`w-5 h-5 ${
                              isLightTheme ? 'text-gray-500' : 'text-gray-500'
                            }`} />
                          </div>
                          <SmallParagraph className={`${
                            isLightTheme ? 'text-gray-600' : 'text-gray-400'
                          }`}>No urgent matters right now</SmallParagraph>
                          <Caption className="text-gray-500 mt-1">You're all caught up!</Caption>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Regular mode shows smart grouping
                <>
                  {/* Lab Results Group */}
                  {groupedInsights.labResults.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <SmallParagraph className={`${
                          isLightTheme ? 'text-gray-600' : 'text-gray-400'
                        } font-medium`}>Lab Results</SmallParagraph>
                        {groupedInsights.labResults.length > 1 && (
                          <Link href="/medical-records" className={`text-xs ${
                            isLightTheme ? 'text-primary-600 hover:text-primary-700' : 'text-primary-400 hover:text-primary-300'
                          }`}>
                            View all ({groupedInsights.labResults.length})
                          </Link>
                        )}
                      </div>
                      
                      {groupedInsights.labResults.slice(0, 2).map((insight) => (
                        <Link 
                          key={insight.id}
                          href={insight.link}
                          className={`flex items-center ${
                            isLightTheme 
                              ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200' 
                              : 'bg-[#242424] hover:bg-[#2A2A2A] border border-[#333333]'
                          } rounded-lg px-4 py-2.5 transition-colors group`}
                        >
                          <div className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                            insight.priority === 'urgent' ? 'bg-red-500 animate-pulse' : 
                            insight.priority === 'high' ? 'bg-amber-500' : 'bg-blue-500'
                          }`}></div>
                          <SmallParagraph className={`${
                            isLightTheme ? 'text-gray-800' : 'text-gray-200'
                          } flex-1`}>{insight.text}</SmallParagraph>
                          <ChevronRight className={`w-4 h-4 ${
                            isLightTheme 
                              ? 'text-gray-400 group-hover:text-gray-600' 
                              : 'text-gray-500 group-hover:text-gray-300'
                          }`} />
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* Prescriptions Group */}
                  {groupedInsights.prescriptions.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <SmallParagraph className={`${
                          isLightTheme ? 'text-gray-600' : 'text-gray-400'
                        } font-medium`}>Prescriptions</SmallParagraph>
                        {groupedInsights.prescriptions.length > 1 && (
                          <Link href="/prescriptions" className={`text-xs ${
                            isLightTheme ? 'text-primary-600 hover:text-primary-700' : 'text-primary-400 hover:text-primary-300'
                          }`}>
                            View all ({groupedInsights.prescriptions.length})
                          </Link>
                        )}
                      </div>
                      
                      {groupedInsights.prescriptions.slice(0, 2).map((insight) => (
                        <Link 
                          key={insight.id}
                          href={insight.link}
                          className={`flex items-center ${
                            isLightTheme 
                              ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200' 
                              : 'bg-[#242424] hover:bg-[#2A2A2A] border border-[#333333]'
                          } rounded-lg px-4 py-2.5 transition-colors group`}
                        >
                          <div className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                            insight.priority === 'urgent' ? 'bg-red-500 animate-pulse' : 
                            insight.priority === 'high' ? 'bg-amber-500' : 'bg-blue-500'
                          }`}></div>
                          <SmallParagraph className={`${
                            isLightTheme ? 'text-gray-800' : 'text-gray-200'
                          } flex-1`}>{insight.text}</SmallParagraph>
                          <ChevronRight className={`w-4 h-4 ${
                            isLightTheme 
                              ? 'text-gray-400 group-hover:text-gray-600' 
                              : 'text-gray-500 group-hover:text-gray-300'
                          }`} />
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* Appointments Group */}
                  {groupedInsights.appointments.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <SmallParagraph className={`${
                          isLightTheme ? 'text-gray-600' : 'text-gray-400'
                        } font-medium`}>Appointments</SmallParagraph>
                        {groupedInsights.appointments.length > 1 && (
                          <Link href="/schedule" className={`text-xs ${
                            isLightTheme ? 'text-primary-600 hover:text-primary-700' : 'text-primary-400 hover:text-primary-300'
                          }`}>
                            View all ({groupedInsights.appointments.length})
                          </Link>
                        )}
                      </div>
                      
                      {groupedInsights.appointments.slice(0, 2).map((insight) => (
                        <Link 
                          key={insight.id}
                          href={insight.link}
                          className={`flex items-center ${
                            isLightTheme 
                              ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200' 
                              : 'bg-[#242424] hover:bg-[#2A2A2A] border border-[#333333]'
                          } rounded-lg px-4 py-2.5 transition-colors group`}
                        >
                          <div className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                            insight.priority === 'urgent' ? 'bg-red-500 animate-pulse' : 
                            insight.priority === 'high' ? 'bg-amber-500' : 'bg-blue-500'
                          }`}></div>
                          <SmallParagraph className={`${
                            isLightTheme ? 'text-gray-800' : 'text-gray-200'
                          } flex-1`}>{insight.text}</SmallParagraph>
                          <ChevronRight className={`w-4 h-4 ${
                            isLightTheme 
                              ? 'text-gray-400 group-hover:text-gray-600' 
                              : 'text-gray-500 group-hover:text-gray-300'
                          }`} />
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* Other Notifications */}
                  {groupedInsights.other.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <SmallParagraph className={`${
                          isLightTheme ? 'text-gray-600' : 'text-gray-400'
                        } font-medium`}>Other Notifications</SmallParagraph>
                      </div>
                      
                      {groupedInsights.other.slice(0, 2).map((insight) => (
                        <Link 
                          key={insight.id}
                          href={insight.link}
                          className={`flex items-center ${
                            isLightTheme 
                              ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200' 
                              : 'bg-[#242424] hover:bg-[#2A2A2A] border border-[#333333]'
                          } rounded-lg px-4 py-2.5 transition-colors group`}
                        >
                          <div className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                            insight.priority === 'urgent' ? 'bg-red-500 animate-pulse' : 
                            insight.priority === 'high' ? 'bg-amber-500' : 'bg-blue-500'
                          }`}></div>
                          <SmallParagraph className={`${
                            isLightTheme ? 'text-gray-800' : 'text-gray-200'
                          } flex-1`}>{insight.text}</SmallParagraph>
                          <ChevronRight className={`w-4 h-4 ${
                            isLightTheme 
                              ? 'text-gray-400 group-hover:text-gray-600' 
                              : 'text-gray-500 group-hover:text-gray-300'
                          }`} />
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Footer with view all link */}
            {!focusMode && insights.length > 0 && (
              <div className={`px-4 py-3 border-t ${
                isLightTheme 
                  ? 'border-gray-200 bg-gray-50' 
                  : 'border-[#2A2A2A] bg-[#1E1E1E]'
              }`}>
                <Link 
                  href="/notifications" 
                  className={`flex items-center justify-center text-sm ${
                    isLightTheme 
                      ? 'text-primary-600 hover:text-primary-700' 
                      : 'text-primary-400 hover:text-primary-300'
                  }`}
                >
                  <span>View all notifications</span>
                  <ArrowRight className="w-3 h-3 ml-1.5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBanner; 