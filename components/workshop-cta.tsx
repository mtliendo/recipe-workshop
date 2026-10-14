import Link from "next/link";
import { auth0 } from "@/lib/auth0";

const primary =
  "inline-flex items-center justify-center bg-paprika px-4 py-2.5 text-sm text-foam transition hover:bg-paprika-deep";
const quiet =
  "inline-flex items-center justify-center border border-ink/20 px-4 py-2.5 text-sm text-ink transition hover:border-ink";

export async function WorkshopCta() {
  const session = await auth0.getSession();

  if (session) {
    return (
      <Link href="/box" className={primary}>
        Go to your box
      </Link>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <a href="/auth/login?returnTo=/box" className={primary}>
        Sign in / Get started
      </a>
      <a href="/auth/login?returnTo=/box&screen_hint=signup" className={quiet}>
        Sign up
      </a>
    </div>
  );
}

export function WorkshopCtaFallback() {
  return (
    <div className="flex flex-wrap gap-3">
      <a href="/auth/login?returnTo=/box" className={primary}>
        Sign in / Get started
      </a>
    </div>
  );
}
