import { allCsses } from "contentlayer/generated";
// app/posts/[slug]/page.tsx
import { format, parseISO } from "date-fns";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = () =>
  allCsses.map((post) => ({ slug: post.url.split("/")[1] }));

export const generateMetadata = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const post = allCsses.find(
    (post) => post.url.split("/")[2] === decodeURIComponent(resolvedParams.slug)
  );
  if (!post) throw new Error(`Post not found for slug: ${resolvedParams.slug}`);
  return { title: post.title };
};

const PostLayout = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const post = allCsses.find(
    (post) => post.url.split("/")[2] === decodeURIComponent(resolvedParams.slug)
  );
  if (!post)
    throw new Error(
      `Post not found for slug: ${decodeURIComponent(resolvedParams.slug)}`
    );

  return (
    <article>
      <div>
        <h1 className="mb-[4px]">{post.title}</h1>
        <time
          dateTime={post.date}
          className="flex items-center justify-end mb-[20px] text-xs text-gray-600 dark:text-dark-base70"
        >
          {format(parseISO(post.date), "yyyy-dd-MM")}
        </time>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  );
};

export default PostLayout;
