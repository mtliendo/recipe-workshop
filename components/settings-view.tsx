"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { GOOGLE_ACCOUNT } from "@/lib/recipes";
import { resetBox, setGoogleConnected, useBox } from "@/lib/store";

type Pending = "connect" | "disconnect" | "reset" | null;

export function SettingsView() {
  const { settings } = useBox();
  const [pending, setPending] = useState<Pending>(null);

  return (
    <div className="max-w-2xl">
      <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-paprika">Settings</p>
      <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">The kitchen settings.</h1>
      <p className="mt-4 text-lg text-ink-soft">
        The recipe cards are saved. Google is still only a mark on this page.
      </p>

      <section className="mt-10 border border-ink/10 bg-foam p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl">Google Calendar</h2>
            <p className="mt-2 max-w-md text-ink-soft">
              Later, a recipe can land on Sunday. For now, connecting only changes this card.
            </p>
          </div>
          <span
            className={`mt-1 h-3 w-3 shrink-0 rounded-full ${settings.googleConnected ? "bg-olive" : "bg-ink/20"}`}
            aria-hidden="true"
          />
        </div>
        {settings.googleConnected ? (
          <p className="mt-5 text-sm">
            Connected as <span className="italic">{GOOGLE_ACCOUNT}</span>
          </p>
        ) : (
          <p className="mt-5 text-sm text-ink-soft">Not connected.</p>
        )}
        <div className="mt-6">
          {settings.googleConnected ? (
            <Button type="button" tone="quiet" onClick={() => setPending("disconnect")}>
              Disconnect Google
            </Button>
          ) : (
            <Button type="button" onClick={() => setPending("connect")}>
              Connect Google
            </Button>
          )}
        </div>
      </section>

      <section className="mt-8 border-t border-rule pt-8">
        <h2 className="font-display text-3xl">Grandma’s cards</h2>
        <p className="mt-2 max-w-md text-ink-soft">
          Put the brisket, cornbread, and cobbler back. This also clears the kitchen chat and the
          Google mark.
        </p>
        <div className="mt-5">
          <Button type="button" tone="quiet" onClick={() => setPending("reset")}>
            Restore the original box
          </Button>
        </div>
      </section>

      {pending === "connect" ? (
        <ConfirmDialog
          title="Connect Google?"
          body="This doesn’t open Google. It only marks the kitchen as connected so we can design that state."
          confirmLabel="Mark as connected"
          cancelLabel="Not now"
          tone="primary"
          onCancel={() => setPending(null)}
          onConfirm={() => {
            setGoogleConnected(true);
            setPending(null);
          }}
        />
      ) : null}
      {pending === "disconnect" ? (
        <ConfirmDialog
          title="Disconnect Google?"
          body="The calendar mark comes off this kitchen. Nothing was actually linked."
          confirmLabel="Disconnect"
          cancelLabel="Stay connected"
          onCancel={() => setPending(null)}
          onConfirm={() => {
            setGoogleConnected(false);
            setPending(null);
          }}
        />
      ) : null}
      {pending === "reset" ? (
        <ConfirmDialog
          title="Put Grandma’s cards back?"
          body="The box returns to the three original cards, and the Google mark is cleared."
          confirmLabel="Restore the box"
          cancelLabel="Leave it"
          onCancel={() => setPending(null)}
          onConfirm={() => {
            void resetBox().then(() => setPending(null));
          }}
        />
      ) : null}
    </div>
  );
}
