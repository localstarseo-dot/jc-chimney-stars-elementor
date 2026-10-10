import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const htmlPath = path.join(root, process.argv[2] || 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const errors = [];

const count = (pattern) => [...html.matchAll(pattern)].length;

if (count(/<h1\b/gi) !== 1) errors.push('Homepage must contain exactly one H1.');
if (!/<meta\s+name="robots"\s+content="noindex, nofollow"/i.test(html)) errors.push('Staging robots directive is missing.');
if (/href="#"/i.test(html)) errors.push('Placeholder href="#" links are not allowed.');
if (!/class="cs-page"/i.test(html)) errors.push('Root project class cs-page is missing.');

const localReferences = [...html.matchAll(/(?:src|href)="([^"#]+)"/gi)]
  .map((match) => match[1])
  .filter((reference) => !/^(?:https?:|tel:|mailto:)/i.test(reference))
  .map((reference) => reference.split(/[?#]/)[0])
  .filter(Boolean);

for (const reference of new Set(localReferences)) {
  const resolved = path.resolve(root, reference);
  if (!fs.existsSync(resolved)) errors.push(`Missing local reference: ${reference}`);
}

for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
  const image = match[0];
  if (!/\balt="[^"]*"/i.test(image)) errors.push(`Image missing alt attribute: ${image.slice(0, 120)}`);
  if (!/\bwidth="\d+"/i.test(image) || !/\bheight="\d+"/i.test(image)) {
    errors.push(`Image missing intrinsic dimensions: ${image.slice(0, 120)}`);
  }
}

for (const required of ['assets/css/global.css', 'assets/css/components.css', 'assets/css/responsive.css', 'assets/js/main.js']) {
  if (!fs.existsSync(path.join(root, required))) errors.push(`Missing required file: ${required}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  h1Count: count(/<h1\b/gi),
  sectionCount: count(/<section\b/gi),
  imageCount: count(/<img\b/gi),
  localReferenceCount: new Set(localReferences).size
}, null, 2));
