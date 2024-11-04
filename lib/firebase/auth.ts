import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from "firebase/auth";
import { auth } from "./config";
import { createUserProfile } from "./db";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role?: string;
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error("Sign in error:", error);
    throw new Error(error.message);
  }
}

export async function signUp(email: string, password: string, displayName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    
    // Create user profile in Firestore
    await createUserProfile(userCredential.user.uid, {
      email,
      displayName,
      role: "client",
      level: 1,
      xp: 0
    });
    
    return userCredential.user;
  } catch (error: any) {
    console.error("Sign up error:", error);
    throw new Error(error.message);
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error("Sign out error:", error);
    throw new Error(error.message);
  }
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}