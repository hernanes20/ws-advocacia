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
    // Only process text files
    if (!text) return;
    const lines = text.split(/\r?\n/);
    const cleaned = lines.filter(line => {
      // remove lines that are only a 40-char hex hash (possibly prefixed with spaces)
      if (/^\s*[0-9a-f]{40}\s*$/.test(line)) return false;
      // remove stray merge markers
      if (/^\s*<<<<<<<\s*/.test(line)) return false;
      if (/^\s*=======\s*$/.test(line)) return false;
      if (/^\s*>>>>>>>\s*[0-9a-f]*\s*$/.test(line)) return false;
      return true;
    }).join('\n');
    if (cleaned !== text) {
      await fs.writeFile(file, cleaned, 'utf8');
      console.log('Cleaned', file);
    }
  } catch (err) {
    // ignore
  }
}

(async () => {
  await walk(process.cwd());
  console.log('Done');
})();
