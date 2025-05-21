import React, { useState, useEffect } from "react";

const dummyQuestions = [
  {
    id: 1,
    question: "Find the next number in the series: 2, 5, 10, 17, 26, ?",
    options: ["35", "39", "42", "37"],
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
  },
  {
    id: 3,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
  },
  {
    id: 4,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
  },
  // Add more dummy questions as needed
];

const TestPage = () => {
  const totalQuestions = dummyQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skipped, setSkipped] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timerStarted, timeLeft]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
    const newSkipped = skipped.filter((i) => i !== currentQuestion);
    setSkipped(newSkipped);
  };

  const handleNext = () => {
    if (!answers.hasOwnProperty(currentQuestion)) {
      setSkipped([...new Set([...skipped, currentQuestion])]);
    }
    if (currentQuestion < totalQuestions - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    alert("Test submitted!");
    // Redirect to result page or send answers to backend
  };

  const progress = (Object.keys(answers).length / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-[#E8E5F7]">
      {/* Navbar */}
      <nav className="bg-white p-4 shadow flex justify-between items-center">
        <img
          src="/api/placeholder/20/20"
          alt="Google logo"
          className="w-5 h-5 mr-2"
        />

        <h2 className="text-md font-semibold">
          {dummyQuestions[currentQuestion].title || "C++ Basics Test 1"}
        </h2>
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
        <div className="md:col-span-3 bg-white p-6 rounded-2xl">
          {/* Top Progress + Timer */}
          <div className="flex justify-between mb-4 items-center">
            <p>
              Question {currentQuestion + 1} of {totalQuestions}
            </p>
            <p className="text-red-600 font-medium">
              Time Left: {formatTime(timeLeft)}
            </p>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-[#635DAF]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Question Content */}
          <h3 className="mb-4 text-lg font-medium">
            {dummyQuestions[currentQuestion].question}
          </h3>
          <div className="space-y-3">
            {dummyQuestions[currentQuestion].options.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`p-3 border rounded cursor-pointer ${
                  answers[currentQuestion] === idx
                    ? "bg-[#dcd9ff] border-[#635DAF]"
                    : "bg-white"
                }`}
              >
                <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border px-4 py-2 rounded disabled:opacity-50"
            >
              &lt; Previous
            </button>
            {currentQuestion < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="bg-[#4946A6] text-white px-6 py-2 rounded hover:opacity-90"
              >
                Next &gt;
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-red-500 text-white px-6 py-2 rounded"
              >
                Submit Test
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="bg-white p-4 rounded-2xl">
          <h4 className="font-semibold mb-4">Question Navigator</h4>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {[...Array(totalQuestions)].map((_, i) => {
              let bg = "bg-gray-300"; // default
              if (answers.hasOwnProperty(i)) bg = "bg-green-300";
              if (skipped.includes(i)) bg = "bg-yellow-300";
              if (i === currentQuestion) bg = "bg-[#635DAF] text-white";

              return (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={`w-8 h-8 rounded-full ${bg} font-semibold`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="text-sm space-y-1">
            <p>
              <span className="inline-block w-4 h-4 bg-green-300 mr-2 rounded-full"></span>{" "}
              Answered
            </p>
            <p>
              <span className="inline-block w-4 h-4 bg-yellow-300 mr-2 rounded-full"></span>{" "}
              Skipped
            </p>
            <p>
              <span className="inline-block w-4 h-4 bg-[#635DAF] mr-2 rounded-full"></span>{" "}
              Current
            </p>
            <p>
              <span className="inline-block w-4 h-4 bg-gray-300 mr-2 rounded-full"></span>{" "}
              Unanswered
            </p>
          </div>
        </div>
      </div>

      {/* Start Timer on Mount */}
      {!timerStarted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold">Start Test</h2>
            <p className="text-gray-600">
              Your timer will start once you begin.
            </p>
            <button
              className="bg-[#4946A6] text-white px-6 py-2 rounded"
              onClick={() => setTimerStarted(true)}
            >
              Start Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;
