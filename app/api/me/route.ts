// US-LOG-01
// Session check endpoint for frontend and Garage redirect logic.

import { NextRequest, NextResponse } from "next/server";
import { authCookieName, readSessionToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(authCookieName)?.value ?? null;
  const session = readSessionToken(token);

  if (!session) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 },
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: session.userId,
      email: session.email,
    },
  });
}