import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const blocks = [...css.matchAll(/:root\[data-theme='(light|dark)'\]\s*\{([^}]+)\}/g)];
const luminance = hex => {
  const c = hex.match(/[a-f\d]{2}/gi).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return c[0] * .2126 + c[1] * .7152 + c[2] * .0722;
};
let failed = false;
for (const [, theme, body] of blocks) {
  const colors = Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[a-f\d]{6})/gi)].map(([, k, v]) => [k,v]));
  const pairs = [['accent-text', 'accent', 4.5]];
  for (const bg of ['bg', 'surface', 'surface-2', 'accent-low']) {
    for (const fg of ['text', 'muted', 'accent']) pairs.push([fg, bg, 4.5]);
    for (const fg of ['control-line', 'focus']) pairs.push([fg, bg, 3]);
  }
  let minimum = Infinity;
  for (const [fg, bg, threshold] of pairs) {
    const a = luminance(colors[fg]), b = luminance(colors[bg]);
    const ratio = (Math.max(a,b) + .05) / (Math.min(a,b) + .05);
    if (threshold === 4.5) minimum = Math.min(minimum, ratio);
    if (ratio < threshold) { failed = true; console.error(`${theme}: ${fg}/${bg} ${ratio.toFixed(2)}:1 < ${threshold}`); }
  }
  console.log(`${theme}: ${pairs.length} text/UI palette pairs; minimum text ratio ${minimum.toFixed(2)}:1`);
}
if (blocks.length !== 2) throw new Error('Expected two theme palettes');
if (failed) process.exitCode = 1;
console.log('Static palette checks do not replace browser and assistive-technology checks.');
