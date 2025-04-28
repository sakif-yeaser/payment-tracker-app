import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return res;
}

// Apply middleware to private routes only
export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};
