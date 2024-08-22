import Sidebar from "@/components/sidebar";
import dynamic from "next/dynamic";
const Mines = dynamic(() => import("@/components/mines"), { ssr: false });

export default function Page() {
    return (
        <div className="text-center w-full flex justify-center">
                <Mines />
        </div>
    );
}