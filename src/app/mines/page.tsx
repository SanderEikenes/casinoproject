import Sidebar from "@/components/sidebar";
import dynamic from "next/dynamic";
const Mines = dynamic(() => import("@/components/mines"), { ssr: false });

export default function Page() {
    return (
        <div className="flex flex-row justify-between text-center">
            <Sidebar />
            <div className="justify-center w-full flex-col text-center pt-8">
                <Mines />
            </div>
        </div>
    );
}