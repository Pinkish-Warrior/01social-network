"use client";

import React, { useState, useEffect } from "react";
import CardLayout from "@components/ui/CardLayout";
import Button from "@components/ui/Button";
import Link from "next/link";
import "@app/globals.css";

interface Group {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  creator_id: number;
}

export default function GroupsList() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:8000/groups/", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch groups.");
        }

        const data: Group[] = await response.json(); // Expecting an array
        setGroups(data); // Set the groups array directly
      } catch (error) {
        setError("Failed to fetch groups.");
      }
      setIsLoading(false);
    };

    fetchGroups();

    // Check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const groupsToShow = isMobile || showAll ? groups : groups.slice(0, 4);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section className="mx-auto py-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-center">Groups You May Like</h1>
        <div className="flex justify-center mt-4">
          {!isMobile && groups.length > 4 && (
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

      <div
        className={`px-4 ${
          isMobile
            ? "flex overflow-x-auto space-x-4 scrollbar-hide"
            : "grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6"
        }`}
      >
        {groupsToShow.length > 0 ? (
          groupsToShow.map((group) => (
            <CardLayout
              key={group.id}
              imageSrc={"/img/placeholderImg.png"} // Fallback image since no imageUrl in API response
              imageAlt={group.title}
              width={isMobile ? 280 : 380}
              height={180}
              title={<Link href={`/groups/${group.id}`}>{group.title}</Link>}
              description={group.description}
              memberCount={0} // No members info in response
              containerClassName="relative min-w-[280px] bg-gray-200 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl flex flex-col w-full"
              footerClassName="flex justify-end mr-4 mb-4"
              footerContent={
                <Button
                  type="button"
                  className="w-14 h-14 bg-blue-600 hover:bg-pink-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out"
                >
                  <img
                    src="/icons/join-w.svg"
                    alt="join"
                    width={24}
                    height={24}
                  />
                </Button>
              }
            />
          ))
        ) : (
          <p>No groups found.</p>
        )}
      </div>
    </section>
  );
}
