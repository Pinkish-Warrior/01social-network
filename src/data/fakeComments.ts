// Define a type for the comment object
export interface Comment {
  commentId: number;
  postId: number;
  authorId: number;  
  authorName: string;
  authorAvatarUrl: string;
  content: string;
  imageUrl?: string; // optional because not all comments may have an image
  createdAt: string;
  updatedAt: string;
}
const randomImgUrl = "https://picsum.photos/400/265"
const randomUserImgUrl ="https://picsum.photos/200"

// Fake comments data
export const fakeComments: Comment[] = [
  {
    commentId: 98765432, // Changed to number
    postId: 2, 
    content: "Great post!",
    imageUrl: randomImgUrl,
    createdAt: "2023-08-24T13:00:00Z",
    updatedAt: "2023-09-24T12:34:56Z",
    authorId: 123456789, // Changed to number
    authorName: "John Doe",
    authorAvatarUrl: randomUserImgUrl,
  },
  {
    commentId: 12341234, // Changed to number
    postId: 1,
    content: "I love this picture, it's amazing!",
    imageUrl: randomImgUrl,
    createdAt: "2023-09-10T11:45:00Z",
    updatedAt: "2023-09-11T12:34:56Z",
    authorId: 987654321, // Changed to number
    authorName: "Jane Smith",
    authorAvatarUrl: randomUserImgUrl,
  },
  {
    commentId: 12345678, // Changed to number
    postId: 2,
    content: "Awesome work!",
    createdAt: "2023-09-15T10:15:30Z",
    updatedAt: "2023-09-15T10:16:00Z",
    authorId: 123123123, // Changed to number
    authorName: "Emily Johnson",
    authorAvatarUrl: randomUserImgUrl,
  },
  {
    commentId: 98769876, // Changed to number
    postId: 2,
    content: "Looks like a lot of fun!",
    createdAt: "2023-09-20T20:15:45Z",
    updatedAt: "2023-09-21T12:00:00Z",
    authorId: 234567890, // Changed to number
    authorName: "Michael Brown",
    authorAvatarUrl: randomUserImgUrl,
  },
  {
    commentId: 12342344, // Changed to number
    postId: 3,
    content: "Thanks for sharing your thoughts!",
    createdAt: "2023-09-25T14:22:10Z",
    updatedAt: "2023-09-26T12:34:56Z",
    authorId: 345678901, // Changed to number
    authorName: "Sarah Lee",
    authorAvatarUrl: randomUserImgUrl,
  },
];