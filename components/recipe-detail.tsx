"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { DevelopPlate } from "@/components/develop-plate";
import { deleteRecipe, saveRecipe, useBox } from "@/lib/store";
import type { Recipe } from "@/lib/types";

export function RecipeDetail({ initialRecipe, index }: { initialRecipe: Recipe; index: number }) {
  const router = useRouter();
  const { recipes } = useBox();
  const recipe = recipes.find((item) => item.id === initialRecipe.id) ?? initialRecipe;
  const cardIndex = recipes.some((item) => item.id === recipe.id)
    ? recipes.findIndex((item) => item.id === recipe.id)
    : index;
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    const previous = document.title;
    document.title = `${recipe.title} · Sunday Box`;
    return () => {
      document.title = previous;
    };
  }, [recipe.title]);

  return (
    <article className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div>
        <DevelopPlate
          photo={recipe.photo}
          subject={`${recipe.title}. ${recipe.note}`}
          onPhoto={(photo) => {
            void saveRecipe({ ...recipe, photo }).then((message) => setPhotoError(message ?? ""));
          }}
        />
        {photoError ? <p className="mt-3 text-center text-sm text-paprika">{photoError}</p> : null}
      </div>
      <div>
        <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
          Card {String(cardIndex + 1).padStart(2, "0")}
        </p>
        <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">{recipe.title}</h1>
        {recipe.note ? <p className="mt-4 max-w-xl text-lg italic text-ink-soft">{recipe.note}</p> : null}
        <p className="mt-4 text-sm uppercase tracking-[0.16em] text-ink-soft">
          {[recipe.time, recipe.servings ? `serves ${recipe.servings}` : ""].filter(Boolean).join(" · ")}
        </p>

        <div className="mt-8 grid gap-8">
          <section>
            <h2 className="font-display text-[0.68rem] uppercase tracking-[0.18em]">Ingredients</h2>
            {recipe.ingredients.length === 0 ? (
              <p className="mt-3 text-sm text-ink-soft">No ingredients on this card.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-x-3">
                    <span className="whitespace-nowrap text-ink-soft">{ingredient.amount}</span>
                    <span>{ingredient.item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2 className="font-display text-[0.68rem] uppercase tracking-[0.18em]">Method</h2>
            {recipe.steps.length === 0 ? (
              <p className="mt-3 text-sm text-ink-soft">No steps on this card.</p>
            ) : (
              <ol className="mt-3 space-y-3">
                {recipe.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="grid grid-cols-[1.5rem_1fr] gap-2">
                    <span className="font-display text-paprika">{stepIndex + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={`/recipes/${recipe.id}/edit`}>Revise this card</ButtonLink>
          <Button type="button" tone="danger" onClick={() => setConfirmingDelete(true)}>
            Take it out
          </Button>
          <Link
            href="/box"
            className="inline-flex items-center px-2 text-sm text-ink-soft underline decoration-ink/20 underline-offset-4"
          >
            Back to the box
          </Link>
        </div>
      </div>

      {confirmingDelete ? (
        <ConfirmDialog
          title="Take this card out?"
          body={`“${recipe.title}” leaves the box.`}
          confirmLabel="Take it out"
          cancelLabel="Keep the card"
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={() => {
            void deleteRecipe(recipe.id).then((message) => {
              if (message) {
                setPhotoError(message);
                setConfirmingDelete(false);
                return;
              }
              router.push("/box");
            });
          }}
        />
      ) : null}
    </article>
  );
}
