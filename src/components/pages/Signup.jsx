import { Button } from "../ui/button";
import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* LEFT SECTION - FORM */}
      <div className="flex flex-col justify-center px-8 py-12 lg:px-16 lg:w-1/2">
        {/* Logo */}
        <div className="mb-12">
          <img src="/assets/Logo.png" alt="logo" />
        </div>

        {/* Heading & Subtext */}
        <div className="mb-8 max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create new account
          </h1>
          <p className="text-gray-600 text-sm">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Form */}
        <form className="w-full max-w-md space-y-6">
            {/* Full Name */}
          <label
            htmlFor="Name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Isaac Urban"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-transparent transition"
          />

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            />
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full btn-color hover:bg-lime-600 text-gray-900 font-semibold py-3 rounded-lg transition"
          >
            Craete Account
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-700">
            Already have an account account?{" "}
            <a
              href="/"
              className="font-medium text-black hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>

      {/* RIGHT SECTION - IMAGE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-b from-gray-100 to-rose-50">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Replace with your actual image path */}
          <img src="/assets/Image.png" alt="Hand holding clock" />
        </div>
      </div>
    </div>
  );
};

export default Login;
