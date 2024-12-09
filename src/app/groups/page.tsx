"use client";
import { useEffect, useState, Suspense } from "react";
import AllGroupsList from "@components/groups/AllGroupsList";
import UserJoinedGroupsList from "@components/groups/UserJoinedGroupsList";
import GroupInvitationList from "@components/groups/GroupInvitationList";
import SearchBar from "@components/SearchBar";
import Loading from "@app/loading";
import "@app/globals.css";
import NewGroupButton from "@components/groups/NewGroupBUtton";
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

const GroupsPage: React.FC = () => {
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
    <div className="flex flex-col mb-16 md:flex-row justify-between gap-10 pt-12 lg:pt-2 w-full">
      {/* Left Section */}
      <div className="w-full md:w-[60%] xl:w-[60%] flex-grow">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center gap-2">
            <div className="flex-1 w-full">
              <SearchBar />
            </div>
            <NewGroupButton />
          </div>

          {/* Group Invitation: For mobile size */}
          <div className="block lg:hidden mx-auto">
            <div className="flow-root">
              <Suspense fallback={<Loading />}>
                {/* <GroupInvitationList userId={String(user.id)} /> */}
              </Suspense>
            </div>
          </div>

          <div className="glassmorphism">
            <Suspense fallback={<Loading />}>
              <AllGroupsList />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-6 w-full md:w-[40%] xl:w-[40%] lg:mr-0">
        {/* Group Invitation: For lg size */}
        <div className="hidden lg:block mx-auto">
          <div className="flow-root">
            <Suspense fallback={<Loading />}>
              {/* <GroupInvitationList userId={String(user.id)} /> */}
            </Suspense>
          </div>
        </div>

        <div>
          <Suspense fallback={<Loading />}>
            {/* <UserJoinedGroupsList userName={user.nickname || user.firstName} /> */}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default GroupsPage;
