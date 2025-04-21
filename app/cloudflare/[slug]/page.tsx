import { allCloudflares } from "contentlayer/generated";

import Post from "@/components/Post";
import { generatePostMetadata } from "@/functions/generatePostMetadata";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = () =>
  allCloudflares.map((post) => ({ slug: post.url.split("/")[2] }));

export const generateMetadata = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const post = allCloudflares.find(
    (post) => post.url.split("/")[2] === decodeURIComponent(resolvedParams.slug)
  );
  if (!post)
    throw new Error(
      `Post not found for slug: ${decodeURIComponent(resolvedParams.slug)}`
    );
  return generatePostMetadata(post);
};

const Page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const post = allCloudflares.find(
    (post) => post.url.split("/")[2] === decodeURIComponent(resolvedParams.slug)
  );
  if (!post)
    throw new Error(
      `Post not found for slug: ${decodeURIComponent(resolvedParams.slug)}`
    );

  return <Post post={post} />;
};

export default Page;
