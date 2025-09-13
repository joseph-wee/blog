import React from "react";

export const Search = ({
  w,
  h,
  className,
  onClick,
}: {
  w: number;
  h: number;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-search-icon lucide-search ${className}`}
      >
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </svg>
    </button>
  );
};
