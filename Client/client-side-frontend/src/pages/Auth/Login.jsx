"use client";

import { useState } from "react";
import { CheckCircle, ChevronRight, LucideGraduationCap } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || "/home";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(email, password);

      if (result.success) {
        // Redirect to the page they tried to visit or home
        navigate(from, { replace: true });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic
    console.log("Login with Google");
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col p-6 md:p-10 justify-center bg-white">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className="text-[#4946A6] mr-2">
                <LucideGraduationCap size={28} />
              </div>
              <span className="text-xl font-bold text-[#282C40]">
                EasyHustler
              </span>
            </div>
          </div>

          {/* Welcome text */}
          <h1 className="text-3xl font-bold text-[#282C40] mb-2">
            Welcome Back
          </h1>
          <p className="text-[#3C4973] mb-8">
            Continue your interview preparation journey
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-[#282C40] font-medium mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-[#6F92BF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A7ED9]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[#282C40] font-medium mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-[#6F92BF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A7ED9]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="keepLoggedIn"
                  type="checkbox"
                  className="h-4 w-4 text-[#4946A6] focus:ring-[#8A7ED9] border-[#6F92BF] rounded"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                />
                <label
                  htmlFor="keepLoggedIn"
                  className="ml-2 block text-sm text-[#3C4973]"
                >
                  Keep me logged in
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-[#4946A6] text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4946A6] text-white py-3 px-4 rounded-lg hover:bg-[#3C3A85] transition font-medium disabled:bg-[#8A7ED9]/50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-8 text-center">
            <span className="text-[#3C4973]">Don't have an account? </span>
            <Link
              to="/signup"
              className="text-[#4946A6] font-medium hover:underline"
            >
              Sign up now
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Branded Background with Image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#4946A6] to-[#8A7ED9] items-center justify-center p-10">
        <img
          src="/image-auth.jpg"
          alt="logo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
