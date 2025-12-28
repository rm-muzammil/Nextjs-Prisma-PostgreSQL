import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  });

  if (!article) notFound();

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">By {article.author.name}</p>
      <div className="prose">{article.content}</div>
    </article>
  );
}
