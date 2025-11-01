import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { account } from "../lib/appwrite";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // auto redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        navigate("/dashboard");
      } catch (error) {
        // toast.error("Please login to continue");
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // ✅ FIXED method name
      await account.createEmailPasswordSession(email, password);

      toast.success("Login successful!");
      navigate("/dashboard"); // ✅ redirect to dashboard
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
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
            Welcome back
          </h1>
          <p className="text-gray-600 text-sm">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Form */}
        <form className="w-full max-w-md space-y-6" onSubmit={handleLogin}>
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
              name="email" // ✅ added
              type="email"
              placeholder="Enter your email"
              required
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
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-lime-600 border-gray-300 rounded"
              />
              <span className="font-medium text-gray-700">
                Remember for 30 days
              </span>
            </label>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-semibold transition"
            >
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            disabled={loading}
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
                Signing in...
              </>
            ) : (
              "Sign In"
            )}{" "}
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-black hover:underline"
            >
              Sign up for free
            </a>
          </p>
        </form>
      </div>

      {/* RIGHT SECTION - IMAGE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-b from-gray-100 to-rose-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/assets/Image.png" alt="Hand holding clock image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
