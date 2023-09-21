"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
  pageNumber: number;
  isNext: boolean;
  path: string;
}

function Pagination({ pageNumber, isNext, path }: Props) {
  const router = useRouter();

  // Define a function to handle page navigation
  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;

    // Update the nextPageNumber based on the navigation type
    if (type === "prev") {
      nextPageNumber = Math.max(1, pageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = pageNumber + 1;
    }

    // Build the new route and navigate to it
    if (nextPageNumber > 1) {
      router.push(`/${path}?page=${nextPageNumber}`);
    } else {
      router.push(`/${path}`);
    }
  };

  // If it's not possible to navigate to the previous or next page, return null
  if (!isNext && pageNumber === 1) return null;

  // Render the pagination UI
  return (
    <div className="pagination">
      <Button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
        className="!text-small-regular text-light-2"
      >
        Prev
      </Button>
      <p className="text-small-semibold text-light-1">{pageNumber}</p>
      <Button
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className="!text-small-regular text-light-2"
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
