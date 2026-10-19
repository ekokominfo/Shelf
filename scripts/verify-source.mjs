import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex');
assert.equal(hash('public/landing-pages/complete-shelf-v2.html'), '8f1256796bab42b0d60e187176dfcc9d9df33cec1d22ca6f3c3767dcfeca4cb9');
const bundle = JSON.parse(readFileSync('complete-shelf-source.json', 'utf8'));
for (const file of bundle.files.filter(file => file.code)) assert.equal(hash(`vendor/threeui/${file.path}`), file.sha256, file.path);
assert.equal(hash('src/effects/complete-shelf-landing-page/LandingPageFrame.tsx'), '61de2cc50888aac4ac5557420b07fa47ed3543bb57c1e0055fafdefa53dbaa78');
console.log('Source integrity verified: approved current HTML, registered sources, and unchanged iframe host.');
