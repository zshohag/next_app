// components/ClientLayout.js

"use client";

import { usePathname } from "next/navigation";
import NavBar from "./shared/NavBar/NavBar";
import Footer from "./shared/Footer/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <NavBar />}
      <main>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}
