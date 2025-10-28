"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  Share2,
  FileText,
  Clock,
  Award,
  TrendingUp,
  BarChart2,
  CheckCircle,
  XCircle,
  BookOpen,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import Nav from "../../components/Navbar";

export default function ResultPage() {
  const totalQuestions = 20;
  const correct = 16;
  const incorrect = 4;
  const markedForReview = 3;
  const attempted = 20;
  const unattempted = 0;
  const averageTime = "1:26";
  const duration = "28:45";

  const [completedAt, setCompletedAt] = useState("");
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedTime = now.toLocaleTimeString();
    setCompletedAt(`${formattedDate}, ${formattedTime}`);
  }, []);

  const questionDetails = [
    { topic: "Arithmetic Progression", timeSpent: "0:45", correct: true },
    { topic: "Geometry", timeSpent: "1:18", correct: true },
    { topic: "Mixed Series", timeSpent: "1:30", correct: false },
    { topic: "Fibonacci Series", timeSpent: "0:29", correct: true },
    { topic: "Probability", timeSpent: "1:12", correct: true },
    { topic: "Algebra", timeSpent: "0:58", correct: true },
    { topic: "Trigonometry", timeSpent: "1:45", correct: false },
    { topic: "Statistics", timeSpent: "1:03", correct: true },
    { topic: "Calculus", timeSpent: "2:10", correct: true },
    { topic: "Number Theory", timeSpent: "0:55", correct: true },
    { topic: "Combinatorics", timeSpent: "1:22", correct: false },
    { topic: "Linear Equations", timeSpent: "0:48", correct: true },
  ];

  const displayedQuestions = showAllQuestions
    ? questionDetails
    : questionDetails.slice(0, 5);

  const totalScore = correct * 5;
  const percentage = Math.round((correct / totalQuestions) * 100);
  const rank = Math.floor(Math.random() * 100) + 1;

  // Calculate percentages for the chart
  const correctPercentage = (correct / totalQuestions) * 100;
  const incorrectPercentage = (incorrect / totalQuestions) * 100;
  const unattemptedPercentage = (unattempted / totalQuestions) * 100;

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-b from-[#E8E5F7] to-white p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
          >
            <div className="bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    C++ Basic Mock Test Results
                  </h2>
                  <p className="opacity-90 mt-1">Completed on {completedAt}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{duration}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full">
                    <Award className="h-4 w-4" />
                    <span className="text-sm">Rank {rank}/156</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-bold text-[#4946A6]">
                      {percentage}%
                    </h3>
                    <p className="text-[#3C4973]">
                      Score: {correct}/{totalQuestions}
                    </p>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#4946A6] to-[#8A7ED9]"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    ></motion.div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-[#F0EFFC] text-[#4946A6] px-4 py-2 rounded-xl">
                    <TrendingUp className="h-5 w-5" />
                    <div>
                      <p className="text-xs text-[#3C4973]">Points Earned</p>
                      <p className="font-bold">+{totalScore}</p>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 border border-[#E8E5F7] hover:border-[#8A7ED9] px-4 py-2 rounded-xl text-[#3C4973] transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>

                  <button className="flex items-center gap-2 border border-[#E8E5F7] hover:border-[#8A7ED9] px-4 py-2 rounded-xl text-[#3C4973] transition-colors">
                    <FileText className="h-5 w-5" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left: Performance Analysis */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-2 mb-6">
                <BarChart2 className="h-5 w-5 text-[#4946A6]" />
                <h3 className="text-lg font-bold text-[#282C40]">
                  Performance Analysis
                </h3>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Circular Progress */}
                <div className="relative">
                  <svg className="w-40 h-40 transform -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#F0EFFC"
                      strokeWidth="12"
                    />

                    {/* Animated progress circle */}
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#4946A6"
                      strokeWidth="12"
                      strokeDasharray={2 * Math.PI * 70}
                      strokeDashoffset={
                        2 * Math.PI * 70 * (1 - percentage / 100)
                      }
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                      animate={{
                        strokeDashoffset:
                          2 * Math.PI * 70 * (1 - percentage / 100),
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* Inner circle for aesthetics */}
                    <circle cx="80" cy="80" r="58" fill="white" />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-[#282C40]">
                      {percentage}%
                    </span>
                    <span className="text-sm text-[#3C4973]">Accuracy</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#3C4973]">Correct</span>
                      <span className="font-medium text-[#282C40]">
                        {correct} ({Math.round(correctPercentage)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#4CAF50]"
                        initial={{ width: 0 }}
                        animate={{ width: `${correctPercentage}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      ></motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#3C4973]">Incorrect</span>
                      <span className="font-medium text-[#282C40]">
                        {incorrect} ({Math.round(incorrectPercentage)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#F44336]"
                        initial={{ width: 0 }}
                        animate={{ width: `${incorrectPercentage}%` }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      ></motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#3C4973]">Marked for Review</span>
                      <span className="font-medium text-[#282C40]">
                        {markedForReview}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#FF9800]"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(markedForReview / totalQuestions) * 100}%`,
                        }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      ></motion.div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8E5F7]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#3C4973]">
                        <Clock className="h-4 w-4" />
                        <span>Average time per question</span>
                      </div>
                      <span className="font-bold text-[#282C40]">
                        {averageTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Question-wise Analysis */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#4946A6]" />
                  <h3 className="text-lg font-bold text-[#282C40]">
                    Question-wise Analysis
                  </h3>
                </div>
                <div className="text-sm text-[#3C4973]">
                  <span className="font-medium">{correct}</span> correct of{" "}
                  {totalQuestions} questions
                </div>
              </div>

              <div className="overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-3 px-3 text-[#3C4973] font-medium">
                        Q#
                      </th>
                      <th className="pb-3 px-3 text-[#3C4973] font-medium">
                        Topic
                      </th>
                      <th className="pb-3 px-3 text-[#3C4973] font-medium">
                        Time
                      </th>
                      <th className="pb-3 px-3 text-[#3C4973] font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedQuestions.map((q, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                        className="border-t border-[#F0EFFC]"
                      >
                        <td className="py-3 px-3">
                          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#F0EFFC] text-[#4946A6] text-xs font-medium">
                            {i + 1}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-medium text-[#282C40]">
                          {q.topic}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1 text-[#3C4973]">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{q.timeSpent}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          {q.correct ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="font-medium">Correct</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-500">
                              <XCircle className="h-4 w-4" />
                              <span className="font-medium">Incorrect</span>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                {questionDetails.length > 5 && (
                  <button
                    onClick={() => setShowAllQuestions(!showAllQuestions)}
                    className="w-full mt-4 py-2 text-[#4946A6] hover:bg-[#F0EFFC] rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>
                      {showAllQuestions ? "Show Less" : "Show All Questions"}
                    </span>
                    {showAllQuestions ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Performance Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-lg mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-[#4946A6]" />
              <h3 className="text-lg font-bold text-[#282C40]">
                Performance Insights
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F0EFFC] p-4 rounded-xl">
                <h4 className="font-medium text-[#4946A6] mb-2">Strengths</h4>
                <ul className="space-y-2 text-sm text-[#3C4973]">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Strong performance in Arithmetic Progression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>
                      Quick response time on Fibonacci Series questions
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#F0EFFC] p-4 rounded-xl">
                <h4 className="font-medium text-[#4946A6] mb-2">
                  Areas for Improvement
                </h4>
                <ul className="space-y-2 text-sm text-[#3C4973]">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Difficulty with Mixed Series questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Spent too much time on Trigonometry</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#F0EFFC] p-4 rounded-xl">
                <h4 className="font-medium text-[#4946A6] mb-2">
                  Recommendations
                </h4>
                <ul className="space-y-2 text-sm text-[#3C4973]">
                  <li className="flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-[#4946A6] mt-0.5" />
                    <span>Review Mixed Series concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-[#4946A6] mt-0.5" />
                    <span>Practice more Combinatorics problems</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Link
              to="/mock-tests"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] text-white rounded-xl font-medium hover:opacity-95 transition-opacity"
            >
              <BookOpen className="h-5 w-5" />
              Practice Similar
            </Link>
            <Link
              to="/test"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-[#4946A6] text-[#4946A6] rounded-xl font-medium hover:bg-[#F0EFFC] transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
              Retest
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
