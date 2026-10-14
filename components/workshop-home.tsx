import { Suspense } from "react";
import Link from "next/link";
import { WorkshopCta, WorkshopCtaFallback } from "@/components/workshop-cta";
import {
  WORKSHOP_MODULES,
  WORKSHOP_REPO,
  WORKSHOP_STACK,
  WORKSHOP_TITLE,
} from "@/lib/workshop";

const statusLabel = {
  done: "Done",
  next: "Next",
  upcoming: "Upcoming",
} as const;

export function WorkshopHome() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col px-5 pb-20 pt-6 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b-4 border-double border-ink pb-4">
        <Link href="/" className="max-w-[16rem] leading-tight sm:max-w-none">
          <span className="block font-display text-[0.68rem] uppercase tracking-[0.22em] text-paprika">
            Workshop
          </span>
          <span className="mt-1 block font-display text-2xl leading-none tracking-tight sm:text-3xl">
            Humans and Agents
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={WORKSHOP_REPO}
            className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft hover:text-ink"
          >
            GitHub
          </a>
          <Suspense fallback={<WorkshopCtaFallback />}>
            <WorkshopCta />
          </Suspense>
        </div>
      </header>

      <main className="flex-1">
        <section className="grid gap-8 pt-10 md:grid-cols-[1.15fr_0.85fr] md:items-end md:pt-16">
          <div>
            <p className="rise font-display text-[0.68rem] uppercase tracking-[0.22em] text-paprika">
              A hands-on workshop
            </p>
            <h1
              className="rise mt-4 font-display text-4xl leading-[0.95] font-light tracking-tight sm:text-6xl"
              style={{ animationDelay: "70ms" }}
            >
              {WORKSHOP_TITLE}
            </h1>
            <p
              className="rise mt-5 max-w-xl text-lg leading-relaxed text-ink-soft"
              style={{ animationDelay: "140ms" }}
            >
              Build a product people can sign into, then teach an agent to work beside
              them. The app in this repo is Sunday Box — Maya’s family recipe box.
            </p>
            <div className="rise mt-8" style={{ animationDelay: "210ms" }}>
              <Suspense fallback={<WorkshopCtaFallback />}>
                <WorkshopCta />
              </Suspense>
            </div>
          </div>
          <aside
            className="rise border border-ink/10 bg-foam p-5 sm:p-6"
            style={{ animationDelay: "180ms" }}
          >
            <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
              Today’s kitchen
            </p>
            <p className="mt-3 font-display text-3xl leading-none">Sunday Box</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Sign in, write a card, ask the kitchen, photograph a plate. Google
              Calendar is still only a mark on Settings.
            </p>
          </aside>
        </section>

        <section className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
              What you build
            </h2>
            <h3 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Maya’s box, in an app.
            </h3>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Maya keeps family recipes on cards. Sunday Box is that box on the web:
              each person signs in, writes their own cards, and can ask the kitchen
              for a next step. Later modules teach the app to talk to Google Calendar
              through Auth0 Token Vault.
            </p>
          </div>
          <div>
            <h2 className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
              The stack
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2">
              {WORKSHOP_STACK.map((item) => (
                <li
                  key={item}
                  className="border border-ink/10 bg-foam px-3 py-2 font-display text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
            Modules
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">
            Status comes from this repo. 0–2 are in the app. Module 3 is next.
            4–7 are not named here yet.
          </p>
          <ol className="mt-6 divide-y divide-rule border-y border-rule">
            {WORKSHOP_MODULES.map((module) => (
              <li
                key={module.number}
                className="grid gap-2 py-4 sm:grid-cols-[3.5rem_1fr_7rem] sm:items-baseline sm:gap-4"
              >
                <span className="font-display text-sm text-paprika">
                  {String(module.number).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-2xl leading-tight">
                    {module.title}
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">{module.note}</span>
                </span>
                <span
                  className={
                    module.status === "done"
                      ? "font-display text-[0.68rem] uppercase tracking-[0.18em] text-olive"
                      : module.status === "next"
                        ? "font-display text-[0.68rem] uppercase tracking-[0.18em] text-paprika"
                        : "font-display text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft"
                  }
                >
                  {statusLabel[module.status]}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 border border-ink/10 bg-foam p-6 sm:p-8">
          <h2 className="font-display text-3xl leading-none sm:text-4xl">Try the app.</h2>
          <p className="mt-3 max-w-xl text-ink-soft">
            The box, kitchen, and settings stay behind login. Sign in to open your
            cards at <span className="italic">/box</span>.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Suspense fallback={<WorkshopCtaFallback />}>
              <WorkshopCta />
            </Suspense>
            <a
              href={WORKSHOP_REPO}
              className="text-sm text-ink-soft underline decoration-ink/20 underline-offset-4 hover:text-ink"
            >
              Open the GitHub repo
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
