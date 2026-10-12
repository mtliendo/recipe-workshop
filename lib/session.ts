import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function requireUser() {
  const session = await auth0.getSession();
  if (session) return null;
  return NextResponse.json({ error: "Sign in to change the box." }, { status: 401 });
}
