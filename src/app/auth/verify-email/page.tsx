'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { applyActionCode } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    'loading' | 'verifying' | 'success' | 'redirecting' | 'fallback' | 'error'
  >('loading');
  const [error, setError] = useState<string>('');
  const oobCode = searchParams.get('oobCode');
  const continueUrl = searchParams.get('continueUrl');

  useEffect(() => {
    let isCancelled = false;
    let timerId: ReturnType<typeof setTimeout>;

    if (!oobCode) {
      setStatus('fallback');
      return;
    }

    // First verify the email with Firebase
    setStatus('verifying');

    applyActionCode(auth, oobCode)
      .then(() => {
        if (isCancelled) return;
        // Email verified successfully
        setStatus('success');

        // Wait 2 seconds to show success, then show completion message
        timerId = setTimeout(() => {
          if (!isCancelled) {
            setStatus('fallback');
          }
        }, 2000);
      })
      .catch(error => {
        if (isCancelled) return;
        console.error('Email verification error:', error);
        setError(error.message);
        setStatus('error');
      });

    return () => {
      isCancelled = true;
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [oobCode, continueUrl]);

  if (status === 'loading' || status === 'verifying') {
    return (
      <div className="min-h-screen bg-navy-deep flex items-start justify-center px-4 pt-16 pb-8">
        <div className="bg-navy-light/80 backdrop-blur-md rounded-lg p-6 max-w-md w-full text-center text-foreground border border-border">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">
            {status === 'verifying' ? 'Verifying your email...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-navy-deep flex items-start justify-center px-4 pt-16 pb-8">
        <div className="bg-navy-light/80 backdrop-blur-md rounded-lg p-6 max-w-md w-full text-center text-foreground border border-border">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-brand text-primary golden-text-glow mb-3">
            Email verified!
          </h1>
          <p className="text-success">
            Your email has been successfully verified.
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
            Verification failed
          </h1>
          <p className="text-error mb-4">{error}</p>
          <p className="text-sm text-text-muted">
            Please try again or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-deep flex items-start justify-center px-4 pt-16 pb-8">
      <div className="bg-navy-light/80 backdrop-blur-md rounded-lg p-6 max-w-md w-full text-center text-foreground border border-border">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-xl font-brand text-primary golden-text-glow mb-4">
          Email verified!
        </h1>

        {oobCode ? (
          <div>
            <p className="mb-4 text-success">
              Your email has been successfully verified.
            </p>

            <p className="mb-4 text-text-secondary text-sm">
              Please return to the DreamWeaver app to continue creating magical
              bedtime stories.
            </p>
          </div>
        ) : (
          <p className="text-error">
            Invalid verification link. Please try again or contact support.
          </p>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
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
      <VerifyEmailContent />
    </Suspense>
  );
}
