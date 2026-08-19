const TOP_PERCENT = 8;
const TRAVEL_PERCENT = 84;
const ACTIVE_LINE = 0.42;

let controller: AbortController | undefined;

interface Pitch {
  piece: HTMLAnchorElement;
  section: HTMLElement;
}

const scrollableHeight = () =>
  Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

const positionPieces = (pitches: Pitch[]) => {
  const travel = scrollableHeight();
  pitches.forEach(({ piece, section }) => {
    const at = (section.offsetTop - window.innerHeight * 0.3) / travel;
    const clamped = Math.min(1, Math.max(0, at));
    piece.style.top = `${TOP_PERCENT + clamped * TRAVEL_PERCENT}%`;
  });
};

const atBottom = () =>
  window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

const currentIndex = (pitches: Pitch[]) => {
  if (atBottom()) return pitches.length - 1;
  let index = 0;
  pitches.forEach(({ section }, at) => {
    if (section.getBoundingClientRect().top <= window.innerHeight * ACTIVE_LINE) index = at;
  });
  return index;
};

const paint = (pitches: Pitch[], climber: HTMLElement) => {
  const progress = Math.min(1, Math.max(0, window.scrollY / scrollableHeight()));
  climber.style.top = `${TOP_PERCENT + progress * TRAVEL_PERCENT}%`;

  const active = currentIndex(pitches);
  pitches.forEach(({ piece }, index) => {
    piece.toggleAttribute("data-passed", index < active);
    piece.toggleAttribute("data-current", index === active);
    if (index === active) piece.setAttribute("aria-current", "true");
    else piece.removeAttribute("aria-current");
  });
};

const collectPitches = (route: HTMLElement): Pitch[] =>
  [...route.querySelectorAll<HTMLAnchorElement>("[data-route-piece]")]
    .map((piece) => {
      const section = document.getElementById(piece.dataset.routePiece ?? "");
      return section ? { piece, section } : null;
    })
    .filter((pitch): pitch is Pitch => pitch !== null);

const watchLayout = (refresh: () => void, repaint: () => void, signal: AbortSignal) => {
  window.addEventListener("scroll", repaint, { passive: true, signal });

  let resizeTimer = 0;
  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 160);
    },
    { passive: true, signal }
  );

  if (!("ResizeObserver" in window)) return;
  const observer = new ResizeObserver(refresh);
  observer.observe(document.body);
  signal.addEventListener("abort", () => observer.disconnect());
};

export function initSectionRoute() {
  controller?.abort();

  const route = document.querySelector<HTMLElement>("[data-route]");
  const climber = document.querySelector<HTMLElement>("[data-route-climber]");
  if (!route || !climber) return;

  const pitches = collectPitches(route);
  if (pitches.length < 2) {
    route.remove();
    return;
  }

  controller = new AbortController();
  const repaint = () => paint(pitches, climber);
  const refresh = () => {
    positionPieces(pitches);
    repaint();
  };

  refresh();
  watchLayout(refresh, repaint, controller.signal);
}
