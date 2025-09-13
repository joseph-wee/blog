import React from "react";

export const PanelLeft = ({
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
        className={`lucide lucide-panel-left-icon lucide-panel-left ${className}`}
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
      </svg>
    </button>
  );
};
