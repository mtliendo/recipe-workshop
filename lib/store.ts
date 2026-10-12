"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Recipe, Settings } from "@/lib/types";

const SETTINGS_KEY = "sunday-box:settings:v1";

const DEFAULT_SETTINGS: Settings = { googleConnected: false };

type Box = {
  recipes: Recipe[];
  settings: Settings;
  ready: boolean;
  signedIn: boolean;
  error: string;
};

const serverBox: Box = {
  recipes: [],
  settings: DEFAULT_SETTINGS,
  ready: false,
  signedIn: false,
  error: "",
};

let box: Box = serverBox;
const listeners = new Set<() => void>();
let started = false;

function readSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const value = JSON.parse(raw) as Partial<Settings>;
    return { googleConnected: value.googleConnected === true };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function writeSettings(settings: Settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function commit(next: Box) {
  box = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function snapshot() {
  return box;
}

async function readError(response: Response, fallback: string) {
  const payload = (await response.json().catch(() => null)) as { error?: unknown } | null;
  return typeof payload?.error === "string" ? payload.error : fallback;
}

export async function refreshRecipes() {
  let response: Response;
  try {
    response = await fetch("/api/recipes");
  } catch {
    return;
  }
  if (response.status === 401) {
    commit({ ...box, recipes: [], ready: true, signedIn: false, error: "" });
    return;
  }
  if (!response.ok) {
    commit({ ...box, ready: true, error: await readError(response, "The box couldn't be opened.") });
    return;
  }
  const recipes = (await response.json()) as Recipe[];
  commit({ ...box, recipes, ready: true, signedIn: true, error: "" });
}

function start() {
  if (started) return;
  started = true;
  commit({ ...box, settings: readSettings() });
  void refreshRecipes();
}

export function useBox() {
  const value = useSyncExternalStore(subscribe, snapshot, () => serverBox);
  useEffect(start, []);
  return value;
}

export async function saveRecipe(recipe: Recipe) {
  const response = await fetch(`/api/recipes/${recipe.id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(recipe),
  });
  if (!response.ok) return readError(response, "The card couldn't be saved.");
  const saved = (await response.json()) as Recipe;
  const exists = box.recipes.some((item) => item.id === saved.id);
  const recipes = exists
    ? box.recipes.map((item) => (item.id === saved.id ? saved : item))
    : [saved, ...box.recipes];
  commit({ ...box, recipes, ready: true, error: "" });
  return null;
}

export async function deleteRecipe(id: string) {
  const response = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
  if (!response.ok) return readError(response, "The card couldn't be taken out.");
  commit({
    ...box,
    recipes: box.recipes.filter((item) => item.id !== id),
    ready: true,
    error: "",
  });
  return null;
}

export function setGoogleConnected(googleConnected: boolean) {
  const settings = { googleConnected };
  writeSettings(settings);
  commit({ ...box, settings });
  return true;
}
