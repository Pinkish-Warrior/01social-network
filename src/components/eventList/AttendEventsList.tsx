"use client";

import React, { useEffect, useState } from "react";
import { User } from "@data/fakeUsers";
import UpcomingEventListLayout from "@components/ui/UpcomingEventList";
import Button from "@components/ui/Button";
import { getUpComingEventsList } from "@lib/getUpCommingEvents";
import { upComingEvent } from "@data/fakeUpComingEventList";
import Image from "next/image";

type AttendEventListProps = {
  user: User;
};

const AttendEventsList = ({ user }: AttendEventListProps) => {
  const [upComingEvents, setUpComingEvents] = useState<upComingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchUpComingEvents = async () => {
      try {
        setIsLoading(true);
        const data: upComingEvent[] = await getUpComingEventsList();

        console.log("All upcoming events:", data);
        console.log("User ID:", user.id);

        // Filter events where the current user is attending
        const userUpcomingEvents = data.filter(
          (event) =>
            event.userId.toString() === user.id &&
            event.status === "attend"
        );

        setUpComingEvents(userUpcomingEvents);
      } catch (err) {
        setError("Failed to load upcoming events.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpComingEvents();
  }, [user.id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const UserUpComingEventsToShow = showAll
    ? upComingEvents
    : upComingEvents.slice(0, 5);

  return (
    <div className="w-full max-w-md p-4 border-gray-200 rounded-lg shadow sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl leading-none font-bold p-2">Upcoming Events</h5>
        {upComingEvents.length > 5 && (
          <Button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:underline text-sm leading-none"
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        )}
      </div>
      <hr className="my-2 border-gray-300" />
      <ul role="list" className="divide-y divide-gray-200">
        {UserUpComingEventsToShow.length > 0 ? (
          UserUpComingEventsToShow.map((event) => (
            <UpcomingEventListLayout
              key={event.id}
              content={
                <>
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-semibold hover:underline">
                      {event.title}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Image
                        src="/icons/calendar.webp"
                        alt="date"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      <span>
                        {new Date(event.event_date).toLocaleDateString()}{" "}
                        {new Date(event.event_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Image
                        src="/icons/map.webp"
                        alt="location"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </>
              }
            />
          ))
        ) : (
          <p>You don't have any events currently.</p>
        )}
      </ul>
    </div>
  );
};

export default AttendEventsList;
