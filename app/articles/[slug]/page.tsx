import prisma from "@/lib/prisma";
import type { Metadata } from "next";

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
    <article className="prose mx-auto py-8">
      <h1>{article.title}</h1>
      <p className="text-sm text-gray-500">By {article.author.name}</p>
      <div>{article.content}</div>
    </article>
  );
}
