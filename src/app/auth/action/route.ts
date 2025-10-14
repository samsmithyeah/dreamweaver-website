import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');
  const continueUrl = searchParams.get('continueUrl');

  // Base URL for fallback web pages
  const baseUrl = request.nextUrl.origin;

  try {
    switch (mode) {
      case 'resetPassword':
        // Redirect to fallback page that will attempt deep link
        const resetUrl = new URL('/auth/reset-password', baseUrl);
        resetUrl.searchParams.set('oobCode', oobCode || '');
        if (continueUrl) resetUrl.searchParams.set('continueUrl', continueUrl);
        return NextResponse.redirect(resetUrl.toString());

      case 'verifyEmail':
        // Redirect to fallback page that will attempt deep link
        const verifyUrl = new URL('/auth/verify-email', baseUrl);
        verifyUrl.searchParams.set('oobCode', oobCode || '');
        if (continueUrl) verifyUrl.searchParams.set('continueUrl', continueUrl);
        return NextResponse.redirect(verifyUrl.toString());

      case 'recoverEmail':
        // Redirect to fallback page that will attempt deep link
        const recoverUrl = new URL('/auth/recover-email', baseUrl);
        recoverUrl.searchParams.set('oobCode', oobCode || '');
        if (continueUrl)
          recoverUrl.searchParams.set('continueUrl', continueUrl);
        return NextResponse.redirect(recoverUrl.toString());

      default:
        // For unknown modes, redirect to home
        return NextResponse.redirect(baseUrl);
    }
  } catch (error) {
    console.error('Firebase auth action error:', error);

    // On error, redirect to home with error parameter
    const errorUrl = new URL('/', baseUrl);
    errorUrl.searchParams.set('error', 'auth_action_failed');
    return NextResponse.redirect(errorUrl.toString());
  }
}
