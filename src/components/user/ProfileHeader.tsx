import Image from "next/image";

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

type ProfileHeaderProps = {
  user: User;
};

// TODO:fetch user data

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  // Test using randon img
  const randomImgUrl = "https://picsum.photos/200"; // square img
  const blurImgUrl = "https://picsum.photos/400/265/?blur"; // bur img

  return (
    <>
      <div className="flexf fle-col items-center justify-center border-r border-l border-t rounded-t-lg md:border-none shodow-lg border-gray-200">
        {/*profile imgs*/}
        <div className="w-full sm:rounded-t-lg h-32 md:h-48 lg:64 relative">
          <Image
            src={blurImgUrl || "/img/placehodlerCover.jpg"}
            alt="coverImg"
            fill
            className="rounded-t-lg md:rounded-lg object-cover"
          />
          <Image
            src={randomImgUrl || "/img/user.webp"}
            alt="userImg"
            width={128}
            height={128}
            className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full absolute left-0 right-0 m-auto -bottom-8 md:-bottom-16 ring-2 lg:ring-4 ring-white object-cover"
          />
        </div>
        {/*username*/}
        <h1 className="mt-10 md:mt-20 md:mb-4 text-center text-2xl font-medium">
          {user.first_name} {user.last_name}
        </h1>
        {/*social section*/}
        <div className="flex items-center justify-center gap-12 pb-4 ">
          <div className="flex flex-col items-center">
            <span className="font-medium">{user.numberOfPosts}</span>
            <span className="text-sm">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium">{user.numOfFollowers}</span>
            <span className="text-sm">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium">{user.numOfFollowees}</span>
            <span className="text-sm">Following</span>
          </div>
        </div>
      </div>
    </>
  );
}
