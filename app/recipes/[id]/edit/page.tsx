import { Suspense } from "react";
import type { Metadata } from "next";
import { RecipeEditor } from "@/components/recipe-editor";
import { SignedIn } from "@/components/signed-in";
import { OpeningCard } from "@/components/status";

export const metadata: Metadata = { title: "Revise a card" };

export default function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<OpeningCard />}>
      <EditGate params={params} />
    </Suspense>
  );
}

async function EditGate({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <SignedIn returnTo={`/recipes/${id}/edit`}>
      <RecipeEditor />
    </SignedIn>
  );
}
