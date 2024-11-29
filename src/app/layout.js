// import localFont from "next/font/local";
// import "./globals.css";
// import NavBar from "@/components/shared/NavBar/NavBar";
// import Footer from "@/components/shared/Footer/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata = {
//   title: "Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <NavBar />
//         <main>{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

// import localFont from "next/font/local";
// import "./globals.css";
// import ClientLayout from "@/components/ClientLayout";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata = {
//   title: {
//     default: "Next App",
//     template: "%s | Next App",
//   },
//   description: "Super Powerful Next Website",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <ClientLayout>{children}</ClientLayout>
//       </body>
//     </html>
//   );
// }

"use client"; // Enable client-side rendering to use hooks like usePathname
import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/shared/NavBar/NavBar.jsx";
import Footer from "../components/shared/Footer/Footer.jsx";
import AuthProvider from "@/services/AuthProvider";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  // Dynamic title change

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);




  let pageTitle = "Next App";

  // Change title based on the pathname
  if (pathname === "/dashboard") {
    pageTitle = "Dashboard | Next App";
  } else if (pathname === "/about") {
    pageTitle = "About Us | Next App";
  } else if (pathname === "/contact") {
    pageTitle = "Contact Us | Next App";
  } else {
    // Handle other routes or fallback
    pageTitle = `${
      pathname.replace("/", "").charAt(0).toUpperCase() + pathname.slice(2)
    } | Next App`;
  }

  return (
    <html lang="en" data-theme="light">
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content="next app" />
        <meta name="color-scheme" content="light only" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {!isDashboard && <Navbar />}
          <main>{children}</main>
          {!isDashboard && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}

// "use client"; // Enable client-side rendering to use hooks like usePathname
// import { usePathname } from "next/navigation";
// import localFont from "next/font/local";
// import  Head  from "next/head"; // Import next/head for dynamic title and meta tags
// import "./globals.css";
// import Navbar from "@/components/shared/Navbar/Navbar";
// import Footer from "@/components/shared/Footer/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export default function RootLayout({ children }) {
//   const pathname = usePathname();
//   const isDashboard = pathname.startsWith("/dashboard");

//   // Dynamic title change
//   let pageTitle = "Next App";

//   // Change title based on the pathname
//   if (pathname === "/dashboard") {
//     pageTitle = "Dashboard | Next App";
//   } else if (pathname === "/about") {
//     pageTitle = "About Us | Next App";
//   } else if (pathname === "/contact") {
//     pageTitle = "Contact Us | Next App";
//   } else {
//     // Handle other routes or fallback
//     pageTitle = `${
//       pathname.replace("/", "").charAt(0).toUpperCase() + pathname.slice(2)
//     } | Next App`;
//   }

//   return (
//     <html lang="en">
//       <head>
//         {/* Dynamically set the title and meta description */}
//         <Head>
//           <title>{pageTitle}</title>
//           <meta name="description" content={`Explore ${pageTitle}`} />
//           {/* Add any other meta tags you need here */}
//         </Head>
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {/* Conditionally render Navbar and Footer */}
//         {!isDashboard && <Navbar />}
//         <main>{children}</main>
//         {!isDashboard && <Footer />}
//       </body>
//     </html>
//   );
// }

// "use client"; // Enable client-side rendering to use hooks like usePathname
// import { usePathname } from "next/navigation";
// import localFont from "next/font/local";
// import Head from "next/head"; // Correct import for Head
// import "./globals.css";
// import Navbar from "@/components/shared/Navbar/Navbar";
// import Footer from "@/components/shared/Footer/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export default function RootLayout({ children }) {
//   const pathname = usePathname();
//   const isDashboard = pathname === "/dashboard"; // Change here to match exactly

//   // Dynamic title change
//   let pageTitle = "Next App";

//   // Change title based on the pathname
//   if (pathname === "/dashboard") {
//     pageTitle = "Dashboard | Next App";
//   } else if (pathname === "/about") {
//     pageTitle = "About Us | Next App";
//   } else if (pathname === "/contact") {
//     pageTitle = "Contact Us | Next App";
//   } else {
//     // Handle other routes or fallback
//     pageTitle = `${
//       pathname.replace("/", "").charAt(0).toUpperCase() + pathname.slice(2)
//     } | Next App`;
//   }

//   return (
//     <html lang="en">
// <Head>
//   <title>{pageTitle}</title>
//   <meta name="description" content={`Explore ${pageTitle}`} />
//   {/* Add any other meta tags you need here */}
// </Head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {/* Conditionally render Navbar and Footer */}
//         {!isDashboard && <Navbar />}
//         <main>{children}</main>
//         {!isDashboard && <Footer />}
//       </body>
//     </html>
//   );
// }
