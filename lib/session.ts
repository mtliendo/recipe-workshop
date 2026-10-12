import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function requireUser() {
  const owner = await currentOwner();
  if (owner) return null;
  return NextResponse.json({ error: "Sign in to change the box." }, { status: 401 });
}

export async function currentOwner() {
  const session = await auth0.getSession();
  return session?.user.sub || null;
}
