'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Check, ChevronDown, Building, Briefcase, X, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Paragraph, SmallParagraph } from '@/components/ui/typography';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { checkIfUserExists, createUserInDatabase } from '@/lib/db';

type UserRole = 'doctor' | 'nurse' | 'admin' | 'patient';

interface SignupFormProps {
  onComplete: () => void;
}

export function SignupForm({ onComplete }: SignupFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('doctor');
  const [showPassword, setShowPassword] = useState(false);
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
      if (!email || !password) {
        setError('All fields are required');
        return;
      }
      
      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
      
      // Check if password meets minimum strength requirements
      const { strength } = passwordStrength();
      if (strength === 'weak') {
        setError('Please create a stronger password');
        return;
      }
      
      // Check if the email already exists
      const response = await fetch('http://localhost:5000/api/users/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 409) {
        const data = await response.json();
        setError(data.error); // Notify user that the email already exists
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name: fullName,
          role: role.toUpperCase(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Signup error:', data);
        throw new Error(data.error || 'Failed to create account. Please try again.');
      }

      // Call onComplete to switch to login tab
      onComplete();
    } catch (err: unknown) {
      if (err instanceof Error) {
      setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'apple') => {
    setError(null);
    setIsLoading(true);

    try {
        if (provider === 'google') {
            const googleProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log('User signed up with Google:', user);

            // Call the new backend API to check if user exists and create if not
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                }),
            });

            if (response.status === 409) {
                const data = await response.json();
                throw new Error(data.error); // Notify user that they already exist
            }

            if (!response.ok) {
                throw new Error('Failed to create user in database.');
            }

            const { userExists } = await response.json();

            // Only call onComplete if the user is successfully created
            if (!userExists) {
                onComplete(); // Call onComplete to switch to the next step
            } else {
                setError('User already exists. Please log in.'); // Notify user
            }
        } else if (provider === 'apple') {
            // Handle Apple sign-in (if implemented)
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error during Google sign-up:', err); // Enhanced error logging
            setError(err.message || `Failed to sign up with ${provider}. Please try again.`);
        } else {
            setError(`Failed to sign up with ${provider}. Please try again.`);
        }
    } finally {
        setIsLoading(false);
    }
  };

  const passwordStrength = (): { strength: 'weak' | 'medium' | 'strong'; color: string; score: number } => {
    if (!password) return { strength: 'weak', color: 'bg-gray-200 dark:bg-gray-700', score: 0 };
    
    if (password.length < 8) return { strength: 'weak', color: 'bg-gray-300 dark:bg-gray-600', score: 1 };
    
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Calculate a score from 0-5 based on criteria
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (hasUppercase) score += 1;
    if (hasLowercase) score += 1;
    if (hasNumbers) score += 1;
    if (hasSpecialChars) score += 1;
    
    // Determine strength based on score
    let strength: 'weak' | 'medium' | 'strong' = 'weak';
    if (score >= 4) strength = 'strong';
    else if (score >= 2) strength = 'medium';
    
    // Refined grey palette for password strength
    const color = 
      strength === 'strong' ? 'bg-gray-800 dark:bg-gray-300' :
      strength === 'medium' ? 'bg-gray-500 dark:bg-gray-400' :
      'bg-gray-300 dark:bg-gray-600';
      
    return { strength, color, score };
  };

  const getPasswordFeedback = (): string => {
    const { score } = passwordStrength();
    
    if (score === 0) return "Enter a password";
    if (score === 1) return "Your password is too weak";
    if (score === 2) return "Your password is still weak";
    if (score === 3) return "Your password is getting better";
    if (score === 4) return "Your password is good";
    return "Your password is strong!";
  };

  const getPasswordIcon = () => {
    const { strength } = passwordStrength();
    
    if (strength === 'strong') return <ShieldCheck className="h-5 w-5 text-gray-800 dark:text-gray-300" />;
    if (strength === 'medium') return <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400" />;
    return <ShieldAlert className="h-5 w-5 text-gray-300 dark:text-gray-600" />;
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
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
    <div className="space-y-4">
      <div>
        <Paragraph className="font-medium text-gray-900 dark:text-white">Create your account</Paragraph>
        <SmallParagraph className="text-gray-500 dark:text-gray-400">
          {step === 1 ? 'Start with your email and password' : 
           step === 2 ? 'Tell us about yourself' : 
           'Complete your professional details'}
        </SmallParagraph>
      </div>

      {error && (
        <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 flex items-start">
          <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
          <SmallParagraph className="text-gray-600 dark:text-gray-400 text-xs">{error}</SmallParagraph>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Email and Password */}
        {step === 1 && (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
                {password && (
                  <span className="text-xs font-medium flex items-center gap-1">
                    {getPasswordIcon()}
                    <span className={`
                      ${passwordStrength().strength === 'strong' ? 'text-gray-800 dark:text-gray-300' : ''}
                      ${passwordStrength().strength === 'medium' ? 'text-gray-500 dark:text-gray-400' : ''}
                      ${passwordStrength().strength === 'weak' ? 'text-gray-400 dark:text-gray-500' : ''}
                    `}>
                      {getPasswordFeedback()}
                    </span>
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => {
                    // Keep focused state if password is empty or weak
                    if (password.length === 0 || passwordStrength().strength === 'weak') {
                      return;
                    }
                    setPasswordFocused(false);
                  }}
                  className={`block w-full pl-9 pr-9 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm transition-all duration-200 ${
                    password && passwordStrength().strength === 'weak' ? 'border-gray-300 dark:border-gray-600' :
                    password && passwordStrength().strength === 'medium' ? 'border-gray-500 dark:border-gray-500' :
                    password && passwordStrength().strength === 'strong' ? 'border-gray-700 dark:border-gray-400' :
                    'border-gray-300 dark:border-gray-700'
                  }`}
                  placeholder="Create a secure password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
              
              {/* Enhanced password feedback */}
              <div className={`mt-2 space-y-2 transition-all duration-300 ${passwordFocused || (password && passwordStrength().strength === 'weak') ? 'opacity-100 max-h-80' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              {/* Password strength indicator */}
              {password && (
                  <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Password strength:</span>
                      <span className={`text-xs font-medium capitalize
                        ${passwordStrength().strength === 'strong' ? 'text-gray-800 dark:text-gray-300' : ''}
                        ${passwordStrength().strength === 'medium' ? 'text-gray-500 dark:text-gray-400' : ''}
                        ${passwordStrength().strength === 'weak' ? 'text-gray-400 dark:text-gray-500' : ''}
                      `}>
                      {passwordStrength().strength}
                    </span>
                  </div>
                    <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength().color} rounded-full transition-all duration-300`} 
                      style={{ 
                          width: `${Math.min(100, (passwordStrength().score / 5) * 100)}%`
                      }}
                    ></div>
                    </div>
                  </div>
                )}

                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Your password should:</p>
                  <ul className="space-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                    <li className="flex items-center">
                      <span className={`mr-1 flex-shrink-0 ${password.length >= 8 ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
                        {password.length >= 8 ? <Check size={10} /> : <X size={10} />}
                      </span>
                      <span className={password.length >= 8 ? 'text-gray-700 dark:text-gray-300' : ''}>
                        Be at least 8 characters long
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 flex-shrink-0 ${/[A-Z]/.test(password) ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
                        {/[A-Z]/.test(password) ? <Check size={10} /> : <X size={10} />}
                      </span>
                      <span className={/[A-Z]/.test(password) ? 'text-gray-700 dark:text-gray-300' : ''}>
                        Include at least one uppercase letter
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 flex-shrink-0 ${/[a-z]/.test(password) ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
                        {/[a-z]/.test(password) ? <Check size={10} /> : <X size={10} />}
                      </span>
                      <span className={/[a-z]/.test(password) ? 'text-gray-700 dark:text-gray-300' : ''}>
                        Include at least one lowercase letter
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 flex-shrink-0 ${/\d/.test(password) ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
                        {/\d/.test(password) ? <Check size={10} /> : <X size={10} />}
                      </span>
                      <span className={/\d/.test(password) ? 'text-gray-700 dark:text-gray-300' : ''}>
                        Include at least one number
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 flex-shrink-0 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
                        {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? <Check size={10} /> : <X size={10} />}
                      </span>
                      <span className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-gray-700 dark:text-gray-300' : ''}>
                        Include at least one special character
                      </span>
                    </li>
                  </ul>
            </div>

                {/* Password tips */}
                <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                  <p>💡 Try using a phrase you'll remember with numbers and symbols.</p>
                </div>
              </div>
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
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                  className="relative w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm pl-3 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
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
                            role === option.id ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'
                          }`}
                          onClick={() => {
                            setRole(option.id as UserRole);
                            setIsRoleDropdownOpen(false);
                          }}
                        >
                          <span className="block truncate">{option.name}</span>
                          {role === option.id && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                              <Check className="h-5 w-5 text-gray-900 dark:text-white" aria-hidden="true" />
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
                  className="h-4 w-4 text-gray-800 focus:ring-gray-500 border-gray-300 dark:border-gray-700 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-800 dark:text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400">
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
              className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading || (step === 3 && !agreeToTerms)}
            className={`${step === 1 && 'w-full'} inline-flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-xs font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
          >
            {isLoading ? 'Processing...' : 
             step === 3 ? 'Create Account' : 
             'Continue'}
          </button>
        </div>
      </form>

      {/* Social login options - only show in step 1 */}
      {step === 1 && (
        <>
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignup('google')}
              className="w-full inline-flex justify-center py-2 px-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-900 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path
                    fill="#4285F4"
                    d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                  />
                </g>
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignup('apple')}
              className="w-full inline-flex justify-center py-2 px-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-900 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
              </svg>
              Apple
            </button>
          </div>
        </>
      )}
    </div>
  );
} 