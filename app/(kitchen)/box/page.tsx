import { Suspense } from "react";
import type { Metadata } from "next";
import { HomeView } from "@/components/home-view";
import { SignedIn } from "@/components/signed-in";
import { OpeningCard } from "@/components/status";
import { listRecipes } from "@/lib/recipes-db";
import { currentOwner } from "@/lib/session";

export const metadata: Metadata = { title: "The box" };

export default function BoxPage() {
  return (
    <Suspense fallback={<OpeningCard />}>
      <SignedIn returnTo="/box">
        <Box />
      </SignedIn>
    </Suspense>
  );
}

async function Box() {
  const owner = await currentOwner();
  const recipes = owner ? await listRecipes(owner) : [];
  return <HomeView initialRecipes={recipes} initialSignedIn={Boolean(owner)} />;
}
