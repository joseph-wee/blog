import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { Moon } from "@/components/button/Moon";
import { PanelLeft } from "@/components/button/PanelLeft";
import { Sun } from "@/components/button/Sun";
// import { SearchPost } from "@/components/SearchPost";
import Link from "next/link";

export const Header = ({
  setSidebarActive,
}: {
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="z-20 fixed top-0 left-0 w-full h-[64px] bg-bg">
        <div className="mx-auto p-[20px] max-w-[1400px]  flex justify-between items-center ">
          <div className="text-main text-[24px] font-bold md:hidden">
            <Link href="/">Joseph.log</Link>
          </div>
          <PanelLeft
            w={24}
            h={24}
            className="hidden text-ui md:block"
            onClick={() => setSidebarActive(true)}
          />
          <div className="flex gap-[20px]">
            {/* <Search
              w={24}
              h={24}
              className="text-ui"
              onClick={() => setIsSearchOpen(true)}
            /> */}
            <div className="relative w-[24px] h-[24px]">
              {mounted && (
                <>
                  {theme === "dark" ? (
                    <Moon
                      w={24}
                      h={24}
                      className={`absolute top-0 left-0 text-ui`}
                      onClick={() => setTheme("light")}
                    />
                  ) : (
                    <Sun
                      w={24}
                      h={24}
                      className={`absolute top-0 left-0 text-ui`}
                      onClick={() => setTheme("dark")}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* <SearchPost
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      /> */}
    </>
  );
};
