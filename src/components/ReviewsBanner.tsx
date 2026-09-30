import React from "react";
import { BUSINESS_CONFIG, isConfigured } from "../config/business";

interface ReviewsBannerProps {
  onOpenInfo: (title: string, message: React.ReactNode) => void;
}

export const ReviewsBanner: React.FC<ReviewsBannerProps> = ({ onOpenInfo }) => {
  const reviewsConfigured = isConfigured(BUSINESS_CONFIG.GOOGLE_BUSINESS_URL);

  const handleReviewsClick = (e: React.MouseEvent) => {
    if (!reviewsConfigured) {
      e.preventDefault();
      onOpenInfo(
        "Verified Google Reviews",
        <div>
          <div className="flex items-center gap-3 p-4 bg-surface-container rounded-xl mb-4">
            <span className="text-3xl font-bold text-tertiary">{BUSINESS_CONFIG.rating}</span>
            <div>
              <div className="flex text-tertiary">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
              </div>
              <p className="font-semibold text-on-surface">57 Verified Google Reviews</p>
            </div>
          </div>
          <p className="text-body-md text-on-surface-variant">
            The Google Business Profile URL <code className="bg-surface-container px-1 py-0.5 rounded text-primary">{BUSINESS_CONFIG.GOOGLE_BUSINESS_URL}</code> can be configured in <code className="bg-surface-container px-1 py-0.5 rounded">src/config/business.ts</code> to link directly to your public Google reviews page.
          </p>
        </div>
      );
    }
  };

  return (
    <section className="w-full bg-inverse-surface py-space-xl text-inverse-on-surface" id="reviews">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="bg-surface-container-lowest/5 rounded-2xl p-space-lg lg:p-space-xl flex flex-col lg:flex-row items-center justify-between gap-space-lg border border-white/10 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-lg">
            {/* Rating Circle Display */}
            <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-tertiary-container text-on-tertiary-container p-space-sm shrink-0 shadow-inner">
              <span className="font-display-lg text-display-lg leading-none font-bold">
                {BUSINESS_CONFIG.rating}
              </span>
              <div className="flex text-tertiary-fixed mt-1" aria-label="4.7 out of 5 stars">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>

            <div>
              <span className="font-label-caps text-label-caps text-primary-fixed uppercase tracking-wider font-semibold">
                Verified Feedback
              </span>
              <h2 className="font-headline-xl text-headline-xl text-inverse-on-surface mt-1">
                Backed by {BUSINESS_CONFIG.reviewCount} Genuine Google Reviews
              </h2>
              <p className="font-body-md text-body-md text-surface-container mt-1 max-w-xl text-slate-300">
                Homeowners in Frisco trust {BUSINESS_CONFIG.name} for reliable communication and professional plumbing craft.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs h-12 px-space-lg rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md transition-all focus-visible:ring-2 focus-visible:ring-white"
              href={reviewsConfigured ? BUSINESS_CONFIG.GOOGLE_BUSINESS_URL : "#reviews"}
              onClick={handleReviewsClick}
              target={reviewsConfigured ? "_blank" : undefined}
              rel={reviewsConfigured ? "noopener noreferrer" : undefined}
            >
              <span>See Our Google Reviews</span>
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
