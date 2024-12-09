"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@components/ui/Button";
import { Group } from "data/fakeGroups";
import { getGroupByID } from "@lib/getGroups";
/* import { useAuth } from "@hooks/useAuth"; */

type GroupHeaderProps = {
  groupId: number;
};

export default function GroupHeader({ groupId }: GroupHeaderProps) {
  // Test using random img
  const randomImgUrl = "https://picsum.photos/400/265";

  const [group, setGroup] = useState<Group | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  // Assuming you have an auth hook that provides user data
  /* const { user } = useAuth();
  const userFullName = user?.fullName; // Fetch user full name from auth context */
  // testing mock user
  const userFullName = "Loki Smith";

  useEffect(() => {
    const fetchGroupData = async () => {
      // Pass groupId to getGroups to fetch specific group data
      const group = await getGroupByID(groupId);
      console.log("Fetched group data:", group); // Log fetched group

      if (group) {
        setGroup(group);

        // Check if the logged-in user's full name is in the group members list
        if (userFullName) {
          setIsMember(group.members.includes(userFullName));
        }
      }
      setLoading(false);
    };

    fetchGroupData();
  }, [groupId, userFullName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!group) {
    return <div>Error loading group data</div>;
  }

  return (
    <div className="w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden">
      {/* Cover Image */}
      <div className="relative w-full h-48 md:h-64 lg:h-72">
        <Image
          src={group.imageUrl || randomImgUrl || "/img/placeholderCover.jpg"}
          alt="coverImg"
          fill
          className="object-cover"
        />
      </div>

      {/* Group Info */}
      <div className="p-6 text-center">
        {/* Group Title */}
        <h1 className="text-3xl font-bold text-gray-800">{group.title}</h1>

        {/* Group Description */}
        <p className="mt-2 text-sm text-gray-600">{group.description}</p>

        {/* Social Section */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <Image
            src="/icons/members.webp"
            alt="members"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span className="font-semibold text-gray-700">
            {group.members.length}
          </span>
          <span className="text-gray-500">Members</span>
        </div>

        {/* Follow Button */}
        <Button
          type="button"
          className={`mt-6 px-6 py-2 ${
            isMember ? "bg-green-600" : "bg-blue-600"
          } text-white rounded-full shadow-md hover:${
            isMember ? "bg-green-700" : "bg-blue-700"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="flex items-center space-x-2">
            <Image
              src={isMember ? "/icons/add-user.svg" : "/icons/join-w.svg"}
              alt={isMember ? "Invite Friends" : "Join"}
              width={20}
              height={20}
            />
            <span>{isMember ? "Invite Friends" : "Join"}</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
