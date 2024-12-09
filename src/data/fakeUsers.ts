export type User = {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  avatar: string;
  coverUrl: string;
  nickname: string;
  aboutMe: string;
  privacy: string;
  createdAt: Date;
  updatedAt: Date;
  numOfFollowees: number;
  numOfFollowers: number;
  numberOfPosts: number;
  mutualFriends: string[];
  isFollowed: boolean;
};

export type UseAuthReturn = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null; // Add the error property
};

const randomImgUrl = "https://picsum.photos/400/265";

export const fakeUsers: User[] = [
  {
    id: "1",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    firstName: "Emily",
    lastName: "Johnson",
    dateOfBirth: new Date("1991-02-15"),
    avatarUrl: randomImgUrl,
    coverUrl: "",
    nickname: "em_johnson",
    aboutMe: "Passionate about photography and travel",
    privacy: "public",
    createdAt: new Date("2020-05-01"),
    updatedAt: new Date("2024-01-01"),
    numOfFollowees: 120,
    numOfFollowers: 150,
    numberOfPosts: 60,
    mutualFriends: ["Michael Brown", "Sarah White"],
    isFollowed: true,
  },
  {
    id: "2",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    firstName: "Michael",
    lastName: "Brown",
    dateOfBirth: new Date("1988-08-22"),
    avatarUrl: "",
    coverUrl: randomImgUrl,
    nickname: "mikeb",
    aboutMe: "Tech enthusiast and coffee lover.",
    privacy: "private",
    createdAt: new Date("2019-11-10"),
    updatedAt: new Date("2024-01-01"),
    numOfFollowees: 80,
    numOfFollowers: 100,
    numberOfPosts: 45,
    mutualFriends: ["Emily Johnson", "Laura Green"],
    isFollowed: false,
  },
  {
    id: "3",
    name: "Sarah White",
    email: "sarah.white@example.com",
    firstName: "Sarah",
    lastName: "White",
    dateOfBirth: new Date("1995-06-30"),
    avatarUrl: randomImgUrl,
    coverUrl: "",
    nickname: "sarah_w",
    aboutMe: "Fitness enthusiast and foodie.",
    privacy: "friends",
    createdAt: new Date("2021-03-25"),
    updatedAt: new Date("2024-01-01"),
    numOfFollowees: 150,
    numOfFollowers: 180,
    numberOfPosts: 80,
    mutualFriends: ["Emily Johnson", "Laura Green"],
    isFollowed: true,
  },
  {
    id: "4",
    name: "Laura Green",
    email: "laura.green@example.com",
    firstName: "Laura",
    lastName: "Green",
    dateOfBirth: new Date("1990-12-01"),
    avatarUrl: randomImgUrl,
    coverUrl: randomImgUrl,
    nickname: "laurag",
    aboutMe: "Graphic designer with a love for art.",
    privacy: "public",
    createdAt: new Date("2018-09-14"),
    updatedAt: new Date("2024-01-01"),
    numOfFollowees: 95,
    numOfFollowers: 120,
    numberOfPosts: 55,
    mutualFriends: ["Michael Brown", "Sarah White"],
    isFollowed: true,
  },
  {
    id: "5",
    name: "James Smith",
    email: "james.smith@example.com",
    firstName: "James",
    lastName: "Smith",
    dateOfBirth: new Date("1987-10-10"),
    avatarUrl: randomImgUrl,
    coverUrl: randomImgUrl,
    nickname: "james_s",
    aboutMe: "Adventure seeker and sports fan.",
    privacy: "private",
    createdAt: new Date("2017-06-05"),
    updatedAt: new Date("2024-01-01"),
    numOfFollowees: 70,
    numOfFollowers: 90,
    numberOfPosts: 40,
    mutualFriends: ["Emily Johnson", "Laura Green"],
    isFollowed: false,
  },
];