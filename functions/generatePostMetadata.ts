export function generatePostMetadata(post: {
  title: string;
  description: string;
}) {
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: [{ url: "https://josephlog.info/img_OG.png" }],
    },
  };
}
