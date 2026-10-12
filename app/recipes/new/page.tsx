import type { Metadata } from "next";
import { RecipeForm } from "@/components/recipe-form";

export const metadata: Metadata = { title: "Write a card" };

export default function NewRecipePage() {
  return <RecipeForm initial={null} heading="A blank card." submitLabel="Put it in the box" />;
}
