"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/*interface PaymentRecord {
    id: number;
    email: string;
    shareholder_name: string;
    month: string;
    year: string;
    amount: number;
}*/

export default function PaymentStatusPage() {
    const [paidShareholders, setPaidShareholders] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const shareholders = [
        "Shakil Ashraful Anam",
        "Sakif Yeaser",
        "Abdullah Umar Nasib",
        "Nurul Hoque Shohel",
        "MD Mazidul Hasan & Shahena Akther",
        "Syed Nazmus Shakib",
        "Imran Hossain",
        "Fahim Hasnat",
        "Imam Hossain & Imam Mehedi",
        "Md. Shajjad Howlader",
        "Sejan Mahmud",
        "Mahfuzur Rahman",
        "Ashiqur Rahman Mahmud",
    ];

    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    const currentYear = new Date().getFullYear().toString();

    useEffect(() => {
        const fetchPaidShareholders = async () => {
            const { data, error } = await supabase
                .from("payments")
                .select<"shareholder_name">("shareholder_name")
                .eq("month", currentMonth)
                .eq("year", currentYear);

            if (error) {
                console.error("Error fetching payment data:", error.message);
            } else if (data) {
                const paidNames = data.map((record) => record.shareholder_name);
                setPaidShareholders(paidNames);
            }
            setLoading(false);
        };

        fetchPaidShareholders();
    }, [currentMonth, currentYear]);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Payment Status</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shareholders.map((name) => (
                    <Card
                        key={name}
                        className={cn(
                            "border-2",
                            paidShareholders.includes(name)
                                ? "border-green-500"
                                : "border-red-500 bg-red-100"
                        )}
                    >
                        <CardContent className="p-4">
                            <p className="text-lg">{name}</p>
                            <p
                                className={cn(
                                    "text-sm font-semibold",
                                    paidShareholders.includes(name)
                                        ? "text-green-700"
                                        : "text-red-700"
                                )}
                            >
                                {paidShareholders.includes(name) ? "Paid" : "Pending"}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
