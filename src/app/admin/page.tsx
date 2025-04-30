"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AuthGuard from "@/components/AuthGuard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

interface Payment {
    id: string;
    user_id: string;
    installment_month: string;
    bank_name: string;
    installment_amount: number;
    transaction_date: string;
    reference_number: string;
    created_at: string;
}


const SHAREHOLDER_EMAILS = [
    // Put all shareholder emails here:
    "ashrafanam318@gmail.com",
    "yeaser.sakif@gmail.com",
    "umarnasib13@gmail.com",
    "mnhoque76@gmail.com",
    "md.mazidulhasan1@gmail.com",
    "shahena.akhter001@gmail.com",
    "sakibsyed01@gmail.com",
    "imranhossain21bd@gmail.com",
    "md.fahimhasnat.bd@gmail.com",
    "imamhossain1310@gmail.com",
    "shajjadhowlader@gmail.com",
    "sejan17@gmail.com",
    "mrasif30@gmail.com",
    "dr.ashique1985@gmail.com",
    "imammehedibappy@gmail.com"
    // Add more if needed
];

export default function AdminPage() {
    const router = useRouter();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const checkAdmin = async () => {
            const { data } = await supabase.auth.getUser();
            const email = data.user?.email ?? null;
            console.log("user info",data)
            setUserEmail(email);

            if (!email || 'adtl.management@gmail.com' !== email) {
                alert("Access denied. Only admins can view this page.");
                router.push("/login");
                return;
            }

            await fetchPayments();
        };

        const fetchPayments = async () => {
            const { data, error } = await supabase.from("payments").select("*");

            if (error) {
                console.error(error);
            } else {
                setPayments(data as Payment[]);
                setPayments(data as Payment[]);
            }

            setLoading(false);
        };

        checkAdmin();
    }, [router]);

    const downloadCSV = () => {
        const headers = [
            "Shareholder Email",
            "Installment Month",
            "Bank Name",
            "Amount (BDT)",
            "Transaction Date",
            "Reference Number",
            "Submitted At",
        ];

        const rows = payments.map((payment) => [
            payment.user_id,
            payment.installment_month,
            payment.bank_name,
            payment.installment_amount,
            payment.transaction_date,
            payment.reference_number,
            new Date(payment.created_at).toLocaleString(),
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `payments_${new Date().toISOString()}.csv`);
    };

    const totalShareholders = SHAREHOLDER_EMAILS.length;
    const paidShareholders = new Set(payments.map((p) => p.user_id)).size;
    const totalAmountCollected = payments.reduce((sum, p) => sum + p.installment_amount, 0);
    const pendingShareholders = totalShareholders - paidShareholders;
    const paymentRate = ((paidShareholders / totalShareholders) * 100).toFixed(2);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthGuard>
            <div className="max-w-7xl p-8 mx-auto mt-10 bg-white border rounded shadow space-y-8">
                <h1 className="text-3xl font-bold text-center">Admin Panel: Payment Submissions</h1>

                {/* Dashboard Metrics Section */}
                <div className="grid grid-cols-2 gap-6 p-4 md:grid-cols-4">
                    <div className="p-4 bg-green-100 rounded shadow">
                        <h2 className="text-lg font-bold">Total Shareholders</h2>
                        <p className="text-2xl">{totalShareholders}</p>
                    </div>
                    <div className="p-4 bg-blue-100 rounded shadow">
                        <h2 className="text-lg font-bold">Total Collected</h2>
                        <p className="text-2xl">{totalAmountCollected} BDT</p>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded shadow">
                        <h2 className="text-lg font-bold">Pending Payments</h2>
                        <p className="text-2xl">{pendingShareholders}</p>
                    </div>
                    <div className="p-4 bg-purple-100 rounded shadow">
                        <h2 className="text-lg font-bold">Payment Rate</h2>
                        <p className="text-2xl">{paymentRate}%</p>
                    </div>
                </div>

                {/* Download Button */}
                <div className="flex justify-end mb-4">
                    <Button variant="default" onClick={downloadCSV}>
                        Download CSV
                    </Button>
                </div>

                {/* Payment Table */}
                <table className="w-full text-sm border-collapse">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Shareholder Email</th>
                        <th className="border p-2">Installment Month</th>
                        <th className="border p-2">Bank Name</th>
                        <th className="border p-2">Amount</th>
                        <th className="border p-2">Transaction Date</th>
                        <th className="border p-2">Reference Number</th>
                        <th className="border p-2">Submitted At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id} className="odd:bg-white even:bg-gray-50">
                            <td className="border p-2">{payment.user_id}</td>
                            <td className="border p-2">{payment.installment_month}</td>
                            <td className="border p-2">{payment.bank_name}</td>
                            <td className="border p-2">{payment.installment_amount} BDT</td>
                            <td className="border p-2">{payment.transaction_date}</td>
                            <td className="border p-2">{payment.reference_number}</td>
                            <td className="border p-2">{new Date(payment.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Back Button */}
                <div className="flex justify-center mt-8">
                    <Button variant="outline" onClick={() => router.push("/")}>
                        Back to Home
                    </Button>
                </div>
            </div>
        </AuthGuard>
    );
}
