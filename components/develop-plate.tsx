"use client";

import { useEffect, useRef, useState } from "react";
import { Plate } from "@/components/plate";
import { fileToPlatePhoto } from "@/lib/image";
import { nextPreset } from "@/lib/recipes";

export function DevelopPlate({
  photo,
  onPhoto,
}: {
  photo: string;
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

  async function chooseFile(file: File | undefined) {
    if (!file || busy) return;
    setMessage("");
    setBusy("Preparing the picture…");
    try {
      onPhoto(await fileToPlatePhoto(file));
      setBusy("");
    } catch (error) {
      setBusy("");
      setMessage(error instanceof Error ? error.message : "That picture couldn't be read.");
    }
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
        {message || "Click the plate to develop a photo."}
      </p>
      <label className="mt-1 block cursor-pointer text-center text-sm underline decoration-ink/30 underline-offset-4 hover:decoration-paprika">
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
    </div>
  );
}
