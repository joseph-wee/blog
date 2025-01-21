import { allCsses, Css } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
// app/page.tsx
import Link from "next/link";

function PostCard(post: Css) {
  return (
    <div>
      <h2>
        <Link href={post.url}>{post.title}</Link>
      </h2>
      <time dateTime={post.date}>
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </div>
  );
}

export default function Home() {
  const posts = allCsses.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return <div>안녕하세요. 개발관련 메모를 남기는 공간입니다.</div>;
}
