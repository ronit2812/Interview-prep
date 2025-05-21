import { useState } from "react";

export default function CodingQuestionsListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);

  // Sample topics for filtering
  const topics = [
    "Arrays",
    "Strings",
    "Hash Table",
    "Dynamic Programming",
    "Math",
    "Sorting",
    "Greedy",
    "Depth-First Search",
    "Binary Search",
    "Tree",
    "Graph",
    "Breadth-First Search",
    "Stack",
    "Queue",
    "Recursion",
    "Linked List",
  ];

  // Sample company tags
  const companies = [
    "Google",
    "Amazon",
    "Facebook",
    "Microsoft",
    "Apple",
    "Netflix",
    "Adobe",
    "Uber",
    "LinkedIn",
    "Twitter",
  ];

  // Sample coding questions
  const codingQuestions = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      acceptance: "47.8%",
      topics: ["Arrays", "Hash Table"],
      companies: ["Google", "Amazon", "Facebook"],
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      popularity: 1500000,
      isFavorite: true,
      isCompleted: true,
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      acceptance: "36.8%",
      topics: ["Linked List", "Math", "Recursion"],
      companies: ["Amazon", "Microsoft", "Apple"],
      description:
        "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.",
      popularity: 1200000,
      isFavorite: false,
      isCompleted: false,
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      acceptance: "32.4%",
      topics: ["Hash Table", "Strings", "Sliding Window"],
      companies: ["Facebook", "Amazon", "Google"],
      description:
        "Given a string s, find the length of the longest substring without repeating characters.",
      popularity: 950000,
      isFavorite: true,
      isCompleted: false,
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      acceptance: "34.9%",
      topics: ["Arrays", "Binary Search", "Divide and Conquer"],
      companies: ["Google", "Microsoft", "Apple"],
      description:
        "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
      popularity: 750000,
      isFavorite: false,
      isCompleted: false,
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      acceptance: "31.5%",
      topics: ["Strings", "Dynamic Programming"],
      companies: ["Amazon", "Microsoft", "Facebook"],
      description:
        "Given a string s, return the longest palindromic substring in s.",
      popularity: 720000,
      isFavorite: false,
      isCompleted: true,
    },
    {
      id: 6,
      title: "Valid Parentheses",
      difficulty: "Easy",
      acceptance: "40.9%",
      topics: ["Stack", "Strings"],
      companies: ["Facebook", "Google", "Microsoft"],
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      popularity: 1300000,
      isFavorite: true,
      isCompleted: false,
    },
    {
      id: 7,
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      acceptance: "59.3%",
      topics: ["Linked List", "Recursion"],
      companies: ["Microsoft", "Apple", "Amazon"],
      description:
        "Merge two sorted linked lists and return it as a sorted list.",
      popularity: 1100000,
      isFavorite: false,
      isCompleted: true,
    },
    {
      id: 8,
      title: "Maximum Subarray",
      difficulty: "Easy",
      acceptance: "49.5%",
      topics: ["Arrays", "Divide and Conquer", "Dynamic Programming"],
      companies: ["LinkedIn", "Amazon", "Microsoft"],
      description:
        "Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
      popularity: 1250000,
      isFavorite: false,
      isCompleted: false,
    },
    {
      id: 9,
      title: "Climbing Stairs",
      difficulty: "Easy",
      acceptance: "48.8%",
      topics: ["Dynamic Programming", "Math", "Memoization"],
      companies: ["Adobe", "Amazon", "Google"],
      description:
        "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      popularity: 900000,
      isFavorite: false,
      isCompleted: false,
    },
    {
      id: 10,
      title: "Trapping Rain Water",
      difficulty: "Hard",
      acceptance: "54.5%",
      topics: ["Arrays", "Two Pointers", "Dynamic Programming", "Stack"],
      companies: ["Facebook", "Amazon", "Google", "Microsoft"],
      description:
        "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      popularity: 820000,
      isFavorite: true,
      isCompleted: false,
    },
  ];

  // Handle topic selection
  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  // Filter questions based on search, topics, and difficulty
  const filteredQuestions = codingQuestions.filter((question) => {
    // Filter by search query
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by topics
    const matchesTopics =
      selectedTopics.length === 0 ||
      selectedTopics.some((topic) => question.topics.includes(topic));

    // Filter by difficulty
    const matchesDifficulty =
      selectedDifficulty === "" || question.difficulty === selectedDifficulty;

    return matchesSearch && matchesTopics && matchesDifficulty;
  });

  // Sort questions based on selected option
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        return b.popularity - a.popularity;
      case "acceptance":
        return parseFloat(b.acceptance) - parseFloat(a.acceptance);
      case "difficulty":
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      default:
        return 0;
    }
  });

  const navigateToQuestion = (questionId) => {
    // In a real application, this would navigate to the coding page
    // with the selected question
    console.log(`Navigating to question ${questionId}`);
    alert(`Navigating to question ${questionId}`);
    // Example of how you would navigate in a real React application:
    // history.push(`/coding/${questionId}`);
    // or with React Router:
    // <Link to={`/coding/${questionId}`}>...</Link>
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Coding Questions
            </h1>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                My Lists
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Random Question
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex items-center">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search questions by title or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="ml-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 -mr-0.5 h-4 w-4 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </button>
            <div className="ml-3">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="acceptance">Sort by Acceptance Rate</option>
                <option value="difficulty">Sort by Difficulty</option>
              </select>
            </div>
          </div>

          {/* Filter panel - shown when showFilters is true */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Filter by Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedTopics.includes(topic)
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                        }`}
                        onClick={() => toggleTopic(topic)}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Filter by Difficulty
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded-md text-xs font-medium ${
                        selectedDifficulty === "Easy"
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        setSelectedDifficulty(
                          selectedDifficulty === "Easy" ? "" : "Easy"
                        )
                      }
                    >
                      Easy
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md text-xs font-medium ${
                        selectedDifficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        setSelectedDifficulty(
                          selectedDifficulty === "Medium" ? "" : "Medium"
                        )
                      }
                    >
                      Medium
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md text-xs font-medium ${
                        selectedDifficulty === "Hard"
                          ? "bg-red-100 text-red-800 border border-red-300"
                          : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        setSelectedDifficulty(
                          selectedDifficulty === "Hard" ? "" : "Hard"
                        )
                      }
                    >
                      Hard
                    </button>
                  </div>

                  <h3 className="text-sm font-medium text-gray-700 mb-2 mt-4">
                    Companies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {companies.slice(0, 6).map((company) => (
                      <button
                        key={company}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                      >
                        {company}
                      </button>
                    ))}
                    <button className="px-3 py-1 rounded-full text-xs font-medium text-blue-600 hover:text-blue-800">
                      + More
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Clear All
                </button>
                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Questions List */}
        <div className="bg-white shadow overflow-hidden rounded-md mb-6">
          <ul className="divide-y divide-gray-200">
            {sortedQuestions.map((question) => (
              <li
                key={question.id}
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigateToQuestion(question.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                          ${
                            question.difficulty === "Easy"
                              ? "bg-green-100 text-green-800"
                              : question.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {question.difficulty}
                        </span>
                        <p className="ml-2 text-sm font-medium text-gray-900">
                          {question.title}
                        </p>
                        {question.isCompleted && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 h-4 w-4 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                        {question.isFavorite && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 h-4 w-4 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                        {question.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center">
                        {question.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="mr-2 mt-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                          >
                            {topic}
                          </span>
                        ))}
                        {question.topics.length > 3 && (
                          <span className="mt-1 text-xs text-gray-500">
                            +{question.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-sm text-gray-500">
                    <div>Acceptance: {question.acceptance}</div>
                    <div className="flex items-center mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {(question.popularity / 1000).toFixed(1)}k
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">97</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  8
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  9
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  10
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      {/* Progress Stats Card */}
      <div className="fixed bottom-6 right-6">
        <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-100 w-64">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Your Progress
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Easy (2/321)</span>
                <span className="text-green-600">0.6%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{ width: "0.6%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Medium (1/624)</span>
                <span className="text-yellow-600">0.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-yellow-500 h-1.5 rounded-full"
                  style={{ width: "0.2%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Hard (0/256)</span>
                <span className="text-red-600">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-red-500 h-1.5 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Total solved: 3/1201 (0.25%)
          </div>
        </div>
      </div>
    </div>
  );
}
