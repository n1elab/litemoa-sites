import { readFileSync } from 'node:fs';

// Static palette checks; this does not audit browser layout or external embeds.
const css = readFileSync(new URL('../src/styles/site.css', import.meta.url), 'utf8');
const blocks = [...css.matchAll(/:root\[data-theme='(dark|light)'\]\s*\{([^}]+)\}/g)];
const luminance = (hex) => {
  const rgb = hex.match(/[a-f\d]{2}/gi).map((part) => parseInt(part, 16) / 255)
    .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
let failed = false;
for (const [, theme, body] of blocks) {
  const palette = Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[a-f\d]{6})/gi)]
    .map(([, name, value]) => [name, value]));
  const pairs = [];
  for (const background of ['bg', 'surface', 'surface-2', 'surface-3', 'news-bg', 'social-bg', 'embed-bg']) {
    for (const foreground of ['text', 'muted', 'soft-text', 'green']) pairs.push([foreground, background]);
  }
  pairs.push(['hero-note', 'bg'], ['wiki-promo-text', 'wiki-promo-bg'],
    ['wiki-promo-muted', 'wiki-promo-bg'], ['wiki-promo-accent', 'wiki-promo-bg'],
    ['footer-text', 'footer-bg'], ['footer-muted', 'footer-bg'], ['footer-bottom', 'footer-bg'],
    [theme === 'light' ? '#ffffff' : '#052713', 'green']);
  let minimum = Infinity;
  for (const [foreground, background] of pairs) {
    const a = luminance(palette[foreground] ?? foreground);
    const b = luminance(palette[background]);
    const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    minimum = Math.min(minimum, ratio);
    if (ratio < 4.5) {
      failed = true;
      console.error(`${theme}: ${foreground} / ${background}: ${ratio.toFixed(2)}:1 FAIL`);
    }
  }
  console.log(`${theme}: ${pairs.length} text pairs; minimum ${minimum.toFixed(2)}:1`);
}
if (blocks.length !== 2) throw new Error('Expected both theme palettes');
const wiki = readFileSync(new URL('../src/styles/wiki.css', import.meta.url), 'utf8');
const wikiBlocks = [...wiki.matchAll(/:root(?:\[data-theme='dark'\])?\s*\{([^}]+)\}/g)];
for (const [index, match] of wikiBlocks.entries()) {
  const palette = Object.fromEntries([...match[1].matchAll(/--sl-color-([\w-]+):\s*(#[a-f\d]{6})/gi)]
    .map(([, name, value]) => [name, value]));
  const pairs = [['accent-high', 'accent-low']];
  for (const background of ['black', 'gray-6', 'accent-low']) {
    for (const foreground of ['white', 'gray-2', 'gray-3']) pairs.push([foreground, background]);
  }
  let minimum = Infinity;
  for (const [foreground, background] of pairs) {
    const a = luminance(palette[foreground]);
    const b = luminance(palette[background]);
    const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    minimum = Math.min(minimum, ratio);
    if (ratio < 4.5) {
      failed = true;
      console.error(`wiki ${index ? 'dark' : 'light'}: ${foreground} / ${background}: ${ratio.toFixed(2)}:1 FAIL`);
    }
  }
  console.log(`wiki ${index ? 'dark' : 'light'}: ${pairs.length} text pairs; minimum ${minimum.toFixed(2)}:1`);
}
if (wikiBlocks.length !== 2) throw new Error('Expected both Wiki palettes');
if (failed) process.exitCode = 1;
