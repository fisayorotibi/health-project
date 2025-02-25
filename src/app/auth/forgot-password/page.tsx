'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Heading1, Heading4, Paragraph, SmallParagraph } from '@/components/ui/typography';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This is a placeholder for actual password reset logic
      // In a real implementation, you would call your password reset API here
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent hydration errors by only rendering client-specific content after mounting
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-dark-background">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-700 dark:text-gray-300 text-2xl font-bold">L</span>
          </div>
          <Heading1 className="mt-4 text-gray-900 dark:text-white">Lavender Health Records</Heading1>
          <Paragraph className="mt-2 text-gray-500 dark:text-gray-400">Loading...</Paragraph>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-white dark:bg-dark-background">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center mr-3">
            <span className="text-white text-2xl font-bold">L</span>
          </div>
          <div>
            <span className="text-gray-900 dark:text-white text-xl font-semibold tracking-tight">LAVENDER</span>
            <span className="ml-1 text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium">Health</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-800 p-8">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-6">
                <Heading4 className="text-gray-900 dark:text-white">Reset your password</Heading4>
                <SmallParagraph className="text-gray-500 dark:text-gray-400 mt-2">
                  Enter your email address and we'll send you instructions to reset your password.
                </SmallParagraph>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isLoading ? 'Sending...' : 'Send reset instructions'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <Heading4 className="mt-4 text-gray-900 dark:text-white">Check your email</Heading4>
              <SmallParagraph className="mt-2 text-gray-500 dark:text-gray-400">
                We've sent password reset instructions to <span className="font-medium text-gray-900 dark:text-white">{email}</span>
              </SmallParagraph>
              <SmallParagraph className="mt-4 text-gray-500 dark:text-gray-400">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-gray-700 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-medium"
                >
                  try again
                </button>
              </SmallParagraph>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/auth"
              className="inline-flex items-center text-sm text-gray-700 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 