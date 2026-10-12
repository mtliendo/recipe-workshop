import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { KitchenNav, KitchenNavFallback } from "@/components/kitchen-nav";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-foam focus:px-3 focus:py-2"
      >
        Skip to the box
      </a>
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col px-5 pb-20 pt-6 sm:px-8">
        <header className="border-b-4 border-double border-ink pb-4">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <Link href="/" className="leading-none">
              <span className="font-display text-4xl italic tracking-tight">Sunday</span>
              <span className="ml-2 font-display text-xs uppercase tracking-[0.32em]">Box</span>
            </Link>
            <Suspense fallback={<KitchenNavFallback />}>
              <KitchenNav />
            </Suspense>
          </div>
          <p className="mt-3 font-display text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
            Maya’s kitchen
          </p>
        </header>
        <main id="content" className="flex-1 pt-8">
          {children}
        </main>
      </div>
    </>
  );
}
