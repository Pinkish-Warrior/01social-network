import React from "react";

type EventProps = {
  groupId: number;
};

export default async function AllEventsList({ groupId }: EventProps) {
  /*  const posts: Group[] = await getGroups(); */

  return (
    <>
      {/*  {posts.map((post) => (
        <div key={post.id} className={styles.card}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      {posts.length === 0 && <p>No posts yet.</p>} */}
      <div className="h-52 bg-blue-100">
        <h1> this is all the events of group Id:{groupId}</h1>
      </div>
    </>
  );
}
