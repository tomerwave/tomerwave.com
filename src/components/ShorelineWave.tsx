"use client";

import { useEffect, useRef } from "react";

/* =====================================================================
   ShorelineWave
   Aerial shoreline: long calm swells at the horizon that steepen, break
   into foam at the surf line, then wash out across the sand.

   Each line is a swell travelling shoreward. Roughness, brightness and
   fade are all functions of how far it has travelled, so a line
   naturally smooths at the horizon and shatters at the break. Lines
   recycle to the horizon on their own, which is what makes it loop
   without a visible seam.

     <section className="relative overflow-hidden">
       <ShorelineWave />
       <div className="relative z-10">…</div>
     </section>
   ===================================================================== */

export interface ShorelineColors {
  /** Warm band above the water. */
  sky: string;
  /** Water at the horizon. */
  seaLight: string;
  /** Water just before the break. The deepest, coolest tone. */
  seaDeep: string;
  /** Wet sand immediately past the surf. */
  sandWet: string;
  /** Dry sand at the bottom edge. */
  sandDry: string;
  /** Foam lines. Almost always white or near-white. */
  foam: string;
}

export interface ShorelineWaveProps {
  /** Six-stop vertical palette. Defaults to the pale sage and warm sand set. */
  colors?: Partial<ShorelineColors>;

  /** Where the water starts, 0 = top edge. */
  horizon?: number;
  /** Where the water breaks into sand, 0..1 down the canvas. */
  shoreline?: number;
  /** How far foam runs up the sand past the shoreline, in canvas fractions. */
  runup?: number;

  /** Swell count. Cost is linear. 110 reads dense, 40 reads graphic. */
  lines?: number;
  /** Base swell height as a fraction of canvas height, before roughness. */
  swell?: number;
  /** Master multiplier on how jagged the surf gets. 0 keeps every line smooth. */
  roughness?: number;
  /** How fast swells travel shoreward. One unit is roughly one full pass per 25s. */
  speed?: number;
  /** Master alpha on the foam lines. The gradient is unaffected. */
  opacity?: number;
  /** Soft halo around the brightest foam. Set 0 for crisp hairlines. */
  glow?: number;

  /** Hold the current frame. Prop changes still repaint. */
  paused?: boolean;
  /** Frame cap. Nothing here moves fast, so 30 is plenty. */
  fps?: number;
  /** Stop painting while scrolled out of view. */
  pauseWhenOffscreen?: boolean;
  /** Render one still frame when the OS asks for reduced motion. */
  respectReducedMotion?: boolean;

  /** Merged onto the canvas. Defaults to filling the positioned parent. */
  className?: string;
}

