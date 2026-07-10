import fs from 'fs/promises';
import path from 'path';

async function run() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'wpplogo.png');
    const buf = await fs.readFile(filePath);
    const blob = new Blob([buf], { type: 'image/png' });
    const form = new FormData();
    form.append('file', blob, 'wpplogo.png');

    const res = await fetch('http://localhost:3005/api/upload', {
      method: 'POST',
      body: form,
    });
    console.log('status', res.status);
    const text = await res.text();
    console.log('body', text);
  } catch (err) {
    console.error('error', err);
    process.exit(1);
  }
}

run();
