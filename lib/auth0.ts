import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { resolveAppBaseUrl } from "@/lib/app-base-url";

const appBaseUrl = resolveAppBaseUrl();

export const auth0 = new Auth0Client({
  ...(appBaseUrl ? { appBaseUrl } : {}),
  signInReturnToPath: "/box",
});
