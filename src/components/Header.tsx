import React, { useState } from "react";
import { BUSINESS_CONFIG, isConfigured, getPhoneHref } from "../config/business";
import { Logo } from "./Logo";

interface HeaderProps {
  onOpenInfo: (title: string, message: React.ReactNode) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenInfo,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const phoneHref = getPhoneHref();

  const handlePhoneClick = (e: React.MouseEvent) => {
    if (!phoneHref) {
      e.preventDefault();
      onOpenInfo(
        "Direct Phone Line",
        <div>
          <p className="mb-2">
            The business telephone number <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong> is currently pending final client verification.
          </p>
          <p>
            You can submit your service request using the online form below, or update <code className="bg-surface-container px-1 py-0.5 rounded text-primary">BUSINESS_PHONE</code> in <code className="bg-surface-container px-1 py-0.5 rounded">src/config/business.ts</code>.
          </p>
        </div>
      );
    }
  };

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container">
      {/* Top Announcement Bar */}
      <div className="bg-surface-container-low border-b border-surface-container/60">
        <div className="max-w-7xl mx-auto px-margin-sm md:px-margin h-8 flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps">
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[14px] text-primary" aria-hidden="true">
                location_on
              </span>
              <span>Serving Frisco, TX & North Collin County</span>
            </span>
            <span className="hidden sm:inline-block text-outline-variant" aria-hidden="true">|</span>
            <button
              onClick={() => handleNavClick("reviews")}
              className="hidden sm:inline-flex items-center gap-space-xs font-label-md text-label-md text-tertiary hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-[14px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                star
              </span>
              <strong className="font-label-md text-label-md">{BUSINESS_CONFIG.rating}</strong> ({BUSINESS_CONFIG.reviewCount} Google Reviews)
            </button>
          </div>
          <div className="flex items-center gap-space-md font-label-md text-label-md">
            <span className="hidden md:inline-flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px] text-primary" aria-hidden="true">
                verified
              </span>
              {BUSINESS_CONFIG.license}
            </span>
            <span className="text-outline-variant hidden md:inline-block" aria-hidden="true">|</span>
            <a
              href={phoneHref || "#request-service"}
              onClick={handlePhoneClick}
              className="text-on-surface font-label-lg text-label-lg font-bold hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px] text-primary" aria-hidden="true">call</span>
              {BUSINESS_CONFIG.BUSINESS_PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-20 max-w-7xl mx-auto px-margin-sm md:px-margin flex items-center justify-between">
        <div className="flex items-center gap-space-lg">
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-space-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label="VIP Plumbing Experts Home"
          >
            <Logo />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-space-lg ml-space-md" aria-label="Main Navigation">
            <button
              onClick={() => handleNavClick("hero")}
              className={`transition-colors font-label-lg text-label-lg py-1 border-b-2 ${
                activeSection === "hero"
                  ? "text-primary font-bold border-primary"
                  : "text-on-surface-variant hover:text-on-surface border-transparent"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("services")}
              className={`transition-colors font-label-lg text-label-lg py-1 border-b-2 ${
                activeSection === "services"
                  ? "text-primary font-bold border-primary"
                  : "text-on-surface-variant hover:text-on-surface border-transparent"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className={`transition-colors font-label-lg text-label-lg py-1 border-b-2 ${
                activeSection === "about"
                  ? "text-primary font-bold border-primary"
                  : "text-on-surface-variant hover:text-on-surface border-transparent"
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className={`transition-colors font-label-lg text-label-lg py-1 border-b-2 ${
                activeSection === "contact"
                  ? "text-primary font-bold border-primary"
                  : "text-on-surface-variant hover:text-on-surface border-transparent"
              }`}
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          <button
            onClick={() => handleNavClick("contact")}
            className="hidden sm:inline-flex items-center justify-center px-space-md h-10 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          >
            Request Service
          </button>
          <a
            href={phoneHref || "#request-service"}
            onClick={handlePhoneClick}
            className="inline-flex items-center justify-center px-space-md h-10 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
          >
            Call Now
          </a>
          <button
            onClick={() => onOpenInfo("Account / Dispatch Portal", "Client direct dispatch system active. Frisco residential dispatch center standing by.")}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="User profile or dispatch portal"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden bg-surface-container-lowest border-t border-surface-container px-margin-sm py-4 shadow-xl flex flex-col gap-3 animate-fade-in"
          role="navigation"
          aria-label="Mobile Navigation"
        >
          <button
            onClick={() => handleNavClick("hero")}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container text-on-surface font-label-lg text-label-lg flex items-center justify-between"
          >
            <span>Home</span>
            <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
          </button>
          <button
            onClick={() => handleNavClick("services")}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container text-on-surface font-label-lg text-label-lg flex items-center justify-between"
          >
            <span>Services</span>
            <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container text-on-surface font-label-lg text-label-lg flex items-center justify-between"
          >
            <span>About / Why Us</span>
            <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
          </button>
          <button
            onClick={() => handleNavClick("location")}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container text-on-surface font-label-lg text-label-lg flex items-center justify-between"
          >
            <span>Location & Directions</span>
            <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container text-on-surface font-label-lg text-label-lg flex items-center justify-between"
          >
            <span>Request Service Form</span>
            <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
          </button>

          <div className="pt-2 border-t border-surface-container flex flex-col gap-2">
            <a
              href={phoneHref || "#request-service"}
              onClick={(e) => {
                handlePhoneClick(e);
                setMobileMenuOpen(false);
              }}
              className="w-full h-11 rounded-lg bg-primary text-on-primary flex items-center justify-center gap-2 font-label-lg text-label-lg shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Call [ADD BUSINESS PHONE]</span>
            </a>
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full h-11 rounded-lg bg-surface-container text-on-surface flex items-center justify-center gap-2 font-label-lg text-label-lg"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              <span>Request Service Online</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
