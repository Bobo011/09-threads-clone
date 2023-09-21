import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

// Define the properties expected by the CommunityCard component
interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className="community-card">
      {/* Container for community information */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Link to the community's page */}
        <Link href={`/communities/${id}`} className="relative h-12 w-12">
          {/* Display the community's image */}
          <Image
            src={imgUrl}
            alt="community_logo"
            fill
            className="rounded-full object-cover"
          />
        </Link>

        <div>
          {/* Link to the community's page */}
          <Link href={`/communities/${id}`}>
            {/* Display the community's name */}
            <h4 className="text-base-semibold text-light-1">{name}</h4>
          </Link>
          {/* Display the community's username */}
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      {/* Display the community's bio */}
      <p className="mt-4 text-subtle-medium text-gray-1">{bio}</p>

      {/* Container for actions */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        {/* Link to view the community */}
        <Link href={`/communities/${id}`}>
          {/* Display a "View" button */}
          <Button size="sm" className="community-card_btn">
            View
          </Button>
        </Link>

        {/* Check if there are community members */}
        {members.length > 0 && (
          <div className="flex items-center">
            {/* Display images of community members */}
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 && "-ml-2"
                } rounded-full object-cover`}
              />
            ))}
            {/* Display the number of community members */}
            {members.length > 3 && (
              <p className="ml-1 text-subtle-medium text-gray-1">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
