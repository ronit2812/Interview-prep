"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, LucideGraduationCap } from "lucide-react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullName,
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Registration successful! Redirecting to login...");

      // Store user info if keep logged in is selected
      if (keepLoggedIn && data.data) {
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      }

      // Redirect after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      {/* Left side - Illustration and info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#4946A6] to-[#8A7ED9] p-12 relative overflow-hidden">
        <div className="relative z-10 flex flex-col h-full text-white">
          <div className="flex flex-col items-center mb-12">
            {/* <LucideGraduationCap size={36} className="text-white" />
            <span className="text-2xl font-bold ml-2">EasyHustler</span> */}
            <img
              src="/image-auth.jpg"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-40 h-40 bg-[#8A7ED9] rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#4946A6] rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-[#6F92BF] rounded-full opacity-20 blur-xl"></div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center mb-8">
            <LucideGraduationCap size={28} className="text-[#4946A6]" />
            <span className="text-xl font-bold ml-2 text-[#282C40]">
              EasyHustler
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#282C40]">
              Create your account
            </h1>
            <p className="text-[#3C4973] mt-2">
              Start your interview preparation journey today
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-[#282C40] mb-1.5"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#6F92BF]/30 focus:outline-none focus:ring-2 focus:ring-[#8A7ED9] bg-white"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#282C40] mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#6F92BF]/30 focus:outline-none focus:ring-2 focus:ring-[#8A7ED9] bg-white"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#282C40] mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#6F92BF]/30 focus:outline-none focus:ring-2 focus:ring-[#8A7ED9] bg-white"
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#282C40] mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#6F92BF]/30 focus:outline-none focus:ring-2 focus:ring-[#8A7ED9] bg-white"
                placeholder="Create a strong password"
                required
                minLength="8"
              />
            </div>

            <div className="flex items-center">
              <input
                id="keepLoggedIn"
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="h-4 w-4 text-[#4946A6] focus:ring-[#8A7ED9] border-[#6F92BF] rounded"
              />
              <label
                htmlFor="keepLoggedIn"
                className="ml-2 block text-sm text-[#3C4973]"
              >
                Keep me logged in
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4946A6] text-white py-3.5 px-4 rounded-lg hover:bg-[#3C3A85] transition font-medium flex items-center justify-center group disabled:bg-[#8A7ED9]/50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && (
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#3C4973]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#4946A6] font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
