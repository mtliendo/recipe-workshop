function asAbsoluteOrigin(value: string | undefined) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

function parseAppBaseUrlEnv(value: string | undefined) {
  if (!value) return [];
  return value
    .split(",")
    .map((part) => asAbsoluteOrigin(part))
    .filter((part): part is string => Boolean(part))
    .filter((part, index, list) => list.indexOf(part) === index);
}

function compactOrigins(origins: Array<string | undefined>) {
  const unique = origins.filter(
    (value, index, list): value is string => Boolean(value) && list.indexOf(value) === index,
  );
  if (unique.length === 0) return undefined;
  return unique.length === 1 ? unique[0] : unique;
}

/**
 * Production and local `pnpm dev` keep APP_BASE_URL (comma-separated
 * lists are split; the Auth0 SDK rejects a raw comma string).
 * Preview must accept Vercel’s changing hosts, so we allow the
 * branch alias and the unique deploy URL. The Auth0 SDK then
 * picks the host from the incoming request.
 */
export function resolveAppBaseUrl(): string | string[] | undefined {
  const vercelEnv = process.env.VERCEL_ENV;
  const fromEnv = parseAppBaseUrlEnv(process.env.APP_BASE_URL);

  if (vercelEnv === "production" || vercelEnv === "development" || !vercelEnv) {
    return compactOrigins(fromEnv);
  }

  return compactOrigins([
    asAbsoluteOrigin(process.env.VERCEL_BRANCH_URL),
    asAbsoluteOrigin(process.env.VERCEL_URL),
    ...fromEnv,
  ]);
}
