import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider"
import Chat from "@/components/chat";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Casino website",
  description: "Made by Sander Eikenes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <ClerkProvider>
        
        <html lang="en"> 
          <body className={`flex justify-between ${inter.className}`}>
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            >

            <div className="flex-col flex flex-grow">
              <Nav />
              <div className="flex justify-between">
                <Sidebar />
                {children}
              </div>
            </div>

            <Chat />

            </ThemeProvider>
          </body>
        </html>
        
      </ClerkProvider>

  );
}
