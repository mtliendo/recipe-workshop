import { NextResponse } from "next/server";
import { restoreSeedRecipes } from "@/lib/recipes-db";
import { requireUser } from "@/lib/session";

export async function POST() {
  const denied = await requireUser();
  if (denied) return denied;

  try {
    return NextResponse.json(await restoreSeedRecipes());
  } catch {
    return NextResponse.json({ error: "Grandma’s cards couldn't be put back." }, { status: 500 });
  }
}
