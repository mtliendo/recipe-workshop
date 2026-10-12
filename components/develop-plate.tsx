"use client";

import { useEffect, useRef, useState } from "react";
import { Plate } from "@/components/plate";
import { nextPreset } from "@/lib/recipes";

export function DevelopPlate({
  photo,
  subject,
  onPhoto,
}: {
  photo: string;
  subject: string;
  onPhoto: (photo: string) => void;
}) {
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function develop() {
    if (busy) return;
    setMessage("");
    setBusy("Developing the photo…");
    timer.current = window.setTimeout(() => {
      onPhoto(nextPreset(photo));
      setBusy("");
    }, 680);
  }

  async function sendPicture(path: string, body: BodyInit, headers?: HeadersInit) {
    const response = await fetch(path, { method: "POST", body, headers });
    const payload = (await response.json().catch(() => null)) as { url?: unknown; error?: unknown } | null;
    if (!response.ok || typeof payload?.url !== "string") {
      setBusy("");
      setMessage(typeof payload?.error === "string" ? payload.error : "That picture couldn't be saved.");
      return;
    }
    onPhoto(payload.url);
    setBusy("");
  }

  async function chooseFile(file: File | undefined) {
    if (!file || busy) return;
    setMessage("");
    setBusy("Saving the picture…");
    const body = new FormData();
    body.set("file", file);
    await sendPicture("/api/photos", body);
  }

  async function photograph() {
    if (busy) return;
    setMessage("");
    setBusy("Photographing the plate…");
    await sendPicture(
      "/api/photos/generate",
      JSON.stringify({ subject: subject.trim() || "a home-cooked Sunday dinner" }),
      { "content-type": "application/json" },
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={develop}
        className="group relative block w-full text-left transition hover:-translate-y-1"
      >
        <Plate photo={photo} />
        <span className="sr-only">
          {photo ? "Develop a new photo" : "Develop a photo for this card"}
        </span>
        {busy ? (
          <span className="absolute inset-[12%] grid place-items-center rounded-[50%] bg-paper/80 px-6 text-center font-display text-2xl italic">
            {busy}
          </span>
        ) : null}
      </button>
      <p className={`mt-2 text-center text-sm ${message ? "text-paprika" : "text-ink-soft"}`}>
        {message || "Click the plate for a drawing."}
      </p>
      <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
        <label className="cursor-pointer underline decoration-ink/30 underline-offset-4 hover:decoration-paprika">
          Use a picture instead
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              void chooseFile(file);
              event.target.value = "";
            }}
          />
        </label>
        <button
          type="button"
          onClick={() => void photograph()}
          className="underline decoration-ink/30 underline-offset-4 hover:decoration-paprika"
        >
          Photograph it
        </button>
      </div>
    </div>
  );
}
