import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = new URL('../dist/', import.meta.url);
function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(new URL(`${e.name}/`, dir)) : [new URL(e.name, dir)]); }
const html = walk(root).filter(file => file.pathname.endsWith('.html'));
const errors = [];
for (const file of html) {
  const content = readFileSync(file, 'utf8');
  if (!/<html\b[^>]*lang="ja"/.test(content)) errors.push(`${file.pathname}: Japanese language missing`);
  if (!/<h1\b/.test(content)) errors.push(`${file.pathname}: h1 missing`);
  for (const [, href] of content.matchAll(/\bhref="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const target = path.join(fileURLToPath(root), decodeURIComponent(href));
    const found = existsSync(target) && (statSync(target).isFile() || existsSync(path.join(target, 'index.html')));
    if (!found) errors.push(`${file.pathname}: missing ${href}`);
  }
  if (/litemoamap\.n1e\.net/.test(content)) errors.push(`${file.pathname}: stopped map link remains`);
}
const search = readFileSync(new URL('search/index.html', root), 'utf8');
for (const term of ['data-search-entry', 'liteplay.n1e.net', 'data-site-search', '参加方法']) if (!search.includes(term)) errors.push(`search index missing ${term}`);
const missing = readFileSync(new URL('404.html', root), 'utf8');
if (!missing.includes('noindex,follow')) errors.push('404 noindex missing');
if (errors.length) { errors.forEach(e => console.error(e)); process.exitCode = 1; }
else console.log(`PASS: ${html.length} Japanese pages, local links, static search content, 404 policy`);
