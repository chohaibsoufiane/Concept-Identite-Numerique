/**
 * =============================================================================
 * Challenger 2: Extended Adversarial Navigation Stress Test Suite
 * =============================================================================
 * Target: script.js goToSlide() sanitization, concurrency lock, and invariants.
 * Execution: node --test tests/stress-challenger-m1it2.test.mjs
 * =============================================================================
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT_DIR = process.cwd();
const scriptSource = fs.readFileSync(path.join(ROOT_DIR, 'script.js'), 'utf8');

class MockClassList {
  constructor(initial = []) {
    this._classes = new Set(initial);
  }
  add(...names) {
    names.forEach(n => this._classes.add(n));
  }
  remove(...names) {
    names.forEach(n => this._classes.delete(n));
  }
  contains(name) {
    return this._classes.has(name);
  }
  get value() {
    return Array.from(this._classes).join(' ');
  }
}

class MockElement {
  constructor(tagName, id = '', classNames = []) {
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.classList = new MockClassList(classNames);
    this.attributes = new Map();
    this.style = {
      _props: {},
      setProperty: (k, v) => { this.style._props[k] = v; },
      getPropertyValue: (k) => this.style._props[k],
      transform: ''
    };
    this.children = [];
    this.parentNode = null;
    this.listeners = {};
    this.innerHTML = '';
    this.textContent = '';
  }
  setAttribute(k, v) { this.attributes.set(k, String(v)); }
  getAttribute(k) { return this.attributes.has(k) ? this.attributes.get(k) : null; }
  removeAttribute(k) { this.attributes.delete(k); }
  get offsetWidth() { return 100; }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  dispatchEvent(event) {
    const list = this.listeners[event.type || event] || [];
    list.forEach(fn => fn(event));
  }
  click() {
    this.dispatchEvent({ type: 'click' });
  }
  querySelector() { return null; }
  querySelectorAll() { return []; }
}

function createEngineEnvironment(slideCount = 22) {
  const container = new MockElement('div', '', ['presentation-container']);
  const counterTrack = new MockElement('div', 'counterTrack', ['counter-track']);
  const prevBtn = new MockElement('button', 'prevBtn', ['nav-btn']);
  const nextBtn = new MockElement('button', 'nextBtn', ['nav-btn']);
  const navContainer = new MockElement('nav', '', ['presentation-nav']);

  const slides = [];
  for (let i = 0; i < slideCount; i++) {
    const s = new MockElement('section', `slide-${String(i + 1).padStart(2, '0')}`, i === 0 ? ['slide', 'active'] : ['slide']);
    slides.push(s);
  }

  let currentTime = 0;
  const timers = [];
  let timerIdSeq = 1;

  function mockSetTimeout(fn, delay = 0) {
    const id = timerIdSeq++;
    timers.push({ id, fn, triggerAt: currentTime + delay });
    return id;
  }

  function mockClearTimeout(id) {
    const idx = timers.findIndex(t => t.id === id);
    if (idx !== -1) timers.splice(idx, 1);
  }

  function advanceTime(ms) {
    currentTime += ms;
    timers.sort((a, b) => a.triggerAt - b.triggerAt);
    while (timers.length > 0 && timers[0].triggerAt <= currentTime) {
      const nextTimer = timers.shift();
      nextTimer.fn();
    }
  }

  const documentListeners = {};
  const mockDocument = {
    title: 'Production des Formes Imprimantes — Les Plaques Offset',
    addEventListener: (event, fn) => {
      if (!documentListeners[event]) documentListeners[event] = [];
      documentListeners[event].push(fn);
    },
    dispatchEvent: (event) => {
      const list = documentListeners[event.type || event] || [];
      list.forEach(fn => fn(event));
    },
    querySelector: (sel) => {
      if (sel === '.presentation-container') return container;
      if (sel === '.presentation-nav') return navContainer;
      return null;
    },
    querySelectorAll: (sel) => {
      if (sel === '.slide') return slides;
      return [];
    },
    getElementById: (id) => {
      if (id === 'prevBtn') return prevBtn;
      if (id === 'nextBtn') return nextBtn;
      if (id === 'counterTrack') return counterTrack;
      if (id === 'videoBackdrop') return new MockElement('div', 'videoBackdrop');
      if (id === 'videoCloseBtn') return new MockElement('button', 'videoCloseBtn');
      if (id.startsWith('electron-')) return new MockElement('button', id);
      return null;
    },
    createElement: (tag) => new MockElement(tag),
    createTextNode: (txt) => ({ textContent: txt }),
    body: new MockElement('body'),
    documentElement: new MockElement('html')
  };

  const mockWindow = {
    location: { hash: '', search: '' },
    document: mockDocument,
    addEventListener: (e, fn) => mockDocument.addEventListener(e, fn),
    electronAPI: null
  };

  const bridgeHook = `
    window.__harness = {
      goToSlide,
      nextSlide,
      prevSlide,
      getCurrentSlide: () => currentSlide,
      setCurrentSlide: (v) => { currentSlide = v; },
      getIsTransitioning: () => isTransitioning,
      setIsTransitioning: (v) => { isTransitioning = v; },
      getTotalSlides: () => totalSlides,
      getCounterTrack: () => counterTrack,
      getContainer: () => container,
      getSlides: () => slides,
      updateProgress
    };
  `;

  const instrumentedScript = scriptSource.replace(
    /document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{([\s\S]*)\}\);?\s*$/,
    (m, inner) => `document.addEventListener('DOMContentLoaded', () => {\n${inner}\n${bridgeHook}\n});`
  );

  const sandbox = {
    document: mockDocument,
    window: mockWindow,
    console: { log: () => {}, error: () => {}, warn: () => {} },
    setTimeout: mockSetTimeout,
    clearTimeout: mockClearTimeout,
    void: () => {}
  };

  vm.createContext(sandbox);
  vm.runInContext(instrumentedScript, sandbox);

  const dclListeners = documentListeners['DOMContentLoaded'] || [];
  dclListeners.forEach(fn => fn());

  const harness = mockWindow.__harness;

  return {
    harness,
    container,
    counterTrack,
    prevBtn,
    nextBtn,
    slides,
    advanceTime,
    dispatchKeydown: (key) => {
      mockDocument.dispatchEvent({ type: 'keydown', key, preventDefault: () => {} });
    }
  };
}

test('Challenger 2 Navigation Stress & Adversarial Suite', async (t) => {

  await t.test('1. Baseline 8 Invalid Input Rejection Verification', () => {
    const baselineAttacks = [
      { name: 'NaN', val: NaN },
      { name: 'undefined', val: undefined },
      { name: 'null', val: null },
      { name: 'string "foo"', val: 'foo' },
      { name: 'string "1"', val: '1' },
      { name: 'float 1.5', val: 1.5 },
      { name: 'object {}', val: {} },
      { name: 'array []', val: [] }
    ];

    for (const attack of baselineAttacks) {
      const env = createEngineEnvironment();
      const h = env.harness;

      assert.equal(h.getCurrentSlide(), 0);
      assert.equal(h.getIsTransitioning(), false);

      let threw = false;
      let error = null;
      try {
        h.goToSlide(attack.val, 'next');
      } catch (err) {
        threw = true;
        error = err;
      }

      assert.equal(threw, false, `Attack ${attack.name} threw an uncaught error: ${error?.message}`);
      assert.equal(h.getIsTransitioning(), false, `Attack ${attack.name} permanently locked isTransitioning`);
      assert.equal(h.getCurrentSlide(), 0, `Attack ${attack.name} altered currentSlide`);

      const activeSlides = env.slides.filter(s => s.classList.contains('active'));
      assert.equal(activeSlides.length, 1, `Attack ${attack.name} resulted in ${activeSlides.length} active slides instead of 1`);
      assert.equal(activeSlides[0], env.slides[0], `Attack ${attack.name} corrupted active slide reference`);
    }
  });

  await t.test('2. Extended Type Confusion Attack Vectors', () => {
    const extendedAttacks = [
      { name: 'empty string ""', val: '' },
      { name: 'whitespace string "  "', val: '  ' },
      { name: 'zero string "0"', val: '0' },
      { name: 'negative string "-1"', val: '-1' },
      { name: 'float 0.1', val: 0.1 },
      { name: 'float 1e-15', val: 1e-15 },
      { name: 'float 1.0000000000000002', val: 1.0000000000000002 },
      { name: 'array [0]', val: [0] },
      { name: 'array [1, 2]', val: [1, 2] },
      { name: 'boolean true', val: true },
      { name: 'boolean false', val: false },
      { name: 'BigInt 0n', val: 0n },
      { name: 'BigInt 1n', val: 1n },
      { name: 'BigInt 100n', val: 100n },
      { name: 'Symbol("nav")', val: Symbol('nav') },
      { name: 'Function () => 1', val: () => 1 },
      { name: 'Object with valueOf', val: { valueOf: () => 1 } },
      { name: 'Object with toString', val: { toString: () => '1' } },
      { name: 'Infinity', val: Infinity },
      { name: '-Infinity', val: -Infinity },
      { name: 'Number.MIN_VALUE', val: Number.MIN_VALUE },
      { name: 'Number.EPSILON', val: Number.EPSILON },
      { name: 'Negative float -0.5', val: -0.5 },
      { name: 'Negative subnormal -1e-20', val: -1e-20 }
    ];

    for (const attack of extendedAttacks) {
      const env = createEngineEnvironment();
      const h = env.harness;

      let threw = false;
      let error = null;
      try {
        h.goToSlide(attack.val, 'next');
      } catch (err) {
        threw = true;
        error = err;
      }

      assert.equal(threw, false, `Extended attack ${attack.name} threw: ${error?.message}`);
      assert.equal(h.getIsTransitioning(), false, `Extended attack ${attack.name} locked isTransitioning`);
      assert.equal(h.getCurrentSlide(), 0, `Extended attack ${attack.name} moved slide`);

      const activeSlides = env.slides.filter(s => s.classList.contains('active'));
      assert.equal(activeSlides.length, 1, `Extended attack ${attack.name} active count mismatch`);
    }
  });

  await t.test('3. Extreme Integer Boundaries & Zero Variants', () => {
    // Testing -0, MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, out of bounds integers
    const env = createEngineEnvironment();
    const h = env.harness;

    // Test -0: in JS, -0 is an integer, -0 === 0 is true.
    // When currentSlide is 0, goToSlide(-0) must be a clean no-op because index === currentSlide.
    h.goToSlide(-0, 'next');
    assert.equal(h.getCurrentSlide(), 0);
    assert.equal(h.getIsTransitioning(), false);

    // Now transition to slide 1
    h.goToSlide(1, 'next');
    assert.equal(h.getIsTransitioning(), true);
    env.advanceTime(1400);
    assert.equal(h.getIsTransitioning(), false);
    assert.equal(h.getCurrentSlide(), 1);

    // From slide 1, goToSlide(-0) is equivalent to goToSlide(0).
    // It should cleanly transition back to slide 0!
    h.goToSlide(-0, 'prev');
    assert.equal(h.getIsTransitioning(), true);
    assert.ok(h.getCurrentSlide() === 0);
    env.advanceTime(1400);
    assert.equal(h.getIsTransitioning(), false);
    assert.ok(h.getCurrentSlide() === 0);

    // Test extreme integers:
    const extremeIntegers = [
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER + 1,
      -1,
      -999999,
      22,
      23,
      1000000
    ];

    for (const val of extremeIntegers) {
      const prevSlide = h.getCurrentSlide();
      h.goToSlide(val, 'next');
      assert.equal(h.getIsTransitioning(), false, `goToSlide(${val}) should be rejected`);
      assert.equal(h.getCurrentSlide(), prevSlide);
    }
  });

  await t.test('4. Direction Parameter Poisoning & Edge Cases', () => {
    const maliciousDirections = [
      null,
      undefined,
      '',
      '   ',
      '<script>alert("xss")</script>',
      'DROP TABLE slides;',
      'next\n\r',
      12345,
      { toString: () => 'custom' },
      'very-long-direction-'.repeat(500)
    ];

    for (const dir of maliciousDirections) {
      const env = createEngineEnvironment();
      const h = env.harness;

      let threw = false;
      try {
        h.goToSlide(1, dir);
      } catch (err) {
        threw = true;
      }

      assert.equal(threw, false, `Direction poison ${String(dir)} caused uncaught error`);
      assert.equal(h.getCurrentSlide(), 1);
      assert.equal(h.getIsTransitioning(), true);

      // Verify DOM didn't crash and direction attribute was safely set
      const expectedDir = dir === undefined ? 'next' : String(dir);
      assert.equal(env.container.getAttribute('data-direction'), expectedDir);

      env.advanceTime(1400);
      assert.equal(h.getIsTransitioning(), false);
      const activeSlides = env.slides.filter(s => s.classList.contains('active'));
      assert.equal(activeSlides.length, 1);
    }
  });

  await t.test('5. Rapid Concurrent Key/Click Hammer (10,000 Operations)', () => {
    const env = createEngineEnvironment();
    const h = env.harness;

    let totalHammerOps = 10000;
    let seed = 1337;
    function prng() {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    }

    for (let op = 0; op < totalHammerOps; op++) {
      const r = prng();

      if (r < 0.15) {
        env.nextBtn.click();
      } else if (r < 0.30) {
        env.prevBtn.click();
      } else if (r < 0.45) {
        env.dispatchKeydown('ArrowRight');
      } else if (r < 0.60) {
        env.dispatchKeydown('ArrowLeft');
      } else if (r < 0.70) {
        env.dispatchKeydown(' ');
      } else if (r < 0.80) {
        // Attack: inject invalid types into goToSlide during concurrent hammer
        const invalidTypes = [NaN, undefined, null, 'foo', '1', 1.5, {}, [], 0n, Symbol('a'), Infinity];
        const attackVal = invalidTypes[Math.floor(prng() * invalidTypes.length)];
        h.goToSlide(attackVal, 'next');
      } else if (r < 0.90) {
        // Direct jump to valid or invalid slide index
        const target = Math.floor(prng() * 40) - 10; // Range [-10, 29]
        h.goToSlide(target, prng() > 0.5 ? 'next' : 'prev');
      } else {
        // Advance time by arbitrary delta [0..2000]ms
        const dt = Math.floor(prng() * 2000);
        env.advanceTime(dt);
      }

      // Assert Invariants at each operation:
      const current = h.getCurrentSlide();
      assert.ok(current >= 0 && current < 22, `Current slide ${current} out of bounds at op ${op}`);

      const activeSlides = env.slides.filter(s => s.classList.contains('active'));
      assert.equal(activeSlides.length, 1, `Expected exactly 1 active slide, found ${activeSlides.length} at op ${op}`);

      const dataSlide = env.container.getAttribute('data-slide');
      assert.equal(dataSlide, String(current + 1), `data-slide attribute out of sync at op ${op}`);

      const expectedTransform = `translateY(-${current * 3.5}rem)`;
      assert.equal(env.counterTrack.style.transform, expectedTransform, `Odometer out of sync at op ${op}`);
    }

    // Flush any pending timers
    env.advanceTime(2000);
    assert.equal(h.getIsTransitioning(), false, 'isTransitioning lock must be released after hammer completed');
    assert.equal(env.slides.filter(s => s.classList.contains('active')).length, 1);
    assert.equal(env.slides.filter(s => s.classList.contains('outgoing')).length, 0);
  });

  await t.test('6. Race Condition: Microsecond Interleaved Rapid Calls during In-Flight Window', () => {
    const env = createEngineEnvironment();
    const h = env.harness;

    // Trigger transition 0 -> 1
    h.goToSlide(1, 'next');
    assert.equal(h.getIsTransitioning(), true);
    assert.equal(h.getCurrentSlide(), 1);

    // Microsecond advance: 100ms into 1400ms transition
    env.advanceTime(100);
    assert.equal(h.getIsTransitioning(), true);

    // Rapid bombardment while in flight
    for (let i = 0; i < 50; i++) {
      h.goToSlide(2, 'next');
      h.goToSlide(0, 'prev');
      h.nextSlide();
      h.prevSlide();
      env.nextBtn.click();
      env.prevBtn.click();
      env.dispatchKeydown('ArrowRight');
      env.dispatchKeydown('ArrowLeft');
      h.goToSlide(NaN);
      h.goToSlide('invalid');
    }

    // Still must be slide 1
    assert.equal(h.getCurrentSlide(), 1);
    assert.equal(h.getIsTransitioning(), true);

    // Advance to 1399ms (1ms before transition duration)
    env.advanceTime(1299);
    assert.equal(h.getIsTransitioning(), true);
    assert.equal(h.getCurrentSlide(), 1);

    // Advance 1ms to 1400ms (exact boundary)
    env.advanceTime(1);
    assert.equal(h.getIsTransitioning(), false, 'Lock must be cleanly released at exactly 1400ms');
    assert.equal(h.getCurrentSlide(), 1);
    assert.ok(env.slides[1].classList.contains('active'));
    assert.ok(!env.slides[0].classList.contains('outgoing'));

    // Now a legitimate next call should immediately succeed
    h.goToSlide(2, 'next');
    assert.equal(h.getIsTransitioning(), true);
    assert.equal(h.getCurrentSlide(), 2);
    env.advanceTime(1400);
    assert.equal(h.getIsTransitioning(), false);
    assert.equal(h.getCurrentSlide(), 2);
  });

});
