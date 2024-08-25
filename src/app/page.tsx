
import Image from "next/image";
import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Sidebar from "@/components/sidebar";
import Chat from "@/components/chat";
import Games from "@/components/games";
import LiveFeed from "@/components/liveFeed";

export default async function Home() {
  return (
    <main className="w-full flex flex-col justify-center">
        <div className="w-full flex pt-8 px-8">
          <SignedOut>
            <h1 className="gap-2 text-4xl">Popular games</h1>
          </SignedOut>
          <SignedIn>
            <h1 className="gap-2 text-4xl">Popular games</h1>
          </SignedIn>
        </div>
        <Games />
        <LiveFeed />
    </main>
  );
}
