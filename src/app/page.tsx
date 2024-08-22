
import Image from "next/image";
import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Sidebar from "@/components/sidebar";
import Chat from "@/components/chat";

async function getUserInfo() {
  const user = await currentUser()
  if (!user) {
    return null;
  }
  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    username: user.username,
  };
  return userData;
}

export default async function Home() {
  const userInfo = await getUserInfo();

  return (
    <main className="text-center w-full flex justify-center">
        <div className="justify-center flex text-center pt-8">
          <SignedOut>
            <h1 className="flex gap-2 text-4xl justify-center">Welcome to the casino</h1>
          </SignedOut>
          <SignedIn>
            <h1 className="flex gap-2 text-4xl justify-center">Welcome, {userInfo?.username}!</h1>
          </SignedIn>
        </div>
    </main>
  );
}
