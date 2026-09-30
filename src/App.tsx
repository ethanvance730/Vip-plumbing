import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { ServicesSection } from "./components/ServicesSection";
import { DifferentiatorsSection } from "./components/DifferentiatorsSection";
import { ProcessSection } from "./components/ProcessSection";
import { ReviewsBanner } from "./components/ReviewsBanner";
import { LocationSection } from "./components/LocationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { MobileStickyBar } from "./components/MobileStickyBar";
import { InfoModal } from "./components/InfoModal";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedService, setSelectedService] = useState("");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
  }>({
    isOpen: false,
    title: "",
    content: null,
  });

  const handleOpenInfo = (title: string, content: React.ReactNode) => {
    setModalState({
      isOpen: true,
      title,
      content,
    });
  };

  const handleCloseInfo = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
    scrollToSection("request-service");
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "services", "about", "location", "request-service"];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            if (sectionId === "hero") setActiveSection("hero");
            else if (sectionId === "services") setActiveSection("services");
            else if (sectionId === "about") setActiveSection("about");
            else if (sectionId === "location" || sectionId === "request-service")
              setActiveSection("contact");
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Sticky Header with Navigation */}
      <Header
        onOpenInfo={handleOpenInfo}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Page Flow mirroring Stitch design */}
      <main className="w-full pt-28 bg-surface flex-1">
        {/* Hero Section */}
        <Hero
          onOpenInfo={handleOpenInfo}
          onRequestService={() => scrollToSection("request-service")}
        />

        {/* Compact Credibility & Trust Strip */}
        <TrustStrip
          onOpenInfo={handleOpenInfo}
          onNavigateToReviews={() => scrollToSection("reviews")}
          onNavigateToLocation={() => scrollToSection("location")}
        />

        {/* Core Services Section */}
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenInfo={handleOpenInfo}
        />

        {/* Why Homeowners Choose Us / Differentiators */}
        <DifferentiatorsSection
          onNavigateToReviews={() => scrollToSection("reviews")}
        />

        {/* Transparent Service Progression */}
        <ProcessSection />

        {/* Google Reviews & Social Proof Strip */}
        <ReviewsBanner onOpenInfo={handleOpenInfo} />

        {/* Local Frisco Presence & Location Card */}
        <LocationSection onOpenInfo={handleOpenInfo} />

        {/* Request Service / Contact Form */}
        <ContactSection
          selectedService={selectedService}
          onOpenInfo={handleOpenInfo}
        />
      </main>

      {/* Comprehensive Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenInfo={handleOpenInfo}
      />

      {/* Persistent Mobile Bottom Emergency Dispatch Strip */}
      <MobileStickyBar
        onOpenInfo={handleOpenInfo}
        onRequestService={() => scrollToSection("request-service")}
      />

      {/* Information / Configuration Dialog Modal */}
      <InfoModal
        isOpen={modalState.isOpen}
        onClose={handleCloseInfo}
        title={modalState.title}
      >
        {modalState.content}
      </InfoModal>
    </div>
  );
}
