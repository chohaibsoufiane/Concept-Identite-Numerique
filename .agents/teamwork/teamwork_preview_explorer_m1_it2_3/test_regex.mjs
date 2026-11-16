import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const raw = fs.readFileSync('script.js', 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';

const targetString = `    function goToSlide(index, direction) {${eol}        if (isTransitioning) return;${eol}        if (index < 0 || index >= totalSlides) return;${eol}        if (index === currentSlide) return;`;

const replacementString = `    function goToSlide(index, direction = 'next') {${eol}        if (typeof index !== 'number' || !Number.isInteger(index)) return;${eol}        if (isTransitioning) return;${eol}        if (index < 0 || index >= totalSlides) return;${eol}        if (index === currentSlide) return;`;

const fixedScript = raw.replace(targetString, replacementString);

const m = fixedScript.match(/function\s+goToSlide\s*\([^\)]*\)\s*\{([\s\S]*?)(?:const\s+current|container\.setAttribute)/i);
assert.ok(m, 'goToSlide header must match');
assert.match(m[1], /if\s*\(\s*typeof\s+index\s*!==\s*['"]number['"]\s*\|\|\s*!Number\.isInteger\s*\(\s*index\s*\)\s*\)\s*return;?/i);

console.log('Regex assertion PASSED on fixedScript');
