"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { Plate } from "@/components/plate";
import { OpeningCard } from "@/components/status";
import { FEATURED_RECIPE_ID } from "@/lib/recipes";
import { useBox } from "@/lib/store";

export function HomeView() {
  const { recipes, ready, error } = useBox();
  const featured = recipes.find((recipe) => recipe.id === FEATURED_RECIPE_ID) ?? recipes[0];

  if (!ready) return <OpeningCard />;

  if (error) {
    return (
      <section className="max-w-xl">
        <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-paprika">The family box</p>
        <h1 className="mt-3 font-display text-6xl leading-none">The box didn’t open.</h1>
        <p className="mt-4 text-lg text-ink-soft">{error}</p>
      </section>
    );
  }
  const rest = featured ? recipes.filter((recipe) => recipe.id !== featured.id) : [];

  if (!featured) {
    return (
      <section className="max-w-xl">
        <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
          The family box
        </p>
        <h1 className="mt-3 font-display text-6xl leading-none">The box is empty.</h1>
        <p className="mt-4 text-lg text-ink-soft">
          Write a new card, or put Grandma’s three back from Settings.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/recipes/new">Write a card</ButtonLink>
          <ButtonLink href="/settings" tone="quiet">
            Settings
          </ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="rise font-display text-[0.68rem] uppercase tracking-[0.22em] text-paprika">
            The family box · {recipes.length} {recipes.length === 1 ? "card" : "cards"}
          </p>
          <h1
            className="rise mt-4 max-w-xl font-display text-6xl leading-[0.92] font-light tracking-tight sm:text-7xl"
            style={{ animationDelay: "70ms" }}
          >
            Grandma’s cards are still here.
          </h1>
          <p
            className="rise mt-5 max-w-md text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: "140ms" }}
          >
            Sunday brisket, the skillet cornbread, and peach cobbler from August. Open one, or write
            the next card in your own hand.
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "210ms" }}>
            <ButtonLink href={`/recipes/${featured.id}`}>Open this card</ButtonLink>
            <ButtonLink href="/recipes/new" tone="quiet">
              Write a card
            </ButtonLink>
          </div>
          <Link
            href="/chat"
            className="rise mt-5 inline-block text-sm text-ink-soft underline decoration-ink/20 underline-offset-4 hover:text-ink"
            style={{ animationDelay: "280ms" }}
          >
            Or ask the kitchen
          </Link>
        </div>
        <Link
          href={`/recipes/${featured.id}`}
          className="rise group relative block"
          style={{ animationDelay: "120ms" }}
        >
          <span className="pointer-events-none absolute -top-8 right-6 -z-10 h-56 w-56 rounded-full bg-butter/70 blur-3xl" />
          <Plate photo={featured.photo} className="transition duration-300 group-hover:-translate-y-1" />
          <p className="mt-2 text-center font-display text-[0.68rem] uppercase tracking-[0.2em] text-ink-soft">
            Start here
          </p>
          <h2 className="text-center font-display text-4xl leading-none group-hover:italic">
            {featured.title}
          </h2>
          <p className="mt-2 text-center text-sm text-ink-soft">
            {featured.time}
            {featured.servings ? ` · serves ${featured.servings}` : ""}
          </p>
        </Link>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
          Also in the box
        </h2>
        <ul className="mt-4">
          {rest.map((recipe, index) => (
            <li key={recipe.id}>
              <Link
                href={`/recipes/${recipe.id}`}
                className="group grid grid-cols-[5.5rem_1fr] items-center gap-4 border-t border-rule py-4 sm:grid-cols-[5.5rem_1fr_auto]"
              >
                <Plate photo={recipe.photo} />
                <span>
                  <span className="block font-display text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <span className="block font-display text-3xl leading-tight group-hover:italic">
                    {recipe.title}
                  </span>
                  <span className="mt-1 line-clamp-1 block text-sm text-ink-soft">{recipe.note}</span>
                </span>
                <span className="hidden text-sm text-ink-soft sm:block">{recipe.time}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/recipes/new"
              className="group grid grid-cols-[5.5rem_1fr] items-center gap-4 border-y border-dashed border-ink/25 py-4"
            >
              <span className="grid aspect-[6/5] place-items-center rounded-full border border-dashed border-ink/30 font-display text-3xl">
                +
              </span>
              <span>
                <span className="block font-display text-3xl leading-tight group-hover:italic">
                  A blank card
                </span>
                <span className="mt-1 block text-sm text-ink-soft">Write the next recipe by hand.</span>
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
