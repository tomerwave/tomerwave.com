"use client";

import { useEffect, useRef } from "react";

export interface ShorelineColors {
  sky: string;
  seaLight: string;
  seaDeep: string;
  sandWet: string;
  sandDry: string;
  foam: string;
}

export interface ShorelineWaveProps {
  colors?: Partial<ShorelineColors>;
  horizon?: number;
  shoreline?: number;
  runup?: number;
  lines?: number;
  swell?: number;
  roughness?: number;
  speed?: number;
  opacity?: number;
  glow?: number;
  paused?: boolean;
  fps?: number;
  pauseWhenOffscreen?: boolean;
  respectReducedMotion?: boolean;
  className?: string;
}

export const SHORELINE_PALETTES = {
  sage: {
    sky: "#FAF6EF",
    seaLight: "#EDECE4",
    seaDeep: "#D7DED2",
    sandWet: "#EBE5DB",
    sandDry: "#FBF6EF",
    foam: "#FFFFFF",
  },
  slate: {
    sky: "#F4F5F6",
    seaLight: "#DFE4E7",
    seaDeep: "#BCC7CD",
    sandWet: "#DDD9D2",
    sandDry: "#F2EFEA",
    foam: "#FFFFFF",
  },
  night: {
    sky: "#0B1116",
    seaLight: "#101A21",
    seaDeep: "#16252E",
    sandWet: "#101820",
    sandDry: "#0A0F13",
    foam: "#9FC4B4",
  },
} satisfies Record<string, ShorelineColors>;

const DEFAULTS = {
  colors: SHORELINE_PALETTES.sage,
  horizon: 0.06,
  shoreline: 0.82,
  runup: 0.16,
  lines: 110,
  swell: 0.035,
  roughness: 1,
  speed: 1,
  opacity: 1,
  glow: 1,
  paused: false,
  fps: 30,
  pauseWhenOffscreen: true,
  respectReducedMotion: true,
};

type Cfg = typeof DEFAULTS;

interface RenderState {
  width: number;
  height: number;
  visible: boolean;
  clock: number;
  last: number;
  bank: number;
  painted: number;
  raf: number;
}

interface ShorelineBounds {
  top: number;
  shore: number;
  end: number;
}

interface SwellLine {
  seed: number;
  rough: number;
  surf: number;
  alpha: number;
  y0: number;
  amp: number;
  width: number;
}

interface SwellBuildInput {
  cfg: Cfg;
  state: RenderState;
  bounds: ShorelineBounds;
  index: number;
  count: number;
  drift: number;
}

interface SwellTraceInput {
  ctx: CanvasRenderingContext2D;
  width: number;
  steps: number;
  line: SwellLine;
  index: number;
  clock: number;
}

interface SwellDrawInput {
  ctx: CanvasRenderingContext2D;
  state: RenderState;
  cfg: Cfg;
  bounds: ShorelineBounds;
  foam: [number, number, number];
}

interface FrameInput {
  state: RenderState;
  cfg: Cfg;
  still: boolean;
  version: number;
  now: number;
}

interface LoopInput {
  state: RenderState;
  cfgRef: { current: Cfg };
  versionRef: { current: number };
  still: boolean;
  paint: () => void;
}

interface BackdropInput {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  colors: ShorelineColors;
  bounds: ShorelineBounds;
}

const TAU = Math.PI * 2;

const clamp = (value: number, minimum: number, maximum: number) =>
  value < minimum ? minimum : value > maximum ? maximum : value;

const rgba = (rgb: [number, number, number], alpha: number) =>
  `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha.toFixed(3)})`;

