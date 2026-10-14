import { Suspense } from "react";
import type { Metadata } from "next";
import { ChatView } from "@/components/chat-view";
import { SignedIn } from "@/components/signed-in";
import { OpeningCard } from "@/components/status";

export const metadata: Metadata = { title: "Kitchen" };

export default function ChatPage() {
  return (
    <Suspense fallback={<OpeningCard />}>
      <SignedIn returnTo="/chat">
        <ChatView />
      </SignedIn>
    </Suspense>
  );
}
