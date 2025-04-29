import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Payment Tracker",
    description: "Track shareholder payments easily!",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <Navbar />
        <main className="pt-24">{children}</main> {/* Add top padding */}
        </body>
        </html>
    );
}
