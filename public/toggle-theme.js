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

reflectPreference(getPreferredTheme());

window.onload = () => {
  function setThemeFeature() {
    reflectPreference(getPreferredTheme());

    document.querySelector("#theme-btn")?.addEventListener("click", () => {
      const nextTheme = getPreferredTheme() === "light" ? "dark" : "light";

      const applyChange = () => {
        localStorage.setItem("theme", nextTheme);
        reflectPreference(nextTheme);
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

  document.addEventListener("astro:after-swap", setThemeFeature);
};

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (!localStorage.getItem("theme")) {
    reflectPreference(getSystemTheme());
  }
});
