// page.tsx
"use client";  // Add this at the top to mark the file as a client component

import { Suspense, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import ProfileHeader from "@components/user/ProfileHeader";
import UserInfo from "@components/user/UserInfo";
import PostList from "@components/feed/PostList";
import { checkAuthStatus } from '../../../services/authServices';  // Import the checkAuthStatus function

// Define TypeScript interfaces for type safety
interface User {
  id: number;
  first_name: string;
  last_name: string;
  nickname: string;
  email: string;
  avatar: string;
  about_me: string;
  is_private: boolean;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
  numOfFollowees: number;
  numOfFollowers: number;
  numberOfPosts: number;
  mutualFriends: string[];
  isFollowed: boolean;
}

interface Post {
  id: string;
  content: string;
  createdAt: string;
}

interface ProfileData {
  user: User;
  posts: Post[];
  followers: number;
  following: number;
}

type Props = {
  params: {
    userId: string;
  };
};

async function fetchProfileData(userId: string): Promise<ProfileData | null> {
  try {
    const res = await fetch(`http://localhost:8000/profile/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable Next.js caching for dynamic data
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Profile fetch error: ${res.status} - ${errorText}`);
      
      if (res.status === 404) {
        return null;
      }

      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: ProfileData = await res.json();
    return data;
  } catch (error) {
    console.error("Profile data fetching failed:", error);
    return null;
  }
}

export default function ProfilePage({ params }: Props) {
  const { userId } = params;
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const getProfileData = async () => {
      const user = await checkAuthStatus();  // Check authentication status
      if (!user) {
        notFound();  // If not authenticated, show 404
        return;
      }

      const fetchedData = await fetchProfileData(user.id.toString());
      setProfileData(fetchedData);
    };

    getProfileData();
  }, []);  // Run only once after the component mounts

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const { user, posts, followers, following } = profileData;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 pt-12 lg:pt-2 w-full">
      {/* Middle Section */}
      <div className="w-full md:w-[70%] lg:w-[70%] flex-grow">
        <div className="flex flex-col md:gap-6">
          <ProfileHeader user={user} />

          <div className="block md:hidden">
            <UserInfo user={user} />
          </div>

          <Suspense fallback={<div>Loading posts...</div>}>
            {/* Pass posts data to PostList */}
            <PostList posts={posts} />

          </Suspense>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:block md:w-[30%] lg:w-[30%] md:mr-0">
        <UserInfo user={user} />
      </div>
    </div>
  );
}
