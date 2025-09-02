"use client";

import React, { useEffect, useRef } from "react";

import FlexSearch from "flexsearch";
import Image from "next/image";
import Link from "next/link";

import {
  icon_article_black,
  icon_article_light,
  icon_search,
  icon_search_dark,
} from "@/assets";

interface Post {
  title: string;
  date: string;
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

type Posts = Post[];

type SearchResult = {
  field: string;
  result: number[];
};

const Search = ({
  all,
  searchActive,
  setSearchActive,
}: {
  all: Posts[];
  searchActive: boolean;
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [results, setResults] = React.useState<
    { title: string; content: string; url: string }[]
  >([]);
  const data: Post[] = all.flat(); // 검색에 쓰일 데이터
  const inputRef = useRef<HTMLInputElement>(null);

  // 나중에 페이지 로딩, 렌더링 시간 길어지면 document -> worker로 변경하기
  // 전처리 과정도 길어지면 scripts 폴더에 파일만들어서 json 파일로 저장해서 불러오는형태로 사용하기

  /** 검색에 사용되는 데이터 */
  const document = new FlexSearch.Document({
    tokenize: "full",
    document: {
      index: ["title", "content"],
      store: ["title", "content"],
    },
  });

  /** document 세팅 */
  function setDocument() {
    data.forEach((post, i) => {
      document.add({
        id: i,
        title: post.title,
        content: post.body.raw,
      });
    });
  }

  /** 입력에 따라 검색 및 결과 렌더링 */
  async function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    const middleResults = document.search(query) as SearchResult[];

    /** document -> worker로 바꾸면 필요함 */
    // 지금은 동기적으로 작동해서 필요없는데 worker로 바꾸면 비동기적으로 작동하기 때문에 필요함.
    //   results = await results;

    const flatResults = Array.isArray(middleResults)
      ? middleResults.flatMap((r: SearchResult) => r.result)
      : [];

    const set = new Set(flatResults);
    const idResults = [...set];
    const contentResults = idResults.map((id) => {
      const post = data[id];
      return {
        title: post.title,
        content: post.body.raw,
        url: post.url,
      };
    });

    setResults([...contentResults]); // 검색 결과를 상태에 저장
  }

  setDocument();

  /** searchActive === true 면 input focus */
  useEffect(() => {
    if (searchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchActive]);

  /** searchActvie === false 면 검색결과 리셋 */
  useEffect(() => {
    if (!searchActive) setResults([]);
  }, [searchActive]);

  return (
    <div
      className={`fixed left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70  duration-200 ease-in-out" ${
        searchActive ? "opacity-100 z-20" : "opacity-0 z-0"
      }`}
      onClick={() => setSearchActive(false)}
    >
      <div
        className="pt-3 w-full max-w-[640px] bg-white rounded-[4px] dark:bg-dark-base25 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative flex items-center px-3 mb-3 w-full h-8
          duration-200 ease-in-out"
        >
          <Image
            src={icon_search}
            alt="icon_search"
            width={18}
            height={18}
            className="absolute left-[19px]"
          />
          <Image
            src={icon_search_dark}
            alt="icon_search"
            width={18}
            height={18}
            className="absolute opacity-0 left-[19px] dark:opacity-100"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              handleSearch(e);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSearchActive(false);
              }
            }}
            className="px-[35px] text-[14px] w-full  h-8 border-[1px] border-light-base70
        rounded-[4px] outline-none focus:border-[2px] focus:border-light-purple
        dark:focus:border-dark-purple
              placeholder:text-gray-600 placeholder:text-[14px]
             duration-200 ease-in-out bg-white
              dark:bg-dark-base10 dark:text-dark-text dark:placeholder:text-gray-400"
          />
        </div>
        <ul className="p-3 h-[205px] overflow-y-scroll border-t border-light-base70">
          {results.length > 0 &&
            results.map((result, index) => (
              <li key={`${index}1098`}>
                <Link
                  href={`${result.url}`}
                  onClick={() => setSearchActive(false)}
                  className="relative flex items-center h-9 pl-[26px] text-[14px] dark:text-dark-text
              hover:bg-gray-100 dark:hover:bg-dark-base20 duration-200 ease-in-out"
                >
                  <Image
                    src={icon_article_light}
                    alt="icon_search"
                    width={18}
                    height={18}
                    className="absolute left-[4px] dark:opacity-0"
                  />
                  <Image
                    src={icon_article_black}
                    alt="icon_search"
                    width={18}
                    height={18}
                    className="absolute left-[4px] opacity-0 dark:opacity-100"
                  />
                  {`${result.title}`}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
