"use client";

import React, { useEffect, useState } from "react";
import MiniCardLayout from "@components/ui/MiniCardLayout";
import Button from "@components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import "@app/globals.css";
import { getGroups } from "@lib/getGroups";

interface Group {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  creator_id: number;
  imageUrl: string;
  members: string[];
}

interface UserJoinedGroupsListProps {
  userName: string;
  layout?: "detailed" | "compact"; // Layout prop
}

const UserJoinedGroupsList = ({
  userName,
  layout = "detailed",
}: UserJoinedGroupsListProps) => {
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false); //mobile size is display as slide, so can show all

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data: Group[] = await getGroups(); // Fetch all groups
        const userGroups = data.filter((group) =>
          group.members.includes(userName)
        );
        setJoinedGroups(userGroups);
      } catch (error) {
        console.error("Error fetching groups data:", error);
        setError("Failed to load groups");
      } finally {
        setIsLoading(false);
      }
    };
    // Invokes the fetchGroups function to fetch the groups data
    fetchGroups();
    // Check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
    };

    // Initial check and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [userName]);

  // Limit the number of groups shown if not mobile and not showing all
  const groupsToShow =
    isMobile || showAll ? joinedGroups : joinedGroups.slice(0, 2);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const containerClassName =
    layout === "compact"
      ? "flex flex-col gap-1 w-fit mx-0 overflow-y-auto" // Flex column for compact layout
      : "flex overflow-x-auto scrollbar-hide md:grid md:grid-cols-1 2xl:grid-cols-2 gap-4";

  {
    /*TODO: add Link to each group detail page */
  }
  return (
    <aside className="mx-auto py-2 px-2 ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-center">
          {layout === "compact" ? "Your Groups" : "Groups You've Joined"}
        </h1>
        <div className="flex justify-center mt-4">
          {!isMobile && joinedGroups.length > 2 && (
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
      {/* Conditionally render the hr tag if layout is compact */}
      {layout === "compact" && <hr className="my-1 border-gray-300 w-full" />}
      {joinedGroups.length > 0 ? (
        <div className={containerClassName}>
          {groupsToShow.map((group) => (
            <MiniCardLayout
              key={group.id}
              imageSrc={group.imageUrl || "/img/placehodlerImg.png"}
              imageAlt={group.title}
              width={100}
              height={100}
              title={<Link href={`/groups/${group.id}`}>{group.title}</Link>}
              context="group"
              memberCount={group.members.length}
              containerClassName={
                layout === "detailed"
                  ? "relative bg-gray-200 overflow-hidden rounded-lg shadow-lg flex flex-col"
                  : "flex flex-col"
              }
              imageClassName={
                layout === "detailed"
                  ? "rounded-full w-18 h-18 object-cover p-2 m-2 flex justify-center items-center"
                  : " rounded-full w-12 h-12 object-cover p-1 m-1 flex justify-center items-center"
              }
              footerClassName={
                layout === "detailed" ? "flex justify-between mx-10 my-4" : ""
              }
              footerContent={
                layout === "detailed" && (
                  <Button
                    type="button"
                    className="w-full px-4 py-2 bg-blue-300 hover:bg-pink-300 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out"
                  >
                    <Image
                      src="/icons/leave.svg"
                      alt="join"
                      width={24}
                      height={24}
                    />
                    <span className="text-xs ml-2">Leave Group</span>
                  </Button>
                )
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven't joined any groups yet.</p>
      )}
    </aside>
  );
};

export default UserJoinedGroupsList;
