import "./globals.css"
import Navbar from "@/components/Navbar"
import { AuthProvider } from "@/context/AuthContext"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Payment Tracker",
    description: "Track shareholder payments easily!",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            <Navbar />
            <main className="pt-24">{children}</main> {/* Add top padding */}
        </AuthProvider>
        </body>
        </html>
    )
}
