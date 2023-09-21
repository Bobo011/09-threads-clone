"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";

// Define the Bottombar component
function Bottombar() {
  // Get the current pathname using the Next.js navigation hook
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {/* Map over the sidebarLinks array to create navigation links */}
        {sidebarLinks.map((link) => {
          // Check if the link is currently active based on the pathname
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          // Render a Link component for each sidebar link
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              {/* Display an image icon for the link */}
              <Image
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className="object-contain"
              />

              {/* Display the link label, truncated for small screens */}
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;