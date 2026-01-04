import prisma from "@/lib/prisma";
import Link from "next/link";

const PAGE_SIZE = 5;

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Home({ searchParams }: PageProps) {
  const { page = "1" } = await searchParams; // ✅ FIX

  const currentPage = Number(page);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where: { status: "DRAFT" },
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
      include: {
        author: {
          select: { name: true },
        },
      },
    }),

    prisma.article.count({
      where: { status: "DRAFT" },
    }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-10 text-center text-4xl font-bold">Superblog</h1>

        <section className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              <Link href={`/articles/${article.slug}`}>
                <h2 className="text-2xl font-semibold hover:underline">
                  {article.title}
                </h2>
              </Link>

              <p className="mt-2 text-sm text-gray-500">
                By {article.author.name}
              </p>

              <p className="mt-4 text-gray-700 line-clamp-3">
                {article.content.slice(0, 200)}...
              </p>
            </article>
          ))}
        </section>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-between">
          {currentPage > 1 ? (
            <Link href={`/?page=${currentPage - 1}`}>← Previous</Link>
          ) : (
            <span />
          )}

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link href={`/?page=${currentPage + 1}`}>Next →</Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </main>
  );
}
