"use client";
import React, { useState } from "react";
import Image from "next/image";
import Input from "@components/ui/Input";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex w-full items-center bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 relative box-border">
      <Input
        type="text"
        value={searchQuery}
        placeholder="Search here..."
        onChange={handleInputChange}
        inputClassName="bg-transparent outline-none pl-4 pr-12 w-full"
        // You may need to adjust inputClassName if necessary
      />
      <Image
        src="/icons/search.webp"
        alt="search"
        width={20}
        height={20}
        className="absolute right-4"
      />
    </div>
  );
};

export default SearchBar;
