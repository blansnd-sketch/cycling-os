// US-LOG-01
// Validate credentials and create session cookie.

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { setSessionCookie, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 },
      );
    }

    const result = await db.query(
      `
        SELECT "id", "email", "password"
        FROM "User"
        WHERE "email" = $1
        LIMIT 1
      `,
      [email],
    );

    if (!result.rowCount || result.rowCount === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const user = result.rows[0];

    if (!verifyPassword(password, user.password)) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const response = NextResponse.json(
      {
        ok: true,
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 200 },
    );

    setSessionCookie(response, user.id, user.email);

    return response;
  } catch (error) {
    console.error("Login failed:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}