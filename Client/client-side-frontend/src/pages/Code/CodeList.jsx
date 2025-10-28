"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  SortDesc,
  Code,
  Star,
  CheckCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  BookmarkPlus,
  Zap,
  Clock,
  BarChart2,
} from "lucide-react";
import Nav from "../../components/Navbar";
import { useNavigate } from "react-router";
import { getCodingQuestion } from "../../services/CodingDependency";

export default function CodingQuestionsListing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("difficultyLevel");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCompanies, setActiveCompanies] = useState([]);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [codingQuestions, setCodingQuestions] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fetchCodingQuestions = async () => {
    const codingQuestions = await getCodingQuestion();
    const codingQuestionsData = codingQuestions.codingQuestion;
    console.log(codingQuestionsData);
    setCodingQuestions(codingQuestionsData);
  };

  useEffect(() => {
    fetchCodingQuestions();
  }, []);

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

  // Handle topic selection
  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  // Handle company selection
  const toggleCompany = (company) => {
    if (activeCompanies.includes(company)) {
      setActiveCompanies(activeCompanies.filter((c) => c !== company));
    } else {
      setActiveCompanies([...activeCompanies, company]);
    }
  };

  // Filter questions based on search, topics, and difficulty
  const filteredQuestions = codingQuestions.filter((question) => {
    // Filter by search query
    const matchesSearch =
      question.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description?.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by topics
    const matchesTopics =
      selectedTopics.length === 0 ||
      selectedTopics.some((topic) => question.tags?.includes(topic));

    // Filter by difficulty
    const matchesDifficulty =
      selectedDifficulty === "" ||
      question.difficultyLevel === selectedDifficulty;

    return matchesSearch && matchesTopics && matchesDifficulty;
  });

  // Sort questions based on selected option
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "difficultyLevel":
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        return (
          difficultyOrder[a.difficultyLevel] -
          difficultyOrder[b.difficultyLevel]
        );
      default:
        return 0;
    }
  });

  const navigateToQuestion = (questionId) => {
    // console.log(`Navigating to question ${questionId}`);
    navigate(`/code?id=${questionId}`);
  };

  const clearFilters = () => {
    setSelectedTopics([]);
    setSelectedDifficulty("");
    setActiveCompanies([]);
    setSearchQuery("");
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-100 text-emerald-800";
      case "Medium":
        return "bg-amber-100 text-amber-800";
      case "Hard":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8E5F7] to-white">
      <Nav />
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] flex items-center justify-center text-white mr-3">
                <Code className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold text-[#282C40]">
                Coding Questions
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center px-4 py-2 rounded-lg border border-[#E8E5F7] text-sm font-medium text-[#3C4973] bg-white hover:bg-[#F8F7FD] transition-colors">
                <BookmarkPlus className="mr-2 h-4 w-4" />
                My Lists
              </button>
              <button className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] text-sm font-medium text-white hover:opacity-90 transition-opacity">
                <Shuffle className="mr-2 h-4 w-4" />
                Random Question
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -10 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#3C4973]" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-[#E8E5F7] rounded-lg bg-white placeholder-[#6F92BF] focus:outline-none focus:ring-2 focus:ring-[#8A7ED9] focus:border-[#8A7ED9] text-[#282C40]"
                placeholder="Search questions by title or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                showFilters
                  ? "bg-[#4946A6] text-white"
                  : "bg-white border border-[#E8E5F7] text-[#3C4973] hover:bg-[#F8F7FD]"
              }`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {selectedTopics.length > 0 ||
              selectedDifficulty ||
              activeCompanies.length > 0 ? (
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-[#8A7ED9] text-white text-xs">
                  {selectedTopics.length +
                    (selectedDifficulty ? 1 : 0) +
                    activeCompanies.length}
                </span>
              ) : null}
            </button>
            <button className="relative flex items-center px-4 py-2.5 border border-[#E8E5F7] rounded-lg bg-white text-sm font-medium text-[#282C40] hover:bg-[#F8F7FD] transition-colors">
              <SortDesc className="h-4 w-4 text-[#3C4973] mr-2" />
              Sort by Difficulty
            </button>
          </div>

          {/* Filter panel - shown when showFilters is true */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <div className="p-6 bg-white border border-[#E8E5F7] rounded-xl shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-[#282C40]">
                          Filter by Topics
                        </h3>
                        {selectedTopics.length > 0 && (
                          <button
                            className="text-xs text-[#4946A6] hover:text-[#8A7ED9]"
                            onClick={() => setSelectedTopics([])}
                          >
                            Clear ({selectedTopics.length})
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {topics.map((topic) => (
                          <button
                            key={topic}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              selectedTopics.includes(topic)
                                ? "bg-[#F0EFFC] text-[#4946A6] border border-[#8A7ED9]"
                                : "bg-[#F8F7FD] text-[#3C4973] border border-[#E8E5F7] hover:border-[#8A7ED9]"
                            }`}
                            onClick={() => toggleTopic(topic)}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-[#282C40]">
                          Filter by Difficulty
                        </h3>
                        {selectedDifficulty && (
                          <button
                            className="text-xs text-[#4946A6] hover:text-[#8A7ED9]"
                            onClick={() => setSelectedDifficulty("")}
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedDifficulty === "Easy"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-white text-[#3C4973] border border-[#E8E5F7] hover:bg-emerald-50"
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
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedDifficulty === "Medium"
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : "bg-white text-[#3C4973] border border-[#E8E5F7] hover:bg-amber-50"
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
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedDifficulty === "Hard"
                              ? "bg-rose-100 text-rose-800 border border-rose-300"
                              : "bg-white text-[#3C4973] border border-[#E8E5F7] hover:bg-rose-50"
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

                      <div className="flex items-center justify-between mt-6 mb-3">
                        <h3 className="text-sm font-medium text-[#282C40]">
                          Companies
                        </h3>
                        {activeCompanies.length > 0 && (
                          <button
                            className="text-xs text-[#4946A6] hover:text-[#8A7ED9]"
                            onClick={() => setActiveCompanies([])}
                          >
                            Clear ({activeCompanies.length})
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {companies
                          .slice(0, showAllCompanies ? companies.length : 6)
                          .map((company) => (
                            <button
                              key={company}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                activeCompanies.includes(company)
                                  ? "bg-[#F0EFFC] text-[#4946A6] border border-[#8A7ED9]"
                                  : "bg-[#F8F7FD] text-[#3C4973] border border-[#E8E5F7] hover:border-[#8A7ED9]"
                              }`}
                              onClick={() => toggleCompany(company)}
                            >
                              {company}
                            </button>
                          ))}
                        {companies.length > 6 && (
                          <button
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#4946A6] hover:text-[#8A7ED9]"
                            onClick={() =>
                              setShowAllCompanies(!showAllCompanies)
                            }
                          >
                            {showAllCompanies ? "Show Less" : "+ More"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 space-x-3">
                    <button
                      className="px-4 py-2 border border-[#E8E5F7] rounded-lg text-sm font-medium text-[#3C4973] bg-white hover:bg-[#F8F7FD] transition-colors"
                      onClick={clearFilters}
                    >
                      Clear All
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] hover:opacity-90 transition-opacity"
                      onClick={() => setShowFilters(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Questions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-md rounded-xl overflow-hidden mb-8"
        >
          <ul className="divide-y divide-[#E8E5F7]">
            {sortedQuestions.length > 0 ? (
              sortedQuestions.map((question, index) => (
                <motion.li
                  key={question._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="hover:bg-[#F8F7FD] cursor-pointer transition-colors"
                  onClick={() => navigateToQuestion(question._id)}
                >
                  <div className="px-6 py-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            className={`px-2.5 py-1 rounded-md text-xs font-medium ${getDifficultyColor(
                              question.difficultyLevel
                            )}`}
                          >
                            {question.difficultyLevel}
                          </span>
                          <h3 className="text-base font-semibold text-[#282C40] hover:text-[#4946A6] transition-colors">
                            {question.title}
                          </h3>
                        </div>
                        <p className="text-sm text-[#3C4973] line-clamp-1 mb-3">
                          {question.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          {question.tags &&
                            question.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded text-xs font-medium bg-[#F0EFFC] text-[#4946A6] uppercase"
                              >
                                {tag}
                              </span>
                            ))}
                          {question.tags && question.tags.length > 3 && (
                            <span className="text-xs text-[#6F92BF]">
                              +{question.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))
            ) : (
              <li className="px-6 py-10 text-center">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-[#F0EFFC] p-3 mb-3">
                    <Search className="h-6 w-6 text-[#4946A6]" />
                  </div>
                  <h3 className="text-lg font-medium text-[#282C40] mb-1">
                    No questions found
                  </h3>
                  <p className="text-[#3C4973] mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[#4946A6] border border-[#4946A6] hover:bg-[#F0EFFC] transition-colors"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              </li>
            )}
          </ul>
        </motion.div>

        {/* Pagination */}
        {/* {sortedQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-between"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-[#3C4973]">
                Showing <span className="font-medium text-[#282C40]">1</span> to{" "}
                <span className="font-medium text-[#282C40]">10</span> of{" "}
                <span className="font-medium text-[#282C40]">97</span> results
              </p>
            </div>
            <div className="flex-1 flex justify-center sm:justify-end">
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center px-2.5 py-2 rounded-l-lg border border-[#E8E5F7] bg-white text-sm font-medium text-[#3C4973] hover:bg-[#F8F7FD]">
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-[#E8E5F7] bg-white text-sm font-medium text-[#3C4973] hover:bg-[#F8F7FD]">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-[#E8E5F7] bg-[#F0EFFC] text-sm font-medium text-[#4946A6]">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-[#E8E5F7] bg-white text-sm font-medium text-[#3C4973] hover:bg-[#F8F7FD]">
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-[#E8E5F7] bg-white text-sm font-medium text-[#3C4973]">
                  ...
                </span>
                <button className="relative inline-flex items-center px-4 py-2 border border-[#E8E5F7] bg-white text-sm font-medium text-[#3C4973] hover:bg-[#F8F7FD]">
                  10
                </button>
                <button className="relative inline-flex items-center px-2.5 py-2 rounded-r-lg border border-[#E8E5F7] bg-white text-sm font-medium text-[#3C4973] hover:bg-[#F8F7FD]">
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </motion.div>
        )} */}
      </main>

      {/* Progress Stats Card */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="fixed bottom-6 right-6"
      >
        <div className="bg-white rounded-xl shadow-lg p-5 border border-[#E8E5F7] w-72">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#282C40] flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-[#4946A6]" />
              Your Progress
            </h3>
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#F0EFFC] text-[#4946A6] text-xs font-medium">
              3
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#3C4973]">Easy (2/321)</span>
                <span className="text-emerald-600 font-medium">0.6%</span>
              </div>
              <div className="w-full bg-[#F0EFFC] rounded-full h-2">
                <motion.div
                  className="bg-emerald-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "0.6%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#3C4973]">Medium (1/624)</span>
                <span className="text-amber-600 font-medium">0.2%</span>
              </div>
              <div className="w-full bg-[#F0EFFC] rounded-full h-2">
                <motion.div
                  className="bg-amber-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "0.2%" }}
                  transition={{ duration: 1, delay: 0.6 }}
                ></motion.div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#3C4973]">Hard (0/256)</span>
                <span className="text-rose-600 font-medium">0%</span>
              </div>
              <div className="w-full bg-[#F0EFFC] rounded-full h-2">
                <div className="bg-rose-500 h-2 rounded-full w-0"></div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E8E5F7]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#3C4973]">Total solved</span>
              <div>
                <span className="font-medium text-[#282C40]">3/1201</span>
                <span className="text-xs text-[#6F92BF] ml-1">(0.25%)</span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex">
            <button className="w-full py-2 text-center text-sm font-medium text-[#4946A6] hover:bg-[#F0EFFC] rounded-lg transition-colors flex items-center justify-center gap-1">
              <Zap className="h-4 w-4" />
              View All Progress
            </button>
          </div>
        </div>
      </motion.div> */}
    </div>
  );
}
