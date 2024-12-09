"use client";

import { useEffect, useState } from "react";
import MiniCardLayout from "@components/ui/MiniCardLayout";
import Button from "@components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { checkAuthStatus } from "../../services/authServices"; // Import the auth function

interface Friend {
  id: string;
  first_name: string;
  avatarUrl: string;
  mutualFriends: string[];
  is_followed: boolean;
}

interface YourFriendsListProps {
  // userId will be passed as a prop after authentication
}

const YourFriendsList = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false); // for mobile size layout
  const [userId, setUserId] = useState<string | null>(null); // Store userId here

  useEffect(() => {
    const fetchUserIdAndFriends = async () => {
      try {
        // First, check auth status and get the userId
        const user = await checkAuthStatus(); // Get user data from the auth check
        if (user) {
          setUserId(user.id); // Set the userId when available
        } else {
          setError("User is not authenticated.");
          setIsLoading(false);
        }
      } catch (err) {
        setError("Error fetching user data.");
        setIsLoading(false);
      }
    };

    fetchUserIdAndFriends();

    // Check screen size for mobile responsiveness
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
    };

    // Initial check and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Only fetch friends if userId is available
    if (userId) {
      const fetchYourFriends = async () => {
        try {
          console.log(`Fetching followers for userId: ${userId}`);
          const response = await fetch(`http://localhost:8000/users/${userId}/followers`, { credentials: 'include' });
          if (!response.ok) {
            throw new Error("Failed to fetch followers");
          }

          const data = await response.json();
          console.log("Followers data:", data);

          setFriends(data);
          setIsLoading(false); // Data fetched, stop loading
        } catch (err: any) {
    console.error("Error fetching followers:", err); // Log any errors
    setError("Failed to fetch followers. Please try again later.");
    setIsLoading(false);
  }
      };

      fetchYourFriends();
    }
  }, [userId]); // Only run the fetch when userId is set

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const friendsToShow = showAll ? friends : friends.slice(0, 4);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-center">Your Friends</h1>
        <div className="flex justify-center mt-4">
          {!isMobile && friends.length > 4 && (
            <Button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 hover:underline text-sm leading-none"
            >
              {showAll ? "Show Less" : "View All"}
            </Button>
          )}
        </div>
      </div>
      <div className="flex overflow-x-auto scrollbar-hide md:grid md:grid-cols-1 2xl:grid-cols-2 gap-4">
      {friendsToShow && friendsToShow.length > 0 ? (
  friendsToShow.map((friend) => (
    <MiniCardLayout
      key={friend.id}
      imageSrc={friend.avatarUrl || "/img/placehodlerImg.png"}
      imageAlt={friend.first_name}
      width={100}
      height={100}
      title={
        <Link href={`/profile/${friend.id}`}>
          {friend.first_name}
        </Link>
      }
      context="friend"
      memberCount={friend.mutualFriends?.length || 0}
      imageClassName="rounded-full w-18 h-18 object-cover p-2 m-2 flex justify-center items-center"
      footerClassName="flex justify-between mx-10 my-4"
      footerContent={
        <Button
          type="button"
          className="w-full px-4 py-2 bg-green-400 hover:bg-orange-400 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out"
        >
          <Image
            src="/icons/chat.webp"
            alt="message"
            width={24}
            height={24}
          />
          <span className="text-xs ml-2">Message</span>
        </Button>
      }
    />
  ))
) : (
  <p>No friends found.</p>
)}

      </div>
    </>
  );
};

export default YourFriendsList;
