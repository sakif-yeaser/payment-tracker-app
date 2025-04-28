// app/payment-status/page.tsx

'use client';

import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface Payment {
    id: string;
    shareholder_name: string;
    email: string;
    installment_month: string; // e.g., "2025-04"
    installment_amount: number;
    transaction_date: string;
    reference_number: string;
    created_at: string;
}

export default function PaymentStatusPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    const currentMonth = format(new Date(), 'yyyy-MM'); // eg. "2025-04"

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('payments') // your table
                .select('*')
                .eq('installment_month', currentMonth); // filter by current month

            if (!error && data) {
                setPayments(data);
            }
            setLoading(false);
        };

        fetchPayments();
    }, [currentMonth]);

    if (loading) {
        return <div className="p-6 text-center">Loading payments...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Payment Status - {currentMonth}</h1>
            <div className="grid grid-cols-1 gap-4">
                {payments.length === 0 && <div>No payments recorded for this month.</div>}

                {payments.map((payment) => (
                    <div
                        key={payment.id}
                        className={`border p-4 rounded-lg shadow-md ${
                            payment.installment_amount === 0 ? 'bg-red-100' : 'bg-green-100'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">{payment.shareholder_name}</h2>
                                <p className="text-sm text-gray-600">{payment.email}</p>
                                <p className="text-sm">
                                    Paid: <strong>{payment.installment_amount || '0'} BDT</strong>
                                </p>
                            </div>

                            {payment.installment_amount === 0 && (
                                <span className="text-red-600 font-bold">NOT PAID</span>
                            )}
                            {payment.installment_amount > 0 && (
                                <span className="text-green-600 font-bold">PAID</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
