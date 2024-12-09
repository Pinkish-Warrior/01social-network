import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Suspense } from "react";
import Comments from "./Comments";
import PostInteraction from "./PostInteraction";
import { Post as PostType } from "../../types/models";

interface Post extends PostType {
  author?: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await axios.get("http://localhost:8000/post/", {
          withCredentials: true,
        });
        setPosts(response.data || []); // Update posts state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once after the component mounts

  const handleNewPostSubmit = async (formData: any) => {
    try {
      const response = await axios.post<Post>("http://localhost:8000/post/", formData, {
        withCredentials: true,
      });
      setPosts((prevPosts) => [response.data, ...prevPosts]); // Add new post at the top
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex flex-col bg-blue-50 gap-4">
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-4 p-4 bg-blue-100 rounded-lg shadow-md"
          >
            {/* USER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={post.author?.avatar || "/icons/noAvatar.png"}
                  width={40}
                  height={40}
                  alt={post.author ? `${post.author.first_name} ${post.author.last_name}` : "Author"}
                  className="w-10 h-10 rounded-full bg-gray-600"
                />
                <span className="font-medium">
                  {post.author?.first_name} {post.author?.last_name}
                </span>
              </div>
            </div>

            {/* POST CONTENT */}
            <div className="flex flex-col gap-4">
              <p>{post.content}</p>

              {/* POST IMAGE */}
              {post.image_url && (
                <div className="w-full min-h-96 relative">
                  <Image
                    src={post.image_url}
                    fill
                    className="object-cover rounded-md"
                    alt="Post Image"
                  />
                </div>
              )}
            </div>

            {/* INTERACTION */}
            <Suspense fallback="Loading interactions...">
              <PostInteraction
                postId={post.id}
                likeCount={post.likeCount}
                commentCount={2} // Adjust this if you want to dynamically get comment count
              />
            </Suspense>

            {/* COMMENTS */}
            <Suspense fallback="Loading comments...">
              <Comments post_id={post.id} />
            </Suspense>
          </div>
        ))
      )}
      {posts.length === 0 && !loading && <p>No posts yet.</p>}
    </div>
  );
}
