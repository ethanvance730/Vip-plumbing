import React from "react";
import { BUSINESS_CONFIG, getPhoneHref } from "../config/business";

interface TrustStripProps {
  onOpenInfo: (title: string, message: React.ReactNode) => void;
  onNavigateToReviews: () => void;
  onNavigateToLocation: () => void;
}

export const TrustStrip: React.FC<TrustStripProps> = ({
  onOpenInfo,
  onNavigateToReviews,
  onNavigateToLocation,
}) => {
  const phoneHref = getPhoneHref();

  const handlePhoneClick = (e: React.MouseEvent) => {
    if (!phoneHref) {
      e.preventDefault();
      onOpenInfo(
        "Direct Contact Inquiries",
        <p>
          Telephone line <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong> is ready for verification. You may also visit our headquarters at {BUSINESS_CONFIG.address} or fill out the service request form below.
        </p>
      );
    }
  };

  return (
    <section className="w-full bg-surface-container-low py-space-md shadow-sm border-y border-surface-container">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-sm items-center">
          {/* Item 1 */}
          <button
            onClick={onNavigateToReviews}
            className="flex items-center gap-space-sm p-space-xs text-left rounded-lg hover:bg-surface-container transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-tertiary shrink-0 group-hover:bg-tertiary-fixed transition-colors">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                grade
              </span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                {BUSINESS_CONFIG.rating} Google Rating
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {BUSINESS_CONFIG.reviewCount} Verified Reviews
              </p>
            </div>
          </button>

          {/* Item 2 */}
          <div className="flex items-center gap-space-sm p-space-xs">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">location_city</span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                Frisco, Texas Local
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Serving Frisco Homeowners
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <button
            onClick={onNavigateToLocation}
            className="flex items-center gap-space-sm p-space-xs text-left rounded-lg hover:bg-surface-container transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0 group-hover:bg-primary-fixed transition-colors">
              <span className="material-symbols-outlined text-[22px]">pin_drop</span>
            </div>
            <div className="min-w-0">
              <p className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                Physical Location
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {BUSINESS_CONFIG.address}
              </p>
            </div>
          </button>

          {/* Item 4 */}
          <a
            href={phoneHref || "#request-service"}
            onClick={handlePhoneClick}
            className="flex items-center gap-space-sm p-space-xs rounded-lg hover:bg-surface-container transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0 group-hover:bg-primary-fixed transition-colors">
              <span className="material-symbols-outlined text-[22px]">support_agent</span>
            </div>
            <div className="min-w-0">
              <p className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                Direct Contact
              </p>
              <p className="font-body-sm text-body-sm text-primary font-medium truncate">
                {BUSINESS_CONFIG.BUSINESS_PHONE}
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
