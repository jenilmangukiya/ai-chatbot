// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { prismaClient } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    // Basic validation
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prismaClient.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
