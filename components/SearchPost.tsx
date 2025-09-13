// "use client";

// // 필요한 라이브러리와 컴포넌트 임포트
// import React, { useEffect, useMemo, useState } from "react";
// import { Search } from "@/components/button/Search";
// import { Document as DocumentIcon } from "@/components/button/Document";
// import * as CL from "contentlayer/generated"; // ContentLayer에서 생성된 타입
// import FlexSearch from "flexsearch"; // 풀텍스트 검색을 위한 라이브러리
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// // 검색 컴포넌트의 props 타입 정의
// interface SearchPostProps {
//   isOpen: boolean; // 검색 모달의 열림/닫힘 상태
//   onClose: () => void; // 모달 닫기 핸들러
// }

// // 게시글 항목의 타입 정의
// type PostItem = {
//   id: string; // 고유 식별자
//   title: string; // 게시글 제목
//   content: string; // 게시글 내용 (원본 텍스트)
//   url: string; // 게시글 URL
// };

// /**
//  * 게시글 검색 컴포넌트
//  * ContentLayer에서 가져온 게시글을 FlexSearch를 사용해 검색하는 기능을 제공합니다.
//  */
// export const SearchPost = ({ isOpen, onClose }: SearchPostProps) => {
//   // 상태 관리
//   const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
//   const [activeIndex, setActiveIndex] = useState<number>(0); // 키보드 네비게이션을 위한 활성 인덱스
//   const router = useRouter(); // 라우터 인스턴스

//   /**
//    * ContentLayer에서 모든 게시글을 가져와 PostItem 형태로 변환
//    * useMemo를 사용해 의존성 배열이 변경되지 않는 한 재계산 방지
//    */
//   const posts: PostItem[] = useMemo(() => {
//     // 모든 카테고리(aws, css, cloudflare)의 게시글을 하나의 배열로 병합
//     const list = [
//       ...((CL as any).allAws ?? []), // AWS 카테고리 게시글
//       ...((CL as any).allCss ?? []), // CSS 카테고리 게시글
//       ...((CL as any).allCloudflare ?? []), // Cloudflare 카테고리 게시글
//     ] as Array<{ title: string; body?: { raw?: string }; url: string }>;

//     // ContentLayer의 포맷을 검색에 적합한 PostItem 형식으로 변환
//     return list.map((p, i) => ({
//       id: String(i), // 고유 ID (인덱스 기반)
//       title: p.title, // 게시글 제목
//       content: p.body?.raw ?? "", // 게시글 원본 내용 (없으면 빈 문자열)
//       url: p.url, // 게시글 URL
//     }));
//   }, []);

//   /**
//    * FlexSearch 인덱스 생성
//    * 게시글 제목과 내용을 인덱싱하여 빠른 검색이 가능하도록 함
//    */
//   const index = useMemo(() => {
//     // FlexSearch Document 인스�스 생성
//     const doc = new (FlexSearch as any).Document({
//       document: {
//         id: "id", // 문서 식별자 필드
//         index: [
//           { field: "title", weight: 5 }, // 제목에 가중치 5 부여
//           { field: "content", weight: 1 }, // 내용에 가중치 1 부여
//         ],
//         store: ["title", "url"], // 검색 결과에 포함할 필드
//       },
//       encode: false, // 한글 처리를 위해 커스텀 인코딩 사용

//       // 한글 검색을 위한 커스텀 토크나이저
//       tokenize: function (str: string) {
//         // 공백으로 분리하여 기본 단어 토큰 생성
//         const words = str.toLowerCase().split(/\s+/);
//         const tokens = [...words];

//         // 한글 자모음 결합을 위한 2-gram 토큰 추가
//         // 예: '안녕' -> ['안녕', '안녕', '녕하', '하세', '세요']
//         for (const word of words) {
//           if (word.length > 1) {
//             for (let i = 0; i < word.length - 1; i++) {
//               tokens.push(word.substring(i, i + 2));
//             }
//           }
//         }
//         return tokens;
//       },
//       context: true, // 검색 결과에 컨텍스트 정보 포함
//     });

//     // 모든 게시글을 인덱스에 추가
//     for (const p of posts) doc.add(p);

//     return doc;
//   }, [posts]);

//   /**
//    * 검색 쿼리에 대한 결과 반환
//    * useMemo를 사용해 검색어가 변경될 때만 재계산
//    */
//   const results = useMemo(() => {
//     const q = searchQuery.trim();
//     // 검색어가 비어있으면 빈 배열 반환
//     if (!q) return [] as Array<{ id: string; title: string; url: string }>;

//     // FlexSearch를 사용해 검색 수행
//     // enrich: true - 검색 결과에 문서 전체 정보 포함
//     // suggest: true - 유사한 검색어 제안 활성화
//     const found = index.search(q, { enrich: true, suggest: true }) as Array<{
//       result: Array<{ id: string }>;
//     }>;

//     // 검색 점수를 계산하기 위한 맵
//     const score = new Map<string, number>();

//     // 각 검색 결과에 대해 점수 계산
//     // 여러 필드에서 일치하는 경우 점수가 누적됨
//     for (const g of found) {
//       for (const r of g.result) {
//         score.set(r.id, (score.get(r.id) ?? 0) + 1);
//       }
//     }

//     // 점수에 따라 정렬하여 상위 결과 추출
//     let merged = Array.from(score.entries())
//       .sort((a, b) => b[1] - a[1]) // 높은 점수순으로 정렬
//       .map(([id]) => {
//         // ID에 해당하는 원본 게시글 정보 조회
//         const p = posts.find((x) => x.id === id)!;
//         return { id, title: p.title, url: p.url };
//       });

//     // 검색 결과가 있으면 반환

