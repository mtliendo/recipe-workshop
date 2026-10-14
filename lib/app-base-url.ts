function originFromHost(host: string | undefined) {
  if (!host) return undefined;
  return host.startsWith("http://") || host.startsWith("https://") ? host : `https://${host}`;
}

/**
 * Production and local `pnpm dev` keep a fixed APP_BASE_URL.
 * Preview must accept Vercel’s changing hosts, so we allow the
 * branch alias and the unique deploy URL. The Auth0 SDK then
 * picks the host from the incoming request.
 */
export function resolveAppBaseUrl(): string | string[] | undefined {
  const vercelEnv = process.env.VERCEL_ENV;

  if (vercelEnv === "production" || vercelEnv === "development" || !vercelEnv) {
    return process.env.APP_BASE_URL || undefined;
  }

  const origins = [
    originFromHost(process.env.VERCEL_BRANCH_URL),
    originFromHost(process.env.VERCEL_URL),
    process.env.APP_BASE_URL,
  ].filter((value, index, list): value is string => Boolean(value) && list.indexOf(value) === index);

  return origins.length > 1 ? origins : origins[0];
}
