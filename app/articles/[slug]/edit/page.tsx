import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* =========================
   📄 PAGE CONTENT
========================= */

export default async function EditArticle({ params }: PageProps) {
  const { slug } = await params; // ✅ unwrap first

  const user = await getAuthUser();
  if (!user) redirect("/auth/login");

  const article = await prisma.article.findFirst({
    where: {
      slug,
      status: "DRAFT",
      authorId: user.id,
    },
  });

  if (!article) notFound();

  return (
    <form action={`/api/articles/${article.id}/update`} method="POST">
      <input
        name="title"
        defaultValue={article.title}
        className="w-full border p-2"
      />

      <textarea
        name="content"
        defaultValue={article.content}
        className="w-full border p-2 mt-4"
        rows={10}
      />

      <button className="mt-4 bg-black text-white px-4 py-2">Save Draft</button>
    </form>
  );
}