//     // FlexSearch 검색 결과가 없을 경우 대체 검색 수행 (문자열 포함 여부로 검색)
//     const lowerQ = q.toLowerCase();

//     // 1. 제목에 검색어가 포함된 게시글 필터링
//     const titleHits = posts.filter((p) =>
//       p.title.toLowerCase().includes(lowerQ)
//     );

//     // 2. 제목에는 없지만 내용에 검색어가 포함된 게시글 필터링 (중복 제외)
//     const contentHits = posts.filter(
//       (p) => !titleHits.includes(p) && p.content.toLowerCase().includes(lowerQ)
//     );

//     // 제목 일치 결과를 먼저, 그 다음 내용 일치 결과를 이어붙임
//     merged = [...titleHits, ...contentHits].map((p) => ({
//       id: p.id,
//       title: p.title,
//       url: p.url,
//     }));

//     return merged;
//   }, [index, posts, searchQuery]);

//   /**
//    * 모달 열기/닫기 시 선택 초기화 및 ESC 키 바인딩
//    */
//   useEffect(() => {
//     // 모달이 열릴 때 활성 인덱스 초기화
//     if (isOpen) setActiveIndex(0);

//     // ESC 키 핸들러
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         e.preventDefault();
//         onClose(); // ESC 키로 모달 닫기
//       }
//     };

//     // 이벤트 리스너 등록/해제
//     if (isOpen) window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [isOpen, onClose]);

//   /**
//    * 모달이 닫힐 때 검색어 초기화
//    */
//   useEffect(() => {
//     if (!isOpen) setSearchQuery("");
//   }, [isOpen]);

//   /**
//    * 키보드 이벤트 핸들러
//    * - 화살표 위/아래: 검색 결과 항목 간 이동
//    * - Enter: 선택한 검색 결과로 이동
//    */
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (results.length === 0) return;

//     // 아래쪽 화살표: 다음 항목으로 이동 (순환)
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setActiveIndex((prev) => (prev + 1) % results.length);
//     }
//     // 위쪽 화살표: 이전 항목으로 이동 (순환)
//     else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
//     }
//     // 엔터: 선택한 검색 결과로 이동
//     else if (e.key === "Enter") {
//       e.preventDefault();
//       const target = results[activeIndex];
//       if (target) {
//         router.push(target.url); // 선택한 게시글로 라우팅
//         setSearchQuery(""); // 검색어 초기화
//         onClose(); // 검색 모달 닫기
//       }
//     }
//   };

//   /**
//    * 배경 클릭 시 모달 닫기 핸들러
//    * 실제로 배경을 클릭한 경우에만 모달을 닫음
//    */
//   const handleBackgroundClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) onClose();
//   };

//   // 모달이 닫혀있으면 렌더링하지 않음
//   if (!isOpen) return null;

//   return (
//     // 검색 모달 배경 (반투명 검은색)
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//       onClick={handleBackgroundClick}
//     >
//       {/* 검색 모달 컨테이너 */}
//       <div
//         className="rounded-lg shadow-xl bg-[#1f1f1f] border border-[#3a3a3a]"
//         style={{ width: "720px", height: "360px", padding: "20px" }}
//       >
//         {/* 검색 입력 영역 */}
//         <div className="relative mb-5">
//           {/* 검색 아이콘 */}
//           <div
//             className="absolute left-0 top-0 h-full flex items-center justify-center cursor-default pointer-events-none"
//             style={{ width: "46px" }}
//           >
//             <Search w={16} h={16} className="text-gray-400" />
//           </div>

//           {/* 검색 입력 필드 */}
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search Post ..."
//             className="w-full h-12 pl-[46px] pr-4 rounded-md bg-[#2b2b2b] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main border border-[#3a3a3a]"
//             autoFocus // 모달이 열리면 자동으로 포커스
//             onKeyDown={handleKeyDown} // 키보드 이벤트 핸들러
//           />
//         </div>

//         {/* 검색 결과 영역 */}
//         <div
//           className="flex-1 bg-transparent rounded-md overflow-auto"
//           style={{ height: "calc(100% - 72px)" }}
//         >
//           <ul>
//             {/* 검색 결과가 없을 때 */}
//             {results.length === 0 && searchQuery.trim() !== "" ? (
//               <li className="p-4 text-sm text-gray-500 dark:text-gray-400">
//                 No results
//               </li>
//             ) : (
//               // 검색 결과 목록 렌더링
//               results.map((item, idx) => (
//                 <li
//                   key={item.id}
//                   className="border-b border-gray-200/0 dark:border-gray-800/0"
//                 >
//                   <Link
//                     href={item.url}
//                     className={`flex items-center py-3 px-2 rounded-md transition-colors cursor-default ${
//                       idx === activeIndex
//                         ? "bg-[#3a3a3a]" // 현재 선택된 항목 강조
//                         : "hover:bg-[#2a2a2a]" // 호버 효과
//                     }`}
//                     onMouseEnter={() => setActiveIndex(idx)} // 마우스 호버 시 해당 항목 활성화
//                     onClick={() => {
//                       setSearchQuery(""); // 검색어 초기화
//                       onClose(); // 모달 닫기
//                     }}
//                   >
//                     {/* 문서 아이콘 */}
//                     <span
//                       className="flex items-center justify-center mx-[9px]"
//                       style={{ width: 18, height: 18 }}
//                     >
//                       <DocumentIcon w={18} h={18} className="text-gray-300" />
//                     </span>

//                     {/* 게시글 제목 (1줄 초과 시 ... 처리) */}
//                     <span className="text-sm text-gray-100 line-clamp-1">
//                       {item.title}
//                     </span>
//                   </Link>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };
