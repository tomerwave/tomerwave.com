const HEADER_SELECTOR = "#site-bar";
const BREATHING_ROOM_PX = 24;
const PINNED_POSITIONS = ["sticky", "fixed"];

let controller: AbortController | undefined;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scrollBehaviour = (animate: boolean): ScrollBehavior =>
  animate && !prefersReducedMotion() ? "smooth" : "auto";

const pinnedHeaderHeight = () => {
  const header = document.querySelector<HTMLElement>(HEADER_SELECTOR);
  if (!header) return 0;
  const { position } = window.getComputedStyle(header);
  return PINNED_POSITIONS.includes(position) ? header.getBoundingClientRect().height : 0;
};

const syncScrollPaddingToHeader = () => {
  document.documentElement.style.scrollPaddingTop = `${pinnedHeaderHeight() + BREATHING_ROOM_PX}px`;
};

const targetForHash = (hash: string) => {
  const id = decodeURIComponent(hash.slice(1));
  if (!id) return null;
  return (
    document.getElementById(id) ?? document.querySelector<HTMLElement>(`[name="${CSS.escape(id)}"]`)
  );
};

const scrollToTarget = (target: HTMLElement, animate: boolean) => {
  target.scrollIntoView({ behavior: scrollBehaviour(animate), block: "start" });
};

const moveFocusWithoutScrolling = (target: HTMLElement) => {
  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
  }
  target.focus({ preventScroll: true });
};

const modifierHeld = (event: MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

const opensInThisTab = (event: MouseEvent) =>
  !event.defaultPrevented && event.button === 0 && !modifierHeld(event);

const anchorFromEvent = (event: MouseEvent) => {
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
  if (!link) return null;
  return link.target === "_blank" || link.hasAttribute("download") ? null : link;
};

const addressesThisDocument = (url: URL) =>
  url.origin === window.location.origin &&
  url.pathname.replace(/\/$/, "") === window.location.pathname.replace(/\/$/, "") &&
  url.search === window.location.search;

const sameDocumentHash = (link: HTMLAnchorElement) => {
  const href = link.getAttribute("href");
  if (!href) return null;
  try {
    const url = new URL(href, window.location.href);
    return url.hash && addressesThisDocument(url) ? url.hash : null;
  } catch {
    return null;
  }
};

const resolveClick = (event: MouseEvent) => {
  if (!opensInThisTab(event)) return null;
  const link = anchorFromEvent(event);
  if (!link) return null;
  const hash = sameDocumentHash(link);
  return hash ? { hash, target: targetForHash(hash) } : null;
};

const handleClick = (event: MouseEvent) => {
  const resolved = resolveClick(event);
  if (!resolved?.target) return;

  event.preventDefault();
  scrollToTarget(resolved.target, true);
  moveFocusWithoutScrolling(resolved.target);

  if (window.location.hash !== resolved.hash) {
    window.history.pushState(null, "", resolved.hash);
  }
};

const scrollToCurrentHash = (animate: boolean) => {
  const target = window.location.hash ? targetForHash(window.location.hash) : null;
  if (target) scrollToTarget(target, animate);
};

const handlePopState = () => scrollToCurrentHash(true);

export function initAnchorScroll() {
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;

  syncScrollPaddingToHeader();
  document.addEventListener("click", handleClick, { signal });
  window.addEventListener("popstate", handlePopState, { signal });
  window.addEventListener("resize", syncScrollPaddingToHeader, { passive: true, signal });
  requestAnimationFrame(() => scrollToCurrentHash(false));
}
