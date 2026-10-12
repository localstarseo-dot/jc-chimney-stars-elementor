import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import pages from '../src/ads/pages.mjs';
const issues = [];
const footerSource = fs.readFileSync('index.html', 'utf8').match(/<footer class="cs-footer"[\s\S]*?<\/footer>/)?.[0];
const expectedFooter = footerSource?.replace(/(src|href)="(?!https?:|tel:|mailto:|#)([^"]+)"/g, (_, attribute, value) => attribute + '="../' + value + '"');
const homepage = fs.readFileSync('index.html', 'utf8');
const headerSource = homepage.match(/<header class="cs-header"[\s\S]*?<\/header>/)?.[0];
const expectedHeader = headerSource?.replace(/(src|href)="(?!https?:|tel:|mailto:|#)([^"]+)"/g, (_, attribute, value) => attribute + '="../' + value + '"');
const reviewStrip = homepage.match(/<div class="cs-review-strip"[\s\S]*?<\/div>/)?.[0];
for (const page of pages) {
  const filename = page.slug + '/index.html';
  execFileSync(process.execPath, ['scripts/validate.mjs', filename], { stdio: 'pipe' });
  const html = fs.readFileSync(filename, 'utf8');
  if (!expectedFooter || !html.includes(expectedFooter)) issues.push(filename + ': global footer differs from approved source');
  if (!expectedHeader || !html.includes(expectedHeader) || !reviewStrip || !html.includes(reviewStrip)) issues.push(filename + ': global navigation/top bar differs from approved source');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) issues.push(filename + ': duplicate IDs');
  for (const m of html.matchAll(/href="#([^"]+)"/g)) if (!ids.includes(m[1])) issues.push(filename + ': missing anchor ' + m[1]);
  for (const match of html.matchAll(/<img\b[^>]+>/g)) {
    const src = match[0].match(/src="([^"]+)"/)[1];
    const local = path.resolve(path.dirname(filename), src);
    if (!fs.existsSync(local)) issues.push(filename + ': missing photo ' + src);
  }
  if (!html.includes(page.headline)) issues.push(filename + ': wrong service H1');
  if (!/<section class="ads-hero"[\s\S]*?<\/section>\s*<section class="cs-stats"/.test(html)) issues.push(filename + ': statistics strip must follow hero directly');
  if ([...html.matchAll(/<section class="cs-stats"/g)].length !== 1) issues.push(filename + ': statistics strip must appear exactly once');
  if (html.includes('exit-offer.js') || html.includes('lead-offer.js')) issues.push(filename + ': website popout controller leaked into Ads');
  if (!html.includes('assets/js/ads-offers.js') || !html.includes('class="cs-voucher-section"')) issues.push(filename + ': approved discount section/controller missing');
  if (!html.includes('class="cs-exit-offer ads-exit-dialog"') || !html.includes('LIMITED-TIME OFFER VOUCHER')) issues.push(filename + ': approved popouts missing');
  if ([...html.matchAll(/data-ads-offer-timer/g)].length !== 2) issues.push(filename + ': expected synchronized preview timers in both popouts');
  if (!/<section class="cs-stats"[\s\S]*?<\/section>\s*<section class="cs-voucher-section"[\s\S]*?<\/section>\s*<section class="cs-gallery-process"/.test(html)) issues.push(filename + ': expected stats, discount, then gallery/process');
  if ([...html.matchAll(/class="cs-voucher-section"/g)].length !== 1) issues.push(filename + ': duplicate discount section');
  if (html.includes('First Time Customer Discount') || html.includes('First time Customer Discount') || html.includes('Claim My Discount')) issues.push(filename + ': generic offer copy reappeared');
  for (const [pattern, label] of [[/<section class="cs-voucher-section"[\s\S]*?<\/section>/, 'inline'], [/<aside class="ads-sticky"[\s\S]*?<\/aside>/, 'sticky'], [/<dialog class="ads-offer-dialog[\s\S]*?<\/dialog>/, 'offer popup'], [/<dialog class="cs-exit-offer[\s\S]*?<\/dialog>/, 'leaving popup']]) {
    const offer = html.match(pattern)?.[0] || '';
    if (!offer.includes(page.offer.headline) || !offer.includes(page.offer.claim) || !offer.includes(page.offer.detail)) issues.push(filename + ': incorrect offer in ' + label);
  }
  const comparisons = [...html.matchAll(/data-ads-compare\b/g)].length;
  if (comparisons !== page.work.filter(w => w.pair).length) issues.push(filename + ': wrong photo comparisons');
  if (html.includes('ads-form-preview') || /id="(?:faqs|booking)"/.test(html)) issues.push(filename + ': removed FAQ/enquiry sections reappeared');
  if (html.includes('ads-process') || html.includes('ads-services')) issues.push(filename + ': removed process/relevant-service sections reappeared');
  if (html.includes('ads-concerns') || html.includes('concerns-title')) issues.push(filename + ': removed concern cards reappeared');
  if (html.includes('class="cs-service-showcase"') || html.includes('class="cs-live-service-card"')) issues.push(filename + ': removed professional service cards reappeared');
  if (!html.includes(page.service + ' Service') || !html.includes('Watch Our Team in Action')) issues.push(filename + ': intent-specific gallery/process missing');
  if ([...html.matchAll(/class="cs-process-step"/g)].length !== 4) issues.push(filename + ': expected four service steps');
  const gallery = html.match(/<div class="cs-action-gallery__track">([\s\S]*?)<\/div>/)?.[1] || '';
  const gallerySources = [...gallery.matchAll(/src="([^"]+)"/g)].map(match => match[1]);
  const expectedGallery = page.gallery.map(photo => '../' + photo.image);
  if (JSON.stringify(gallerySources) !== JSON.stringify(expectedGallery)) issues.push(filename + ': gallery differs from approved intent-specific photo list');
  if (new Set(gallerySources).size !== gallerySources.length || gallery.includes('team-photo')) issues.push(filename + ': duplicate or general team photos in service gallery');
  if (!html.includes('Chimney &amp; Fireplace Services') || !html.includes('Air Duct &amp; Dryer Vent Services')) issues.push(filename + ': general lower service directory missing');
  if (!/<\/section>\s*<section class="cs-inventory"/.test(html)) issues.push(filename + ': service directory missing');
  if (!html.includes('class="cs-areas"')) issues.push(filename + ': service areas missing');
  console.log(filename + ': assets, anchors, intent, and preview boundaries passed');
}
if (issues.length) { console.error(issues.join('\n')); process.exitCode = 1; }
