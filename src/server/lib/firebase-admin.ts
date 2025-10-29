import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  // In production, use service account credentials from environment variables
  // For local development, you can use Application Default Credentials or a service account JSON file

  const serviceAccount = (() => {
    const serviceAccountJSON = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountJSON) {
      return undefined;
    }
    try {
      return JSON.parse(serviceAccountJSON);
    } catch (error) {
      console.error('Error parsing FIREBASE_SERVICE_ACCOUNT:', error);
      return undefined;
    }
  })();

  admin.initializeApp({
    credential: serviceAccount
      ? admin.credential.cert(serviceAccount)
      : admin.credential.applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim(),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim(),
  });
}

export const adminDb = admin.firestore();
export const adminStorage = admin.storage();
