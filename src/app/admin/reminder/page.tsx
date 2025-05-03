"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import { Button } from "@/components/ui/button";

const shareholders = [
    { name: "Sakif Yeaser", email: "yeaser.sakif@gmail.com" },
    { name: "Abdullah Umar Nasib", email: "umarnasib13@gmail.com" },
    { name: "Shakil Ashraful Anam", email: "ashrafanam318@gmail.com" },
    { name: "Nurul Hoque Shohel", email: "mnhoque76@gmail.com" },
    { name: "MD Mazidul Hasan", email: "md.mazidulhasan1@gmail.com" },
    { name: "Abdullah Umar Nasib", email: "shahena.akhter001@gmail.com" },
    { name: "Syed Nazmus Shakib", email: "sakibsyed01@gmail.com" },
    { name: "Imran Hossain", email: "imranhossain21bd@gmail.com" },
    { name: "Fahim Hasnat", email: "md.fahimhasnat.bd@gmail.com" },
    { name: "Imam Hossain", email: "imamhossain1310@gmail.com" },
    { name: "Md. Shajjad Howlader", email: "shajjadhowlader@gmail.com" },
    { name: "Sejan Mahmud", email: "sejan17@gmail.com" },
    { name: "Mahfuzur Rahman", email: "mrasif30@gmail.com" },
    { name: "Ashiqur Rahman Mahmud", email: "dr.ashique1985@gmail.com" },
    { name: "Imam Mehedi", email: "imammehedibappy@gmail.com" }
];

export default function ReminderPage() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    const sendReminders = async () => {
        setStatus("sending");

        for (const person of shareholders) {
            try {
                await emailjs.send(
                    'service_22jj677',
                    'adtl_template',
                    {
                        to_name: person.name,
                        to_email: person.email,
                    },
                    'NDYX-j3YagH5ASSl8'
                );
                console.log("Sent to", person.name);
            } catch (error) {
                console.error("Error sending to", person.name, error);
            }
        }

        setStatus("sent");
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Admin: Send Reminder Emails</h1>
            <Button
                onClick={sendReminders}
                disabled={status === "sending"}
                className="bg-blue-600 text-white hover:bg-blue-700"
            >
                {status === "sending" ? "Sending..." : "Send Reminder Emails"}
            </Button>
            {status === "sent" && (
                <p className="mt-4 text-green-600">✅ Reminders sent successfully!</p>
            )}
        </div>
    );
}
