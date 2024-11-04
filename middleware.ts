import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes protection
    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Employee routes protection
    if (path.startsWith("/employee") && token?.role !== "employee" && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Client dashboard protection
    if (path.startsWith("/client/dashboard") && token?.role !== "client") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/employee/:path*",
    "/client/dashboard/:path*",
    "/api/admin/:path*",
    "/api/employee/:path*"
  ],
};