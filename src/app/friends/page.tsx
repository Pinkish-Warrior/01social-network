"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@components/SearchBar";
import { Suspense } from "react";
import Loading from "@app/loading";
import "@app/globals.css";
import FriendRequestList from "@components/friends/FriendRequestList";
import YourFriendsList from "@components/friends/YourFriendsList";
import PeopleYouMayKnowList from "@components/friends/PeopleYouMayKnow";
import SuggestFriendsList from "@components/friends/SuggestFriendsList";
import { checkAuthStatus } from "../../services/authServices";

interface User {
  id: string;
  email: string;
  nickname?: string;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  [key: string]: any;
}

const FriendsPage : React.FC = () => { 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await checkAuthStatus();
        if (user) {
          setIsAuthenticated(true);
          setUser(user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />; // Use your custom loading component

  if (!isAuthenticated || !user) {
    return (
      <div className="flex justify-center items-center">
        <p>You are not authenticated. Please log in to access this page.</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col-reverse mb-16 md:flex-row justify-between gap-10 pt-12 lg:pt-2 w-full">
      {/* Left Section */}
      <div className="w-full md:w-[60%] xl:w-[60%] flex-grow">
        <div className="flex flex-col gap-6">
          <div className="glassmorphism">
            {/* People You May Know */}
            <Suspense fallback={<Loading />}>
              {user && <PeopleYouMayKnowList userId={user.userId} />}
            </Suspense>
          </div>
          <div className="glassmorphism">
            {/* Friend Suggestions */}
            <Suspense fallback={<Loading />}>
              {user && <SuggestFriendsList userId={user.userId} />}
            </Suspense>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-6 w-full md:w-[40%] xl:w-[40%] lg:mr-0">
        {/* Search Friend */}
        <div className="w-full">
          <SearchBar />
        </div>

        {/* Friend Requests */}
        <div className="hidden lg:block mx-auto">
          <div className="flow-root">
            <Suspense fallback={<Loading />}>
              {user && <FriendRequestList userId={user.userId} />}
            </Suspense>
          </div>
        </div>

        {/* Your Friends */}
        <div className="glassmorphism">
          <Suspense fallback={<Loading />}>
            {user && <YourFriendsList userId={user.userId} />}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
