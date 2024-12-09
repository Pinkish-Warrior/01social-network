"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@ui/Input";
import TextArea from "@ui/TextArea";
import FileInput from "@ui/FileInput";
import Button from "@ui/Button";
import FormLayout from "@ui/FormLayout";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";

interface NewPostFormValues {
  title: string;
  content: string;
  image?: File | null;
  privacy: string; // "public", "private", "almost_private"
}

const NewPostForm = (): JSX.Element => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<NewPostFormValues>({
    title: "",
    content: "",
    image: null,
    privacy: "public", // default to public
  });

  const [isPending, setIsPending] = useState(false);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [isFileInputVisible, setIsFileInputVisible] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files[0] || null,
      }));

      // Close the file input after selecting a file
      setIsFileInputVisible(false);
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      content: prevValues.content + emojiObject.emoji,
    }));
    // Close the emoji picker after selecting an emoji
    setIsEmojiPickerVisible(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
  
    try {
      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("content", formValues.content);
      if (formValues.image) {
        formData.append("image", formValues.image);
      }
      formData.append("privacy", formValues.privacy);
  
      // Debugging: Convert FormData to a plain object to log the form data
      const data = Object.fromEntries(formData.entries());
      console.log("Submitted Data:", data);
  
      const res = await fetch("http://localhost:8000/post/", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
  
      console.log("Response Status:", res.status);
      const responseBody = await res.text(); // Get the response body as text
      console.log("Response Body:", responseBody);
  
      // Check for both 200 and 201 status codes
      if (res.status === 200 || res.status === 201) {
        router.push("/"); // Redirect to the main page
      } else {
        const errorDetails = JSON.parse(responseBody); // Assuming JSON response on failure
        console.error("Post creation failed:", errorDetails.message || errorDetails);
        alert(`Post creation failed: ${errorDetails.message || 'Please try again later.'}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };
  
  return (
    <FormLayout
      title="Create New Post"
      subtitle="Share your thoughts with the world"
      containerClassName="mt-6 mb-6 lg:mt-4 lg:mb-0 max-w-md mx-auto bg-blue-100 p-4 w-full border rounded-lg shadow-md"
      bodyClassName="space-y-4"
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Post Title"
          type="text"
          id="title"
          name="title"
          placeholder="Enter your post title"
          value={formValues.title}
          onChange={handleChange}
          required
        />

        <TextArea
          label="Content"
          id="content"
          name="content"
          placeholder="What's on your mind?"
          value={formValues.content}
          onChange={handleChange}
          required
        />

        {/* Privacy radio button */}
        <div className="flex flex-row gap-2 mt-2">
          <Input
            type="radio"
            id="public"
            name="privacy"
            value="public"
            label="Public"
            containerClassName="flex flex-row-reverse items-center gap-2"
            onChange={handleChange}
            checked={formValues.privacy === "public"}
          />
          <Input
            type="radio"
            id="private"
            name="privacy"
            value="private"
            label="Private"
            containerClassName="flex flex-row-reverse items-center gap-2"
            onChange={handleChange}
            checked={formValues.privacy === "private"}
          />
          <Input
            type="radio"
            id="almost_private"
            name="privacy"
            value="almost_private"
            label="Almost Private"
            containerClassName="flex flex-row-reverse items-center gap-2"
            onChange={handleChange}
            checked={formValues.privacy === "almost_private"}
          />
        </div>

        {/* Optional Selectors */}
        <div className="flex flex-row gap-2 mt-2">
          {/* Emoji Image Toggle */}
          <div className="relative flex items-center justify-center">
            <Image
              src="/icons/emoji.png"
              alt="emoji"
              width={32}
              height={32}
              className="cursor-pointer p-1 rounded-full"
              onClick={() => setIsEmojiPickerVisible((prev) => !prev)}
            />
            {/* Emoji Picker */}
            {isEmojiPickerVisible && (
              <div className="absolute top-10 left-0 z-10">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          {/* Image Upload Toggle */}
          <div className="relative flex items-center justify-center">
            <Image
              src="/icons/albums.png"
              alt="albums"
              width={32}
              height={32}
              className="cursor-pointer p-1 rounded-full"
              onClick={() => setIsFileInputVisible((prev) => !prev)}
            />
            {/* File Input */}
            {isFileInputVisible && (
              <div className="absolute top-10 left-0 z-10 p-4 bg-white border rounded-lg shadow-lg">
                <FileInput
                  label="Upload an image"
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  inputClassName="mt-2"
                />
              </div>
            )}
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Create Post"}
        </Button>
      </form>
    </FormLayout>
  );
};

export default NewPostForm;
