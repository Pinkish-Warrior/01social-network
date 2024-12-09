import React from "react";
import { User } from "@data/fakeUsers";

type ContactListProps = {
  user: User;
};

export default async function ContactList({ user }: ContactListProps) {
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
      <div className="bg-purple-200 h-24">
        <h1> this is {user.firstName}'s contact list component</h1>
      </div>
    </>
  );
}
