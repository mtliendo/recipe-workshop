import { ButtonLink } from "@/components/button";

export function OpeningCard() {
  return <p className="font-display text-4xl italic">Opening the card…</p>;
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
        <ButtonLink href="/" tone="quiet">
          Back to the box
        </ButtonLink>
      </div>
    </div>
  );
}
