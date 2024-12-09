import { fakePosts, Post } from "@data/fakePosts";



/* for typeScript always need to define type first*/
export async function getPosts(): Promise<Post[]> {
  // imitate delay, test for loading
  await new Promise((resolve) => setTimeout(resolve, 3000));

    return fakePosts;
  };