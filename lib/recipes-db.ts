import { getPool } from "@/lib/db";
import { cleanRecipe, PHOTO_PRESETS, type PhotoPreset } from "@/lib/recipes";
import type { Ingredient, Recipe } from "@/lib/types";

type RecipeRow = {
  id: string;
  title: string;
  note: string;
  servings: string;
  time: string;
  ingredients: Ingredient[];
  steps: string[];
  photo: string;
};

function assertOwner(owner: string) {
  if (!owner) throw new Error("Recipe operations require an owner.");
}

function isPreset(photo: string): photo is PhotoPreset {
  return PHOTO_PRESETS.includes(photo as PhotoPreset);
}

function storedPhoto(photo: string) {
  if (photo === "" || isPreset(photo)) return photo;
  if (photo.startsWith("https://") && photo.length <= 2000) return photo;
  return "";
}

function rowToRecipe(row: RecipeRow): Recipe {
  return {
    id: row.id,
    title: row.title,
    note: row.note,
    servings: row.servings,
    time: row.time,
    ingredients: Array.isArray(row.ingredients) ? row.ingredients : [],
    steps: Array.isArray(row.steps) ? row.steps : [],
    photo: row.photo,
  };
}

export function parseRecipe(value: unknown): Recipe | null {
  if (typeof value !== "object" || value === null) return null;
  const record = value as Partial<Recipe>;
  if (typeof record.id !== "string" || typeof record.title !== "string") return null;
  if (!Array.isArray(record.ingredients) || !Array.isArray(record.steps)) return null;
  const cleaned = cleanRecipe({
    id: record.id.slice(0, 80),
    title: record.title,
    note: typeof record.note === "string" ? record.note : "",
    servings: typeof record.servings === "string" ? record.servings : "",
    time: typeof record.time === "string" ? record.time : "",
    ingredients: record.ingredients.filter(
      (item): item is Ingredient =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.amount === "string" &&
        typeof item.item === "string",
    ),
    steps: record.steps.filter((step): step is string => typeof step === "string"),
    photo: typeof record.photo === "string" ? storedPhoto(record.photo) : "",
  });
  if (!cleaned.title) return null;
  return cleaned;
}

const RECIPE_COLUMNS = `id, title, note, servings, "time", ingredients, steps, photo`;

export async function listRecipes(owner: string) {
  assertOwner(owner);
  const pool = await getPool();
  const result = await pool.query<RecipeRow>(
    `select ${RECIPE_COLUMNS}
     from recipes
     where owner = $1
     order by position asc, updated_at desc`,
    [owner],
  );
  return result.rows.map(rowToRecipe);
}

export async function saveRecipeRecord(recipe: Recipe, owner: string) {
  assertOwner(owner);
  const pool = await getPool();
  const result = await pool.query<RecipeRow>(
    `insert into recipes (id, owner, title, note, servings, "time", ingredients, steps, photo, position)
     values (
       $1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb, $9,
       coalesce((select min(position) from recipes where owner = $2), 1) - 1
     )
     on conflict (id) do update set
       title = excluded.title,
       note = excluded.note,
       servings = excluded.servings,
       "time" = excluded."time",
       ingredients = excluded.ingredients,
       steps = excluded.steps,
       photo = excluded.photo,
       updated_at = now()
     where recipes.owner = excluded.owner
     returning ${RECIPE_COLUMNS}`,
    [
      recipe.id,
      owner,
      recipe.title,
      recipe.note,
      recipe.servings,
      recipe.time,
      JSON.stringify(recipe.ingredients),
      JSON.stringify(recipe.steps),
      recipe.photo,
    ],
  );
  const row = result.rows[0];
  return row ? rowToRecipe(row) : null;
}

export async function deleteRecipeRecord(id: string, owner: string) {
  assertOwner(owner);
  const pool = await getPool();
  const result = await pool.query("delete from recipes where id = $1 and owner = $2", [id, owner]);
  return (result.rowCount ?? 0) > 0;
}
