"use client";

import { useState } from "react";
import Image from "next/image";

interface PostInteractionProps {
  postId: number;
  likeCount: number;
  commentCount: number;
}

const PostInteraction = ({
  postId,
  likeCount,
  commentCount,
}: PostInteractionProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);
  const [comments, setCommentCount] = useState(commentCount);
  const [newComment, setNewComment] = useState("");

  {
    /* TODO: handoleComment Submit*/
  }
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return; // Prevent empty comments

    // Update comment count optimistically
    setCommentCount((prev) => prev + 1);
    setNewComment(""); // Clear the comment input

    // Optionally, send the comment to the backend here
    // await submitComment(postId, newComment);
  };

  return (
    <div className="flex items-center justify-between mt-2">
      {/* Likes */}
      <div className="flex items-center gap-4  bg-blue-100 p-2 rounded-xl">
        {/* TODO: create likeAction*/}
        <form /* action={likeAction} */>
          <button>
            <Image
              src={isLiked ? "/icons/liked.png" : "/icons/like.png"}
              width={16}
              height={16}
              alt="like"
              className="cursor-pointer"
            />
          </button>
        </form>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500">
          {/* {optimisticLike.likeCount} */}
          {likes} {likeCount === 1 ? "Like" : "Likes"}
        </span>
      </div>

      {/* Comments */}
      <div className="flex items-center gap-2 text-gray-500">
        <Image
          src={"/icons/comment-icon.webp"}
          width={16}
          height={16}
          alt="comment-icon"
          className="cursor-pointer"
        />
        <span>
          {comments} {commentCount === 1 ? "Comment" : "Comments"}
        </span>
      </div>
    </div>
  );
};

export default PostInteraction;
