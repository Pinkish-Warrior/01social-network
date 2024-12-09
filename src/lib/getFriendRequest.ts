import { fakeFriendRequest,FriendRequest} from "@data/fakeFriendRequest";


  /* later use
/* export async function getFriendRequest(userId: number): Promise<FriendRequest[]> {
  const response = await fetch(`/api/friend-requests?receiver_id=${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch friend requests');
  }

  return response.json();
} */
 
 /* now testing*/
export async function getFriendRequest():Promise<FriendRequest[]> {
  
 await new Promise((resolve) => setTimeout(resolve, 1000));// Simulate async operation

  return fakeFriendRequest;
}
