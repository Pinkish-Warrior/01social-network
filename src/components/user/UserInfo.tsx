import React from "react";
import Image from "next/image";
import Button from "@components/ui/Button";

  type User = {
    id: number;
    first_name: string;
    last_name: string;
    nickname: string;
    email: string;
    avatar: string;
    about_me: string;
    is_private: boolean;
    date_of_birth: string;
    created_at: string;
    updated_at: string;
  numOfFollowees: number;
  numOfFollowers: number;
  numberOfPosts: number;
  mutualFriends: string[];
  isFollowed: boolean;
};

type UserInfoProps = {
  user: User;
};

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="mt-0 mb-4 p-4 bg-gray-50 rounded-b-lg md:rounded-lg shadow-lg text-sm flex flex-col gap-4 border-r border-l border-b md:border-none border-gray-200">
      {/* TOP */}
      <h1 className="text-muted-foreground font-semibold text-md italic">
        User Information
      </h1>

      <div className="flex flex-col text-muted-foreground">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="text-2xl text-black">
            {user.first_name} {user.last_name}
          </span>
          <span className="text-xs text-muted-foreground">@{user.nickname}</span>
        </div>

        {/* About Me */}
        <p className="p-2 text-muted-foreground mb-3">
          {user.about_me || "No bio provided"}
        </p>

        {/* Info */}
        <div className="flex items-center mb-2">
          <Image
            src="/icons/email.webp"
            alt="email"
            width={16}
            height={16}
            className="w-4 h-4 mr-2"
          />
          <div className="text-sm text-muted-foreground">
            <span className="mr-2">Email:</span>
            <span>{user.email}</span>
          </div>
        </div>

        <div className="flex items-center mb-2">
          <Image
            src="/icons/gift.png"
            alt="birthday"
            width={16}
            height={16}
            className="w-4 h-4 mr-2"
          />
          <div className="text-sm text-muted-foreground">
            <span className="mr-2">Birthday:</span>
            <span>{new Date(user.date_of_birth).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center mb-2">
          <Image
            src="/icons/calendar.webp"
            alt="joined"
            width={12}
            height={12}
            className="w-3 h-3 mr-2"
          />
          <div className="text-sm text-muted-foreground">
            <span className="mr-2">Joined:</span>
            <span>{new Date(user.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Follow Button */}
      <Button
        type="button"
        className="flex items-center justify-center space-x-2 w-full mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300 ease-in-out box-border"
      >
        <Image src="/icons/add-user.svg" alt="follow" width={20} height={20} />
        <span>{user.isFollowed ? "Unfollow" : "Follow"}</span>
      </Button>
    </div>
  );
};

export default UserInfo;
