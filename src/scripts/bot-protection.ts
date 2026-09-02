import { initBotId } from "botid/client/core";

let initialized = false;

export const initBotProtection = () => {
  if (initialized) return;
  initialized = true;

  initBotId({
    protect: [
      {
        path: "/api/subscribe",
        method: "POST",
        advancedOptions: { checkLevel: "basic" },
      },
    ],
  });
};
