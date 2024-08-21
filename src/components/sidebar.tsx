import { Shell, Gem, Coins } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <div className="mx-4 p-4 h-full rounded-lg bg-gray-200">
            <ul className='items-center text-center flex flex-col'>
            <li className="my-2">
                <Link href="/" className="flex flex-col items-center">
                    <Coins size={32} />
                    <p>Coinflip</p>
                </Link>
            </li>
            <li className="my-2">
                <Link href="/mines" className="flex flex-col items-center">
                    <Gem size={32} />
                    <p>Mines</p>
                </Link>
            </li>
            </ul>
        </div>
    );
}