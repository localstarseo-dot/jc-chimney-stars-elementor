import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pages from '../src/ads/pages.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Homepage footer is the approved global source; only relative paths change for LP folders.
const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const footerMatch = homepage.match(/<footer class="cs-footer"[\s\S]*?<\/footer>/);
if (!footerMatch) throw new Error('Approved global footer was not found in index.html.');
const globalFooter = footerMatch[0].replace(/(src|href)="(?!https?:|tel:|mailto:|#)([^"]+)"/g, (_, attribute, value) => attribute + '="../' + value + '"');
const headerMatch = homepage.match(/<header class="cs-header"[\s\S]*?<\/header>/);
const reviewStripMatch = homepage.match(/<div class="cs-review-strip"[\s\S]*?<\/div>/);
if (!headerMatch || !reviewStripMatch) throw new Error('Approved global navigation or review top bar was not found.');
const lpReviewStrip = reviewStripMatch[0]
  .replace('Our Customers Rate Us ', '<span class="ads-review-desktop-copy">Our Customers Rate Us </span>')
  .replace('Based On ', '<span class="ads-review-desktop-copy">Based On </span>');
const globalHeader = headerMatch[0].replace(/(src|href)="(?!https?:|tel:|mailto:|#)([^"]+)"/g, (_, attribute, value) => attribute + '="../' + value + '"') + '\n' + lpReviewStrip;
const voucherMatch = homepage.match(/<section class="cs-voucher-section"[\s\S]*?<\/section>/);
if (!voucherMatch) throw new Error('Approved discount section was not found.');
const globalVoucher = voucherMatch[0].replace('<button class="cs-button cs-button--primary cs-voucher__claim" type="button" data-cs-lead-open data-cs-voucher-start>', '<a class="cs-button cs-button--primary cs-voucher__claim" href="../book-online/" data-ads-offer-open>').replace('Claim My Discount</button>', 'Claim My Discount</a>');
const voucherStyles = fs.readFileSync(path.join(root, 'assets/css/lead-offer.css'), 'utf8');
const voucherStart = voucherStyles.indexOf('.cs-voucher {');
if (voucherStart < 0) throw new Error('Approved voucher styles were not found.');
fs.writeFileSync(path.join(root, 'assets/css/ads-global-offers.css'), `/* Generated from the approved global voucher styles, without website forms/controllers. */\n${voucherStyles.slice(voucherStart).trimEnd()}\n`);
const componentStyles = fs.readFileSync(path.join(root, 'assets/css/components.css'), 'utf8');
const baseStyles = fs.readFileSync(path.join(root, 'assets/css/global.css'), 'utf8');
const responsiveStyles = fs.readFileSync(path.join(root, 'assets/css/responsive.css'), 'utf8');
const headerEnd = componentStyles.indexOf('.cs-stars {');
const mobileNavEnd = responsiveStyles.indexOf('  .cs-live-hero,');
const buttonStart = baseStyles.indexOf('.cs-button {');
const buttonEnd = baseStyles.indexOf('.cs-button--square');
const tokenEnd = baseStyles.indexOf('\n}\n') + 2;
if ([headerEnd, mobileNavEnd, buttonStart, buttonEnd].some(index => index < 0)) throw new Error('Global navigation style boundaries were not found.');
const headerCss = `/* Generated from the approved global navigation/top bar. */
${baseStyles.slice(0, tokenEnd)}
.cs-container { width: min(calc(100% - 3rem), var(--cs-container)); margin-inline: auto; }
.cs-header { font-size: 16px; line-height: 1.55; }
.cs-page.cs-menu-open { overflow: hidden; }
.cs-page.cs-menu-open .ads-sticky { visibility: hidden; }
${baseStyles.slice(buttonStart, buttonEnd)}
${componentStyles.slice(0, headerEnd)}
${responsiveStyles.slice(0, mobileNavEnd)}
}
@media (max-width: 767px) {
  .cs-header .cs-container { width: min(calc(100% - 2rem), var(--cs-container)); }
  .cs-brand { width: 160px; flex-basis: 160px; }
  .cs-menu-toggle__label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .cs-review-strip { flex-wrap: nowrap; white-space: nowrap; gap: clamp(8px, 2.5vw, 16px); padding: 0.55rem 0.5rem; min-height: 36px; font-size: clamp(10px, 3vw, 12px); }
  .cs-review-strip > span { flex: 0 0 auto; }
  .cs-review-strip__stars { font-size: clamp(14px, 4vw, 17px); letter-spacing: 0; }
  .ads-review-desktop-copy { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
}
@media (prefers-reduced-motion: reduce) { .cs-header *, .cs-header *::before, .cs-header *::after { transition: none !important; } }
`;
fs.writeFileSync(path.join(root, 'assets/css/ads-global-header.css'), headerCss);
const areasMatch = homepage.match(/<section class="cs-areas"[\s\S]*?<\/section>/);
if (!areasMatch) throw new Error('Approved service area section was not found.');
const inventoryMatch = homepage.match(/<section class="cs-inventory"[\s\S]*?<\/section>/);
if (!inventoryMatch) throw new Error('Approved general service directory was not found.');
const inventoryStart = componentStyles.indexOf('.cs-inventory {');
const inventoryEnd = componentStyles.indexOf('.cs-faq {', inventoryStart);
const areasStart = componentStyles.indexOf('.cs-areas {');
const areasEnd = componentStyles.indexOf('.cs-contact {', areasStart);
const headingsStart = baseStyles.indexOf('.cs-live-heading {');
const headingsEnd = baseStyles.indexOf('.cs-display-heading {', headingsStart);
if ([inventoryStart, inventoryEnd, areasStart, areasEnd, headingsStart, headingsEnd].some(i => i < 0)) throw new Error('Directory style boundaries were not found.');
const directoryCss = `/* Generated from approved service inventory and service areas. */
${componentStyles.slice(inventoryStart, inventoryEnd)}
${componentStyles.slice(areasStart, areasEnd)}
${baseStyles.slice(headingsStart, headingsEnd)}
.cs-inventory, .cs-areas { line-height: 1.55; }
.cs-inventory h2, .cs-areas h2 { font-size: clamp(2rem, 3.2vw, 3.1rem); font-weight: 800; letter-spacing: 0; }
.cs-areas { color: var(--cs-navy); }
@media (max-width: 1024px) { .cs-inventory-list--four { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(14, auto); } }
@media (max-width: 767px) {
  .cs-inventory .cs-container, .cs-areas .cs-container { width: calc(100% - 2rem); }
  .cs-rule-heading { grid-template-columns: 35px auto 35px; gap: 0.6rem; }
  .cs-rule-heading h2 { font-size: 1.75rem; }
  .cs-inventory-list--three, .cs-inventory-list--four { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: none; grid-auto-flow: row; gap: 1rem; }
  .cs-area-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.65rem 1.25rem; }
}
@media (max-width: 420px) { .cs-inventory-list--three, .cs-inventory-list--four, .cs-area-grid { grid-template-columns: 1fr; } }
`;
fs.writeFileSync(path.join(root, 'assets/css/ads-global-directories.css'), directoryCss);
const statsMatch = homepage.match(/<section class="cs-stats"[\s\S]*?<\/section>/);
if (!statsMatch) throw new Error('Approved stats strip was not found.');
const globalStats = statsMatch[0].replace('Service statistics currently displayed on the live website', 'Chimney Star service statistics supplied for preview');
const statsStart = componentStyles.indexOf('.cs-stats {');
const statsEnd = componentStyles.indexOf('.cs-service-showcase {', statsStart);
if (statsStart < 0 || statsEnd < 0) throw new Error('Stats style boundaries were not found.');
fs.writeFileSync(path.join(root, 'assets/css/ads-global-stats.css'), `/* Generated from the global stats strip supplied as the LP reference. */
${componentStyles.slice(statsStart, statsEnd)}
@media (max-width: 767px) { .cs-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } .cs-stat { min-height: 175px; } .cs-stat strong { font-size: 2rem; } .cs-stat small { font-size: 0.95rem; } }
@media (max-width: 420px) { .cs-stats { grid-template-columns: 1fr; } .cs-stat { min-height: 145px; } }
`);
const galleryStart = componentStyles.indexOf('.cs-gallery-process {');
const galleryEnd = componentStyles.indexOf('.cs-feature {', galleryStart);
if (galleryStart < 0 || galleryEnd < 0) throw new Error('Global gallery/process styles were not found.');
fs.writeFileSync(path.join(root, 'assets/css/ads-global-gallery.css'), `/* Generated from the approved homepage gallery and process. */
${componentStyles.slice(galleryStart, galleryEnd)}
.cs-ads .cs-gallery-wrap .cs-display-heading { font-family: Bangers, Poppins, sans-serif; font-weight: 400; letter-spacing: 0.02em; text-align: center; font-size: clamp(1.8rem, 3vw, 2.5rem); }
.cs-ads .cs-process h2 { font-weight: 800; letter-spacing: 0; }
.cs-ads .cs-process-step h3 { font-weight: 800; }
@media (max-width: 1024px) { .cs-action-gallery figure { flex-basis: calc((100% - 0.7rem) / 2); } .cs-process-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .cs-process-grid::before { display: none; } }
@media (max-width: 767px) { .cs-gallery-process .cs-container { width: calc(100% - 2rem); } .cs-action-gallery figure { flex-basis: 100%; aspect-ratio: 1.5; } .cs-process { padding-top: 3.5rem; } .cs-process-grid { grid-template-columns: 1fr; } .cs-process-step h3 { min-height: 0; } }
`);
const footerStart = componentStyles.indexOf('.cs-footer {');
const footerEnd = componentStyles.indexOf('.cs-page:has(.cs-float-actions)', footerStart);
if (footerStart < 0 || footerEnd < 0) throw new Error('Global footer stylesheet boundaries were not found.');
const footerCss = `/* Generated from the approved global footer styles. Rebuild with build-ads-pages.mjs. */
.cs-ads .cs-footer { --cs-black: #050505; --cs-white: #fff; --cs-yellow: #ffd900; --cs-container: 1140px; line-height: 1.55; }
.cs-footer .cs-container { width: min(calc(100% - 3rem), var(--cs-container)); margin-inline: auto; }
.cs-footer h2 { letter-spacing: 0; }
${componentStyles.slice(footerStart, footerEnd)}
@media (max-width: 1024px) { .cs-footer-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px) { .cs-footer-top, .cs-footer-grid { grid-template-columns: 1fr; } }
`;
fs.writeFileSync(path.join(root, 'assets/css/ads-global-footer.css'), footerCss);
const assets = JSON.parse(fs.readFileSync(path.join(root, 'assets/photos/ads/manifest.json'), 'utf8'));
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const a = name => 'assets/photos/ads/' + name + '.webp';
const img = (source, alt, width, height, critical = false) => {
  const asset = assets.find(item => item.path === source);
  return '<img src="../' + source + '" width="' + (asset?.width || width) + '" height="' + (asset?.height || height) + '" alt="' + escape(alt) + '" decoding="async" ' + (critical === true ? 'fetchpriority="high"' : critical === 'eager' ? 'loading="eager"' : 'loading="lazy"') + '>';
};
const calendar = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 2v6M16 2v6M3 11h18m-11 4 2 2 4-4"/></svg>';
const phone = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m7 3 3 5-2 2c1 3 3 5 6 6l2-2 5 3-1 4C10 21 3 14 3 4Z"/></svg>';
const actions = (label = 'Book Online Now') => '<div class="ads-actions"><a class="ads-button ads-button--primary" href="../book-online/">' + calendar + escape(label) + '</a><a class="ads-button ads-button--white" href="tel:+15125012755">' + phone + 'Call Now</a></div>';
const yelp = 'https://www.yelp.com/biz/chimney-star-chimney-sweep-and-air-duct-cleaning-pflugerville-3';
// Maps business search is a safe fallback until the exact GBP review link is supplied.
const googleReviews = 'https://www.google.com/maps/search/?api=1&query=Chimney%20Star%20Chimney%20Sweep%20%26%20Air%20Duct%20Cleaning%2014199%20N%20Interstate%20Hwy%2035%20Pflugerville%20TX';
const reviews = [
  ['Daniella Kozan', 'DK', 'Great experience. They were responsive, punctual and did exactly what we needed. Would definitely hire again!'],
  ['Jonathan Treeby', 'JT', 'Over-delivered in quality work. Highly recommended.'],
  ['Coco Marie', 'CM', 'Honest, reliable, thorough, knowledgeable - my clients hired Josh for a chimney inspection and we were so pleased with his service.']
];
const badges = ['trust-badge-ccs', 'trust-badge-green-check', 'NFPA-White-', 'trust-badges-cerc'];
const badgeLabels = ['Certified Chimney Sweep', 'Licensed and insured', 'NFPA', 'Certified Environmentally Responsible Contractor'];

