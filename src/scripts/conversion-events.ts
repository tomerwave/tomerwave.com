import { track } from "@vercel/analytics";
import { ARTICLE_ENGAGED_MS, hasReachedDeepRead } from "../utils/article-engagement";
import {
  type Attribution,
  captureFirstTouchAttribution,
  getAttribution,
  optedOutOfTracking,
} from "./attribution";

const BOOK_CALL_SELECTOR = 'a[href^="/meet"]';
const ONE_PAGER_SELECTOR = 'a[href^="/one-pagers/"][href$=".pdf"]';
const EMAIL_SELECTOR = 'a[href^="mailto:"]';
const ARTICLE_SERVICE_SELECTOR = '.blog-prose a[href^="/services/"]';

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

const closestMatch = (event: Event, selector: string) =>
  (event.target as Element | null)?.closest<HTMLElement>(selector) ?? null;

const bookCallPlacement = (node: HTMLElement) => {
  if (node.dataset.placement) return node.dataset.placement;
  if (node.closest("#service-top")) return "service_hero";
  if (node.closest(".service-offer")) return "service_offer";
  if (node.closest("#article")) return "article";
  return "unknown";
};

const onePagerDetails = (node: HTMLElement) => {
  const href = node.getAttribute("href") ?? "";
  const file = href.split("/").pop() ?? "";
  const service = file.replace(/\.pdf$/, "");
  const placement =
    node.dataset.placement ?? (node.closest(".service-offer") ? "service_offer" : "unknown");
  return { service, placement };
};

const trackOnePager = (event: Event) => {
  const node = closestMatch(event, ONE_PAGER_SELECTOR);
  if (node) emit("one_pager_opened", onePagerDetails(node));
};

const handleOnePagerPointer = (event: PointerEvent) => {
  if (event.button !== 0 && event.button !== 1) return;
  trackOnePager(event);
};

const handleOnePagerKeydown = (event: KeyboardEvent) => {
  if (event.key !== "Enter" || event.repeat) return;
  trackOnePager(event);
};

const CLICK_EVENTS: Array<[string, string, (node: HTMLElement) => Record<string, string>]> = [
  [BOOK_CALL_SELECTOR, "book_call_clicked", (node) => ({ placement: bookCallPlacement(node) })],
  [EMAIL_SELECTOR, "email_clicked", () => ({})],
  [
    ARTICLE_SERVICE_SELECTOR,
    "article_to_service_clicked",
    (node) => ({ service: node.getAttribute("href")?.split("/").pop() ?? "" }),
  ],
];

const handleClick = (event: MouseEvent) => {
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

const scheduleArticleEngaged = (signal: AbortSignal) => {
  const timer = window.setTimeout(() => {
    if (document.visibilityState === "visible") emit("article_engaged");
  }, ARTICLE_ENGAGED_MS);
  signal.addEventListener("abort", () => window.clearTimeout(timer), { once: true });
};

const deepReadInput = (article: HTMLElement) => ({
  articleTop: window.scrollY + article.getBoundingClientRect().top,
  articleHeight: article.scrollHeight,
  viewportBottom: window.scrollY + window.innerHeight,
});

const listenForDeepRead = (article: HTMLElement, signal: AbortSignal) => {
  let sent = false;
  const check = () => {
    if (sent || !hasReachedDeepRead(deepReadInput(article))) return;
    sent = true;
    emit("article_deep_read");
  };

  window.addEventListener("scroll", check, { passive: true, signal });
  window.addEventListener("resize", check, { signal });
  check();
};

const trackArticleEngagement = () => {
  const article = document.querySelector<HTMLElement>("#article");
  const signal = controller?.signal;
  if (!article || !signal) return;
  scheduleArticleEngaged(signal);
  listenForDeepRead(article, signal);
};

export function initConversionEvents() {
  controller?.abort();
  if (optedOutOfTracking()) return;
  controller = new AbortController();

  captureFirstTouchAttribution();
  document.addEventListener("click", handleClick, { signal: controller.signal });
  document.addEventListener("pointerdown", handleOnePagerPointer, { signal: controller.signal });
  document.addEventListener("keydown", handleOnePagerKeydown, { signal: controller.signal });
  trackServiceView();
  trackArticleEngagement();
}
