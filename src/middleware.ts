import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value;
    const { pathname } = req.nextUrl;
    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/login", '/dashboard','/expenses','/analytics']
};