import { auth } from "@/lib/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createUserProfile } from "@/lib/firebase/db";

const testUsers = [
  {
    email: "admin@barbus-gr.com",
    password: "password123",
    displayName: "Admin User",
    role: "admin"
  },
  {
    email: "employee@barbus-gr.com",
    password: "password123",
    displayName: "Employee User",
    role: "employee"
  },
  {
    email: "promoter@barbus-gr.com",
    password: "password123",
    displayName: "Promoter User",
    role: "promoter"
  },
  {
    email: "client@barbus-gr.com",
    password: "password123",
    displayName: "Client User",
    role: "client"
  }
];

async function seedUsers() {
  for (const user of testUsers) {
    try {
      // Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      // Update profile
      await updateProfile(userCredential.user, {
        displayName: user.displayName
      });

      // Create user profile in Firestore
      await createUserProfile(userCredential.user.uid, {
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        level: 1,
        xp: 0,
        agreedToTerms: true
      });

      console.log(`Created user: ${user.email} (${user.role})`);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`User ${user.email} already exists`);
      } else {
        console.error(`Error creating user ${user.email}:`, error);
      }
    }
  }
}

seedUsers();