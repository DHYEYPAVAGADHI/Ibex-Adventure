import { NextRequest } from "next/server";
import { readData } from "@/lib/data-store";

export async function GET(req: NextRequest) {
  const settings = readData<Record<string, unknown>>("settings.json");
  return Response.json(settings, {
    headers: { "Cache-Control": "no-store" },
  });
}
