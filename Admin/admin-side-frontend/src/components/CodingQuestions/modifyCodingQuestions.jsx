import React, { useState, useEffect } from "react";
// import Ckeditor from "../Ckeditor/ckeditor";
import Select from "react-select";
import remove_logo from "../../assets/images/delete.svg";
import { useNavigate } from "react-router";
import {
  addTopic,
  getAllTopics,
  addCompany,
  getAllCompanies,
  addCodingQuestion,
} from "../../services/CodingDependency";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModifyCodingQuestion() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    topics: [],
    companyTags: [],
    isPremium: false,
    rewardPoints: 0,
    examples: [],
    testCases: [],
    constraints: {
      minArrayLength: "",
      maxArrayLength: "",
      maxTimeLimit: "",
    },
    availableTopics: [],
    availableCompanies: [],
    tags: [],
    availableTags: [
      { value: "basic", label: "Basic" },
      { value: "input-output", label: "Input-Output" },
      { value: "recursion", label: "Recursion" },
      { value: "dynamic-programming", label: "Dynamic Programming" },
      { value: "greedy", label: "Greedy" },
      { value: "backtracking", label: "Backtracking" },
      { value: "sorting", label: "Sorting" },
    ],
  });

  // Fetch topics and companies when component mounts
  useEffect(() => {
    const fetchTopicsAndCompanies = async () => {
      try {
        // Fetch topics
        const topicsResponse = await getAllTopics();
        console.log("Topics response:", topicsResponse.data);
        if (topicsResponse.success && topicsResponse.data) {
          // Convert topics to the format needed for react-select
          const formattedTopics = topicsResponse.data.map((topic) => ({
            value: topic._id, // Use the MongoDB ObjectId
            label: topic.topicName,
          }));

          setQuestion((prev) => ({
            ...prev,
            availableTopics: formattedTopics,
          }));
        } else {
          toast.error("Failed to load topics", {
            position: "top-right",
            autoClose: true,
          });
        }

        // Fetch companies
        const companiesResponse = await getAllCompanies();
        console.log("Companies response:", companiesResponse.data);
        if (companiesResponse.success && companiesResponse.data) {
          // Convert companies to the format needed for react-select
          const formattedCompanies = companiesResponse.data.map((company) => ({
            value: company._id, // Use the MongoDB ObjectId
            label: company.companyName,
          }));

          setQuestion((prev) => ({
            ...prev,
            availableCompanies: formattedCompanies,
          }));
        } else {
          toast.error("Failed to load companies", {
            position: "top-right",
            autoClose: true,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error loading data", {
          position: "top-right",
          autoClose: true,
        });
      }
    };

    fetchTopicsAndCompanies();
  }, []);

  // Add validation errors state
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    topics: "",
    tags: "",
    difficulty: "",
    rewardPoints: "",
    examples: "",
    testCases: "",
    companies: "",
  });

  const [newTopic, setNewTopic] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showCompnayModel, setShowCompanyModal] = useState(false);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for isPremium checkbox
    if (name === "isPremium") {
      const isChecked = e.target.checked;
      setQuestion((prev) => ({
        ...prev,
        isPremium: isChecked,
      }));

      // Clear reward points error if it's no longer a premium question
      if (!isChecked && errors.rewardPoints) {
        setErrors((prev) => ({
          ...prev,
          rewardPoints: "",
        }));
      }
      return;
    }

    setQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle description change
  const handleDescriptionChange = (event, editor) => {
    setQuestion((prev) => ({
      ...prev,
      description: editor.getData(),
    }));

    // Clear description error
    setErrors((prev) => ({
      ...prev,
      description: "",
    }));
  };

  // Handle adding new topic
  const handleAddTopic = async () => {
    if (!newTopic.trim()) return;

    try {
      const response = await addTopic(newTopic);
      console.log("Add topic response:", response);

      if (response.success) {
        // Only add to topics if we have a valid ID from the server response
        if (response.data && response.data._id) {
          // Add to available topics using the ID from the database
          const newTopicOption = {
            value: response.data._id, // Use the MongoDB ObjectId
            label: newTopic,
          };

          setQuestion((prev) => ({
            ...prev,
            topics: [...prev.topics, newTopicOption],
            availableTopics: [...prev.availableTopics, newTopicOption],
          }));
        }

        setNewTopic("");
        setShowTopicModal(false);

        // Clear topics error
        setErrors((prev) => ({
          ...prev,
          topics: "",
        }));

        // Show success toast
        toast.success("Topic added successfully!", {
          position: "top-right",
          autoClose: true,
        });
      } else {
        console.error("Failed to add topic:", response.message);
        // Show error toast
        toast.error(response.message || "Failed to add topic", {
          position: "top-right",
          autoClose: true,
        });
      }
    } catch (error) {
      console.error("Error adding topic:", error);
      // Show error toast
      toast.error("An error occurred while adding the topic", {
        position: "top-right",
        autoClose: true,
      });
    }
  };

  // Handle adding new company
  const handleAddCompany = async () => {
    if (!newCompany.trim()) return;

    try {
      const response = await addCompany(newCompany);
      console.log("Add company response:", response);

      if (response.success) {
        // Only add to companies if we have a valid ID from the server response
        if (response.data && response.data._id) {
          // Add to available companies using the ID from the database
          const newCompanyOption = {
            value: response.data._id, // Use the MongoDB ObjectId
            label: newCompany,
          };

          setQuestion((prev) => ({
            ...prev,
            companies: [...(prev.companies || []), newCompanyOption],
            availableCompanies: [...prev.availableCompanies, newCompanyOption],
          }));
        }

        setNewCompany("");
        setShowCompanyModal(false);

        // Clear companies error
        setErrors((prev) => ({
          ...prev,
          companies: "",
        }));

        // Show success toast
        toast.success("Company added successfully!", {
          position: "top-right",
          autoClose: true,
        });
      } else {
        console.error("Failed to add company:", response.message);
        // Show error toast
        toast.error(response.message || "Failed to add company", {
          position: "top-right",
          autoClose: true,
        });
      }
    } catch (error) {
      console.error("Error adding company:", error);
      // Show error toast
      toast.error("An error occurred while adding the company", {
        position: "top-right",
        autoClose: true,
      });
    }
  };

  // Handle adding an example
  const handleAddExample = () => {
    setQuestion((prev) => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "", inputType: "" }],
    }));

    // Clear examples error
    setErrors((prev) => ({
      ...prev,
      examples: "",
    }));
  };

  // Handle adding a test case
  const handleAddTestCase = () => {
    setQuestion((prev) => ({
      ...prev,
      testCases: [
        ...prev.testCases,
        { input: "", expectedOutput: "", inputType: "" },
      ],
    }));

    // Clear testCases error
    setErrors((prev) => ({
      ...prev,
      testCases: "",
    }));
  };

  // Handle removing an example
  const handleRemoveExample = (index) => {
    const updatedExamples = question.examples.filter((_, i) => i !== index);
    setQuestion((prev) => ({
      ...prev,
      examples: updatedExamples,
    }));
  };

  // Handle removing a test case
  const handleRemoveTestCase = (index) => {
    const updatedTestCases = question.testCases.filter((_, i) => i !== index);
    setQuestion((prev) => ({
      ...prev,
      testCases: updatedTestCases,
    }));
  };

  // Handle changes in examples and test cases
  const handleExampleChange = (index, field, value) => {
    const updatedExamples = [...question.examples];
    updatedExamples[index][field] = value;
    setQuestion((prev) => ({
      ...prev,
      examples: updatedExamples,
    }));

    // Clear examples error
    setErrors((prev) => ({
      ...prev,
      examples: "",
    }));
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...question.testCases];
    updatedTestCases[index][field] = value;
    setQuestion((prev) => ({
      ...prev,
      testCases: updatedTestCases,
    }));

    // Clear testCases error
    setErrors((prev) => ({
      ...prev,
      testCases: "",
    }));
  };

  // Validate form before submission
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Title validation
    if (!question.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    // Description validation
    if (!question.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    // Topics validation
    if (!question.topics || question.topics.length === 0) {
      newErrors.topics = "At least one topic is required";
      isValid = false;
    }

    // Tags validation
    if (!question.tags || question.tags.length === 0) {
      newErrors.tags = "At least one tag is required";
      isValid = false;
    }

    // Company validation
    if (!question.companies || question.companies.length === 0) {
      newErrors.companies = "At least one company is required";
      isValid = false;
    }

    // Difficulty validation
    if (!question.difficulty) {
      newErrors.difficulty = "Difficulty level is required";
      isValid = false;
    }

    // Premium question validation
    if (
      question.isPremium &&
      (!question.rewardPoints || question.rewardPoints <= 0)
    ) {
      newErrors.rewardPoints =
        "Premium questions require reward points greater than 0";
      isValid = false;
    }

    // Examples validation
    if (!question.examples || question.examples.length === 0) {
      newErrors.examples = "At least one example is required";
      isValid = false;
    } else {
      // Check if all example fields are filled
      const incompleteExamples = question.examples.some(
        (example) => !example.input || !example.output || !example.inputType
      );

      if (incompleteExamples) {
        newErrors.examples = "All example fields must be completed";
        isValid = false;
      }
    }

    // Test cases validation
    if (!question.testCases || question.testCases.length === 0) {
      newErrors.testCases = "At least one test case is required";
      isValid = false;
    } else {
      // Check if all test case fields are filled
      const incompleteTestCases = question.testCases.some(
        (testCase) =>
          !testCase.input || !testCase.expectedOutput || !testCase.inputType
      );

      if (incompleteTestCases) {
        newErrors.testCases = "All test case fields must be completed";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Extract the needed data from the form fields
      const {
        title,
        description,
        difficulty,
        isPremium,
        rewardPoints,
        topics,
        companies,
        tags,
        examples,
        testCases,
      } = question;

      // Format data according to backend model requirements
      // For debugging purposes
      console.log("Before formatting:", { topics, companies, tags });

      // Map difficulty to match backend enum values (capitalized)
      const difficultyMapping = {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
      };

      // Call the addCodingQuestion function with properly formatted parameters
      const response = await addCodingQuestion(
        title,
        description,
        rewardPoints,
        difficultyMapping[difficulty],
        isPremium,
        topics.map((topic) => topic.value), // Just the topic ID values
        companies.map((company) => company.value), // Just the company ID values
        tags.map((tag) => tag.value), // Just the tag string values
        examples,
        testCases
      );
      console.log(response);
      if (response.success) {
        toast.success("Coding Problem Added Successfully!");
        setTimeout(() => {
          navigate("/coding-questions");
        }, 3000);
      } else {
        toast.error("Failed to add coding problem");
      }
    } else {
      console.log("Form has errors, please correct them");
    }
  };

  return (
    <>
      <ToastContainer />
      <h2 className="text-lg font-medium mt-4 pl-2">
        Add & Edit Coding Question:
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="flex flex-col mt-4 justify-start items-start gap-y-1">
          <label className="text-base pl-1">Question Title:</label>
          <input
            type="text"
            name="title"
            value={question.title}
            onChange={handleChange}
            className={`w-96 p-2 rounded-md ring-1 ring-inset ${
              errors.title ? "ring-red-500" : "ring-gray-400"
            } focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2`}
            placeholder="Enter question title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col mt-4 gap-y-1 justify-start items-start">
          <label className="text-base pl-1">Description:</label>
          {/* <Ckeditor
            // editor={ClassicEditor}
            data={question.description}
            onChange={handleDescriptionChange}
          /> */}
          <textarea
            name="description"
            id="description"
            value={question.description}
            onChange={handleChange}
            className={`w-2xl h-40 p-2 rounded-md ring-1 ring-inset ${
              errors.description ? "ring-red-500" : "ring-gray-400"
            } focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* New Fields: isPremium, rewardPointsRequired, and difficulty */}
        <div className="flex flex-row justify-start gap-x-16 mt-4">
          {/* isPremium Checkbox */}
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="isPremium"
              name="isPremium"
              checked={question.isPremium}
              onChange={handleChange}
              className="w-4 h-4 accent-[#5652B7]"
            />
            <label htmlFor="isPremium" className="text-base">
              Premium Question
            </label>
          </div>

          {/* Reward Points Required */}
          <div className="flex flex-col justify-start items-start gap-y-1">
            <label htmlFor="rewardPoints" className="text-base pl-1">
              Reward Points Required:
            </label>
            <input
              type="number"
              id="rewardPoints"
              name="rewardPoints"
              value={question.rewardPoints}
              onChange={handleChange}
              className={`w-48 p-2 rounded-md ring-1 ring-inset ${
                errors.rewardPoints ? "ring-red-500" : "ring-gray-400"
              } focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2`}
              placeholder="Enter reward points"
              min="0"
            />
            {errors.rewardPoints && (
              <p className="text-red-500 text-sm mt-1">{errors.rewardPoints}</p>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex flex-col justify-start items-start gap-y-1">
            <label htmlFor="difficulty" className="text-base pl-1">
              Difficulty Level:
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={question.difficulty}
              onChange={handleChange}
              className={`w-48 h-10 p-2 rounded-md ring-1 ring-inset ${
                errors.difficulty ? "ring-red-500" : "ring-gray-400"
              } focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2`}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.difficulty && (
              <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-start gap-x-16">
          {/* Topics */}
          <div className="flex flex-col mt-4 justify-start items-start gap-y-1">
            <label className="text-base pl-1">Topics:</label>
            <Select
              isMulti
              options={question.availableTopics}
              value={question.topics}
              onChange={(selectedOptions) => {
                setQuestion((prev) => ({
                  ...prev,
                  topics: selectedOptions,
                }));
                // Clear error
                if (selectedOptions && selectedOptions.length > 0) {
                  setErrors((prev) => ({
                    ...prev,
                    topics: "",
                  }));
                }
              }}
              placeholder="Select topics"
              className="w-48"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: errors.topics
                    ? "#ef4444"
                    : baseStyles.borderColor,
                  boxShadow: errors.topics
                    ? "0 0 0 1px #ef4444"
                    : baseStyles.boxShadow,
                }),
              }}
            />
            <button
              type="button"
              onClick={() => setShowTopicModal(true)}
              className="text-sm text-blue-500 pl-1"
            >
              + Add Topic
            </button>
            {errors.topics && (
              <p className="text-red-500 text-sm mt-1">{errors.topics}</p>
            )}
          </div>

          {/* Companies */}
          <div className="flex flex-col mt-4 justify-start items-start gap-y-1">
            <label className="text-base pl-1">Companies:</label>
            <Select
              isMulti
              options={question.availableCompanies}
              value={question.companies}
              onChange={(selectedOptions) => {
                setQuestion((prev) => ({
                  ...prev,
                  companies: selectedOptions,
                }));
                // Clear error
                if (selectedOptions && selectedOptions.length > 0) {
                  setErrors((prev) => ({
                    ...prev,
                    companies: "",
                  }));
                }
              }}
              placeholder="Select companies"
              className="w-48"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: errors.companies
                    ? "#ef4444"
                    : baseStyles.borderColor,
                  boxShadow: errors.companies
                    ? "0 0 0 1px #ef4444"
                    : baseStyles.boxShadow,
                }),
              }}
            />
            <button
              type="button"
              onClick={() => setShowCompanyModal(true)}
              className="text-sm text-blue-500 pl-1"
            >
              + Add Company
            </button>
            {errors.companies && (
              <p className="text-red-500 text-sm mt-1">{errors.companies}</p>
            )}
          </div>

          {/* Tags Multi-Select */}
          <div className="flex flex-col mt-4 justify-start items-start gap-y-1">
            <label className="text-base pl-1">Tags:</label>
            <Select
              isMulti
              options={question.availableTags}
              value={question.tags}
              onChange={(selectedOptions) => {
                setQuestion((prev) => ({
                  ...prev,
                  tags: selectedOptions,
                }));
                // Clear error
                if (selectedOptions && selectedOptions.length > 0) {
                  setErrors((prev) => ({
                    ...prev,
                    tags: "",
                  }));
                }
              }}
              placeholder="Select tags"
              className="w-48"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: errors.tags ? "#ef4444" : baseStyles.borderColor,
                  boxShadow: errors.tags
                    ? "0 0 0 1px #ef4444"
                    : baseStyles.boxShadow,
                }),
              }}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
            )}
          </div>
        </div>

        {/* Examples */}
        <div className="flex flex-col mt-4 justify-start items-start gap-y-1">
          <label className="text-base pl-1">Examples:</label>
          {question.examples.map((example, index) => (
            <div key={index} className="flex space-x-2 mb-2 items-center">
              <input
                type="text"
                value={example.input}
                onChange={(e) =>
                  handleExampleChange(index, "input", e.target.value)
                }
                className="w-48 p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
                placeholder="Input"
              />
              <input
                type="text"
                value={example.output}
                onChange={(e) =>
                  handleExampleChange(index, "output", e.target.value)
                }
                className="w-48 p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
                placeholder="Output"
              />
              <select
                value={example.inputType}
                onChange={(e) =>
                  handleExampleChange(index, "inputType", e.target.value)
                }
                className="w-48 h-10 p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
              >
                <option value="" className="hidden">
                  Select Input Type
                </option>
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Array">Array</option>
                <option value="Object">Object</option>
                <option value="Boolean">Boolean</option>
              </select>
              <input
                type="text"
                value={example.target}
                onChange={(e) =>
                  handleExampleChange(index, "target", e.target.value)
                }
                className="w-48 p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
                placeholder="Target Value"
              />
              <img
                src={remove_logo}
                alt="remove"
                className="w-7 h-7 cursor-pointer"
                onClick={() => handleRemoveExample(index)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddExample}
            className="px-4 py-2 bg-[#5652B7] text-white rounded-md hover:bg-[#6461BD] shadow-md"
          >
            Add Example
          </button>
          {errors.examples && (
            <p className="text-red-500 text-sm mt-1">{errors.examples}</p>
          )}
        </div>

        {/* Test Cases */}
        <div className="flex flex-col mt-4 justify-start items-start gap-y-1">
          <label className="text-base pl-1">Test Cases</label>
          {question.testCases.map((testCase, index) => (
            <div key={index} className="flex space-x-2 mb-2 items-center">
              <input
                type="text"
                value={testCase.input}
                onChange={(e) =>
                  handleTestCaseChange(index, "input", e.target.value)
                }
                className="w-48 p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
                placeholder="Input"
              />
              <input
                type="text"
                value={testCase.expectedOutput}
                onChange={(e) =>
                  handleTestCaseChange(index, "expectedOutput", e.target.value)
                }
                className="w-48 p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
                placeholder="Expected Output"
              />
              <select
                value={testCase.inputType}
                onChange={(e) =>
                  handleTestCaseChange(index, "inputType", e.target.value)
                }
                className="w-48 h-10 p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
              >
                <option value="" className="hidden">
                  Select Input Type
                </option>
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Array">Array</option>
                <option value="Object">Object</option>
                <option value="Boolean">Boolean</option>
              </select>
              <input
                type="text"
                value={testCase.target}
                onChange={(e) =>
                  handleTestCaseChange(index, "target", e.target.value)
                }
                className="w-48 p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
                placeholder="Target Value"
              />
              <input
                type="checkbox"
                value={testCase.isHidden}
                onChange={(e) =>
                  handleTestCaseChange(index, "isHidden", e.target.checked)
                }
                className="w-4 h-4 accent-[#5652B7]"
                id="isHidden"
              />
              <label htmlFor="isHidden">IsHidden</label>
              <img
                src={remove_logo}
                alt="remove"
                className="w-7 h-7 cursor-pointer"
                onClick={() => handleRemoveTestCase(index)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTestCase}
            className="px-4 py-2 bg-[#5652B7] text-white rounded-md hover:bg-[#6461BD] shadow-md"
          >
            Add Test Case
          </button>
          {errors.testCases && (
            <p className="text-red-500 text-sm mt-1">{errors.testCases}</p>
          )}
        </div>

        <div className="flex mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#5652B7] text-white rounded-md hover:bg-[#6461BD] shadow-md"
          >
            Save Question
          </button>
        </div>
      </form>

      {/* Modal for Adding Topics */}
      {showTopicModal && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-md shadow-lg space-y-4 w-96">
            <h3 className="text-lg font-semibold">Add New Topic</h3>
            <div className="flex flex-col space-y-2">
              <label>Topic</label>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
                placeholder="Enter New topic"
              />
              <button
                onClick={handleAddTopic}
                className="px-4 py-2 bg-[#5652B7] text-white rounded-md hover:bg-[#6461BD] shadow-md"
              >
                Add Topic
              </button>
            </div>
            <button
              onClick={() => setShowTopicModal(false)}
              className="mt-4 bg-gray-500 text-white p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Adding Companies */}
      {showCompnayModel && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-md shadow-lg space-y-4 w-96">
            <h3 className="text-lg font-semibold">Add New Company</h3>
            <div className="flex flex-col space-y-2">
              <label>Company:</label>
              <input
                type="text"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                className="p-2 rounded-md ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-indigo-600 focus:ring-inset focus:ring-2"
                placeholder="Enter New Company Name"
              />
              <button
                onClick={handleAddCompany}
                className="px-4 py-2 bg-[#5652B7] text-white rounded-md hover:bg-[#6461BD] shadow-md"
              >
                Add Company
              </button>
            </div>
            <button
              onClick={() => setShowCompanyModal(false)}
              className="mt-4 bg-gray-500 text-white p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModifyCodingQuestion;
