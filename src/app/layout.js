"use client";

import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/shared/NavBar/NavBar.jsx";
import Footer from "../components/shared/Footer/Footer.jsx";
import AuthProvider from "@/context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";

// Create a client
const queryClient = new QueryClient();

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
  const routeTitles = {
    "/dashboard": "Dashboard | Next App",
    "/about": "About Us | Next App",
    "/contact": "Contact Us | Next App",
  };

  const pageTitle =
    routeTitles[pathname] ||
    `${pathname
      .split("/")
      .filter(Boolean)
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
      .join(" - ")} | Next App`;

  return (
    <html lang="en">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="next app" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            {!isDashboard && <Navbar />}
            <main className="flex-grow">{children}</main>
            {!isDashboard && <Footer />}
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
