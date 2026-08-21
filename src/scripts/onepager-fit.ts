const MM_TO_PX = 96 / 25.4;
const PRINT_PAGE_WIDTH = 210 * MM_TO_PX;
const PRINT_PAGE_HEIGHT = 297 * MM_TO_PX;
const FIT_EPSILON = 6;
const WARN_SCALE = 0.94;
const ERROR_SCALE = 0.9;
const MEASURE_CLASS = "onepager--measure-print";

let controller: AbortController | undefined;

export interface OnePagerFitInput {
  contentHeight: number;
  contentWidth: number;
  epsilon?: number;
  pageHeight?: number;
  pageWidth?: number;
}

export interface OnePagerFitResult {
  fittedHeight: number;
  fittedWidth: number;
  overflow: "error" | "none" | "warn";
  scale: number;
}

const round = (value: number) => Number(value.toFixed(4));

export function computeOnePagerFit({
  contentHeight,
  contentWidth,
  epsilon = FIT_EPSILON,
  pageHeight = PRINT_PAGE_HEIGHT,
  pageWidth = PRINT_PAGE_WIDTH,
}: OnePagerFitInput): OnePagerFitResult {
  const safePageHeight = Math.max(1, pageHeight - epsilon);
  const safePageWidth = Math.max(1, pageWidth - epsilon);
  const scale = Math.min(1, safePageWidth / contentWidth, safePageHeight / contentHeight);

  let overflow: OnePagerFitResult["overflow"] = "none";
  if (scale < ERROR_SCALE) overflow = "error";
  else if (scale < WARN_SCALE) overflow = "warn";

  return {
    fittedHeight: round(contentHeight * scale),
    fittedWidth: round(contentWidth * scale),
    overflow,
    scale: round(scale),
  };
}

interface MeasureState {
  left: string;
  position: string;
  top: string;
  visibility: string;
}

const measureSheet = (
  root: HTMLElement,
  shell: HTMLElement,
  sheet: HTMLElement
): { height: number; width: number } => {
  const previous: MeasureState = {
    left: shell.style.left,
    position: shell.style.position,
    top: shell.style.top,
    visibility: shell.style.visibility,
  };

  root.classList.add(MEASURE_CLASS);
  shell.style.left = "-200vw";
  shell.style.position = "fixed";
  shell.style.top = "0";
  shell.style.visibility = "hidden";

  shell.style.setProperty("--onepager-fit-scale", "1");
  shell.style.setProperty("--onepager-shell-height", "auto");

  const rect = sheet.getBoundingClientRect();
  const width = Math.max(rect.width, sheet.scrollWidth);
  const height = Math.max(rect.height, sheet.scrollHeight);

  root.classList.remove(MEASURE_CLASS);
  shell.style.left = previous.left;
  shell.style.position = previous.position;
  shell.style.top = previous.top;
  shell.style.visibility = previous.visibility;

  return { height, width };
};

const applyFit = (root: HTMLElement, shell: HTMLElement, sheet: HTMLElement) => {
  const { height, width } = measureSheet(root, shell, sheet);
  const fit = computeOnePagerFit({ contentHeight: height, contentWidth: width });

  shell.dataset.fitScale = fit.scale.toFixed(4);
  shell.dataset.fitState = fit.overflow;
  shell.style.setProperty("--onepager-fit-scale", String(fit.scale));
  shell.style.setProperty("--onepager-shell-height", `${fit.fittedHeight}px`);
  root.dataset.fitReady = "true";
};

export function initOnePagerFit() {
  controller?.abort();

  const root = document.querySelector<HTMLElement>("[data-onepager-root]");
  const shell = document.querySelector<HTMLElement>("[data-onepager-shell]");
  const sheet = document.querySelector<HTMLElement>("[data-onepager-sheet]");
  if (!root || !shell || !sheet) return;

  controller = new AbortController();

  let queued = false;
  const queueFit = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(() => {
      queued = false;
      applyFit(root, shell, sheet);
    });
  };

  queueFit();

  if ("fonts" in document) document.fonts.ready.then(queueFit);
  window.addEventListener("beforeprint", queueFit, { signal: controller.signal });
  window.addEventListener("resize", queueFit, { passive: true, signal: controller.signal });

  document.querySelectorAll<HTMLImageElement>("[data-onepager-sheet] img").forEach((image) => {
    if (image.complete) return;
    image.addEventListener("load", queueFit, { once: true, signal: controller.signal });
    image.addEventListener("error", queueFit, { once: true, signal: controller.signal });
  });
}
