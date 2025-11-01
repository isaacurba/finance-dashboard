import { toast } from "sonner";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { account, ID } from "../lib/appwrite";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // auto redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        navigate("/dashboard");
      } catch (error) {
        toast.error("Please login to continue");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      toast.success("Account created.! welcome!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      toast.error(error.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

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
        <form className="w-full max-w-md space-y-6" onSubmit={handleSignup}>
          {/* Full Name */}
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
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
              name="email"
              placeholder="isaacurban@example.com"
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
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            />
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full btn-color hover:bg-lime-600 text-gray-900 font-semibold py-3 rounded-lg transition"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Your Account...
              </>
            ) : (
              "Create Account"
            )}{" "}
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-700">
            Already have an account account?{" "}
            <a href="/" className="font-medium text-black hover:underline">
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

export default Signup;
