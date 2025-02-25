'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Check, ChevronDown, Building, Briefcase } from 'lucide-react';
import { Paragraph, SmallParagraph } from '@/components/ui/typography';

type UserRole = 'doctor' | 'nurse' | 'admin' | 'patient';

interface SignupFormProps {
  onComplete: () => void;
}

export function SignupForm({ onComplete }: SignupFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('doctor');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  
  // Role-specific fields
  const [specialty, setSpecialty] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [hospital, setHospital] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate email and password
      if (!email || !password || !confirmPassword) {
        setError('All fields are required');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
      
      setError(null);
      setStep(2);
      return;
    }
    
    if (step === 2) {
      // Validate personal info
      if (!fullName || !role) {
        setError('All fields are required');
        return;
      }
      
      setError(null);
      setStep(3);
      return;
    }
    
    // Final step - submit the form
    setError(null);
    setIsLoading(true);

    try {
      // This is a placeholder for actual registration logic
      // In a real implementation, you would call your registration API here
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll just redirect to the login form
      onComplete();
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (): { strength: 'weak' | 'medium' | 'strong'; color: string } => {
    if (!password) return { strength: 'weak', color: 'bg-gray-200 dark:bg-gray-700' };
    
    if (password.length < 8) return { strength: 'weak', color: 'bg-red-500' };
    
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = 
      hasUppercase && hasLowercase && hasNumbers && hasSpecialChars
        ? 'strong'
        : (hasUppercase || hasLowercase) && (hasNumbers || hasSpecialChars)
          ? 'medium'
          : 'weak';
          
    const color = 
      strength === 'strong' ? 'bg-green-500' :
      strength === 'medium' ? 'bg-yellow-500' :
      'bg-red-500';
      
    return { strength, color };
  };

  const renderRoleSpecificFields = () => {
    switch (role) {
      case 'doctor':
        return (
          <>
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Medical Specialty
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="specialty"
                  name="specialty"
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="e.g. Cardiology, Pediatrics"
                />
              </div>
            </div>
            <div>
              <label htmlFor="license" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Medical License Number
              </label>
              <input
                id="license"
                name="license"
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Enter your license number"
              />
            </div>
          </>
        );
      case 'nurse':
        return (
          <>
            <div>
              <label htmlFor="license" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nursing License Number
              </label>
              <input
                id="license"
                name="license"
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Enter your license number"
              />
            </div>
          </>
        );
      case 'admin':
        return (
          <>
            <div>
              <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hospital or Clinic Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="hospital"
                  name="hospital"
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Enter your organization name"
                />
              </div>
            </div>
          </>
        );
      case 'patient':
        return null; // No additional fields for patients
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Paragraph className="font-medium text-gray-900 dark:text-white">Create your account</Paragraph>
        <SmallParagraph className="text-gray-500 dark:text-gray-400">
          {step === 1 ? 'Start with your email and password' : 
           step === 2 ? 'Tell us about yourself' : 
           'Complete your professional details'}
        </SmallParagraph>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
          <SmallParagraph className="text-red-600 dark:text-red-400">{error}</SmallParagraph>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Step 1: Email and Password */}
        {step === 1 && (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
              
              {/* Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Password strength:</span>
                    <span className="text-xs font-medium capitalize">
                      {passwordStrength().strength}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength().color} rounded-full transition-all duration-300`} 
                      style={{ 
                        width: passwordStrength().strength === 'weak' ? '33%' : 
                               passwordStrength().strength === 'medium' ? '66%' : '100%' 
                      }}
                    ></div>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <li className="flex items-center">
                      <span className={`mr-1 ${password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                        {password.length >= 8 ? <Check size={12} /> : '•'}
                      </span>
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                        {/[A-Z]/.test(password) ? <Check size={12} /> : '•'}
                      </span>
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 ${/\d/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                        {/\d/.test(password) ? <Check size={12} /> : '•'}
                      </span>
                      At least one number
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-red-300 dark:border-red-700'
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">Passwords do not match</p>
              )}
            </div>
          </>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Role
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="relative w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm pl-3 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                >
                  <span className="flex items-center">
                    <span className="block truncate text-gray-900 dark:text-white">{
                      role === 'doctor' ? 'Doctor / Physician' :
                      role === 'nurse' ? 'Nurse / Healthcare Provider' :
                      role === 'admin' ? 'Administrator / Manager' :
                      'Patient'
                    }</span>
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </button>

                {isRoleDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    <ul>
                      {[
                        { id: 'doctor', name: 'Doctor / Physician' },
                        { id: 'nurse', name: 'Nurse / Healthcare Provider' },
                        { id: 'admin', name: 'Administrator / Manager' },
                        { id: 'patient', name: 'Patient' },
                      ].map((option) => (
                        <li
                          key={option.id}
                          className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                            role === option.id ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-white'
                          }`}
                          onClick={() => {
                            setRole(option.id as UserRole);
                            setIsRoleDropdownOpen(false);
                          }}
                        >
                          <span className="block truncate">{option.name}</span>
                          {role === option.id && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                              <Check className="h-5 w-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Step 3: Role-specific Information */}
        {step === 3 && (
          <>
            {renderRoleSpecificFields()}
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-700 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step === 3 ? 2 : 1)}
              className="inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading || (step === 3 && !agreeToTerms)}
            className={`${step === 1 && 'w-full'} inline-flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
          >
            {isLoading ? 'Processing...' : 
             step === 3 ? 'Create Account' : 
             'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
} 