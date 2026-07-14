import { NextRequest } from "next/server";
import { readData } from "@/lib/data-store";
type Highlight = any;

export async function GET(req: NextRequest) {
  const highlights = readData<Highlight[]>("highlights.json");
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  let result = highlights.filter(h => h.active);
  if (category) {
    result = result.filter(h => h.category === category);
  }

  return Response.json(result, {
    headers: { "Cache-Control": "no-store" },
  });
}
