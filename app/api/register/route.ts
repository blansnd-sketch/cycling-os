// US-REG-01
// Register a new user, create an empty profile, create session cookie, auto-login.

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, isValidEmail, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");
    const confirmPassword = String(body?.confirmPassword ?? "");

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 },
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        { error: "Password must be at least 4 characters" },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 },
      );
    }

    const existingUser = await db.query(
      `SELECT "id" FROM "User" WHERE "email" = $1 LIMIT 1`,
      [email],
    );

    if (existingUser.rowCount && existingUser.rowCount > 0) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 },
      );
    }

    const passwordHash = hashPassword(password);
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      const userResult = await client.query(
        `
          INSERT INTO "User" ("id", "email", "password", "createdAt")
          VALUES (gen_random_uuid()::text, $1, $2, NOW())
          RETURNING "id", "email"
        `,
        [email, passwordHash],
      );

      const user = userResult.rows[0];

      await client.query(
        `
          INSERT INTO "UserProfile" (
            "id",
            "userId",
            "firstName",
            "lastName",
            "gender",
            "birthYear",
            "weight"
          )
          VALUES (
            gen_random_uuid()::text,
            $1,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL
          )
        `,
        [user.id],
      );

      await client.query("COMMIT");

      const response = NextResponse.json(
        {
          ok: true,
          user: {
            id: user.id,
            email: user.email,
          },
        },
        { status: 201 },
      );

      setSessionCookie(response, user.id, user.email);

      return response;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Register transaction failed:", error);

      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Register failed:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}