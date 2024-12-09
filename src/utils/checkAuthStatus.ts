import axios from 'axios';

export const checkAuth = async (): Promise<string> => {
  try {
    const res = await axios.get<{ userID: string }>("http://localhost:8000/status", {
      withCredentials: true, // Ensure cookies are included with the request
    });

    if (res.status === 200) {
      console.log("User is authenticated:", res.data);
      return res.data.userID; // Assuming the server returns the user ID
    } else {
      console.warn("Unauthorized request:", res.status);
      throw new Error("Unauthorized. Please log in.");
    }
  } catch (error: any) {
    console.error("Failed to check auth status:", error.response?.data || error.message);
    throw error; // Re-throw the error to be handled elsewhere
  }
};
