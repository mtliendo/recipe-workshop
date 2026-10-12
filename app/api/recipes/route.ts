import { NextResponse } from "next/server";
import { listRecipes } from "@/lib/recipes-db";

export async function GET() {
  try {
    return NextResponse.json(await listRecipes());
  } catch {
    return NextResponse.json({ error: "The box couldn't be opened." }, { status: 500 });
  }
}
