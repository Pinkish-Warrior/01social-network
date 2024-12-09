"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
}

interface UserProfile {
  id: number;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

interface CommentWithUserData extends Comment {
  userName: string;
  userAvatar: string;
}

interface CommentsProps {
  post_id: number;
}

const Comments: React.FC<CommentsProps> = ({ post_id }) => {
  const [comments, setComments] = useState<CommentWithUserData[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const profileCache = new Map<number, UserProfile>();

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const fetchUserProfile = async (userId: number | null | undefined): Promise<UserProfile> => {
    // Handle null or undefined userId
    if (!userId) {
      console.warn("Invalid userId:", userId);
      return { id: 0, first_name: "Unknown", last_name: "", avatar: "/default-avatar.png" };
    }
  
    // Check if the profile is already cached
    if (profileCache.has(userId)) {
      return profileCache.get(userId)!;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/profile/${userId}/info`, {
        credentials: "include",
      });
  
      if (!response.ok) {
        console.warn(`Failed to fetch profile for userId ${userId}: ${response.status}`);
        return { id: userId, first_name: "Unknown", last_name: "", avatar: "/default-avatar.png" };
      }
  
      const data = await response.json();
  
      // Log to verify the structure of the response
      console.log("User profile response:", data);
  
      // Safeguard: If the response doesn't have necessary data, use fallback
      const userProfile: UserProfile = {
        id: userId,
        first_name: data.user?.first_name || "Unknown",
        last_name: data.user?.last_name || "",
        avatar: data.user?.avatar || "/default-avatar.png",
      };
  
      // Cache the profile
      profileCache.set(userId, userProfile);
      return userProfile;
    } catch (err) {
      console.error(`Error fetching profile for userId ${userId}:`, err);
      return { id: userId, first_name: "Unknown", last_name: "", avatar: "/default-avatar.png" };
    }
  };
  
  
  useEffect(() => {
    const fetchCommentsAndUsers = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const commentsResponse = await fetch(`http://localhost:8000/posts/${post_id}/comments`, {
          credentials: "include",
        });
  
        if (!commentsResponse.ok) throw new Error("Failed to fetch comments");
  
        const commentsData: Comment[] = await commentsResponse.json();
  
        if (!commentsData || commentsData.length === 0) {
          setComments([]);
          setLoading(false);
          return;
        }
  
        // Safeguard: Filter out invalid user_ids
        const validComments = commentsData.filter((comment) => comment.user_id);
  
        // Fetch profiles
        const userProfiles = await Promise.all(
          validComments.map((comment) => fetchUserProfile(comment.user_id))
        );
  
        const enrichedComments: CommentWithUserData[] = validComments.map((comment, index) => ({
          ...comment,
          userName: `${userProfiles[index]?.first_name || "Unknown"} ${userProfiles[index]?.last_name || ""}`.trim(),
          userAvatar: userProfiles[index]?.avatar || "/default-avatar.png",
        }));
  
        setComments(enrichedComments);
      } catch (err) {
        console.error("Error fetching comments and user profiles:", err);
        setError("Unable to load comments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCommentsAndUsers();
  }, [post_id]);
  

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      const response = await fetch(`http://localhost:8000/posts/${post_id}/comments/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const newCommentData: Comment = await response.json();
        setComments((prev) => [
          {
            ...newCommentData,
            userName: "You",
            userAvatar: "/default-avatar.png",
          },
          ...prev,
        ]);
        setNewComment("");
      } else {
        throw new Error("Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div className="comments-container bg-gray-50 p-4 rounded-lg space-y-4">
      {/* Comment Input */}
      <form onSubmit={handleCommentSubmit} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Post
        </button>
      </form>

      {/* Loading and Error States */}
      {loading && <div className="text-center text-gray-500">Loading comments...</div>}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {!loading && comments.length === 0 && (
        <div className="text-center text-gray-500">No comments yet. Be the first to comment!</div>
      )}

      {/* Comments List */}
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm">
          <Image
            src={comment.userAvatar}
            alt={comment.userName}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">{comment.userName}</span>
              <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
            </div>
            <p className="text-gray-700 text-sm">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
