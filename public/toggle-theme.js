/* eslint-env browser */

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getPreferredTheme() {
  const stored = localStorage.getItem("theme");
  return stored === "dark" || stored === "light" ? stored : getSystemTheme();
}

function reflectPreference(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  document
    .querySelector("#theme-btn")
    ?.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );

  const body = document.body;
  if (body) {
    body.style.colorScheme = theme;
  }
}

// set early so no page flashes / CSS is made aware
reflectPreference(getPreferredTheme());

window.onload = () => {
  function setThemeFeature() {
    // re-read from local storage on every load / navigation so the choice
    // made on any page (business site, blog, about) is always reflected
    reflectPreference(getPreferredTheme());

    document.querySelector("#theme-btn")?.addEventListener("click", () => {
      const nextTheme = getPreferredTheme() === "light" ? "dark" : "light";

      const applyChange = () => {
        localStorage.setItem("theme", nextTheme);
        reflectPreference(nextTheme);
        // lets listeners (e.g. the business hero canvas) redraw for the new theme
        window.dispatchEvent(new CustomEvent("site-theme-change"));
      };

      if (!document.startViewTransition) {
        applyChange();
        return;
      }

      document.startViewTransition(applyChange);
    });
  }

  setThemeFeature();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setThemeFeature);
};

// sync with system changes, but only while the user hasn't picked a theme
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (!localStorage.getItem("theme")) {
    reflectPreference(getSystemTheme());
  }
});
