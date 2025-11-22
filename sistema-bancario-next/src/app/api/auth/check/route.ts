import { NextResponse } from "next/server";
import { isAuthenticated } from "@/actions/authActions";

export async function GET() {
    const authenticated = await isAuthenticated();
    return NextResponse.json({ authenticated });
}
