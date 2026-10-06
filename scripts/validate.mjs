import fs from 'node:fs';
import path from 'node:path';
import {photos,rooms} from '../dist/data.js';
import assert from 'node:assert/strict';
assert.equal(photos.length,43);assert.equal(rooms.length,9);assert.equal(new Set(photos.map(p=>p.id)).size,43);
for(const p of photos)assert.ok(fs.existsSync(path.join('dist/assets',p.id+'.jpeg')),`Missing photo ${p.id}`);
for(const p of ['index.html','styles.css','app.js','data.js','views.js','calendar.js','assets/favicon.svg','assets/AirbnbCerealVF.woff2'])assert.ok(fs.existsSync('dist/'+p),`Missing ${p}`);
const html=fs.readFileSync('dist/index.html','utf8');for(const m of html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g))assert.ok(fs.existsSync('dist/'+m[1]),`Missing ${m[1]}`);
console.log('Verified 43 unique photos, 9 rooms, entrypoints and static assets. No compilation required.');
