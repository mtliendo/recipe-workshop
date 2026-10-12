import type { Ingredient, Recipe } from "@/lib/types";

export const PHOTO_PRESETS = [
  "brisket",
  "cornbread",
  "cobbler",
  "citrus",
  "greens",
  "tomato",
] as const;

export type PhotoPreset = (typeof PHOTO_PRESETS)[number];

export const GOOGLE_ACCOUNT = "maya@sundaybox.kitchen";

const LIMITS = {
  title: 120,
  note: 600,
  meta: 40,
  amount: 32,
  item: 80,
  step: 400,
  ingredients: 40,
  steps: 30,
};

export function nextPreset(current: string): PhotoPreset {
  const index = PHOTO_PRESETS.indexOf(current as PhotoPreset);
  if (index === -1) return "citrus";
  return PHOTO_PRESETS[(index + 1) % PHOTO_PRESETS.length];
}

export function blankRecipe(): Recipe {
  return {
    id: crypto.randomUUID(),
    title: "",
    note: "",
    servings: "",
    time: "",
    ingredients: [],
    steps: [],
    photo: "",
  };
}

export function blankIngredient(): Ingredient {
  return { id: crypto.randomUUID(), amount: "", item: "" };
}

function clip(value: string, max: number) {
  return value.trim().slice(0, max);
}

export function cleanRecipe(recipe: Recipe): Recipe {
  return {
    ...recipe,
    title: clip(recipe.title, LIMITS.title),
    note: clip(recipe.note, LIMITS.note),
    servings: clip(recipe.servings, LIMITS.meta),
    time: clip(recipe.time, LIMITS.meta),
    ingredients: recipe.ingredients
      .filter((item) => item.amount.trim() || item.item.trim())
      .slice(0, LIMITS.ingredients)
      .map((item) => ({
        id: item.id,
        amount: clip(item.amount, LIMITS.amount),
        item: clip(item.item, LIMITS.item),
      })),
    steps: recipe.steps
      .map((step) => clip(step, LIMITS.step))
      .filter(Boolean)
      .slice(0, LIMITS.steps),
  };
}

export function recipeKey(recipe: Recipe) {
  return [
    recipe.id,
    recipe.title,
    recipe.note,
    recipe.time,
    recipe.servings,
    recipe.photo,
    recipe.ingredients.map((item) => `${item.amount}:${item.item}`).join("|"),
    recipe.steps.join("|"),
  ].join("~");
}
