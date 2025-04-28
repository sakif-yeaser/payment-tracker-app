"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const years = [2024, 2025, 2026, 2027];

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

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);

        // TODO: Save to Supabase and send emails
    };

    return (
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Payment Submission</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="your-email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                    />
                </div>

                {/* Shareholder Name */}
                <div className="space-y-2">
                    <Label htmlFor="shareholderName">Shareholder Name</Label>
                    <Select onValueChange={(value) => handleChange("shareholderName", value)} required>
                        <SelectTrigger id="shareholderName">
                            <SelectValue placeholder="Select Shareholder" />
                        </SelectTrigger>
                        <SelectContent>
                            {shareholders.map((name) => (
                                <SelectItem key={name} value={name}>
                                    {name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Month and Year */}
                <div className="flex space-x-4">
                    {/* Month */}
                    <div className="w-1/2 space-y-2">
                        <Label htmlFor="month">Month</Label>
                        <Select onValueChange={(value) => handleChange("month", value)} required>
                            <SelectTrigger id="month">
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

                    {/* Year */}
                    <div className="w-1/2 space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Select onValueChange={(value) => handleChange("year", value)} required>
                            <SelectTrigger id="year">
                                <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Bank Name */}
                <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                        id="bankName"
                        placeholder="Enter Bank Name"
                        value={formData.bankName}
                        onChange={(e) => handleChange("bankName", e.target.value)}
                        required
                    />
                </div>

                {/* Installment Amount */}
                <div className="space-y-2">
                    <Label htmlFor="amount">Installment Amount</Label>
                    <Select onValueChange={(value) => handleChange("amount", value)} required>
                        <SelectTrigger id="amount">
                            <SelectValue placeholder="Select Amount" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="6500">6,500</SelectItem>
                            <SelectItem value="13000">13,000</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Transaction Date */}
                <div className="space-y-2">
                    <Label htmlFor="transactionDate">Transaction Date</Label>
                    <Input
                        id="transactionDate"
                        type="date"
                        value={formData.transactionDate}
                        onChange={(e) => handleChange("transactionDate", e.target.value)}
                        required
                    />
                </div>

                {/* Reference Number */}
                <div className="space-y-2">
                    <Label htmlFor="referenceNumber">Reference Number</Label>
                    <Input
                        id="referenceNumber"
                        placeholder="Enter Reference Number"
                        value={formData.referenceNumber}
                        onChange={(e) => handleChange("referenceNumber", e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                    Submit Payment
                </Button>
            </form>
        </div>
    );
}
