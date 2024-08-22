import { Shell, Gem, Coins } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <div className="mx-4 p-4 h-full w-min rounded-lg bg-secondary">
            <ul className='items-center text-center flex flex-col gap-y-12'>
            
            <li>
                <Link href="/coinflip" className="flex flex-col items-center">
                    <Coins size={32} />
                    <p>Coinflip</p>
                </Link>
            </li>
            <li>
                <Link href="/mines" className="flex flex-col items-center">
                    <Gem size={32} />
                    <p>Mines</p>
                </Link>
            </li>

            <li>
                <Link href="/mines" className="flex flex-col items-center">
                    <Gem size={32} />
                    <p>Mines</p>
                </Link>
            </li>

            <li>
                <Link href="/mines" className="flex flex-col items-center">
                    <Gem size={32} />
                    <p>Mines</p>
                </Link>
            </li>

            <li>
                <Link href="/mines" className="flex flex-col items-center">
                    <Gem size={32} />
                    <p>Mines</p>
                </Link>
            </li>

            <li>
                <Link href="/mines" className="flex flex-col items-center">
                    <Gem size={32} />
                    <p>Mines</p>
                </Link>
            </li>
            </ul>
        </div>
    );
}