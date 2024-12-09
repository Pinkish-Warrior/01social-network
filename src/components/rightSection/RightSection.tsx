import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@app/loading";
import GroupInvitationList from "@components/groups/GroupInvitationList";
import FriendRequestList from "@components/friends/FriendRequestList";
import { User } from "@data/fakeUsers";

// Dynamically import GroupList and ContactList
const UserJoinedGroupsList = dynamic(
  () => import("@components/groups/UserJoinedGroupsList"),
  {
    suspense: true,
  }
);
const ContactList = dynamic(() => import("./ContactList"), { suspense: true });

// Define Props type where username is passed directly
type Props = {
  userId: string;
  user: User;
};

const RightSection: React.FC<Props> = ({ user, userId }) => {
  return (
    <>
      <div className="w-full max-w-md p-4 border-gray-200 rounded-lg shadow sm:p-8">
        <Suspense fallback={<Loading />}>
          <UserJoinedGroupsList userName="rinrino" layout="compact" />
        </Suspense>
      </div>
      {/* Group invitation*/}
      <div className="flow-root">
        <Suspense fallback={<Loading />}>
          <GroupInvitationList userId={userId} />
        </Suspense>
      </div>
      {/* friends request*/}
      <div className="hidden lg:block mx-auto">
        <div className="flow-root">
          <Suspense fallback={<Loading />}>
            <FriendRequestList userId={userId} />
          </Suspense>
        </div>
      </div>
      <div>
        <Suspense fallback={<Loading />}>
          <ContactList user={user} />
        </Suspense>
      </div>
    </>
  );
};
export default RightSection;
