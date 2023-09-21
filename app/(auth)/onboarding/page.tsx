
import { currentUser } from "@clerk/nextjs"; 
import { redirect } from "next/navigation"; 

import { fetchUser } from "@/lib/actions/user.actions"; // Import a custom function to fetch user data.
import AccountProfile from "@/components/forms/AccountProfile"; 


async function Page() {
  // Use the `currentUser` function to get information about the currently authenticated user.
  const user = await currentUser();
  if (!user) return null; // If there's no authenticated user, return null (to avoid TypeScript warnings).

  // Use the `fetchUser` function to fetch additional user information based on their ID.
  const userInfo = await fetchUser(user.id);

  // Check if the user has completed the onboarding process.
  if (userInfo?.onboarded) redirect("/"); // If onboarded, redirect to the homepage.

  // Define a `userData` object containing user-related data for the profile form.
  const userData = {
    id: user.id, 
    objectId: userInfo?._id, 
    username: userInfo ? userInfo?.username : user.username, 
    name: userInfo ? userInfo?.name : user.firstName ?? "", 
    bio: userInfo ? userInfo?.bio : "", 
    image: userInfo ? userInfo?.image : user.imageUrl, 
  };

 
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now, to use Threds.
      </p>

      {/* Render the user account profile form component */}
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}


export default Page;
