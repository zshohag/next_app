import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const token = cookies(request).get("__Secure-next-auth.session-token");
  console.log("Middleware triggered for:", request.nextUrl.pathname);
  console.log("Token found:", token);

  const pathname = request.nextUrl.pathname;

  // Skip API routes
  if (pathname.includes("api")) {
    return NextResponse.next();
  }

  // Redirect to login if no token is present
  if (!token) {
    const redirectURL = new URL(
      `/login?redirect=${encodeURIComponent(pathname)}`,
      request.nextUrl.origin
    );
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/products/:id", "/my-orders/:path*","/products/:path*"],
};
