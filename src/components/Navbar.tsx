"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data } = await supabase.auth.getSession();
            const session = data.session;
            setIsLoggedIn(!!session);

            if (session?.user?.email === "sakif@example.com") {
                setIsAdmin(true);
            }
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login";
    };

    const NavLink = ({
                         href,
                         label,
                     }: {
        href: string;
        label: string;
    }) => (
        <Link
            href={href}
            className={cn(
                "text-gray-600 hover:text-gray-900 font-medium transition",
                pathname === href && "text-blue-600 font-semibold"
            )}
        >
            {label}
        </Link>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <div className="text-xl font-bold text-gray-800">Payment Tracker</div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {isLoggedIn && (
                        <>
                            <NavLink href="/dashboard" label="Dashboard" />
                            <NavLink href="/payment" label="Submit Payment" />
                            <NavLink href="/status" label="Payment Status" />

                            {isAdmin && (
                                <>
                                    <NavLink href="/admin" label="Admin Panel" />
                                    <NavLink href="/admin/reminder" label="Send Reminder" />
                                </>
                            )}
                            <button
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md flex flex-col gap-4 px-6 pb-6">
                    <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                            "block text-gray-600 hover:text-gray-900 font-medium transition",
                            pathname === "/" && "text-blue-600 font-semibold"
                        )}
                    >
                        Home
                    </Link>

                    {isLoggedIn && (
                        <>
                            <Link
                                href="/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                    "block text-gray-600 hover:text-gray-900 font-medium transition",
                                    pathname === "/dashboard" && "text-blue-600 font-semibold"
                                )}
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/payment"
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                    "block text-gray-600 hover:text-gray-900 font-medium transition",
                                    pathname === "/payment" && "text-blue-600 font-semibold"
                                )}
                            >
                                Submit Payment
                            </Link>

                            <Link
                                href="/status"
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                    "block text-gray-600 hover:text-gray-900 font-medium transition",
                                    pathname === "/status" && "text-blue-600 font-semibold"
                                )}
                            >
                                Payment Status
                            </Link>

                            {isAdmin && (
                                <>
                                    <Link
                                        href="/admin"
                                        onClick={() => setMenuOpen(false)}
                                        className={cn(
                                            "block text-gray-600 hover:text-gray-900 font-medium transition",
                                            pathname === "/admin" && "text-blue-600 font-semibold"
                                        )}
                                    >
                                        Admin Panel
                                    </Link>
                                    <Link
                                        href="/admin/reminder"
                                        onClick={() => setMenuOpen(false)}
                                        className={cn(
                                            "block text-gray-600 hover:text-gray-900 font-medium transition",
                                            pathname === "/admin/reminder" && "text-blue-600 font-semibold"
                                        )}
                                    >
                                        Send Reminder
                                    </Link>
                                </>
                            )}

                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    handleLogout();
                                }}
                                className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
