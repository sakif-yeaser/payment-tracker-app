"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

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
    "Ashiqur Rahman Mahmud"
];

const amounts = ["6500", "13000"];

export default function PaymentForm() {
    const [formData, setFormData] = useState({
        email: "",
        shareholderName: "",
        month: "",
        year: "",
        bankName: "",
        amount: "",
        transactionDate: "",
        referenceNumber: "",
    });

    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let fileUrl = "";

        if (file) {
            const fileExt = file.name.split('.').pop();
            const filePath = `proofs/${Date.now()}-${formData.referenceNumber}.${fileExt}`;

            const {error: uploadError } = await supabase.storage
                .from("payment-proofs")
                .upload(filePath, file);

            if (uploadError) {
                console.error("File upload failed:", uploadError.message);
                alert("Failed to upload file. Please try again.");
                return;
            }

            const { data: publicUrlData } = supabase
                .storage
                .from("payment-proofs")
                .getPublicUrl(filePath);

            fileUrl = publicUrlData.publicUrl;
        }

        try {
            const {error } = await supabase.from('payments').insert([
                {
                    email: formData.email,
                    shareholder_name: formData.shareholderName,
                    month: formData.month,
                    year: formData.year,
                    bank_name: formData.bankName,
                    amount: parseInt(formData.amount),
                    transaction_date: formData.transactionDate,
                    reference_number: formData.referenceNumber,
                    proof_url: fileUrl,
                }
            ]);

            if (error) {
                console.error('Error submitting payment:', error.message);
                alert('Failed to submit. Please try again.');
            } else {
                alert('Payment submitted successfully!');
                setFormData({
                    email: "",
                    shareholderName: "",
                    month: "",
                    year: "",
                    bankName: "",
                    amount: "",
                    transactionDate: "",
                    referenceNumber: "",
                });
                setFile(null);
            }

        } catch (error: unknown) {
            // @ts-expect-error ignore this error for now
            console.error('Unexpected error:', error.message);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Submit Payment Information</h1>

            <form onSubmit={handleSubmit} className="grid gap-4">
                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <Label>Shareholder Name</Label>
                    <Select
                        value={formData.shareholderName}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, shareholderName: value }))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Shareholder" />
                        </SelectTrigger>
                        <SelectContent>
                            {shareholders.map((shareholder) => (
                                <SelectItem key={shareholder} value={shareholder}>
                                    {shareholder}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Month</Label>
                        <Select
                            value={formData.month}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, month: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Month" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map((month) => (
                                    <SelectItem key={month} value={month}>
                                        {month}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Year</Label>
                        <Input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="e.g. 2025"
                            required
                        />
                    </div>
                </div>

                <div>
                    <Label>Bank Name</Label>
                    <Input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <Label>Installment Amount</Label>
                    <Select
                        value={formData.amount}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Amount" />
                        </SelectTrigger>
                        <SelectContent>
                            {amounts.map((amount) => (
                                <SelectItem key={amount} value={amount}>
                                    {amount}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Transaction Date</Label>
                    <Input
                        type="date"
                        name="transactionDate"
                        value={formData.transactionDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <Label>Reference Number</Label>
                    <Input
                        type="text"
                        name="referenceNumber"
                        value={formData.referenceNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <Label>Attachment (Image or PDF)</Label>
                    <Input type="file" accept="image/*,application/pdf" onChange={handleFileChange} required />
                </div>

                <Button type="submit" className="mt-4 w-full">
                    Submit Payment
                </Button>
            </form>
        </div>
    );
}
