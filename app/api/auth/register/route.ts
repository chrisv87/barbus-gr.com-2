import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    const { db } = await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const result = await db.collection("users").insertOne({
      email: email.toLowerCase(),
      password: hashedPassword,
      profile: {
        name,
        createdAt: new Date(),
      },
      role: "client",
      status: "active",
    });

    return NextResponse.json({
      user: {
        id: result.insertedId.toString(),
        email,
        name,
        role: "client",
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}