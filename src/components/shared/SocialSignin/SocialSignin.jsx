"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";

const SocialSignin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const path = searchParams.get("redirect");
  const session = useSession();
  const handleSocialLogin = (provider) => {
    const resp = signIn(provider, {
      redirect: true,
      callbackUrl: path ? path : "/",
    });
  };

  return (
    <div className="flex items-center justify-center space-x-3 m-2">
      <button
        onClick={() => handleSocialLogin("google")}
        className="btn btn-circle bg-white shadow-md hover:bg-green-500 hover:text-white flex items-center justify-center text-green-500 border border-green-500 transition duration-200"
        aria-label="Login with Google"
      >
        <BsGoogle className="text-xl" />
      </button>

      <button
        onClick={() => handleSocialLogin("github")}
        className="btn btn-circle bg-white shadow-md hover:bg-gray-800 hover:text-white flex items-center justify-center text-gray-700 border border-gray-700 transition duration-200"
        aria-label="Login with GitHub"
      >
        <BsGithub className="text-xl" />
      </button>
    </div>
  );
};

export default SocialSignin;
