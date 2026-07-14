import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { signToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "admin@ibexadventure.in";
    const expectedPassword = process.env.ADMIN_PASSWORD || "ibexadmin2024";

    if (email === expectedEmail && password === expectedPassword) {
      const token = await signToken({ email, role: "admin" });

      const response = NextResponse.json({ success: true });

      // Set cookie for middleware check
      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      // Set cookie for secure API access
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  
  response.cookies.delete("admin_session");
  response.cookies.delete("admin_token");
  
  return response;
}
