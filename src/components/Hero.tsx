import React, { useState } from "react";
import { BUSINESS_CONFIG, getPhoneHref } from "../config/business";

interface HeroProps {
  onOpenInfo: (title: string, message: React.ReactNode) => void;
  onRequestService: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInfo, onRequestService }) => {
  const [imageError, setImageError] = useState(false);
  const phoneHref = getPhoneHref();

  const handlePhoneClick = (e: React.MouseEvent) => {
    if (!phoneHref) {
      e.preventDefault();
      onOpenInfo(
        "Telephone Dispatch",
        <div>
          <p className="mb-2">
            The business telephone number <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong> is awaiting client configuration.
          </p>
          <p>
            You may scroll down to complete the service request form for guaranteed prompt follow-up.
          </p>
        </div>
      );
    }
  };

  return (
    <section className="w-full bg-surface py-space-xl lg:py-20 relative overflow-hidden" id="hero">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Left Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container text-on-surface-variant w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true"></span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold text-primary">
                Local Residential Plumbing · Serving Frisco, TX
              </span>
            </div>

            {/* Main H1 Headline */}
            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight" style={{ textWrap: "balance" }}>
              Professional Local Plumbing Services in Frisco, Texas
            </h1>

            {/* Subtitle */}
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Direct, dependable plumbing service for homeowners across Frisco. Fast communication, clean workmanship, and upfront local service.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <a
                className="inline-flex items-center justify-center gap-space-xs h-12 px-space-lg rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md transition-all active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                href={phoneHref || "#request-service"}
                onClick={handlePhoneClick}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                  call
                </span>
                <span>Call {BUSINESS_CONFIG.BUSINESS_PHONE}</span>
              </a>

              <button
                type="button"
                onClick={onRequestService}
                className="inline-flex items-center justify-center gap-space-xs h-12 px-space-lg rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calendar_today</span>
                <span>Request Service</span>
              </button>
            </div>

            {/* Social Proof Block */}
            <div className="mt-space-md p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center gap-space-md max-w-xl shadow-sm border border-surface-container">
              <div className="flex items-center gap-space-xs">
                <div className="flex text-tertiary" aria-label="4.7 out of 5 stars">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface ml-1 font-bold">
                  {BUSINESS_CONFIG.rating}
                </span>
              </div>
              <div className="sm:border-l sm:border-outline-variant/30 sm:pl-space-md flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface font-bold">
                  {BUSINESS_CONFIG.rating} Google Rating · {BUSINESS_CONFIG.reviewCount} Verified Reviews
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-xs mt-0.5">
                  <span className="material-symbols-outlined text-[15px] text-primary" aria-hidden="true">storefront</span>
                  Locally operated at {BUSINESS_CONFIG.address}
                </span>
              </div>
            </div>
          </div>

          {/* Right Media Column (5 Cols) */}
          <div className="lg:col-span-5 relative mt-space-lg lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-high border border-outline-variant/20 min-h-[380px] lg:h-[460px]">
              {!imageError ? (
                <img
                  alt="Licensed residential technician carefully installing water filtration pipes in a clean kitchen cabinet setting"
                  className="w-full h-full object-cover object-center transform transition duration-500 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnfl3YWD9VwPl7UzFgoNAxoa12iWZbbc1stuZ9T47mB8cA4cjM_yVTrb5CWMOLPWyJhndQ01K9p-7fsKiIbPnbG_VCVFIWYd6ciJGvxUWAsCtZRebXrpf6tbyZSjsdBgPOMulgbZWihN0Mn-G-8H9V1_kflgR0zOblyWgy7lnp_QtqZWZ9xEFAYIKEqtJr-EIRCQTVRLvpeBuZFSS7Mx-3I-tpJ4ID4N5T6X0Zv1qmKg4rT-Kxf-ydkQ"
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  width="560"
                  height="460"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0F172A] to-[#006194] text-white">
                  <span className="material-symbols-outlined text-5xl mb-3 text-[#38bdf8]">plumbing</span>
                  <p className="font-headline-sm text-center">Licensed Frisco Plumbing Craft</p>
                  <p className="text-body-sm text-white/80 text-center mt-1">Clean residential plumbing & water solutions</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Image Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-sm p-space-sm rounded-xl shadow-md flex items-center gap-space-sm border border-outline-variant/20">
                <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                    verified
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                    Clean residential workmanship
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Dedicated Frisco technicians
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
