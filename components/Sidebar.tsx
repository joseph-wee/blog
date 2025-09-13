"use client";
import React, { useEffect } from "react";

import { usePathname } from "next/navigation";

import { allAws, allCloudflares, allCsses } from "@/.contentlayer/generated";
import Link from "next/link";

interface Post {
  title: string;
  date: string; // ISO 8601 형식의 문자열
  body: {
    raw: string;
    html: string;
  };
  _id: string;
  _raw: {
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
    flattenedPath: string;
  };
  type: string;
  url: string;
}

type PostArr = Post[];

export const Sidebar = ({
  sidebarActive,
  setSidebarActive,
}: {
  sidebarActive: boolean;
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const path = usePathname();

  // 제목순 정렬
  function sortByTitle(posts: PostArr) {
    posts.sort((a: Post, b: Post): number => {
      const upperCaseA = a.title.toUpperCase();
      const upperCaseB = b.title.toUpperCase();

      if (upperCaseA > upperCaseB) return 1;
      if (upperCaseA < upperCaseB) return -1;
      return 0;
    });
  }

  sortByTitle(allAws);
  sortByTitle(allCsses);
  sortByTitle(allCloudflares);

  const postList = [
    {
      title: "AWS",
      items: allAws,
    },
    {
      title: "CSS",
      items: allCsses,
    },
    {
      title: "Cloudflare",
      items: allCloudflares,
    },
  ];

  useEffect(() => {
    console.log(decodeURI(path));
    console.log(postList);
  }, [path]);

  return (
    <div>
      {/** 배경 */}
      <div
        className={`z-20 fixed left-0 top-0 w-[300px] h-full ${
          sidebarActive ? "md:w-full bg-black opacity-50" : "hidden"
        }`}
        onClick={() => setSidebarActive(false)}
      />
      {/** 사이드바 */}
      <div
        className={`z-10 sticky left-0 top-[64px] w-[300px] max-h-[calc(100vh-64px)] bg-bg overflow-y-auto md:z-20 md:fixed md:-left-[300px] md:top-[0px] md:h-full  ${
          sidebarActive ? "translate-x-[300px]" : "translate-x-[0px]"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="hidden pl-[20px] pt-[20px] text-main text-[20px] font-bold md:block">
          <Link href="/">Joseph.log</Link>
        </div>
        <nav className="pt-[30px]">
          {postList.map((postList, index) => (
            <ul key={index} className="mb-[6px]">
              {/** 제목 */}
              <li className="pl-[20px] pr-[20px] min-h-[28px] flex items-center text-[13px] font-semibold text-base60 cursor-default">{`${postList.title}`}</li>
              {postList.items.map((post, index) => (
                /** 리스트 */
                <li
                  key={index}
                  className={`mx-[10px] px-[10px] py-[4px] min-h-[28px] flex items-center text-[13px] text-ui rounded-[4px] cursor-default ${
                    post.url === decodeURI(path)
                      ? "font-medium bg-base30"
                      : "hover:bg-base25"
                  }`}
                >
                  <Link
                    href={post.url}
                    onClick={() => setSidebarActive(false)}
                    className="cursor-default"
                  >
                    {`${post.title}`}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>
      </div>
    </div>
  );
};
