import { ButtonLink } from "@/components/button";

const signInClass =
  "inline-flex items-center justify-center bg-paprika px-4 py-2.5 text-sm text-foam transition hover:bg-paprika-deep";

export function OpeningCard() {
  return <p className="font-display text-4xl italic">Opening the card…</p>;
}

export function SignInPrompt({
  returnTo,
  title,
  body,
}: {
  returnTo: string;
  title: string;
  body: string;
}) {
  return (
    <section className="max-w-xl">
      <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-paprika">The family box</p>
      <h1 className="mt-3 font-display text-6xl leading-none">{title}</h1>
      <p className="mt-4 text-lg text-ink-soft">{body}</p>
      <div className="mt-8">
        <a href={`/auth/login?returnTo=${encodeURIComponent(returnTo)}`} className={signInClass}>
          Sign in
        </a>
      </div>
    </section>
  );
}

export function MissingCard() {
  return (
    <div className="max-w-xl">
      <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
        Missing card
      </p>
      <h1 className="mt-3 font-display text-5xl leading-none">This card isn’t in the box.</h1>
      <p className="mt-4 text-ink-soft">It may have been taken out, or the address is wrong.</p>
      <div className="mt-6">
        <ButtonLink href="/box" tone="quiet">
          Back to the box
        </ButtonLink>
      </div>
    </div>
  );
}
