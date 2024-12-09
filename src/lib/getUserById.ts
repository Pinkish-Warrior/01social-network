import { fakeUsers,User} from "@data/fakeUsers";

// Function to fetch user details by ID
/*     export async function getUserById(userId: string): Promise<User | null> {
  try {
   // Correct URL interpolation using backticks
   const response = await fetch(`http://localhost:8000/profile/${userId}`, {
    method: "GET",
    credentials: "include", // This ensures cookies are sent with the request
  });
    
    if (!response.ok) {
      const errorText = await response.text(); // Capture error message
      console.error('Failed to fetch user details:', errorText);
      throw new Error('Failed to fetch user details');
    }
    
    const data = await response.json();
    return data.user || null;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}    */


// only for testing, fetch fake users
    export const getUserById = async (userId: string): Promise<User | null> => {
    try {
      console.log(`Fetching user with ID: ${userId}`); // Debugging statement
  
      return new Promise<User | null>((resolve) => {
        setTimeout(() => {
          // Log the entire fakeUsers array
          console.log('Available users:', fakeUsers);
  
          // Check the type of userId
          console.log(`Type of userId: ${typeof userId}`);
  
          // Find the user by ID
          const user = fakeUsers.find((user) => {
            console.log(`Comparing user.id: ${user.id} with userId: ${userId}`);
            return user.id === userId;
          });
  
          // Log the user found or not
          if (user) {
            console.log(`Found user:`, user);
          } else {
            console.log(`User with ID ${userId} not found.`);
          }
  
          resolve(user || null);
        }, 1000); // Simulate a 1-second delay
      });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  };  
   