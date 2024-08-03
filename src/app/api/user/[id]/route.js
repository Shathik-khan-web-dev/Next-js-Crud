import dbConnection from "@/server/config/db";
import User from "@/server/model/user";
import { NextResponse } from "next/server";

// Example of a function to get user data
async function getUser(request, params) {
  const { userId } = params;

  const user = await findUserById(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req, { params }) {
  console.log(params);

  try {
    const { id } = params;
    const { name, email, password, phone } = await req.json();
    await dbConnection();

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password, phone },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnection();

  try {
    const { id } = params;
    await User.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}
