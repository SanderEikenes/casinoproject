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
import Footer from "@/components/footer";

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
        
        <html lang="en" suppressHydrationWarning> 
          <body className={`flex ${inter.className}`}>
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            >

            <div className="flex-col flex flex-grow">
              <Nav />
              <div className="flex">
                <Sidebar />
                <div className="w-full justify-between flex flex-col">
                  {children}
                  <Footer />
                </div>
              </div>
            </div>

            <Chat />

            </ThemeProvider>
          </body>
        </html>
        
      </ClerkProvider>

  );
}
