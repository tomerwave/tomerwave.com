export type Language = 'en' | 'he';

export function resolveLanguage(hash: string, saved?: string | null): Language {
  if (hash === '#he' || hash === '#en') return hash.slice(1) as Language;
  return saved === 'he' ? 'he' : 'en';
}

/** Keep paragraph breaks, and split long unbroken tokens by grapheme, not UTF-16 units. */
export function wrapText(text: string, width: number, measure: (text: string) => number): string[] {
  const lines: string[] = [];
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  for (const paragraph of text.replace(/\r\n?/g, '\n').split('\n')) {
    let line = '';
    for (const word of paragraph.trim().split(/\s+/)) {
      if (!word) continue;
      const candidate = line ? `${line} ${word}` : word;
      if (measure(candidate) <= width) { line = candidate; continue; }
      if (line) { lines.push(line); line = ''; }
      for (const { segment } of segmenter.segment(word)) {
        if (line && measure(line + segment) > width) { lines.push(line); line = ''; }
        line += segment;
      }
    }
    lines.push(line);
  }
  return lines;
}

export function paginateRows<T extends { height: number; keepWithNext?: boolean }>(rows: T[], top: number, bottom: number): (T & { y: number })[][] {
  const pages: (T & { y: number })[][] = [];
  let page: (T & { y: number })[] = [];
  let y = top;
  rows.forEach((row, index) => {
    let required = row.height;
    let next = index;
    while (rows[next]?.keepWithNext && rows[next + 1]) required += rows[++next].height;
    if (page.length && y + required > bottom) { pages.push(page); page = []; y = top; }
    page.push({ ...row, y });
    y += row.height;
  });
  if (page.length) pages.push(page);
  return pages;
}
