"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";

interface Props {
  routeType: string;
}

// Define the Searchbar component that takes props
function Searchbar({ routeType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // useEffect to trigger a search after a 0.3-second delay of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        // Redirect to the search results page with the search query
        router.push(`/${routeType}?q=` + search);
      } else {
        // Redirect to the base page if there is no search query
        router.push(`/${routeType}`);
      }
    }, 300);

    // Cleanup the timer when the component unmounts or when search changes
    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className="searchbar">
      {/* Render a search icon */}
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />

      {/* Render an input field for search */}
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routeType !== "/search" ? "Search communities" : "Search creators"
        }`}
        className="no-focus searchbar_input"
      />
    </div>
  );
}

export default Searchbar;
