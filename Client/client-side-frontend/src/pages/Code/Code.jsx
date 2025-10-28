"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  Play,
  CheckCircle,
  Settings,
  AlertTriangle,
  Code,
  Terminal,
  CheckSquare,
  X,
  Copy,
  Clock,
  ChevronDown,
  ChevronUp,
  Plus,
  HardDrive,
  Moon,
  Sun,
  Lock,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import Editor from "@monaco-editor/react";
import { getCodingQuestionById } from "../../services/CodingDependency";
import { executeCode } from "../../services/CodeExecutionService";

export default function CodingPage() {
  const location = useLocation();
  const [id, setId] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState("// Write your solution here\n\n");
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("problem");
  const [difficulty, setDifficulty] = useState("Medium");
  const [isExecuting, setIsExecuting] = useState(false); // Track if execution is in progress
  const [submissionComplete, setSubmissionComplete] = useState(false); // Track when submission is complete

  // Add question data state
  const [questionData, setQuestionData] = useState({
    title: "Two Sum",
    description: "Write a program that takes an input",
    difficultyLevel: "Easy",
    examples: [],
    testCases: [],
    tags: [],
    topics: [],
  });

  // Update testCases state to be derived from questionData
  const [testCases, setTestCases] = useState([
    {
      id: 1,
      status: "pending",
      input: "",
      output: "",
      expected: "",
      isExample: true,
      hidden: false,
    },
    {
      id: 2,
      status: "pending",
      input: "",
      output: "",
      expected: "",
      isExample: true,
      hidden: false,
    },
    {
      id: 3,
      status: "pending",
      input: "",
      output: "",
      expected: "",
      isExample: true,
      hidden: false,
    },
    {
      id: 4,
      status: "pending",
      input: "",
      output: "",
      expected: "",
      isExample: false,
      hidden: true,
    },
    {
      id: 5,
      status: "pending",
      input: "",
      output: "",
      expected: "",
      isExample: false,
      hidden: true,
    },
  ]);

  // Console options
  // const [consoleTab, setConsoleTab] = useState("result");
  const [consoleHeight, setConsoleHeight] = useState(40); // Default console height percentage
  const [isDraggingConsole, setIsDraggingConsole] = useState(false);
  const [executionDetails, setExecutionDetails] = useState({
    runtime: "56 ms",
    memory: "15.2 MB",
    status: "Wrong Answer",
    lastRun: "2 minutes ago",
  });

  // Panel resizing state
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // Default to 50%
  const containerRef = useRef(null);
  const resizerRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Console resize refs
  const editorContainerRef = useRef(null);
  const consoleResizerRef = useRef(null);

  // Add theme state
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const languages = [
    { id: "python", name: "Python" },
    { id: "cpp", name: "C++" },
  ];

  useEffect(() => {
    // Correctly create a URLSearchParams object
    const searchParams = new URLSearchParams(location.search);
    const questionId = searchParams.get("id");
    setId(questionId); // Store the ID in state

    if (questionId) {
      const fetchCodingQuestion = async () => {
        try {
          const data = await getCodingQuestionById(questionId);
          console.log("Fetched question data:", data);

          if (data.success && data.codingQuestion) {
            const question = data.codingQuestion;
            setQuestionData(question);
            setDifficulty(question.difficultyLevel);

            // Transform examples and test cases into the format our UI expects
            const formattedTestCases = [];

            // Add examples as visible test cases
            if (question.examples && question.examples.length > 0) {
              question.examples.forEach((example, index) => {
                formattedTestCases.push({
                  id: formattedTestCases.length + 1,
                  status: "pending",
                  input: example.input,
                  output: "",
                  expected: example.output,
                  isExample: true,
                  hidden: false,
                });
              });
            }

            // Add actual test cases
            if (question.testCases && question.testCases.length > 0) {
              question.testCases.forEach((testCase, index) => {
                formattedTestCases.push({
                  id: formattedTestCases.length + 1,
                  status: "pending",
                  input: testCase.input,
                  output: "",
                  expected: testCase.expectedOutput, // Changed from output to expectedOutput
                  isExample: false,
                  hidden: testCase.isHidden || false,
                });
              });
            }

            // Update test cases if we have data
            if (formattedTestCases.length > 0) {
              setTestCases(formattedTestCases);
            }
          }
        } catch (error) {
          console.error("Error fetching coding question:", error);
        }
      };

      fetchCodingQuestion();
    }
  }, [location.search]);

  const handleRun = async () => {
    try {
      // Reset submission completion state
      setSubmissionComplete(false);

      // Show loading state
      setIsConsoleOpen(true);
      setActiveTab("testcases"); // Auto-switch to test cases tab in left panel

      // Check if code is empty or just comments/whitespace
      const hasCode =
        code.trim().length > 0 &&
        !code.trim().startsWith("//") &&
        code.trim() !== "// Write your solution here";

      if (!hasCode) {
        setExecutionDetails((prev) => ({
          ...prev,
          status: "No Code",
          lastRun: "just now",
        }));
        return;
      }

      // Set execution in progress
      setIsExecuting(true);

      // Get non-example test cases
      const testCasesToRun = testCases.filter((test) => !test.isExample);

      // Set execution details to loading state
      setExecutionDetails((prev) => ({
        ...prev,
        status: "Running",
        lastRun: "just now",
      }));

      // Update all test cases to pending status
      setTestCases((prev) =>
        prev.map((test) => ({
          ...test,
          status: test.isExample ? test.status : "pending",
          output: test.isExample ? test.output : "",
        }))
      );

      try {
        // Execute code using Docker
        const result = await executeCode(
          code,
          selectedLanguage,
          testCasesToRun,
          id
        );
        console.log(result);
        if (result.success) {
          // Process and display results
          const passedCount = result.results.filter(
            (r) => r.status === "passed"
          ).length;
          const totalCount = result.results.length;

          // Update test cases with results
          setTestCases((prev) =>
            prev.map((test) => {
              if (test.isExample) return test;

              const matchingResult = result.results.find(
                (r) => r.id === test.id
              );
              if (!matchingResult) return test;

              return {
                ...test,
                output: matchingResult.output,
                status: matchingResult.status,
              };
            })
          );

          // Update execution details with pass/fail status
          setExecutionDetails({
            ...result.executionDetails,
            status: passedCount === totalCount ? "Accepted" : "Wrong Answer",
          });
        } else {
          // Handle error
          console.error("Code execution failed:", result.message);
          setExecutionDetails((prev) => ({
            ...prev,
            status: "Error",
            lastRun: "just now",
          }));
        }
      } catch (error) {
        console.error("Error running code:", error);
        // Show error in console
        setExecutionDetails((prev) => ({
          ...prev,
          status: "Error",
          lastRun: "just now",
        }));
      } finally {
        // Execution complete
        setIsExecuting(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setIsExecuting(false);
    }
  };

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleSubmit = async () => {
    try {
      // Show loading state
      setIsConsoleOpen(true);
      setActiveTab("testcases"); // Auto-switch to test cases tab in left panel

      // Check if code is empty or just comments/whitespace
      const hasCode =
        code.trim().length > 0 &&
        !code.trim().startsWith("//") &&
        code.trim() !== "// Write your solution here";

      if (!hasCode) {
        setExecutionDetails((prev) => ({
          ...prev,
          status: "No Code",
          lastRun: "just now",
        }));
        return;
      }

      // Set execution in progress
      setIsExecuting(true);

      // Set execution details to loading state
      setExecutionDetails((prev) => ({
        ...prev,
        status: "Running",
        lastRun: "just now",
      }));

      // Get all test cases (both example and hidden)
      const allTestCases = testCases;

      // Update all test cases to pending status
      setTestCases((prev) =>
        prev.map((test) => ({
          ...test,
          status: "pending",
          output: "",
        }))
      );

      try {
        // Execute code using Docker
        const result = await executeCode(code, selectedLanguage, allTestCases);
        console.log(result);
        console.log("RESULT: ", result.success);
        if (result.success) {
          // Process results
          const passedCount = result.results.filter(
            (r) => r.status === "passed"
          ).length;
          const totalCount = result.results.length;

          // Update test cases with results
          setTestCases((prev) =>
            prev.map((test) => {
              const matchingResult = result.results.find(
                (r) => r.id === test.id
              );
              if (!matchingResult) return test;

              return {
                ...test,
                output: matchingResult.output,
                status: matchingResult.status,
              };
            })
          );

          // Update execution details with pass/fail status
          setExecutionDetails({
            ...result.executionDetails,
            status: passedCount === totalCount ? "Accepted" : "Wrong Answer",
          });

          // If all test cases passed, mark submission as complete
          if (passedCount === totalCount) {
            setSubmissionComplete(true);
          }
        } else {
          // Handle error
          console.error("Code execution failed:", result.message);
          setExecutionDetails((prev) => ({
            ...prev,
            status: "Error",
            lastRun: "just now",
          }));
        }
      } catch (error) {
        console.error("Error submitting code:", error);
        // Show error in console
        setExecutionDetails((prev) => ({
          ...prev,
          status: "Error",
          lastRun: "just now",
        }));
      } finally {
        // Execution complete
        setIsExecuting(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setIsExecuting(false);
    }
  };

  // Handle panel resizing
  const startResize = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const resize = (e) => {
    if (isDraggingRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const newWidth = Math.max(
        20,
        Math.min(80, ((e.clientX - containerRect.left) / containerWidth) * 100)
      );
      setLeftPanelWidth(newWidth);
    }
  };

  const stopResize = () => {
    isDraggingRef.current = false;
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
    document.body.style.removeProperty("cursor");
    document.body.style.removeProperty("user-select");
  };

  // Handle console resizing
  const handleConsoleResizeStart = (e) => {
    e.preventDefault();
    setIsDraggingConsole(true);
  };

  // Effect to handle console resize dragging
  useEffect(() => {
    const handleConsoleResize = (e) => {
      if (isDraggingConsole && editorContainerRef.current) {
        const containerRect =
          editorContainerRef.current.getBoundingClientRect();
        const containerHeight = containerRect.height;
        const relativeY = e.clientY - containerRect.top;
        const percentFromBottom =
          ((containerHeight - relativeY) / containerHeight) * 100;

        // Limit the height between 20% and 70%
        const newHeight = Math.min(Math.max(percentFromBottom, 20), 70);
        setConsoleHeight(newHeight);
      }
    };

    const handleConsoleResizeEnd = () => {
      setIsDraggingConsole(false);
    };

    if (isDraggingConsole) {
      document.body.style.cursor = "row-resize";
      document.addEventListener("mousemove", handleConsoleResize);
      document.addEventListener("mouseup", handleConsoleResizeEnd);
    }

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", handleConsoleResize);
      document.removeEventListener("mouseup", handleConsoleResizeEnd);
    };
  }, [isDraggingConsole]);

  // Clean up event listeners
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResize);
      document.body.style.removeProperty("cursor");
      document.body.style.removeProperty("user-select");
    };
  }, []);

  // Toggle console
  // const toggleConsole = () => {
  //   setIsConsoleOpen(!isConsoleOpen);
  // };

  // Add theme toggle function
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC]">
      {/* Header */}
      <header className="bg-[#282C40] text-white px-6 py-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              to="/code-list"
              className="text-[#E8E5F7] hover:text-white flex items-center text-sm font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Problems
            </Link>
            <div className="flex items-center">
              <h1 className="text-xl font-bold mr-3">{questionData.title}</h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  difficulty === "Easy"
                    ? "bg-green-500/20 text-green-400"
                    : difficulty === "Medium"
                    ? "bg-[#8A7ED9]/20 text-[#8A7ED9]"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {difficulty}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="flex items-center text-sm font-medium text-[#E8E5F7] hover:text-white transition-colors">
              <BookOpen className="h-4 w-4 mr-2" />
              Solution
            </button>
          </div>
        </div>
      </header>

      {/* Submission Success Overlay */}
      {submissionComplete && (
        <div className="absolute inset-0 z-50 bg-[#282C40]/90 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#282C40] mb-2">
              Well Done!
            </h2>
            <p className="text-[#3C4973] mb-6">
              You've successfully solved this problem. All test cases passed!
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
              <Link
                to="/code-list"
                className="px-6 py-3 bg-[#8A7ED9] text-white rounded-md hover:bg-[#7A6EBF] transition-colors font-medium flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Problems
              </Link>
              <button
                onClick={() => setSubmissionComplete(false)}
                className="px-6 py-3 border border-[#8A7ED9] text-[#8A7ED9] rounded-md hover:bg-[#8A7ED9]/10 transition-colors font-medium"
              >
                View Solution
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden" ref={containerRef}>
        {/* Left Panel - Problem Description */}
        <div
          className="bg-white shadow-md flex flex-col z-10"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <div className="border-b border-[#E8E5F7]">
            <div className="flex">
              <button
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "problem"
                    ? "text-[#4946A6] border-b-2 border-[#4946A6] bg-[#F8F9FC]"
                    : "text-[#3C4973] hover:text-[#4946A6] hover:bg-[#F8F9FC]"
                }`}
                onClick={() => setActiveTab("problem")}
              >
                Problem
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "testcases"
                    ? "text-[#4946A6] border-b-2 border-[#4946A6] bg-[#F8F9FC]"
                    : "text-[#3C4973] hover:text-[#4946A6] hover:bg-[#F8F9FC]"
                }`}
                onClick={() => setActiveTab("testcases")}
              >
                Test Cases
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "submissions"
                    ? "text-[#4946A6] border-b-2 border-[#4946A6] bg-[#F8F9FC]"
                    : "text-[#3C4973] hover:text-[#4946A6] hover:bg-[#F8F9FC]"
                }`}
                onClick={() => setActiveTab("submissions")}
              >
                Submissions
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "problem" && (
              <div className="prose max-w-none">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#8A7ED9]/10 flex items-center justify-center mr-4">
                    <Code className="h-5 w-5 text-[#8A7ED9]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#282C40] m-0">
                    {questionData.title}
                  </h2>
                </div>

                <p className="text-[#3C4973]">{questionData.description}</p>

                {/* Examples - Now as part of the Problem tab with dark theme */}
                <div className="mt-8 mb-6">
                  <h3 className="text-xl font-semibold text-[#282C40] mb-4">
                    Examples
                  </h3>
                  <div className="space-y-5">
                    {testCases
                      .filter((test) => test.isExample)
                      .map((example) => (
                        <div
                          key={example.id}
                          className="bg-[#282C40] p-5 rounded-xl border border-[#3C4973] text-white"
                        >
                          <p className="font-medium text-white mb-3">
                            Example {example.id}:
                          </p>
                          <div className="space-y-3">
                            <div className="bg-[#3C4973] p-3 rounded border border-[#4C5980]">
                              <p className="text-sm text-[#E8E5F7] font-medium mb-1">
                                Input:
                              </p>
                              <pre className="font-mono text-sm bg-[#1E2235] text-[#E8E5F7] p-2 rounded">
                                {example.input}
                              </pre>
                            </div>
                            <div className="bg-[#3C4973] p-3 rounded border border-[#4C5980]">
                              <p className="text-sm text-[#E8E5F7] font-medium mb-1">
                                Output:
                              </p>
                              <pre className="font-mono text-sm bg-[#1E2235] text-[#E8E5F7] p-2 rounded">
                                {example.expected}
                              </pre>
                            </div>
                            {example.id === 1 && questionData.explanation && (
                              <div className="bg-[#3C4973] p-3 rounded border border-[#4C5980]">
                                <p className="text-sm text-[#E8E5F7] font-medium mb-1">
                                  Explanation:
                                </p>
                                <p className="text-sm text-[#E8E5F7]">
                                  {questionData.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {questionData.followUp && (
                  <div className="bg-[#4946A6]/10 border-l-4 border-[#4946A6] p-4 rounded-r-xl">
                    <h3 className="text-lg font-semibold text-[#4946A6] mb-2">
                      Follow-up:
                    </h3>
                    <p className="text-[#3C4973]">{questionData.followUp}</p>
                  </div>
                )}

                {/* Display Tags */}
                {questionData.tags && questionData.tags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-md font-semibold text-[#282C40] mb-2">
                      Tags:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {questionData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F0EFFC] text-[#4946A6]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "testcases" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#8A7ED9]/10 flex items-center justify-center mr-3">
                      <CheckSquare className="h-4 w-4 text-[#8A7ED9]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#282C40] flex items-center">
                      Test Cases
                      <span className="ml-3 px-2.5 py-1 bg-[#F0EFFC] rounded-full text-sm font-medium text-[#4946A6]">
                        {
                          testCases.filter(
                            (tc) => !tc.isExample && tc.status === "passed"
                          ).length
                        }
                        /{testCases.filter((tc) => !tc.isExample).length}{" "}
                        passing
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Test Cases */}
                  <div>
                    <div className="space-y-3 pl-1">
                      {testCases
                        .filter((test) => !test.isExample)
                        .map((test, index) => (
                          <div
                            key={test.id}
                            className="bg-[#F8F9FC] p-4 rounded-xl border border-[#E8E5F7]"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {test.status === "passed" && (
                                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                    <CheckCircle
                                      size={12}
                                      className="text-green-500"
                                    />
                                  </div>
                                )}
                                {test.status === "failed" && (
                                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                                    <AlertTriangle
                                      size={12}
                                      className="text-red-500"
                                    />
                                  </div>
                                )}
                                {test.status === "pending" && (
                                  <div className="w-5 h-5 rounded-full bg-[#E8E5F7] flex items-center justify-center mr-2">
                                    <div
                                      className={`w-2.5 h-2.5 rounded-full border-2 border-[#6F92BF] ${
                                        isExecuting ? "animate-pulse" : ""
                                      }`}
                                    />
                                  </div>
                                )}
                                <span className="font-medium text-[#282C40]">
                                  Test Case {index + 1}
                                </span>
                              </div>
                              {test.hidden && (
                                <div className="flex items-center text-[#6F92BF]">
                                  <Lock size={14} className="mr-1" />
                                  <span className="text-xs">Hidden</span>
                                </div>
                              )}
                            </div>

                            {!test.hidden && (
                              <div className="mt-3 space-y-2 pl-7">
                                <div className="text-sm">
                                  <span className="text-[#6F92BF] font-medium">
                                    Input:
                                  </span>{" "}
                                  {test.input}
                                </div>
                                <div className="text-sm">
                                  <span className="text-[#6F92BF] font-medium">
                                    Expected:
                                  </span>{" "}
                                  {test.expected}
                                </div>
                                {test.status !== "pending" && (
                                  <div className="text-sm">
                                    <span className="text-[#6F92BF] font-medium">
                                      Output:
                                    </span>{" "}
                                    {test.output}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "submissions" && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#8A7ED9]/10 flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-[#8A7ED9]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#282C40]">
                    Your Submissions
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#E8E5F7] overflow-hidden">
                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="text-green-500 mr-2"
                          />
                          <span className="font-medium text-[#282C40]">
                            Accepted
                          </span>
                        </div>
                        <span className="text-sm text-[#6F92BF]">
                          15 minutes ago
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <Clock size={14} className="text-[#6F92BF] mr-2" />
                          <span className="text-[#3C4973]">Runtime: 56 ms</span>
                        </div>
                        <div className="flex items-center">
                          <HardDrive
                            size={14}
                            className="text-[#6F92BF] mr-2"
                          />
                          <span className="text-[#3C4973]">
                            Memory: 15.2 MB
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Code size={14} className="text-[#6F92BF] mr-2" />
                          <span className="text-[#3C4973]">
                            Language: Python
                          </span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <button className="text-[#4946A6] text-sm hover:underline">
                          View Code
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#E8E5F7] overflow-hidden">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <AlertTriangle
                            size={16}
                            className="text-red-500 mr-2"
                          />
                          <span className="font-medium text-[#282C40]">
                            Wrong Answer
                          </span>
                        </div>
                        <span className="text-sm text-[#6F92BF]">
                          2 days ago
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <AlertTriangle
                            size={14}
                            className="text-[#6F92BF] mr-2"
                          />
                          <span className="text-[#3C4973]">
                            Failed on test case 3
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Code size={14} className="text-[#6F92BF] mr-2" />
                          <span className="text-[#3C4973]">
                            Language: Python
                          </span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <button className="text-[#4946A6] text-sm hover:underline">
                          View Code
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resizer */}
        <div
          ref={resizerRef}
          className="w-1 bg-transparent hover:bg-[#8A7ED9] relative z-50"
          style={{ cursor: "col-resize" }}
          onMouseDown={startResize}
        >
          <div className="absolute inset-y-0 -left-1 -right-1 cursor-col-resize"></div>
        </div>

        {/* Right Panel - Code Editor */}
        <div
          className="flex-1 flex flex-col"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <div className="bg-[#282C40] text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="block w-40 rounded-md bg-[#3C4973] border-0 text-white shadow-sm focus:ring-2 focus:ring-[#8A7ED9] text-sm py-2"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>

              <button
                className="ml-3 text-[#E8E5F7] hover:text-white transition-colors"
                onClick={toggleTheme}
                title={
                  isDarkTheme ? "Switch to light theme" : "Switch to dark theme"
                }
              >
                {isDarkTheme ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRun}
                className="px-4 py-2 bg-[#3C4973] text-white hover:bg-[#4946A6] rounded-md text-sm font-medium flex items-center transition-colors"
              >
                <Play className="h-4 w-4 mr-2" />
                Run
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#8A7ED9] text-white hover:bg-[#6F92BF] rounded-md text-sm font-medium flex items-center transition-colors"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit
              </button>
            </div>
          </div>

          <div
            className="flex-1 flex flex-col relative"
            ref={editorContainerRef}
          >
            <Editor
              height={isConsoleOpen ? `${100 - consoleHeight}%` : "100%"}
              width="100%"
              theme={isDarkTheme ? "vs-dark" : "vs-light"}
              language={selectedLanguage}
              value={code}
              onChange={handleCodeChange}
              options={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            />

            {/* Console output area */}
            {isConsoleOpen && (
              <>
                {/* Console resizer with special styles */}
                <div
                  ref={consoleResizerRef}
                  className="absolute left-0 right-0 h-8 z-50 cursor-row-resize flex items-center justify-center"
                  style={{
                    bottom: `${consoleHeight}%`,
                    transform: "translateY(4px)",
                  }}
                  onMouseDown={handleConsoleResizeStart}
                >
                  <div className="w-32 h-3 bg-[#4C5980] hover:bg-[#8A7ED9] rounded-full flex items-center justify-center">
                    <div className="flex space-x-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-[#282C40] absolute left-0 right-0 bottom-0 overflow-hidden border-t-2 border-[#3C4973] transition-all ease-in-out"
                  style={{
                    height: `${consoleHeight}%`,
                    boxShadow: isDraggingConsole
                      ? "0 -4px 6px rgba(0,0,0,0.1)"
                      : "none",
                  }}
                >
                  <div className="flex items-center justify-between p-2 bg-[#3C4973] border-b border-[#282C40] select-none">
                    <div className="flex items-center">
                      <div className="px-4 py-2 bg-[#282C40] text-white rounded-t font-medium">
                        Result
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => setIsConsoleOpen(false)}
                        className="text-[#E8E5F7] hover:bg-[#4C5980] p-1 rounded mr-1"
                        title="Close console"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 font-mono text-sm overflow-auto h-[calc(100%-40px)] text-[#E8E5F7]">
                    <div>
                      <div
                        className={`p-3 rounded-lg mb-4 ${
                          executionDetails.status === "Accepted"
                            ? "bg-green-900/20 border border-green-700"
                            : executionDetails.status === "Running"
                            ? "bg-blue-900/20 border border-blue-700"
                            : executionDetails.status === "No Code"
                            ? "bg-yellow-900/20 border border-yellow-700"
                            : "bg-red-900/20 border border-red-700"
                        }`}
                      >
                        <div className="flex items-center">
                          {executionDetails.status === "Accepted" ? (
                            <CheckCircle
                              size={16}
                              className="text-green-500 mr-2"
                            />
                          ) : executionDetails.status === "Running" ? (
                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : executionDetails.status === "No Code" ? (
                            <Code size={16} className="text-yellow-500 mr-2" />
                          ) : (
                            <AlertTriangle
                              size={16}
                              className="text-red-500 mr-2"
                            />
                          )}
                          <span className="font-medium">
                            {executionDetails.status === "No Code"
                              ? "No Code to Execute"
                              : executionDetails.status}
                          </span>
                          <span className="text-xs text-[#6F92BF] ml-auto">
                            {executionDetails.lastRun}
                          </span>
                        </div>
                      </div>

                      {executionDetails.status !== "No Code" && (
                        <div className="bg-[#3C4973] rounded p-3 mb-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-[#6F92BF] mb-1">
                                Runtime
                              </p>
                              <p className="text-sm">
                                {executionDetails.status === "Running"
                                  ? "Calculating..."
                                  : executionDetails.runtime}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-[#6F92BF] mb-1">
                                Memory
                              </p>
                              <p className="text-sm">
                                {executionDetails.status === "Running"
                                  ? "Calculating..."
                                  : executionDetails.memory}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {executionDetails.status === "No Code" && (
                        <div className="bg-[#3C4973] rounded p-3 mb-4">
                          <p className="text-sm">
                            Please write some code before running tests.
                          </p>
                          <p className="text-sm mt-2">
                            Use the code editor on the right to implement your
                            solution, then click Run to test it.
                          </p>
                        </div>
                      )}

                      {executionDetails.status === "Accepted" && (
                        <div className="bg-[#3C4973] rounded p-3 mb-4">
                          <p className="text-xs text-[#6F92BF] mb-1">
                            Congratulations!
                          </p>
                          <p className="text-sm mb-3">
                            All test cases passed successfully.
                          </p>
                          <div className="flex space-x-2">
                            <button
                              className="px-3 py-1.5 bg-green-700 text-white rounded text-xs font-medium hover:bg-green-600 transition-colors"
                              onClick={() => setSubmissionComplete(true)}
                            >
                              Show Completion
                            </button>
                            <Link
                              to="/code-list"
                              className="px-3 py-1.5 bg-[#5C668A] text-white rounded text-xs font-medium hover:bg-[#4C5980] transition-colors inline-flex items-center"
                            >
                              <ArrowLeft className="h-3 w-3 mr-1.5" />
                              Problems
                            </Link>
                          </div>
                        </div>
                      )}

                      {testCases.some((test) => test.status === "failed") &&
                        executionDetails.status !== "No Code" && (
                          <div className="bg-[#3C4973] rounded p-3 mb-4">
                            <p className="text-xs text-[#6F92BF] mb-1">
                              Summary
                            </p>
                            <p className="text-sm">
                              {
                                testCases.filter((tc) => tc.status === "passed")
                                  .length
                              }{" "}
                              of {testCases.length} tests passing
                            </p>
                          </div>
                        )}

                      <button
                        className="px-3 py-1.5 bg-[#3C4973] text-[#E8E5F7] rounded text-xs font-medium hover:bg-[#4C5980] transition-colors"
                        onClick={() => setActiveTab("testcases")}
                      >
                        View Test Cases
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
