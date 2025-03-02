'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading1, Heading4, SmallParagraph } from '@/components/ui/typography';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      setMessage('Password updated successfully!');
      router.push('/auth/login');
    } catch (err) {
      setMessage('Error updating password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-white dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-800 p-8">
          <div className="text-center mb-6">
            <Heading4 className="text-gray-900 dark:text-white">Reset your password</Heading4>
            <SmallParagraph className="text-gray-500 dark:text-gray-400 mt-2">
              Enter your new password below.
            </SmallParagraph>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Confirm new password"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
            {message && <p className="text-center text-red-500 mt-4">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
} 