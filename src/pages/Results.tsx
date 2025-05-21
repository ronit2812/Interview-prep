import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Navbar";

const ResultPage = () => {
  const navigate = (url: string) => (window.location.href = url);

  const totalQuestions = 20;
  const correct = 16;
  const incorrect = 4;
  const markedForReview = 3;
  const attempted = 20;
  const unattempted = 0;
  const averageTime = "1:26";
  const duration = "28:45";

  const [completedAt, setCompletedAt] = useState("");

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
  ];

  const totalScore = correct * 5;
  const percentage = Math.round((correct / totalQuestions) * 100);
  const rank = Math.floor(Math.random() * 100) + 1;

  return (
    <>
      <Nav />
      <div className="bg-[#E8E5F7] min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          <div className="p-4 pb-1 rounded-2xl shadow bg-white mb-6">
            <h2 className="text-lg font-semibold mb-2">
              C++ Basic Mock Test Results
            </h2>
            <p className="text-gray-600 mb-4">
              Completed on {completedAt} - Duration: {duration} min
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                Score: {correct}/{totalQuestions} ({percentage}%)
              </span>
              <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full">
                Rank: {rank}/156
              </span>
              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
                +{totalScore} Points
              </span>
              <div className="ml-auto flex gap-2">
                <button className="border px-4 py-2 rounded">Share</button>
                <button className="border px-4 py-2 rounded">PDF</button>
              </div>
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-2xl shadow">
              <h4 className="font-semibold mb-4">Performance Analysis</h4>

              {/* Circular Accuracy Graph */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#E0E0E0"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#4CAF50"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={(1 - percentage / 100) * 2 * Math.PI * 45}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                  {percentage}%
                </div>
              </div>

              <ul className="mt-4 text-sm space-y-1">
                <li>
                  <span className="inline-block w-3 h-3 bg-green-500 mr-2 rounded-full"></span>
                  Correct ({correct})
                </li>
                <li>
                  <span className="inline-block w-3 h-3 bg-red-500 mr-2 rounded-full"></span>
                  Incorrect ({incorrect})
                </li>
                <li>
                  <span className="inline-block w-3 h-3 bg-orange-500 mr-2 rounded-full"></span>
                  Marked for Review ({markedForReview})
                </li>
                <li>
                  <span className="inline-block w-3 h-3 bg-indigo-500 mr-2 rounded-full"></span>
                  Attempted ({attempted})
                </li>
                <li>
                  <span className="inline-block w-3 h-3 bg-gray-300 mr-2 rounded-full"></span>
                  Unattempted ({unattempted})
                </li>
              </ul>
              <p className="mt-4 text-gray-600 text-sm">
                Average time per question: <strong>{averageTime} min</strong>
              </p>
            </div>

            {/* Question-wise Analysis */}
            <div className="bg-white p-4 rounded-2xl shadow">
              <h4 className="font-semibold mb-4">Question-wise Analysis</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left bg-[#EDEBFB]">
                    <th className="p-2">Q#</th>
                    <th className="p-2">Topic</th>
                    <th className="p-2">Time Spent</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {questionDetails.map((q, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2">{q.topic}</td>
                      <td className="p-2">{q.timeSpent}</td>
                      <td className="p-2">
                        {q.correct ? (
                          <span className="text-green-600 font-bold">✔️</span>
                        ) : (
                          <span className="text-red-500 font-bold">❌</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => navigate("/mock-tests")}
              className="bg-[#635DAF] text-white px-6 py-2 rounded"
            >
              Practice Similar
            </button>
            <button
              onClick={() => navigate("/test")}
              className="bg-[#EDEBFB] text-[#635DAF] px-6 py-2 rounded border border-[#635DAF]"
            >
              Retest
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