function smoothstep(edge0: number, edge1: number, value: number) {
  const progress = clamp((value - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return progress * progress * (3 - 2 * progress);
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.trim().replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((segment) => segment + segment)
          .join("")
      : normalized;
  const parsed = parseInt(expanded, 16);
  return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255];
}

function crest(x: number, seed: number, rough: number, time: number) {
  const roughSquared = rough * rough;
  const roughCubed = roughSquared * rough;
  return (
    (Math.sin(x * 1.7 + seed * 3.1 + time * 0.3) * 1.0 +
      Math.sin(x * 3.3 - seed * 1.7 + time * 0.42) * 0.5 +
      Math.sin(x * 6.1 + seed * 5.3 - time * 0.55) * 0.26 * rough +
      Math.sin(x * 11.7 - seed * 2.9 + time * 0.8) * 0.14 * roughSquared +
      Math.sin(x * 23.3 + seed * 7.1 + time * 1.2) * 0.07 * roughCubed +
      Math.sin(x * 41.0 - seed * 4.3 - time * 1.7) * 0.035 * roughCubed * rough) /
    1.9
  );
}

function resolveConfig(props: ShorelineWaveProps): Cfg {
  return {
    ...DEFAULTS,
    ...stripUndefined(props),
    colors: { ...DEFAULTS.colors, ...props.colors },
  } as Cfg;
}

function createRenderState(still: boolean): RenderState {
  return {
    width: 0,
    height: 0,
    visible: true,
    clock: still ? 12 : 0,
    last: 0,
    bank: 0,
    painted: -1,
    raf: 0,
  };
}

function getBounds(cfg: Cfg): ShorelineBounds {
  const shore = clamp(cfg.shoreline, 0.1, 0.99);
  const top = clamp(cfg.horizon, 0, shore - 0.05);
  return {
    top,
    shore,
    end: clamp(shore + cfg.runup, shore, 1.05),
  };
}

function measureCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: RenderState
) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = rect.width;
  state.height = rect.height;
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  state.painted = -1;
}

function fillBackdrop({ ctx, width, height, colors, bounds }: BackdropInput) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, colors.sky);
  gradient.addColorStop(clamp(bounds.top, 0.001, 0.99), colors.seaLight);
  gradient.addColorStop(
    clamp(bounds.top + (bounds.shore - bounds.top) * 0.55, 0.002, 0.99),
    colors.seaLight
  );
  gradient.addColorStop(clamp(bounds.shore - 0.02, 0.003, 0.99), colors.seaDeep);
  gradient.addColorStop(clamp(bounds.shore + 0.03, 0.004, 0.995), colors.sandWet);
  gradient.addColorStop(1, colors.sandDry);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function buildSwellLine({ cfg, state, bounds, index, count, drift }: SwellBuildInput) {
  const seed = (index * 12.9898) % 6.2831;
  const jitter = ((Math.sin(index * 78.233) + 1) / 2) * 0.6 + 0.7;
  const v = (index / count + drift) % 1;
  const rough = smoothstep(0.28, 0.92, v) * cfg.roughness;
  const fadeIn = smoothstep(0, 0.07, v);
  const surf = smoothstep(0.32, 0.87, v);
  const wash = 1 - smoothstep(0.87, 1, v);
  const alpha = cfg.opacity * fadeIn * wash * (0.09 + 0.8 * surf) * jitter * 0.55;
  if (alpha < 0.004) return null;
  return {
    seed,
    rough,
    surf,
    alpha,
    y0: (bounds.top + (bounds.end - bounds.top) * v ** 1.18) * state.height,
    amp: cfg.swell * state.height * (0.12 + rough * 0.95) * jitter,
    width: 0.6 + surf * 0.9,
  } satisfies SwellLine;
}

function traceSwellPath({ ctx, width, steps, line, index, clock }: SwellTraceInput) {
  ctx.beginPath();
  for (let step = 0; step <= steps; step++) {
    const progress = step / steps;
    const y =
      line.y0 + crest(progress * TAU, line.seed, line.rough, clock + index * 0.37) * line.amp;
    if (step === 0) ctx.moveTo(progress * width, y);
    else ctx.lineTo(progress * width, y);
  }
}

