import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon";
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", variant = "full" }) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Precision Vector Icon matching Stitch Brand Mark */}
      <div className="w-8 h-8 rounded-lg bg-[#0b1c30] flex items-center justify-center p-1.5 shadow-sm shrink-0 border border-[#006194]/20">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Loop pipe shape */}
          <path
            d="M8 12C8 9.79086 9.79086 8 12 8H22C23.1046 8 24 8.89543 24 10V18"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M24 20C24 22.2091 22.2091 24 20 24H10C8.89543 24 8 23.1046 8 22V14"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Flow terminal node & arrow */}
          <circle cx="8" cy="12" r="2" fill="#38bdf8" />
          <path
            d="M22 22L24.5 24.5L22 27"
            stroke="#0284c7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {variant === "full" && (
        <div className="flex flex-col text-left leading-none">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[15px] sm:text-[17px] text-[#0b1c30] tracking-tight uppercase">
            VIP Plumbing
          </span>
          <span className="font-['Inter',sans-serif] font-bold text-[9px] sm:text-[10px] text-[#006194] tracking-wider uppercase mt-0.5">
            Experts LLC · Frisco, TX
          </span>
        </div>
      )}
    </div>
  );
};
