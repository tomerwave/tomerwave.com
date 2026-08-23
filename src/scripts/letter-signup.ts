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

const submit = async (form: HTMLFormElement, signal: AbortSignal) => {
  const email = new FormData(form).get("email");
  const service = new FormData(form).get("service");
  if (typeof email !== "string" || !form.checkValidity()) {
    setStatus(form, MESSAGES.invalid, true);
    return;
  }

  setStatus(form, MESSAGES.pending, false);

  try {
    const response = await fetch(ENDPOINT, {
      body: JSON.stringify({ email, service }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      signal,
    });
    if (!response.ok) throw new Error(String(response.status));
    setStatus(form, MESSAGES.sent, false);
    form.reset();
  } catch (error) {
    if (signal.aborted) return;
    setStatus(form, MESSAGES.failed, true);
  }
};

export const initLetterSignup = () => {
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
