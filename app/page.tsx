export const generateMetadata = () => {
  return {
    title: "Joseph.log",
    description: "개발관련 기록을 남기는 공간입니다.",
    openGraph: {
      title: "Joseph.log",
      description: "개발관련 기록을 남기는 공간입니다.",
      type: "website",
      images: [{ url: "https://josephlog.info/img_OG.png" }],
    },
  };
};

export default function Home() {
  return <div className="">안녕하세요. 개발관련 메모를 남기는 공간입니다.</div>;
}
