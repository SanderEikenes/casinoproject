
import Image from "next/image";
import { ClerkProvider, SignedIn, useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Sidebar from "@/components/sidebar";

async function getUserInfo() {
  const user = await currentUser()
  if (!user) {
    return null;
  }
  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
  };
  return userData;
}

export default async function Home() {
  const userInfo = await getUserInfo();

  return (
    <main className="">
      <div className="flex flex-row">
        <Sidebar />
        <div className="justify-center w-full flex-col text-center pt-8">
          <SignedIn>
            <h1 className="flex gap-2 text-4xl justify-center">Welcome, {userInfo?.firstName}!</h1>
          </SignedIn>
        </div>

      </div>
    </main>
  );
}
