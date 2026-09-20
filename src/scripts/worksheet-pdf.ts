import { paginateRows, wrapText, type Language } from '../utils/worksheet-layout';

type Block = { text: string; size: number; gap?: number; heading?: boolean; keep?: boolean; answer?: boolean; muted?: boolean };
type Sheet = { title: string; blocks: Block[] };
type Row = Block & { height: number; keepWithNext?: boolean; direction: CanvasDirection; font: string };
const WIDTH = 595.28;
const HEIGHT = 841.89;
const MARGIN = 46;

/** Snapshot live values, not HTML value attributes, before any async work. */
export function readWorksheets(language: Language): Sheet[] {
  return [...document.querySelectorAll<HTMLElement>(`.page[data-lang="${language}"]`)].map(section => {
    const text = (selector: string) => section.querySelector(selector)?.textContent?.trim() || '';
    const blocks: Block[] = [];
    const add = (value: string, size = 11, extra: Partial<Block> = {}) => blocks.push({ text: value, size, gap: 8, ...extra });
    add(text('.eyebrow'), 10, { muted: true, keep: true });
    add(text('h1'), 29, { heading: true, keep: true, gap: 6 });
    add(text('.subtitle'), 15, { muted: true, keep: true });
    add(text('.intro'));
    add(text('h2'), 12, { muted: true, keep: true });
    section.querySelectorAll('ol li').forEach((li, i) => add(`${i + 1}. ${li.textContent?.trim()}`, 10.5, { gap: 3 }));
    add(text('.example strong'), 10, { muted: true, keep: true, gap: 3 });
    add(text('.example p'), 10, { muted: true, gap: 14 });
    add(section.querySelectorAll('h2')[1]?.textContent?.trim() || '', 13, { keep: true });
    section.querySelectorAll<HTMLLabelElement>('.meta label').forEach(label => {
      add(label.firstChild?.textContent?.trim() || '', 10, { muted: true, keep: true, gap: 2 });
      add(label.querySelector('input')?.value || (language === 'he' ? 'לא מולא' : 'Not filled in'), 11, { answer: true, gap: 10 });
    });
    section.querySelectorAll('.field').forEach(field => {
      add(field.querySelector('label')?.textContent?.trim() || '', 12, { keep: true, gap: 3 });
      add(field.querySelector('.hint')?.textContent?.trim() || '', 9.5, { muted: true, keep: true, gap: 5 });
      add(field.querySelector('textarea')?.value || (language === 'he' ? 'לא מולא' : 'Not filled in'), 11, { answer: true, gap: 17 });
    });
    add(text('.result'), 10, { muted: true });
    return { title: text('h1'), blocks };
  });
}

/** Canvas uses the browser's bidi/shaping engine, including mixed Hebrew/English answers.
 * Pages are flattened high-resolution images so font support in PDF viewers cannot change them.
 * Rows are paginated BEFORE rendering; no screenshots, cropped textareas, or server uploads.
 */
export async function createWorksheetPdf(sheets: Sheet[], language: Language, progress?: (pages: number) => void): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  await Promise.all([
    document.fonts.load('400 14px Instrument', 'Text'),
    document.fonts.load('400 14px Assistant', 'שלום'),
    document.fonts.load('400 29px Fraunces', 'Title'),
    document.fonts.load('400 29px Frank', 'כותרת'),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(WIDTH * 2.5);
  canvas.height = Math.ceil(HEIGHT * 2.5);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');
  ctx.scale(2.5, 2.5);
  const pdf = await PDFDocument.create();
  pdf.setTitle('People First - completed worksheets');
  pdf.setAuthor('TomerWave');
  pdf.setLanguage(language);
  const logo = new Image();
  logo.src = '/tomerwave-icon.svg';
  await logo.decode();
  const defaultDirection = language === 'he' ? 'rtl' : 'ltr';
  for (const sheet of sheets) {
    const rows: Row[] = [];
    for (const block of sheet.blocks) {
      const font = `${block.size}px ${block.heading ? 'Fraunces,Frank' : 'Instrument,Assistant'},sans-serif`;
      ctx.font = font;
      const firstLetter = block.text.match(/\p{Letter}/u)?.[0] || '';
      const direction = block.answer ? (/[\u0590-\u08ff]/.test(firstLetter) ? 'rtl' : 'ltr') : defaultDirection;
      const lines = wrapText(block.text, WIDTH - MARGIN * 2 - (block.answer ? 16 : 0), value => ctx.measureText(value).width);
      lines.forEach((line, index) => rows.push({
        ...block, text: line, font, direction,
        height: block.size * 1.5 + (index === lines.length - 1 ? block.gap || 0 : 0),
        keepWithNext: block.keep || (block.heading && index < lines.length - 1),
      }));
    }
    const pages = paginateRows(rows, 92, HEIGHT - 52);
    for (let i = 0; i < pages.length; i++) {
      ctx.fillStyle = '#faf6ef'; ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.drawImage(logo, MARGIN, 27, 27, 27);
      ctx.font = '16px Fraunces'; ctx.fillStyle = '#24352f'; ctx.textAlign = 'left'; ctx.direction = 'ltr';
      ctx.fillText('Tomer Gal', MARGIN + 37, 47);
      ctx.font = '9px Instrument'; ctx.textAlign = 'right'; ctx.fillStyle = '#526c59';
      ctx.fillText('PEOPLE FIRST / WORKSHEETS', WIDTH - MARGIN, 46);
      ctx.strokeStyle = '#c8cec3'; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(MARGIN, 65); ctx.lineTo(WIDTH - MARGIN, 65); ctx.stroke();
      for (const row of pages[i]) {
        ctx.font = row.font;
        ctx.direction = row.direction;
        ctx.textAlign = row.direction === 'rtl' ? 'right' : 'left';
        ctx.fillStyle = row.muted ? '#526c59' : '#24352f';
        const inset = row.answer ? 8 : 0;
        if (row.answer) {
          ctx.fillStyle = '#eef0e8'; ctx.fillRect(MARGIN, row.y - 2, WIDTH - MARGIN * 2, row.size * 1.5 + 2);
          ctx.fillStyle = '#24352f';
        }
        ctx.fillText(row.text, row.direction === 'rtl' ? WIDTH - MARGIN - inset : MARGIN + inset, row.y + row.size);
      }
      ctx.direction = 'ltr'; ctx.textAlign = 'left'; ctx.font = '9px Instrument,Assistant'; ctx.fillStyle = '#526c59';
      ctx.fillText('tomerwave.com/people-first', MARGIN, HEIGHT - 27);
      ctx.textAlign = 'right';
      ctx.fillText(`${sheet.title} · ${i + 1} / ${pages.length}`, WIDTH - MARGIN, HEIGHT - 27);
      const png = await pdf.embedPng(canvas.toDataURL('image/png'));
      pdf.addPage([WIDTH, HEIGHT]).drawImage(png, { x: 0, y: 0, width: WIDTH, height: HEIGHT });
      progress?.(pdf.getPageCount());
      // Yield between pages, keeping the UI responsive for long answers on mobile.
      await new Promise<void>(resolve => setTimeout(resolve, 0));
    }
  }
  canvas.width = canvas.height = 0;
  return pdf.save();
}
