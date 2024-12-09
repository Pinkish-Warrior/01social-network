export interface FriendRequest {
  id: number;
  sender_id: number;
  receiver_id: number;
  status: 'pending' | 'accepted' | 'declined';
  sender_profile_image: string;
  sender_full_name: string;
  sender_nickname: string;
  mutual_friends: string[];
}


const randomImgUrl = "https://picsum.photos/400/265";

// Example fake data for friend requests
export const fakeFriendRequest: FriendRequest[] = [
  {
    "id": 1,
    "sender_id": 101,
    "receiver_id": 10,
    "status": "pending",
    "sender_profile_image": randomImgUrl,
    "sender_full_name": "John Doe",
    "sender_nickname": "Johnny",
    "mutual_friends": ["Alice Smith", "Bob Jones"]
  },
  {
    "id": 2,
    "sender_id": 102,
    "receiver_id": 3,
    "status": "accepted",
    "sender_profile_image": randomImgUrl,
    "sender_full_name": "Jane Doe",
    "sender_nickname": "Janey",
    "mutual_friends": ["Carol White"]
  },
  {
    "id": 3,
    "sender_id": 103,
    "receiver_id": 10,
    "status": "declined",
    "sender_profile_image": "",
    "sender_full_name": "Mark Twain",
    "sender_nickname": "Marky",
    "mutual_friends": []
  },
  {
    "id": 4,
    "sender_id": 104,
    "receiver_id": 10,
    "status": "pending",
    "sender_profile_image": randomImgUrl,
    "sender_full_name": "Lucy Gray",
    "sender_nickname": "Luc",
    "mutual_friends": ["John Doe", "Carol White"]
  },
  {
    "id": 5,
    "sender_id": 105,
    "receiver_id": 10,
    "status": "pending",
    "sender_profile_image": randomImgUrl,
    "sender_full_name": "David King",
    "sender_nickname": "Dave",
    "mutual_friends": ["Bob Jones"]
  }
];
