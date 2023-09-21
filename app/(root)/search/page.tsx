import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";


async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // Check if a user is currently authenticated using Clerk
  const user = await currentUser();
  if (!user) return null; // If not authenticated, return null

  // Fetch user information using the provided user's ID
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding"); // Redirect if not onboarded

  // Fetch a list of users based on search criteria
  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* Render a search bar component for searching users */}
      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {/* Render user cards for each user in the search result */}
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>

      {/* Render pagination component for navigating through search results */}
      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Page; 
