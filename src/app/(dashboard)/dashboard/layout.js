"use client";
import { useState } from "react";
import Link from "next/link"; // Import Next.js's Link component
import { FaHome } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, setTitle] = useState("Dashboard"); // State for title

  // Sidebar links for User, Orders, and Manage Products
  const userLinks = [
    { to: "/dashboard/users", text: "User", title: "User Management" },
    { to: "/dashboard/orders", text: "Orders", title: "Order Management" },
    {
      to: "/dashboard/manageproducts",
      text: "Manage Products",
      title: "Manage Products",
    },
  ];

  const SidebarLink = ({ to, text, title }) => (
    <div className="mb-4">
      <Link
        href={to}
        className="text-gray-600 hover:text-blue-600"
        onClick={() => setTitle(title)}
      >
        {text}
      </Link>
    </div>
  );

  const renderLinks = (links) =>
    links.map((link, index) => (
      <SidebarLink
        key={index}
        to={link.to}
        text={link.text}
        title={link.title}
      />
    ));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex bg-gray-100 relative">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 ${
          isSidebarOpen ? "w-1" : "hidden"
        } md:w-52 md:block`}
      >
        <div className="p-4">

          <h1 className="text-2xl font-semibold mb-6"> Dashboard</h1>
          <ul>{renderLinks(userLinks)}</ul>
          <div className="divider"></div>

          <SidebarLink to="/" text="Go Home"/>
        </div>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 right-4 p-2 text-gray-600 hover:text-blue-600 z-50"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 overlay md:hidden"
          onClick={handleOutsideClick}
        >
          <div
            className={`fixed inset-y-0 left-0 w-44 md:w-64 bg-white border-r border-gray-200 transform transition-transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4">
              <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
              <ul>{renderLinks(userLinks)}</ul>
              <div className="divider"></div>
              <SidebarLink to="/" text="Go Home" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-100">
        <h2 className="text-3xl font-bold">{title}</h2>{" "}
        {/* Display dynamic title */}
        {/* <p className="mt-4">This is where the dashboard content will appear.</p> */}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

// export const metadata = {
//   title: "Dashboard | Next App",
//   description: "Dashboard of Next App",
// };

// export default function DashboardLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <>
//           <main>{children}</main>
//         </>
//       </body>
//     </html>
//   );
// }

