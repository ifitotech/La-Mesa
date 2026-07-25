import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const hasValidFirebaseConfig = Boolean(
  firebaseConfig.apiKey?.startsWith("AIza") &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firebase Auth depends on browser APIs and must not be initialized while
// Next.js prerenders client components on the server.
export const auth =
  typeof window === "undefined" || !hasValidFirebaseConfig
    ? null
    : getAuth(app);
export const db = getFirestore(app);

export default app;
