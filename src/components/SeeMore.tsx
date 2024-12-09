"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { logout } from "../services/authServices"; // Ensure correct path

export default function SeeMore() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // Initialize router for navigation

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle logout function
  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await logout(); // Call logout from authServices
      console.log("Logout successful");
      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Close the menu if clicked outside or if "Escape" is pressed
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Burger-menu icon */}
      <div onClick={toggleMenu} className="cursor-pointer">
        <Image
          src="/icons/hamburger-menu.webp"
          alt="hamburger-menu"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute p-2 justify-end bottom-full mb-4 right-0 w-32 bg-white shadow-lg rounded-md">
          {/* Logout Option */}
          <div
            onClick={handleLogout}
            className="flex justify-end items-center gap-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black hover:font-bold"
          >
            <Image
              src="/icons/logout.webp"
              alt="logout"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}
