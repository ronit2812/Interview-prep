const headers = {
  "Content-Type": "application/json",
};

export const addTopic = async (topicName) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/add-topic`,
    {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({ topicName }),
    }
  );

  return response.json();
};

export const getAllTopics = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/get-all-topics`,
    {
      method: "GET",
      headers: headers,
      credentials: "include",
    }
  );

  return response.json();
};

export const addCompany = async (companyName) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/add-company`,
    {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({ companyName }),
    }
  );

  return response.json();
};

export const getAllCompanies = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/get-all-companies`,
    {
      method: "GET",
      headers: headers,
      credentials: "include",
    }
  );

  return response.json();
};

export const addCodingQuestion = async (
  title,
  description,
  rewardPoints,
  difficultyLevel,
  isPremium,
  topics,
  companies,
  tags,
  examples,
  testCases
) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/add-coding-question`,
    {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({
        title,
        description,
        rewardPoints,
        difficultyLevel,
        isPremium,
        topics,
        companies,
        tags,
        examples,
        testCases,
      }),
    }
  );

  return response.json();
};

export const getAllCodingQuestions = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/get-all-coding-questions`,
    {
      method: "GET",
      headers: headers,
      credentials: "include",
    }
  );

  return response.json();
};
