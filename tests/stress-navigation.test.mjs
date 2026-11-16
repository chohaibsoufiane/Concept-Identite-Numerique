/**
 * =============================================================================
 * Adversarial Navigation & Engine Stress-Testing Suite (Milestone 1)
 * =============================================================================
 * Target: script.js & index.html navigation engine, concurrency lock,
 * boundary clamping, and odometer calculation.
 * Execution: node --test tests/stress-navigation.test.mjs
 * =============================================================================
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT_DIR = process.cwd();
const htmlSource = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const scriptSource = fs.readFileSync(path.join(ROOT_DIR, 'script.js'), 'utf8');

// Parse slide sections from index.html
function parseSlides(html) {
  const slideRegex = /<section[^>]*class=["'][^"']*\bslide\b[^"']*["'][^>]*id=["']([^"']+)["'][^>]*>/gi;
  const slides = [];
  let match;
  while ((match = slideRegex.exec(html)) !== null) {
    slides.push({ id: match[1] });
  }
  return slides;
}

const parsedSlides = parseSlides(htmlSource);
const TOTAL_SLIDES = parsedSlides.length;

// ClassList mock
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

// Element mock
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
  addEventListener(event, fn, opts) {
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
  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }
  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parentNode = null;
    }
    return child;
  }
  querySelector(sel) {
    return null;
  }
  querySelectorAll(sel) {
    return [];
  }
}

/**
 * Creates an isolated mock DOM environment and runs script.js within it.
 * Instruments the internal navigation variables to expose them for verification.
 */
function createEngineEnvironment(slideCount = TOTAL_SLIDES) {
  const container = new MockElement('div', '', ['presentation-container']);
  const counterTrack = new MockElement('div', 'counterTrack', ['counter-track']);
  const prevBtn = new MockElement('button', 'prevBtn', ['nav-btn']);
  const nextBtn = new MockElement('button', 'nextBtn', ['nav-btn']);
  const navContainer = new MockElement('nav', '', ['presentation-nav']);

  const slides = [];
  for (let i = 0; i < slideCount; i++) {
    const s = new MockElement('section', `slide-${String(i + 1).padStart(2, '0')}`, ['slide']);
    slides.push(s);
  }

  // Timer mock
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
    addEventListener: (event, fn, opts) => {
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
      if (sel.includes('.huge-title')) return [];
      if (sel.includes('.video-container')) return [];
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

  // We append an inspection bridge inside DOMContentLoaded closure
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

  // Inject hook right before the closing of DOMContentLoaded in script.js
  const instrumentedScript = scriptSource.replace(/document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{([\s\S]*)\}\);?\s*$/, (m, inner) => {
    return `document.addEventListener('DOMContentLoaded', () => {\n${inner}\n${bridgeHook}\n});`;
  });

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

  // Trigger DOMContentLoaded
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
    },
    dispatchTouchSwipe: (deltaX) => {
      mockDocument.dispatchEvent({
        type: 'touchstart',
        changedTouches: [{ screenX: 100 }]
      });
      mockDocument.dispatchEvent({
        type: 'touchend',
        changedTouches: [{ screenX: 100 - deltaX }]
      });
    }
  };
}

// =============================================================================
// TESTS
// =============================================================================

