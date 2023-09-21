import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Import custom functions from user.actions
import { fetchUser, getActivity } from "@/lib/actions/user.actions";


async function Page() {
  // Check if a user is currently authenticated using Clerk
  const user = await currentUser();
  if (!user) return null; // If not authenticated, return null

  // Fetch user information using the user's ID
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding"); // Redirect to onboarding if not onboarded

  // Fetch user activity based on user's ID
  const activity = await getActivity(userInfo._id);

  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? ( // Check if there is any activity
          <>
            {activity.map((activity) => ( // Map through the activity items
              // Create a link to a specific thread based on activity.parentId
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  {/* Display the author's image */}
                  <Image
                    src={activity.author.image}
                    alt="user_logo"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  {/* Display a message indicating the author's reply */}
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          // If there is no activity, display a message
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </>
  );
}

export default Page; 
