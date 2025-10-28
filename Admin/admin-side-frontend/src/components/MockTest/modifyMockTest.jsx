import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getCategory,
  getSubCategories,
  getLearningSection,
} from "../../services/LearningDependency";
import { addMockTestQuestion } from "../../services/MockTestDependency";
import Select from "react-select";

const AddMockTestQuestion = () => {
  const [formData, setFormData] = useState({
    questionText: "",
    options: { A: "", B: "", C: "", D: "" },
    correctOption: "",
    explanation: "",
    category: "",
    subcategory: "",
    section: "",
  });

  const [errors, setErrors] = useState({
    questionText: "",
    options: { A: "", B: "", C: "", D: "" },
    correctOption: "",
    category: "",
    subcategory: "",
    section: "",
  });

  const [categories, setCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  const [isLoading, setIsLoading] = useState({
    category: false,
    subcategory: false,
    section: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const correctOptionOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ];

  useEffect(() => {
    // Fetch categories on component mount
    async function fetchCategories() {
      try {
        setIsLoading((prev) => ({ ...prev, category: true }));
        const data = await getCategory();

        if (data && data.success && data.data) {
          const formattedOptions = data.data.map((cat) => ({
            value: cat._id,
            label: cat.categoryName,
          }));
          setCategoryOptions(formattedOptions);
          setCategories(data.data || []);
        } else {
          console.error("Unexpected category response format:", data);
          toast.error("Failed to load categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error loading categories");
      } finally {
        setIsLoading((prev) => ({ ...prev, category: false }));
      }
    }

    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    async function fetchSubcategories() {
      const selectedCategoryId = formData.category;
      const selectedCategory = categoryOptions.find(
        (cat) => cat.value === selectedCategoryId
      );

      if (!selectedCategoryId || !selectedCategory) {
        setSubcategoryOptions([]);
        return;
      }

      try {
        setIsLoading((prev) => ({ ...prev, subcategory: true }));
        const response = await getSubCategories();

        console.log("Subcategories response:", response);
        console.log("Selected category:", selectedCategory);

        if (response && response.success && response.data) {
          // Check if the selected category name exists in the response data
          const categoryName = selectedCategory.label;
          console.log(
            "Looking for subcategories under category name:",
            categoryName
          );

          if (
            response.data[categoryName] &&
            response.data[categoryName].length > 0
          ) {
            // Get the subcategories array for the selected category
            const categorySubcategories = response.data[categoryName];
            console.log("Found subcategories:", categorySubcategories);

            // Format the subcategories for react-select
            const formattedOptions = categorySubcategories.map((sub) => ({
              value: sub._id,
              label:
                sub.subCategoryName ||
                sub.SubCategoryName ||
                sub.name ||
                "Unknown",
            }));

            console.log("Formatted subcategory options:", formattedOptions);
            setSubcategoryOptions(formattedOptions);
          } else {
            // No subcategories found for this category
            console.log("No subcategories found for category:", categoryName);
            setSubcategoryOptions([
              {
                value: "",
                label: "No subcategories available for this category",
                isDisabled: true,
              },
            ]);
          }
        } else {
          console.log("Invalid subcategories response:", response);
          setSubcategoryOptions([
            {
              value: "",
              label: "No subcategories available",
              isDisabled: true,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Error loading subcategories");
        setSubcategoryOptions([
          { value: "", label: "Error loading subcategories", isDisabled: true },
        ]);
      } finally {
        setIsLoading((prev) => ({ ...prev, subcategory: false }));
      }
    }

    if (formData.category) {
      fetchSubcategories();
    }
  }, [formData.category, categoryOptions]);

  // Fetch sections when subcategory changes
  useEffect(() => {
    async function fetchSections() {
      const selectedSubcategoryId = formData.subcategory;

      if (!selectedSubcategoryId) {
        setSectionOptions([]);
        return;
      }

      // Get the selected subcategory name
      const selectedSubcategory = subcategoryOptions.find(
        (option) => option.value === selectedSubcategoryId
      );

      if (!selectedSubcategory) {
        setSectionOptions([]);
        return;
      }

      const subcategoryName = selectedSubcategory.label;
      console.log(
        "Fetching sections for subcategory:",
        subcategoryName,
        "ID:",
        selectedSubcategoryId
      );

      try {
        setIsLoading((prev) => ({ ...prev, section: true }));
        // Get all sections
        const response = await getLearningSection(selectedSubcategoryId);

        console.log("Sections response:", response);

        if (response && response.success && response.data) {
          // Filter sections by matching subcategory name
          const filteredSections = response.data.filter((section) => {
            // Check all possible field names that might contain subcategory name
            const sectionSubcategoryName =
              section.subcategoryName ||
              section.SubCategoryName ||
              section.subCategoryName ||
              section.sub_category_name ||
              "";

            console.log(
              "Comparing section subcategory name:",
              sectionSubcategoryName,
              "with selected:",
              subcategoryName
            );
            return sectionSubcategoryName === subcategoryName;
          });

          // If no matches by name, try filtering by subcategory ID
          let sectionsToUse = filteredSections;
          if (filteredSections.length === 0) {
            console.log("No sections found by subcategory name, trying by ID");
            sectionsToUse = response.data.filter((section) => {
              return (
                section.subcategoryId === selectedSubcategoryId ||
                section.SubCategoryId === selectedSubcategoryId ||
                section.subCategoryId === selectedSubcategoryId
              );
            });
          }

          console.log("Filtered sections:", sectionsToUse);

          // Format the sections for react-select
          const formattedOptions = sectionsToUse.map((section) => ({
            value: section._id,
            label:
              section.sectionName ||
              section.SectionName ||
              section.name ||
              "Unknown",
          }));

          console.log("Formatted section options:", formattedOptions);
          setSectionOptions(formattedOptions);

          // If no sections found after filtering
          if (formattedOptions.length === 0) {
            setSectionOptions([
              {
                value: "",
                label: "No sections available for this subcategory",
                isDisabled: true,
              },
            ]);
          }
        } else {
          console.log("Invalid sections response:", response);
          setSectionOptions([
            { value: "", label: "No sections available", isDisabled: true },
          ]);
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
        toast.error("Error loading sections");
        setSectionOptions([
          { value: "", label: "Error loading sections", isDisabled: true },
        ]);
      } finally {
        setIsLoading((prev) => ({ ...prev, section: false }));
      }
    }

    if (formData.subcategory) {
      fetchSections();
    } else {
      setSectionOptions([]);
    }
  }, [formData.subcategory, subcategoryOptions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["A", "B", "C", "D"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        options: { ...prev.options, [name]: value },
      }));
      // Clear errors
      setErrors((prev) => ({
        ...prev,
        options: { ...prev.options, [name]: "" },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear errors
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  // Handle react-select change
  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));

    // When category changes, reset subcategory and section
    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        subcategory: "",
        section: "",
      }));
    }

    // When subcategory changes, reset section
    if (name === "subcategory") {
      setFormData((prev) => ({
        ...prev,
        section: "",
      }));
    }

    // Clear errors
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "16rem", // Increased from 12rem
      borderRadius: "0.375rem", // rounded-md
      borderColor: "#9CA3AF", // gray-400
      boxShadow: "none",
      "&:hover": {
        borderColor: "#5652B7",
      },
      padding: "0.25rem",
    }),
    menu: (provided) => ({
      ...provided,
      width: "16rem", // Increased from 12rem
      maxHeight: "250px", // Increased from 150px
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "250px", // Increased from 150px
    }),
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,
      backgroundColor: isSelected ? "#5652B7" : isFocused ? "#a5a1ea" : null,
      color: isSelected ? "white" : "black",
    }),
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      questionText: "",
      options: { A: "", B: "", C: "", D: "" },
      correctOption: "",
      category: "",
      subcategory: "",
      section: "",
    };

    // Validate question text
    if (!formData.questionText.trim()) {
      newErrors.questionText = "Question text is required";
      isValid = false;
    }

    // Validate each option
    Object.entries(formData.options).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors.options[key] = `Option ${key} is required`;
        isValid = false;
      }
    });

    // Validate correct option
    if (!formData.correctOption) {
      newErrors.correctOption = "Please select correct option";
      isValid = false;
    }

    // Validate category
    if (!formData.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    // Validate subcategory
    if (!formData.subcategory) {
      newErrors.subcategory = "Subcategory is required";
      isValid = false;
    }

    // Validate section
    if (!formData.section) {
      newErrors.section = "Section is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      // Get names for the selected IDs
      const selectedCategory = categoryOptions.find(
        (opt) => opt.value === formData.category
      );
      const selectedSubcategory = subcategoryOptions.find(
        (opt) => opt.value === formData.subcategory
      );
      const selectedSection = sectionOptions.find(
        (opt) => opt.value === formData.section
      );

      if (!selectedCategory || !selectedSubcategory || !selectedSection) {
        toast.error("Please select valid category, subcategory and section");
        return;
      }

      // The options structure must match the model schema (object with A, B, C, D properties)
      // Not an array of objects with text/isCorrect

      console.log("Form options:", formData.options);

      // Call API to save question
      const response = await addMockTestQuestion(
        formData.category, // categoryId
        selectedCategory.label, // categoryName
        formData.subcategory, // subcategoryId
        selectedSubcategory.label, // subcategoryName
        formData.section, // sectionId
        selectedSection.label, // sectionName
        formData.questionText, // questionText
        formData.options, // options - passing directly as an object {A, B, C, D}
        formData.correctOption, // correctOption
        formData.explanation // explanation
      );
      console.log("Response:", response);

      if (response.success) {
        toast.success("Question saved successfully!");

        // Reset the form after successful submission
        setFormData({
          questionText: "",
          options: { A: "", B: "", C: "", D: "" },
          correctOption: "",
          explanation: "",
          category: "",
          subcategory: "",
          section: "",
        });
      } else {
        toast.error(response.message || "Failed to save question");
      }
    } catch (error) {
      console.error("Error saving question:", error);
      toast.error("Error occurred while saving the question");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-lg font-medium mt-4 pl-2">
        Add & Edit Mock Test Question:
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Category, Subcategory, and Section - moved to top */}
        <div className="flex flex-row justify-start gap-x-16 mt-4">
          <div className="flex flex-col justify-start items-start gap-y-1">
            <label className="text-base pl-1">
              Category: <span className="text-red-500">*</span>
            </label>
            <Select
              name="category"
              value={
                categoryOptions.find(
                  (option) => option.value === formData.category
                ) || null
              }
              onChange={handleSelectChange}
              options={categoryOptions}
              styles={customStyles}
              placeholder={
                isLoading.category ? "Loading categories..." : "Select Category"
              }
              isSearchable={true}
              isLoading={isLoading.category}
              className={errors.category ? "border-red-500" : ""}
              classNamePrefix="select"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div className="flex flex-col justify-start items-start gap-y-1">
            <label className="text-base pl-1">
              Subcategory: <span className="text-red-500">*</span>
            </label>
            <Select
              name="subcategory"
              value={
                subcategoryOptions.find(
                  (option) => option.value === formData.subcategory
                ) || null
              }
              onChange={handleSelectChange}
              options={subcategoryOptions}
              styles={customStyles}
              placeholder={
                isLoading.subcategory
                  ? "Loading subcategories..."
                  : "Select Subcategory"
              }
              isSearchable={true}
              isLoading={isLoading.subcategory}
              isDisabled={!formData.category || isLoading.subcategory}
              className={errors.subcategory ? "border-red-500" : ""}
              classNamePrefix="select"
              noOptionsMessage={() =>
                "No subcategories available for this category"
              }
            />
            {errors.subcategory && (
              <p className="text-red-500 text-sm mt-1">{errors.subcategory}</p>
            )}
          </div>

          <div className="flex flex-col justify-start items-start gap-y-1">
            <label className="text-base pl-1">
              Section: <span className="text-red-500">*</span>
            </label>
            <Select
              name="section"
              value={
                sectionOptions.find(
                  (option) => option.value === formData.section
                ) || null
              }
              onChange={handleSelectChange}
              options={sectionOptions}
              styles={customStyles}
              placeholder={
                isLoading.section ? "Loading sections..." : "Select Section"
              }
              isSearchable={true}
              isLoading={isLoading.section}
              isDisabled={!formData.subcategory || isLoading.section}
              className={errors.section ? "border-red-500" : ""}
              classNamePrefix="select"
            />
            {errors.section && (
              <p className="text-red-500 text-sm mt-1">{errors.section}</p>
            )}
          </div>
        </div>

        {/* Question Text */}
        <div className="flex flex-col mt-4 justify-start items-start gap-y-1">
          <label className="text-base pl-1">
            Question Text: <span className="text-red-500">*</span>
          </label>
          <textarea
            name="questionText"
            value={formData.questionText}
            onChange={handleInputChange}
            className={`w-2xl h-40 p-2 rounded-md ring-1 ring-inset ${
              errors.questionText ? "ring-red-500" : "ring-gray-400"
            } focus:outline-none focus:ring-[#5652B7]`}
            placeholder="Enter the question here"
            required
          />
          {errors.questionText && (
            <p className="text-red-500 text-sm mt-1">{errors.questionText}</p>
          )}
        </div>

        {/* Options */}
        <div className="flex flex-col mt-4 justify-start items-start gap-y-1">
          <label className="text-base pl-1">
            Options: <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["A", "B", "C", "D"].map((opt) => (
              <div key={opt} className="flex flex-col gap-y-1">
                <label className="text-base pl-1">
                  Option {opt}: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={opt}
                  value={formData.options[opt]}
                  onChange={handleInputChange}
                  className={`w-48 p-2 rounded-md ring-1 ring-inset ${
                    errors.options[opt] ? "ring-red-500" : "ring-gray-400"
                  } focus:outline-none focus:ring-[#5652B7]`}
                  required
                />
                {errors.options[opt] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.options[opt]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Correct Option */}
        <div className="flex flex-col mt-4 justify-start items-start gap-y-1">
          <label className="text-base pl-1">
            Correct Option: <span className="text-red-500">*</span>
          </label>
          <Select
            name="correctOption"
            value={
              correctOptionOptions.find(
                (option) => option.value === formData.correctOption
              ) || null
            }
            onChange={handleSelectChange}
            options={correctOptionOptions}
            styles={customStyles}
            placeholder="Select Correct Option"
            isSearchable={true}
            className={errors.correctOption ? "border-red-500" : ""}
            classNamePrefix="select"
          />
          {errors.correctOption && (
            <p className="text-red-500 text-sm mt-1">{errors.correctOption}</p>
          )}
        </div>

        {/* Explanation */}
        <div className="flex flex-col mt-4 justify-start items-start gap-y-1">
          <label className="text-base pl-1">Explanation (Optional):</label>
          <textarea
            name="explanation"
            value={formData.explanation}
            onChange={handleInputChange}
            className="w-2xl h-32 p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-[#5652B7]"
            placeholder="Add explanation for the answer (optional)"
          />
        </div>

        {/* Submit Button */}
        <div className="flex mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#5652B7] text-white rounded-md hover:bg-[#6461BD] shadow-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Question"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddMockTestQuestion;
