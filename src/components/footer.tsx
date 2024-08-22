import { Github, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex bg-secondary justify-between p-8 rounded-lg">
            <div className="flex flex-col w-2/12 mx-8">
                <h1 className='text-2xl font-bold'>Mango</h1>
                <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div className="mx-8">
                <h3 className="text-xl font-bold">About</h3>
                <ul>
                    <li><Link href="/about">About us</Link></li>
                    <li><Link href="/contact">Contact us</Link></li>
                    <li><Link href="/careers">Careers</Link></li>
                </ul>
            </div>
            <div className="mx-8">
                <h3 className="text-xl font-bold">Help</h3>
                <ul>
                    <li><Link href="/about">About us</Link></li>
                    <li><Link href="/contact">Contact us</Link></li>
                    <li><Link href="/careers">Careers</Link></li>
                </ul>
            </div>
            <div className="w-5/12">
                <h3 className="text-xl font-bold ">Disclaimer</h3>
                <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate cumque vero reiciendis expedita, odit ab illo neque! Aperiam, reiciendis maxime libero voluptatum minus officia illo porro totam quo expedita quia.
                </p>
                <div className="flex flex-row gap-4 mt-4">
                    <Instagram size={24} />
                    <Github size={24} />
                </div>
            </div>
        </footer>
    );
}