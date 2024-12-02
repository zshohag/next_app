"use client"; // Use client-side rendering
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts
import SocialSignin from "@/components/shared/SocialSignin/SocialSignin";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // Initialize the form
  const router = useRouter(); // Initialize the router
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Confirm password visibility state
  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit = async (data) => {
    // Function to handle form submission
    if (data.password !== data.confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error"); // Alert if passwords do not match
      return; // Exit the function
    }

    setLoading(true); // Set loading to true when starting the API call
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiBaseUrl}/signup/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json(); // Parse the response

      if (response.ok) {
        Swal.fire("Success", "User created successfully!", "success"); // Alert on success
        reset(); // Reset the form fields
        router.push("/"); // Navigate to the home page
      } else {
        Swal.fire("Error", result.message, "error"); // Alert on error
      }
    } catch (error) {
      console.error("Error submitting form:", error); // Log any errors
      Swal.fire("Error", "Something went wrong", "error"); // Alert on catch
    } finally {
      setLoading(false); // Set loading to false when the API call is finished
    }
  };

  return (
    <div className="container px-4 sm:px-8 lg:px-24 mx-auto py-12 lg:py-24">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="loader">Loading...</div>
        </div>
      )}
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
          <h6 className="text-xl md:text-2xl font-semibold text-primary text-center mb-6">
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
              className="w-full btn btn-primary mt-6 text-lg"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-6">
            <h6 className="text-sm text-gray-500 my-4">or sign up with</h6>
            <SocialSignin />
            <h6 className="text-sm">
              Already have an account?{" "}
              <Link className="text-primary font-semibold" href="/login">
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
