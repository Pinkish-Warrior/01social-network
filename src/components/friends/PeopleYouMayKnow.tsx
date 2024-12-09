"use client";

import { useEffect, useState } from "react";
import MiniCardLayout from "@components/ui/MiniCardLayout";
import { getYourFollowers } from "@lib/getYourFolloers"; // hypothetical API call
import Button from "@components/ui/Button";
import Image from "next/image";
import Link from "next/link";

interface Follower {
  id: string;
  user_full_name: string;
  avatarUrl: string;
  mutualFriends: string[];
  is_followed: boolean;
}

interface PeopleYouMayKnowListProps {
  userId: string;
}

const PeopleYouMayKnowList = ({ userId }: PeopleYouMayKnowListProps) => {
  const [friends, setFriends] = useState<Follower[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false); //mobile size is display as slide, so can show all

  useEffect(() => {
    const fetchYourFollowers = async () => {
      try {
        const response = await getYourFollowers(userId);
        setFriends(response);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load friends. Please try again.");
        setIsLoading(false);
      }
    };

    fetchYourFollowers();
    // Check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
    };

    // Initial check and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [userId]);

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
        <h1 className="text-2xl font-bold text-center">People You May Know</h1>
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
      <div className="flex overflow-x-auto scrollbar-hide md:grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {friendsToShow.length > 0 ? (
          friendsToShow.map((friend) => (
            <MiniCardLayout
              key={friend.id}
              imageSrc={friend.avatarUrl || "/img/placehodlerImg.png"}
              imageAlt={friend.user_full_name}
              width={100}
              height={100}
              title={
                <Link href={`/profile/${friend.id}`}>
                  {friend.user_full_name}
                </Link>
              }
              context="friend"
              memberCount={friend.mutualFriends.length}
              imageClassName="rounded-full w-18 h-18 object-cover p-2 m-2 flex justify-center items-center"
              footerClassName="flex justify-between mx-10 my-4"
              footerContent={
                <Button
                  type="button"
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600  rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out"
                >
                  <Image
                    src="/icons/add-user-b.svg"
                    alt="follow"
                    width={24}
                    height={24}
                  />
                  <span className="text-xs ml-2">Follow</span>
                </Button>
              }
            />
          ))
        ) : (
          <p>No friend found.</p>
        )}
      </div>
    </>
  );
};

export default PeopleYouMayKnowList;
