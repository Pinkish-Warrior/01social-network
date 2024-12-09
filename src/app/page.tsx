'use client';

import React, { useState, useEffect } from 'react';
import { checkAuthStatus } from '../services/authServices';
import Feed from '../components/feed/Feed';
// Uncomment the following as needed
import AttendEventsList from '../components/eventList/AttendEventsList';
// import RightSection from '../components/rightSection/RightSection';

interface User {
  id: string;
  email: string;
  nickname?: string;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  [key: string]: any;
}

const HomePage: React.FC = () => {
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

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated || !user) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <p>Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-10 pt-6 lg:pt-1 w-full">
      {/* Middle Section */}
      <div className="w-full md:w-[70%] xl:w-[50%] flex-grow">
        <div className="flex flex-col gap-6">
          <Feed />
        </div>
      </div>

      {/* EventList Section */}
      <div className="hidden xl:block xl:w-[30%]">
        {/* Uncomment the following line to enable events */}
        {/* <AttendEventsList user={user} /> */}
      </div>

      {/* Right Section */}
      <div className="hidden md:block md:w-[30%] xl:w-[20%] lg:mr-0 my-4">
        {/* Uncomment the following line to enable the right section */}
        {/* <RightSection userId={user.id} user={user} /> */}
      </div>
    </div>
  );
};

export default HomePage;
