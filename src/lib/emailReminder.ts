// lib/emailReminder.ts
import emailjs from "emailjs-com";

export const sendReminderEmail = async (toName: string, toEmail: string) => {
    try {
        const result = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            {
                to_name: toName,
                to_email: toEmail,
            },
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
        );

        console.log("Email sent:", result.status, result.text);
        return { success: true };
    } catch (error) {
        console.error("Email failed:", error);
        return { success: false, error };
    }
};
