"use client";

import { useSyncExternalStore } from "react";
import { SEED_RECIPES } from "@/lib/seed";
import type { ChatMessage, Recipe, Settings } from "@/lib/types";

const RECIPES_KEY = "sunday-box:recipes:v1";
const SETTINGS_KEY = "sunday-box:settings:v1";
const CHAT_KEY = "sunday-box:chat:v1";

const DEFAULT_SETTINGS: Settings = { googleConnected: false };

type Box = {
  recipes: Recipe[];
  settings: Settings;
  messages: ChatMessage[];
  ready: boolean;
};

const serverBox: Box = {
  recipes: SEED_RECIPES,
  settings: DEFAULT_SETTINGS,
  messages: [],
  ready: false,
};

const freshBox: Box = { ...serverBox, ready: true };

let box: Box | null = null;
const listeners = new Set<() => void>();

function readJson(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function isSettings(value: unknown): value is Settings {
  return (
    typeof value === "object" &&
    value !== null &&
    "googleConnected" in value &&
    typeof value.googleConnected === "boolean"
  );
}

function loadBox(): Box {
  const recipes = readJson(RECIPES_KEY);
  const settings = readJson(SETTINGS_KEY);
  const messages = readJson(CHAT_KEY);
  if (recipes === null && settings === null && messages === null) return freshBox;
  return {
    recipes: Array.isArray(recipes) ? (recipes as Recipe[]) : SEED_RECIPES,
    settings: isSettings(settings) ? settings : DEFAULT_SETTINGS,
    messages: Array.isArray(messages) ? (messages as ChatMessage[]) : [],
    ready: true,
  };
}

function snapshot() {
  if (typeof window === "undefined") return serverBox;
  if (!box) box = loadBox();
  return box;
}

function commit(next: Box) {
  const saved =
    writeJson(RECIPES_KEY, next.recipes) &&
    writeJson(SETTINGS_KEY, next.settings) &&
    writeJson(CHAT_KEY, next.messages);
  if (!saved) return false;
  box = next;
  listeners.forEach((listener) => listener());
  return true;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useBox() {
  return useSyncExternalStore(subscribe, snapshot, () => serverBox);
}

export function saveRecipe(recipe: Recipe) {
  const current = snapshot();
  const exists = current.recipes.some((item) => item.id === recipe.id);
  const recipes = exists
    ? current.recipes.map((item) => (item.id === recipe.id ? recipe : item))
    : [recipe, ...current.recipes];
  return commit({ ...current, recipes, ready: true });
}

export function deleteRecipe(id: string) {
  const current = snapshot();
  return commit({
    ...current,
    recipes: current.recipes.filter((item) => item.id !== id),
    ready: true,
  });
}

export function setGoogleConnected(googleConnected: boolean) {
  const current = snapshot();
  return commit({
    ...current,
    settings: { googleConnected },
    ready: true,
  });
}

export function sendChat(text: string, reply: string) {
  const trimmed = text.trim();
  if (!trimmed) return false;
  const current = snapshot();
  const messages = [
    ...current.messages,
    { id: crypto.randomUUID(), role: "user" as const, text: trimmed },
    { id: crypto.randomUUID(), role: "assistant" as const, text: reply },
  ].slice(-40);
  return commit({ ...current, messages, ready: true });
}

export function resetBox() {
  return commit({
    recipes: SEED_RECIPES,
    settings: DEFAULT_SETTINGS,
    messages: [],
    ready: true,
  });
}
