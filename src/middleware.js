// import { NextResponse } from "next/server"

import { NextResponse } from "next/server";

// const user = true;
// const coo = 'next-superhero'

// export const middleware = (request) => {

//     const cookies =  request.cookies.get('token')
//     if(!cookies || cookies.value !== coo) {
//         return NextResponse.redirect(new URL('/login', request.url))
//     } 

//     return NextResponse.next()
// }

// export const config = {
//     matcher : ['/dashboard', '/services']
// }

// import { NextResponse } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   return NextResponse.redirect(new URL('/home', request.url))
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }

// src/middleware.js
export default function middleware(req) {
    // Example: log the requested URL
    console.log('Request URL:', req.url);
    
    // Continue with the request
    return NextResponse.next(); // Proceed with the request
  }
  