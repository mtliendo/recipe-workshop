import { Suspense } from "react";
import type { Metadata } from "next";
import { RecipeDetail } from "@/components/recipe-detail";
import { MissingCard, OpeningCard, SignInPrompt } from "@/components/status";
import { listRecipes } from "@/lib/recipes-db";
import { currentOwner } from "@/lib/session";

export const metadata: Metadata = { title: "Card" };

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<OpeningCard />}>
      <RecipeGate params={params} />
    </Suspense>
  );
}

async function RecipeGate({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const owner = await currentOwner();
  if (!owner) {
    return (
      <SignInPrompt
        returnTo={`/recipes/${id}`}
        title="Sign in to open this card."
        body="Cards belong to the person who wrote them."
      />
    );
  }

  const recipes = await listRecipes(owner);
  const index = recipes.findIndex((recipe) => recipe.id === id);
  const recipe = recipes[index];
  if (!recipe) return <MissingCard />;
  return <RecipeDetail initialRecipe={recipe} index={index} />;
}
