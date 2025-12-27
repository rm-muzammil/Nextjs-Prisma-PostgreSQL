import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();


    const user = await prisma.user.create({
        data: { name, email },
    });

    return NextResponse.json({ id: user.id, email: user.email, name: user.name });
}
