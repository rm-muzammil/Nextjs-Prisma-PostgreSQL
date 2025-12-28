import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

// GET all articles (public)
export async function GET() {
    const articles = await prisma.article.findMany({
        include: {
            author: {
                select: { id: true, name: true, email: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles);
}

// POST create article (auth required)
export async function POST(req: Request) {
    const user = await getAuthUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await req.json();

    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const article = await prisma.article.create({
        data: {
            title,
            slug,
            content,
            authorId: user.id,
        },
    });

    return NextResponse.json(article);
}
