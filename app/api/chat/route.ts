import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
    const user = await getAuthUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure user.id is string
    const messages = await prisma.message.findMany({
        where: { userId: String(user.id) },
        orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages);
}

export async function POST(req: Request) {
    const user = await getAuthUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();

    const message = await prisma.message.create({
        data: {
            content,
            role: "user",
            userId: String(user.id), // cast to string
        },
    });

    return NextResponse.json(message);
}
