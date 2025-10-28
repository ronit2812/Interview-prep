// Category Fields
export const getCategory = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/learning/get-categories`,
    {
      method: "GET",
    }
  );
  return response.json();
};

export const addNewCategory = async (CategoryName) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/learning/learning-category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ categoryName: CategoryName }),
    }
  );
  return response.json();
};

// Sub Category field
export const getSubCategories = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/learning/get-sub-category`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  return response.json();
};

export const addNewSubCategory = async (
  CategoryId,
  CategoryName,
  SubCategoryName
) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/learning/learning-sub-category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        categoryId: CategoryId,
        categoryName: CategoryName,
        subCategoryName: SubCategoryName,
      }),
    }
  );
  return response.json();
};

// Learning Section APIs
export const addLearningSection = async (
  subcategoryId,
  subcategoryName,
  sectionName
) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/learning/learning-section`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ subcategoryId, subcategoryName, sectionName }),
    }
  );
  return response.json();
};

export const getLearningSection = async (subcategoryId) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/learning/get-section?subcategoryId=${subcategoryId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  return response.json();
};

// Learning SubSection APIs
export const addLearningSubSection = async (
  sectionId,
  sectionName,
  subSectionName
) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/learning/learning-sub-section`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ sectionId, sectionName, subSectionName }),
    }
  );
  return response.json();
};

export const getLearningSubSection = async (sectionId) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/learning/get-sub-section?sectionId=${sectionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  return response.json();
};

// Learning Content APIs
export const addLearningContent = async (
  categoryId,
  categoryName,
  subCategoryId,
  subCategoryName,
  sectionId,
  sectionName,
  subSectionId,
  subSectionName,
  content
) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/learning/add-learning-content`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        categoryId,
        categoryName,
        subCategoryId,
        subCategoryName,
        sectionId,
        sectionName,
        subSectionId,
        subSectionName,
        content,
      }),
    }
  );
  return response.json();
};

export const getAllLearningContent = async () => {
  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/learning/get-all-learning-content`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  return response.json();
};

export const getLearningContentById = async (id) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/learning/get-learning-content-by-id`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    }
  );
  return response.json();
};

export const updateLearningContent = async (
  id,
  categoryId,
  categoryName,
  subCategoryId,
  subCategoryName,
  sectionId,
  sectionName,
  subSectionId,
  subSectionName,
  content
) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/learning/update-learning-content`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id,
        categoryId,
        categoryName,
        subCategoryId,
        subCategoryName,
        sectionId,
        sectionName,
        subSectionId,
        subSectionName,
        content,
      }),
    }
  );
  return response.json();
};

export const deleteLearningContent = async (id) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/learning/delete-learning-content`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    }
  );
  return response.json();
};
