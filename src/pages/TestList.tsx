import React, { useState } from "react";
import Nav from "../components/Navbar";

const mockTestsData = {
  "C++": [
    {
      title: "C++ Basics Test 1",
      questions: 10,
      time: "15 mins",
      level: "Beginner",
    },
    {
      title: "C++ OOP Concepts Test",
      questions: 15,
      time: "20 mins",
      level: "Intermediate",
    },
  ],
  JavaScript: [
    {
      title: "JavaScript Fundamentals",
      questions: 25,
      time: "30 mins",
      level: "Mixed",
    },
  ],
  General: [
    {
      title: "Final Mock Test",
      questions: 25,
      time: "30 mins",
      level: "Mixed",
    },
  ],
};

const allCourses = Object.keys(mockTestsData);

const MockTests = () => {
  const [selectedCourse, setSelectedCourse] = useState("");

  const getTests = () => {
    if (!selectedCourse) return Object.values(mockTestsData).flat();
    return mockTestsData[selectedCourse] || [];
  };

  return (
    <>
      <Nav />
      <div className="bg-[#E8E5F7] min-h-screen p-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Left: Mock Tests */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-1 flex items-center">
              📘 Mock Tests
            </h2>
            <p className="text-gray-600 mb-4">
              Prepare with practice tests aligned to your selected course.
            </p>

            {/* Dropdown */}
            <select
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full border px-4 py-2 rounded mb-6"
              defaultValue=""
            >
              <option value="" disabled>
                Select Course
              </option>
              {allCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            {/* Test List */}
            <div className="space-y-4">
              {getTests().map((test, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{test.title}</p>
                    <p className="text-gray-500 text-sm">
                      {test.questions} Questions | {test.time} | {test.level}
                    </p>
                  </div>
                  <button className="bg-[#4946A6] text-white px-4 py-2 rounded-md text-sm hover:opacity-90">
                    Start Test &gt;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sidebar Buttons */}
          <div className="space-y-4">
            <a
              href="#"
              className="block bg-white p-4 rounded-xl text-[#4946A6] font-semibold shadow hover:bg-[#f2f0ff]"
            >
              📊 Your Last Score
            </a>
            <a
              href="#"
              className="block bg-white p-4 rounded-xl text-[#4946A6] font-semibold shadow hover:bg-[#f2f0ff]"
            >
              🔁 Retake Last Test
            </a>
            <a
              href="#"
              className="block bg-white p-4 rounded-xl text-[#4946A6] font-semibold shadow hover:bg-[#f2f0ff]"
            >
              💡 Tips for Test Takers
            </a>
            <a
              href="#"
              className="block bg-white p-4 rounded-xl text-[#4946A6] font-semibold shadow hover:bg-[#f2f0ff]"
            >
              🔥 Streak: 3 days learning
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MockTests;
