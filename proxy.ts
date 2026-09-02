import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Expose the current path to Server Components (used to gate public chrome).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", path);

  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    // Run on everything except Next internals and static assets.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
