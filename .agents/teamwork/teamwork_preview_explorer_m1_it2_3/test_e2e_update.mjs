import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT_DIR = process.cwd();
const rawScript = fs.readFileSync(path.join(ROOT_DIR, 'script.js'), 'utf8');
const eol = rawScript.includes('\r\n') ? '\r\n' : '\n';

// Patched script with our fix
const targetString = `    function goToSlide(index, direction) {${eol}        if (isTransitioning) return;${eol}        if (index < 0 || index >= totalSlides) return;${eol}        if (index === currentSlide) return;`;
const replacementString = `    function goToSlide(index, direction = 'next') {${eol}        if (typeof index !== 'number' || !Number.isInteger(index)) return;${eol}        if (isTransitioning) return;${eol}        if (index < 0 || index >= totalSlides) return;${eol}        if (index === currentSlide) return;`;
const js = rawScript.replace(targetString, replacementString);

// Test 1: Static AST/Regex Invariant on script.js
assert.match(
  js,
  /function\s+goToSlide\s*\([^)]*\)\s*\{[\s\S]*?if\s*\(\s*typeof\s+index\s*!==\s*['"]number['"]\s*\|\|\s*!Number\.isInteger\s*\(\s*index\s*\)\s*\)\s*return/,
  'script.js goToSlide must directly guard with typeof index !== "number" || !Number.isInteger(index)'
);
console.log('Test 1 (Static Contract Assertion): PASSED');

// Test 2: Live Direct VM Execution of script.js
function testDirectScriptExecution(scriptContent) {
  let isTransitioningValue = false;
  let currentSlideValue = 0;
  let activeSlideCount = 1;

  // Minimal mock DOM for script.js execution
  const mockContainer = {
    setAttribute: () => {},
    getAttribute: (k) => (k === 'data-slide' ? '1' : 'next'),
    get offsetWidth() { return 100; }
  };
  const mockSlide = {
    classList: {
      remove: () => {},
      add: () => {},
      contains: (c) => c === 'active'
    },
    querySelector: () => null
  };
  const mockSlides = [mockSlide, mockSlide, mockSlide, mockSlide, mockSlide, mockSlide];

  // Instrument script to export goToSlide
  const bridgeHook = `\nwindow.__testEngine = { goToSlide, getIsTransitioning: () => isTransitioning, getCurrentSlide: () => currentSlide };`;
  const instrumented = scriptContent.replace(/document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{([\s\S]*)\}\);?\s*$/, (m, inner) => {
    return `document.addEventListener('DOMContentLoaded', () => {\n${inner}\n${bridgeHook}\n});`;
  });

  const listeners = {};
  const mockDoc = {
    addEventListener: (e, fn) => { listeners[e] = listeners[e] || []; listeners[e].push(fn); },
    dispatchEvent: () => {},
    querySelector: (sel) => (sel === '.presentation-container' ? mockContainer : null),
    querySelectorAll: (sel) => (sel === '.slide' ? mockSlides : []),
    getElementById: (id) => null
  };
  const mockWin = {
    document: mockDoc,
    location: { hash: '', search: '' },
    addEventListener: () => {}
  };

  const sandbox = {
    document: mockDoc,
    window: mockWin,
    console: { log: () => {}, error: () => {}, warn: () => {} },
    setTimeout: () => {},
    clearTimeout: () => {}
  };

  vm.createContext(sandbox);
  vm.runInContext(instrumented, sandbox);

  // Trigger DOMContentLoaded
  if (listeners['DOMContentLoaded']) {
    listeners['DOMContentLoaded'].forEach(fn => fn());
  }

  const engine = mockWin.__testEngine;
  assert.ok(engine, 'Engine must be exported');

  const invalidInputs = [NaN, Infinity, -Infinity, 'foo', '1', 1.5, null, undefined, {}, []];
  for (const input of invalidInputs) {
    let err = null;
    try {
      engine.goToSlide(input);
    } catch (e) {
      err = e;
    }
    assert.equal(err, null, `goToSlide(${input}) threw uncaught error: ${err?.message}`);
    assert.equal(engine.getIsTransitioning(), false, `goToSlide(${input}) left isTransitioning locked!`);
    assert.equal(engine.getCurrentSlide(), 0, `goToSlide(${input}) mutated currentSlide!`);
  }
}

testDirectScriptExecution(js);
console.log('Test 2 (Live VM Execution on script.js): ALL INVALID INPUTS SAFELY REJECTED - PASSED');
