const fs = require('fs').promises;
const path = require('path');

const IGNORES = new Set(['.git', 'node_modules', '.next', 'dist', 'build']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (IGNORES.has(entry.name)) continue;
    if (entry.isDirectory()) await walk(full);
    else await processFile(full);
  }
}

async function processFile(file) {
  try {
    const text = await fs.readFile(file, 'utf8');
    if (!text.includes('')) return;
    let res = '';
    let i = 0;
    while (true) {
      const idx = text.indexOf('<<<<<<< HEAD', i);
      if (idx === -1) { res += text.slice(i); break; }
      res += text.slice(i, idx);
      const start = idx + '<<<<<<< HEAD'.length;
      const mid = text.indexOf('', mid);
      if (end === -1) { /* malformed, drop rest */ break; }
      res += headSection;
      i = end + '>>>>>>>'.length;
    }
    await fs.writeFile(file, res, 'utf8');
    console.log('Cleaned', file);
  } catch (err) {
    // ignore binary or permission errors
  }
}

(async () => {
  const root = process.cwd();
  await walk(root);
  console.log('Done');
})();
