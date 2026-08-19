import { track } from "@vercel/analytics";
import { getAttribution, optedOutOfTracking } from "./attribution";

const HANDOFF_TIMEOUT_MS = 400;

export function trackBookingIntent(bookingUrl: string) {
  const leave = () => window.location.replace(bookingUrl);

  if (optedOutOfTracking()) {
    leave();
    return;
  }

  const attribution = getAttribution();
  track("book_call_clicked", {
    source: attribution.source,
    medium: attribution.medium,
    campaign: attribution.campaign,
    landing: attribution.landing,
    referrer: attribution.referrer.slice(0, 200),
  });

  window.setTimeout(leave, HANDOFF_TIMEOUT_MS);
}
