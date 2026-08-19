const TOP_PERCENT = 8;
const TRAVEL_PERCENT = 84;
const ACTIVE_LINE = 0.42;

let controller: AbortController | undefined;

interface Pitch {
  piece: HTMLAnchorElement;
  section: HTMLElement;
  offset: number;
}

interface Layout {
  travel: number;
  documentHeight: number;
  viewport: number;
}

const collectPitches = (route: HTMLElement): Pitch[] =>
  [...route.querySelectorAll<HTMLAnchorElement>("[data-route-piece]")]
    .map((piece) => {
      const section = document.getElementById(piece.dataset.routePiece ?? "");
      return section ? { piece, section, offset: 0 } : null;
    })
    .filter((pitch): pitch is Pitch => pitch !== null);

const remeasure = (pitches: Pitch[]): Layout => {
  const documentHeight = document.documentElement.scrollHeight;
  const viewport = window.innerHeight;
  const travel = Math.max(1, documentHeight - viewport);

  pitches.forEach((pitch) => {
    pitch.offset = pitch.section.offsetTop;
    const at = Math.min(1, Math.max(0, (pitch.offset - viewport * 0.3) / travel));
    pitch.piece.style.top = `${TOP_PERCENT + at * TRAVEL_PERCENT}%`;
  });

  return { travel, documentHeight, viewport };
};

const activeIndex = (pitches: Pitch[], layout: Layout, scrollY: number) => {
  if (scrollY + layout.viewport >= layout.documentHeight - 2) return pitches.length - 1;
  const line = scrollY + layout.viewport * ACTIVE_LINE;
  let index = 0;
  pitches.forEach((pitch, at) => {
    if (pitch.offset <= line) index = at;
  });
  return index;
};

const markCurrent = (pitches: Pitch[], index: number) => {
  pitches.forEach(({ piece }, at) => {
    piece.toggleAttribute("data-passed", at < index);
    piece.toggleAttribute("data-current", at === index);
    if (at === index) piece.setAttribute("aria-current", "true");
    else piece.removeAttribute("aria-current");
  });
};

const createPainter = (pitches: Pitch[], climber: HTMLElement) => {
  let layout = remeasure(pitches);
  let lastIndex = -1;
  let lastTop = "";
  let queued = false;

  const write = () => {
    queued = false;
    const scrollY = window.scrollY;
    const progress = Math.min(1, Math.max(0, scrollY / layout.travel));
    const offset = ((TOP_PERCENT + progress * TRAVEL_PERCENT) / 100) * layout.viewport;
    const transform = `translate(-50%, -50%) translateY(${offset.toFixed(1)}px)`;
    if (transform !== lastTop) {
      climber.style.transform = transform;
      lastTop = transform;
    }
    const index = activeIndex(pitches, layout, scrollY);
    if (index === lastIndex) return;
    lastIndex = index;
    markCurrent(pitches, index);
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(write);
  };

  const refresh = () => {
    layout = remeasure(pitches);
    lastIndex = -1;
    lastTop = "";
    schedule();
  };

  return { schedule, refresh };
};

const watchLayout = (refresh: () => void, signal: AbortSignal) => {
  let timer = 0;
  const scheduleRefresh = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(refresh, 160);
  };

  window.addEventListener("resize", scheduleRefresh, { passive: true, signal });

  if (!("ResizeObserver" in window)) return;
  const observer = new ResizeObserver(scheduleRefresh);
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
  const painter = createPainter(pitches, climber);

  painter.schedule();
  window.addEventListener("scroll", painter.schedule, { passive: true, signal: controller.signal });
  watchLayout(painter.refresh, controller.signal);
}
