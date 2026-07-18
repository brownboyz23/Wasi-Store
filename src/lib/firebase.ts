import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  getFirestore
} from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCM148nkZhU2KU4oL1abQQhRlMVzkHFb74",
  authDomain: "my-build-app-ea206.firebaseapp.com",
  projectId: "my-build-app-ea206",
  storageBucket: "my-build-app-ea206.firebasestorage.app",
  messagingSenderId: "571060466617",
  appId: "1:571060466617:web:4db45d91b6afa5607b7c68",
  measurementId: "G-NFVKXQQLVF"
};

// Next.js app initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

// ⚡ Back to Fast WebSockets + Smart Cache (Tested & Reliable)
export const db = typeof window !== "undefined"
  ? initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  })
  : getFirestore(app);

export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};