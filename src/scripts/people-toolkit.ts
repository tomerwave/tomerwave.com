import { initLanguage } from './people-language';
import { readWorksheets, createWorksheetPdf } from './worksheet-pdf';
import type { Language } from '../utils/worksheet-layout';

const copy = {
  en: { save: 'Save PDF', saving: 'Creating PDF…', success: 'Your PDF is ready. On iPhone, use Share to save it to Files.', error: 'The PDF could not be created. Your answers are still here. Please try again.' },
  he: { save: 'שמירה כ־PDF', saving: 'מכינים את ה־PDF…', success: 'ה־PDF מוכן. באייפון אפשר לשמור אותו בקבצים דרך כפתור השיתוף.', error: 'לא הצלחנו ליצור PDF. התשובות עדיין כאן. אפשר לנסות שוב.' },
};
let language: Language = 'en';
let revision = 0;
let savedRevision = 0;
let lastPdf: string | null = null;
const button = document.querySelector<HTMLButtonElement>('#save-pdf')!;
const status = document.querySelector<HTMLElement>('#status')!;
const result = document.querySelector<HTMLAnchorElement>('#pdf-result')!;
initLanguage(value => { language = value; button.textContent = copy[value].save; status.textContent = ''; result.hidden = true; });

document.addEventListener('input', event => {
  const field = event.target as HTMLInputElement | HTMLTextAreaElement;
  if (!field.dataset.key) return;
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-key]').forEach(other => {
    if (other.dataset.key === field.dataset.key) other.value = field.value;
  });
  revision++;
  result.hidden = true;
  status.textContent = '';
});

button.addEventListener('click', async () => {
  const exportedLanguage = language;
  const exportedRevision = revision;
  const sheets = readWorksheets(exportedLanguage);
  const select = document.querySelector<HTMLSelectElement>('#language-select')!;
  const fields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-key]');
  fields.forEach(field => { field.readOnly = true; });
  button.disabled = select.disabled = true;
  button.textContent = copy[exportedLanguage].saving;
  status.textContent = '';
  result.hidden = true;
  try {
    const bytes = await createWorksheetPdf(sheets, exportedLanguage);
    if (lastPdf) URL.revokeObjectURL(lastPdf);
    lastPdf = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }));
    result.href = lastPdf;
    result.download = `People-First-Completed-${exportedLanguage.toUpperCase()}.pdf`;
    result.textContent = exportedLanguage === 'he' ? 'הורדת ה־PDF המלא' : 'Download your completed PDF';
    result.hidden = false;
    result.click();
    savedRevision = exportedRevision;
    status.textContent = copy[exportedLanguage].success;
  } catch (error) {
    console.error('Worksheet PDF export failed', error);
    status.textContent = copy[exportedLanguage].error;
  } finally {
    fields.forEach(field => { field.readOnly = false; });
    button.disabled = select.disabled = false;
    button.textContent = copy[language].save;
  }
});

window.addEventListener('beforeunload', event => {
  if (revision !== savedRevision) { event.preventDefault(); event.returnValue = ''; }
});
