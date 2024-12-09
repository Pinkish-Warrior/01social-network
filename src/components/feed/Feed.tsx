// Feed.tsx
import React, { useState } from "react";
import NewPostForm from "../form/NewPostForm";
import Button from "../ui/Button";
import Image from "next/image";
import PostList from "./PostList";

const Feed = () => {
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [posts, setPosts] = useState([]); // State to hold posts data

  const handleToggleForm = () => {
    setIsAddingPost((prev) => !prev);
  };

  return (
    <div>
      {!isAddingPost ? (
        <>
          <Button
            type="button"
            onClick={handleToggleForm}
            className="w-auto max-w-md mx-4 mt-6 lg:mt-2 mb-4 px-4 py-2 bg-yellow-200 text-gray-800 rounded shadow-md transition ease-out duration-300 hover:bg-teal-500 hover:text-gray-100 flex items-center justify-center"
          >
            <Image
              src="/icons/create.webp"
              alt="create"
              width={20}
              height={20}
              className="mr-2"
            />
            <span>Add Post</span>
          </Button>
          <PostList /> {/* Pass posts data to PostList */}
        </>
      ) : (
        <>
          <Button
            type="button"
            onClick={handleToggleForm}
            className="w-auto max-w-md mx-4 mt-6 lg:mt-2 mb-4 px-4 py-2 bg-yellow-200 text-black rounded shadow-md transition ease-out duration-300 hover:bg-teal-500 hover:text-white flex items-center justify-center"
          >
            <Image
              src="/icons/close.webp"
              alt="create"
              width={20}
              height={20}
              className="mr-2"
            />
            <span>Close Form</span>
          </Button>
          <NewPostForm />
        </>
      )}
    </div>
  );
};

export default Feed;
