"use client";

import { useEffect, useState } from "react";
import ShorelineWave, { type ShorelineColors } from "@/components/ShorelineWave";

/* The shoreline that sits behind the hero copy, in place of the two ellipse
   halves that used to drift together and apart.

   ShorelineWave takes a fixed palette, so this wrapper exists to hand it the
   right one and swap it when the theme changes. The colours are the site
   palette: `sky` and `sandDry` are exactly --surface, which is what lets the
   canvas sit inside the hero without a visible edge at its top or bottom. */

const LIGHT: ShorelineColors = {
  sky: "#faf6ef", // --surface
  seaLight: "#eef0e9",
  seaDeep: "#dae1d6", // --sage, washed out
  sandWet: "#f7f1e7", // --surface-warm, pulled most of the way back to --surface
  sandDry: "#faf6ef", // --surface
  foam: "#ffffff",
};

const DARK: ShorelineColors = {
  sky: "#15181a", // --surface
  seaLight: "#1a1f21",
  seaDeep: "#232d2a", // --sage, sunk into the night surface
  sandWet: "#191d1f", // --surface-warm, pulled most of the way back to --surface
  sandDry: "#15181a", // --surface
  /* Light mode's foam sits only a few points of luminance above its water
     (#ffffff on #eef0e9), which is what keeps it barely-there. --sage against a
     near-black sea is a far bigger jump, so it shouted where light whispered.
     This is the same small step, measured from the dark water instead. */
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

    // toggle-theme.js fires this after it has written the attribute.
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
