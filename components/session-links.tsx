import { auth0 } from "@/lib/auth0";

export async function SessionLinks() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <span className="flex items-center gap-4">
        <a
          href="/auth/login?screen_hint=signup"
          className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft hover:text-ink"
        >
          Sign up
        </a>
        <a
          href="/auth/login"
          className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-paprika"
        >
          Sign in
        </a>
      </span>
    );
  }

  const label = session.user.given_name || session.user.name || session.user.email || "Signed in";

  return (
    <span className="flex items-center gap-4 text-sm">
      <span className="text-ink-soft">{label}</span>
      <a href="/auth/logout" className="font-display text-[0.68rem] uppercase tracking-[0.22em]">
        Sign out
      </a>
    </span>
  );
}
