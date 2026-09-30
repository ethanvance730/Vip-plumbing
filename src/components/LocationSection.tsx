import React from "react";
import {
  BUSINESS_CONFIG,
  getPhoneHref,
  getEmailHref,
  getMapsHref,
  isConfigured,
} from "../config/business";

interface LocationSectionProps {
  onOpenInfo: (title: string, message: React.ReactNode) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenInfo }) => {
  const phoneHref = getPhoneHref();
  const emailHref = getEmailHref();
  const mapsHref = getMapsHref();

  const handlePhoneClick = (e: React.MouseEvent) => {
    if (!phoneHref) {
      e.preventDefault();
      onOpenInfo(
        "Telephone Inquiries",
        <p>
          Telephone line <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong> is awaiting client configuration. You can visit our Frisco headquarters at {BUSINESS_CONFIG.address} or fill out the service request form below.
        </p>
      );
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    if (!emailHref) {
      e.preventDefault();
      onOpenInfo(
        "Email Dispatch",
        <p>
          Email address <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_EMAIL}</strong> is awaiting client configuration. Use the service request form below to submit your details.
        </p>
      );
    }
  };

  return (
    <section className="w-full bg-surface-container-low py-space-xl lg:py-20 border-t border-surface-container" id="location">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* Left: Physical Details Card (5 Cols) */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-sm border border-surface-container flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container text-primary font-label-caps text-label-caps font-semibold uppercase mb-space-md">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                Our Frisco Headquarters
              </div>

              <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                {BUSINESS_CONFIG.name}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                Centrally based in Frisco, ensuring responsive service throughout local residential neighborhoods.
              </p>

              <div className="mt-space-lg flex flex-col gap-space-md">
                {/* Physical Address */}
                <div className="flex items-start gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-label-lg text-on-surface font-semibold">Physical Address</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">{BUSINESS_CONFIG.address}</p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-label-lg text-on-surface font-semibold">Telephone Inquiries</p>
                    <a
                      className="font-body-md text-body-md text-primary font-medium hover:underline"
                      href={phoneHref || "#location"}
                      onClick={handlePhoneClick}
                    >
                      {BUSINESS_CONFIG.BUSINESS_PHONE}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-label-lg text-on-surface font-semibold">Email Dispatch</p>
                    <a
                      className="font-body-md text-body-md text-primary font-medium hover:underline"
                      href={emailHref || "#location"}
                      onClick={handleEmailClick}
                    >
                      {BUSINESS_CONFIG.BUSINESS_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-space-xl pt-space-md border-t border-surface-container">
              <a
                className="w-full inline-flex items-center justify-center gap-space-xs h-12 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">directions</span>
                <span>Get Directions via Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right: Map Card (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="w-full h-full min-h-[380px] rounded-xl overflow-hidden shadow-sm relative bg-[#e7edf5] flex flex-col justify-between p-space-md border border-surface-container">
              {/* Detailed Stylized Frisco TX Map Graphic */}
              <div className="absolute inset-0 w-full h-full select-none" aria-hidden="true">
                <svg
                  className="w-full h-full object-cover"
                  viewBox="0 0 600 400"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Base map terrain */}
                  <rect width="600" height="400" fill="#e9eef7" />
                  
                  {/* Lake / Park areas in Frisco */}
                  <path d="M 0 100 Q 80 120 120 70 T 200 40 L 200 0 L 0 0 Z" fill="#d1e3f8" />
                  <path d="M 450 320 Q 510 300 550 350 T 600 370 L 600 400 L 420 400 Z" fill="#d8e8dc" opacity="0.7" />

                  {/* Neighborhood grid blocks */}
                  <rect x="30" y="160" width="80" height="70" rx="4" fill="#dfe7f2" />
                  <rect x="130" y="160" width="110" height="70" rx="4" fill="#dfe7f2" />
                  <rect x="30" y="250" width="80" height="90" rx="4" fill="#dfe7f2" />
                  <rect x="130" y="250" width="110" height="90" rx="4" fill="#dfe7f2" />

                  <rect x="280" y="70" width="140" height="60" rx="4" fill="#dfe7f2" />
                  <rect x="440" y="70" width="120" height="60" rx="4" fill="#dfe7f2" />
                  <rect x="280" y="240" width="140" height="110" rx="4" fill="#dfe7f2" />
                  <rect x="440" y="240" width="120" height="110" rx="4" fill="#dfe7f2" />

                  {/* Secondary Streets */}
                  <line x1="30" y1="240" x2="570" y2="240" stroke="#ffffff" strokeWidth="6" />
                  <line x1="30" y1="150" x2="570" y2="150" stroke="#ffffff" strokeWidth="6" />
                  <line x1="120" y1="40" x2="120" y2="380" stroke="#ffffff" strokeWidth="6" />
                  <line x1="430" y1="40" x2="430" y2="380" stroke="#ffffff" strokeWidth="6" />

                  {/* Dallas North Tollway (Vertical Expressway) */}
                  <line x1="260" y1="0" x2="260" y2="400" stroke="#cbd5e1" strokeWidth="14" />
                  <line x1="260" y1="0" x2="260" y2="400" stroke="#fbbf24" strokeWidth="2" strokeDasharray="8 6" />

                  {/* Main Street Frisco (Horizontal Arterial Highway) */}
                  <line x1="0" y1="195" x2="600" y2="195" stroke="#ffffff" strokeWidth="16" />
                  <line x1="0" y1="195" x2="600" y2="195" stroke="#93c5fd" strokeWidth="8" />

                  {/* Street Labels */}
                  <text x="70" y="191" fill="#1e3a8a" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                    MAIN STREET (FM 3537)
                  </text>
                  <text x="360" y="191" fill="#1e3a8a" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                    MAIN STREET
                  </text>
                  <text x="270" y="80" fill="#475569" fontSize="10" fontWeight="600" fontFamily="sans-serif" transform="rotate(90 270 80)">
                    DALLAS NORTH TOLLWAY
                  </text>
                  <text x="440" y="100" fill="#64748b" fontSize="9" fontFamily="sans-serif">
                    Frisco Square
                  </text>
                  <text x="60" y="300" fill="#64748b" fontSize="9" fontFamily="sans-serif">
                    Downtown Frisco Heritage
                  </text>

                  {/* Target Dispatch Hub Pin at 5566 Main St */}
                  <g transform="translate(340, 195)">
                    {/* Pulsing radar wave */}
                    <circle cx="0" cy="0" r="28" fill="#0284c7" opacity="0.15" />
                    <circle cx="0" cy="0" r="16" fill="#0284c7" opacity="0.25" />
                    
                    {/* Pin element */}
                    <path
                      d="M0 -34 C-10 -34 -18 -26 -18 -16 C-18 -4 0 0 0 0 C0 0 18 -4 18 -16 C18 -26 10 -34 0 -34 Z"
                      fill="#006194"
                      filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.3))"
                    />
                    <circle cx="0" cy="-18" r="6" fill="#ffffff" />
                    <circle cx="0" cy="-18" r="3" fill="#006194" />
                  </g>
                </svg>
              </div>

              {/* Top Map Overlay Pill */}
              <div className="relative z-10 self-start bg-surface-container-lowest/95 backdrop-blur-sm px-space-md py-space-xs rounded-lg shadow-sm flex items-center gap-space-xs border border-surface-container">
                <span className="material-symbols-outlined text-[18px] text-primary">store</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  5566 Main St · Frisco, TX 75033
                </span>
              </div>

              {/* Bottom Map Interaction Bar */}
              <div className="relative z-10 bg-surface-container-lowest/95 backdrop-blur-sm p-space-md rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <div className="w-3 h-3 rounded-full bg-primary animate-ping shrink-0"></div>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">
                    Frisco & Collin County Local Dispatch Point
                  </span>
                </div>
                <a
                  className="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary font-bold hover:underline focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Open in Maps</span>
                  <span className="material-symbols-outlined text-[16px]">launch</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
