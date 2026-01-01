import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function POST(
    req: Request,
    { params }: { params: { slug: string } }
) {
    const user = await getAuthUser();
    if (!user) return new Response("Unauthorized", { status: 401 });

    // Parse FormData instead of JSON
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();

    if (!title || !content) {
        return new Response("Missing fields", { status: 400 });
    }

    const article = await prisma.article.findFirst({
        where: { slug: params.slug, authorId: user.id, status: "DRAFT" },
    });

    if (!article) return new Response("Not found", { status: 404 });

    await prisma.article.update({
        where: { id: article.id },
        data: { title, content },
    });

    return new Response("Updated", { status: 200 });
}
