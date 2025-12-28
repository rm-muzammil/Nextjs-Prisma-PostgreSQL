import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>

      <ul className="space-y-4">
        {articles.map((a) => (
          <li key={a.id}>
            <Link
              href={`/articles/${a.slug}`}
              className="text-blue-600 text-lg"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
