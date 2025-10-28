const headers = {
  "Content-Type": "application/json",
};

export const getCodingQuestion = async () => {
  const response = await fetch("http://localhost:5000/api/coding-questions", {
    headers,
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const getCodingQuestionById = async (id) => {
  const response = await fetch(
    `http://localhost:5000/api/coding-question-by-id`,
    {
      headers,
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ id }),
    }
  );
  const data = await response.json();
  return data;
};
