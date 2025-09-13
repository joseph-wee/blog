"use client";
import "./globals.css";

import { useState } from "react";

import localFont from "next/font/local";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";

// 폰트 파일 경로 지정
const fontPretendard = localFont({
  src: [
    {
      path: "../assets/fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarActive, setSidebarActive] = useState(false); // 사이드바 활성화 유무

  return (
    <html
      lang="en"
      className={fontPretendard.className}
      suppressHydrationWarning
    >
      <body className="bg-bg max-w-[1400px] mx-auto">
        <ThemeProvider>
          {/** main content */}
          <Header setSidebarActive={setSidebarActive} />

          <main className="flex pt-[64px] mx-auto max-w-[1400px]">
            <Sidebar
              sidebarActive={sidebarActive}
              setSidebarActive={setSidebarActive}
            />
            <article className="markdown mx-auto pt-[30px] px-[20px] w-[760px] md:max-w-[760px] ">
              {children}
            </article>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
