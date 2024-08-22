import Coinflip from "@/components/coinflip";

export default function Page() {
    return (
        <div className="text-center w-full flex-col flex">
            <h1 className="text-4xl">Coinflip</h1>
            <Coinflip />
        </div>
    );
}