"use client"; // Use client-side rendering
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts
import SocialSignin from "@/components/shared/SocialSignin/SocialSignin";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // Initialize the form
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Confirm password visibility state
  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter(); // Initialize the router
  const searchParams = useSearchParams(); // Access search params
  const redirectTo = searchParams.get("redirect") || "/"; // Get the redirect query param or default to "/"

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    setLoading(true);
    try {
      // const response = await fetch("/signup/api", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });

      // Build the API URL dynamically using the environment variable
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire("Success", "User created successfully!", "success");

        // Automatically log the user in after signup
        const loginResponse = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (loginResponse?.ok) {
          router.push(redirectTo); // Redirect to the specified URL or default
        } else {
          Swal.fire("Error", "Failed to log in after signup", "error");
        }
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 sm:px-8 lg:px-24 mx-auto py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left side image section */}
        <div className="flex justify-center lg:justify-start">
          <Image
            src="/assets/images/signup.png"
            height="400"
            width="400"
            alt="signup image"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right side form section */}
        <div className="border-2 p-4 md:p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h6 className="text-xl md:text-2xl font-semibold text-black text-center mb-6">
            Sign Up
          </h6>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Your name"
              className="w-full input input-bordered mb-4"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* Email Field */}
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              placeholder="Your email"
              className="w-full input input-bordered mb-4"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password Field */}
            <label htmlFor="password" className="block font-medium mt-4 mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Your password"
                className="w-full input input-bordered pr-12"
              />
              <div
                className="absolute right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500" />
                ) : (
                  <AiOutlineEye className="text-gray-500" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Confirm Password Field */}
            <label
              htmlFor="confirmPassword"
              className="block font-medium mt-4 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                placeholder="Confirm your password"
                className="w-full input input-bordered pr-12"
              />
              <div
                className="absolute right-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500" />
                ) : (
                  <AiOutlineEye className="text-gray-500" />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full btn bg-black text-white hover:text-black mt-6 text-lg"
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-4">
            <h6 className="text-sm text-gray-500 my-4">or sign up with</h6>
            <SocialSignin />
            <h6 className="text-sm ">
              Already have an account?{" "}
              <Link className="text-black font-semibold" href="/login">
                Sign In
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; // Ensure to export the Page component as default
