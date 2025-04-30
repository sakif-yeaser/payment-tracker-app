"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { differenceInCalendarDays, format, isAfter, parseISO } from "date-fns";

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
const dueDate = new Date(`${currentYear}-${new Date().getMonth() + 1}-10`);

export default function DashboardPage() {
    const [paid, setPaid] = useState<string[]>([]);
    const [latePayers, setLatePayers] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            const { data, error } = await supabase
                .from("payments")
                .select("shareholder_name, transaction_date")
                .eq("month", currentMonth)
                .eq("year", currentYear);

            if (error) {
                console.error("Error fetching payment data:", error.message);
            } else if (data) {
                const paidList: string[] = [];
                const lateList: string[] = [];

                data.forEach((record) => {
                    if (record.shareholder_name) {
                        const isLate = isAfter(parseISO(record.transaction_date), dueDate);
                        paidList.push(record.shareholder_name);
                        if (isLate) {
                            lateList.push(record.shareholder_name);
                        }
                    }
                });

                setPaid(paidList);
                setLatePayers(lateList);
            }
            setLoading(false);
        };

        fetchPayments();
    }, []);

    const pending = shareholders.filter(
        (name) => !paid.includes(name)
    );

    const daysLeft = Math.max(0, differenceInCalendarDays(dueDate, new Date()));

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-6 space-y-10">
            <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 border border-blue-400 rounded-2xl p-6 shadow-md w-full md:w-1/2">
                    <div className="text-4xl font-bold text-blue-700">💰 Monthly Payment Due</div>
                    <div className="text-2xl mt-2 text-blue-900">10th {currentMonth} {currentYear}</div>
                    <div className="text-lg mt-1 text-gray-700">{daysLeft} days remaining</div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-green-700 mb-2">✅ Paid</h2>
                <div className="flex flex-wrap gap-3">
                    {paid
                        .filter((name) => !latePayers.includes(name))
                        .sort()
                        .map((name) => (
                            <div
                                key={name}
                                className="px-4 py-2 rounded-xl bg-green-100 text-green-800 font-medium shadow"
                            >
                                {name}
                            </div>
                        ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-red-700 mb-2">❌ Pending</h2>
                <div className="flex flex-wrap gap-3">
                    {pending.sort().map((name) => (
                        <div
                            key={name}
                            className="px-4 py-2 rounded-xl bg-red-100 text-red-800 font-medium shadow"
                        >
                            {name}
                        </div>
                    ))}
                </div>
            </div>

            {latePayers.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold text-yellow-700 mb-2">🚨 Paid Late! Next Time, On Time?</h2>
                    <div className="flex flex-wrap gap-3">
                        {latePayers.sort().map((name) => (
                            <div
                                key={name}
                                className="px-4 py-2 rounded-xl bg-yellow-100 text-yellow-800 font-medium shadow"
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
