import { NextResponse } from "next/server";
import { listRecipes } from "@/lib/recipes-db";
import { currentOwner } from "@/lib/session";

export async function GET() {
  const owner = await currentOwner();
  if (!owner) {
    return NextResponse.json({ error: "Sign in to open the box." }, { status: 401 });
  }

  try {
    return NextResponse.json(await listRecipes(owner));
  } catch {
    return NextResponse.json({ error: "The box couldn't be opened." }, { status: 500 });
  }
}
