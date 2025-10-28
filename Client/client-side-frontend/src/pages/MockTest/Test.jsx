"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Send,
  User,
} from "lucide-react";
import confetti from "canvas-confetti";
import Nav from "../../components/Navbar";

const dummyQuestions = [
  {
    id: 1,
    question: "Find the next number in the series: 2, 5, 10, 17, 26, ?",
    options: ["35", "39", "42", "37"],
    correctAnswer: 3, // Index of the correct answer (37)
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctAnswer: 2, // Index of the correct answer (Paris)
  },
  {
    id: 3,
    question:
      "If a train travels at 120 km/h, how far will it travel in 2.5 hours?",
    options: ["240 km", "300 km", "320 km", "360 km"],
    correctAnswer: 1, // Index of the correct answer (300 km)
  },
  {
    id: 4,
    question:
      "Which of the following is NOT include in OOPs (Object Oriented Programming) Concepts?",
    options: [
      "Abstraction",
      "Ploymorphism",
      "Conditional Statement",
      "Inheritance",
    ],
    correctAnswer: 2, // Index of the correct answer (Green)
  },
];

export default function TestPage() {
  const totalQuestions = dummyQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skipped, setSkipped] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [timerStarted, setTimerStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateQuestion, setAnimateQuestion] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const confettiRef = useRef(null);

  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timerStarted, timeLeft]);

  useEffect(() => {
    if (timerStarted) {
      // Automatically enter fullscreen when test starts
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
    }
  }, [timerStarted]);

  useEffect(() => {
    if (showConfetti && confettiRef.current) {
      const canvas = confettiRef.current;
      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      });

      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#8A7ED9", "#4946A6", "#282C40", "#3C4973", "#6F92BF"],
      });

      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    }
  }, [showConfetti]);

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
    setAnimateQuestion(false);
    setTimeout(() => {
      if (!answers.hasOwnProperty(currentQuestion)) {
        setSkipped([...new Set([...skipped, currentQuestion])]);
      }
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
      setAnimateQuestion(true);
    }, 200);
  };

  const handlePrevious = () => {
    setAnimateQuestion(false);
    setTimeout(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      }
      setAnimateQuestion(true);
    }, 200);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Calculate correct and wrong answers
    let correct = 0;
    let wrong = 0;
    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      const questionNum = parseInt(questionIndex);
      if (dummyQuestions[questionNum]?.correctAnswer === answerIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    setCorrectAnswers(correct);
    setWrongAnswers(wrong);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      // Calculate percentage based on answered questions if not all are answered
      const answeredCount = Object.keys(answers).length;
      const percentageCorrect =
        answeredCount > 0 ? (correct / answeredCount) * 100 : 0;

      if (percentageCorrect >= 70) {
        setShowConfetti(true);
      }

      setShowResults(true);
    }, 1500);
  };

  const handleGoHome = () => {
    // Exit fullscreen before redirecting
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(
          `Error attempting to exit full-screen mode: ${err.message}`
        );
      });
    }
    window.location.href = "/";
  };

  const progress = (Object.keys(answers).length / totalQuestions) * 100;
  const timeProgress = (timeLeft / 600) * 100;
  const isTimeWarning = timeLeft < 120; // Less than 2 minutes

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E8E5F7] to-white flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-[#282C40] mb-4">
            Test Submitted Successfully!
          </h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-[#3C4973]">Correct Answers:</span>
              <span className="font-medium text-[#0D9F4F]">
                {correctAnswers}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#3C4973]">Wrong Answers:</span>
              <span className="font-medium text-[#FF3B30]">{wrongAnswers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#3C4973]">Skipped Questions:</span>
              <span className="font-medium text-[#FFB800]">
                {skipped.length}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoHome}
              className="w-full bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] text-white px-6 py-3 rounded-xl font-medium hover:opacity-95 transition-opacity"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8E5F7] to-white">
      {/* Navbar */}
      <nav className="bg-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] flex items-center justify-center text-white font-bold mr-3">
              Q
            </div>
            <h2 className="text-lg font-semibold text-[#282C40]">
              {dummyQuestions[currentQuestion].title || "C++ Basics Test 1"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-[#F8F7FD] px-4 py-2 rounded-full">
              <Clock
                className={`h-4 w-4 ${
                  isTimeWarning ? "text-red-500" : "text-[#4946A6]"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isTimeWarning ? "text-red-500" : "text-[#3C4973]"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="h-9 w-9 bg-[#4946A6] rounded-full flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Question Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Top Progress + Timer */}
              <div className="bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] p-5 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-white/20 text-white font-medium">
                      {currentQuestion + 1}
                    </span>
                    <span>of {totalQuestions} Questions</span>
                  </div>
                  <div className="flex md:hidden items-center gap-2">
                    <Clock
                      className={`h-4 w-4 ${
                        isTimeWarning ? "text-red-100" : "text-white"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isTimeWarning ? "text-red-100" : "text-white"
                      }`}
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Completion</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span>Time Remaining</span>
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        isTimeWarning ? "bg-red-300" : "bg-white"
                      }`}
                      initial={{ width: "100%" }}
                      animate={{ width: `${timeProgress}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {animateQuestion && (
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-medium text-[#282C40] mb-6">
                        {dummyQuestions[currentQuestion].question}
                      </h3>
                      <div className="space-y-4">
                        {dummyQuestions[currentQuestion].options.map(
                          (opt, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleAnswer(idx)}
                              className={`p-4 border rounded-xl cursor-pointer transition-all transform hover:scale-[1.01] ${
                                answers[currentQuestion] === idx
                                  ? "bg-[#F8F7FD] border-[#8A7ED9] shadow-md"
                                  : "bg-white hover:border-[#E8E5F7] hover:bg-[#FAFAFA]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex items-center justify-center h-8 w-8 rounded-full font-medium text-sm ${
                                    answers[currentQuestion] === idx
                                      ? "bg-[#4946A6] text-white"
                                      : "bg-[#F8F7FD] text-[#3C4973]"
                                  }`}
                                >
                                  {String.fromCharCode(65 + idx)}
                                </div>
                                <span
                                  className={`${
                                    answers[currentQuestion] === idx
                                      ? "text-[#282C40] font-medium"
                                      : "text-[#3C4973]"
                                  }`}
                                >
                                  {opt}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2 px-4 py-2.5 border border-[#E8E5F7] rounded-lg text-[#3C4973] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F8F7FD] transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  {currentQuestion < totalQuestions - 1 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#4946A6] text-white rounded-lg hover:bg-[#3C3985] transition-colors"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#4946A6] text-white rounded-lg hover:bg-[#3C3985] transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Test
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Question Navigator */}
          <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
            <h4 className="font-semibold text-[#282C40] mb-4">
              Question Navigator
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-6">
              {[...Array(totalQuestions)].map((_, i) => {
                let bgColor = "bg-[#F8F7FD] text-[#3C4973]"; // default
                let icon = null;

                if (answers.hasOwnProperty(i)) {
                  bgColor = "bg-[#EDFCF2] text-[#0D9F4F] border-[#0D9F4F]";
                  icon = <CheckCircle className="h-3 w-3" />;
                }
                if (skipped.includes(i)) {
                  bgColor = "bg-[#FFF8E7] text-[#FFB800] border-[#FFB800]";
                  icon = <AlertCircle className="h-3 w-3" />;
                }
                if (i === currentQuestion) {
                  bgColor = "bg-[#4946A6] text-white";
                  icon = null;
                }

                return (
                  <button
                    key={i}
                    onClick={() => {
                      setAnimateQuestion(false);
                      setTimeout(() => {
                        setCurrentQuestion(i);
                        setAnimateQuestion(true);
                      }, 200);
                    }}
                    className={`relative h-10 w-10 rounded-lg border flex items-center justify-center font-medium transition-all ${bgColor}`}
                  >
                    {i + 1}
                    {icon && (
                      <span className="absolute -top-1 -right-1">{icon}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#EDFCF2] border border-[#0D9F4F] flex items-center justify-center">
                  <CheckCircle className="h-2.5 w-2.5 text-[#0D9F4F]" />
                </div>
                <span className="text-[#3C4973]">Answered</span>
                <span className="ml-auto font-medium text-[#282C40]">
                  {Object.keys(answers).length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#FFF8E7] border border-[#FFB800] flex items-center justify-center">
                  <AlertCircle className="h-2.5 w-2.5 text-[#FFB800]" />
                </div>
                <span className="text-[#3C4973]">Skipped</span>
                <span className="ml-auto font-medium text-[#282C40]">
                  {skipped.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#F8F7FD] border border-[#E8E5F7] flex items-center justify-center">
                  <HelpCircle className="h-2.5 w-2.5 text-[#3C4973]" />
                </div>
                <span className="text-[#3C4973]">Unanswered</span>
                <span className="ml-auto font-medium text-[#282C40]">
                  {totalQuestions - Object.keys(answers).length}
                </span>
              </div>

              <div className="pt-4 mt-4 border-t">
                <div className="flex items-center justify-between text-[#282C40]">
                  <span className="font-medium">Total Questions</span>
                  <span className="font-medium">{totalQuestions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Timer Modal */}
      <AnimatePresence>
        {!timerStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-2xl text-center space-y-6 shadow-xl max-w-md mx-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#F8F7FD] flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-[#4946A6]" />
              </div>
              <h2 className="text-2xl font-bold text-[#282C40]">
                Ready to Begin?
              </h2>
              <p className="text-[#3C4973]">
                You have 10 minutes to complete this test. Your timer will start
                once you begin.
              </p>
              <button
                className="w-full bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                onClick={() => setTimerStarted(true)}
              >
                Start Test
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Canvas */}
      {showConfetti && (
        <canvas
          ref={confettiRef}
          className="fixed inset-0 pointer-events-none z-50"
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