function strokeSwell(
  ctx: CanvasRenderingContext2D,
  foam: [number, number, number],
  glow: number,
  line: SwellLine
) {
  if (glow > 0 && line.surf > 0.35) {
    ctx.strokeStyle = rgba(foam, line.alpha * 0.16 * glow);
    ctx.lineWidth = line.width * 5;
    ctx.stroke();
  }
  ctx.strokeStyle = rgba(foam, clamp(line.alpha, 0, 1));
  ctx.lineWidth = line.width;
  ctx.stroke();
}

function drawSwells({ ctx, state, cfg, bounds, foam }: SwellDrawInput) {
  const count = Math.max(4, Math.round(cfg.lines));
  const steps = Math.max(64, Math.round(state.width / 9));
  const drift = (state.clock * cfg.speed) / 25;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let index = 0; index < count; index++) {
    const line = buildSwellLine({ cfg, state, bounds, index, count, drift });
    if (!line) continue;
    traceSwellPath({ ctx, width: state.width, steps, line, index, clock: state.clock });
    strokeSwell(ctx, foam, cfg.glow, line);
  }
}

function paintScene(ctx: CanvasRenderingContext2D, state: RenderState, cfg: Cfg) {
  if (!state.width || !state.height) return;
  const bounds = getBounds(cfg);
  fillBackdrop({ ctx, width: state.width, height: state.height, colors: cfg.colors, bounds });
  drawSwells({ ctx, state, cfg, bounds, foam: hexToRgb(cfg.colors.foam) });
}

function readDelta(state: RenderState, now: number) {
  const delta = Math.min((now - state.last) / 1000 || 0, 0.1);
  state.last = now;
  return delta;
}

function shouldFreeze(cfg: Cfg, still: boolean, visible: boolean) {
  return cfg.paused || still || (cfg.pauseWhenOffscreen && !visible);
}

function advanceFrame({ state, cfg, still, version, now }: FrameInput) {
  const dirty = state.painted !== version;
  const delta = readDelta(state, now);
  if (shouldFreeze(cfg, still, state.visible)) return dirty;
  state.clock += delta;
  state.bank += delta;
  if (state.bank < 1 / Math.max(1, cfg.fps) && !dirty) return false;
  state.bank = 0;
  return true;
}

function observeCanvas(canvas: HTMLCanvasElement, measure: () => void, state: RenderState) {
  const resizeObserver = new ResizeObserver(measure);
  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      state.visible = entry?.isIntersecting ?? true;
    },
    { rootMargin: "140px" }
  );

  resizeObserver.observe(canvas);
  intersectionObserver.observe(canvas);

  return () => {
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
  };
}

function createLoop({ state, cfgRef, versionRef, still, paint }: LoopInput) {
  const loop = (now: number) => {
    state.raf = requestAnimationFrame(loop);
    const ready = advanceFrame({
      state,
      cfg: cfgRef.current,
      still,
      version: versionRef.current,
      now,
    });
    if (!ready) return;
    state.painted = versionRef.current;
    paint();
  };
  return loop;
}

function mountShoreline(
  canvas: HTMLCanvasElement,
  cfgRef: { current: Cfg },
  versionRef: { current: number }
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const reduced =
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const still = reduced && cfgRef.current.respectReducedMotion;
  const state = createRenderState(still);
  const measure = () => measureCanvas(canvas, ctx, state);
  const paint = () => paintScene(ctx, state, cfgRef.current);
  const stopObserving = observeCanvas(canvas, measure, state);
  const loop = createLoop({ state, cfgRef, versionRef, still, paint });

  measure();
  paint();
  state.raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(state.raf);
    stopObserving();
  };
}

export default function ShorelineWave(props: ShorelineWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cfg = resolveConfig(props);
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  const versionRef = useRef(0);
  versionRef.current += 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return mountShoreline(canvas, cfgRef, versionRef);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className={props.className ?? "pointer-events-none absolute inset-0 block h-full w-full"}
    />
  );
}

function stripUndefined<T extends object>(value: T): Partial<T> {
  const output: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    if (item !== undefined) output[key] = item;
  }
  return output as Partial<T>;
}
