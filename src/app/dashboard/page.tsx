"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar */}
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="text-xl font-bold text-gray-800">
                            🏡 Dashboard
                        </Link>
                        <Link href="/payment" className="text-gray-600 hover:text-black">
                            Payment
                        </Link>
                        <Link href="/installments" className="text-gray-600 hover:text-black">
                            Installments
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-black">
                            Contact Admin
                        </Link>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Payment Info Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">🧾 Your Payment Status</h2>
                        <p className="text-gray-600">View your payment history and status.</p>
                        <Link href="/payment">
                            <Button className="mt-4 w-full">View Payments</Button>
                        </Link>
                    </div>

                    {/* Installments Info Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">📅 Upcoming Installments</h2>
                        <p className="text-gray-600">Check due installments and deadlines.</p>
                        <Link href="/installments">
                            <Button className="mt-4 w-full">Upcoming Installments</Button>
                        </Link>
                    </div>

                    {/* Contact Admin Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">📞 Need Help?</h2>
                        <p className="text-gray-600">Contact support if you have any issues.</p>
                        <Link href="/contact">
                            <Button className="mt-4 w-full">Contact Admin</Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
