import { fakeComments, Comment } from "@data/fakeComments";

// Dummy function for fetching comments based on postId
export async function getCommentsForPost(postId: number): Promise<Comment[]> {
  // Simulate a delay for fetching comments
  return new Promise((resolve) =>
    setTimeout(() => {
      // Filter fakeComments by postId to return the relevant comments
      const filteredComments = fakeComments.filter(comment => comment.postId === postId);
      resolve(filteredComments);
    }, 1000)
  );
}