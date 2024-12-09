"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@img/logo.webp";
import SeeMore from "./SeeMore";
import { checkAuthStatus } from "../services/authServices"; // Ensure this path is correct

export default function Navbar() {
  const [user, setUser] = useState<any>(null);  // Replace 'any' with appropriate type for user
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await checkAuthStatus();  // Expecting the full user object
        if (user) {
          setIsAuthenticated(true);
          setUser(user);  // Set the full user object here
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
  
    getUserData();
  }, []);  // Empty dependency array to run only once when component mounts
  
  return (
    <div className="fixed bottom-0 w-full h-16 justify-center mx-0 lg:top-0 lg:left-0 lg:h-screen lg:w-56 bg-white shadow-md flex flex-row lg:flex-col lg:justify-between items-center lg:items-start z-50">
      <div className="p-1 w-full mx-3 lg:p-4 text-sm text-gray-700 flex-row lg:flex-col gap-4 lg:items-center">
        {/* Logo Section */}
        <div className="w-full justify-start p-4 bg-slate-100 lg:bg-white fixed top-0 left-0 flex lg:static lg:w-auto lg:p-0 z-50">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="01logo"
              width={40}
              height={40}
              placeholder="blur"
            />
            <span>Social-Network</span>
          </Link>
        </div>

        {/* Links Section */}
        {isAuthenticated && user ? (
          <div className="flex flex-1 justify-between lg:flex-col items-center lg:items-start gap-4 lg:gap-6 my-2 lg:my-6 text-gray-600">
            <Link
              href="/"
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:bold hover:text-lg"
            >
              <Image
                src="/icons/home.webp"
                alt="Homepage"
                width={24}
                height={24}
                className="w-6 h-6 hover:w-8 hover:h-8"
              />
              <span className="hidden lg:block">Homepage</span>
            </Link>

            <Link
              href="/friends"
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:bold hover:text-lg"
            >
              <Image
                src="/icons/friends.webp"
                alt="Friends"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="hidden lg:block">Friends</span>
            </Link>
            <Link
              href="/groups"
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:bold hover:text-lg"
            >
              <Image
                src="/icons/groups.webp"
                alt="Groups"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="hidden lg:block">Groups</span>
            </Link>
            <Link
              href="/notifications"
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:bold hover:text-lg"
            >
              <Image
                src="/icons/notifications-S.webp"
                alt="notifications"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="hidden lg:block">Notifications</span>
            </Link>
            <Link
              href="/messages"
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:bold hover:text-lg"
            >
              <Image
                src="/icons/chat.webp"
                alt="notifications"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="hidden lg:block">Messages</span>
            </Link>
            <Link
              href="/events"
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:bold hover:text-lg"
            >
              <Image
                src="/icons/event.webp"
                alt="events"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="hidden lg:block">Events</span>
            </Link>
            <Link
              href={`/profile/${user.id}`}
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:bold hover:text-lg"
            >
              <Image
                src="/icons/profile.webp"
                alt="profile"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="hidden lg:block">Profile</span>
            </Link>
            {/* burger menu, only display here when mobile size */}
            <div className="lg:hidden flex items-center gap-0">
              <SeeMore />
            </div>
          </div>
        ) : (
          <div className="flex justify-end mr-8 flex-1 lg:flex-col my-0 mx-2 lg:mt-6 gap-6 text-gray-600 w-full">
            <Link
              href={`/login`}
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:bold hover:text-lg"
            >
              <Image
                src="/icons/login.webp"
                alt="login"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="hidden lg:block">Login</span>
            </Link>
            <Link
              href={`/register`}
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:bold hover:text-lg"
            >
              <Image
                src="/icons/signup.webp"
                alt="register"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="hidden lg:block">Register</span>
            </Link>
          </div>
        )}
      </div>

      {isAuthenticated && user ? (
        <div className="hidden p-4 text-sm text-gray-700 lg:w-full lg:flex justify-between gap:0 lg:items-center">
          {/* User Profile Section */}
          <div className="hidden lg:flex items-center gap-2">
          <Image
              src={user?.profileImageUrl || "/img/default-profile.webp"}
              alt={user?.nickname || "User"}
              width={32}
              height={32}
              className="rounded-full w-8 h-8"
            />
            <span className="text-gray-700">{user?.email}</span>
          </div>
          {/* burger menu */}
          <div className="hidden lg:flex items-center gap-0">
            <SeeMore />
          </div>
        </div>
      ) : null}
    </div>
  );
}
