import { track } from "@vercel/analytics";
import {
  type Attribution,
  captureFirstTouchAttribution,
  getAttribution,
  optedOutOfTracking,
} from "./attribution";

const EMAIL_SELECTOR = 'a[href^="mailto:"]';
const ARTICLE_SERVICE_SELECTOR = "[data-article-service-link]";
const ARTICLE_CONTACT_SELECTOR = "[data-article-contact-link]";

let controller: AbortController | undefined;

const context = (attribution: Attribution) => ({
  source: attribution.source,
  medium: attribution.medium,
  campaign: attribution.campaign,
  landing: attribution.landing,
  referrer: attribution.referrer.slice(0, 200),
  page: window.location.pathname,
});

const emit = (name: string, extra: Record<string, string> = {}) => {
  track(name, { ...context(getAttribution()), ...extra });
};

const closestMatch = (event: MouseEvent, selector: string) =>
  (event.target as Element | null)?.closest<HTMLElement>(selector) ?? null;

const CLICK_EVENTS: Array<[string, string, (node: HTMLElement) => Record<string, string>]> = [
  [EMAIL_SELECTOR, "email_clicked", () => ({})],
  [
    ARTICLE_SERVICE_SELECTOR,
    "article_to_service_clicked",
    (node) => ({ service: node.dataset.articleServiceLink ?? "" }),
  ],
  [ARTICLE_CONTACT_SELECTOR, "article_to_contact_clicked", () => ({})],
];

const handleClick = (event: MouseEvent) => {
  if (event.defaultPrevented) return;
  for (const [selector, name, details] of CLICK_EVENTS) {
    const node = closestMatch(event, selector);
    if (node) {
      emit(name, details(node));
      return;
    }
  }
};

const trackServiceView = () => {
  const service = document.querySelector<HTMLElement>("[data-service-slug]");
  if (!service) return;
  emit("service_viewed", { service: service.dataset.serviceSlug ?? "" });
};

export function initConversionEvents() {
  controller?.abort();
  if (optedOutOfTracking()) return;
  controller = new AbortController();

  captureFirstTouchAttribution();
  document.addEventListener("click", handleClick, { signal: controller.signal });
  trackServiceView();
}
