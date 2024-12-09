
export interface Author {
    first_name?: string;
    last_name?: string;
    avatar?: string;
  }
  
  export interface Post {
    id: number;
    user_id: string;
    created_at?: string;
    content?: string;
    image_url?: string;
    likeCount: number;
    comments: string[];
    author?: Author;
  }
  
  export interface User {
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
    isFollowing: boolean;
  }
  
  export interface ProfileData {
    user: User;
    posts: Post[];
    followers: number;
    following: number;
  }
  