"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@components/ui/Button";
import NewEventForm from "@components/form/NewEventForm";

export default function NewEventButton() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="flex-1 w-full">
      <Button
        type="button"
        className="Vibrant_button w-full h-full flex items-center justify-center py-2 px-4"
        onClick={toggleFormVisibility}
      >
        <Image
          src="/icons/create.webp"
          alt="create"
          width={20}
          height={20}
          className="mr-2"
        />
        <span className="text-xs text-gray-800 md:lg">Create A New Event</span>
      </Button>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <NewEventForm onClose={toggleFormVisibility} />
        </div>
      )}
    </div>
  );
}
