import assert from "node:assert/strict";
import test from "node:test";

type Listener = (event: any) => void;

const setupBrowser = () => {
  const listeners = new Map<string, Listener>();
  const tracked: Array<[string, any]> = [];
  const storage = new Map<string, string>();

  const windowMock = {
    navigator: { doNotTrack: "0", globalPrivacyControl: false },
    location: {
      host: "tomerwave.com",
      pathname: "/services/ai-automation",
      search: "",
    },
    sessionStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    },
    va: (command: string, payload: any) => tracked.push([command, payload]),
    setTimeout,
    clearTimeout,
    addEventListener: () => undefined,
    innerHeight: 900,
    scrollY: 0,
  };

  const documentMock = {
    referrer: "",
    visibilityState: "visible",
    querySelector: () => null,
    addEventListener: (type: string, listener: Listener) => listeners.set(type, listener),
  };

  Object.assign(globalThis, { window: windowMock, document: documentMock });
  return { listeners, tracked };
};

const onePagerNode = () => {
  const node: any = {
    dataset: {},
    getAttribute: (name: string) =>
      name === "href" ? "/one-pagers/ai-automation.pdf" : null,
    closest: (selector: string) => {
      if (selector.includes("/one-pagers/") || selector === ".service-offer") return node;
      return null;
    },
  };
  return node;
};

test("tracks a one-pager on pointerdown before a new tab can open", async () => {
  const { listeners, tracked } = setupBrowser();
  const { initConversionEvents } = await import("../src/scripts/conversion-events.ts");
  initConversionEvents();

  const pointerdown = listeners.get("pointerdown");
  assert.ok(pointerdown, "expected one-pager pointerdown tracking to be registered");
  pointerdown({ target: onePagerNode(), button: 0 });

  assert.equal(tracked.at(-1)?.[1]?.name, "one_pager_opened");
  assert.deepEqual(tracked.at(-1)?.[1]?.data, {
    source: "direct",
    medium: "",
    campaign: "",
    landing: "/services/ai-automation",
    referrer: "",
    page: "/services/ai-automation",
    service: "ai-automation",
    placement: "service_offer",
  });
});

test("tracks keyboard activation with Enter", async () => {
  const { listeners, tracked } = setupBrowser();
  const { initConversionEvents } = await import("../src/scripts/conversion-events.ts");
  initConversionEvents();

  const keydown = listeners.get("keydown");
  assert.ok(keydown, "expected one-pager keyboard tracking to be registered");
  keydown({ target: onePagerNode(), key: "Enter" });

  assert.equal(tracked.at(-1)?.[1]?.name, "one_pager_opened");
});
