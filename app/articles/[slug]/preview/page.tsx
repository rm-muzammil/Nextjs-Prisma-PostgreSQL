import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* =========================
   🔍 SEO METADATA
========================= */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = await prisma.article.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    select: {
      title: true,
      content: true,
    },
  });

  if (!article) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: article.title,
    description: article.content.slice(0, 160),
  };
}

/* =========================
   📄 PAGE CONTENT
========================= */
export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const user = await getAuthUser();

  let article = await prisma.article.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: {
      author: true,
    },
  });

  // 🔒 Draft preview (author-only)
  if (!article && user) {
    article = await prisma.article.findFirst({
      where: {
        slug,
        status: "DRAFT",
        authorId: user.id,
      },
      include: {
        author: true,
      },
    });
  }

  if (!article) notFound();

  const isDraft = article.status === "DRAFT";

  return (
    <article className="prose mx-auto py-8">
      {isDraft && (
        <div className="mb-4 rounded bg-yellow-100 p-3 text-yellow-800">
          📝 Draft Preview — Only visible to you
        </div>
      )}

      <h1>{article.title}</h1>

      <p className="text-sm text-gray-500">By {article.author.name}</p>

      <div>{article.content}</div>
    </article>
  );
}
