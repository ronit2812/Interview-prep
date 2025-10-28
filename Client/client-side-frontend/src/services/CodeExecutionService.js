const headers = {
  "Content-Type": "application/json",
};

// Execute code using backend Docker containers
export const executeCode = async (code, language, testCases, questionId) => {
  try {
    const response = await fetch("http://localhost:5000/api/execute", {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({
        code,
        language,
        testCases,
        questionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to execute code");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Code execution error:", error);
    throw error;
  }
};
