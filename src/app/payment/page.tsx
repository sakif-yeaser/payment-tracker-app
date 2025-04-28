"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
    const [formData, setFormData] = useState({
        email: "",
        shareholderName: "",
        installmentMonth: "",
        bankName: "",
        installmentAmount: "6500",
        transactionDate: "",
        referenceNumber: "",
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Insert into Supabase
            const {error } = await supabase.from("payments").insert([
                {
                    email: formData.email,
                    shareholder_name: formData.shareholderName,
                    installment_month: formData.installmentMonth,
                    bank_name: formData.bankName,
                    installment_amount: Number(formData.installmentAmount),
                    transaction_date: formData.transactionDate,
                    reference_number: formData.referenceNumber,
                },
            ]);

            if (error) throw error;

            // Optionally: Trigger an email to admins here
            await fetch("/api/send-email", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            alert("✅ Payment submitted successfully!");
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            alert("❌ Error submitting payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">💳 Payment Submission</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                    <Label htmlFor="shareholderName">Shareholder Name</Label>
                    <Input type="text" name="shareholderName" id="shareholderName" value={formData.shareholderName} onChange={handleChange} required />
                </div>

                <div>
                    <Label htmlFor="installmentMonth">Installment Month (Year)</Label>
                    <Input type="text" name="installmentMonth" id="installmentMonth" placeholder="e.g., April 2025" value={formData.installmentMonth} onChange={handleChange} required />
                </div>

                <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input type="text" name="bankName" id="bankName" value={formData.bankName} onChange={handleChange} required />
                </div>

                <div>
                    <Label htmlFor="installmentAmount">Installment Amount</Label>
                    <select name="installmentAmount" id="installmentAmount" className="w-full p-2 border rounded" value={formData.installmentAmount} onChange={handleChange}>
                        <option value="6500">6500 BDT</option>
                        <option value="13000">13000 BDT</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="transactionDate">Transaction Date</Label>
                    <Input type="date" name="transactionDate" id="transactionDate" value={formData.transactionDate} onChange={handleChange} required />
                </div>

                <div>
                    <Label htmlFor="referenceNumber">Reference Number</Label>
                    <Input type="text" name="referenceNumber" id="referenceNumber" value={formData.referenceNumber} onChange={handleChange} required />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Submitting..." : "Submit Payment"}
                </Button>
            </form>
        </div>
    );
}
