import { forgotPassword } from "@/server-action/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    if (email) {
        const user = await forgotPassword(email, password);
        return NextResponse.json({ "message": "Email sent" }, { status: 200 });
    } else {
        return NextResponse.json({ "message": "Invalid credentials" }, { status: 401 });
    }
}