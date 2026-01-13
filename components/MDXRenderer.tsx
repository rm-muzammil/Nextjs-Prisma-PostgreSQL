import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

export default function MDXRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            rehypeHighlight,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ],
        },
      }}
    />
  );
}
