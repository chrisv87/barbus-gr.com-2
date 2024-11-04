import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./config";
import { UserProfile } from "./db";

// User Management
export async function getAllUsers() {
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getUsersByRole(role: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("role", "==", role));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateUserRole(userId: string, role: string) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { role });
}

export async function deleteUser(userId: string) {
  const userRef = doc(db, "users", userId);
  await deleteDoc(userRef);
}

// Event Management
export async function createEvent(eventData: any) {
  const eventsRef = collection(db, "events");
  await addDoc(eventsRef, {
    ...eventData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateEvent(eventId: string, eventData: any) {
  const eventRef = doc(db, "events", eventId);
  await updateDoc(eventRef, {
    ...eventData,
    updatedAt: serverTimestamp(),
  });
}

// Route Management
export async function createRoute(routeData: any) {
  const routesRef = collection(db, "routes");
  await addDoc(routesRef, {
    ...routeData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateRoute(routeId: string, routeData: any) {
  const routeRef = doc(db, "routes", routeId);
  await updateDoc(routeRef, {
    ...routeData,
    updatedAt: serverTimestamp(),
  });
}