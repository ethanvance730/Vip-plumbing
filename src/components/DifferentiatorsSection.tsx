import React from "react";
import { BUSINESS_CONFIG } from "../config/business";

interface DifferentiatorsSectionProps {
  onNavigateToReviews: () => void;
}

export const DifferentiatorsSection: React.FC<DifferentiatorsSectionProps> = ({
  onNavigateToReviews,
}) => {
  const differentiators = [
    {
      num: "01",
      title: "[ADD VERIFIED BUSINESS DIFFERENTIATOR]",
      description: "Configure your verified licensing, team credential, or business practice.",
    },
    {
      num: "02",
      title: "[ADD VERIFIED BUSINESS DIFFERENTIATOR]",
      description: "Configure your verified diagnostic approach or scheduling practice.",
    },
    {
      num: "03",
      title: "[ADD VERIFIED BUSINESS DIFFERENTIATOR]",
      description: "Configure your verified customer satisfaction policy or equipment standards.",
    },
  ];

  return (
    <section className="w-full bg-surface-container-low py-space-xl lg:py-20 border-y border-surface-container" id="about">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Editorial Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <span className="font-label-caps text-label-caps text-primary uppercase font-bold tracking-widest">
              Local Trust & Craft
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Why Frisco Homeowners Trust {BUSINESS_CONFIG.name}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              We focus on clean, precise residential craft backed by transparent local accountability. With {BUSINESS_CONFIG.reviewCount} genuine Google reviews and our local hub on Main Street, our team is committed to straightforward communication and meticulous execution.
            </p>

            <button
              onClick={onNavigateToReviews}
              className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container flex items-center gap-space-md mt-space-xs text-left hover:border-primary/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0 font-bold font-headline-md">
                {BUSINESS_CONFIG.rating}
              </div>
              <div>
                <p className="font-label-lg text-label-lg text-on-surface font-bold">
                  {BUSINESS_CONFIG.reviewCount} Verified Homeowner Reviews
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Frisco, TX and surrounding neighborhood residents
                </p>
              </div>
            </button>
          </div>

          {/* Structured Differentiators Right Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {differentiators.map((diff) => (
              <div
                key={diff.num}
                className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col sm:flex-row items-start gap-space-md transition-shadow hover:shadow-md"
              >
                <div className="font-display-lg-mobile text-display-lg-mobile text-outline-variant font-bold leading-none select-none shrink-0 w-12 text-primary/40">
                  {diff.num}
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    {diff.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                    {diff.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
