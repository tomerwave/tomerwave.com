import { resolveLanguage, type Language } from '../utils/worksheet-layout';
let cleanup: (() => void) | undefined;

/** Language preference only. Worksheet answers are never persisted to browser storage. */
export function initLanguage(onChange?: (language: Language) => void) {
  cleanup?.();
  const select = document.querySelector<HTMLSelectElement>('#language-select');
  if (!select) return;
  let saved: string | null = null;
  try { saved = localStorage.getItem('people-first-language'); } catch { /* Private browsing. */ }
  const apply = (language: Language) => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    if (select) select.value = language;
    document.querySelectorAll<HTMLElement>('[data-lang]').forEach(el => { el.hidden = el.dataset.lang !== language; });
    document.querySelectorAll<HTMLAnchorElement>('[data-language-link]').forEach(el => {
      el.hash = language;
    });
    try { localStorage.setItem('people-first-language', language); } catch { /* Optional preference. */ }
    onChange?.(language);
  };
  apply(resolveLanguage(location.hash, saved));
  const change = () => {
    const language = select.value === 'he' ? 'he' : 'en';
    history.replaceState(null, '', `#${language}`);
    apply(language);
  };
  const hashchange = () => apply(resolveLanguage(location.hash, select.value));
  select.addEventListener('change', change);
  window.addEventListener('hashchange', hashchange);
  cleanup = () => { select.removeEventListener('change', change); window.removeEventListener('hashchange', hashchange); };
}
