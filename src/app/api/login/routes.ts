"use Server"
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const token = cookies().get("token");

  console.log("Token:", token);

  // Your login logic here

  return NextResponse.json({ status: 200, message: "Login successful" });
}
