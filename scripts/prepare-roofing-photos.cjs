const fs = require('node:fs');
const path = require('node:path');
const sharp = require('/Users/radznasaudia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root = path.resolve(__dirname, '..');
const batches = ['chimney-star-roofing-batch-1', 'chimney-star-roofing-batch-2', 'chimney-star-roofing-batch-3-5-photos'];
(async () => {
  const target = path.join(root, 'assets/photos/roofing');
  fs.mkdirSync(target, { recursive: true });
  const items = [];
  for (const batch of batches) {
    for (const name of fs.readdirSync(path.join(root, '../assets', batch)).filter(n => n.endsWith('.png')).sort()) {
      const source = path.join(root, '../assets', batch, name);
      const filename = name.replace(/\.png$/, '.webp');
      const result = await sharp(source).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(target, filename));
      items.push({ source: '../assets/' + batch + '/' + name, path: 'assets/photos/roofing/' + filename, width: result.width, height: result.height, bytes: result.size });
    }
  }
  console.log(JSON.stringify(items));
})();