function workCard(work, i) {
  if (!work.pair) return '<article class="ads-project"><h3>' + escape(work.title) + '</h3><figure class="ads-project__photo">' + img(work.image, work.alt, work.width, work.height) + '</figure><p>' + escape(work.text) + '</p><a class="ads-text-link" href="../book-online/">Discuss your service →</a></article>';
  const label = 'Compare ' + work.title.toLowerCase() + ' photos';
  return '<article class="ads-project"><h3>' + escape(work.title) + '</h3><div class="ads-compare" data-ads-compare style="--position:50%"><div class="ads-compare__stage" data-ads-stage>' + img(a(work.pair + '-before'), work.alt + ' — supplied before photo') + '<div class="ads-compare__after">' + img(a(work.pair + '-after'), work.alt + ' — supplied after photo') + '</div><span class="ads-compare__tag ads-compare__tag--before">Before</span><span class="ads-compare__tag ads-compare__tag--after">After</span><span class="ads-compare__handle" aria-hidden="true">↔</span></div><label class="ads-sr-only" for="compare-' + i + '">' + escape(label) + '</label><input id="compare-' + i + '" type="range" min="0" max="100" value="50" aria-valuetext="50 percent after photo" data-ads-range><small>Slide to compare supplied photos</small></div><p>' + escape(work.text) + '</p><a class="ads-text-link" href="../book-online/">Discuss your service →</a></article>';
}

