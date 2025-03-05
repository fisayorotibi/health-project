import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Dialog } from '@headlessui/react';
import { 
  X, 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Search,
  Loader2,
  LinkIcon,
  UserPlus,
  Clipboard,
  ClipboardCheck
} from 'lucide-react';
import { Heading3, Paragraph, SmallParagraph, Label, Typography } from '@/components/ui/typography';
import { Patient } from '@/types';

// Define a type system for text sizes (matching ProfileModal)
const textSizes = {
  title: 'text-lg',
  subtitle: 'text-sm',
  body: 'text-xs',
  link: 'text-xs',
};

// Form field component for consistent styling
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}

const FormField = ({ label, children, required = false, error }: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label className={`${textSizes.body} block font-medium text-gray-700 dark:text-gray-300 mb-1`}>
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
      {error && <p className={`${textSizes.body} text-danger mt-1`}>{error}</p>}
    </div>
  );
};

// Button component for consistent styling
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  icon,
  className = '',
  ...props 
}: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:text-white dark:hover:bg-primary/90",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-dark-surface-secondary dark:text-dark-text-primary dark:hover:bg-dark-surface-tertiary",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-dark-border dark:text-dark-text-primary dark:hover:bg-dark-surface-secondary",
    ghost: "bg-transparent hover:bg-gray-100 dark:text-dark-text-primary dark:hover:bg-dark-surface-secondary",
    danger: "bg-danger text-white hover:bg-danger/90 dark:bg-danger dark:text-white dark:hover:bg-danger/90"
  };
  
  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-md"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// Input component for consistent styling
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = ({ icon, className = '', ...props }: InputProps) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <input
        className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm transition-colors 
                   focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                   dark:border-dark-border dark:bg-dark-surface-secondary dark:text-dark-text-primary
                   dark:focus:border-primary dark:focus:ring-primary
                   ${icon ? 'pl-10' : ''}
                   ${className}`}
        {...props}
      />
    </div>
  );
};

// Select component for consistent styling
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

const Select = ({ options, className = '', ...props }: SelectProps) => {
  return (
    <select
      className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm transition-colors 
                 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                 dark:border-dark-border dark:bg-dark-surface-secondary dark:text-dark-text-primary
                 dark:focus:border-primary dark:focus:ring-primary
                 ${className}`}
      {...props}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// Main modal component
interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (patient: Partial<Patient>) => void;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose, onAddPatient }) => {
  // State for multi-step form
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5; // Increased from 3 to 5 steps
  
  // Form state
  const [formData, setFormData] = useState<Partial<Patient>>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: undefined,
    phoneNumber: '',
    email: '',
    address: '',
    bloodType: '',
    allergies: [],
  });
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // PHR sync state
  const [phrCode, setPhrCode] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [syncError, setSyncError] = useState('');
  
  // Mode selection state
  const [phrMode, setPhrMode] = useState<'sync' | 'manual'>('sync');
  
  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: undefined,
        phoneNumber: '',
        email: '',
        address: '',
        bloodType: '',
        allergies: [],
      });
      setPhrCode('');
      setSyncSuccess(false);
      setSyncError('');
      setPhrMode('sync');
    }
  }, [isOpen]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle allergies input (comma-separated)
  const handleAllergiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allergiesText = e.target.value;
    const allergiesArray = allergiesText.split(',').map(item => item.trim()).filter(Boolean);
    
    setFormData((prev) => ({ ...prev, allergies: allergiesArray }));
  };
  
  // Validate form data for current step - wrapped in useCallback to prevent re-renders
  const validateCurrentStep = useCallback((): { isValid: boolean; errors: Record<string, string> } => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 0) {
      // Mode selection step - no validation needed
      return { isValid: true, errors: {} };
    } else if (currentStep === 1 && phrMode === 'sync') {
      // PHR code input step
      if (!phrCode.trim()) {
        newErrors.phrCode = 'Please enter a PHR code';
      }
    } else if ((currentStep === 1 && phrMode === 'manual') || (currentStep === 2 && phrMode === 'sync')) {
      // Basic personal information step
      if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    } else if ((currentStep === 2 && phrMode === 'manual') || (currentStep === 3 && phrMode === 'sync')) {
      // Demographics step
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    } else if ((currentStep === 3 && phrMode === 'manual') || (currentStep === 4 && phrMode === 'sync')) {
      // Contact information step
      if (!formData.phoneNumber?.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else if ((currentStep === 4 && phrMode === 'manual') || (currentStep === 5 && phrMode === 'sync')) {
      // Address and medical information step
      if (!formData.address?.trim()) newErrors.address = 'Address is required';
    }
    
    // Return validation result and errors
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  }, [currentStep, phrMode, phrCode, formData]);

  // Memoize the validation result to prevent recalculation on every render
  const validationResult = useMemo(() => {
    return validateCurrentStep();
  }, [validateCurrentStep]);
  
  // Update errors state when validation result changes
  useEffect(() => {
    setErrors(validationResult.errors);
  }, [validationResult]);
  
  // Handle next step
  const handleNextStep = () => {
    if (validationResult.isValid) {
      if (currentStep === 0) {
        // If user selected manual mode, skip the PHR code input step
        if (phrMode === 'manual') {
          setCurrentStep(1);
        } else {
          setCurrentStep(1);
        }
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      }
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep === 1 && phrMode === 'sync') {
      // Go back to mode selection
      setCurrentStep(0);
    } else {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    }
  };
  
  // Handle PHR code sync
  const handlePhrSync = async () => {
    if (!phrCode.trim()) {
      setSyncError('Please enter a valid PHR code');
      return;
    }
    
    setIsSyncing(true);
    setSyncError('');
    
    try {
      // Simulate API call to sync PHR data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful sync with sample data
      if (phrCode === '123456') {
        setFormData({
          firstName: 'Jane',
          lastName: 'Smith',
          dateOfBirth: '1990-05-15',
          gender: 'female',
          phoneNumber: '+1 (555) 987-6543',
          email: 'jane.smith@example.com',
          address: '456 Oak Avenue, Cityville, CA 94321',
          bloodType: 'O+',
          allergies: ['Sulfa', 'Latex'],
        });
        setSyncSuccess(true);
      } else {
        setSyncError('Invalid PHR code. Please try again or proceed with manual entry.');
      }
    } catch (error) {
      setSyncError('Failed to sync PHR data. Please try again or proceed with manual entry.');
    } finally {
      setIsSyncing(false);
    }
  };
  
  // Handle continuing after successful PHR sync
  const handleContinueAfterSync = () => {
    if (syncSuccess) {
      // Skip to the review step (last step)
      setCurrentStep(2);
    } else {
      // Try to sync first
      handlePhrSync();
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validationResult.isValid) {
      onAddPatient(formData);
      onClose();
    }
  };
  
  // Generate a random PHR code for demo purposes
  const generateRandomPhrCode = () => {
    return '123456'; // For demo, always return the code that works
  };
  
  // Copy PHR code to clipboard
  const handleCopyCode = () => {
    const code = generateRandomPhrCode();
    navigator.clipboard.writeText(code);
    setPhrCode(code);
  };
  
  // Get step title based on current step and mode
  const getStepTitle = (): string => {
    if (currentStep === 0) {
      return 'Choose an Option';
    } else if (currentStep === 1 && phrMode === 'sync') {
        return 'Sync with Personal Health Record';
    } else if ((currentStep === 1 && phrMode === 'manual') || (currentStep === 2 && phrMode === 'sync')) {
        return 'Basic Information';
    } else if ((currentStep === 2 && phrMode === 'manual') || (currentStep === 3 && phrMode === 'sync')) {
        return 'Demographics';
    } else if ((currentStep === 3 && phrMode === 'manual') || (currentStep === 4 && phrMode === 'sync')) {
        return 'Contact Details';
    } else if ((currentStep === 4 && phrMode === 'manual') || (currentStep === 5 && phrMode === 'sync')) {
        return 'Address & Medical Info';
    } else {
        return 'Add Patient';
    }
  };
  
  // Get step icon based on current step and mode
  const getStepIcon = () => {
    if (currentStep === 0) {
      return <UserPlus className="h-6 w-6 text-white" />;
    } else if (currentStep === 1 && phrMode === 'sync') {
        return <LinkIcon className="h-6 w-6 text-white" />;
    } else if ((currentStep === 1 && phrMode === 'manual') || (currentStep === 2 && phrMode === 'sync')) {
        return <User className="h-6 w-6 text-white" />;
    } else if ((currentStep === 2 && phrMode === 'manual') || (currentStep === 3 && phrMode === 'sync')) {
        return <Calendar className="h-6 w-6 text-white" />;
    } else if ((currentStep === 3 && phrMode === 'manual') || (currentStep === 4 && phrMode === 'sync')) {
        return <Phone className="h-6 w-6 text-white" />;
    } else if ((currentStep === 4 && phrMode === 'manual') || (currentStep === 5 && phrMode === 'sync')) {
        return <MapPin className="h-6 w-6 text-white" />;
    } else {
        return <User className="h-6 w-6 text-white" />;
    }
  };
  
  // Get step description based on current step and mode
  const getStepDescription = (): string => {
    if (currentStep === 0) {
      return 'Select how you want to add this patient';
    } else if (currentStep === 1 && phrMode === 'sync') {
      return 'Enter the patient\'s PHR code to import their data';
    } else if ((currentStep === 1 && phrMode === 'manual') || (currentStep === 2 && phrMode === 'sync')) {
      return 'Enter the patient\'s name information';
    } else if ((currentStep === 2 && phrMode === 'manual') || (currentStep === 3 && phrMode === 'sync')) {
      return 'Enter the patient\'s demographic information';
    } else if ((currentStep === 3 && phrMode === 'manual') || (currentStep === 4 && phrMode === 'sync')) {
      return 'Enter the patient\'s contact details';
    } else if ((currentStep === 4 && phrMode === 'manual') || (currentStep === 5 && phrMode === 'sync')) {
      return 'Enter the patient\'s address and medical information';
    } else {
        return '';
    }
  };
  
  // Get the actual form step (regardless of mode)
  const getFormStep = (): number => {
    if (phrMode === 'sync') {
      if (currentStep === 0) return 0;
      if (currentStep === 1) return 1;
      if (currentStep === 2) return 2;
      if (currentStep === 3) return 3;
      return 0;
    } else {
      // Manual mode skips the PHR code step
      if (currentStep === 0) return 0;
      if (currentStep === 1) return 1;
      if (currentStep === 2) return 2;
      if (currentStep === 3) return 3;
      return 0;
    }
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
        <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md relative shadow-lg border border-gray-300 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between mb-4 px-6 pt-5">
            <Dialog.Title className={`${textSizes.title} font-medium text-gray-900 dark:text-gray-100`}>
              {getStepTitle()}
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="px-6 pb-6">
            <p className={`${textSizes.body} text-gray-600 dark:text-gray-400 mb-6`}>
              {getStepDescription()}
            </p>
            
            {/* Step content */}
            <div className="space-y-6">
              {/* Step 0: Mode Selection */}
              {currentStep === 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Option 1: Sync with PHR */}
                  <div 
                    className={`
                      relative p-5 rounded-lg border transition-all duration-200 cursor-pointer
                      ${phrMode === 'sync' 
                        ? 'border-gray-600 bg-gray-100 dark:bg-gray-800 shadow-sm' 
                        : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}
                    `}
                    onClick={() => setPhrMode('sync')}
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3">
                        <LinkIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      </div>
                      <span className={`${textSizes.subtitle} font-medium text-gray-900 dark:text-white`}>Sync with PHR</span>
                    </div>
                    <p className={`${textSizes.body} text-gray-600 dark:text-gray-400`}>
                      Import patient data from an existing Personal Health Record
                    </p>
                    {phrMode === 'sync' && (
                      <div className="absolute top-3 right-3 text-gray-700 dark:text-gray-300">
                        <Check className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  {/* Option 2: Create from scratch */}
                  <div 
                    className={`
                      relative p-5 rounded-lg border transition-all duration-200 cursor-pointer
                      ${phrMode === 'manual' 
                        ? 'border-gray-600 bg-gray-100 dark:bg-gray-800 shadow-sm' 
                        : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}
                    `}
                    onClick={() => setPhrMode('manual')}
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3">
                        <UserPlus className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      </div>
                      <span className={`${textSizes.subtitle} font-medium text-gray-900 dark:text-white`}>Create New</span>
                    </div>
                    <p className={`${textSizes.body} text-gray-600 dark:text-gray-400`}>
                      Create a new patient record manually
                    </p>
                    {phrMode === 'manual' && (
                      <div className="absolute top-3 right-3 text-gray-700 dark:text-gray-300">
                        <Check className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 1 (Sync Mode): PHR Code Input */}
              {currentStep === 1 && phrMode === 'sync' && (
                <div className="bg-gray-50 dark:bg-dark-surface-secondary p-5 rounded-lg border border-gray-200 dark:border-gray-800 animate-fadeIn">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mr-3">
                        <Clipboard className="h-4 w-4 text-primary" />
                      </div>
                      <Label className="text-base">Patient's PHR Code</Label>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={phrCode}
                        onChange={(e) => setPhrCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        className="flex-1 text-lg font-mono tracking-wider text-center"
                      />
                      <Button 
                        onClick={handleCopyCode} 
                        variant="outline" 
                        size="sm"
                        title="For demo: Copy a working code"
                      >
                        <ClipboardCheck className="h-4 w-4" />
                      </Button>
                    </div>
                  {errors.phrCode && (
                    <SmallParagraph className="text-danger mt-2">{errors.phrCode}</SmallParagraph>
                  )}
                    <SmallParagraph className="text-gray-500 dark:text-dark-text-secondary mt-3">
                      Ask the patient for their 6-digit PHR code from their patient portal.
                    </SmallParagraph>
                  </div>
                  )}
                  
              {syncError && currentStep === 1 && phrMode === 'sync' && (
                    <div className="bg-danger/10 text-danger p-4 rounded-lg text-sm flex items-start border border-danger/20 mt-4 animate-fadeIn">
                      <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{syncError}</span>
                    </div>
                  )}
                  
              {syncSuccess && currentStep === 1 && phrMode === 'sync' && (
                    <div className="bg-success/10 text-success p-4 rounded-lg text-sm flex items-start border border-success/20 mt-4 animate-fadeIn">
                      <Check className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">PHR data successfully synced!</p>
                        <p className="mt-1">You can review and edit the information in the next steps.</p>
                      </div>
                    </div>
              )}
              
              {/* Step 1 (Manual) or Step 2 (Sync): Basic Information */}
              {((currentStep === 1 && phrMode === 'manual') || (currentStep === 2 && phrMode === 'sync')) && (
                <div className="grid grid-cols-2 gap-5">
                  <FormField label="First Name" required error={errors.firstName}>
                    <Input
                      name="firstName"
                      value={formData.firstName || ''}
                      onChange={handleChange}
                      placeholder="First name"
                      icon={<User className="h-4 w-4" />}
                    />
                  </FormField>
                  
                  <FormField label="Last Name" required error={errors.lastName}>
                    <Input
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleChange}
                      placeholder="Last name"
                      icon={<User className="h-4 w-4" />}
                    />
                  </FormField>
                </div>
              )}
              
              {/* Step 2 (Manual) or Step 3 (Sync): Demographics */}
              {((currentStep === 2 && phrMode === 'manual') || (currentStep === 3 && phrMode === 'sync')) && (
                <>
                  <FormField label="Date of Birth" required error={errors.dateOfBirth}>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth || ''}
                      onChange={handleChange}
                      icon={<Calendar className="h-4 w-4" />}
                    />
                  </FormField>
                  
                  <FormField label="Gender" required error={errors.gender}>
                    <Select
                      name="gender"
                      value={formData.gender || ''}
                      onChange={handleChange}
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' },
                      ]}
                    />
                  </FormField>
                </>
              )}
              
              {/* Step 3 (Manual) or Step 4 (Sync): Contact Information */}
              {((currentStep === 3 && phrMode === 'manual') || (currentStep === 4 && phrMode === 'sync')) && (
                <>
                  <FormField label="Phone Number" required error={errors.phoneNumber}>
                    <Input
                      name="phoneNumber"
                      value={formData.phoneNumber || ''}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      icon={<Phone className="h-4 w-4" />}
                    />
                  </FormField>
                  
                  <FormField label="Email Address" error={errors.email}>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      placeholder="patient@example.com"
                      icon={<Mail className="h-4 w-4" />}
                    />
                  </FormField>
                </>
              )}
              
              {/* Step 4 (Manual) or Step 5 (Sync): Address and Medical Information */}
              {((currentStep === 4 && phrMode === 'manual') || (currentStep === 5 && phrMode === 'sync')) && (
                <>
                  <FormField label="Address" required error={errors.address}>
                    <Input
                      name="address"
                      value={formData.address || ''}
                      onChange={handleChange}
                      placeholder="123 Main St, City, State, ZIP"
                      icon={<MapPin className="h-4 w-4" />}
                    />
                  </FormField>
                  
                  <FormField label="Blood Type" error={errors.bloodType}>
                    <Select
                      name="bloodType"
                      value={formData.bloodType || ''}
                      onChange={handleChange}
                      options={[
                        { value: 'A+', label: 'A+' },
                        { value: 'A-', label: 'A-' },
                        { value: 'B+', label: 'B+' },
                        { value: 'B-', label: 'B-' },
                        { value: 'AB+', label: 'AB+' },
                        { value: 'AB-', label: 'AB-' },
                        { value: 'O+', label: 'O+' },
                        { value: 'O-', label: 'O-' },
                      ]}
                    />
                  </FormField>
                  
                  <FormField label="Allergies (comma-separated)" error={errors.allergies}>
                    <Input
                      name="allergies"
                      value={formData.allergies?.join(', ') || ''}
                      onChange={handleAllergiesChange}
                      placeholder="e.g. Penicillin, Peanuts, Latex"
                      icon={<AlertTriangle className="h-4 w-4" />}
                    />
                  </FormField>
                </>
              )}
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 0 ? (
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 4 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!validationResult.isValid}
                    className="flex items-center px-4 py-2 text-xs font-medium text-white bg-gray-700 border border-gray-700 rounded-md shadow-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    {currentStep === 0 ? (
                      phrMode === 'sync' ? 'Enter PHR Code' : 'Continue'
                    ) : (
                      'Continue'
                    )}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!validationResult.isValid}
                    className="flex items-center px-4 py-2 text-xs font-medium text-white bg-gray-700 border border-gray-700 rounded-md shadow-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Add Patient
                    <Check className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddPatientModal;
