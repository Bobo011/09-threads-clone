import "../globals.css"; 
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import {
  Bottombar,
  LeftSidebar,
  RightSidebar,
  Topbar,
} from "@/components/shared";

const inter = Inter({ subsets: ["latin"] }); // Initialize the Inter font with Latin character subset

export const metadata: Metadata = {
  title: "Threads", // Metadata for the page title
  description: "A Next.js 13 Meta Threads application", // Metadata for the page description
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Define a functional component named RootLayout that takes children as props
}) {
  return (
    <ClerkProvider>
      {" "}
      {/* Provide Clerk authentication context */}
      <html lang="en">
        {" "}
        {/* Define the language for the HTML document */}
        <body className={inter.className}>
          {" "}
          {/* Apply the Inter font style to the body */}
          <Topbar /> {/* Render the top navigation bar component */}
          <main className="flex flex-row">
            {" "}
            {/* Create the main content container */}
            <LeftSidebar /> {/* Render the left sidebar component */}
            <section className="main-container">
              {" "}
              {/* Create the main content section */}
              <div className="w-full max-w-4xl">{children}</div>{" "}
              {/* Render the children (page content) */}
            </section>
            <RightSidebar /> {/* Render the right sidebar component */}
          </main>
          <Bottombar /> {/* Render the bottom navigation bar component */}
        </body>
      </html>
    </ClerkProvider>
  );
}
