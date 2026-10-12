import { Suspense } from "react";
import type { Metadata } from "next";
import { RecipeDetail } from "@/components/recipe-detail";
import { OpeningCard } from "@/components/status";

export const metadata: Metadata = { title: "Card" };

export default function RecipePage() {
  return (
    <Suspense fallback={<OpeningCard />}>
      <RecipeDetail />
    </Suspense>
  );
}
