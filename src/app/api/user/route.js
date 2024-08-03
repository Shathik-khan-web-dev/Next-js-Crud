import dbConnection from "@/server/config/db";
import User from "@/server/model/user";
import { NextResponse } from "next/server";

// POST request to create a user
export async function POST(request) {
  const { name, email, password, phone } = await request.json();
  await dbConnection();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  await User.create({ name, email, password, phone });
  return NextResponse.json(
    { message: "User Created successfully" },
    { status: 201 }
  );
}

// GET request to fetch all user data
export async function GET(request) {
  await dbConnection();

  try {
    // Fetch all users from the database
    const users = await User.find();

    return NextResponse.json({ return: users });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve users" },
      { status: 500 }
    );
  }
}
