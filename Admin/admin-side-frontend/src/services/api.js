const headers = { "Content-Type": "application/json" };

export const registerAdminStaff = async (formData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/register-admin-data`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      const data = response.json();
      return data;
    } else if (response.status === 409) {
      throw new Error("Email is already in use!");
    } else if (response.status === 400) {
      throw new Error("All Fields are required!");
    }
  } catch (error) {
    console.error("ERROR :: adding or registering admin: ", error);
    throw error;
  }
};

export const loginAdminUser = async (loginData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/login-admin-user`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(loginData),
        credentials: "include",
      }
    );
    if (response.status === 404) {
      throw new Error("User Not Found");
    } else if (response.status === 401) {
      throw new Error("Invalid Credentials. Please try again...!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ERROR :: login admin: ", error);
    throw error;
  }
};

export const getAdminUsers = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/get-admin-users`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch admin users: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("ERROR :: getting Admin users: ", error);
    throw error;
  }
};

export const autheticateAdminUserById = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/authenticate-user/${id}`,
      {
        method: "PUT",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to authenticate user");
    }
    return await response.json();
  } catch (error) {
    console.error("ERROR :: getting admin by ID: ", error);
    throw error;
  }
};
