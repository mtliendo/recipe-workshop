import { Suspense } from "react";
import type { Metadata } from "next";
import { RecipeEditor } from "@/components/recipe-editor";
import { OpeningCard } from "@/components/status";

export const metadata: Metadata = { title: "Revise a card" };

export default function EditRecipePage() {
  return (
    <Suspense fallback={<OpeningCard />}>
      <RecipeEditor />
    </Suspense>
  );
}
