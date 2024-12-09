import AllEventsList from "@components/eventList/AllEventsList";
import GroupHeader from "@components/groups/GroupHeader";
import PostList from "@components/feed/PostList";
import Loading from "@app/loading";
import React, { Suspense } from "react";
import NewEventButton from "@components/groups/NewEventButton";

type Props = {
  params: {
    groupId: number;
  } /*variable need to match the folder name ex:[id]*/;
};

export default function GroupDetailPage({ params }: Props) {
  const { groupId } = params;

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 pt-6 w-full">
      {/* Middle Section */}
      <div className="w-full lg:w-[70%] xl:w-[70%] flex-grow">
        <div className="flex flex-col gap-6">
          {/* TODO:Change to parse real grouID */}
          <Suspense fallback={<Loading />}>
            <GroupHeader groupId={1} />
          </Suspense>

          {/* Mobile: Events goes under GroupHeader */}
          <div className="block lg:hidden bg-red-300">
            {/* Pass the groupname prop to get all events of that group */}
            <div className="bg-yellow-200">
              <button>Create an Event</button>
            </div>
            <Suspense fallback={<Loading />}>
              <AllEventsList groupId={groupId} />
            </Suspense>
          </div>

          <div className="bg-green-200">
            <Suspense fallback={<Loading />}>
              <PostList />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Right Section - Large Screen:  Events lists stays on the right */}
      <div className="hidden lg:block lg:w-[30%] xl:w-[30%] bg-red-300 lg:mr-0">
        {/* Pass the username prop to UserInfo */}
        <div className="bg-yellow-200">
          {/* Click to render create New Event form*/}
          <NewEventButton />
        </div>
        <Suspense fallback={<Loading />}>
          <AllEventsList groupId={groupId} />
        </Suspense>
      </div>
    </div>
  );
}
