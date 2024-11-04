import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  Timestamp,
  DocumentData
} from "firebase/firestore";
import { db } from "./config";

export interface UserProfile extends DocumentData {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  level: number;
  xp: number;
  agreedToTerms: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      ...data,
      uid,
      agreedToTerms: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      level: 1,
      xp: 0,
      role: "client"
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}

export async function getUserProfile(uid: string) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

// Collection references
export const usersRef = collection(db, "users");
export const eventsRef = collection(db, "events");
export const routesRef = collection(db, "routes");
export const ticketsRef = collection(db, "tickets");