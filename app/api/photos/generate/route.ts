import { put } from "@vercel/blob";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/session";

export const maxDuration = 60;

export async function POST(request: Request) {
  const denied = await requireUser();
  if (denied) return denied;

  const model = process.env.AI_GATEWAY_IMAGE_MODEL;
  if (!model) {
    return NextResponse.json({ error: "The photograph model isn’t configured." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as { subject?: unknown } | null;
  const subject = typeof body?.subject === "string" ? body.subject.trim().slice(0, 500) : "";
  if (!subject) {
    return NextResponse.json({ error: "Name the dish before photographing it." }, { status: 400 });
  }

  try {
    const result = await generateText({
      model,
      prompt: `Generate a photograph of this home-cooked dish on a plate: ${subject}. Natural window light, a worn wooden table, no text, no labels, no people.`,
    });
    const image = result.files.find((file) => file.mediaType.startsWith("image/"));
    if (!image) {
      return NextResponse.json({ error: "The kitchen couldn't make a photograph." }, { status: 502 });
    }

    const extension = image.mediaType === "image/jpeg" ? "jpg" : "png";
    const blob = await put(`plates/${crypto.randomUUID()}.${extension}`, Buffer.from(image.uint8Array), {
      access: "public",
      contentType: image.mediaType,
    });
    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json({ error: "The photograph didn't come out." }, { status: 500 });
  }
}