function galleryProcess(page) {
  if (!page.gallery?.length) throw new Error('Missing service gallery for ' + page.slug);
  const processIcons = ['appointment-scheduling-icon', 'chimney-inspection-icon', 'upfront-pricing-icon', 'quality-workmanship-icon'];
  return '<section class="cs-gallery-process" aria-labelledby="gallery-title"><div class="cs-container cs-gallery-wrap"><h2 class="cs-display-heading" id="gallery-title">Watch Our Team in Action</h2><div class="cs-action-gallery" data-cs-team-carousel aria-label="Chimney Star ' + escape(page.service.toLowerCase()) + ' photo gallery"><div class="cs-action-gallery__track">' + page.gallery.map(photo => '<figure>' + img(photo.image, photo.alt, photo.width, photo.height) + '</figure>').join('') + '</div></div></div><div class="cs-container cs-process"><div class="cs-pill">How Does It Work?</div><h2>' + escape(page.service) + ' Service</h2><p class="cs-process__subhead">In a Few Simple Steps</p><div class="cs-process-grid">' + page.process.map(([title,copy], i) => '<article class="cs-process-step">' + img('assets/icons/' + processIcons[i] + '.webp', '', 144, 144) + '<h3>' + escape(title) + '</h3><p>' + escape(copy) + '</p></article>').join('') + '</div></div></section>';
}

