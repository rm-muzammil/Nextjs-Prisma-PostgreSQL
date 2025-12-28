import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();


    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || !user.password) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = signToken({ id: Number(user.id), email: user.email });


    const response = NextResponse.json({
        message: "Login successful",
    });

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });

    return response;
}
