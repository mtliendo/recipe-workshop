import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { resolveAppBaseUrl } from "@/lib/app-base-url";

export const auth0 = new Auth0Client({
  appBaseUrl: resolveAppBaseUrl(),
});
