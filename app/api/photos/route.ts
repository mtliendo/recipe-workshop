import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/session";

const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  const denied = await requireUser();
  if (denied) return denied;

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a picture first." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "That file isn’t a picture." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Use a picture smaller than 4 MB." }, { status: 400 });
  }

  try {
    const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const blob = await put(`plates/${crypto.randomUUID()}.${extension}`, file, {
      access: "public",
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json({ error: "The picture couldn't be saved." }, { status: 500 });
  }
}
