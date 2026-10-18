import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source = readFileSync(new URL('../src/components/ThemeProvider.astro', import.meta.url), 'utf8').match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1];
assert.ok(source, 'theme initializer missing');
const cases = [
  { saved: 'dark', legacy: 'light', system: true, expected: 'dark' },
  { saved: 'light', system: false, expected: 'light' },
  { saved: '', legacy: 'dark', system: true, expected: 'light' },
  { saved: null, legacy: 'dark', system: true, expected: 'dark' },
  { saved: 'invalid', system: false, expected: 'dark' },
  { denied: true, system: true, expected: 'light' },
  { denied: true, system: false, expected: 'dark' },
];
for (const test of cases) {
  const root = { dataset: {} };
  vm.runInNewContext(source, {
    document: { documentElement: root },
    matchMedia: () => ({ matches: test.system }),
    localStorage: { getItem: key => { if (test.denied) throw new Error('storage denied'); return (key === 'starlight-theme' ? test.saved : test.legacy) ?? null; } },
  });
  assert.equal(root.dataset.theme, test.expected, JSON.stringify(test));
}
console.log(`PASS: ${cases.length} theme initialization cases, including denied storage and legacy preference`);
