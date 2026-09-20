import assert from 'node:assert/strict';
import test from 'node:test';

const layout = await import('../src/utils/worksheet-layout.ts').catch(() => ({} as any));

test('wraps answers without dropping words, explicit newlines or long tokens', () => {
  assert.equal(typeof layout.wrapText, 'function', 'worksheet wrapping is implemented');
  assert.deepEqual(layout.wrapText('one two\n\nabcdefghij', 5, (s: string) => s.length), ['one', 'two', '', 'abcde', 'fghij']);
  assert.deepEqual(layout.wrapText('שלום עולם', 5, (s: string) => s.length), ['שלום', 'עולם']);
});

test('long answers continue on extra pages without losing rows or crossing the footer', () => {
  assert.equal(typeof layout.paginateRows, 'function', 'worksheet pagination is implemented');
  const rows = ['a','b','c','d','e'].map(text => ({ text, height: 20 }));
  const pages = layout.paginateRows(rows, 10, 70);
  assert.deepEqual(pages.map((p: any[]) => p.map(r => r.text)), [['a','b','c'], ['d','e']]);
  assert.deepEqual(pages.map((p: any[]) => p.map(r => r.y)), [[10,30,50],[10,30]]);
});

test('a field heading moves with its first answer line instead of being orphaned', () => {
  assert.equal(typeof layout.paginateRows, 'function', 'worksheet pagination is implemented');
  const rows = [{text:'intro',height:40}, {text:'label',height:20,keepWithNext:true}, {text:'answer',height:20}];
  assert.deepEqual(layout.paginateRows(rows, 0, 70).map((p: any[]) => p.map(r => r.text)), [['intro'],['label','answer']]);
});

test('language selection prefers the URL and safely falls back to English', () => {
  assert.equal(typeof layout.resolveLanguage, 'function', 'language selection is implemented');
  assert.equal(layout.resolveLanguage('#he', 'en'), 'he');
  assert.equal(layout.resolveLanguage('#en', 'he'), 'en');
  assert.equal(layout.resolveLanguage('', 'he'), 'he');
  assert.equal(layout.resolveLanguage('#unexpected', 'unknown'), 'en');
});
