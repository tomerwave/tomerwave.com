export interface SignupAttribution {
  source: string;
  medium: string;
  campaign: string;
  landing: string;
  referrer: string;
  firstSeen: string;
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const referrerHost = (value: unknown) => {
  const referrer = clean(value, 500);
  if (!referrer) return "";
  try {
    return new URL(referrer).hostname.replace(/^www\./, "").slice(0, 160);
  } catch {
    return "";
  }
};

export const sanitizeSignupAttribution = (value: unknown): SignupAttribution => {
  const input = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    source: clean(input.source, 120),
    medium: clean(input.medium, 120),
    campaign: clean(input.campaign, 120),
    landing: clean(input.landing, 240),
    referrer: referrerHost(input.referrer),
    firstSeen: clean(input.firstSeen, 64),
  };
};

export const toContactProperties = (attribution: SignupAttribution) =>
  Object.fromEntries(
    Object.entries({
      signup_source: attribution.source,
      signup_medium: attribution.medium,
      signup_campaign: attribution.campaign,
      signup_landing: attribution.landing,
      signup_referrer: attribution.referrer,
      signup_first_seen: attribution.firstSeen,
    }).filter(([, value]) => value)
  );
