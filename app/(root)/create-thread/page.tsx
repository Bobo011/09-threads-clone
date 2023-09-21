import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";


async function Page() {
  // Check if a user is currently authenticated using Clerk
  const user = await currentUser();
  if (!user) return null; // If not authenticated, return null

  // Fetch user information
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding"); // Redirect if not onboarded

  return (
    <>
      <h1 className="head-text">Create Thread</h1>

      {/* Render a component for posting a new thread */}
      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page; 
