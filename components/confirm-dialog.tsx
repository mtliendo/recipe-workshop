"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/button";

export function ConfirmDialog({
  title,
  body,
  confirmLabel,
  cancelLabel,
  tone = "danger",
  onConfirm,
  onCancel,
}: {
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
  tone?: "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef(onCancel);

  useEffect(() => {
    cancelRef.current = onCancel;
  }, [onCancel]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    function handleCancel(event: Event) {
      event.preventDefault();
      cancelRef.current();
    }

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-title"
      className="w-[min(100%,28rem)]"
      onClick={(event) => {
        if (event.target === event.currentTarget) cancelRef.current();
      }}
    >
      <div className="settle bg-foam px-6 py-6 shadow-[0_24px_70px_rgba(36,25,16,0.28)]">
        <h2 id="confirm-title" className="font-display text-3xl leading-tight">
          {title}
        </h2>
        <p className="mt-3 text-ink-soft">{body}</p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button type="button" tone="quiet" autoFocus onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button type="button" tone={tone} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
