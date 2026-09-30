import React from "react";
import {
  BUSINESS_CONFIG,
  getPhoneHref,
  getEmailHref,
  getMapsHref,
  getReviewsHref,
  isConfigured,
} from "../config/business";
import { Logo } from "./Logo";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenInfo: (title: string, message: React.ReactNode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInfo }) => {
  const phoneHref = getPhoneHref();
  const emailHref = getEmailHref();
  const mapsHref = getMapsHref();
  const reviewsHref = getReviewsHref();

  const handlePhoneClick = (e: React.MouseEvent) => {
    if (!phoneHref) {
      e.preventDefault();
      onOpenInfo(
        "Telephone Dispatch",
        <p>
          Telephone line <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong> is awaiting client configuration.
        </p>
      );
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    if (!emailHref) {
      e.preventDefault();
      onOpenInfo(
        "Email Inquiries",
        <p>
          Email address <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_EMAIL}</strong> is awaiting client configuration.
        </p>
      );
    }
  };

  const handleReviewsClick = (e: React.MouseEvent) => {
    if (!reviewsHref) {
      e.preventDefault();
      onOpenInfo(
        "Google Business Profile",
        <p>
          Google Business Profile URL is awaiting configuration in <code className="bg-surface-container px-1 py-0.5 rounded text-primary">BUSINESS_CONFIG.GOOGLE_BUSINESS_URL</code>.
        </p>
      );
    }
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenInfo(
      "Privacy Policy",
      <div className="space-y-3">
        <p>
          <strong>Information Collection:</strong> VIP Plumbing Experts LLC collects only contact details submitted directly by homeowners to provide plumbing estimates and dispatch service technicians.
        </p>
        <p>
          <strong>Data Usage:</strong> We do not sell, rent, or distribute personal information to third parties. All communication is strictly confined to servicing residential plumbing systems.
        </p>
        <p>
          <strong>Local Compliance:</strong> Operating in compliance with Texas trade licensing and consumer privacy standards.
        </p>
      </div>
    );
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenInfo(
      "Terms of Service",
      <div className="space-y-3">
        <p>
          <strong>Plumbing Estimates & Work:</strong> All residential plumbing assessments performed at 5566 Main St, Frisco, TX or on-site are subject to written approval prior to commencing repairs.
        </p>
        <p>
          <strong>Licensing:</strong> Work is overseen in accordance with Texas Master Plumber regulations (Lic #TACLA00000).
        </p>
        <p>
          <strong>Service Boundaries:</strong> Primary residential service area includes Frisco, TX and surrounding North Collin and Denton County neighborhoods.
        </p>
      </div>
    );
  };

  return (
    <footer className="w-full bg-surface-container-low text-on-surface mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)] border-t border-surface-container">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          {/* Brand & Address Column */}
          <div className="md:col-span-2 flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <Logo />
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Dependable master-craftsmanship, swift emergency dispatch, and precision residential plumbing across Frisco and surrounding Collin & Denton counties.
            </p>

            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-space-xs hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">pin_drop</span>
                <span>{BUSINESS_CONFIG.address}</span>
              </a>

              <a
                href={phoneHref || "#"}
                onClick={handlePhoneClick}
                className="flex items-center gap-space-xs hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">call</span>
                <span>{BUSINESS_CONFIG.BUSINESS_PHONE}</span>
              </a>

              <a
                href={emailHref || "#"}
                onClick={handleEmailClick}
                className="flex items-center gap-space-xs hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">mail</span>
                <span>{BUSINESS_CONFIG.BUSINESS_EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide font-bold">
              Quick Links
            </h3>
            <div className="flex flex-col gap-space-xs font-label-md text-label-md text-on-surface-variant">
              <button
                onClick={() => onNavigate("hero")}
                className="hover:text-primary transition-colors text-left py-1"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate("services")}
                className="hover:text-primary transition-colors text-left py-1"
              >
                Services
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="hover:text-primary transition-colors text-left py-1"
              >
                About
              </button>
              <button
                onClick={() => onNavigate("contact")}
                className="hover:text-primary transition-colors text-left py-1"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Local Directory */}
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide font-bold">
              Local Directory
            </h3>
            <div className="flex flex-col gap-space-xs font-label-md text-label-md text-on-surface-variant">
              <a
                className="hover:text-primary transition-colors flex items-center gap-space-xs py-1"
                href={reviewsHref || "#"}
                onClick={handleReviewsClick}
                target={reviewsHref ? "_blank" : undefined}
                rel={reviewsHref ? "noopener noreferrer" : undefined}
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                <span>Google Business Profile</span>
              </a>

              <a
                className="hover:text-primary transition-colors flex items-center gap-space-xs py-1"
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[16px]">directions</span>
                <span>Get Directions</span>
              </a>

              <span className="font-label-caps text-label-caps text-on-surface-variant/80 mt-space-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
                <span>Lic: Texas Master Plumber</span>
              </span>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-space-xl pt-space-md border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
          <p>Copyright © {new Date().getFullYear()} {BUSINESS_CONFIG.name} · Frisco, Texas. All rights reserved.</p>
          <div className="flex items-center gap-space-md font-label-md text-label-md">
            <a
              href="#privacy"
              onClick={handlePrivacyClick}
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="#terms"
              onClick={handleTermsClick}
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
