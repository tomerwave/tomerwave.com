import { BOOKING_URL, NOW, WHY } from "@/config";

/* An easter egg for whoever opens devtools. The audience for this site is
   technical leadership, so a fair number of them will, and the console is the
   one surface where a plain string is the whole design.

   `window.tomer` is a real object with three methods. Each returns a string
   rather than logging one, so the console echoes it the way it echoes any other
   expression — no console noise, and the return value is usable. */

interface Tomer {
  now: () => string;
  why: () => string;
  hire: () => string;
}

declare global {
  interface Window {
    tomer?: Tomer;
  }
}

/* A T sitting over a wave: the mark, as close as monospace gets to it. */
const MARK = ["  ──────┬──────", "        │", "  ╲╱‾╲__╱‾╲__╱‾╲"].join("\n");

/* The ClientRouter keeps this module alive across navigations, so module scope
   is what stops the greeting reprinting on every page view. */
let greeted = false;

export function initConsoleEgg() {
  if (greeted) return;
  greeted = true;

  window.tomer = {
    now: () => NOW,
    why: () => WHY,
    hire: () => {
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
      return "Opening the calendar. Bring the decision you have been postponing.";
    },
  };

  const ink = "color: #8fa396; font-weight: 600";
  const quiet = "color: #8fa396";

  console.log(`%c${MARK}`, quiet);
  console.log(
    "%cThere is a `tomer` object on window.%c\n  tomer.now()   what I am doing this month\n  tomer.why()   why this site exists\n  tomer.hire()  opens the calendar",
    ink,
    "color: inherit"
  );
}
