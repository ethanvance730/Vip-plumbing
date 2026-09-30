import React from "react";
import { BUSINESS_CONFIG, getPhoneHref } from "../config/business";

interface ServicesSectionProps {
  onSelectService: (serviceKey: string) => void;
  onOpenInfo: (title: string, message: React.ReactNode) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenInfo,
}) => {
  const phoneHref = getPhoneHref();

  const handlePhoneClick = (e: React.MouseEvent) => {
    if (!phoneHref) {
      e.preventDefault();
      onOpenInfo(
        "Service Availability Verification",
        <p>
          Telephone line <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong> is awaiting client configuration. Please select a service card or fill out the service request form below.
        </p>
      );
    }
  };

  const services = [
    {
      id: "primary",
      icon: "plumbing",
      category: "Core Category",
      title: "[ADD PRIMARY PLUMBING SERVICE]",
      description: "Configure core residential plumbing service category and scope.",
    },
    {
      id: "secondary",
      icon: "water_heater",
      category: "Specialized Scope",
      title: "[ADD SECONDARY PLUMBING SERVICE]",
      description: "Configure specialized repair, replacement, or installation service.",
    },
    {
      id: "maintenance",
      icon: "valve",
      category: "Maintenance",
      title: "[ADD PLUMBING SERVICE]",
      description: "Configure localized maintenance or fixture service.",
    },
    {
      id: "inspection",
      icon: "search_check",
      category: "Diagnostics",
      title: "[ADD PLUMBING SERVICE]",
      description: "Configure diagnostic or piping service.",
    },
  ];

  return (
    <section className="w-full bg-surface py-space-xl lg:py-20" id="services">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div className="max-w-2xl">
            <span className="font-label-caps text-label-caps text-primary uppercase font-bold tracking-widest">
              Residential Service Offerings
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs tracking-tight">
              Plumbing Solutions for Frisco Homes
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
              Configurable service directory tailored to your household plumbing needs.
            </p>
          </div>

          <a
            href={phoneHref || "#request-service"}
            onClick={handlePhoneClick}
            className="bg-surface-container px-space-md py-space-xs rounded-lg text-on-surface-variant text-body-sm flex items-center gap-space-xs self-start md:self-auto hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden="true">info</span>
            <span>
              Call <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong> to verify service availability
            </span>
          </a>
        </div>

        {/* Service Blocks Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all border border-surface-container flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md group-hover:bg-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-[28px]">{svc.icon}</span>
                </div>
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider font-semibold">
                  {svc.category}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-1">
                  {svc.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
                  {svc.description}
                </p>
              </div>

              <div className="pt-space-md mt-space-md border-t border-surface-container/40">
                <button
                  type="button"
                  onClick={() => onSelectService(svc.id)}
                  className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-primary hover:text-primary-container font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded py-1"
                >
                  <span>Schedule Service</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
