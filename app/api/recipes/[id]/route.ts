import { NextResponse } from "next/server";
import { deleteRecipeRecord, parseRecipe, saveRecipeRecord } from "@/lib/recipes-db";
import { requireUser } from "@/lib/session";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await requireUser();
  if (denied) return denied;

  const { id } = await context.params;
  const recipe = parseRecipe(await request.json().catch(() => null));
  if (!recipe || recipe.id !== id) {
    return NextResponse.json({ error: "That card couldn't be read." }, { status: 400 });
  }

  try {
    return NextResponse.json(await saveRecipeRecord(recipe));
  } catch {
    return NextResponse.json({ error: "The card couldn't be saved." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await requireUser();
  if (denied) return denied;

  const { id } = await context.params;
  try {
    const removed = await deleteRecipeRecord(id);
    if (!removed) return NextResponse.json({ error: "That card is already gone." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The card couldn't be taken out." }, { status: 500 });
  }
}
