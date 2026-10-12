import { Suspense } from "react";
import type { Metadata } from "next";
import { SettingsView } from "@/components/settings-view";
import { SignedIn } from "@/components/signed-in";
import { OpeningCard } from "@/components/status";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <Suspense fallback={<OpeningCard />}>
      <SignedIn returnTo="/settings">
        <SettingsView />
      </SignedIn>
    </Suspense>
  );
}
