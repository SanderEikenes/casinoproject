import Coinflip from "@/components/coinflip";
import LuckyWheel from "@/components/luckywheel";

export default function Page() {
    return (
        <div className="text-center w-full flex-col flex">
            <h1 className="text-4xl">Coinflip</h1>
            <Coinflip />
            <LuckyWheel />
        </div>
    );
}