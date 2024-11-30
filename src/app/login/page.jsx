"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import SocialSignin from "@/components/shared/SocialSignin/SocialSignin";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    const { email, password } = data;

    const resp = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false); // Stop loading

    if (resp.ok) {
      // Show success message and navigate to home
      Swal.fire({
        icon: "success",
        title: "Signed in successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/"); // Navigate to home page
    } else {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Sign-in failed",
        text: resp.error,
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="container px-4 sm:px-8 lg:px-24 mx-auto py-12 lg:py-24">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
    {/* Left side image section */}
    <div className="flex justify-center lg:justify-start">
      <Image
        src="/assets/images/login.png"
        height="400" // Reduce image height
        width="400" // Reduce image width
        alt="login image"
        className="max-w-full h-auto"
      />
    </div>

    {/* Right side form section */}
    <div className="border-2 p-4 md:p-6 lg:p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h6 className="text-xl md:text-2xl font-semibold text-primary text-center mb-6">
        Sign In
      </h6>

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <label htmlFor="password" className="block font-medium mt-4 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            placeholder="Your password"
            className="w-full input input-bordered pr-12"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
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

        <button
          type="submit"
          className="w-full btn btn-primary mt-6 text-lg"
          disabled={loading} // Disable while loading
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="text-center mt-6">
        <h6 className="text-sm text-gray-500 my-4">or sign in with</h6>
        <SocialSignin />
        <h6 className="text-sm">
          Not have an account?{" "}
          <Link className="text-primary font-semibold" href="/signup">
            Sign Up
          </Link>
        </h6>
      </div>
    </div>
  </div>
</div>

  );
};

export default LoginPage;

