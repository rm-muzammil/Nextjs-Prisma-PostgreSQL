import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    const user = await getAuthUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const article = await prisma.article.update({
        where: {
            id: params.id,
            authorId: user.id, // 🔐 ownership check
        },
        data: {
            status: "PUBLISHED",
        },
    });

    return NextResponse.json(article);
}
