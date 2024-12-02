// "use client";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import React from "react";
// import { BsGoogle } from "react-icons/bs";

// const SocialSignin = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const path = searchParams.get("redirect");
//   const session = useSession();
//   const handleSocialLogin = (provider) => {
//     const resp = signIn(provider, {
//       redirect: true,
//       callbackUrl: path ? path : "/",
//     });
//   };

//   return (
//     <div className="flex items-center justify-center space-x-3 m-2">
//       <button
//         onClick={() => handleSocialLogin("google")}
//         className="btn btn-circle bg-white shadow-md hover:bg-green-500 hover:text-white flex items-center justify-center text-green-500 border border-green-500 transition duration-200"
//         aria-label="Login with Google"
//       >
//         <BsGoogle className="text-xl" />
//       </button>
//     </div>
//   );
// };

// export default SocialSignin;

"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { BsGoogle } from "react-icons/bs";

const SocialSignin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session.isNewUser) {
      // Show SweetAlert for new user
      Swal.fire({
        title: "Welcome!",
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  }, [status, session]);

  const handleSocialLogin = (provider) => {
    signIn(provider, {
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
    </div>
  );
};

export default SocialSignin;
