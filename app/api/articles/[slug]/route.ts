import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

// GET article
export async function GET(
    _: Request,
    { params }: { params: { slug: string } }
) {
    const article = await prisma.article.findUnique({
        where: { slug: params.slug },
        include: {
            author: { select: { name: true, email: true } },
        },
    });

    if (!article) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(article);
}

// DELETE article (author only)
export async function DELETE(
    _: Request,
    { params }: { params: { slug: string } }
) {
    const user = await getAuthUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const article = await prisma.article.findUnique({
        where: { slug: params.slug },
    });

    if (!article || article.authorId !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.article.delete({
        where: { slug: params.slug },
    });

    return NextResponse.json({ success: true });
}
