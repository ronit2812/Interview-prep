import { useState } from "react";

// Custom SVG icons since Lucide React import is failing
const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9l6 6 6-6"></path>
  </svg>
);

const ChevronUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 15l-6-6-6 6"></path>
  </svg>
);

export default function CppCoursePage() {
  // State for tracking module completion
  const [modules, setModules] = useState([
    {
      id: "01",
      title: "Overview of C++",
      expanded: true,
      lessons: [
        { id: 1, title: "Introduction to C++", completed: true },
        { id: 2, title: "Features of C++", completed: true },
        { id: 3, title: "History of C++", completed: true },
        { id: 4, title: "Setting up Environment of C++", completed: false },
        { id: 5, title: "Difference between C & C++", completed: false },
      ],
    },
    {
      id: "02",
      title: "C++ Basics",
      expanded: false,
      lessons: [],
    },
    {
      id: "03",
      title: "C++ Variables and Constant",
      expanded: false,
      lessons: [],
    },
    {
      id: "04",
      title: "C++ Data Types",
      expanded: false,
      lessons: [],
    },
    {
      id: "05",
      title: "C++ Operators",
      expanded: false,
      lessons: [],
    },
    {
      id: "06",
      title: "C++ Input/Output",
      expanded: false,
      lessons: [],
    },
    {
      id: "07",
      title: "C++ Control Statement",
      expanded: false,
      lessons: [],
    },
  ]);

  // Calculate total lessons and completed lessons
  const totalLessons = modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );
  const completedLessons = modules.reduce((acc, module) => {
    return acc + module.lessons.filter((lesson) => lesson.completed).length;
  }, 0);

  // Calculate progress percentage
  const progressPercentage =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Function to toggle module expansion
  const toggleModule = (moduleId) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return { ...module, expanded: !module.expanded };
        }
        return module;
      })
    );
  };

  // Function to toggle lesson completion
  const toggleLessonCompletion = (moduleId, lessonId) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map((lesson) => {
            if (lesson.id === lessonId) {
              return { ...lesson, completed: !lesson.completed };
            }
            return lesson;
          });
          return { ...module, lessons: updatedLessons };
        }
        return module;
      })
    );
  };

  // Function to mark all lessons as complete
  const markAllComplete = () => {
    setModules(
      modules.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) => ({
          ...lesson,
          completed: true,
        })),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-[#E8E5F7] font-sans bg-[#E8E5F7]">
      {/* Navigation Bar */}
      <nav className="bg-white p-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-blue-600 mr-2">
            <img
              src="/api/placeholder/20/20"
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">EasyHustler</h1>
        </div>

        <div className="flex items-center">
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              HOME
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              ABOUT
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              LEARN
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              PRACTICE
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              COMMUNITY
            </a>
          </div>
          <div className="ml-6">
            <img
              src="/api/placeholder/40/40"
              className="w-8 h-8 rounded-full"
              alt="Profile"
            />
          </div>
        </div>
      </nav>

      {/* Course Title */}
      <div className="px-4 py-3 bg-white">
        <h2 className="text-lg text-gray-700">
          <span className="text-blue-600">&gt;</span> Programming With C++
        </h2>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Left Sidebar - Course Contents */}
          <div className="w-full sm:w-1/4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-3">Course Content</h3>

              {/* Progress Bar */}
              <div className="mb-2 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-indigo-600 h-3 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                You've completed {completedLessons} / {totalLessons} lessons
              </p>

              <button
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                onClick={markAllComplete}
              >
                Mark as Complete
              </button>

              {/* Module List */}
              <div className="mt-6 space-y-2">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="border border-gray-200 rounded"
                  >
                    <div
                      className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleModule(module.id)}
                    >
                      <span
                        className={`font-medium ${
                          module.id === "01"
                            ? "text-indigo-700"
                            : "text-gray-700"
                        }`}
                      >
                        {module.id}: {module.title}
                      </span>
                      {module.expanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </div>

                    {module.expanded && module.lessons.length > 0 && (
                      <div className="p-3 pt-0">
                        <ul className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <li
                              key={lesson.id}
                              className="flex items-center pl-4 py-1 text-sm cursor-pointer hover:bg-gray-50"
                              onClick={() =>
                                toggleLessonCompletion(module.id, lesson.id)
                              }
                            >
                              <span className="text-blue-600 mr-2">&gt;</span>
                              <span
                                className={
                                  lesson.completed
                                    ? "text-gray-500"
                                    : "text-gray-700"
                                }
                              >
                                {lesson.title}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full sm:w-3/4">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Introduction to C++ Programming Language
              </h2>

              <p className="text-gray-700 mb-6">
                C++ is a general-purpose programming language that was developed
                as an enhancement of the C language to include object-oriented
                paradigm. It is an imperative and a compiled language.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Placeholder image */}
                <div className="bg-gray-200 w-full h-48 rounded"></div>

                <div>
                  <h3 className="font-semibold text-xl mb-3">Father of C++:</h3>
                  <div className="bg-indigo-100 p-3 rounded text-center">
                    <p className="text-lg font-medium">Bjarne Stroustrup</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Bjarne Stroustrup has created excellent work with C++. C could
                be a low-level programming language, and so, it does not have
                any classes. It does not contain several options which can
                create programming more well-off. However, is that the quickest
                language (assembly is more rapid; however, programming in
                construction isn't one thing you'd consider). What Bjarne
                Stroustrup did he additional the thing orientated half, by
                treating code like life objects. What makes C++ therefore lovely
                is that it's the speed of C and it's additionally a high-level
                and allow us to say the most
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
