"use client";

import { useState, useEffect } from "react";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import {
  getAllLearningCategories,
  getAllLearningSubCategories,
} from "../../services/LearningDependency";

export default function LearningZone() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState(["all"]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await getAllLearningCategories();

        // Extract categoryName from each category object
        if (Array.isArray(categoriesData)) {
          const categoryNames = categoriesData
            .map((cat) =>
              typeof cat === "object" && cat !== null ? cat.categoryName : cat
            )
            .filter(Boolean); // Remove any null/undefined values

          if (categoryNames.length === 0) {
            setCategories(["all", "Programming Languages", "Aptitude Courses"]);
          } else {
            setCategories(["all", ...categoryNames]);
          }
        } else if (categoriesData && typeof categoriesData === "object") {
          const categoryArray =
            categoriesData.categories ||
            categoriesData.data ||
            (categoriesData.length ? categoriesData : []);

          const categoryNames = Array.isArray(categoryArray)
            ? categoryArray
                .map((cat) =>
                  typeof cat === "object" && cat !== null
                    ? cat.categoryName
                    : cat
                )
                .filter(Boolean)
            : [];

          if (categoryNames.length === 0) {
            setCategories(["all", "Programming Languages", "Aptitude Courses"]);
          } else {
            setCategories(["all", ...categoryNames]);
          }
        } else {
          setApiError(true);
          setCategories(["all", "Programming Languages", "Aptitude Courses"]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setApiError(true);
        setLoading(false);
        // Fallback to default categories
        setCategories(["all", "Programming Languages", "Aptitude Courses"]);
      }
    };

    const fetchSubCategories = async () => {
      try {
        setContentLoading(true);
        console.log("Fetching subcategories...");
        const subCategoriesData = await getAllLearningSubCategories();
        console.log("Subcategories data:", subCategoriesData);

        // Add sample fallback data if no content is returned
        const fallbackSubCategories = [
          {
            _id: "fallback1",
            categoryName: "Programming Languages",
            subCategoryName: "JavaScript Fundamentals",
            createdAt: new Date().toISOString(),
            createdByAdminName: "Admin",
          },
          {
            _id: "fallback2",
            categoryName: "Programming Languages",
            subCategoryName: "React Development",
            createdAt: new Date().toISOString(),
            createdByAdminName: "Admin",
          },
          {
            _id: "fallback3",
            categoryName: "Aptitude Courses",
            subCategoryName: "Numerical Aptitude",
            createdAt: new Date().toISOString(),
            createdByAdminName: "Admin",
          },
        ];

        // Process the response based on its structure
        if (
          !subCategoriesData ||
          (Array.isArray(subCategoriesData) && subCategoriesData.length === 0)
        ) {
          console.log("No subcategories data returned, using fallback content");
          setSubCategoryData(fallbackSubCategories);
        } else if (Array.isArray(subCategoriesData)) {
          console.log(
            "Subcategories data is an array with length:",
            subCategoriesData.length
          );
          if (subCategoriesData.length > 0) {
            console.log(
              "First subcategory item structure:",
              Object.keys(subCategoriesData[0])
            );
          }
          setSubCategoryData(subCategoriesData);
        } else if (subCategoriesData && typeof subCategoriesData === "object") {
          console.log(
            "Subcategories data is an object with keys:",
            Object.keys(subCategoriesData)
          );
          const processedData =
            subCategoriesData.data || subCategoriesData.subCategories || [];
          console.log(
            "Processed subcategories data length:",
            processedData.length
          );

          if (processedData.length === 0) {
            console.log(
              "No subcategories after processing, using fallback content"
            );
            setSubCategoryData(fallbackSubCategories);
          } else {
            setSubCategoryData(processedData);
          }
        } else {
          console.error("Unexpected subcategories data format");
          setSubCategoryData(fallbackSubCategories);
        }

        setContentLoading(false);
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
        setContentLoading(false);

        // Use fallback data on error
        setSubCategoryData([
          {
            _id: "fallback1",
            categoryName: "Programming Languages",
            subCategoryName: "JavaScript Fundamentals",
            createdAt: new Date().toISOString(),
            createdByAdminName: "Admin",
          },
          {
            _id: "fallback2",
            categoryName: "Programming Languages",
            subCategoryName: "React Development",
            createdAt: new Date().toISOString(),
            createdByAdminName: "Admin",
          },
          {
            _id: "fallback3",
            categoryName: "Aptitude Courses",
            subCategoryName: "Numerical Aptitude",
            createdAt: new Date().toISOString(),
            createdByAdminName: "Admin",
          },
        ]);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  // Add debugging for filtering
  console.log("Subcategory data before filtering:", subCategoryData.length);

  const filteredContent = subCategoryData.filter((subcategory) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const matchSubCategory =
      subcategory.SubCategoryName &&
      subcategory.SubCategoryName.toLowerCase().includes(query);
    const matchCategory =
      subcategory.CategoryName &&
      subcategory.CategoryName.toLowerCase().includes(query);
    const matchCreator =
      subcategory.createdByAdminName &&
      subcategory.createdByAdminName.toLowerCase().includes(query);

    return matchSubCategory || matchCategory || matchCreator;
  });

  console.log("Content after search filtering:", filteredContent.length);

  const displayContent =
    activeCategory === "all"
      ? filteredContent
      : filteredContent.filter((subcategory) => {
          return subcategory.CategoryName === activeCategory;
        });

  console.log(
    "Content after category filtering:",
    displayContent.length,
    "Active category:",
    activeCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8E5F7] to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-[#4946A6] py-12 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#8A7ED9]"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#6F92BF]"></div>
          <div className="absolute top-40 right-40 w-20 h-20 rounded-full bg-[#3C4973]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ace Your Interviews with EasyHustler
          </h1>
          <p className="text-[#E8E5F7] text-lg md:text-xl max-w-2xl mb-8">
            Comprehensive courses designed to prepare you for technical and
            aptitude interviews at top companies.
          </p>

          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search for courses, topics, or skills..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 backdrop-blur-sm text-[#282C40] placeholder-[#3C4973]/60 focus:outline-none focus:ring-2 focus:ring-[#8A7ED9] shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4946A6]"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-6 md:px-12 pt-8 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-[#282C40] mb-4">
          Course Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-6">
          {loading ? (
            <div className="px-4 py-2 rounded-full bg-white text-[#3C4973]">
              Loading categories...
            </div>
          ) : apiError ? (
            // Show fallback categories if there was an API error
            ["all", "Programming Languages", "Aptitude Courses"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-[#4946A6] text-white shadow-md"
                      : "bg-white text-[#3C4973] hover:bg-[#E8E5F7]"
                  }`}
                >
                  {category === "all" ? "All Courses" : category}
                </button>
              )
            )
          ) : categories && categories.length > 0 ? (
            // Show fetched categories if available
            categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all text-center ${
                  activeCategory === category
                    ? "bg-[#4946A6] text-white shadow-md"
                    : "bg-white text-[#3C4973] hover:bg-[#E8E5F7]"
                }`}
              >
                {category === "all" ? "All Courses" : category}
              </button>
            ))
          ) : (
            // Fallback if categories is empty
            <div className="px-4 py-2 rounded-full bg-white text-[#3C4973]">
              No categories available
            </div>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="px-6 md:px-12 py-8 max-w-7xl mx-auto">
        {contentLoading ? (
          <div className="text-center py-10">Loading content...</div>
        ) : displayContent.length === 0 ? (
          <div className="text-center py-10">
            No courses available for the selected category
          </div>
        ) : (
          <>
            <p className="mb-6">Showing {displayContent.length} courses</p>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayContent.map((subcategory, idx) => {
                const id = subcategory._id || `subcategory-${idx}`;
                const categoryName = subcategory.CategoryName || "General";
                const subCategoryName =
                  subcategory.SubCategoryName || "Course Title";

                return (
                  <div
                    key={id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#E8E5F7] flex flex-col h-full"
                  >
                    <div className="h-48 bg-gradient-to-br from-[#8A7ED9] to-[#4946A6] relative">
                      <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                        <BookOpen size={80} className="text-white" />
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#4946A6]">
                        {categoryName}
                      </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="font-bold text-lg text-[#282C40] mb-4">
                        {subCategoryName}
                      </h3>

                      <div className="flex-grow"></div>

                      <a
                        href={`/course-detail?id=${id}`}
                        className="block w-full text-center py-3 px-4 rounded-lg bg-gradient-to-r from-[#4946A6] to-[#6F92BF] text-white font-medium transition-transform hover:translate-y-[-2px] active:translate-y-[0px]"
                      >
                        Start Learning
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Featured Section */}
      {/* <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#282C40] to-[#3C4973] rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold mb-3">
                Ready for your next interview?
              </h2>
              <p className="text-[#E8E5F7]/90 max-w-xl">
                Join our premium mock interview sessions with industry experts
                from top companies. Get real-time feedback and improve your
                chances of landing your dream job.
              </p>
            </div>
            <a
              href="/mock-interviews"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-[#282C40] font-medium hover:bg-[#E8E5F7] transition-colors whitespace-nowrap"
            >
              Book a Session
              <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}
