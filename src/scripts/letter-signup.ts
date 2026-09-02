import { track } from "@vercel/analytics";
import { sanitizeSignupAttribution } from "../utils/signup-attribution";
import { getAttribution, optedOutOfTracking } from "./attribution";
import { initBotProtection } from "./bot-protection";

const ENDPOINT = "/api/subscribe";

const MESSAGES = {
  pending: "One moment.",
  sent: "You are on the list. There is a note in your inbox, and the next letter is on its way.",
  invalid: "That address does not look right. Check it and try again.",
  failed: "That did not go through. Try again, or email me and I will add you by hand.",
};

let controller: AbortController | undefined;

const setStatus = (form: HTMLFormElement, message: string, failed: boolean) => {
  const status = form.querySelector<HTMLElement>("[data-signup-status]");
  if (!status) return;
  status.textContent = message;
  status.hidden = false;
  status.classList.toggle("letter-signup-status--failed", failed);
};

const signupFields = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  return { email: formData.get("email"), service: formData.get("service") };
};

const signupAttribution = () =>
  optedOutOfTracking() ? undefined : sanitizeSignupAttribution(getAttribution());

const postSignup = async (
  email: string,
  service: FormDataEntryValue | null,
  attribution: ReturnType<typeof signupAttribution>,
  signal: AbortSignal
) => {
  const response = await fetch(ENDPOINT, {
    body: JSON.stringify({ email, service, attribution }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    signal,
  });
  if (!response.ok) throw new Error(String(response.status));
};

const trackSignup = (
  service: FormDataEntryValue | null,
  attribution: NonNullable<ReturnType<typeof signupAttribution>> | undefined
) => {
  if (!attribution) return;
  track("newsletter_signup", {
    service: typeof service === "string" ? service : "",
    source: attribution.source,
    medium: attribution.medium,
    campaign: attribution.campaign,
    landing: attribution.landing,
    referrer: attribution.referrer,
    page: window.location.pathname,
  });
};

const submit = async (form: HTMLFormElement, signal: AbortSignal) => {
  const { email, service } = signupFields(form);
  if (typeof email !== "string" || !form.checkValidity()) {
    setStatus(form, MESSAGES.invalid, true);
    return;
  }

  setStatus(form, MESSAGES.pending, false);
  const attribution = signupAttribution();

  try {
    await postSignup(email, service, attribution, signal);
    trackSignup(service, attribution);
    setStatus(form, MESSAGES.sent, false);
    form.reset();
  } catch (error) {
    if (!signal.aborted) setStatus(form, MESSAGES.failed, true);
  }
};

export const initLetterSignup = () => {
  initBotProtection();
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;

  for (const form of document.querySelectorAll<HTMLFormElement>("[data-letter-signup]")) {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        void submit(form, signal);
      },
      { signal }
    );
  }
};
