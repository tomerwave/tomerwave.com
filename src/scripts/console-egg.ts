import { BOOKING_URL, NOW, WHY } from "@/config";

interface Tomer {
  now: () => string;
  why: () => string;
  hire: () => string;
  help: () => string;
}

declare global {
  interface Window {
    tomer?: Tomer;
  }
}

const MARK = ["  ──────┬──────", "        │", "  ╲╱‾╲__╱‾╲__╱‾╲"].join("\n");
let greeted = false;

const TOMER_HELP = [
  MARK,
  "",
  "There is a `tomer` object on window.",
  "  tomer.now()   what I am doing this month",
  "  tomer.why()   why this site exists",
  "  tomer.hire()  opens the calendar",
].join("\n");

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
    help: () => TOMER_HELP,
  };
}
