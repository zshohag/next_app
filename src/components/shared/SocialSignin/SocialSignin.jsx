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

////////////

// "use client";
// import { signIn, useSession } from "next-auth/react";
// import {  useSearchParams } from "next/navigation";
// import { useEffect } from "react";
// import Swal from "sweetalert2";
// import { BsGoogle } from "react-icons/bs";

// const SocialSignin = () => {

//   const searchParams = useSearchParams();
//   const path = searchParams.get("redirect");
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === "authenticated" && session.isNewUser) {
//       // Show SweetAlert for new user
//       Swal.fire({
//         title: "Welcome!",
//         text: "Your account has been created successfully.",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//     }
//   }, [status, session]);

//   const handleSocialLogin = (provider) => {
//     signIn(provider, {
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
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const SocialSignin = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.isNewUser) {
      // Show SweetAlert for new user
      Swal.fire({
        title: "Welcome!",
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  }, [status, session]);

  const handleSocialLogin = async (provider) => {
    Swal.fire({
      title: "Logging in...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Show the loading spinner
      },
    });

    try {
      await signIn(provider, {
        redirect: true,
        callbackUrl: path || "/",
      });

      // Show a success message for 2 seconds
      Swal.fire({
        title: "Login Successful!",
        text: "You have been successfully logged in.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (status === "loading") {
    return <div className="text-center py-5">Verifying session...</div>;
  }

  return (
    <div className="flex items-center justify-center space-x-2 m-1">
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex items-center bg-white hover:bg-gray-200 hover:text-gray-700  text-gray-700  px-4 py-2 rounded-lg 
                   transition-all duration-300 "
        aria-label="Login with Google"
      >
        <FcGoogle className="text-xl mr-2" /> {/* Icon */}
        Sign in with Google {/* Text */}
      </button>
    </div>
  );
};

export default SocialSignin;
