import { useState, useEffect } from "react";
import Select from "react-select";
import remove_logo from "../../assets/images/delete.svg";
import { useSearchParams, useNavigate } from "react-router";
import {
  getCategory,
  getSubCategories,
  getLearningSection,
} from "../../services/LearningDependency";
import {
  addAssignmentQuestions,
  getAssignmentQuestionById,
  updateAssignmentQuestionById,
} from "../../services/AssignmentDependency";
import { ToastContainer, toast } from "react-toastify";

export default function ModifyAssignment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get("id");
  const isEditMode = !!questionId;

  const [topic, setTopic] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [section, setSection] = useState(null);

  const [questionText, setQuestionText] = useState("");
  const [choiceType, setChoiceType] = useState("single");
  const [difficulty, setDifficulty] = useState("");
  const [options, setOptions] = useState([
    { id: 1, text: "", isCorrect: false },
  ]);
  const [isLoading, setIsLoading] = useState({
    category: false,
    subCategory: false,
    section: false,
    question: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample options for react-select
  const difficultyOptions = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  const choiceTypeOptions = [
    { value: "single", label: "Single Choice" },
    { value: "multiple", label: "Multiple Choice" },
  ];

  // Fetch question data if in edit mode
  useEffect(() => {
    async function fetchQuestionData() {
      if (!questionId) return;

      try {
        setIsLoading((prev) => ({ ...prev, question: true }));
        const response = await getAssignmentQuestionById(questionId);

        if (response.success && response.data) {
          const questionData = response.data;

          // Set question text
          setQuestionText(questionData.questionText);

          // Set choice type
          setChoiceType(questionData.choiceType);

          // Set difficulty
          const difficultyOption = difficultyOptions.find(
            (opt) => opt.value === questionData.difficulty
          );
          setDifficulty(difficultyOption);

          // Set options
          if (questionData.options && Array.isArray(questionData.options)) {
            const formattedOptions = questionData.options.map((opt, index) => ({
              id: index + 1,
              text: opt.text,
              isCorrect: opt.isCorrect,
            }));
            setOptions(formattedOptions);
          }

          // Category, subCategory, and section will be set after they're loaded
          // in their respective useEffects

          // Store the data to set category, subCategory and section after options are loaded
          window.questionData = {
            category: questionData.category,
            subCategory: questionData.subCategory,
            section: questionData.section,
          };
        } else {
          toast.error("Failed to load question data");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
        toast.error("Error loading question data");
      } finally {
        setIsLoading((prev) => ({ ...prev, question: false }));
      }
    }

    fetchQuestionData();
  }, [questionId]);

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading((prev) => ({ ...prev, category: true }));

        // Use the imported function instead of direct fetch
        const data = await getCategory();

        if (data && Array.isArray(data)) {
          // Handle case where response is an array directly
          const formattedOptions = data.map((cat) => ({
            value: cat._id,
            label: cat.categoryName,
          }));
          setCategoryOptions(formattedOptions);

          // Set category if in edit mode and categories are loaded
          if (isEditMode && window.questionData?.category) {
            const categoryOption = formattedOptions.find(
              (opt) => opt.value === window.questionData.category.id
            );
            if (categoryOption) {
              setCategory(categoryOption);
            }
          }
        } else if (data && data.categories && Array.isArray(data.categories)) {
          // Handle case where response has categories property
          const formattedOptions = data.categories.map((cat) => ({
            value: cat._id,
            label: cat.categoryName,
          }));
          setCategoryOptions(formattedOptions);

          // Set category if in edit mode and categories are loaded
          if (isEditMode && window.questionData?.category) {
            const categoryOption = formattedOptions.find(
              (opt) => opt.value === window.questionData.category.id
            );
            if (categoryOption) {
              setCategory(categoryOption);
            }
          }
        } else if (data && data.data && Array.isArray(data.data)) {
          // Handle case where response has data property
          const formattedOptions = data.data.map((cat) => ({
            value: cat._id,
            label: cat.categoryName,
          }));
          setCategoryOptions(formattedOptions);

          // Set category if in edit mode and categories are loaded
          if (isEditMode && window.questionData?.category) {
            const categoryOption = formattedOptions.find(
              (opt) => opt.value === window.questionData.category.id
            );
            if (categoryOption) {
              setCategory(categoryOption);
            }
          }
        } else {
          // Fallback to some static data for testing
          console.error(
            "Unexpected response format, using fallback data:",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading((prev) => ({ ...prev, category: false }));
      }
    }

    fetchCategories();
  }, [isEditMode]);

  // Fetch subcategories when category changes
  useEffect(() => {
    async function fetchSubCategories() {
      if (!category) {
        setSubCategoryOptions([]);
        setSubCategory(null);
        return;
      }

      try {
        setIsLoading((prev) => ({ ...prev, subCategory: true }));

        const response = await getSubCategories();

        if (response.success && response.data) {
          // Check if the selected category name exists in the response data
          if (
            response.data[category.label] &&
            response.data[category.label].length > 0
          ) {
            // Get the subcategories array for the selected category
            const categorySubcategories = response.data[category.label];

            // Format the subcategories for react-select
            const formattedOptions = categorySubcategories.map((sub) => ({
              value: sub._id,
              label: sub.SubCategoryName,
            }));

            setSubCategoryOptions(formattedOptions);

            // Set subcategory if in edit mode and subcategories are loaded
            if (isEditMode && window.questionData?.subCategory) {
              const subCategoryOption = formattedOptions.find(
                (opt) => opt.value === window.questionData.subCategory.id
              );
              if (subCategoryOption) {
                setSubCategory(subCategoryOption);
              }
            }
          } else {
            // No subcategories found for this category
            setSubCategoryOptions([
              {
                value: "",
                label: "No subcategories available for this category",
                isDisabled: true,
              },
            ]);
            setSubCategory(null);
          }
        } else {
          // No valid response
          setSubCategoryOptions([
            {
              value: "",
              label: "No subcategories available",
              isDisabled: true,
            },
          ]);
          setSubCategory(null);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setSubCategoryOptions([
          { value: "", label: "Error loading subcategories", isDisabled: true },
        ]);
        setSubCategory(null);
      } finally {
        setIsLoading((prev) => ({ ...prev, subCategory: false }));
      }
    }

    fetchSubCategories();
  }, [category, isEditMode]);

  // Fetch sections when subcategory changes
  useEffect(() => {
    async function fetchSections() {
      if (!subCategory) {
        setSectionOptions([]);
        setSection(null);
        return;
      }

      try {
        setIsLoading((prev) => ({ ...prev, section: true }));

        const response = await getLearningSection(subCategory.value);
        let foundSections = false;
        let formattedOptions = [];

        // Process response data if valid
        if (response && response.success === true && response.data) {
          if (Array.isArray(response.data)) {
            // Filter by name first
            const filteredSections = response.data.filter((section) => {
              const sectionSubcategoryName =
                section.subcategoryName ||
                section.SubCategoryName ||
                section.subcategory_name ||
                section.subCategoryName;
              return sectionSubcategoryName === subCategory.label;
            });

            if (filteredSections.length > 0) {
              // Found sections by name match
              formattedOptions = filteredSections.map((section) => ({
                value: section._id || section.id,
                label:
                  section.SectionName ||
                  section.sectionName ||
                  section.name ||
                  "Unknown",
              }));
              foundSections = true;
            } else {
              // Try filtering by ID match
              const idFilteredSections = response.data.filter(
                (section) =>
                  section.subcategoryId === subCategory.value ||
                  section.SubCategoryId === subCategory.value ||
                  section.sub_category_id === subCategory.value
              );

              if (idFilteredSections.length > 0) {
                formattedOptions = idFilteredSections.map((section) => ({
                  value: section._id || section.id,
                  label:
                    section.SectionName ||
                    section.sectionName ||
                    section.name ||
                    "Unknown",
                }));
                foundSections = true;
              } else {
                // Fall back to all sections as last resort
                formattedOptions = response.data.map((section) => ({
                  value: section._id || section.id,
                  label:
                    section.SectionName ||
                    section.sectionName ||
                    section.name ||
                    "Unknown",
                }));
                foundSections = response.data.length > 0;
              }
            }
          } else if (
            response.data.sections &&
            Array.isArray(response.data.sections)
          ) {
            // Handle nested sections format
            const sections = response.data.sections;
            if (sections.length > 0) {
              formattedOptions = sections.map((section) => ({
                value: section._id || section.id,
                label:
                  section.SectionName ||
                  section.sectionName ||
                  section.name ||
                  "Unknown",
              }));
              foundSections = true;
            }
          }
        }

        // Set the section options based on whether we found any sections
        if (formattedOptions.length > 0 && foundSections) {
          setSectionOptions(formattedOptions);

          // Set section if in edit mode and sections are loaded
          if (isEditMode && window.questionData?.section) {
            const sectionOption = formattedOptions.find(
              (opt) => opt.value === window.questionData.section.id
            );
            if (sectionOption) {
              setSection(sectionOption);
            }
          }
        } else {
          // No sections available - set a disabled placeholder option
          setSectionOptions([
            {
              value: "",
              label: "No sections available for this subcategory",
              isDisabled: true,
            },
          ]);
          setSection(null);
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
        setSectionOptions([
          { value: "", label: "Error loading sections", isDisabled: true },
        ]);
        setSection(null);
      } finally {
        setIsLoading((prev) => ({ ...prev, section: false }));
      }
    }

    fetchSections();
  }, [subCategory, isEditMode]);

  // Reset dependent dropdowns when parent changes
  useEffect(() => {
    if (!category) {
      setSubCategory(null);
      setSection(null);
    }
  }, [category]);

  useEffect(() => {
    if (!subCategory) {
      setSection(null);
    }
  }, [subCategory]);

  const handleOptionChange = (id, field, value) => {
    setOptions((prevOptions) =>
      prevOptions.map((opt) =>
        opt.id === id ? { ...opt, [field]: value } : opt
      )
    );
  };

  const addOption = () => {
    setOptions([
      ...options,
      { id: options.length + 1, text: "", isCorrect: false },
    ]);
  };

  // We need to modify the Select components to ensure they're visible
  const selectStyles = {
    control: (base) => ({
      ...base,
      minWidth: "240px",
      minHeight: "40px",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
    option: (base, state) => ({
      ...base,
      color: state.isDisabled ? "#999" : base.color,
      backgroundColor: state.isDisabled ? "#f3f4f6" : base.backgroundColor,
      cursor: state.isDisabled ? "not-allowed" : "default",
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!questionText || !difficulty || !category || !subCategory || !section) {
      toast.error("Please fill all required fields");
      return;
    }

    // Validate options
    if (options.length === 0 || !options.some((opt) => opt.isCorrect)) {
      toast.error(
        "Please add at least one option and mark at least one as correct"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      let response;

      if (isEditMode) {
        // Update existing question
        response = await updateAssignmentQuestionById(
          questionId,
          questionText,
          choiceType,
          difficulty.value,
          options.map((opt) => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
          })),
          { id: category.value, name: category.label },
          { id: subCategory.value, name: subCategory.label },
          { id: section.value, name: section.label }
        );

        if (response.success) {
          toast.success("Question updated successfully!");
        } else {
          toast.error(response.message || "Failed to update question");
        }
      } else {
        // Add new question
        response = await addAssignmentQuestions(
          questionText,
          choiceType,
          difficulty.value,
          options.map((opt) => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
          })),
          { id: category.value, name: category.label },
          { id: subCategory.value, name: subCategory.label },
          { id: section.value, name: section.label }
        );

        if (response.success) {
          toast.success("Question added successfully!");
        } else {
          toast.error(response.message || "Failed to add question");
        }
      }

      if (response.success) {
        setTimeout(() => {
          navigate("/assignments");
        }, 3000);
        // Reset form
        setQuestionText("");
        setChoiceType("single");
        setDifficulty("");
        setOptions([{ id: 1, text: "", isCorrect: false }]);
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom components for Select dropdowns
  const NoOptionsMessage = (props) => {
    return (
      <div {...props.innerProps} style={{ padding: "8px 12px", color: "#999" }}>
        {props.selectProps.noOptionsMessage()}
      </div>
    );
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h2 className="text-lg font-medium mt-4 pl-2">
        {isEditMode ? "Edit Question" : "Add Question"}
      </h2>

      <div className="flex flex-row items-center gap-x-8">
        {/* category selection */}
        <div className="mt-4 flex flex-col justify-start items-start gap-y-1">
          <label className="pl-1 text-base">Category:</label>
          <Select
            value={category}
            onChange={(selected) => {
              setCategory(selected);
              // Clear dependent fields
              setSubCategory(null);
              setSection(null);
            }}
            options={categoryOptions}
            className="w-60"
            styles={selectStyles}
            placeholder="Select Category"
            classNamePrefix="react-select"
            isLoading={isLoading.category}
            isDisabled={isLoading.category}
          />
        </div>

        {/* sub category selection */}
        <div className="mt-4 flex flex-col justify-start items-start gap-y-1">
          <label className="pl-1 text-base">Sub-Category:</label>
          <Select
            value={subCategory}
            onChange={(selected) => {
              setSubCategory(selected);
              setSection(null);
            }}
            options={subCategoryOptions}
            className="w-60"
            styles={selectStyles}
            placeholder="Select Sub-Category"
            classNamePrefix="react-select"
            isDisabled={!category || isLoading.subCategory}
            isLoading={isLoading.subCategory}
            components={{ NoOptionsMessage }}
            noOptionsMessage={() =>
              "No subcategories available for this category"
            }
          />
        </div>

        {/* Section selection */}
        <div className="mt-4 flex flex-col justify-start items-start gap-y-1">
          <label className="pl-1 text-base">Section:</label>
          <Select
            value={section}
            onChange={(selected) => {
              setSection(selected);
            }}
            options={sectionOptions}
            className="w-60"
            styles={selectStyles}
            placeholder="Select Section"
            classNamePrefix="react-select"
            isDisabled={!subCategory || isLoading.section}
            isLoading={isLoading.section}
            components={{ NoOptionsMessage }}
            noOptionsMessage={() =>
              "No sections available for this subcategory"
            }
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex flex-col items-start justify-start gap-y-1 mt-4">
        <label className="pl-1 text-base">Question Text:</label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter the question text"
          className="w-[66%] p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
          rows="3"
        />
      </div>

      <div className="flex flex-row items-center gap-x-8">
        {/* Difficulty */}
        <div className="flex flex-col items-start justify-start gap-y-1 mt-4">
          <label className="pl-1 text-base">Difficulty:</label>
          <Select
            value={difficulty}
            onChange={setDifficulty}
            options={difficultyOptions}
            className="w-80"
            styles={selectStyles}
            placeholder="Select Difficulty"
            classNamePrefix="react-select"
          />
        </div>

        {/* Choice  */}
        <div className="flex flex-col items-start justify-start gap-y-1 mt-4">
          <label className="pl-1 text-base">Choice Type:</label>
          <Select
            value={choiceTypeOptions.find((opt) => opt.value === choiceType)}
            onChange={(option) => setChoiceType(option.value)}
            options={choiceTypeOptions}
            className="w-80"
            styles={selectStyles}
            placeholder="Select Choice"
            classNamePrefix="react-select"
          />
        </div>
      </div>

      {/* Multiple Options */}
      <div className="flex flex-col items-start justify-start gap-y-1 mt-4">
        <label className="pl-1 text-base">Options:</label>
        {options.map((opt, index) => (
          <div key={opt.id} className="flex items-center gap-3">
            <input
              type="text"
              value={opt.text}
              onChange={(e) =>
                handleOptionChange(opt.id, "text", e.target.value)
              }
              placeholder={`Option ${index + 1}`}
              className="w-80 p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
            />
            <input
              type="checkbox"
              checked={opt.isCorrect}
              onChange={(e) =>
                handleOptionChange(opt.id, "isCorrect", e.target.checked)
              }
              className="h-4 w-4"
            />
            {options.length > 1 && (
              <img
                src={remove_logo}
                alt="remove"
                className="w-6 h-6 cursor-pointer"
                onClick={() =>
                  setOptions(options.filter((o) => o.id !== opt.id))
                }
              />
            )}
          </div>
        ))}
        <button type="button" onClick={addOption} className="text-blue-600">
          + Add Option
        </button>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-4 py-2 bg-[#5652B7] text-white rounded-md ${
            isSubmitting
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-[#6461BD]"
          } shadow-md`}
        >
          {isSubmitting
            ? "Saving..."
            : isEditMode
            ? "Update Question"
            : "Save Question"}
        </button>
      </div>
    </>
  );
}
