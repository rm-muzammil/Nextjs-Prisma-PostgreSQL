import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: await hashPassword(password),
        },
    });

    return NextResponse.json({
        id: user.id,
        email: user.email,

    });
}