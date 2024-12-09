import apiClient from './apiClient';

interface User {
  id: string;
  email: string;
  [key: string]: any; // Extendable user properties
}

// Login service
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await apiClient.post<{ user: User }>('/login', { email, password });
    return response.data.user; // Assuming the user data is in response.data.user
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
    console.error('Login error:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Register service
export const register = async (userData: Record<string, any>): Promise<any> => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
    console.error('Registration error:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await apiClient.post("/logout", {}, { withCredentials: true });
    console.log("User logged out successfully:", response.data);

    // Clear localStorage to ensure data is removed
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    console.log("Local storage cleared");
  } catch (error: any) {
    // Log full error details
    console.error("Logout error details:", error);

    const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
    console.error("Logout error message:", errorMessage);

    // Re-throw the error for higher-level handling
    throw new Error(errorMessage);
  }
};



export const checkAuthStatus = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get('/status', {
      withCredentials: true,
    });

    console.log('Auth status response:', response.data);

    // If the response contains userID, user is authenticated
    if (response.data.userID) { 
      console.log('User is authenticated:', response.data.userID);

      // Fetch the user profile using the userID
      const userResponse = await apiClient.get(`/profile/${response.data.userID}/info`, {
        withCredentials: true,
      });

      console.log('User profile response:', userResponse.data);
      return userResponse.data?.user || null;
    }

    console.warn('User is not authenticated');
    return null;
  } catch (error: any) {
    // Handle 401 Unauthorized error (when not authenticated)
    if (error.response && error.response.status === 401) {
      console.warn('User is not authenticated (401)', error.response.data);
      return null;  // Return null when the user is not authenticated
    }

    // Handle other errors
    if (error.response) {
      console.error(`Auth check failed with status ${error.response.status}:`, error.response.data);
    } else {
      console.error('Error during auth check:', error.message);
    }

    return null;
  }
};


