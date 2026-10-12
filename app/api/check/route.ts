import { NextResponse } from "next/server";
import { ConfigError, TimeoutError, analyzeMessage } from "@/lib/analyze";
import { MAX_MESSAGE_LENGTH, type CheckResponse } from "@/lib/types";

export const maxDuration = 30;

export async function POST(request: Request): Promise<NextResponse<CheckResponse>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "BAD_REQUEST" }, { status: 400 });
  }

  const raw =
    body && typeof body === "object" && typeof (body as { message?: unknown }).message === "string"
      ? (body as { message: string }).message
      : "";

  const message = raw.trim();

  if (!message) {
    return NextResponse.json({ ok: false, code: "EMPTY" }, { status: 400 });
  }

  const trimmed = message.slice(0, MAX_MESSAGE_LENGTH);

  try {
    const result = await analyzeMessage(trimmed);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    if (error instanceof ConfigError) {
      return NextResponse.json(
        { ok: false, code: "NOT_CONFIGURED" },
        { status: 500 }
      );
    }
    if (error instanceof TimeoutError) {
      return NextResponse.json({ ok: false, code: "TIMEOUT" }, { status: 504 });
    }
    return NextResponse.json(
      { ok: false, code: "PROVIDER_ERROR" },
      { status: 502 }
    );
  }
}
