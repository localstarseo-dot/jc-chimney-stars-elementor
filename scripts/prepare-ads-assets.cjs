// Copies only designated Ads assets; original client files remain untouched.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require(process.env.ADS_SHARP_PATH || 'sharp');
const root = path.resolve(__dirname, '..');
const sources = path.resolve(root, '../assets/Before And After');
const target = path.join(root, 'assets/photos/ads');
const pairs = [
  ['crown', 'Chimney Crown Repair'],
  ['flashing', 'Chimney Flashing Repair'],
  ['masonry', 'Chimney Masonry Repair : Repointing'],
  ['sweep', 'Chimney Sweep : Chimney Cleaning'],
  ['blockage', 'Chimney Blockage : Nest Removal']
];
(async () => {
  fs.mkdirSync(target, { recursive: true });
  const assets = [];
  for (const [slug, name] of pairs) {
    for (const state of ['Before', 'After']) {
      const original = path.join(sources, name + ' ' + state + '.png');
      const output = 'assets/photos/ads/' + slug + '-' + state.toLowerCase() + '.webp';
      const result = await sharp(original).rotate().resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(root, output));
      assets.push({ path: output, source: path.relative(root, original), width: result.width, height: result.height, bytes: result.size });
    }
  }
  // Small display derivatives of existing approved brand/icon assets.
  const brand = ['footer-monochrome-logo', 'google-reviews', 'yelp-reviews', 'trust-badge-ccs', 'trust-badge-green-check', 'NFPA-White-', 'trust-badges-cerc', 'payment-visa', 'payment-mastercard', 'payment-american-express', 'payment-discover'];
  for (const name of brand) {
    const source = 'assets/brand/' + name + '.webp';
    const output = 'assets/photos/ads/' + name + '.webp';
    const result = await sharp(path.join(root, source)).resize({ width: name.includes('logo') ? 440 : 280, withoutEnlargement: true }).webp({ quality: 85 }).toFile(path.join(root, output));
    assets.push({ path: output, source, width: result.width, height: result.height, bytes: result.size });
  }
  const icons = ['chimney-repair-icon', 'chimney-leak-repair-icon', 'masonry-repair-icon', 'chimney-cap-icon', 'chimney-sweep-icon', 'chimney-inspection-icon', 'appointment-scheduling-icon', 'upfront-pricing-icon', 'clean-work-area-icon', 'quality-workmanship-icon'];
  for (const name of icons) {
    const source = 'assets/icons/' + name + '.webp';
    const output = 'assets/photos/ads/' + name + '.webp';
    const result = await sharp(path.join(root, source)).resize({ width: 128, withoutEnlargement: true }).webp({ quality: 85 }).toFile(path.join(root, output));
    assets.push({ path: output, source, width: result.width, height: result.height, bytes: result.size });
  }
  fs.writeFileSync(path.join(root, 'assets/photos/ads/manifest.json'), JSON.stringify(assets, null, 2) + '\n');
  console.log('Prepared ' + assets.length + ' designated Ads assets.');
})().catch(error => { console.error(error); process.exitCode = 1; });
