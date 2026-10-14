import { Suspense } from "react";
import type { Metadata } from "next";
import { RecipeForm } from "@/components/recipe-form";
import { SignedIn } from "@/components/signed-in";
import { OpeningCard } from "@/components/status";

export const metadata: Metadata = { title: "Write a card" };

export default function NewRecipePage() {
  return (
    <Suspense fallback={<OpeningCard />}>
      <SignedIn returnTo="/recipes/new">
        <RecipeForm initial={null} heading="A blank card." submitLabel="Put it in the box" />
      </SignedIn>
    </Suspense>
  );
}
