"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AuthGuard from "@/components/AuthGuard";

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

const ALL_SHAREHOLDERS = [
    "sakifyeaser75@gmail.com",
    "yeaser.sakif@gmail.com",
    "umarnasib13@gmail.com",
    // Add more shareholder emails here
];

export default function StatusPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            const { data, error } = await supabase.from("payments").select("*");

            if (error) {
                console.error(error);
            } else {
                setPayments(data as Payment[]);
            }

            setLoading(false);
        };

        fetchPayments();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Find users who have paid
    const paidUserIds = payments.map((p) => p.user_id);

    // Find unpaid shareholders
    const unpaidShareholders = ALL_SHAREHOLDERS.filter(
        (email) => !payments.some((p) => p.user_id === email)
    );

    return (
        <AuthGuard>
            <div className="max-w-4xl p-8 mx-auto mt-10 bg-white border rounded shadow space-y-8">
                <h1 className="text-3xl font-bold text-center">Payment Status</h1>

                <div>
                    <h2 className="text-xl font-semibold mb-4">✅ Paid Shareholders:</h2>
                    <ul className="space-y-2 list-disc list-inside">
                        {payments.map((payment) => (
                            <li key={payment.id}>
                                <div>
                                    <strong>Reference No:</strong> {payment.reference_number} |{" "}
                                    <strong>Month:</strong> {payment.installment_month} |{" "}
                                    <strong>Amount:</strong> {payment.installment_amount} BDT
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-8 border-t">
                    <h2 className="text-xl font-semibold mb-4">🚫 Unpaid Shareholders:</h2>
                    <ul className="space-y-2 list-disc list-inside">
                        {unpaidShareholders.map((email, idx) => (
                            <li key={idx}>{email}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthGuard>
    );
}
