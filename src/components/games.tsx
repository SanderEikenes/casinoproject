import Image from "next/image";

const games =  [
    {
    id: 1,
    image: "/minesposter.png",
    title: "Mines",
    },
    {
    id: 2,
    image: "/minesposter.png",
    title: "Coinflip",
    },
    {
    id: 3,
    image: "/minesposter.png",
    title: "Coinflip",
    },
    {
    id: 4,
    image: "/minesposter.png",
    title: "Coinflip",
    },
    {
    id: 5,
    image: "/minesposter.png",
    title: "Coinflip",
    },
    {
    id: 6,
    image: "/minesposter.png",
    title: "Coinflip",
    },
]


export default function Games() {
    return (
        <div className="w-full flex my-8 justify-between px-8">

            {games.map((game) => (
                <div className="rounded-lg w-auto h-full overflow-hidden">
                    <Image key={game.id} src={game.image} width={200} height={200} alt={game.title} />
                </div>
            ))}
        </div>
    );
}