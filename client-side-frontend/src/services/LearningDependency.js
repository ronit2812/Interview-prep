const headers = {
  "Content-Type": "application/json",
};

export const getAllLearningCategories = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/get-all-learning-categories`,
      {
        headers: headers,
        credentials: "include",
        method: "GET",
      }
    );

    if (!response.ok) {
      console.error("API error:", response.status, response.statusText);
      // If API fails, return hardcoded categories for now
      return ["Programming Languages", "Aptitude Courses"];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // If API fails, return hardcoded categories
    return ["Programming Languages", "Aptitude Courses"];
  }
};

export const getAllLearningSubCategories = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/get-all-learning-sub-categories`,
      {
        headers: headers,
        credentials: "include",
        method: "GET",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sub categories:", error);
    return [];
  }
};

export const getAllLearningContents = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/get-all-learning-contents`,
      {
        headers: headers,
        credentials: "include",
        method: "GET",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching learning contents:", error);
    return [];
  }
};

export const getLearningContentById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/get-learning-content-by-id`,
      {
        headers: headers,
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ id }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching learning content by ID:", error);
    return [];
  }
};
