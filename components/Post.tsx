import { format, parseISO } from "date-fns";

interface Post {
  title: string;
  date: string;
  body: { html: string };
}

interface PostLayoutProps {
  post: Post;
}

export default function Post({ post }: PostLayoutProps) {
  return (
    <article>
      <div>
        <h1 className="mb-[4px]">{post.title}</h1>
        <time
          dateTime={post.date}
          className="flex items-center justify-end mb-1 text-xs text-gray-600 dark:text-dark-base70"
        >
          {format(parseISO(post.date), "yyyy-MM-dd")}
        </time>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  );
}
