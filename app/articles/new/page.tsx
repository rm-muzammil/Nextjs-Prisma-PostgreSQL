import Form from "next/form";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function NewArticlePage() {
  async function createArticle(formData: FormData) {
    "use server";

    const user = await getAuthUser();
    if (!user) redirect("/auth/login");

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    await prisma.article.create({
      data: {
        title,
        content,
        slug,
        authorId: user.id,
      },
    });

    redirect("/articles");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">New Article</h1>

      <Form action={createArticle} className="space-y-4">
        <input name="title" placeholder="Title" className="w-full border p-2" />
        <textarea
          name="content"
          placeholder="Content"
          rows={10}
          className="w-full border p-2"
        />
        <button className="bg-black text-white px-4 py-2">Publish</button>
      </Form>
    </div>
  );
}
