import React from "react";
import { BUSINESS_CONFIG } from "../config/business";

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: "phone_in_talk",
      title: "[ADD STEP]",
      description: (
        <>
          Initial contact and problem assessment via{" "}
          <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong> or direct
          online form submission.
        </>
      ),
      phase: "Step 1 · Contact",
    },
    {
      step: "02",
      icon: "home_pin",
      title: "[ADD STEP]",
      description:
        "On-site evaluation at your Frisco residence with clear explanation before any work commences.",
      phase: "Step 2 · On-Site Evaluation",
    },
    {
      step: "03",
      icon: "task_alt",
      title: "[ADD STEP]",
      description:
        "Clear completion, clean worksite handover, and verified operation of all adjusted plumbing components.",
      phase: "Step 3 · Quality Handover",
    },
  ];

  return (
    <section className="w-full bg-surface py-space-xl lg:py-20" id="process">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="text-center max-w-2xl mx-auto mb-space-xl">
          <span className="font-label-caps text-label-caps text-primary uppercase font-bold tracking-widest">
            Clear Workflow
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs tracking-tight">
            Our Transparent Service Process
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
            Dependable step-by-step handling from the moment you get in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {steps.map((item) => (
            <div
              key={item.step}
              className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col justify-between relative hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold font-headline-sm">
                    {item.step}
                  </span>
                  <span className="material-symbols-outlined text-[24px] text-outline-variant">
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {item.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
                  {item.description}
                </p>
              </div>

              <div className="mt-space-md pt-space-sm border-t border-surface-container/60">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
                  {item.phase}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
