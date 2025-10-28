"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Mail, ArrowLeft, Send, Lock, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Password reset link sent to:", email);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#E8E5F7] to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {!isSubmitted ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#E8E5F7]">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F0EFFC] mb-4">
                <Lock className="h-8 w-8 text-[#4946A6]" />
              </div>
              <h2 className="text-2xl font-bold text-[#282C40]">
                Forgot Password
              </h2>
              <p className="text-[#3C4973] mt-2">
                Enter your registered email to receive a password reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#282C40]">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#6F92BF]" />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-[#E8E5F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8A7ED9] focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] text-white py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-[#4946A6] hover:text-[#8A7ED9] transition-colors gap-1 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-[#E8E5F7] text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EDFCF2] mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#282C40] mb-2">
              Check Your Email
            </h2>
            <p className="text-[#3C4973] mb-6">
              We've sent a password reset link to{" "}
              <span className="font-medium text-[#282C40]">{email}</span>
            </p>
            <div className="space-y-4">
              <p className="text-sm text-[#6F92BF]">
                If you don't see the email, check other places it might be, like
                your junk, spam, social, or other folders.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-3 border border-[#E8E5F7] rounded-xl text-[#4946A6] hover:bg-[#F0EFFC] transition-colors font-medium"
              >
                Resend Email
              </button>
              <Link
                to="/login"
                className="block w-full py-3 bg-[#F0EFFC] rounded-xl text-[#4946A6] hover:bg-[#E8E5F7] transition-colors font-medium"
              >
                Back to Login
              </Link>
            </div>
          </motion.div>
        )}

        {/* <div className="mt-8 text-center text-sm text-[#6F92BF]">
          <p>Need help? Contact our support team at support@example.com</p>
        </div> */}
      </motion.div>
    </div>
  );
}
