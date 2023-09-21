import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";

// Define an asynchronous arrow function named Page that takes parameters
const Page = async ({ params }: { params: { id: string } }) => {
  // Check if a thread ID exists in the parameters, if not, return null
  if (!params.id) return null;

  // Check if a user is currently authenticated using Clerk
  const user = await currentUser();
  if (!user) return null;

  // Fetch user information using the provided user's ID
  const userInfo = await fetchUser(user.id);

  // If the user is not onboarded, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch thread information by its ID
  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        {/* Render a ThreadCard component for the main thread */}
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
      <div className="mt-7">
        {/* Render a Comment form for adding comments to the thread */}
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {/* Render ThreadCard components for child comments */}
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user?.id || ""}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default Page; 