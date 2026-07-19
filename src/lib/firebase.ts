import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
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

// Next.js app initialization (Safe mode)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();



export const auth = getAuth(app);

// Legacy and Modern Compatible Firestore Configuration
// Is hisse ko hata kar neeche wala dynamic logic paste kar dein
let firestoreDb;

if (typeof window !== "undefined") {
  try {
    // 1. Naye devices aur modern browsers ke liye fast local cache
    firestoreDb = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
      })
    });
  } catch (e) {
    // 2. Agar iPhone 7 Plus ya koi bhi purana browser error de, to crash hone ke bajaye yeh safe fallback chalega
    firestoreDb = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      ignoreUndefinedProperties: true
    });
  }
} else {
  firestoreDb = getFirestore(app);
}

export const db = firestoreDb;
export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};