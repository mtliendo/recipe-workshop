"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button";

export function ChatView() {
  const [transport] = useState(() => new DefaultChatTransport({ api: "/api/chat" }));
  const { messages, sendMessage, status, error } = useChat({ transport });
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, busy]);

  function submit() {
    const text = draft.trim();
    if (!text || busy) return;
    void sendMessage({ text });
    setDraft("");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col">
      <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-paprika">Kitchen</p>
      <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">Ask for a card.</h1>
      <p className="mt-4 max-w-lg text-ink-soft">
        Describe a dish. The kitchen will answer.
      </p>

      <div className="mt-8 flex-1 space-y-6" aria-live="polite">
        {messages.length === 0 ? (
          <p className="border-y border-rule py-8 font-display text-2xl italic text-ink-soft">
            The table is clear. Say what you want to cook.
          </p>
        ) : (
          messages.map((message) =>
            message.role === "user" ? (
              <div key={message.id} className="ml-auto max-w-[36rem] bg-butter/50 px-4 py-3">
                <p className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
                  You
                </p>
                <p className="mt-1 whitespace-pre-wrap">
                  {message.parts.map((part, index) =>
                    part.type === "text" ? <span key={index}>{part.text}</span> : null,
                  )}
                </p>
              </div>
            ) : (
              <div key={message.id} className="max-w-[36rem]">
                <p className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-olive">
                  Kitchen
                </p>
                <p className="mt-1 whitespace-pre-wrap text-lg text-olive">
                  {message.parts.map((part, index) =>
                    part.type === "text" ? <span key={index}>{part.text}</span> : null,
                  )}
                </p>
              </div>
            ),
          )
        )}
        {busy ? <p className="font-display text-xl italic text-ink-soft">The kitchen is thinking…</p> : null}
        {error ? <p className="text-sm text-paprika">{error.message}</p> : null}
        <div ref={endRef} />
      </div>

      <form
        className="sticky bottom-0 mt-8 border-t border-ink bg-paper/95 py-4 backdrop-blur-sm"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label htmlFor="kitchen-message" className="sr-only">
          Message the kitchen
        </label>
        <textarea
          id="kitchen-message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
          rows={3}
          placeholder="A weeknight soup, something with the peaches…"
          className="w-full resize-none bg-transparent py-2 outline-none placeholder:text-ink-soft/60"
        />
        <div className="mt-2 flex items-center justify-between gap-4">
          <p className="text-sm text-ink-soft">Enter sends. Shift + Enter keeps the line.</p>
          <Button type="submit" disabled={!draft.trim() || busy}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
