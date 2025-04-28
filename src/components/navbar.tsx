import Link from 'next/link';

// inside your Navbar JSX
<nav className="flex gap-6">
    <Link href="/dashboard">Dashboard</Link>
    <Link href="/payment">Submit Payment</Link>
    <Link href="/payment-status">Payment Status</Link> {/* 🔥 Add this */}
</nav>
