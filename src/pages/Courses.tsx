import React from "react";
import Nav from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    title: "Web Design Fundamentals",
    duration: "4 Weeks",
    level: "Beginner",
    category: "Programming Languages",
    description:
      "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
  },
  {
    title: "Web Design Fundamentals",
    duration: "4 Weeks",
    level: "Beginner",
    category: "Programming Languages",
    description:
      "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
  },
  {
    title: "Web Design Fundamentals",
    duration: "4 Weeks",
    level: "Beginner",
    category: "Programming Languages",
    description:
      "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
  },
  {
    title: "Web Design Fundamentals",
    duration: "4 Weeks",
    level: "Beginner",
    category: "Programming Languages",
    description:
      "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
  },
  {
    title: "Aptitude Basics",
    duration: "3 Weeks",
    level: "Beginner",
    category: "Aptitude Courses",
    description:
      "Master aptitude fundamentals including logical reasoning, data interpretation, and quantitative techniques to enhance your problem-solving skills.",
  },
  {
    title: "Advanced Aptitude",
    duration: "4 Weeks",
    level: "Intermediate",
    category: "Aptitude Courses",
    description:
      "Sharpen your aptitude with advanced topics like puzzles, probability, and analytical thinking for competitive exams.",
  },
];

const LearningZone = () => {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <div className="bg-[#E8E5F7] min-h-screen p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Unlock Your Potential – Welcome to EasyHustler’s Learning Zone!
          </h1>
          <div className="flex items-center border px-4 py-2 rounded-full bg-white">
            <input
              type="text"
              placeholder="Search Courses"
              className="outline-none text-sm w-48"
            />
          </div>
        </div>

        {["Programming Languages", "Aptitude Courses"].map((category) => (
          <div key={category} className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{category}</h2>
              <a href="#" className="text-blue-600 text-sm">
                View All &gt;
              </a>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {courses
                .filter((course) => course.category === category)
                .map((course, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow p-4">
                    <div className="h-32 bg-gray-300 rounded mb-3" />
                    <div className="flex space-x-2 text-xs mb-2">
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {course.duration}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-700 mb-4">
                      {course.description}
                    </p>
                    <a
                      href="/course-detail"
                      className="block text-center py-2 rounded bg-[#4946A6] text-white text-sm font-medium"
                    >
                      Start
                    </a>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LearningZone;
