let observer: IntersectionObserver | undefined;

export function initRevealOnScroll() {
  observer?.disconnect();

  const revealItems = document.querySelectorAll<HTMLElement>(".business-reveal");
  if (revealItems.length === 0) return;

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
    return;
  }

  observer = new IntersectionObserver(
    (entries, self) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        self.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => {
    observer?.observe(item);
  });
}