export const SHORELINE_PALETTES = {
  /** Sampled from the tomerwave hero: pale sage water, warm cream sand. */
  sage: {
    sky: "#FAF6EF",
    seaLight: "#EDECE4",
    seaDeep: "#D7DED2",
    sandWet: "#EBE5DB",
    sandDry: "#FBF6EF",
    foam: "#FFFFFF",
  },
  /** Cooler, closer to open Atlantic on an overcast day. */
  slate: {
    sky: "#F4F5F6",
    seaLight: "#DFE4E7",
    seaDeep: "#BCC7CD",
    sandWet: "#DDD9D2",
    sandDry: "#F2EFEA",
    foam: "#FFFFFF",
  },
  /** Inverted for dark sections. Foam reads as light on deep water. */
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

const TAU = Math.PI * 2;
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

/** Hermite ease between two edges. */
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "");
  const f =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(f, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Six octaves of sine. The top three only switch on as `rough` rises, so
 * the same function gives glassy swells offshore and shattered foam inshore.
 */
function crest(x: number, seed: number, rough: number, t: number) {
  const r2 = rough * rough;
  const r3 = r2 * rough;
  return (
    (Math.sin(x * 1.7 + seed * 3.1 + t * 0.3) * 1.0 +
      Math.sin(x * 3.3 - seed * 1.7 + t * 0.42) * 0.5 +
      Math.sin(x * 6.1 + seed * 5.3 - t * 0.55) * 0.26 * rough +
      Math.sin(x * 11.7 - seed * 2.9 + t * 0.8) * 0.14 * r2 +
      Math.sin(x * 23.3 + seed * 7.1 + t * 1.2) * 0.07 * r3 +
      Math.sin(x * 41.0 - seed * 4.3 - t * 1.7) * 0.035 * r3 * rough) /
    1.9
  );
}

export default function ShorelineWave(props: ShorelineWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cfg: Cfg = {
    ...DEFAULTS,
    ...stripUndefined(props),
    colors: { ...DEFAULTS.colors, ...props.colors },
  } as Cfg;

  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  // Bumped every render so a paused canvas still repaints on prop changes.
  const versionRef = useRef(0);
  versionRef.current++;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const still = reduced && cfgRef.current.respectReducedMotion;

    let w = 0,
      h = 0;
    let visible = true;
    let clock = still ? 12 : 0;
    let last = 0,
      bank = 0,
      painted = -1,
      raf = 0;

    const measure = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      painted = -1;
    };

    const paint = () => {
      const c = cfgRef.current;
      if (!w || !h) return;

      const shore = clamp(c.shoreline, 0.1, 0.99);
      const top = clamp(c.horizon, 0, shore - 0.05);
      const end = clamp(shore + c.runup, shore, 1.05);
      const foam = hexToRgb(c.colors.foam);

      /* ---- water and sand ---- */
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, c.colors.sky);
      g.addColorStop(clamp(top, 0.001, 0.99), c.colors.seaLight);
      g.addColorStop(clamp(top + (shore - top) * 0.55, 0.002, 0.99), c.colors.seaLight);
      g.addColorStop(clamp(shore - 0.02, 0.003, 0.99), c.colors.seaDeep);
      g.addColorStop(clamp(shore + 0.03, 0.004, 0.995), c.colors.sandWet);
      g.addColorStop(1, c.colors.sandDry);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      /* ---- swells ---- */
      const count = Math.max(4, Math.round(c.lines));
      const steps = Math.max(64, Math.round(w / 9));
      const travel = end - top;
      const drift = (clock * c.speed) / 25;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < count; i++) {
        // Deterministic per-line jitter, so no two swells share a shape.
        const seed = (i * 12.9898) % 6.2831;
        const jitter = ((Math.sin(i * 78.233) + 1) / 2) * 0.6 + 0.7;

        // Position cycles from horizon to runup, then recycles.
        const v = (i / count + drift) % 1;

        const rough = smoothstep(0.28, 0.92, v) * c.roughness;
        const fadeIn = smoothstep(0, 0.07, v);
        const surf = smoothstep(0.32, 0.87, v);
        const wash = 1 - smoothstep(0.87, 1, v);
        const alpha = c.opacity * fadeIn * wash * (0.09 + 0.8 * surf) * jitter * 0.55;
        if (alpha < 0.004) continue;

        // Swells compress toward the shore, the way they do in shallow water.
        const y0 = (top + travel * v ** 1.18) * h;
        const amp = c.swell * h * (0.12 + rough * 0.95) * jitter;
        const width = 0.6 + surf * 0.9;

        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const u = s / steps;
          const y = y0 + crest(u * TAU, seed, rough, clock + i * 0.37) * amp;
          s ? ctx.lineTo(u * w, y) : ctx.moveTo(u * w, y);
        }

        // Cheap halo: one wide soft pass under one crisp pass.
        if (c.glow > 0 && surf > 0.35) {
          ctx.strokeStyle = `rgba(${foam[0]},${foam[1]},${foam[2]},${(alpha * 0.16 * c.glow).toFixed(3)})`;
          ctx.lineWidth = width * 5;
          ctx.stroke();
        }
        ctx.strokeStyle = `rgba(${foam[0]},${foam[1]},${foam[2]},${clamp(alpha, 0, 1).toFixed(3)})`;
        ctx.lineWidth = width;
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const c = cfgRef.current;
      const dt = Math.min((now - last) / 1000 || 0, 0.1);
      last = now;

      const dirty = painted !== versionRef.current;
      const frozen = c.paused || still || (c.pauseWhenOffscreen && !visible);
      if (frozen && !dirty) return;
      if (!frozen) {
        clock += dt;
        bank += dt;
        if (bank < 1 / Math.max(1, c.fps) && !dirty) return;
        bank = 0;
      }
      if (c.pauseWhenOffscreen && !visible && !dirty) return;

      painted = versionRef.current;
      paint();
    };

    const ro = new ResizeObserver(measure);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      (e) => {
        visible = e[0].isIntersecting;
      },
      { rootMargin: "140px" }
    );
    io.observe(canvas);

    measure();
    paint();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    // biome-ignore lint/a11y/noAriaHiddenOnFocusable: a canvas is not focusable without a tabindex, and this one is purely decorative
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={props.className ?? "pointer-events-none absolute inset-0 block h-full w-full"}
    />
  );
}

function stripUndefined<T extends object>(o: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(o)) if (v !== undefined) out[k] = v;
  return out as Partial<T>;
}
