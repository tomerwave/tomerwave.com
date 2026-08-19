const CANVAS_SELECTOR = ".business-hero-canvas";
const CYCLE_MS = 16000;
const SETTLED_MS = CYCLE_MS / 2;

let controller: AbortController | undefined;
let frame = 0;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const readChannels = (probe: HTMLElement, token: string, fallback: string) => {
  probe.style.color = fallback;
  probe.style.color = `var(${token}, ${fallback})`;
  const parts = window.getComputedStyle(probe).color.match(/[\d.]+/g);
  return parts ? parts.slice(0, 3).join(", ") : "0, 0, 0";
};

const readPalette = (canvas: HTMLCanvasElement) => {
  const probe = document.createElement("span");
  probe.style.display = "none";
  canvas.parentElement?.append(probe);
  const sand = readChannels(probe, "--business-sand", "#b7ae9c");
  const sage = readChannels(probe, "--business-sage", "#8fa396");
  const ink = readChannels(probe, "--business-ink", "#2b3138");
  probe.remove();
  return {
    sand: (alpha: number) => `rgba(${sand}, ${alpha})`,
    sage: (alpha: number) => `rgba(${sage}, ${alpha})`,
    ink: (alpha: number) => `rgba(${ink}, ${alpha})`,
  };
};

const measure = (canvas: HTMLCanvasElement) => {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const bounds = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.round(bounds.width * ratio));
  canvas.height = Math.max(1, Math.round(bounds.height * ratio));
  const context = canvas.getContext("2d");
  context?.setTransform(ratio, 0, 0, ratio, 0, 0);

  const head = canvas.parentElement?.querySelector("h1")?.getBoundingClientRect();
  return {
    context,
    width: bounds.width,
    height: bounds.height,
    centreX: head ? head.left - bounds.left + head.width / 2 : bounds.width / 2,
    centreY: head ? head.top - bounds.top + head.height / 2 : bounds.height / 2,
    radius: Math.max((head?.width ?? bounds.width * 0.6) * 0.42, 150),
  };
};

const createStage = (canvas: HTMLCanvasElement) => {
  let view = measure(canvas);
  let palette = readPalette(canvas);

  const render = (elapsed: number) => {
    const { context, width, height, centreX, centreY, radius } = view;
    if (!context) return;

    context.clearRect(0, 0, width, height);
    const closeness = Math.sin(((elapsed % CYCLE_MS) / CYCLE_MS) * Math.PI) ** 3;
    const apart = radius * 0.62 * (1 - closeness);

    const half = (offset: number, from: number, to: number, colour: (alpha: number) => string) => {
      context.beginPath();
      context.arc(centreX + offset, centreY, radius, from, to);
      context.strokeStyle = colour(0.2 + closeness * 0.28);
      context.lineWidth = 1.2;
      context.stroke();
    };

    half(-apart, Math.PI * 0.5, Math.PI * 1.5, palette.sand);
    half(apart, Math.PI * 1.5, Math.PI * 2.5, palette.sage);

    if (closeness <= 0.7) return;
    context.beginPath();
    context.arc(centreX, centreY, radius, 0, Math.PI * 2);
    context.strokeStyle = palette.ink(((closeness - 0.7) / 0.3) * 0.28);
    context.lineWidth = 1;
    context.stroke();
  };

  const remeasure = () => {
    view = measure(canvas);
    palette = readPalette(canvas);
    if (prefersReducedMotion()) render(SETTLED_MS);
  };

  return { render, remeasure };
};

const animate = (
  canvas: HTMLCanvasElement,
  render: (elapsed: number) => void,
  signal: AbortSignal
) => {
  const started = performance.now();
  let running = false;

  const tick = (now: number) => {
    render(now - started);
    frame = window.requestAnimationFrame(tick);
  };

  const setRunning = (next: boolean) => {
    if (next === running) return;
    running = next;
    window.cancelAnimationFrame(frame);
    if (next) frame = window.requestAnimationFrame(tick);
  };

  setRunning(true);
  document.addEventListener("visibilitychange", () => setRunning(!document.hidden), { signal });

  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    ([entry]) => setRunning(entry.isIntersecting && !document.hidden),
    { threshold: 0 }
  );
  observer.observe(canvas);
  signal.addEventListener("abort", () => observer.disconnect());
};

const watchLayout = (remeasure: () => void, signal: AbortSignal) => {
  let resizeTimer = 0;
  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(remeasure, 160);
    },
    { passive: true, signal }
  );
  window.addEventListener("site-theme-change", remeasure, { signal });
};

export function initHeroHalves() {
  controller?.abort();
  window.cancelAnimationFrame(frame);

  const canvas = document.querySelector<HTMLCanvasElement>(CANVAS_SELECTOR);
  if (!canvas) return;

  controller = new AbortController();
  const stage = createStage(canvas);

  if (prefersReducedMotion()) stage.render(SETTLED_MS);
  else animate(canvas, stage.render, controller.signal);

  watchLayout(stage.remeasure, controller.signal);
}
