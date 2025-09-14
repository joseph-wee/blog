import { Github } from "@/components/button/Github";
import { Mail } from "@/components/button/Mail";
import Link from "next/link";

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
  return (
    <div>
      <h1>README</h1>
      <br />
      개발관련 메모들을 남기는 공간입니다.
      <br />
      <br />
      <div className="flex gap-[10px]">
        <Link
          href="mailto:weeyosup@gmail.com"
          target="_blank"
          className="!text-ui"
        >
          <Mail w={24} h={24} />
        </Link>
        <Link
          href="https://github.com/joseph-wee"
          target="_blank"
          className="!text-ui"
        >
          <Github w={24} h={24} />
        </Link>
      </div>
    </div>
  );
}
