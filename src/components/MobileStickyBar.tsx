import React from "react";
import { BUSINESS_CONFIG, getPhoneHref } from "../config/business";

interface MobileStickyBarProps {
  onOpenInfo: (title: string, message: React.ReactNode) => void;
  onRequestService: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenInfo,
  onRequestService,
}) => {
  const phoneHref = getPhoneHref();

  const handlePhoneClick = (e: React.MouseEvent) => {
    if (!phoneHref) {
      e.preventDefault();
      onOpenInfo(
        "Direct Dispatch Line",
        <p>
          Telephone line <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong> is awaiting client configuration. Please use the Request Service button.
        </p>
      );
    }
  };

  return (
    <aside
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A] border-t-2 border-[#0284C7] px-4 py-2 text-white shadow-2xl flex items-center justify-between gap-3 h-[56px]"
      aria-label="Emergency Dispatch Bar"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" aria-hidden="true"></span>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 leading-tight truncate">
            Frisco Techs On Call
          </span>
          <span className="text-[10px] text-slate-300 truncate">
            Direct Dispatch · Fast Local Response
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onRequestService}
          className="h-9 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
        >
          Book
        </button>

        <a
          href={phoneHref || "#request-service"}
          onClick={handlePhoneClick}
          className="h-9 px-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            call
          </span>
          <span>Call Now</span>
        </a>
      </div>
    </aside>
  );
};
