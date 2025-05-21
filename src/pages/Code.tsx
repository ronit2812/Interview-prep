import { useState } from "react";

export default function CodingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState("# Write your solution here\n\n");
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("problem");
  const [timeRemaining, setTimeRemaining] = useState("29:45");
  const [difficulty, setDifficulty] = useState("Medium");
  const [testCases, setTestCases] = useState([
    { id: 1, status: "passed" },
    { id: 2, status: "passed" },
    { id: 3, status: "failed" },
    { id: 4, status: "pending" },
  ]);

  const languages = [
    { id: "python", name: "Python" },
    { id: "java", name: "Java" },
    { id: "cpp", name: "C++" },
    { id: "javascript", name: "JavaScript" },
  ];

  const handleRun = () => {
    // Simulate running code
    setIsConsoleOpen(true);
    setActiveTab("testcases");
  };

  const handleSubmit = () => {
    // Simulate submitting solution
    alert("Solution submitted successfully!");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 flex items-center text-sm font-medium">
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Problems
            </button>
            <h1 className="text-xl font-bold text-gray-800">Two Sum</h1>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                difficulty === "Easy"
                  ? "bg-green-100 text-green-800"
                  : difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {difficulty}
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-gray-600">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">{timeRemaining}</span>
            </div>
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Hints (3)
            </button>
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Solution
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-2/5 bg-white border-r border-gray-200 flex flex-col">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "problem"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("problem")}
              >
                Problem
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "testcases"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("testcases")}
              >
                Test Cases
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "submissions"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("submissions")}
              >
                Submissions
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "discussions"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("discussions")}
              >
                Discussions
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "problem" && (
              <div className="prose max-w-none">
                <p className="font-medium text-lg">Two Sum</p>
                <p>
                  Given an array of integers <code>nums</code> and an integer{" "}
                  <code>target</code>, return indices of the two numbers such
                  that they add up to <code>target</code>.
                </p>
                <p>
                  You may assume that each input would have exactly one
                  solution, and you may not use the same element twice.
                </p>
                <p>You can return the answer in any order.</p>

                <p className="font-medium mt-4">Example 1:</p>
                <pre className="bg-gray-100 p-3 rounded-md">
                  <p className="mb-1">
                    <strong>Input:</strong> nums = [2,7,11,15], target = 9
                  </p>
                  <p className="mb-1">
                    <strong>Output:</strong> [0,1]
                  </p>
                  <p>
                    <strong>Explanation:</strong> Because nums[0] + nums[1] = 2
                    + 7 = 9, we return [0, 1].
                  </p>
                </pre>

                <p className="font-medium mt-4">Example 2:</p>
                <pre className="bg-gray-100 p-3 rounded-md">
                  <p className="mb-1">
                    <strong>Input:</strong> nums = [3,2,4], target = 6
                  </p>
                  <p>
                    <strong>Output:</strong> [1,2]
                  </p>
                </pre>

                <p className="font-medium mt-4">Constraints:</p>
                <ul className="list-disc list-inside">
                  <li>2 ≤ nums.length ≤ 10^4</li>
                  <li>-10^9 ≤ nums[i] ≤ 10^9</li>
                  <li>-10^9 ≤ target ≤ 10^9</li>
                  <li>Only one valid answer exists.</li>
                </ul>

                <p className="font-medium mt-4">Follow-up:</p>
                <p>
                  Can you come up with an algorithm that is less than O(n²) time
                  complexity?
                </p>
              </div>
            )}

            {activeTab === "testcases" && (
              <div>
                <div className="mb-4">
                  <p className="font-medium mb-2">Test Cases</p>
                  <div className="space-y-2">
                    {testCases.map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center p-2 rounded-md bg-gray-100"
                      >
                        <div className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-500"
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
                          {test.status === "failed" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-red-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                          )}
                          {test.status === "pending" && (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Test Case {test.id}
                          </p>
                          {test.status === "failed" && (
                            <p className="text-xs text-red-600">
                              Expected [1,2], got [1,3]
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Console Output</p>
                  <div className="bg-gray-900 text-white rounded-md p-3 font-mono text-sm">
                    <p>Running with input: nums = [2,7,11,15], target = 9</p>
                    <p>Your output: [0, 1]</p>
                    <p className="text-green-400">✓ Test case 1 passed</p>
                    <p>Running with input: nums = [3,2,4], target = 6</p>
                    <p>Your output: [1, 2]</p>
                    <p className="text-green-400">✓ Test case 2 passed</p>
                    <p>Running with input: nums = [3,3], target = 6</p>
                    <p>Your output: [0, 3]</p>
                    <p className="text-red-400">
                      ✗ Test case 3 failed. Expected [0,1], got [0,3]
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "submissions" && (
              <div>
                <p className="font-medium mb-2">Your Submissions</p>
                <div className="space-y-3">
                  <div className="rounded-md border border-gray-200 p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-500 mr-2"
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
                        <span className="font-medium">Accepted</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        15 minutes ago
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <div>Runtime: 56 ms</div>
                      <div>Memory: 15.2 MB</div>
                      <div>Language: Python</div>
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-200 p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        <span className="font-medium">Wrong Answer</span>
                      </div>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <div>Failed on test case 3</div>
                      <div>Language: Python</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "discussions" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-medium">Discussion (24)</p>
                  <button className="text-sm text-blue-600 font-medium">
                    Start New Discussion
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium mr-2">
                          JD
                        </div>
                        <span className="font-medium">John Doe</span>
                      </div>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Has anyone tried the hash map approach? I'm getting TLE on
                      large inputs.
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>4 replies</span>
                    </div>
                  </div>

                  <div className="p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium mr-2">
                          AS
                        </div>
                        <span className="font-medium">Alice Smith</span>
                      </div>
                      <span className="text-xs text-gray-500">3 days ago</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Here's an O(n) solution using a hash table to store values
                      we've seen so far.
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span>12 replies</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
            <div className="flex">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="block w-36 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>

              <button className="ml-3 text-gray-700 hover:text-gray-900 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            <div>
              <button
                onClick={handleRun}
                className="px-4 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md text-sm font-medium flex items-center mr-2"
              >
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{" "}
                Run
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-sm font-medium flex items-center"
              >
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{" "}
                Submit
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="bg-gray-900 text-white h-full p-4 font-mono text-sm overflow-y-auto">
              {selectedLanguage === "python" && (
                <pre className="whitespace-pre-wrap">
                  {`class Solution:
    def twoSum(self, nums, target):
        # Write your solution here
        
        # Example implementation:
        # seen = {}
        # for i, num in enumerate(nums):
        #     complement = target - num
        #     if complement in seen:
        #         return [seen[complement], i]
        #     seen[num] = i
        # return []
`}
                </pre>
              )}

              {selectedLanguage === "java" && (
                <pre className="whitespace-pre-wrap">
                  {`class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        // Example implementation:
        // Map<Integer, Integer> map = new HashMap<>();
        // for (int i = 0; i < nums.length; i++) {
        //     int complement = target - nums[i];
        //     if (map.containsKey(complement)) {
        //         return new int[] { map.get(complement), i };
        //     }
        //     map.put(nums[i], i);
        // }
        // return new int[0];
    }
}`}
                </pre>
              )}

              {selectedLanguage === "cpp" && (
                <pre className="whitespace-pre-wrap">
                  {`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
        // Example implementation:
        // unordered_map<int, int> map;
        // for (int i = 0; i < nums.size(); i++) {
        //     int complement = target - nums[i];
        //     if (map.find(complement) != map.end()) {
        //         return {map[complement], i};
        //     }
        //     map[nums[i]] = i;
        // }
        // return {};
    }
};`}
                </pre>
              )}

              {selectedLanguage === "javascript" && (
                <pre className="whitespace-pre-wrap">
                  {`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
    
    // Example implementation:
    // const map = new Map();
    // for (let i = 0; i < nums.length; i++) {
    //     const complement = target - nums[i];
    //     if (map.has(complement)) {
    //         return [map.get(complement), i];
    //     }
    //     map.set(nums[i], i);
    // }
    // return [];
};`}
                </pre>
              )}
            </div>
          </div>

          {/* Console output area (toggle with isConsoleOpen) */}
          {isConsoleOpen && (
            <div className="bg-gray-100 border-t border-gray-200 h-1/4">
              <div className="flex items-center justify-between p-2 bg-gray-200 border-b border-gray-300">
                <span className="text-sm font-medium">Console</span>
                <button
                  onClick={() => setIsConsoleOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
              </div>
              <div className="p-3 font-mono text-sm overflow-auto h-full">
                <p>Running test cases...</p>
                <p className="text-green-600">✓ Test case 1 passed</p>
                <p className="text-green-600">✓ Test case 2 passed</p>
                <p className="text-red-600">✗ Test case 3 failed</p>
                <p>Expected: [0, 1]</p>
                <p>Output: [0, 3]</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
