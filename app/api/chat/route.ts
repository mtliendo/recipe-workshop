import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { requireUser } from "@/lib/session";

export const maxDuration = 30;

export async function POST(request: Request) {
  const denied = await requireUser();
  if (denied) return denied;

  const model = process.env.AI_GATEWAY_MODEL;
  if (!model) {
    return Response.json({ error: "The kitchen model isn’t configured." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as { messages?: UIMessage[] } | null;
  if (!body?.messages) {
    return Response.json({ error: "Say that again." }, { status: 400 });
  }

  const result = streamText({
    model,
    instructions:
      "You are the Sunday Box kitchen. Help Maya cook from a family recipe box. Speak warmly and briefly, in plain sentences. Suggest a dish, a substitution, or the next step. Do not claim a card was saved.",
    messages: await convertToModelMessages(body.messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