test('Adversarial Navigation Stress Suite', async (t) => {

  await t.test('1. Engine Initialization & Default Invariants', () => {
    const env = createEngineEnvironment();
    const h = env.harness;

    assert.equal(h.getCurrentSlide(), 0, 'Initial slide must be 0');
    assert.equal(h.getTotalSlides(), TOTAL_SLIDES, `Total slides must be ${TOTAL_SLIDES}`);
    assert.equal(h.getIsTransitioning(), false, 'isTransitioning must be false on init');
    assert.equal(env.container.getAttribute('data-direction'), 'next');
    assert.equal(env.container.getAttribute('data-slide'), '1');
    assert.equal(env.counterTrack.style.transform, 'translateY(-0rem)');

    // Active slide invariant
    const activeSlides = env.slides.filter(s => s.classList.contains('active'));
    assert.equal(activeSlides.length, 1, 'Exactly one slide must have .active');
    assert.equal(activeSlides[0].id, 'slide-01', 'First slide must have .active');
  });

  await t.test('2. Sequential Forward & Backward Walkthrough with Exact Odometer Checking', () => {
    const env = createEngineEnvironment();
    const h = env.harness;

    // Full forward pass
    for (let i = 1; i < TOTAL_SLIDES; i++) {
      h.nextSlide();
      assert.equal(h.getIsTransitioning(), true, `Engine should be transitioning at step ${i}`);
      assert.equal(h.getCurrentSlide(), i, `currentSlide should be ${i}`);
      assert.equal(env.counterTrack.style.transform, `translateY(-${i * 3.5}rem)`, `Odometer at slide ${i + 1} must be -${i * 3.5}rem`);
      assert.equal(env.container.getAttribute('data-slide'), String(i + 1));

      // Active slide check
      assert.ok(env.slides[i].classList.contains('active'), `Slide #${i + 1} must have .active`);
      assert.ok(env.slides[i - 1].classList.contains('outgoing'), `Slide #${i} must have .outgoing`);

      // Complete transition
      env.advanceTime(1400);
      assert.equal(h.getIsTransitioning(), false, `Lock must release after 1400ms`);
      assert.ok(!env.slides[i - 1].classList.contains('outgoing'), `Slide #${i} outgoing must be cleared`);
    }

    assert.equal(h.getCurrentSlide(), TOTAL_SLIDES - 1, 'Must be at final slide');

    // Full backward pass
    for (let i = TOTAL_SLIDES - 2; i >= 0; i--) {
      h.prevSlide();
      assert.equal(h.getCurrentSlide(), i, `currentSlide should be ${i}`);
      assert.equal(env.counterTrack.style.transform, `translateY(-${i * 3.5}rem)`, `Odometer at slide ${i + 1} must be -${i * 3.5}rem`);
      env.advanceTime(1400);
      assert.equal(h.getIsTransitioning(), false);
    }

    assert.equal(h.getCurrentSlide(), 0, 'Must return to first slide');
    assert.equal(env.counterTrack.style.transform, 'translateY(-0rem)');
  });

  await t.test('3. Boundary Clamping: Upper Boundary (Overflow Protection)', () => {
    const env = createEngineEnvironment();
    const h = env.harness;

    // Jump to final slide
    h.goToSlide(TOTAL_SLIDES - 1, 'next');
    env.advanceTime(1400);
    assert.equal(h.getCurrentSlide(), TOTAL_SLIDES - 1);

    // Spam nextSlide() at the end
    for (let k = 0; k < 10; k++) {
      h.nextSlide();
      assert.equal(h.getCurrentSlide(), TOTAL_SLIDES - 1, 'nextSlide() must not increment past totalSlides - 1');
      assert.equal(h.getIsTransitioning(), false, 'isTransitioning must not engage on boundary reject');
    }

    // Spam goToSlide() with out of bounds numbers
    const oobTargets = [TOTAL_SLIDES, TOTAL_SLIDES + 1, 9999, Infinity];
    for (const target of oobTargets) {
      h.goToSlide(target, 'next');
      assert.equal(h.getCurrentSlide(), TOTAL_SLIDES - 1, `goToSlide(${target}) must be rejected`);
      assert.equal(h.getIsTransitioning(), false, `goToSlide(${target}) must not lock transition`);
    }

    // Verify odometer stayed clamped
    assert.equal(env.counterTrack.style.transform, `translateY(-${(TOTAL_SLIDES - 1) * 3.5}rem)`);
  });

  await t.test('4. Boundary Clamping: Lower Boundary (Underflow Protection)', () => {
    const env = createEngineEnvironment();
    const h = env.harness;
    assert.equal(h.getCurrentSlide(), 0);

    // Spam prevSlide() at origin
    for (let k = 0; k < 10; k++) {
      h.prevSlide();
      assert.equal(h.getCurrentSlide(), 0, 'prevSlide() at slide 0 must not decrement');
      assert.equal(h.getIsTransitioning(), false, 'isTransitioning must not engage on boundary reject');
    }

    // Spam goToSlide() with negative numbers
    const negTargets = [-1, -2, -100, -99999, -Infinity];
    for (const target of negTargets) {
      h.goToSlide(target, 'prev');
      assert.equal(h.getCurrentSlide(), 0, `goToSlide(${target}) must be rejected`);
      assert.equal(h.getIsTransitioning(), false, `goToSlide(${target}) must not lock transition`);
    }

    // Verify odometer stayed clamped
    assert.equal(env.counterTrack.style.transform, 'translateY(-0rem)');
  });

  await t.test('5. Re-entrancy Guard: goToSlide(currentSlide) is a No-Op', () => {
    const env = createEngineEnvironment();
    const h = env.harness;

    h.goToSlide(0, 'next');
    assert.equal(h.getCurrentSlide(), 0);
    assert.equal(h.getIsTransitioning(), false, 'goToSlide to current slide must not trigger transition');

    h.goToSlide(2, 'next');
    env.advanceTime(1400);
    assert.equal(h.getCurrentSlide(), 2);

    h.goToSlide(2, 'next');
    assert.equal(h.getCurrentSlide(), 2);
    assert.equal(h.getIsTransitioning(), false, 'goToSlide(2) when current is 2 must be no-op');
  });

  await t.test('6. Concurrency: Rapid Spamming During In-Flight Transition', () => {
    const env = createEngineEnvironment();
    const h = env.harness;

    // Start transition 0 -> 1
    h.nextSlide();
    assert.equal(h.getIsTransitioning(), true);
    assert.equal(h.getCurrentSlide(), 1);

    // Attempt rapid alternating spamming during transition window (t = 200ms)
    env.advanceTime(200);
    assert.equal(h.getIsTransitioning(), true);

    // Button clicks
    env.nextBtn.click();
    env.nextBtn.click();
    env.prevBtn.click();

    // Keyboard spam
    env.dispatchKeydown('ArrowRight');
    env.dispatchKeydown('ArrowLeft');
    env.dispatchKeydown(' ');

    // Touch spam
    env.dispatchTouchSwipe(100);
    env.dispatchTouchSwipe(-100);

    // Direct goToSlide calls
    h.goToSlide(3, 'next');
    h.goToSlide(0, 'prev');

    // Slide state must STILL be slide 1
    assert.equal(h.getCurrentSlide(), 1, 'All navigation attempts during transition must be rejected');
    assert.equal(env.counterTrack.style.transform, 'translateY(-3.5rem)');

    // Fast-forward to 1400ms
    env.advanceTime(1200);
    assert.equal(h.getIsTransitioning(), false, 'Lock must be released');
    assert.equal(h.getCurrentSlide(), 1, 'Final slide must still be 1 after all spammed calls were ignored');
    assert.ok(env.slides[1].classList.contains('active'));
    assert.ok(!env.slides[0].classList.contains('outgoing'));
  });

  await t.test('7. Adversarial Type Confusion & Non-Numeric Input Attacks on goToSlide()', () => {
    const env = createEngineEnvironment();
    const h = env.harness;

    // We test how the implementation behaves when fed invalid types
    const invalidInputs = [
      { name: 'NaN', val: NaN },
      { name: 'undefined', val: undefined },
      { name: 'null', val: null },
      { name: 'string "foo"', val: 'foo' },
      { name: 'string "1"', val: '1' },
      { name: 'float 1.5', val: 1.5 },
      { name: 'object {}', val: {} },
      { name: 'array []', val: [] }
    ];

    const results = [];

    for (const { name, val } of invalidInputs) {
      // Re-create a clean environment for each test
      const subEnv = createEngineEnvironment();
      const subH = subEnv.harness;
      let errorThrown = null;
      try {
        subH.goToSlide(val, 'next');
      } catch (err) {
        errorThrown = err;
      }

      const locked = subH.getIsTransitioning();
      const current = subH.getCurrentSlide();
      const activeCount = subEnv.slides.filter(s => s.classList.contains('active')).length;

      results.push({
        name,
        val,
        threw: errorThrown !== null,
        errorMsg: errorThrown ? errorThrown.message : null,
        locked,
        currentSlide: current,
        activeCount
      });
    }

    console.log('\n--- TYPE CONFUSION EMPIRICAL AUDIT RESULTS ---');
    results.forEach(r => {
      console.log(`Input: ${r.name} -> Threw: ${r.threw} (${r.errorMsg || 'none'}), Permanent Lock: ${r.locked}, Active Slide Count: ${r.activeCount}`);
    });
    console.log('-----------------------------------------------\n');

    // Empirical Vulnerability Assertion:
    // Any robust navigation engine MUST safely reject non-integer / non-numeric values
    // without throwing uncaught TypeErrors, locking isTransitioning permanently, or zeroing active slides.
    const fatalFailures = results.filter(r => r.threw || r.locked || r.activeCount !== 1);
    if (fatalFailures.length > 0) {
      console.error(`[VULNERABILITY CONFIRMED] ${fatalFailures.length} invalid inputs caused catastrophic engine failure (TypeError or permanent lock)!`);
    }

    const nanRes = results.find(r => r.name === 'NaN');
    assert.ok(nanRes, 'NaN test result must exist');

    // Assert that the engine does not throw uncaught TypeError on NaN
    assert.equal(nanRes.threw, false, `Engine crashed on goToSlide(NaN) with: ${nanRes.errorMsg}`);
    assert.equal(nanRes.locked, false, 'Engine permanently locked isTransitioning on NaN input');
    assert.equal(nanRes.activeCount, 1, 'Engine stripped .active from current slide on NaN input, leaving 0 active slides');
  });

  await t.test('8. High-Frequency Fuzzing: 5,000 Randomized Operations with Invariant Assertions', () => {
    const env = createEngineEnvironment();
    const h = env.harness;

    let totalOps = 5000;
    let seed = 42;
    function pseudoRandom() {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    }

    for (let op = 0; op < totalOps; op++) {
      const r = pseudoRandom();

      if (r < 0.25) {
        // Forward button / key
        env.nextBtn.click();
      } else if (r < 0.50) {
        // Backward button / key
        env.prevBtn.click();
      } else if (r < 0.70) {
        // Random direct valid jump
        const target = Math.floor(pseudoRandom() * TOTAL_SLIDES);
        h.goToSlide(target, pseudoRandom() > 0.5 ? 'next' : 'prev');
      } else if (r < 0.85) {
        // Random out of bounds jump
        const oob = pseudoRandom() > 0.5 ? -Math.floor(pseudoRandom() * 50) - 1 : TOTAL_SLIDES + Math.floor(pseudoRandom() * 50);
        h.goToSlide(oob, 'next');
      } else {
        // Advance time partially or fully
        const timeAdvance = Math.floor(pseudoRandom() * 2000);
        env.advanceTime(timeAdvance);
      }

      // Assert invariants at each fuzzing iteration
      const current = h.getCurrentSlide();
      assert.ok(current >= 0 && current < TOTAL_SLIDES, `Invariant violation: currentSlide=${current} out of bounds`);

      const activeSlides = env.slides.filter(s => s.classList.contains('active'));
      assert.equal(activeSlides.length, 1, `Invariant violation: found ${activeSlides.length} active slides at op ${op}`);

      // Counter track style
      const expectedTransform = `translateY(-${current * 3.5}rem)`;
      assert.equal(env.counterTrack.style.transform, expectedTransform, `Odometer mismatch at op ${op}`);

      // Container data-slide
      assert.equal(env.container.getAttribute('data-slide'), String(current + 1));
    }
  });

});
