import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================
   🔍 SEO METADATA
========================= */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
    select: {
      title: true,
      content: true,
    },
  });

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article does not exist.",
    };
  }

  const description = article.content.slice(0, 160).replace(/\n/g, " ") + "...";

  return {
    title: article.title,
    description,

    openGraph: {
      title: article.title,
      description,
      url: `https://yourdomain.com/articles/${slug}`,
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },

    alternates: {
      canonical: `/articles/${slug}`,
    },
  };
}

/* =========================
   📄 PAGE CONTENT
========================= */
export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      author: true,
    },
  });

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

      <p className="text-sm text-gray-500 mb-10">By {article.author.name}</p>

      <div className="prose prose-lg prose-gray max-w-none">
        {article.content}
      </div>
    </article>
  );
}
