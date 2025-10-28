const headers = {
  "Content-Type": "application/json",
};

export const addMockTestQuestion = async (
  categoryId,
  categoryName,
  subcategoryId,
  subcategoryName,
  sectionId,
  sectionName,
  questionText,
  options,
  correctOption,
  explanation
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/add-mock-test-question`,
      {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: JSON.stringify({
          categoryId,
          categoryName,
          subcategoryId,
          subcategoryName,
          sectionId,
          sectionName,
          questionText,
          options,
          correctOption,
          explanation,
        }),
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error adding mock test question:", error);
    throw error;
  }
};

export const getMockTestQuestions = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/get-mock-test-questions`,
    {
      method: "GET",
      credentials: "include",
      headers: headers,
    }
  );
  return response.json();
};
