import { fakeFollowers,Follower} from "@data/fakeFollowers";


// later use
// Function to fetch followers from the real backend
/* export const getYourFollowers = async (userId: number): Promise<Follower[]> => {
  try {
    const response = await fetch(`/api/users/${userId}/followers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch followers"); // Updated error message
    }

    const followers: Follower[] = await response.json(); 
    return followers;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw new Error("Failed to fetch followers"); // Updated error message
  }
};
  */

// Adjusted getYourFriends function
export const getYourFollowers = async (userId: string): Promise<Follower[]> => {
  // Simulating a fetch call with a delay
  return new Promise<Follower[]>(resolve => {
    setTimeout(() => {
      // Filter or modify the fakeFriendsData as necessary , if is followed then it should be friends
      const friends = fakeFollowers.filter(follower => !follower.is_followed);
      resolve(friends);
    }, 1000); // Simulate network delay
  });
};

