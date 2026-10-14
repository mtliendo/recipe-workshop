export const WORKSHOP_TITLE = "Your First Product: Building for Humans and Agents";
export const WORKSHOP_REPO = "https://github.com/mtliendo/recipe-workshop";

export const WORKSHOP_MODULES = [
  {
    number: 0,
    title: "Land the Sunday Box shell as the starting point",
    status: "done",
    note: "The kitchen UI, recipe cards, and Vercel project are in the repo.",
  },
  {
    number: 1,
    title: "Each recipe belongs to the signed-in user",
    status: "done",
    note: "Auth0 sign-in. Cards are stored with that person’s Auth0 id.",
  },
  {
    number: 2,
    title: "Setup the live kitchen",
    status: "done",
    note: "Kitchen chat, Vercel Blob photos, and Photograph it through the AI Gateway.",
  },
  {
    number: 3,
    title: "Token Vault + Google Calendar",
    status: "next",
    note: "Settings has a Google Calendar mark only. Connecting does not open Google yet.",
  },
  {
    number: 4,
    title: "Upcoming",
    status: "upcoming",
    note: "Not in this repo yet.",
  },
  {
    number: 5,
    title: "Upcoming",
    status: "upcoming",
    note: "Not in this repo yet.",
  },
  {
    number: 6,
    title: "Upcoming",
    status: "upcoming",
    note: "Not in this repo yet.",
  },
  {
    number: 7,
    title: "Upcoming",
    status: "upcoming",
    note: "Not in this repo yet.",
  },
] as const;

export const WORKSHOP_STACK = [
  "Next.js",
  "Auth0",
  "Neon",
  "Vercel Blob",
  "AI Gateway",
] as const;
