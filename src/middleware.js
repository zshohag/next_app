// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export const middleware = async (request) => {
//   const token = cookies(request).get("__Secure-next-auth.session-token");
//   console.log("Middleware triggered for:", request.nextUrl.pathname);
//   console.log("Token found:", token);

//   const pathname = request.nextUrl.pathname;

//   // Skip API routes
//   if (pathname.includes("api")) {
//     return NextResponse.next();
//   }

//   // Redirect to login if no token is present
//   if (!token) {
//     const redirectURL = new URL(
//       `/login?redirect=${encodeURIComponent(pathname)}`,
//       request.nextUrl.origin
//     );
//     return NextResponse.redirect(redirectURL);
//   }

//   return NextResponse.next();
// };

// export const config = {
//   matcher: ["/dashboard/:path*", "/my-orders/:path*","/products/:path*"],
// };


import { NextResponse } from "next/server";

export const middleware = (request) => {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const token = request.cookies.get(cookieName)?.value;

  console.log("Middleware triggered for:", request.nextUrl.pathname);
  console.log("Token found ----- ", token);

  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (!token) {
    const redirectURL = new URL(
      `/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`,
      request.nextUrl.origin
    );
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*", "/products/:id"],
};



