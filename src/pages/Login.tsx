import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login clicked");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle regular login logic here
    console.log("Login attempted with:", { username, password, keepLoggedIn });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              EasyHustler
            </span>
          </div>

          {/* Welcome Back Title */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Welcome Back
            </h2>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Login with Google
            <svg
              className="w-4 h-4 ml-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or Login with Email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Type your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Type your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="keep-logged-in"
                  name="keep-logged-in"
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="keep-logged-in"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Keep me Logged in
                </label>
              </div>

              <div className="text-sm">
                <button className="font-medium text-blue-600 hover:text-blue-500">
                  Forget Password?
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Login
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Haven't sign up yet?{" "}
                <Link
    to="/signup"
    className="ml-1 font-medium text-blue-600 hover:text-blue-500"
  >
    Sign up
  </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-purple-400 via-purple-500 to-orange-400">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-32 right-32 w-6 h-6 bg-white rounded-full opacity-60"></div>
        <div className="absolute bottom-40 left-16 w-5 h-5 bg-white rounded-full opacity-70"></div>
        <div className="absolute top-40 left-40 w-3 h-3 bg-white rounded-full opacity-90"></div>

        {/* Stars */}
        <div className="absolute top-16 right-20">
          <svg
            className="w-8 h-8 text-white opacity-80"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute bottom-32 right-40">
          <svg
            className="w-6 h-6 text-white opacity-70"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        {/* Main illustration container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Person illustration placeholder */}
            <div className="w-64 h-64 bg-blue-500 rounded-full flex items-center justify-center relative">
              <div className="absolute -top-8 -right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>

              <div className="absolute -top-4 -left-12 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>

              <div className="absolute -bottom-4 -right-12 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" />
                </svg>
              </div>

              <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1l1.3 1.3c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0L18 20.5l-1.4 1.3c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.3-1.3-1.3-1.3c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l1.4 1.3 1.4-1.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L19.5 19.1z" />
                </svg>
              </div>

              {/* Person face */}
              <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-orange-300 rounded-full relative">
                  <div className="absolute top-3 left-3 w-2 h-2 bg-black rounded-full"></div>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-black rounded-full"></div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-red-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Books stack */}
            <div className="absolute -bottom-16 -left-16 w-24 h-16 bg-orange-300 rounded transform rotate-12"></div>
            <div className="absolute -bottom-12 -left-12 w-24 h-16 bg-red-400 rounded transform rotate-6"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-16 bg-blue-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