function serviceDirectory(page) {
  return inventoryMatch[0] + '\n' + areasMatch[0];
}

function popoutRating() {
  return '<div class="cs-popout-rating"><span>Our Customers Rate Us 5.0 Out Of 5.0</span><span class="cs-popout-rating__stars" aria-label="Five stars">★★★★★</span><span>Based On 619+ Reviews!</span></div>';
}

function voucherSection(page) {
  return globalVoucher
    .replace('First Time Customer Discount', escape(page.offer.headline))
    .replace('Exclusive New Customer Offer', escape(page.offer.eyebrow))
    .replace('Your First Eligible Service', escape(page.offer.detail))
    .replace('Offer mockup. Eligible services, exclusions, expiry, and maximum savings require approval.', 'Mention this offer when booking online or calling our team.')
    .replace('Claim My Discount', escape(page.offer.claim));
}

function render(page) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>${escape(page.service)} in Austin, TX | Chimney Star</title>
  <meta name="description" content="${escape(page.intro)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bangers&amp;family=Poppins:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/ads-pages.css?v=ads-hero-10">
  <link rel="stylesheet" href="../assets/css/ads-global-header.css?v=ads-review-4">
  <link rel="stylesheet" href="../assets/css/ads-global-footer.css?v=ads-2">
  <link rel="stylesheet" href="../assets/css/ads-global-directories.css?v=ads-4">
  <link rel="stylesheet" href="../assets/css/ads-global-stats.css?v=ads-5">
  <link rel="stylesheet" href="../assets/css/ads-global-gallery.css?v=ads-1">
  <link rel="stylesheet" href="../assets/css/ads-global-offers.css?v=ads-1">
  <link rel="stylesheet" href="../assets/css/exit-offer.css?v=release-20261013">
  <link rel="stylesheet" href="../assets/css/ads-offers.css?v=ads-1">
  <script src="../assets/js/ads-pages.js?v=ads-footer-3" defer></script>
  <script src="../assets/js/ads-offers.js?v=ads-1" defer></script>
  <script src="../assets/js/gallery-carousel.js?v=shuffle-1" defer></script>
  <script src="../assets/js/main.js?v=release-20261013" defer></script>
