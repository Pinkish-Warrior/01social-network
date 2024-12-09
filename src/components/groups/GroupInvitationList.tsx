"use client";

import React, { useEffect, useState } from "react";
import RequestListLayout from "@components/ui/RequestListLayout";
import Button from "@components/ui/Button";
import Image from "next/image";
import { getGroupInvitations } from "@lib/getGroupInvitations";
import Link from "next/link";

interface GroupInvitation {
  id: number;
  group_id: number;
  name: string;
  inviter_id: number;
  inviter_username: string;
  invitee_id: number;
  cover_image: string;
  status: "pending" | "accepted" | "declined";
  sent_at: string;
}

interface GroupInvitationListProps {
  userId: string;
}

const GroupInvitationList = ({ userId }: GroupInvitationListProps) => {
  const [invitations, setInvitations] = useState<GroupInvitation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    // Simulate fetching data
    const fetchInvitations = async () => {
      try {
        const data: GroupInvitation[] = await getGroupInvitations(); // Fetch all groups
        console.log("all group invitation:", data);
        const userInvitations = data.filter(
          (invitation) =>
            invitation.invitee_id.toString() === userId &&
            invitation.status === "pending"
        );
        setInvitations(userInvitations);
      } catch (err) {
        setError("Failed to load invitations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitations();
  }, [userId]);

  {
    /*TODO:Test if it works later */
  }
  const handleAccept = async (requestId: number) => {
    try {
      const response = await fetch(
        `/api/group-invitations/${requestId}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) throw new Error("Failed to accept invitation");

      // Update state
      setInvitations((prevInvitations) =>
        prevInvitations.map((invitation) =>
          invitation.id === requestId
            ? { ...invitation, status: "accepted" }
            : invitation
        )
      );
    } catch (err) {
      setError("Failed to accept invitation");
    }
  };

  const handleDecline = async (requestId: number) => {
    try {
      const response = await fetch(
        `/api/group-invitations/${requestId}/decline`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) throw new Error("Failed to decline invitation");

      // Update state
      setInvitations((prevInvitations) =>
        prevInvitations.filter((invitation) => invitation.id !== requestId)
      );
    } catch (err) {
      setError("Failed to decline invitation");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const invitationsToShow = showAll ? invitations : invitations.slice(0, 2);

  return (
    <div className="w-full max-w-md p-4 border-gray-200 rounded-lg shadow sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl leading-none font-semibold p-2">
          Group Invitation
        </h5>
        {invitations.length > 2 && (
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
        {/* only show limit lists first*/}
        {invitationsToShow.length > 0 ? (
          invitationsToShow.map((invitation) => (
            <RequestListLayout
              key={invitation.id}
              imageSrc={invitation.cover_image || "/img/placehodlerImg.png"}
              imageAlt={`Group ${invitation.name}`}
              width={100}
              height={100}
              content={
                <>
                  <Link href={`/group/${invitation.group_id}`}>
                    <p className="text-sm font-bold mb-1 cursor-pointer hover:underline">{`Group ${invitation.name}`}</p>
                  </Link>
                  <p className="text-xs text-gray-600 mb-1">
                    Invited by: {invitation.inviter_username}
                  </p>
                </>
              }
              buttonContent={
                <>
                  {/* TODO: Submit form*/}
                  <Button type="button" className="">
                    <Image
                      src="/icons/accept.webp"
                      alt="accept"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() => handleAccept(invitation.id)}
                    />
                  </Button>
                  <Button type="button" className="">
                    <Image
                      src="/icons/reject.webp"
                      alt="reject"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() => handleDecline(invitation.id)}
                    />
                  </Button>
                </>
              }
            />
          ))
        ) : (
          <p>No invitations found.</p>
        )}
      </ul>
    </div>
  );
};

export default GroupInvitationList;
