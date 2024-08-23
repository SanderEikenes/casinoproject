import { url } from "inspector";
import Link from "next/link";
import Image from "next/image";

const games =  [
    {
    id: 1,
    image: "/minesposter.png",
    title: "Mines",
    url: "/mines",
    },
    {
    id: 2,
    image: "/coinflipposter.png",
    title: "Coinflip",
    url: "/coinflip",
    },
    {
    id: 3,
    image: "/minesposter.png",
    title: "Coinflip",
    url: "/mines",
    },
    {
    id: 4,
    image: "/coinflipposter.png",
    title: "Coinflip",
    url: "/coinflip",
    },
    {
    id: 5,
    image: "/minesposter.png",
    title: "Coinflip",
    url: "/mines",

    },
    {
    id: 6,
    image: "/coinflipposter.png",
    title: "Coinflip",
    url: "/coinflip",
    },
]


export default function Games() {
    return (
        <div className="w-full flex my-8 justify-between px-8">

            {games.map((game) => (
                <div key={game.id} className="rounded-lg w-auto h-full overflow-hidden hover:scale-105 transition-transform duration-200">
                    <Link href={game.url}>
                        <Image  src={game.image} width={200} height={200} alt={game.title} />
                    </Link>
                </div>
            ))}
        </div>
    );
}