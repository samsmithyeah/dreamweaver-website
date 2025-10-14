'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    'loading' | 'form' | 'success' | 'error'
  >('loading');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const oobCode = searchParams.get('oobCode');
  // const continueUrl = searchParams.get('continueUrl'); // Not used in this flow

  useEffect(() => {
    if (!oobCode) {
      setStatus('error');
      setError('Invalid password reset link. Please request a new one.');
      return;
    }

    // Show the form immediately
    setStatus('form');
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!oobCode) {
      setError('Invalid password reset code.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setStatus('success');
    } catch (error) {
      console.error('Password reset error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to reset password. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-navy-deep flex items-start justify-center px-4 pt-16 pb-8">
        <div className="text-center text-foreground">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-navy-deep flex items-start justify-center px-4 pt-16 pb-8">
        <div className="bg-navy-light/80 backdrop-blur-md rounded-lg p-6 max-w-md w-full text-center text-foreground border border-border">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-xl font-brand text-primary golden-text-glow mb-4">
            Password reset!
          </h1>

          <p className="mb-4 text-success">
            Your password has been successfully reset.
          </p>

          <p className="mb-4 text-text-secondary text-sm">
            You can now return to the DreamWeaver app and sign in with your new
            password.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-navy-deep flex items-start justify-center px-4 pt-16 pb-8">
        <div className="bg-navy-light/80 backdrop-blur-md rounded-lg p-6 max-w-md w-full text-center text-foreground border border-border">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-xl font-brand text-primary golden-text-glow mb-3">
            Reset failed
          </h1>
          <p className="text-error mb-4">{error}</p>
          <p className="text-sm text-text-muted">
            Please request a new password reset link or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-deep flex items-start justify-center px-4 pt-16 pb-8">
      <div className="bg-navy-light/80 backdrop-blur-md rounded-lg p-6 max-w-md w-full text-center text-foreground border border-border">
        <div className="text-5xl mb-4">🔐</div>
        <h1 className="text-xl font-brand text-primary golden-text-glow mb-4">
          Reset password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label
              htmlFor="password"
              className="block text-sm text-text-secondary mb-2"
            >
              New password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-navy-deep border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
              placeholder="Enter new password"
              disabled={submitting}
            />
          </div>

          <div className="text-left">
            <label
              htmlFor="confirmPassword"
              className="block text-sm text-text-secondary mb-2"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-navy-deep border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
              placeholder="Confirm new password"
              disabled={submitting}
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-primary to-primary-light hover:opacity-80 disabled:opacity-50 text-navy-deep font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            {submitting ? 'Resetting password...' : 'Reset password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-navy-deep flex items-start justify-center px-4 pt-16 pb-8">
          <div className="text-center text-foreground">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
