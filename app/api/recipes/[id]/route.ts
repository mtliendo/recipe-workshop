import { NextResponse } from "next/server";
import { deleteRecipeRecord, parseRecipe, saveRecipeRecord } from "@/lib/recipes-db";
import { currentOwner } from "@/lib/session";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const owner = await currentOwner();
  if (!owner) {
    return NextResponse.json({ error: "Sign in to change the box." }, { status: 401 });
  }

  const { id } = await context.params;
  const recipe = parseRecipe(await request.json().catch(() => null));
  if (!recipe || recipe.id !== id) {
    return NextResponse.json({ error: "That card couldn't be read." }, { status: 400 });
  }

  try {
    const saved = await saveRecipeRecord(recipe, owner);
    if (!saved) return NextResponse.json({ error: "That card isn't in your box." }, { status: 404 });
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: "The card couldn't be saved." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const owner = await currentOwner();
  if (!owner) {
    return NextResponse.json({ error: "Sign in to change the box." }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const removed = await deleteRecipeRecord(id, owner);
    if (!removed) return NextResponse.json({ error: "That card isn't in your box." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The card couldn't be taken out." }, { status: 500 });
  }
}
