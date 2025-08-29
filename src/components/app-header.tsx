import { Navbar } from "flowbite-react";
import { Wifi } from "lucide-react";
import Link from "next/link";

export default function AppHeader() {
    return (
        <Navbar fluid rounded className="bg-blue-900 shadow-md fixed w-full z-50 top-0 left-0 border-b border-blue-800">
            <div className="flex items-center gap-3">
                <Wifi className="text-green-400 w-9 h-9 drop-shadow-lg" />
                <span className="self-center whitespace-nowrap text-2xl font-extrabold text-white tracking-wide">
                    Monitoramento IoT
                </span>
            </div>
            <div className="flex gap-4">
                <Link href="/" className="text-white hover:text-green-400 font-semibold transition-colors px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200">Dashboard</Link>
                <Link href="/devices" className="text-white hover:text-green-400 font-semibold transition-colors px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200">Dispositivos</Link>
            </div>
        </Navbar>
    );
}
