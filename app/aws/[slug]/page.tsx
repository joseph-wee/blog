import { allAws } from "contentlayer/generated";
// app/posts/[slug]/page.tsx
import { format, parseISO } from "date-fns";

export const generateStaticParams = () =>
  allAws.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const p = await params;

  const post = allAws.find(
    (post) => post._raw.flattenedPath.split("/")[1] === p.slug
  );
  if (!post) throw new Error(`Post not found for slug: ${p.slug}`);
  return { title: post.title };
};

const PostLayout = async ({ params }: { params: { slug: string } }) => {
  const p = await params;

  const post = allAws.find(
    (post) => post._raw.flattenedPath.split("/")[1] === p.slug
  );
  if (!post) throw new Error(`Post not found for slug: ${p.slug}`);

  return (
    <article>
      <div>
        <h1 className="mb-[4px]">{post.title}</h1>
        <time
          dateTime={post.date}
          className="flex items-center justify-end mb-1 text-xs text-gray-600"
        >
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  );
};

export default PostLayout;
