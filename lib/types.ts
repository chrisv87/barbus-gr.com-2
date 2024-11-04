import { DefaultSession } from "next-auth";
import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  role: "admin" | "employee" | "client";
  level: number;
  xp: number;
  agreedToTerms: boolean;
  profile?: {
    name?: string;
    image?: string;
  };
  rewards?: {
    level: number;
    xp: number;
    lastActivity?: Date;
  };
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      level: number;
      xp: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    level: number;
    xp: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    level: number;
    xp: number;
  }
}