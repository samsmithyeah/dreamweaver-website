'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { APP_NAME, DEEP_LINK_SCHEME } from '@/lib/constants';

function RecoverEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'fallback'>(
    'loading'
  );
  const oobCode = searchParams.get('oobCode');
  const continueUrl = searchParams.get('continueUrl');

  useEffect(() => {
    if (!oobCode) {
      setStatus('fallback');
      return;
    }

    // Try to deep link to the mobile app
    setStatus('redirecting');

    // Construct deep link URL
    const params = new URLSearchParams();
    params.append('action', 'recoverEmail');
    params.append('oobCode', oobCode);
    if (continueUrl) params.append('continueUrl', continueUrl);

    const deepLink = `${DEEP_LINK_SCHEME}auth?${params.toString()}`;

    // Attempt deep link
    window.location.href = deepLink;

    // Fallback after 3 seconds if deep link doesn't work
    setTimeout(() => {
      setStatus('fallback');
    }, 3000);
  }, [oobCode, continueUrl]);

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

  if (status === 'redirecting') {
    return (
      <div className="min-h-screen bg-navy-deep flex items-start justify-center px-4 pt-16 pb-8">
        <div className="text-center text-foreground max-w-md">
          <div className="animate-pulse mb-4">
            <div className="text-4xl mb-2">📱</div>
          </div>
          <h1 className="text-2xl font-brand text-primary golden-text-glow mb-4">
            Opening {APP_NAME} App...
          </h1>
          <p className="text-text-secondary">
            We&apos;re redirecting you to the {APP_NAME} app to recover your
            email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-deep flex items-start justify-center px-4 pt-16 pb-8">
      <div className="bg-navy-light/80 backdrop-blur-md rounded-lg p-6 max-w-md w-full text-center text-foreground border border-border">
        <div className="text-5xl mb-4">📬</div>
        <h1 className="text-xl font-brand text-primary golden-text-glow mb-4">
          Recover email
        </h1>

        {oobCode ? (
          <div>
            <p className="mb-6 text-text-secondary">
              We couldn&apos;t automatically open the {APP_NAME} app. Please
              open the app manually to recover your email.
            </p>

            <div className="bg-black/20 rounded p-4 mb-6">
              <p className="text-sm text-gray-300 mb-2">
                Or copy this recovery code:
              </p>
              <code className="text-yellow-300 break-all text-sm">
                {oobCode}
              </code>
            </div>

            <button
              onClick={() =>
                (window.location.href = `${DEEP_LINK_SCHEME}recover`)
              }
              className="bg-gradient-to-r from-primary to-primary-light hover:opacity-80 text-navy-deep font-semibold py-3 px-6 rounded-lg transition-all duration-200 mb-4 w-full"
            >
              Open {APP_NAME} App
            </button>
          </div>
        ) : (
          <p className="text-error">
            Invalid recovery link. Please try again or contact support.
          </p>
        )}
      </div>
    </div>
  );
}

export default function RecoverEmailPage() {
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
      <RecoverEmailContent />
    </Suspense>
  );
}
