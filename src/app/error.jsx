"use client";
import React from "react";
import Link from "next/link";

const ErrorPage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        Something went wrong.
      </p>
      <p className="text-lg text-gray-600 mb-8">
        We couldn’t find the page you were looking for or there was an error.
      </p>
      <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200">
        Go Back Home
      </Link>
    </div>
  </div>
);

export default ErrorPage;
