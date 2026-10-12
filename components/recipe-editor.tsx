"use client";

import { useParams } from "next/navigation";
import { RecipeForm } from "@/components/recipe-form";
import { MissingCard, OpeningCard } from "@/components/status";
import { recipeKey } from "@/lib/recipes";
import { useBox } from "@/lib/store";

export function RecipeEditor() {
  const params = useParams<{ id: string }>();
  const id = typeof params.id === "string" ? params.id : "";
  const { recipes, ready } = useBox();
  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) return ready ? <MissingCard /> : <OpeningCard />;

  return (
    <RecipeForm
      key={recipeKey(recipe)}
      initial={recipe}
      heading="Revise the card."
      submitLabel="Save the card"
    />
  );
}
