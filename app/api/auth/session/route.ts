import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/config";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    return NextResponse.json(session || { user: null });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}