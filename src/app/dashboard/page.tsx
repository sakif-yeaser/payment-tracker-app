"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar */}

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
                </div>
            </main>
        </div>
    );
}
