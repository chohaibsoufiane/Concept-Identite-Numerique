import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT_DIR = process.cwd();
const htmlSource = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const originalScript = fs.readFileSync(path.join(ROOT_DIR, 'script.js'), 'utf8');

// Apply the proposed fix:
const eol = originalScript.includes('\r\n') ? '\r\n' : '\n';

const targetString = `    function goToSlide(index, direction) {${eol}        if (isTransitioning) return;${eol}        if (index < 0 || index >= totalSlides) return;${eol}        if (index === currentSlide) return;`;

const replacementString = `    function goToSlide(index, direction = 'next') {${eol}        if (typeof index !== 'number' || !Number.isInteger(index)) return;${eol}        if (isTransitioning) return;${eol}        if (index < 0 || index >= totalSlides) return;${eol}        if (index === currentSlide) return;`;

assert.ok(originalScript.includes(targetString), 'originalScript must contain targetString');
const fixedScript = originalScript.replace(targetString, replacementString);

// Run the stress navigation test file with fixedScript
const stressFileContent = fs.readFileSync(path.join(ROOT_DIR, 'tests', 'stress-navigation.test.mjs'), 'utf8');

// We test that replacing scriptSource in stress-navigation.test.mjs with fixedScript causes all tests to pass
const patchedStressTest = stressFileContent.replace(
  `const scriptSource = fs.readFileSync(path.join(ROOT_DIR, 'script.js'), 'utf8');`,
  `const scriptSource = ${JSON.stringify(fixedScript)};`
);

const tempStressTestPath = path.join(ROOT_DIR, '.agents', 'teamwork', 'teamwork_preview_explorer_m1_it2_3', 'patched_stress.test.mjs');
fs.writeFileSync(tempStressTestPath, patchedStressTest, 'utf8');
console.log('Written patched stress test to:', tempStressTestPath);
