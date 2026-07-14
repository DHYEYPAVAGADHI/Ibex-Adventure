import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET ?? "ibex-adventure-fallback-secret";

function base64url(buf: Uint8Array | ArrayBuffer): string {
  return Buffer.from(buf instanceof Uint8Array ? buf : new Uint8Array(buf))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  const header = base64url(new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body = base64url(new TextEncoder().encode(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) })));
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${header}.${body}`));
  return `${header}.${body}.${base64url(sig)}`;
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const key = await getKey();
    const sigBuf = Buffer.from(sig.replace(/-/g, "+").replace(/_/g, "/"), "base64");
    const valid = await crypto.subtle.verify("HMAC", key, sigBuf, new TextEncoder().encode(`${header}.${body}`));
    if (!valid) return null;
    return JSON.parse(Buffer.from(body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

export async function getAdminFromRequest(): Promise<Record<string, unknown> | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