</head>
<body class="cs-page">
<div class="cs-ads" data-ads-page="${page.intent}">
  <a class="ads-skip" href="#main-content">Skip to main content</a>
  ${globalHeader}
  <main id="main-content">
    <section class="ads-hero" aria-labelledby="hero-title">
      <div class="ads-hero__image" aria-hidden="true">${img(page.hero, '', page.heroWidth, page.heroHeight, true)}</div>
      <div class="ads-container ads-hero__inner">
        <div class="ads-hero__content">
          <h1 id="hero-title">${escape(page.headline)}</h1>
          <p class="ads-hero__intro">${escape(page.intro)}</p>
          <div class="ads-review-proof" aria-label="Company-level customer review proof">
            <a href="#reviews" aria-label="Read customer reviews">${img(a('google-reviews'), 'Google Reviews', 280, 140, 'eager')}</a>
            <div class="ads-rating"><strong>5.0 <span class="ads-stars" aria-label="Five stars">★★★★★</span></strong><span>619+ company reviews</span></div>
            <a href="${yelp}" aria-label="Read Chimney Star reviews on Yelp" target="_blank" rel="noopener">${img(a('yelp-reviews'), 'Yelp', 280, 191, 'eager')}</a>
          </div>
          <div class="ads-trust-row">
            <div class="ads-badges" aria-label="Company trust badges">${badges.map((n,i)=>img(a(n), badgeLabels[i], undefined, undefined, 'eager')).join('')}</div>
          </div>
          ${actions()}
        </div>
      </div>
    </section>
    ${globalStats}
    ${voucherSection(page)}
    ${galleryProcess(page)}
    <section class="ads-section ads-dark" id="our-work" aria-labelledby="work-title">
      <div class="ads-container"><div class="ads-heading"><p class="ads-eyebrow">Our Work</p><h2 id="work-title">${escape(page.workTitle)}</h2><p>${escape(page.workIntro)}</p></div><div class="ads-work-grid">${page.work.map(workCard).join('')}</div></div>
    </section>
    <section class="ads-section ads-dark ads-reviews" id="reviews" aria-labelledby="reviews-title">
      <div class="ads-container"><div class="ads-reviews__heading"><div><p class="ads-eyebrow">Google Reviews</p><h2 id="reviews-title">What our customers say</h2><p>Company-wide feedback, not reviews exclusively of ${escape(page.service.toLowerCase())}.</p></div><div class="ads-reviews__proof"><strong>5.0 <span class="ads-stars" aria-label="Five stars">★★★★★</span></strong><span>619+ company reviews</span><a class="ads-button ads-button--white" href="${googleReviews}" target="_blank" rel="noopener">Google Reviews ↗</a></div></div>
        <div class="ads-review-grid">${reviews.map(([name,initials,quote])=>'<article class="ads-review-card"><div class="ads-review-card__person"><span class="ads-initials" aria-hidden="true">'+initials+'</span><div><h3>'+escape(name)+'</h3><span>Google · supplied customer review</span></div></div><p class="ads-stars" aria-label="Five stars">★★★★★</p><blockquote>“'+escape(quote)+'”</blockquote></article>').join('')}</div>
      </div>
    </section>
    ${serviceDirectory(page)}
  </main>
  ${globalFooter}
  <aside class="ads-sticky" aria-label="Quick booking and call actions"><div class="ads-container ads-sticky__inner"><a href="../book-online/" data-ads-offer-open><strong>${escape(page.offer.headline)}</strong><span>${escape(page.offer.detail)}</span></a>${actions(page.offer.claim)}</div></aside>
  <dialog class="ads-offer-dialog cs-lead-modal" aria-labelledby="cs-lead-offer-title" aria-describedby="ads-offer-description">
    <button type="button" class="ads-dialog-close" aria-label="Close offer">×</button>
    ${img(a('footer-monochrome-logo'), 'Chimney Star', 440, 146)}
    <div class="cs-voucher"><p class="cs-voucher__eyebrow">LIMITED-TIME OFFER VOUCHER</p><h2 id="cs-lead-offer-title" class="cs-voucher__discount-title">${escape(page.offer.headline)}</h2><p class="cs-voucher__service" id="ads-offer-description">${escape(page.offer.detail)} Book online or call now to claim.</p>${popoutRating()}<p class="cs-voucher__countdown">Offer timer <b data-ads-offer-timer>59:00</b></p><div class="cs-offer-actions"><a class="cs-button cs-button--primary" href="../book-online/">${escape(page.offer.claim)}</a><a class="cs-button cs-button--call-white" href="tel:+15125012755">Call Now</a></div></div>
  </dialog>
  <dialog class="cs-exit-offer ads-exit-dialog" aria-labelledby="ads-exit-title" aria-describedby="ads-exit-description"><button type="button" class="cs-exit-offer__close" aria-label="Close and continue">×</button><p class="cs-exit-offer__eyebrow">One more thing</p><h2 id="ads-exit-title">${escape(page.offer.headline)}</h2><p id="ads-exit-description">Before you go, book online or call our team to claim this offer. ${escape(page.offer.detail)}</p>${popoutRating()}<p class="cs-exit-offer__timer">Offer timer <b data-ads-offer-timer>59:00</b></p><div class="cs-exit-offer__actions"><a class="cs-button cs-button--primary" href="../book-online/">${escape(page.offer.claim)}</a><a class="cs-button cs-button--call-white" href="tel:+15125012755">Call Now</a></div><button type="button" class="cs-exit-offer__continue">No Thanks</button></dialog>
</div>
</body>
</html>`;
}
for (const page of pages) {
  const dir = path.join(root, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), render(page));
  console.log('Built /' + page.slug + '/ — ' + page.service);
}
