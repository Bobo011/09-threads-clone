"use client"; 

import ThreadCard from "@/components/cards/ThreadCard"; 
import { fetchPosts } from "@/lib/actions/thread.actions"; 
import { currentUser } from "@clerk/nextjs"; 

export default async function Home() {
  
  const result = await fetchPosts(1, 30); // Fetch a list of posts (threads), assuming a page size of 30
  const user = await currentUser(); // Get the current authenticated user

  return (
    <>
      <section className="mt-9 flex flex-col gap-10">
        {" "}
        {/* Create a section to display threads */}
        {result.posts.length === 0 ? ( // Check if there are no posts (threads) found
          <p className="no-result">No Threads Found</p> // Display a message when no threads are found
        ) : (
          <>
            {result.posts.map(
              (
                post // Map through the fetched posts and render ThreadCard components
              ) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""} // Pass the current user's ID (if available)
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              )
            )}
          </>
        )}
      </section>
    </>
  );
}
