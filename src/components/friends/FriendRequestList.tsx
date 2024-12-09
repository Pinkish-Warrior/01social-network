"use client";

import React, { useEffect, useState } from "react";
import RequestListLayout from "@components/ui/RequestListLayout";
import Button from "@components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { checkAuthStatus } from "../../services/authServices";

interface FriendRequest {
  id: number;
  sender_id: number;
  receiver_id: number;
  status: "pending" | "accepted" | "declined";
  sender_profile_image?: string;
  sender_full_name: string;
  sender_nickname: string;
  mutual_friends?: string[];
}

const FriendRequestList: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  // Fetch authenticated user's ID
  useEffect(() => {
    const initialize = async () => {
      try {
        const user = await checkAuthStatus();
        if (!user || !user.id) {
          throw new Error("User not authenticated.");
        }
        setUserId(user.id.toString());
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
        setError("Failed to authenticate user.");
      }
    };

    initialize();
  }, []);

  // Fetch friend requests
  useEffect(() => {
    if (!userId) return;

    const fetchFriendRequests = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8000/follow-requests?userID=${userId}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch follow requests: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format.");
        }

        const userFriendRequests = await Promise.all(
          data
            .filter((request) => request.recipient_id.toString() === userId)
            .map(async (request) => {
              // Fetch sender's details
              const senderResponse = await fetch(
                `http://localhost:8000/profile/${request.sender_id}/info`,
                { credentials: "include" }
              );

              if (!senderResponse.ok) {
                throw new Error("Failed to fetch sender details.");
              }

              const senderData = await senderResponse.json();

              return {
                ...request,
                sender_full_name: senderData?.user?.first_name || "Unknown",
                sender_nickname: senderData?.user?.nickname || "unknown",
                sender_profile_image: senderData?.user?.profile_image || "",
              };
            })
        );

        setFriendRequests(userFriendRequests);
        } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
        setError("Failed to load friend requests.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriendRequests();
  }, [userId]);

  const handleAccept = async (requestId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/follow-requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include session credentials
        body: JSON.stringify({ status: "accepted" }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to accept follow request. Server responded with: ${response.status} - ${errorData.message || "Unknown error"}`
        );
      }
  
      // Update state to remove the accepted request
      setFriendRequests((prev) =>
        prev.filter((req) => req.id !== requestId)
      );
      console.log(`Follow request ${requestId} accepted successfully.`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error accepting follow request:", err.message);
      } else {
        console.error("Unknown error accepting follow request:", err);
      }
      setError("Failed to accept follow request.");
    }
  };
  
  const handleDecline = async (requestId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/follow-requests/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "declined" }),
      });

      if (!response.ok) {
        throw new Error("Failed to decline follow request.");
      }

      setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
     } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
   
      setError("Failed to decline follow request.");
    }
  };

  if (!userId) return <p>Authenticating...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const friendRequestsToShow = showAll ? friendRequests : friendRequests.slice(0, 2);

  return (
    <div className="w-full max-w-md p-4 border-gray-200 rounded-lg shadow sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl leading-none font-semibold p-2">
          Friend Requests
        </h5>
        {friendRequests.length > 2 && (
          <Button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:underline text-sm leading-none"
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        )}
      </div>
      <hr className="my-1 border-gray-300" />
      <ul role="list" className="divide-y divide-gray-200">
        {friendRequestsToShow.length > 0 ? (
          friendRequestsToShow.map((request) => (
            <RequestListLayout
              key={request.id}
              imageSrc={request.sender_profile_image || "/images/placeholder.png"}
              imageAlt={request.sender_full_name}
              width={50}
              height={50}
              content={
                <>
                  <div className="flex items-center gap-2">
                    <Link href={`/profile/${request.sender_id}`}>
                      <span className="text-sm font-bold hover:underline">
                        {request.sender_full_name}
                      </span>
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      @{request.sender_nickname}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {request.mutual_friends?.length || 0} mutual friends
                  </p>
                </>
              }
              buttonContent={
                <>
                  <Button type="button" onClick={() => handleAccept(request.id)}>
                    <Image
                      src="/icons/accept.webp"
                      alt="accept"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                    />
                  </Button>
                  <Button type="button" onClick={() => handleDecline(request.id)}>
                    <Image
                      src="/icons/reject.webp"
                      alt="reject"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                    />
                  </Button>
                </>
              }
            />
          ))
        ) : (
          <p>No friend requests found.</p>
        )}
      </ul>
    </div>
  );
};

export default FriendRequestList;
