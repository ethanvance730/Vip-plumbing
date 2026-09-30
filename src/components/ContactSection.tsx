import React, { useState, useEffect } from "react";
import {
  BUSINESS_CONFIG,
  getPhoneHref,
  isConfigured,
  getWhatsAppHref,
} from "../config/business";

interface ContactSectionProps {
  selectedService: string;
  onOpenInfo: (title: string, message: React.ReactNode) => void;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  serviceNeeded: string;
  problemDetails: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceNeeded?: string;
  problemDetails?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedService,
  onOpenInfo,
}) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    serviceNeeded: selectedService || "",
    problemDetails: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "unconfigured" | "success" | "error">("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const phoneHref = getPhoneHref();
  const whatsappHref = getWhatsAppHref();
  const endpointConfigured = isConfigured(BUSINESS_CONFIG.FORM_SUBMISSION_ENDPOINT);

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: selectedService }));
    }
  }, [selectedService]);

  const validateField = (name: keyof FormState, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length < 2) return "Please enter your full name (minimum 2 characters).";
        return undefined;
      case "phone":
        if (!value.trim()) return "Phone number is required for dispatch.";
        // Clean check for at least 7 digits
        const digits = value.replace(/\D/g, "");
        if (digits.length < 10) return "Please enter a valid 10-digit telephone number.";
        return undefined;
      case "email":
        if (!value.trim()) return "Email address is required.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return "Please enter a valid email address (e.g. name@domain.com).";
        return undefined;
      case "serviceNeeded":
        if (!value) return "Please select a service category.";
        return undefined;
      case "problemDetails":
        if (!value.trim()) return "Please provide details about your plumbing concern.";
        if (value.trim().length < 10) return "Please describe the issue in at least 10 characters.";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name as keyof FormState, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormState, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormState>).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      serviceNeeded: true,
      problemDetails: true,
    });

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    if (!endpointConfigured) {
      // Configuration Point: No fake submission claim!
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionStatus("unconfigured");
      }, 400);
      return;
    }

    try {
      const res = await fetch(BUSINESS_CONFIG.FORM_SUBMISSION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      setIsSubmitting(false);
      setSubmissionStatus("success");
      setSubmissionMessage("Thank you. Your inquiry has been sent to our dispatch queue.");
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmissionStatus("error");
      setSubmissionMessage("We could not send your request due to a network error. Please call us directly.");
    }
  };

  const handleDirectEmailDispatch = () => {
    const subject = encodeURIComponent(
      `Plumbing Service Request - ${formData.serviceNeeded.toUpperCase()} - ${formData.fullName}`
    );
    const body = encodeURIComponent(
      `Client Name: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nService: ${formData.serviceNeeded}\n\nDescription:\n${formData.problemDetails}\n\nLocation: Frisco, TX`
    );
    const recipient = isConfigured(BUSINESS_CONFIG.BUSINESS_EMAIL)
      ? BUSINESS_CONFIG.BUSINESS_EMAIL
      : "";
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="w-full bg-surface py-space-xl lg:py-24" id="request-service">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left: Form Narrative & Direct Contact (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-label-caps text-primary uppercase font-bold tracking-widest">
                Connect With Us
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs tracking-tight">
                Get in Touch With VIP Plumbing Experts
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm">
                Have a plumbing issue or need a consultation? Call us directly at{" "}
                <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong> or
                submit the form for responsive scheduling.
              </p>

              {/* Quick Direct Call Box */}
              <div className="mt-space-xl p-space-md rounded-xl bg-surface-container-low shadow-sm border border-surface-container">
                <p className="font-label-caps text-label-caps text-primary uppercase font-semibold">
                  Immediate Assistance
                </p>
                <div className="flex items-center justify-between mt-space-xs">
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">
                    {BUSINESS_CONFIG.BUSINESS_PHONE}
                  </span>
                  <a
                    className="w-10 h-10 rounded-lg bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                    href={phoneHref || "#request-service"}
                    onClick={(e) => {
                      if (!phoneHref) {
                        e.preventDefault();
                        onOpenInfo(
                          "Immediate Assistance Line",
                          <p>
                            Telephone line <strong className="text-on-surface">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong> is awaiting client configuration. Please use the form on this page.
                          </p>
                        );
                      }
                    }}
                    aria-label={`Call ${BUSINESS_CONFIG.BUSINESS_PHONE}`}
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      call
                    </span>
                  </a>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                  Direct local line for Frisco homeowners
                </p>
              </div>

              {/* Address Reminder */}
              <div className="mt-space-md flex items-center gap-space-sm p-space-xs text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[20px] text-primary">domain</span>
                <span>{BUSINESS_CONFIG.address}</span>
              </div>
            </div>

            <div className="mt-space-xl p-space-md rounded-xl bg-surface-container text-on-surface-variant font-body-sm text-body-sm flex items-center gap-space-sm border border-surface-container-high">
              <span className="material-symbols-outlined text-[20px] text-primary shrink-0">
                verified_user
              </span>
              <span>Your information is used solely to respond to your plumbing service request.</span>
            </div>
          </div>

          {/* Right: Structured Request Form (7 Cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-2xl shadow-md border border-surface-container">
            {submissionStatus === "unconfigured" ? (
              <div className="flex flex-col gap-space-md animate-fade-in" role="region" aria-live="polite">
                <div className="p-space-md rounded-xl bg-surface-container-low border border-primary/30 flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[28px] shrink-0 mt-0.5">
                    settings_suggest
                  </span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Inquiry Ready · Integration Point Notice
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Your plumbing service request has been validated. The backend submission endpoint <code className="bg-surface-container px-1 py-0.5 rounded text-primary text-xs font-mono">{BUSINESS_CONFIG.FORM_SUBMISSION_ENDPOINT}</code> is ready for client API hookup in <code className="bg-surface-container px-1 py-0.5 rounded text-xs font-mono">src/config/business.ts</code>.
                    </p>
                  </div>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container text-on-surface text-body-sm space-y-2 border border-surface-container-high">
                  <p className="font-semibold text-primary uppercase text-label-caps">Inquiry Summary:</p>
                  <p><strong>Name:</strong> {formData.fullName}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Service:</strong> {formData.serviceNeeded}</p>
                  <p><strong>Issue:</strong> {formData.problemDetails}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleDirectEmailDispatch}
                    className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">email</span>
                    <span>Launch Pre-Filled Email</span>
                  </button>

                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-12 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-label-lg text-label-lg shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                      <span>Send via WhatsApp</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setSubmissionStatus("idle")}
                    className="px-5 h-12 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            ) : submissionStatus === "success" ? (
              <div className="p-space-lg rounded-xl bg-surface-container-low border border-primary/30 flex flex-col items-center text-center gap-3 animate-fade-in" role="status">
                <span className="material-symbols-outlined text-primary text-[48px]">check_circle</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Service Request Received</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                  {submissionMessage} Our local Frisco team will review your inquiry shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmissionStatus("idle");
                    setFormData({
                      fullName: "",
                      phone: "",
                      email: "",
                      serviceNeeded: "",
                      problemDetails: "",
                    });
                  }}
                  className="mt-3 px-6 py-2 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-space-md" onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="flex flex-col gap-space-xs">
                  <label
                    className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                    htmlFor="full-name"
                  >
                    <span>
                      Full Name <span className="text-error" aria-hidden="true">*</span>
                    </span>
                    {touched.fullName && errors.fullName && (
                      <span className="text-error text-xs font-normal flex items-center gap-1" role="alert">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        {errors.fullName}
                      </span>
                    )}
                  </label>
                  <input
                    className={`w-full h-11 px-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 font-body-md text-body-md transition-all border ${
                      touched.fullName && errors.fullName
                        ? "border-error focus:ring-error"
                        : "border-outline-variant/30 focus:ring-primary"
                    }`}
                    id="full-name"
                    name="fullName"
                    placeholder="e.g. John Miller"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    type="text"
                    aria-required="true"
                    aria-invalid={Boolean(touched.fullName && errors.fullName)}
                  />
                </div>

                {/* Two-Col Inputs: Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  {/* Phone */}
                  <div className="flex flex-col gap-space-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                      htmlFor="phone-number"
                    >
                      <span>
                        Phone Number <span className="text-error" aria-hidden="true">*</span>
                      </span>
                      {touched.phone && errors.phone && (
                        <span className="text-error text-xs font-normal flex items-center gap-1" role="alert">
                          <span className="material-symbols-outlined text-[14px]">error</span>
                          Required
                        </span>
                      )}
                    </label>
                    <input
                      className={`w-full h-11 px-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 font-body-md text-body-md transition-all border ${
                        touched.phone && errors.phone
                          ? "border-error focus:ring-error"
                          : "border-outline-variant/30 focus:ring-primary"
                      }`}
                      id="phone-number"
                      name="phone"
                      placeholder="(214) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      type="tel"
                      aria-required="true"
                      aria-invalid={Boolean(touched.phone && errors.phone)}
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-error text-xs mt-0.5" role="alert">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-space-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                      htmlFor="email-address"
                    >
                      <span>
                        Email Address <span className="text-error" aria-hidden="true">*</span>
                      </span>
                      {touched.email && errors.email && (
                        <span className="text-error text-xs font-normal flex items-center gap-1" role="alert">
                          <span className="material-symbols-outlined text-[14px]">error</span>
                          Required
                        </span>
                      )}
                    </label>
                    <input
                      className={`w-full h-11 px-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 font-body-md text-body-md transition-all border ${
                        touched.email && errors.email
                          ? "border-error focus:ring-error"
                          : "border-outline-variant/30 focus:ring-primary"
                      }`}
                      id="email-address"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      type="email"
                      aria-required="true"
                      aria-invalid={Boolean(touched.email && errors.email)}
                    />
                    {touched.email && errors.email && (
                      <p className="text-error text-xs mt-0.5" role="alert">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Service Needed Dropdown */}
                <div className="flex flex-col gap-space-xs">
                  <label
                    className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                    htmlFor="service-needed"
                  >
                    <span>
                      Service Needed <span className="text-error" aria-hidden="true">*</span>
                    </span>
                    {touched.serviceNeeded && errors.serviceNeeded && (
                      <span className="text-error text-xs font-normal flex items-center gap-1" role="alert">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        {errors.serviceNeeded}
                      </span>
                    )}
                  </label>
                  <select
                    className={`w-full h-11 px-space-sm rounded-lg bg-surface-container-low text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-2 font-body-md text-body-md transition-all border ${
                      touched.serviceNeeded && errors.serviceNeeded
                        ? "border-error focus:ring-error"
                        : "border-outline-variant/30 focus:ring-primary"
                    }`}
                    id="service-needed"
                    name="serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(touched.serviceNeeded && errors.serviceNeeded)}
                  >
                    <option value="" disabled>
                      [Select Service or Describe Issue]
                    </option>
                    <option value="primary">[ADD PRIMARY PLUMBING SERVICE]</option>
                    <option value="secondary">[ADD SECONDARY PLUMBING SERVICE]</option>
                    <option value="maintenance">[ADD PLUMBING SERVICE]</option>
                    <option value="inspection">Diagnostic / Inspection</option>
                    <option value="other">Other Residential Service</option>
                  </select>
                </div>

                {/* Message / Problem Details */}
                <div className="flex flex-col gap-space-xs">
                  <label
                    className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                    htmlFor="problem-details"
                  >
                    <span>
                      Message / Problem Details <span className="text-error" aria-hidden="true">*</span>
                    </span>
                    {touched.problemDetails && errors.problemDetails && (
                      <span className="text-error text-xs font-normal flex items-center gap-1" role="alert">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        {errors.problemDetails}
                      </span>
                    )}
                  </label>
                  <textarea
                    className={`w-full p-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 font-body-md text-body-md transition-all border ${
                      touched.problemDetails && errors.problemDetails
                        ? "border-error focus:ring-error"
                        : "border-outline-variant/30 focus:ring-primary"
                    }`}
                    id="problem-details"
                    name="problemDetails"
                    placeholder="Briefly describe your plumbing concern, preferred schedule, or questions..."
                    value={formData.problemDetails}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    rows={4}
                    aria-required="true"
                    aria-invalid={Boolean(touched.problemDetails && errors.problemDetails)}
                  />
                </div>

                {submissionStatus === "error" && (
                  <div className="p-3 rounded-lg bg-error-container text-on-error-container text-body-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">error</span>
                    <span>{submissionMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-space-xs">
                  <button
                    className="w-full h-12 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md transition-all flex items-center justify-center gap-space-xs active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-70"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Validating Dispatch Request...</span>
                      </span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">send</span>
                        <span>Submit Service Request</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <span className="text-body-sm text-on-surface-variant">
                    Emergency need? Direct line:{" "}
                    <strong className="text-primary font-bold">{BUSINESS_CONFIG.BUSINESS_PHONE}</strong>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
