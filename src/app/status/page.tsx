"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PaymentRecord {
    shareholder_name: string;
    amount: number;
    month: string;
    year: string;
    transaction_date: string;
    reference_number: string;
}

export default function PaymentStatusPage() {
    const [latestPayments, setLatestPayments] = useState<Record<string, PaymentRecord | null>>({});
    const [loading, setLoading] = useState(true);

    const shareholders = [
        "Shakil Ashraful Anam",
        "Sakif Yeaser",
        "Abdullah Umar Nasib",
        "Nurul Hoque Shohel",
        "MD Mazidul Hasan",
        "Shahena Akther",
        "Syed Nazmus Shakib",
        "Imran Hossain",
        "Fahim Hasnat",
        "Imam Hossain",
        "Imam Mehedi",
        "Md. Shajjad Howlader",
        "Sejan Mahmud",
        "Mahfuzur Rahman",
        "Ashiqur Rahman Mahmud",
    ];

    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    const currentYear = new Date().getFullYear().toString();

    useEffect(() => {
        const fetchLatestPayments = async () => {
            const result: Record<string, PaymentRecord | null> = {};
            for (const name of shareholders) {
                const { data, error } = await supabase
                    .from("payments")
                    .select("shareholder_name, amount, month, year, transaction_date, reference_number")
                    .eq("shareholder_name", name)
                    .order("transaction_date", { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (error) {
                    console.error(`Error fetching payment for ${name}:`, error.message);
                }

                result[name] = data || null;
            }

            setLatestPayments(result);
            setLoading(false);
        };

        fetchLatestPayments();
    }, [currentMonth, currentYear]);

    if (loading) return <div className="p-6">Loading payment status...</div>;

    const sortedShareholders = [...shareholders].sort((a, b) => {
        const aPaid =
            latestPayments[a]?.month === currentMonth &&
            latestPayments[a]?.year === currentYear;
        const bPaid =
            latestPayments[b]?.month === currentMonth &&
            latestPayments[b]?.year === currentYear;

        // Sort paid first
        return Number(bPaid) - Number(aPaid);
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Payment Status</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedShareholders.map((name) => {
                    const payment = latestPayments[name];
                    const isPaidThisMonth =
                        payment?.month === currentMonth &&
                        payment?.year === currentYear;

                    return (
                        <Card
                            key={name}
                            className={cn(
                                "border-2 transition-all",
                                isPaidThisMonth ? "border-green-500" : "border-red-500 bg-red-100"
                            )}
                        >
                            <CardContent className="p-4 space-y-1">
                                <p className="text-lg font-semibold">{name}</p>
                                <p
                                    className={cn(
                                        "text-sm font-bold",
                                        isPaidThisMonth ? "text-green-700" : "text-red-700"
                                    )}
                                >
                                    {isPaidThisMonth ? "✅ Paid this month" : "❌ Not yet paid"}
                                </p>

                                {payment ? (
                                    <div className="text-sm text-gray-700 mt-2 space-y-1">
                                        <p>💳 Last Payment: {payment.amount} BDT</p>
                                        <p>📅 Month: {payment.month}, {payment.year}</p>
                                        <p>🕒 Date: {new Date(payment.transaction_date).toLocaleDateString()}</p>
                                        <p>🔖 Ref: {payment.reference_number}</p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 mt-2 italic">No payment record</p>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
