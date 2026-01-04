// import prisma from "@/lib/prisma";
// import Link from "next/link";

// export default async function ArticlesPage() {
//   const articles = await prisma.article.findMany({
//     orderBy: { createdAt: "desc" },
//   });

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Articles</h1>

//       <ul className="space-y-4">
//         {articles.map((a) => (
//           <li key={a.id}>
//             <Link
//               href={`/articles/${a.slug}`}
//               className="text-blue-600 text-lg"
//             >
//               {a.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Articles</h1>

        {/* Articles List */}
        <ul className="space-y-6">
          {articles.map((a) => (
            <li
              key={a.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <Link href={`/articles/${a.slug}`} className="block">
                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition">
                  {a.title}
                </h2>
                {/* 
                {a.excerpt && (
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {a.excerpt}
                  </p>
                )} */}

                <div className="text-sm text-gray-400 mt-4">
                  {new Date(a.createdAt).toLocaleDateString()}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Empty State */}
        {articles.length === 0 && (
          <p className="text-gray-500 text-center mt-20">
            No articles published yet.
          </p>
        )}
      </div>
    </div>
  );
}
