"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { DevelopPlate } from "@/components/develop-plate";
import { blankIngredient, blankRecipe, cleanRecipe } from "@/lib/recipes";
import { deleteRecipe, saveRecipe } from "@/lib/store";
import type { Recipe } from "@/lib/types";

const fieldClass =
  "w-full border-b border-ink/20 bg-transparent py-2 outline-none placeholder:text-ink-soft/50 focus:border-paprika";

export function RecipeForm({
  initial,
  heading,
  submitLabel,
}: {
  initial: Recipe | null;
  heading: string;
  submitLabel: string;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<Recipe>(() => initial ?? blankRecipe());
  const [error, setError] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const ingredients = draft.ingredients.filter((item) => item.amount.trim() || item.item.trim());
  const steps = draft.steps.map((step) => step.trim()).filter(Boolean);

  function updateIngredient(id: string, patch: { amount?: string; item?: string }) {
    setDraft((current) => ({
      ...current,
      ingredients: current.ingredients.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }));
  }

  function addIngredient() {
    setDraft((current) => ({
      ...current,
      ingredients: [...current.ingredients, blankIngredient()],
    }));
  }

  function save() {
    const recipe = cleanRecipe(draft);
    if (!recipe.title) {
      setError("A card needs a title.");
      return;
    }
    if (!saveRecipe(recipe)) {
      setError("This browser couldn't hold the card. Try a smaller picture.");
      return;
    }
    router.push(`/recipes/${recipe.id}`);
  }

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <form
        className="max-w-xl"
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
      >
        <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
          {initial ? "Revise" : "New card"}
        </p>
        <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">{heading}</h1>

        <div className="mt-8 lg:hidden">
          <DevelopPlate
            photo={draft.photo}
            onPhoto={(photo) => setDraft((current) => ({ ...current, photo }))}
          />
        </div>

        <label className="mt-8 block">
          <span className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
            Title
          </span>
          <input
            value={draft.title}
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
            className={`${fieldClass} font-display text-3xl`}
            placeholder="Sunday something"
            required
          />
        </label>

        <label className="mt-6 block">
          <span className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
            Note
          </span>
          <textarea
            value={draft.note}
            onChange={(event) => setDraft((current) => ({ ...current, note: event.target.value }))}
            className={`${fieldClass} min-h-20 resize-y italic`}
            placeholder="What would Grandma have scribbled in the margin?"
          />
        </label>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <label>
            <span className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
              Time
            </span>
            <input
              value={draft.time}
              onChange={(event) => setDraft((current) => ({ ...current, time: event.target.value }))}
              className={fieldClass}
              placeholder="12 hours"
            />
          </label>
          <label>
            <span className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
              Serves
            </span>
            <input
              value={draft.servings}
              onChange={(event) =>
                setDraft((current) => ({ ...current, servings: event.target.value }))
              }
              className={fieldClass}
              placeholder="8"
            />
          </label>
        </div>

        <fieldset className="mt-10">
          <legend className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
            Ingredients
          </legend>
          <ul className="mt-3 space-y-3">
            {draft.ingredients.map((ingredient, index) => (
              <li key={ingredient.id} className="settle grid gap-3 sm:grid-cols-[6rem_1fr_auto]">
                <input
                  value={ingredient.amount}
                  onChange={(event) => updateIngredient(ingredient.id, { amount: event.target.value })}
                  className={fieldClass}
                  placeholder="2 tbsp"
                  aria-label={`Amount ${index + 1}`}
                  autoFocus={ingredient.amount === "" && ingredient.item === "" && index === draft.ingredients.length - 1}
                />
                <input
                  value={ingredient.item}
                  onChange={(event) => updateIngredient(ingredient.id, { item: event.target.value })}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addIngredient();
                    }
                  }}
                  className={fieldClass}
                  placeholder="paprika"
                  aria-label={`Ingredient ${index + 1}`}
                />
                <button
                  type="button"
                  className="text-sm text-ink-soft underline decoration-ink/20 underline-offset-4 hover:text-paprika"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      ingredients: current.ingredients.filter((item) => item.id !== ingredient.id),
                    }))
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={addIngredient}
              className="text-sm underline decoration-paprika decoration-2 underline-offset-4"
            >
              Add an ingredient
            </button>
            <p className="text-sm text-ink-soft" aria-live="polite">
              {ingredients.length === 0
                ? "Nothing on the card yet."
                : `${ingredients.length} on the card.`}
            </p>
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
            Method
          </legend>
          <ol className="mt-3 space-y-4">
            {draft.steps.map((step, index) => (
              <li key={index} className="settle grid grid-cols-[2rem_1fr] gap-3">
                <span className="pt-2 font-display text-paprika">{index + 1}</span>
                <div>
                  <textarea
                    value={step}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        steps: current.steps.map((item, itemIndex) =>
                          itemIndex === index ? event.target.value : item,
                        ),
                      }))
                    }
                    className={`${fieldClass} min-h-16 resize-y`}
                    placeholder="What happens next?"
                    aria-label={`Step ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="mt-1 text-sm text-ink-soft underline decoration-ink/20 underline-offset-4 hover:text-paprika"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        steps: current.steps.filter((_, itemIndex) => itemIndex !== index),
                      }))
                    }
                  >
                    Remove step
                  </button>
                </div>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => setDraft((current) => ({ ...current, steps: [...current.steps, ""] }))}
            className="mt-4 text-sm underline decoration-paprika decoration-2 underline-offset-4"
          >
            Add a step
          </button>
        </fieldset>

        {error ? <p className="mt-6 text-paprika">{error}</p> : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="submit">{submitLabel}</Button>
          <Button type="button" tone="quiet" onClick={() => router.back()}>
            Cancel
          </Button>
          {initial ? (
            <Button type="button" tone="danger" onClick={() => setConfirmingDelete(true)}>
              Take it out
            </Button>
          ) : null}
        </div>
      </form>

      <aside className="sticky top-6 hidden border border-ink/10 bg-foam p-5 lg:block">
        <DevelopPlate
          photo={draft.photo}
          onPhoto={(photo) => setDraft((current) => ({ ...current, photo }))}
        />
        <h2 className="mt-4 font-display text-4xl leading-none">
          {draft.title.trim() || "Untitled card"}
        </h2>
        {draft.note.trim() ? <p className="mt-3 italic text-ink-soft">{draft.note}</p> : null}
        <p className="mt-4 text-sm uppercase tracking-[0.16em] text-ink-soft">
          {[draft.time, draft.servings ? `serves ${draft.servings}` : ""].filter(Boolean).join(" · ") ||
            "Time and servings land here"}
        </p>
        <h3 className="mt-6 font-display text-xs uppercase tracking-[0.18em]">On the card</h3>
        {ingredients.length === 0 ? (
          <p className="mt-2 text-sm text-ink-soft">Ingredients will gather here as you type them.</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {ingredients.map((ingredient) => (
              <li key={ingredient.id} className="settle flex gap-3 text-sm">
                <span className="w-24 shrink-0 whitespace-nowrap text-ink-soft">{ingredient.amount}</span>
                <span>{ingredient.item}</span>
              </li>
            ))}
          </ul>
        )}
        {steps.length > 0 ? (
          <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-ink-soft">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : null}
      </aside>

      {confirmingDelete && initial ? (
        <ConfirmDialog
          title="Take this card out?"
          body={`“${initial.title}” leaves the box. Grandma’s three cards can be put back from Settings.`}
          confirmLabel="Take it out"
          cancelLabel="Keep the card"
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={() => {
            deleteRecipe(initial.id);
            router.push("/");
          }}
        />
      ) : null}
    </div>
  );
}
