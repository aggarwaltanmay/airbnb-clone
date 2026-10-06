import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const assets = new URL('../dist/assets/', import.meta.url);
const files = (await readdir(assets)).filter((file) => file.endsWith('.svg'));

for (const file of files) {
  const path = join(assets.pathname, file);
  const source = await readFile(path, 'utf8');
  if (!/^<svg\b/.test(source) || /^<svg\b[^>]*\bxmlns=/.test(source)) continue;
  await writeFile(path, source.replace(/^<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"'));
}
