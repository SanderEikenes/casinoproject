import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import UserCurrency from './userCurrency'
import Link from 'next/link'
import Image from 'next/image'
import { currentUser } from "@clerk/nextjs/server";
import { Wallet, Dices, Dumbbell, PlusSquare } from 'lucide-react';
import { Button } from './ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import CoinBank from './coinBank';
  

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

export default async function Nav() {
    return (
        <header>
            <nav className="items-center justify-between flex mx-4 my-4">
                <div className='flex items-center'>
                    <Link className='flex items-center' href="/">
                        <h1 className='text-2xl font-bold'>Mango</h1>
                    </Link>
                    <ul className='flex gap-4 mx-16 text-xl font-medium'>
                            <li>
                                <Link href="/mines" className='flex gap-2'>
                                    <Dices size={24}/>
                                    Casino
                                </Link>
                            </li>
                            <li>
                                <Link href="/mines" className='flex gap-2'>
                                    <Dumbbell size={24}/>
                                    Sports
                                </Link>
                            </li>
                    </ul>
                </div>
                
                <div className='flex text-xl'>

                    
                    <div className='items-center text-white'>
                        <SignedIn>
                        <li className='flex gap-2 items-center text-white'>
                            <div className='text-2xl'>
                                <UserButton/>
                            </div>
                            <div className='flex flex-col text-sm'>
                                <p>Blance</p>
                                <UserCurrency />
                            </div>

                            <Popover>
                                <PopoverTrigger>
                                <PlusSquare size={28} className='mx-4 hover:scale-125 transition-transform duration-200'/>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <CoinBank />
                                </PopoverContent>
                            </Popover>

                        </li>
                        </SignedIn>
                        <SignedOut>
                        <li>
                            <SignInButton />
                        </li>
                        </SignedOut>
                    </div>
                </div>
            </nav>
        </header>
    )
}