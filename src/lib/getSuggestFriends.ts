import { fakeSuggestFriends,SuggestFriend} from "@data/fakeFollowers";

// later use
// Function to fetch user who had multual friends with you from the real backend
/*  export const getSuggestFriends = async (userId: number): Promise<SuggestFriend[]> => {
  try {
    const response = await fetch(`/api/users/${userId}/suggestions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch suggest friends"); 
    }

    const suggestFriends: SuggestFriend[] = await response.json(); 
    return suggestFriends;
  } catch (error) {
    console.error("Error fetching suggest friends:", error);
    throw new Error("Failed to fetch suggest friends"); // Updated error message
  }
};
   */

// for testing only
export const getSuggestFriends = async (userId: string): Promise<SuggestFriend[]> => {
  // Simulating a fetch call with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));// Simulate async operation
  return fakeSuggestFriends;
};

