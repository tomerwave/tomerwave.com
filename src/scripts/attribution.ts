const STORAGE_KEY = "tomerwave:attribution";

export const optedOutOfTracking = () =>
  window.navigator.doNotTrack === "1" ||
  (window.navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl ===
    true;

const UTM_KEYS = ["source", "medium", "campaign", "content", "term"] as const;

export interface Attribution {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  referrer: string;
  landing: string;
  firstSeen: string;
}

const EMPTY: Attribution = {
  source: "",
  medium: "",
  campaign: "",
  content: "",
  term: "",
  referrer: "",
  landing: "",
  firstSeen: "",
};

const readStore = (): Attribution | null => {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
};

const writeStore = (attribution: Attribution) => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    return;
  }
};

const externalReferrer = () => {
  const { referrer } = document;
  if (!referrer) return "";
  try {
    return new URL(referrer).host === window.location.host ? "" : referrer;
  } catch {
    return "";
  }
};

const inferredSource = (referrer: string) => {
  if (!referrer) return "direct";
  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "referral";
  }
};

export function captureFirstTouchAttribution(): Attribution {
  const existing = readStore();
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const referrer = externalReferrer();
  const utm = Object.fromEntries(
    UTM_KEYS.map((key) => [key, params.get(`utm_${key}`)?.slice(0, 120) ?? ""])
  ) as Record<(typeof UTM_KEYS)[number], string>;

  const attribution: Attribution = {
    ...utm,
    source: utm.source || inferredSource(referrer),
    referrer,
    landing: window.location.pathname,
    firstSeen: new Date().toISOString(),
  };

  writeStore(attribution);
  return attribution;
}

export function getAttribution(): Attribution {
  return readStore() ?? captureFirstTouchAttribution();
}

export function attributionParams(): URLSearchParams {
  const attribution = getAttribution();
  const params = new URLSearchParams();
  if (attribution.source) params.set("utm_source", attribution.source);
  if (attribution.medium) params.set("utm_medium", attribution.medium);
  if (attribution.campaign) params.set("utm_campaign", attribution.campaign);
  if (attribution.landing) params.set("landing", attribution.landing);
  return params;
}
