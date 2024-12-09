// Define a type for the post object
export interface Post {
  id: number;
  content: string;
  privacySetting: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  authorName: string;
  authorAvatarUrl:string;
  likeCount: number;
}
const randomImgUrl = "https://picsum.photos/400/265"

export const fakePosts: Post[] = [
  {
    id: 1,
    content: "Just enjoying a sunny day at the beach!",
    privacySetting: "public",
    imageUrl: "",
    createdAt: "2023-08-24T12:34:56Z",
    updatedAt: "2023-08-24T12:34:56Z",
    authorId: 101,
    authorName: "John Doe",
    authorAvatarUrl:randomImgUrl,
    likeCount: 10,
  },
  {
    id: 2,
    content: "Had an amazing time hiking in the mountains today. Nature is beautiful!",
    privacySetting: "private",
    imageUrl: randomImgUrl,
    createdAt: "2023-09-10T08:45:12Z",
    updatedAt: "2023-09-10T08:45:12Z",
    authorId: 102,
    authorName: "Jane Smith",
    authorAvatarUrl: randomImgUrl,
    likeCount: 23,
  },
  {
    id: 3,
    content: "Here’s a sneak peek of my latest painting!",
    privacySetting: "public",
    imageUrl: "",
    createdAt: "2023-09-15T10:15:30Z",
    updatedAt: "2023-09-15T10:15:30Z",
    authorId: 103,
    authorName: "Emily Johnson",
    authorAvatarUrl: "",
    likeCount: 15,
  },
  {
    id: 4,
    content: "Had a wonderful evening with friends at the local jazz club. Good vibes!",
    privacySetting: "private",
    imageUrl: "",
    createdAt: "2023-09-20T19:30:45Z",
    updatedAt: "2023-09-20T19:30:45Z",
    authorId: 104,
    authorName: "Michael Brown",
    authorAvatarUrl: randomImgUrl,
    likeCount: 8,
  },
  {
    id: 5,
    content: "New blog post is live! Check out my latest thoughts on the importance of mindfulness.",
    privacySetting: "almost_private",
    imageUrl: randomImgUrl,
    createdAt: "2023-09-25T14:22:10Z",
    updatedAt: "2023-09-25T14:22:10Z",
    authorId: 105,
    authorName: "Sarah Lee",
    authorAvatarUrl: randomImgUrl,
    likeCount: 30,
  }
];
