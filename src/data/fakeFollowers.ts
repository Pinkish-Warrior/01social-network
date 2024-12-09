export interface Follower {
  id: string;
  user_full_name: string;
  avatarUrl: string;
  mutualFriends: string[];
  is_followed: boolean;
}

export interface SuggestFriend {
  id: string;
  user_full_name: string;
  avatarUrl: string;
  mutualFriends: string[];
}

const randomImgUrl = "https://picsum.photos/400/265";

export const fakeFollowers: Follower[] = [
  {
    id: "1",
    user_full_name: "John Doe",
    avatarUrl: randomImgUrl,
    mutualFriends: ["Jane Smith", "Mike Jones"],
    is_followed: true,
  },
  {
    id: "2",
    user_full_name: "Jane Smith",
    avatarUrl: "",
    mutualFriends: ["John Doe"],
    is_followed: true,
  },
  {
    id: "3",
    user_full_name: "Mike Jones",
    avatarUrl:randomImgUrl,
    mutualFriends: ["John Doe", "Jane Smith"],
    is_followed: false,
  },
  {
    id: "4",
    user_full_name: "Emma Watson",
    avatarUrl: randomImgUrl,
    mutualFriends: ["Ivan Turner", "Judy Thomas"],
    is_followed: false,
  },
  {
    id: "5",
    user_full_name: "Daniel Radcliffe",
    avatarUrl: randomImgUrl,
    mutualFriends: ["Kate White", "Leo Walker", "Matt King"],
    is_followed: true,
  },
  {
    id: "6",
    user_full_name: "Alice Johnson",
    avatarUrl: randomImgUrl ,
    mutualFriends: ["Mike Jones", "Emma Watson"],
    is_followed: true,
  },
  {
    id: "7",
    user_full_name: "Bob Brown",
    avatarUrl: randomImgUrl ,
    mutualFriends: ["John Doe"],
    is_followed: false,
  },
  {
    id: "8",
    user_full_name: "Charlie Davis",
    avatarUrl:randomImgUrl ,
    mutualFriends: ["Jane Smith", "Daniel Radcliffe"],
    is_followed: true,
  },
  {
    id: "9",
    user_full_name: "Diana Prince",
    avatarUrl: "",
    mutualFriends: ["Kate White"],
    is_followed: true,
  },
  {
    id: "10",
    user_full_name: "Edward Norton",
    avatarUrl: "",
    mutualFriends: ["Ivan Turner", "Judy Thomas", "Matt King"],
    is_followed: false,
  },
  {
    id: "11",
    user_full_name: "Fiona Green",
    avatarUrl: randomImgUrl ,
    mutualFriends: ["John Doe", "Daniel Radcliffe"],
    is_followed: true,
  },
  {
    id: "12",
    user_full_name: "George Harris",
    avatarUrl: randomImgUrl ,
    mutualFriends: ["Emma Watson"],
    is_followed: false,
  },
  {
    id: "13",
    user_full_name: "Hannah Scott",
    avatarUrl: "",
    mutualFriends: ["Bob Brown", "Alice Johnson"],
    is_followed: true,
  },
  {
    id: "14",
    user_full_name: "Ivy Walker",
    avatarUrl: randomImgUrl ,
    mutualFriends: ["Charlie Davis", "Fiona Green"],
    is_followed: true,
  },
  {
    id: "15",
    user_full_name: "James Wilson",
    avatarUrl: randomImgUrl ,
    mutualFriends: ["John Doe", "Kate White"],
    is_followed: false,
  },
];


export const fakeSuggestFriends: SuggestFriend[] = [
    {
      id: "1",
      user_full_name: "John Doe",
      avatarUrl: randomImgUrl,
      mutualFriends: ["Jane Smith", "Mike Jones"],
    },
    {
      id: "2",
      user_full_name: "Jane Smith",
      avatarUrl: "",
      mutualFriends: ["John Doe"],
    },
    {
      id: "3",
      user_full_name: "Mike Jones",
      avatarUrl: randomImgUrl,
      mutualFriends: ["John Doe", "Jane Smith"],
    },
    {
      id: "4",
      user_full_name: "Emma Watson",
      avatarUrl: randomImgUrl,
      mutualFriends: ["Ivan Turner", "Judy Thomas"],
    },
    {
      id: "5",
      user_full_name: "Daniel Radcliffe",
      avatarUrl: randomImgUrl,
      mutualFriends: ["Kate White", "Leo Walker", "Matt King"],
    },
    {
      id: "6",
      user_full_name: "Alice Johnson",
      avatarUrl: randomImgUrl,
      mutualFriends: ["Mike Jones", "Emma Watson"],
    },
    {
      id: "7",
      user_full_name: "Bob Brown",
      avatarUrl: randomImgUrl,
      mutualFriends: ["John Doe"],
    },
    {
      id: "8",
      user_full_name: "Charlie Davis",
      avatarUrl: randomImgUrl,
      mutualFriends: ["Jane Smith", "Daniel Radcliffe"],
    },
    {
      id: "9",
      user_full_name: "Diana Prince",
      avatarUrl: "",
      mutualFriends: ["Kate White"],
    },
    {
      id: "10",
      user_full_name: "Edward Norton",
      avatarUrl: "",
      mutualFriends: ["Ivan Turner", "Judy Thomas", "Matt King"],
    },
    {
      id: "11",
      user_full_name: "Fiona Green",
      avatarUrl: randomImgUrl,
      mutualFriends: ["John Doe", "Daniel Radcliffe"],
    },
    {
      id: "12",
      user_full_name: "George Harris",
      avatarUrl: randomImgUrl,
      mutualFriends: ["Emma Watson"],
    },
    {
      id: "13",
      user_full_name: "Hannah Scott",
      avatarUrl: "",
      mutualFriends: ["Bob Brown", "Alice Johnson"],
    },
    {
      id: "14",
      user_full_name: "Ivy Walker",
      avatarUrl: randomImgUrl,
      mutualFriends: ["Charlie Davis", "Fiona Green"],
    },
    {
      id: "15",
      user_full_name: "James Wilson",
      avatarUrl: randomImgUrl,
      mutualFriends: ["John Doe", "Kate White"],
    },
  ];
  
 
  