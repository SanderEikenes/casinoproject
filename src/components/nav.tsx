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

export default function Nav() {
    return (
        <header>
            <nav className="items-center justify-between flex mx-8 my-4">
                <div className='flex items-center'>
                    <Link className='flex items-center' href="/">
                        <h1 className='text-4xl font-bold ml-4'>Mango Kasino</h1>
                    </Link>
                    <ul className='flex gap-4 mx-16 text-xl font-medium'>
                            <li>
                                <Link href="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                            <a href="/mines">Mines</a>
                            </li>
                            <li>
                            <a href="/roll">Roll</a>
                            </li>
                    </ul>
                </div>
                
                <div className='flex text-xl'>

                    
                    <div className='items-center'>
                        <SignedIn>
                        <li className='flex gap-2'>
                            <UserCurrency />
                            <UserButton />
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