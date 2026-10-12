import { HomeView } from "@/components/home-view";
import { listRecipes } from "@/lib/recipes-db";
import { currentOwner } from "@/lib/session";

export default async function Home() {
  const owner = await currentOwner();
  const recipes = owner ? await listRecipes(owner) : [];
  return <HomeView initialRecipes={recipes} initialSignedIn={Boolean(owner)} />;
}
