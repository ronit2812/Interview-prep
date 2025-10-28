"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Circle,
  BookOpen,
  Award,
  Clock,
  ArrowLeft,
  User,
  Loader,
} from "lucide-react";
import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import {
  getAllLearningContents,
  getLearningContentById,
} from "../../services/LearningDependency";

export default function CourseContent() {
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubCategories, setExpandedSubCategories] = useState({});
  const [completedSections, setCompletedSections] = useState({});
  const [completedTopics, setCompletedTopics] = useState({});
  const [error, setError] = useState(null);

  // Group content by category and subcategory
  const [contentGroups, setContentGroups] = useState({
    categories: [],
    subCategories: {},
    sections: {},
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);

        // Get content ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const contentId = urlParams.get("id");

        if (!contentId) {
          setError("No content ID provided");
          setLoading(false);
          return;
        }

        // Fetch content for the specific ID provided in URL
        const contentData = await getLearningContentById(contentId);

        if (
          !contentData ||
          (Array.isArray(contentData) && contentData.length === 0)
        ) {
          setError("No content found for the provided ID");
          setLoading(false);
          return;
        }

        // Process the content data - contentData could be an object or array with content
        const processedData = Array.isArray(contentData.learningContent)
          ? contentData.learningContent
          : contentData.learningContent
          ? contentData.learningContent
          : [contentData.learningContent];

        if (processedData.length === 0) {
          setError("No content available");
          setLoading(false);
          return;
        }

        // Set the content array
        setContents(processedData);

        // Set the first content as selected by default
        setSelectedContent(processedData[0]);

        // Organize content by category > subcategory > section > subsection
        const groups = processContent(processedData);
        setContentGroups(groups);

        // Set first category and subcategory as expanded by default
        if (groups.categories.length > 0) {
          const firstCategory = groups.categories[0].id;
          setExpandedCategories({ [firstCategory]: true });

          if (groups.subCategories[firstCategory]?.length > 0) {
            const firstSubCategory = groups.subCategories[firstCategory][0].id;
            setExpandedSubCategories({ [firstSubCategory]: true });
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch content:", error);
        setError("Failed to load content");
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Process content into hierarchical structure
  const processContent = (contentData) => {
    const categories = [];
    const subCategories = {};
    const sections = {};
    const uniqueCategories = {};
    const uniqueSubCategories = {};

    contentData.forEach((item) => {
      // Process category
      if (
        item.categoryId &&
        item.categoryName &&
        !uniqueCategories[item.categoryId]
      ) {
        uniqueCategories[item.categoryId] = true;
        categories.push({
          id: item.categoryId,
          name: item.categoryName,
        });
      }

      // Process subcategory
      if (item.categoryId && item.subCategoryId && item.subCategoryName) {
        const key = `${item.categoryId}-${item.subCategoryId}`;
        if (!uniqueSubCategories[key]) {
          uniqueSubCategories[key] = true;
          if (!subCategories[item.categoryId]) {
            subCategories[item.categoryId] = [];
          }
          subCategories[item.categoryId].push({
            id: item.subCategoryId,
            name: item.subCategoryName,
          });
        }
      }

      // Process section
      if (item.subCategoryId && item.sectionId && item.sectionName) {
        const key = item.subCategoryId;
        if (!sections[key]) {
          sections[key] = [];
        }

        // Check if section already exists
        const sectionExists = sections[key].some(
          (section) => section.id === item.sectionId
        );

        if (!sectionExists) {
          sections[key].push({
            id: item.sectionId,
            name: item.sectionName,
            subSections: [
              {
                id: item.subSectionId,
                name: item.subSectionName,
                content: item.content,
                contentId: item._id,
              },
            ],
          });
        } else {
          // Add subsection to existing section
          const sectionIndex = sections[key].findIndex(
            (section) => section.id === item.sectionId
          );
          if (sectionIndex !== -1) {
            sections[key][sectionIndex].subSections.push({
              id: item.subSectionId,
              name: item.subSectionName,
              content: item.content,
              contentId: item._id,
            });
          }
        }
      }
    });

    return { categories, subCategories, sections };
  };

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Toggle subcategory expansion
  const toggleSubCategory = (subCategoryId) => {
    setExpandedSubCategories((prev) => ({
      ...prev,
      [subCategoryId]: !prev[subCategoryId],
    }));
  };

  // Select content to display
  const selectContent = (content) => {
    setSelectedContent(content);
    // Keep the existing ID parameter in URL since we're viewing the same subcategory
    // But we can update some state or UI to reflect the selected content
    const urlParams = new URLSearchParams(window.location.search);
    const subCategoryId = urlParams.get("id");

    if (content && content._id) {
      // We could add a "section" parameter to the URL for deeper linking
      // But we want to keep the main ID parameter as is
      window.history.pushState(
        {},
        "",
        `/course-detail?id=${subCategoryId}&section=${content.sectionId}&subsection=${content.subSectionId}`
      );
    }
  };

  // Toggle completion status for a section
  const toggleSectionCompletion = (sectionId) => {
    setCompletedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Mark a specific section as complete
  const markSectionComplete = (sectionId) => {
    setCompletedSections((prev) => ({
      ...prev,
      [sectionId]: true,
    }));
  };

  // Toggle completion status for a topic
  const toggleTopicCompletion = (topicId, event) => {
    event.stopPropagation(); // Prevent triggering parent click events
    setCompletedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  // Mark a specific topic as complete
  const markTopicComplete = (topicId) => {
    setCompletedTopics((prev) => ({
      ...prev,
      [topicId]: true,
    }));
  };

  // Calculate total sections and completed sections
  const totalSections = Object.values(contentGroups.sections).reduce(
    (total, sectionsList) => total + sectionsList.length,
    0
  );

  // Calculate total topics (subsections)
  const totalTopics = Object.values(contentGroups.sections).reduce(
    (total, sectionsList) => {
      return (
        total +
        sectionsList.reduce(
          (sectionTotal, section) => sectionTotal + section.subSections.length,
          0
        )
      );
    },
    0
  );

  const totalCompletedTopics = Object.keys(completedTopics).filter(
    (key) => completedTopics[key]
  ).length;

  const progressPercentage =
    totalTopics > 0
      ? Math.round((totalCompletedTopics / totalTopics) * 100)
      : 0;

  // Function to mark all sections and topics as complete
  const markAllComplete = () => {
    const allCompletedSections = {};
    const allCompletedTopics = {};

    Object.values(contentGroups.sections).forEach((sectionsList) => {
      sectionsList.forEach((section) => {
        allCompletedSections[section.id] = true;

        section.subSections.forEach((subSection) => {
          allCompletedTopics[subSection.id] = true;
        });
      });
    });

    setCompletedSections(allCompletedSections);
    setCompletedTopics(allCompletedTopics);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E8E5F7] to-white font-sans">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="flex flex-col items-center">
            <Loader size={40} className="text-[#4946A6] animate-spin mb-4" />
            <p className="text-[#3C4973] text-lg">Loading course content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E8E5F7] to-white font-sans">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-[#282C40] mb-4">
              Content Not Found
            </h2>
            <p className="text-[#3C4973] mb-6">
              {error}. Please try again or go back to the courses page.
            </p>
            <a
              href="/courses"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#4946A6] text-white font-medium hover:bg-[#3C4973] transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Courses
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8E5F7] to-white font-sans">
      <Navbar />

      {/* Course Header */}
      <div className="bg-[#4946A6] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <a
              href="/courses"
              className="flex items-center text-[#E8E5F7] hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Courses
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {selectedContent?.subCategoryName || "Course Content"}
              </h1>
              <div className="flex items-center text-[#E8E5F7]">
                <Clock size={16} className="mr-2" />
                <span className="mr-4">
                  Category: {selectedContent?.categoryName || "General"}
                </span>
                <Award size={16} className="mr-2" />
                <span>{totalSections} sections</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-white text-[#4946A6] px-6 py-2 rounded-full font-medium hover:bg-[#E8E5F7] transition-colors">
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Course Contents */}
          <div className="w-full lg:w-1/3 xl:w-1/4 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4">
              <div className="bg-[#3C4973] text-white p-4">
                <h3 className="text-xl font-bold mb-1">Course Content</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#E8E5F7]">
                    {totalCompletedTopics} of {totalTopics} sections completed
                  </p>
                  <button
                    className="bg-[#8A7ED9] hover:bg-[#6F92BF] text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
                    onClick={markAllComplete}
                  >
                    Mark All Complete
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-[#E8E5F7]">
                <div
                  className="h-2 bg-gradient-to-r from-[#8A7ED9] to-[#4946A6]"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Content List */}
              <div className="p-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                {contentGroups.categories.map((category) => (
                  <div key={category.id} className="mb-3">
                    {contentGroups.subCategories[category.id]?.map(
                      (subCategory) => (
                        <div key={subCategory.id} className="mb-2">
                          <div
                            className={`flex justify-between items-center p-2 cursor-pointer transition-colors ${
                              expandedSubCategories[subCategory.id]
                                ? "bg-[#E8E5F7]/50"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() => toggleSubCategory(subCategory.id)}
                          >
                            <span
                              className={`text-sm font-medium ${
                                expandedSubCategories[subCategory.id]
                                  ? "text-[#4946A6]"
                                  : "text-[#282C40]"
                              }`}
                            >
                              {subCategory.name}
                            </span>
                            {expandedSubCategories[subCategory.id] ? (
                              <ChevronUp size={16} className="text-[#4946A6]" />
                            ) : (
                              <ChevronDown
                                size={16}
                                className="text-[#3C4973]"
                              />
                            )}
                          </div>

                          {expandedSubCategories[subCategory.id] &&
                            contentGroups.sections[subCategory.id] && (
                              <ul className="divide-y divide-[#E8E5F7] ml-3">
                                {contentGroups.sections[subCategory.id].map(
                                  (section, sectionIdx) => (
                                    <li key={section.id}>
                                      <div
                                        className={`flex items-center p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                                          selectedContent &&
                                          selectedContent._id ===
                                            section.subSections[0]?.contentId
                                            ? "bg-[#E8E5F7]/30"
                                            : ""
                                        }`}
                                      >
                                        <div
                                          className="mr-3 flex-shrink-0"
                                          onClick={(e) =>
                                            toggleSectionCompletion(section.id)
                                          }
                                        >
                                          {completedSections[section.id] ? (
                                            <CheckCircle
                                              size={16}
                                              className="text-[#8A7ED9]"
                                            />
                                          ) : (
                                            <Circle
                                              size={16}
                                              className="text-gray-300"
                                            />
                                          )}
                                        </div>
                                        <span
                                          className={`text-xs ${
                                            completedSections[section.id]
                                              ? "text-gray-500"
                                              : "text-[#3C4973]"
                                          }`}
                                          onClick={() => {
                                            const content = contents.find(
                                              (c) =>
                                                c.sectionId === section.id &&
                                                c.subSectionId ===
                                                  section.subSections[0]?.id
                                            );
                                            if (content) {
                                              selectContent(content);
                                              markSectionComplete(section.id);
                                            }
                                          }}
                                        >
                                          {sectionIdx + 1}: {section.name}
                                        </span>
                                      </div>

                                      {/* Subsections */}
                                      <ul className="divide-y divide-[#E8E5F7] ml-6 border-l border-[#E8E5F7]">
                                        {section.subSections.map(
                                          (subSection, subSectionIdx) => (
                                            <li
                                              key={subSection.id}
                                              className={`flex items-center p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                                                selectedContent &&
                                                selectedContent._id ===
                                                  subSection.contentId
                                                  ? "bg-[#E8E5F7]/30"
                                                  : ""
                                              }`}
                                              onClick={(e) =>
                                                toggleTopicCompletion(
                                                  subSection.id,
                                                  e
                                                )
                                              }
                                            >
                                              <div
                                                className="mr-3 flex-shrink-0"
                                                onClick={(e) =>
                                                  toggleTopicCompletion(
                                                    subSection.id,
                                                    e
                                                  )
                                                }
                                              >
                                                {completedTopics[
                                                  subSection.id
                                                ] ? (
                                                  <CheckCircle
                                                    size={14}
                                                    className="text-[#8A7ED9]"
                                                  />
                                                ) : (
                                                  <Circle
                                                    size={14}
                                                    className="text-gray-300"
                                                  />
                                                )}
                                              </div>
                                              <span
                                                className={`text-xs ${
                                                  completedTopics[subSection.id]
                                                    ? "text-gray-500"
                                                    : "text-[#3C4973]"
                                                }`}
                                                onClick={() => {
                                                  const content = contents.find(
                                                    (c) =>
                                                      c._id ===
                                                      subSection.contentId
                                                  );
                                                  if (content) {
                                                    selectContent(content);
                                                    markSectionComplete(
                                                      section.id
                                                    );
                                                    markTopicComplete(
                                                      subSection.id
                                                    );
                                                  }
                                                }}
                                              >
                                                {sectionIdx + 1}.
                                                {subSectionIdx + 1}:{" "}
                                                {subSection.name}
                                              </span>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-2/3 xl:w-3/4 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-[#E8E5F7] flex items-center justify-center mr-4">
                  <BookOpen size={20} className="text-[#4946A6]" />
                </div>
                <h2 className="text-2xl font-bold text-[#282C40]">
                  {selectedContent?.sectionName || "Content"}
                  {selectedContent?.subSectionName
                    ? ` - ${selectedContent.subSectionName}`
                    : ""}
                </h2>
              </div>

              <div className="prose max-w-none">
                {selectedContent?.content ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedContent.content,
                    }}
                  />
                ) : (
                  <p className="text-[#3C4973] text-lg mb-8">
                    Select a section from the course menu to begin learning.
                  </p>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 rounded-lg border border-[#E8E5F7] text-[#3C4973] hover:bg-[#E8E5F7] transition-colors"
                onClick={() => {
                  if (!selectedContent) return;

                  // Find current subsection index
                  const currentSectionId = selectedContent.sectionId;
                  const currentSubSectionId = selectedContent.subSectionId;

                  // Find all subsections in the current section
                  const currentSection = Object.values(contentGroups.sections)
                    .flat()
                    .find((section) => section.id === currentSectionId);

                  if (!currentSection) return;

                  const currentSubSectionIndex =
                    currentSection.subSections.findIndex(
                      (sub) => sub.id === currentSubSectionId
                    );

                  if (currentSubSectionIndex > 0) {
                    // Previous subsection in same section
                    const prevSubSection =
                      currentSection.subSections[currentSubSectionIndex - 1];
                    const prevContent = contents.find(
                      (c) => c._id === prevSubSection.contentId
                    );
                    if (prevContent) {
                      selectContent(prevContent);
                      markSectionComplete(currentSectionId);
                      markTopicComplete(prevSubSection.id);
                    }
                  } else {
                    // Find previous section
                    const allSections = Object.values(
                      contentGroups.sections
                    ).flat();
                    const currentSectionIndex = allSections.findIndex(
                      (section) => section.id === currentSectionId
                    );

                    if (currentSectionIndex > 0) {
                      const prevSection = allSections[currentSectionIndex - 1];
                      if (prevSection.subSections.length > 0) {
                        const lastSubSection =
                          prevSection.subSections[
                            prevSection.subSections.length - 1
                          ];
                        const prevContent = contents.find(
                          (c) => c._id === lastSubSection.contentId
                        );
                        if (prevContent) {
                          selectContent(prevContent);
                          markSectionComplete(prevSection.id);
                          markTopicComplete(lastSubSection.id);
                        }
                      }
                    }
                  }
                }}
              >
                Previous Topic
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#4946A6] text-white hover:bg-[#3C4973] transition-colors"
                onClick={() => {
                  if (!selectedContent) return;

                  // Mark current topic as complete
                  markSectionComplete(selectedContent.sectionId);
                  markTopicComplete(selectedContent.subSectionId);

                  // Find current subsection index
                  const currentSectionId = selectedContent.sectionId;
                  const currentSubSectionId = selectedContent.subSectionId;

                  // Find all subsections in the current section
                  const currentSection = Object.values(contentGroups.sections)
                    .flat()
                    .find((section) => section.id === currentSectionId);

                  if (!currentSection) return;

                  const currentSubSectionIndex =
                    currentSection.subSections.findIndex(
                      (sub) => sub.id === currentSubSectionId
                    );

                  if (
                    currentSubSectionIndex <
                    currentSection.subSections.length - 1
                  ) {
                    // Next subsection in same section
                    const nextSubSection =
                      currentSection.subSections[currentSubSectionIndex + 1];
                    const nextContent = contents.find(
                      (c) => c._id === nextSubSection.contentId
                    );
                    if (nextContent) {
                      selectContent(nextContent);
                      markSectionComplete(currentSectionId);
                      markTopicComplete(nextSubSection.id);
                    }
                  } else {
                    // Find next section
                    const allSections = Object.values(
                      contentGroups.sections
                    ).flat();
                    const currentSectionIndex = allSections.findIndex(
                      (section) => section.id === currentSectionId
                    );

                    if (currentSectionIndex < allSections.length - 1) {
                      const nextSection = allSections[currentSectionIndex + 1];
                      if (nextSection.subSections.length > 0) {
                        const firstSubSection = nextSection.subSections[0];
                        const nextContent = contents.find(
                          (c) => c._id === firstSubSection.contentId
                        );
                        if (nextContent) {
                          selectContent(nextContent);
                          markSectionComplete(nextSection.id);
                          markTopicComplete(firstSubSection.id);
                        }
                      }
                    }
                  }
                }}
              >
                Next Topic
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
