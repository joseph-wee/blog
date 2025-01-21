import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

export const css = defineDocumentType(() => ({
  name: "Css", // generated 에 생성될 폴더 이름
  filePathPattern: `css/**/*.md`, // 맵핑할 파일 주소, -> 여기서는 post폴더에 있는 모든 md 파일을 맵핑하겠다는 뜻임
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`, // flattenedPath: 파일 경로를 의미함, -> 여기서는 /post/**.md가 될 것임.
    },
  },
}));

export const aws = defineDocumentType(() => ({
  name: "Aws",
  filePathPattern: `aws/**/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "./posts",
  documentTypes: [css, aws],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});

// documentType에서 filePathPatter이 겹쳐서 맵핑될 md파일이 중복이 되면 한 번만 맵핑이 됨. 위에서 **/*.md 해버리면 모든 파일이 맵핑되므로 나머지 defiendDocumentType에서는 맵핑이 안되서 ggenerated에 파일 생성이 되지 않음. (이거 몰라서 파일 맵핑 테스트 해보는데 작동안하는 줄 알고 해맸음.)
