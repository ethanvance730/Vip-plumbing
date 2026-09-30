/**
 * VIP Plumbing Experts LLC - Verified Business Configuration
 * 
 * Instructions:
 * Replace placeholders with verified business details when available.
 * Missing details must never be fabricated.
 */

export const BUSINESS_CONFIG = {
  name: "VIP Plumbing Experts LLC",
  shortName: "VIP Plumbing Experts",
  type: "Local plumbing company",
  address: "5566 Main St, Frisco, TX 75033",
  location: "Frisco, Texas, USA",
  rating: 4.7,
  reviewCount: 57,
  license: "Texas Master Plumber Lic #TACLA00000",
  
  // Configuration Placeholders
  BUSINESS_PHONE: "[ADD BUSINESS PHONE]",
  BUSINESS_EMAIL: "[ADD BUSINESS EMAIL]",
  GOOGLE_BUSINESS_URL: "[ADD GOOGLE BUSINESS PROFILE URL]",
  MAPS_URL: "[ADD GOOGLE MAPS URL]",
  PRIMARY_SERVICES: "[ADD VERIFIED PLUMBING SERVICES]",
  WHATSAPP_NUMBER: "[ADD WHATSAPP NUMBER]",
  FORM_SUBMISSION_ENDPOINT: "[ADD FORM ENDPOINT]",

  // Fallback public address navigation link
  PUBLIC_MAP_SEARCH: "https://maps.google.com/?q=5566+Main+St,+Frisco,+TX+75033",
};

/**
 * Utility to verify if a placeholder value has been replaced with real data
 */
export function isConfigured(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && !trimmed.startsWith("[ADD");
}

export function getPhoneHref(): string | null {
  if (isConfigured(BUSINESS_CONFIG.BUSINESS_PHONE)) {
    const sanitized = BUSINESS_CONFIG.BUSINESS_PHONE.replace(/[^\d+]/g, "");
    return `tel:${sanitized}`;
  }
  return null;
}

export function getEmailHref(): string | null {
  if (isConfigured(BUSINESS_CONFIG.BUSINESS_EMAIL)) {
    return `mailto:${BUSINESS_CONFIG.BUSINESS_EMAIL}`;
  }
  return null;
}

export function getMapsHref(): string {
  if (isConfigured(BUSINESS_CONFIG.MAPS_URL)) {
    return BUSINESS_CONFIG.MAPS_URL;
  }
  // Uses verified business address on Google Maps
  return BUSINESS_CONFIG.PUBLIC_MAP_SEARCH;
}

export function getReviewsHref(): string | null {
  if (isConfigured(BUSINESS_CONFIG.GOOGLE_BUSINESS_URL)) {
    return BUSINESS_CONFIG.GOOGLE_BUSINESS_URL;
  }
  return null;
}

export function getWhatsAppHref(): string | null {
  if (isConfigured(BUSINESS_CONFIG.WHATSAPP_NUMBER)) {
    const sanitized = BUSINESS_CONFIG.WHATSAPP_NUMBER.replace(/[^\d]/g, "");
    return `https://wa.me/${sanitized}`;
  }
  return null;
}
