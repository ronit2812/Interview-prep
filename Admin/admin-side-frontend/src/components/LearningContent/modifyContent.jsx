import React, { useState, useEffect } from "react";
// import Ckeditor from "../Ckeditor/ckeditor";
import {
  getCategory,
  getSubCategories,
  addNewCategory,
  addNewSubCategory,
  getLearningSection,
  getLearningSubSection,
  addLearningSection,
  addLearningSubSection,
  addLearningContent,
  getLearningContentById,
  updateLearningContent,
} from "../../services/LearningDependency";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router";

const ModifyContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const contentId = searchParams.get("id");

  // State for all form data
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    section: "",
    subsection: "",
  });

  // State for new entry inputs
  const [newEntries, setNewEntries] = useState({
    category: "",
    subcategory: "",
    section: "",
    subsection: "",
  });

  // State for storing lists
  const [lists, setLists] = useState({
    categories: [],
    subcategories: [],
    sections: [],
    subsections: [],
  });

  // Loading states
  const [loading, setLoading] = useState({
    categories: false,
    subcategories: false,
    sections: false,
    subsections: false,
  });

  // Category
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryModel, setShowCategoryModal] = useState(false);

  // sub category
  const [subCategory, setSubCategory] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);

  // Sections
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [selectedSection, setSelectedSection] = useState(null);
  const [showSectionModal, setShowSectionModal] = useState(false);

  // Sub Sections
  const [subSections, setSubSections] = useState([]);
  const [newSubSection, setNewSubSection] = useState("");
  const [selectedSubSection, setSelectedSubSection] = useState(null);
  const [showSubSectionModal, setShowSubSectionModal] = useState(false);

  // Description
  const [description, setDescription] = useState("");

  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [openSubCategoryMenu, setOpenSubCategoryMenu] = useState(false);
  const [openSectionMenu, setOpenSectionMenu] = useState(false);
  const [openSubSectionMenu, setOpenSubSectionMenu] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Validation Errors
  const [errors, setErrors] = useState({
    category: "",
    subCategory: "",
    section: "",
    subSection: "",
    description: "",
    newCategory: "",
    newSubCategory: "",
    newSection: "",
    newSubSection: "",
  });

  // Fetch categories on component mount
  useEffect(() => {
    // Debug to see all the imported functions
    console.log("API Functions:", {
      getCategory,
      getSubCategories,
      getLearningSection,
      getLearningSubSection,
    });
    fetchCategories();
  }, []);

  // Fetch content data if ID is present
  useEffect(() => {
    if (contentId) {
      fetchContentData();
    }
  }, [contentId]);

  // Fetch categories
  const fetchCategories = async () => {
    setLoading((prev) => ({ ...prev, categories: true }));
    try {
      const response = await getCategory();
      if (response.success) {
        const categories = response.data.map((item) => ({
          value: item._id,
          label: item.categoryName,
        }));
        setCategory(categories);
        setLists((prev) => ({ ...prev, categories: response.data }));
      }
    } catch (error) {
      toast.error(`Failed to fetch categories :: ${error}`, {
        position: "top-right",
        autoClose: true,
      });
    }
    setLoading((prev) => ({ ...prev, categories: false }));
  };

  const fetchContentData = async () => {
    try {
      const response = await getLearningContentById(contentId);
      if (response.success) {
        const contentData = response.data;

        // Set category
        const categoryOption = {
          value: contentData.categoryId,
          label: contentData.categoryName,
        };
        setSelectedCategory(categoryOption);

        // Set subcategory
        const subCategoryOption = {
          value: contentData.subCategoryId,
          label: contentData.subCategoryName,
        };
        setSelectedSubCategory(subCategoryOption);

        // Set section
        const sectionOption = {
          value: contentData.sectionId,
          label: contentData.sectionName,
        };
        setSelectedSection(sectionOption);

        // Set subsection
        const subSectionOption = {
          value: contentData.subSectionId,
          label: contentData.subSectionName,
        };
        setSelectedSubSection(subSectionOption);

        // Set description
        setDescription(contentData.content);

        // Fetch dependent data
        await fetchSubcategories(contentData.categoryId);
        await fetchSections(contentData.subCategoryId);
        await fetchSubsections(contentData.sectionId);
      } else {
        toast.error("Failed to fetch content data", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(`Error fetching content: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Fetch subcategories based on selected category
  const fetchSubcategories = async (categoryId) => {
    setLoading((prev) => ({ ...prev, subcategories: true }));
    try {
      const response = await getSubCategories();
      console.log("Original API Response:", response);

      if (response.success) {
        const data = response.data;
        console.log("Subcategories Response Data:", data);
        console.log("Category ID to filter by:", categoryId);

        let subcategoriesForDropdown = [];

        // Case 1: If data is an array, filter by categoryId/CategoryID
        if (Array.isArray(data)) {
          console.log("Processing data as array");
          const filteredItems = data.filter((sub) => {
            return (
              sub.categoryId === categoryId ||
              sub.CategoryID === categoryId ||
              sub.categoryID === categoryId
            );
          });

          subcategoriesForDropdown = filteredItems.map((item) => ({
            value: item._id,
            label: item.subCategoryName || item.SubCategoryName || "Unnamed",
            categoryId: categoryId,
          }));
        }
        // Case 2: If data is an object with category names as keys
        else if (data && typeof data === "object") {
          console.log("Processing data as object");

          // Find category name from category list
          const categoryName = category.find(
            (cat) => cat.value === categoryId
          )?.label;
          console.log("Looking for category name:", categoryName);

          if (categoryName && data[categoryName]) {
            // Extract subcategories for this category name
            console.log(`Found subcategories under key: ${categoryName}`);
            const subCategoriesArr = data[categoryName];

            subcategoriesForDropdown = subCategoriesArr.map((item) => ({
              value: item._id,
              label: item.SubCategoryName || item.subCategoryName || "Unnamed",
              categoryId: categoryId,
            }));
          } else {
            // Try to find subcategories by iterating through all keys
            console.log(
              "Trying to find subcategories by iterating all object keys"
            );
            Object.keys(data).forEach((key) => {
              if (Array.isArray(data[key])) {
                const filteredForCategory = data[key].filter(
                  (item) =>
                    item.CategoryID === categoryId ||
                    item.categoryId === categoryId
                );

                const mappedItems = filteredForCategory.map((item) => ({
                  value: item._id,
                  label:
                    item.SubCategoryName || item.subCategoryName || "Unnamed",
                  categoryId: categoryId,
                }));

                subcategoriesForDropdown = [
                  ...subcategoriesForDropdown,
                  ...mappedItems,
                ];
              }
            });
          }
        }

        console.log(
          "Final subcategories for dropdown:",
          subcategoriesForDropdown
        );

        if (subcategoriesForDropdown.length === 0) {
          toast.warning("No subcategories found for this category", {
            position: "top-right",
            autoClose: 3000,
          });
        }

        setSubCategory(subcategoriesForDropdown);
      } else {
        toast.error("Failed to fetch subcategories: Response not successful", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error(`Failed to fetch subcategories: ${error.message || error}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading((prev) => ({ ...prev, subcategories: false }));
    }
  };

  // Fetch sections based on selected subcategory
  const fetchSections = async (subcategoryId) => {
    setLoading((prev) => ({ ...prev, sections: true }));
    try {
      const response = await getLearningSection();
      if (response.success) {
        const data = response.data;
        // Filter sections based on selected subcategory
        const filteredSections = data.filter(
          (section) => section.subCategoryId === subcategoryId
        );

        // Format sections for dropdown
        const formattedSections = filteredSections.map((section) => ({
          value: section._id,
          label: section.sectionName,
          subCategoryId: subcategoryId,
        }));

        setSections(formattedSections);
        setLists((prev) => ({ ...prev, sections: filteredSections }));
      }
    } catch (error) {
      toast.error(`Failed to fetch sections: ${error}`, {
        position: "top-right",
        autoClose: true,
      });
      setSections([]);
    }
    setLoading((prev) => ({ ...prev, sections: false }));
  };

  // Fetch subsections based on selected section
  const fetchSubsections = async (sectionId) => {
    setLoading((prev) => ({ ...prev, subsections: true }));
    try {
      // Debug the sectionId being passed
      console.log(
        `Fetching subsections with sectionId: ${sectionId} (${typeof sectionId})`
      );

      // Clear existing subsections first
      setSubSections([]);

      // Get all subsections first (if the API doesn't support filtering by sectionId)
      const response = await getLearningSubSection();
      console.log("Raw subsections API response:", response);

      if (response && response.success && response.data) {
        const allData = response.data;
        console.log("All subsections data:", allData);

        let filteredData = [];

        // Check if data is already filtered by the API
        if (Array.isArray(allData)) {
          // If API returns all subsections, filter them on the client side
          console.log(`Filtering by sectionId: ${sectionId}`);

          // Try multiple property names for sectionId
          filteredData = allData.filter((subsection) => {
            return (
              subsection.sectionId === sectionId ||
              subsection.SectionId === sectionId ||
              subsection.sectionID === sectionId ||
              subsection.section_id === sectionId
            );
          });

          console.log("Filtered subsections:", filteredData);
        } else {
          console.log("Data is not an array, unable to filter");
        }

        // Format subsections for dropdown with flexible property name handling
        const formattedSubSections = filteredData.map((subsection) => ({
          value: subsection._id,
          label:
            subsection.subSectionName || subsection.SubSectionName || "Unnamed",
          sectionId: sectionId,
        }));

        console.log(
          "Formatted subsections for dropdown:",
          formattedSubSections
        );

        // Update state with formatted subsections
        setSubSections(formattedSubSections);

        // Update lists state
        setLists((prev) => ({ ...prev, subsections: filteredData }));

        // Show appropriate feedback
        if (formattedSubSections.length === 0) {
          console.log("No subsections found for this section");
          toast.info("No subsections found for this section", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          console.log(
            `Found ${formattedSubSections.length} subsections for this section`
          );
        }
      } else {
        console.error(
          "Failed to fetch subsections: Invalid response",
          response
        );
        toast.error("Failed to fetch subsections: Invalid response", {
          position: "top-right",
          autoClose: 3000,
        });
        setSubSections([]);
      }
    } catch (error) {
      console.error("Error fetching subsections:", error);
      toast.error(`Failed to fetch subsections: ${error.message || error}`, {
        position: "top-right",
        autoClose: 3000,
      });
      setSubSections([]);
    } finally {
      setLoading((prev) => ({ ...prev, subsections: false }));
    }
  };

  // Handle adding new category
  const handleAddCategory = async () => {
    if (!validateAddCategory()) return;

    setIsSubmitting(true);
    try {
      const response = await addNewCategory(newEntries.category);
      if (response.success) {
        toast.success("Category added!", {
          position: "top-right",
          autoClose: true,
        });
        const updatedCategory = {
          value: response.data._id,
          label: response.data.categoryName,
        };
        setCategory((prevCategories) => [...prevCategories, updatedCategory]);
        setNewEntries((prev) => ({ ...prev, category: "" }));
        setShowCategoryModal(false);
        setErrors({ ...errors, newCategory: "" });
      } else {
        toast.error("Category not added!", {
          position: "top-right",
          autoClose: true,
        });
      }
    } catch (error) {
      toast.error(`Category not added... ${error}`, {
        position: "top-right",
        autoClose: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle category selection
  const handleCategoryChange = async (selected) => {
    console.log("Selected Category:", selected); // Debug log
    setSelectedCategory(selected);
    setErrors({ ...errors, category: "" });

    // Reset dependent fields
    setSelectedSubCategory(null);
    setSelectedSection(null);
    setSelectedSubSection(null);
    setSubCategory([]);
    setSections([]);
    setSubSections([]);

    if (selected) {
      await fetchSubcategories(selected.value);
    }
  };

  // Handle subcategory selection
  const handleSubCategoryChange = async (selected) => {
    setSelectedSubCategory(selected);
    setErrors({ ...errors, subCategory: "" });

    // Reset dependent fields
    setSelectedSection(null);
    setSelectedSubSection(null);
    setSections([]);
    setSubSections([]);

    if (selected) {
      await fetchSections(selected.value);
    }
  };

  // Update the subcategory add function
  const handleSubmitAddSubCategory = async () => {
    if (!validateAddSubCategory()) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await addNewSubCategory(
        selectedCategory.value,
        selectedCategory.label,
        newSubCategory
      );

      if (response.success) {
        toast.success("Sub Category added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        // Create the new subcategory option
        const newSubCategoryOption = {
          value: response.data._id,
          label: response.data.subCategoryName,
        };

        // Update the subcategory options
        setSubCategory((prev) => [...prev, newSubCategoryOption]);

        // Reset form
        setNewSubCategory("");
        setShowSubCategoryModal(false);
        setErrors({ ...errors, newSubCategory: "", category: "" });

        // Refresh subcategories for the selected category
        if (selectedCategory) {
          const refreshResponse = await getSubCategories();
          if (refreshResponse.success) {
            const subCategoryArray =
              refreshResponse.data[selectedCategory.label] || [];
            const filteredSubCategories = subCategoryArray.map((sub) => ({
              value: sub._id,
              label: sub.SubCategoryName,
            }));
            setSubCategory(filteredSubCategories);
          }
        }
      } else {
        toast.error(response.message || "Failed to add sub-category", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(`Error adding sub-category: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle adding new section
  const handleSubmitAddSection = async () => {
    if (!validateAddSection()) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Create section data
      const sectionData = {
        sectionName: newSection,
        subCategoryId: selectedSubCategory.value,
        subCategoryName: selectedSubCategory.label,
      };

      // Call API to add new section
      const response = await addLearningSection(
        sectionData.subCategoryId,
        sectionData.subCategoryName,
        sectionData.sectionName
      );

      if (response.success) {
        // Create the new section option
        const newSectionItem = {
          value: response.data._id,
          label: newSection,
          parentId: selectedSubCategory.value,
          parentSubCategory: selectedSubCategory.label,
        };

        // Update the sections list
        setSections((prev) => [...prev, newSectionItem]);

        // Reset form
        setNewSection("");
        setShowSectionModal(false);
        setErrors({ ...errors, newSection: "", subCategory: "" });

        toast.success("Section added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(response.message || "Failed to add section", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(`Error adding section: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle adding new subsection
  const handleSubmitAddSubsection = async () => {
    if (!validateAddSubSection()) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Create subsection data
      const subsectionData = {
        subSectionName: newSubSection,
        sectionId: selectedSection.value,
        sectionName: selectedSection.label,
      };

      // Call API to add new subsection
      const response = await addLearningSubSection(
        subsectionData.sectionId,
        subsectionData.sectionName,
        subsectionData.subSectionName
      );

      if (response.success) {
        // Create the new subsection option
        const newSubSectionItem = {
          value: response.data._id,
          label: response.data.subSectionName || newSubSection,
          parentId: selectedSection.value,
          parentSection: selectedSection.label,
        };

        // Update the subsections list
        setSubSections((prev) => [...prev, newSubSectionItem]);

        // Reset form
        setNewSubSection("");
        setShowSubSectionModal(false);
        setErrors({ ...errors, newSubSection: "", section: "" });

        toast.success("Sub-section added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        // Refresh subsections list
        if (selectedSection) {
          await fetchSubsections(selectedSection.value);
        }
      } else {
        toast.error(response.message || "Failed to add sub-section", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error adding subsection:", error);
      toast.error(`Error adding sub-section: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle selection changes
  const handleSelectionChange = async (e, level) => {
    const { value } = e.target;
    setFormData((prev) => {
      const newState = { ...prev, [level]: value };
      // Reset dependent fields
      switch (level) {
        case "category":
          newState.subcategory = "";
          newState.section = "";
          newState.subsection = "";
          break;
        case "subcategory":
          newState.section = "";
          newState.subsection = "";
          break;
        case "section":
          newState.subsection = "";
          break;
      }
      return newState;
    });

    // Fetch dependent data
    switch (level) {
      case "category":
        if (value) await fetchSubcategories(value);
        break;
      case "subcategory":
        if (value) await fetchSections(value);
        break;
      case "section":
        if (value) await fetchSubsections(value);
        break;
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderWidth: "2px",
      borderColor: state.isFocused ? "#5652B7" : "#ccc", // Purple border only on focus
      boxShadow: state.isFocused ? "0 0 0 3px rgba(86, 82, 183, 0.5)" : "none",
      transition: "border-color 0.2s ease-in-out",
      "&:hover": {
        borderColor: state.isFocused ? "#5652B7" : "#aaa",
      },
    }),
  };

  // Validation Functions
  const validateAddCategory = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!newEntries.category.trim()) {
      newErrors.newCategory = "Category name is required";
      isValid = false;
    } else {
      newErrors.newCategory = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateAddSubCategory = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!selectedCategory) {
      newErrors.category = "Parent category is required";
      isValid = false;
    } else {
      newErrors.category = "";
    }

    if (!newSubCategory || !newSubCategory.trim()) {
      newErrors.newSubCategory = "Sub-category name is required";
      isValid = false;
    } else {
      newErrors.newSubCategory = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateAddSection = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!selectedSubCategory) {
      newErrors.subCategory = "Parent sub-category is required";
      isValid = false;
    } else {
      newErrors.subCategory = "";
    }

    if (!newSection.trim()) {
      newErrors.newSection = "Section name is required";
      isValid = false;
    } else {
      newErrors.newSection = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateAddSubSection = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!selectedSection) {
      newErrors.section = "Parent section is required";
      isValid = false;
    } else {
      newErrors.section = "";
    }

    if (!newSubSection.trim()) {
      newErrors.newSubSection = "Sub-section name is required";
      isValid = false;
    } else {
      newErrors.newSubSection = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateMainForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!selectedCategory) {
      newErrors.category = "Category is required";
      isValid = false;
    } else {
      newErrors.category = "";
    }

    if (!selectedSubCategory) {
      newErrors.subCategory = "Sub-category is required";
      isValid = false;
    } else {
      newErrors.subCategory = "";
    }

    if (!selectedSection) {
      newErrors.section = "Section is required";
      isValid = false;
    } else {
      newErrors.section = "";
    }

    if (!selectedSubSection) {
      newErrors.subSection = "Sub-section is required";
      isValid = false;
    } else {
      newErrors.subSection = "";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else {
      newErrors.description = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Add handleSubmitForm function
  const handleSubmitForm = async () => {
    if (!validateMainForm()) {
      toast.error("Please fill in all required fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Create form data object with all selected values
      const submitData = {
        category: {
          id: selectedCategory?.value,
          name: selectedCategory?.label,
        },
        subCategory: {
          id: selectedSubCategory?.value,
          name: selectedSubCategory?.label,
        },
        section: {
          id: selectedSection?.value,
          name: selectedSection?.label,
        },
        subSection: {
          id: selectedSubSection?.value,
          name: selectedSubSection?.label,
        },
        description: description,
      };

      let response;

      // Check if we're in edit mode or add mode
      if (contentId) {
        console.log("Updating existing content with ID:", contentId);
        // Use updateLearningContent for edit mode
        response = await updateLearningContent(
          contentId,
          submitData.category.id,
          submitData.category.name,
          submitData.subCategory.id,
          submitData.subCategory.name,
          submitData.section.id,
          submitData.section.name,
          submitData.subSection.id,
          submitData.subSection.name,
          submitData.description
        );

        console.log("Update response:", response);
      } else {
        console.log("Adding new content");
        // Use addLearningContent for add mode
        response = await addLearningContent(
          submitData.category.id,
          submitData.category.name,
          submitData.subCategory.id,
          submitData.subCategory.name,
          submitData.section.id,
          submitData.section.name,
          submitData.subSection.id,
          submitData.subSection.name,
          submitData.description
        );

        console.log("Add response:", response);
      }

      if (response.success) {
        toast.success(
          response.message ||
            `Learning content ${contentId ? "updated" : "added"} successfully!`,
          {
            position: "top-right",
            autoClose: true,
          }
        );
        setTimeout(() => {
          navigate("/learning");
        }, 3000);
      } else {
        toast.error(
          response.message ||
            `Failed to ${contentId ? "update" : "save"} content`,
          {
            position: "top-right",
            autoClose: true,
          }
        );
      }

      // Reset form after successful submission
      if (!contentId) {
        // Only reset if we were adding new content
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setSelectedSection(null);
        setSelectedSubSection(null);
        setDescription("");
      }
    } catch (error) {
      console.error(
        `Error ${contentId ? "updating" : "saving"} content:`,
        error
      );
      toast.error(
        `Error ${contentId ? "updating" : "saving"} content: ${
          error.message || error
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle section selection
  const handleSectionChange = async (selected) => {
    console.log("Section selected:", selected);
    setSelectedSection(selected);
    setErrors({ ...errors, section: "" });

    // Reset subsection
    setSelectedSubSection(null);
    setSubSections([]);

    if (selected && selected.value) {
      console.log("Calling fetchSubsections with sectionId:", selected.value);
      await fetchSubsections(selected.value);
    } else {
      console.warn("No section selected or section has no value");
      setSubSections([]);
    }
  };

  return (
    <>
      <ToastContainer />
      <h2 className="mt-4 text-lg font-medium">Add & Edit Learning Content:</h2>

      {/* Category and sub-category for Learning Content */}
      <div className="flex mt-4 gap-x-14">
        <div className="flex flex-col items-start justify-start gap-y-1">
          <label htmlFor="Category" className="pl-1 text-base">
            Category: <span className="text-red-500">*</span>
          </label>
          <Select
            className="w-72"
            styles={{
              ...customStyles,
              control: (provided, state) => ({
                ...provided,
                borderColor: errors.category
                  ? "rgb(239 68 68)"
                  : state.isFocused
                  ? "#5652B7"
                  : "#ccc",
              }),
            }}
            options={category}
            value={selectedCategory}
            onChange={handleCategoryChange}
            onMenuOpen={() => setOpenCategoryMenu(true)}
            onMenuClose={() => setOpenCategoryMenu(false)}
            menuIsOpen={openCategoryMenu}
            placeholder="Select Category"
            closeMenuOnSelect={() => setOpenCategoryMenu(false)}
            isSearchable={true}
            required={true}
          />
          {errors.category && (
            <span className="text-sm text-red-500">{errors.category}</span>
          )}
          <button
            className="pl-2 text-sm text-blue-600 cursor-pointer"
            onClick={() => setShowCategoryModal(true)}
          >
            + Add New
          </button>
        </div>

        <div className="flex flex-col items-start justify-start gap-y-1">
          <label htmlFor="Sub-Category" className="pl-1 text-base">
            Sub-Category: <span className="text-red-500">*</span>
          </label>
          <Select
            className="w-72"
            styles={{
              ...customStyles,
              control: (provided, state) => ({
                ...provided,
                borderColor: errors.subCategory
                  ? "rgb(239 68 68)"
                  : state.isFocused
                  ? "#5652B7"
                  : "#ccc",
              }),
            }}
            options={subCategory}
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            onMenuOpen={() => setOpenSubCategoryMenu(true)}
            onMenuClose={() => setOpenSubCategoryMenu(false)}
            menuIsOpen={openSubCategoryMenu}
            placeholder="Select Sub-Category"
            closeMenuOnSelect={() => setOpenSubCategoryMenu(false)}
            isSearchable={true}
            required={true}
            isDisabled={!selectedCategory}
          />
          {errors.subCategory && (
            <span className="text-sm text-red-500">{errors.subCategory}</span>
          )}
          <button
            className="pl-2 text-sm text-blue-600 cursor-pointer"
            onClick={() => setShowSubCategoryModal(true)}
          >
            + Add New
          </button>
        </div>
      </div>

      {/* Section and sub-section for Learning Content */}
      <div className="flex mt-6 gap-x-14">
        <div className="flex flex-col items-start justify-start gap-y-1">
          <label htmlFor="Section" className="pl-1 text-base">
            Section: <span className="text-red-500">*</span>
          </label>
          <Select
            className="w-72"
            styles={{
              ...customStyles,
              control: (provided, state) => ({
                ...provided,
                borderColor: errors.section
                  ? "rgb(239 68 68)"
                  : state.isFocused
                  ? "#5652B7"
                  : "#ccc",
              }),
            }}
            options={sections}
            value={selectedSection}
            onChange={handleSectionChange}
            onMenuOpen={() => setOpenSectionMenu(true)}
            onMenuClose={() => setOpenSectionMenu(false)}
            menuIsOpen={openSectionMenu}
            placeholder="Select Section"
            closeMenuOnSelect={() => setOpenSectionMenu(false)}
            isSearchable={true}
            required={true}
            isDisabled={!selectedSubCategory}
          />
          {errors.section && (
            <span className="text-sm text-red-500">{errors.section}</span>
          )}
          <button
            className="pl-2 text-sm text-blue-600 cursor-pointer"
            onClick={() => setShowSectionModal(true)}
          >
            + Add New
          </button>
        </div>

        <div className="flex flex-col items-start justify-start gap-y-1">
          <label htmlFor="Sub-Section" className="pl-1 text-base">
            Sub-Section: <span className="text-red-500">*</span>
          </label>
          <Select
            className="w-72"
            styles={{
              ...customStyles,
              control: (provided, state) => ({
                ...provided,
                borderColor: errors.subSection
                  ? "rgb(239 68 68)"
                  : state.isFocused
                  ? "#5652B7"
                  : "#ccc",
              }),
            }}
            options={subSections}
            value={selectedSubSection}
            onChange={(selected) => {
              setSelectedSubSection(selected);
              setErrors({ ...errors, subSection: "" });
            }}
            onMenuOpen={() => setOpenSubSectionMenu(true)}
            onMenuClose={() => setOpenSubSectionMenu(false)}
            menuIsOpen={openSubSectionMenu}
            placeholder="Select Sub-Section"
            closeMenuOnSelect={() => setOpenSubSectionMenu(false)}
            isSearchable={true}
            required={true}
            isDisabled={!selectedSection}
          />
          {errors.subSection && (
            <span className="text-sm text-red-500">{errors.subSection}</span>
          )}
          <button
            className="pl-2 text-sm text-blue-600 cursor-pointer"
            onClick={() => setShowSubSectionModal(true)}
          >
            + Add New
          </button>
        </div>
      </div>

      {/* Description for Learning Content */}
      <div className="flex flex-col mt-10 gap-y-3">
        <label htmlFor="Description" className="pl-1 text-base">
          Description: <span className="text-red-500">*</span>
        </label>
        <textarea
          className={`w-full p-4 border-2 rounded-md focus:outline-none focus:border-[#5652B7] min-h-[200px] ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter description here..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors({ ...errors, description: "" });
          }}
        />
        {errors.description && (
          <span className="text-sm text-red-500">{errors.description}</span>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmitForm}
          className="px-6 py-2 bg-[#5652B7] text-white rounded-md hover:bg-[#6461BD] shadow-md"
        >
          Submit
        </button>
      </div>

      {/* Add New Modal for Category */}
      {showCategoryModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm">
          <div className="p-6 space-y-4 bg-white rounded-md shadow-lg w-96">
            <h3 className="text-lg font-semibold">Add New Category</h3>
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-1">
                <label>
                  Category: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newEntries.category}
                  onChange={(e) => {
                    setNewEntries((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }));
                    setErrors({ ...errors, newCategory: "" });
                  }}
                  className={`p-2 rounded-md ring-1 ring-inset ${
                    errors.newCategory ? "ring-red-500" : "ring-gray-400"
                  } focus:outline-none focus:ring-[#5652B7] focus:ring-inset focus:ring-2`}
                  placeholder="Enter New Category"
                />
                {errors.newCategory && (
                  <span className="text-sm text-red-500">
                    {errors.newCategory}
                  </span>
                )}
              </div>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-[#5652B7] text-white rounded-md hover:bg-[#6461BD] shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Category"}
              </button>
            </div>
            <button
              onClick={() => setShowCategoryModal(false)}
              className="p-2 mt-4 text-white bg-gray-500 rounded-md"
              disabled={isSubmitting}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add New Modal for Sub-Category */}
      {showSubCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm">
          <div className="p-6 space-y-4 bg-white rounded-md shadow-lg w-96">
            <h3 className="text-lg font-semibold">Add New Sub-Category</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1">
                <label>
                  Parent Category: <span className="text-red-500">*</span>
                </label>
                <Select
                  className="w-full"
                  styles={{
                    ...customStyles,
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: errors.category
                        ? "rgb(239 68 68)"
                        : state.isFocused
                        ? "#5652B7"
                        : "#ccc",
                    }),
                  }}
                  options={category}
                  value={selectedCategory}
                  onChange={(selected) => {
                    setSelectedCategory(selected);
                    setErrors({ ...errors, category: "" });
                  }}
                  placeholder="Select Parent Category"
                  isSearchable={true}
                  required={true}
                />
                {errors.category && (
                  <span className="text-sm text-red-500">
                    {errors.category}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <label>
                  Sub-Category: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSubCategory}
                  onChange={(e) => {
                    setNewSubCategory(e.target.value);
                    setErrors({ ...errors, newSubCategory: "" });
                  }}
                  className={`p-2 rounded-md ring-1 ring-inset ${
                    errors.newSubCategory ? "ring-red-500" : "ring-gray-400"
                  } focus:outline-none focus:ring-[#5652B7] focus:ring-inset focus:ring-2`}
                  placeholder="Enter New Sub-Category"
                />
                {errors.newSubCategory && (
                  <span className="text-sm text-red-500">
                    {errors.newSubCategory}
                  </span>
                )}
              </div>
              <button
                onClick={handleSubmitAddSubCategory}
                className="px-4 py-2 bg-[#5652B7] text-white rounded-md hover:bg-[#6461BD] shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Sub-Category"}
              </button>
            </div>
            <button
              onClick={() => setShowSubCategoryModal(false)}
              className="p-2 mt-4 text-white bg-gray-500 rounded-md"
              disabled={isSubmitting}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add New Modal for Section */}
      {showSectionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm">
          <div className="p-6 space-y-4 bg-white rounded-md shadow-lg w-96">
            <h3 className="text-lg font-semibold">Add New Section</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1">
                <label>
                  Parent Sub-Category: <span className="text-red-500">*</span>
                </label>
                <Select
                  className="w-full"
                  styles={{
                    ...customStyles,
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: errors.subCategory
                        ? "rgb(239 68 68)"
                        : state.isFocused
                        ? "#5652B7"
                        : "#ccc",
                    }),
                  }}
                  options={subCategory}
                  value={selectedSubCategory}
                  onChange={(selected) => {
                    setSelectedSubCategory(selected);
                    setErrors({ ...errors, subCategory: "" });
                  }}
                  placeholder="Select Parent Sub-Category"
                  isSearchable={true}
                  required={true}
                  isLoading={loading.subcategories}
                />
                {errors.subCategory && (
                  <span className="text-sm text-red-500">
                    {errors.subCategory}
                  </span>
                )}
                {subCategory.length === 0 && !loading.subcategories && (
                  <span className="text-sm text-orange-500">
                    No subcategories available. Please select a category first.
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <label>
                  Section: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSection}
                  onChange={(e) => {
                    setNewSection(e.target.value);
                    setErrors({ ...errors, newSection: "" });
                  }}
                  className={`p-2 rounded-md ring-1 ring-inset ${
                    errors.newSection ? "ring-red-500" : "ring-gray-400"
                  } focus:outline-none focus:ring-[#5652B7] focus:ring-inset focus:ring-2`}
                  placeholder="Enter Section Name"
                />
                {errors.newSection && (
                  <span className="text-sm text-red-500">
                    {errors.newSection}
                  </span>
                )}
              </div>
              <button
                onClick={handleSubmitAddSection}
                className="px-4 py-2 bg-[#5652B7] text-white rounded-md hover:bg-[#6461BD] shadow-md"
                disabled={isSubmitting || !selectedSubCategory}
              >
                {isSubmitting ? "Adding..." : "Add Section"}
              </button>
            </div>
            <button
              onClick={() => setShowSectionModal(false)}
              className="p-2 mt-4 text-white bg-gray-500 rounded-md"
              disabled={isSubmitting}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add New Modal for Sub-Section */}
      {showSubSectionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm">
          <div className="p-6 space-y-4 bg-white rounded-md shadow-lg w-96">
            <h3 className="text-lg font-semibold">Add New Sub-Section</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1">
                <label>
                  Parent Section: <span className="text-red-500">*</span>
                </label>
                <Select
                  className="w-full"
                  styles={{
                    ...customStyles,
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: errors.section
                        ? "rgb(239 68 68)"
                        : state.isFocused
                        ? "#5652B7"
                        : "#ccc",
                    }),
                  }}
                  options={sections}
                  value={selectedSection}
                  onChange={(selected) => {
                    setSelectedSection(selected);
                    setErrors({ ...errors, section: "" });
                  }}
                  placeholder="Select Parent Section"
                  isSearchable={true}
                  required={true}
                  isLoading={loading.sections}
                />
                {errors.section && (
                  <span className="text-sm text-red-500">{errors.section}</span>
                )}
                {sections.length === 0 && !loading.sections && (
                  <span className="text-sm text-orange-500">
                    No sections available. Please select a subcategory first.
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <label>
                  Sub-Section: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSubSection}
                  onChange={(e) => {
                    setNewSubSection(e.target.value);
                    setErrors({ ...errors, newSubSection: "" });
                  }}
                  className={`p-2 rounded-md ring-1 ring-inset ${
                    errors.newSubSection ? "ring-red-500" : "ring-gray-400"
                  } focus:outline-none focus:ring-[#5652B7] focus:ring-inset focus:ring-2`}
                  placeholder="Enter Sub-Section Name"
                />
                {errors.newSubSection && (
                  <span className="text-sm text-red-500">
                    {errors.newSubSection}
                  </span>
                )}
              </div>
              <button
                onClick={handleSubmitAddSubsection}
                className="px-4 py-2 bg-[#5652B7] text-white rounded-md hover:bg-[#6461BD] shadow-md"
                disabled={isSubmitting || !selectedSection}
              >
                {isSubmitting ? "Adding..." : "Add Sub-Section"}
              </button>
            </div>
            <button
              onClick={() => setShowSubSectionModal(false)}
              className="p-2 mt-4 text-white bg-gray-500 rounded-md"
              disabled={isSubmitting}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModifyContent;
