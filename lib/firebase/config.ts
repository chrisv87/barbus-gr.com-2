import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC4cQ87FWTly0sTnisZVU4TgFU-nul8mGY",
  authDomain: "barbus-gr.firebaseapp.com",
  projectId: "barbus-gr",
  storageBucket: "barbus-gr.firebasestorage.app",
  messagingSenderId: "913743550611",
  appId: "1:913743550611:web:b77ca13986aecaa035d566",
  measurementId: "G-3PN91PVTY1"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics conditionally
export async function initAnalytics() {
  if (typeof window !== 'undefined') {
    const analyticsSupported = await isSupported();
    if (analyticsSupported) {
      return getAnalytics(app);
    }
  }
  return null;
}