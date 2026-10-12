import { Suspense } from "react";
import { HomeView } from "@/components/home-view";
import { OpeningCard } from "@/components/status";
import { listRecipes } from "@/lib/recipes-db";
import { currentOwner } from "@/lib/session";

export default function Home() {
  return (
    <Suspense fallback={<OpeningCard />}>
      <Box />
    </Suspense>
  );
}

async function Box() {
  const owner = await currentOwner();
  const recipes = owner ? await listRecipes(owner) : [];
  return <HomeView initialRecipes={recipes} initialSignedIn={Boolean(owner)} />;
}
