"use client";

import { useEffect, useState } from "react";
import ShorelineWave, { type ShorelineColors } from "@/components/ShorelineWave";

const LIGHT_SURFACE = "#faf6ef";
const DARK_SURFACE = "#15181a";

const LIGHT: ShorelineColors = {
  sky: LIGHT_SURFACE,
  seaLight: "#eef0e9",
  seaDeep: "#dae1d6",
  sandWet: "#f7f1e7",
  sandDry: LIGHT_SURFACE,
  foam: "#ffffff",
};

const DARK: ShorelineColors = {
  sky: DARK_SURFACE,
  seaLight: "#1a1f21",
  seaDeep: "#232d2a",
  sandWet: "#191d1f",
  sandDry: DARK_SURFACE,
  foam: "#2c3733",
};

const readTheme = () =>
  document.documentElement.dataset.theme === "dark" ||
  (!document.documentElement.dataset.theme &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);

export default function HeroShoreline() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(readTheme());
    sync();

    window.addEventListener("site-theme-change", sync);
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    system.addEventListener("change", sync);

    return () => {
      window.removeEventListener("site-theme-change", sync);
      system.removeEventListener("change", sync);
    };
  }, []);

  return (
    <ShorelineWave
      colors={dark ? DARK : LIGHT}
      horizon={0.04}
      shoreline={0.66}
      runup={0.4}
      lines={90}
      swell={0.035}
      speed={0.85}
      opacity={0.75}
      glow={0.8}
    />
  );
}
