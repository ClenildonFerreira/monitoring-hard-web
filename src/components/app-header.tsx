"use client";
import { Navbar } from "flowbite-react";
import { Wifi } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppHeader() {
    const pathname = usePathname();
    return (
        <Navbar fluid rounded className="bg-blue-700 shadow-md fixed w-full z-50 top-0 left-0 border-b border-blue-800">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer select-none">
                <Wifi className="text-blue-400 w-9 h-9 drop-shadow-lg group-hover:text-blue-300 transition-colors" />
                <span className="self-center whitespace-nowrap text-2xl font-extrabold text-white tracking-wide group-hover:text-blue-300 transition-colors">
                    Monitoramento IoT
                </span>
            </Link>
            <div className="flex gap-4">
                <Link
                    href="/"
                    className={`font-semibold transition-colors px-3 py-1 rounded-md focus:outline-none ${pathname === "/" ? "bg-blue-500 text-white" : "text-white hover:text-green-400"}`}
                >
                    Dashboard
                </Link>
                <Link
                    href="/devices"
                    className={`font-semibold transition-colors px-3 py-1 rounded-md focus:outline-none ${pathname === "/devices" ? "bg-blue-500 text-white" : "text-white hover:text-green-400"}`}
                >
                    Dispositivos
                </Link>
            </div>
        </Navbar>
    );
}