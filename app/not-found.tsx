import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
      <div className="max-w-xl">
        <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
          Missing page
        </p>
        <h1 className="mt-3 font-display text-5xl leading-none">That page isn’t in the box.</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/box" tone="quiet">
            Back to the box
          </ButtonLink>
          <ButtonLink href="/" tone="quiet">
            Workshop
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
