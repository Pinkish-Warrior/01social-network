import { fakeFollowers,Follower} from "@data/fakeFollowers";


// later use
/*export const getYourFriends = async (userId: number): Promise<Friend[]> => {
  try {
    const response = await fetch(`/api/users/${userId}/friends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch friends");
    }

    const friends: Friend[] = await response.json(); // Correct type declaration for friends array
    return friends;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw new Error("Failed to fetch friends");
  }
};
 */

// Adjusted getYourFriends function
export const getYourFriends = async (userId: string): Promise<Follower[]> => {
  // Simulating a fetch call with a delay
  return new Promise<Follower[]>(resolve => {
    setTimeout(() => {
      // Filter or modify the fakeFriendsData as necessary
      const friends = fakeFollowers.filter(follower => follower.is_followed);
      resolve(friends);
    }, 1000); // Simulate network delay
  });
};

