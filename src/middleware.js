// // import { NextResponse } from "next/server"

// import { NextResponse } from "next/server";

// // const user = true;
// // const coo = 'next-superhero'

// // export const middleware = (request) => {

// //     const cookies =  request.cookies.get('token')
// //     if(!cookies || cookies.value !== coo) {
// //         return NextResponse.redirect(new URL('/login', request.url))
// //     }

// //     return NextResponse.next()
// // }

// // export const config = {
// //     matcher : ['/dashboard', '/services']
// // }

// // import { NextResponse } from 'next/server'

// // // This function can be marked `async` if using `await` inside
// // export function middleware(request) {
// //   return NextResponse.redirect(new URL('/home', request.url))
// // }

// // // See "Matching Paths" below to learn more
// // export const config = {
// //   matcher: '/about/:path*',
// // }

// // src/middleware.js
// export default function middleware(req) {
//     // Example: log the requested URL
//     console.log('Request URL:', req.url);

//     // Continue with the request
//     return NextResponse.next(); // Proceed with the request
//   }

//////////////////////



// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export const middleware = async (request) => {
//   const token = cookies(request).get("next-auth.session-token");
//   console.log(token);
//   const pathname = request.nextUrl.pathname;
//   if (pathname.includes("api")) {
//     return NextResponse.next();
//   }

//   if (!token) {
//     return NextResponse.redirect(
//       new URL(`/login?redirect=${pathname}`, request.url)
//     );
//   }
//   return NextResponse.next();
// };

// export const config = {
//   matcher: ["/dashboard", "/products/:id"],
// };

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const token = cookies(request).get("next-auth.session-token");
  console.log("Middleware triggered for:", request.nextUrl.pathname);
  console.log("Token found:", token);

  const pathname = request.nextUrl.pathname;

  // Skip API routes
  if (pathname.includes("api")) {
    return NextResponse.next();
  }

  // Redirect to login if no token is present
  if (!token) {
    const redirectURL = new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.nextUrl.origin);
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/products/:id"],
};
