"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navOptions = (
    <>
      <li>
        <Link href="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/about" onClick={() => setMenuOpen(false)}>
          About Us
        </Link>
      </li>
      <li>
        <Link href="/contactus" onClick={() => setMenuOpen(false)}>
          Contact Us
        </Link>
      </li>
    </>
  );

  return (
    <div>
      <div
        className={`navbar fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="navbar-start">
          <Link href="/">
            <p className="p-2 normal-case text-xl text-gray-800 flex items-center">
              <span className="text-4xl">Z</span>Store
            </p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 text-gray-800">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end flex items-center space-x-4">
          <Link href="/dashboard/orders">
            <div className="flex items-center">
              <FaShoppingCart className="w-5 h-5 text-gray-800" />
            </div>
          </Link>

          {status === "authenticated" ? (
            <>
              <span className="text-gray-800 font-medium">
                {session.user?.name || "User"}
              </span>
              <button
                onClick={() => signOut()}
                className="btn btn-sm bg-black text-white hover:text-black "
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="btn btn-sm bg-black hover:text-black text-white">Sign In</button>
            </Link>
          )}

          {/* <Link href="/login">
            <button className="btn btn-sm bg-black text-white">Login</button>
          </Link> */}

          <div className="lg:hidden">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost"
                onClick={toggleMenu}
              >
                {menuOpen ? (
                  <FaTimes className="text-2xl text-gray-800" />
                ) : (
                  <FaBars className="text-2xl text-gray-800" />
                )}
              </label>
              {menuOpen && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-none w-52"
                  onClick={() => setMenuOpen(false)}
                >
                  {navOptions}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
