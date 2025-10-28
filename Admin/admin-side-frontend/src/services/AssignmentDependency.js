const headers = {
  "Content-Type": "application/json",
};

export const addAssignmentQuestions = async (
  questionText,
  choiceType,
  difficulty,
  options,
  category,
  subCategory,
  section
) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/add-assignment-questions`,
    {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({
        questionText,
        choiceType,
        difficulty,
        options,
        category,
        subCategory,
        section,
      }),
    }
  );

  return response.json();
};

export const getAllAssignmentQuestions = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/get-all-assignment-questions`,
    {
      method: "GET",
      headers: headers,
      credentials: "include",
    }
  );

  return response.json();
};

export const getAssignmentQuestionById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/get-assignment-question-by-id`,
    {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({ id }),
    }
  );

  return response.json();
};

export const updateAssignmentQuestionById = async (
  id,
  questionText,
  choiceType,
  difficulty,
  options,
  category,
  subCategory,
  section
) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/update-assignment-question-by-id`,
    {
      method: "PUT",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({
        id,
        questionText,
        choiceType,
        difficulty,
        options,
        category,
        subCategory,
        section,
      }),
    }
  );

  return response.json();
};

export const deleteAssignmentQuestionById = async (id) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/delete-assignment-question-by-id`,
    {
      method: "DELETE",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({ id }),
    }
  );

  return response.json();
};
