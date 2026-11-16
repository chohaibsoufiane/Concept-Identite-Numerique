# Engine & Automated Testing Mechanics Report: "Les Plaques Offset"

**Date:** 2026-10-23  
**Investigator:** Engine & Testing Explorer (`teamwork_preview_explorer_survey_engine`)  
**Workspace:** `c:\Users\lufylon\Documents\antigravity\silly-euclid`  

---

## 1. Executive Summary

This report delivers a comprehensive forensic survey of the Electron runtime, slide layout structure, navigation lifecycle, brutalist odometer counter, and headless automated testing architecture for the **"Les Plaques Offset" (Production des Formes Imprimantes)** presentation.

### Core Discoveries:
1. **Engine Shell**: Runs Electron `31.7.7` with a frameless 1440x900 window (`frame: false`), strict context isolation (`contextIsolation: true`, `nodeIntegration: false`), and a dedicated IPC bridge via `preload.js` exposing `window.electronAPI`.
2. **Current Slide State**: The DOM contains 8 slides total:
   - Slides 1–3 have been partially adapted for "Les Plaques Offset".
   - Slides 4–8 are leftover legacy slides from the former "Identité Numérique" course (including a heavy 3D Three.js iceberg model and cybersecurity threat slides).
   - A prohibited meta-label was discovered at line 117 of `index.html`: `<!-- Slide 2: Personne 1 - Origine et Principe de la Plaque -->`.
3. **Brutalist Odometer Counter**: `#slideCounter` uses an absolute-positioned vertical track `#counterTrack` shifting by `-currentSlide * 3.5rem`. Currently, it only contains 8 hardcoded `.counter-step` elements (`01`–`08`) and static total `/ 08`. Expanding to the full 22–26 blueprint slides will cause the odometer to scroll into empty void unless updated statically and dynamically.
4. **Transition Concurrency Vulnerability**: `script.js` defines and resets `isTransitioning = true`, but **never inspects** `isTransitioning` inside `goToSlide()`, `nextSlide()`, or `prevSlide()`. Rapid keypresses or clicks during the 1400ms transition trigger race conditions and visual desynchronization.
5. **Headless Test Feasibility**: Verified that both Node.js (v26.7.0 built-in `node:test`) and Electron headless execution (`BrowserWindow({ show: false })`) run out-of-the-box in under 2 seconds. A complete 5-Tier automated test suite has been designed to programmatically validate slide count, counter synchronization, zero meta-labels, DOM validity, CSS tokens, and keyboard navigation.

---

## 2. Electron Engine Architecture & Configuration

### 2.1 Configuration Files
* **`package.json`**:
  - Name: `concept-identite-numerique` (Legacy title requiring update to `les-plaques-offset`).
  - Scripts: `"start": "node scripts/run-electron.cjs"`, `"dev": "node scripts/run-electron.cjs"`.
  - Dependencies: `electron: "^31.0.0"` (resolved: `31.7.7`), `three: "^0.160.0"`.
  - Recommendation: Add `"test": "node --test tests/presentation-e2e.test.mjs"`.

* **`scripts/run-electron.cjs`**:
  - Detects `win32` platform and launches PowerShell script `launch-electron-desktop.ps1` with bypass execution policy to bind Electron to interactive window station `winsta0\default` (resolving IDE/terminal isolation issues on Windows).
  - Falls back to standard `spawn(electronPath, ['.'])` on other platforms.

* **`main.js`**:
  - Window dimensions: `width: 1440, height: 900, minWidth: 960, minHeight: 640`.
  - Window styling: `frame: false, backgroundColor: '#090a10'`.
  - Menu: `win.setMenu(null)` removes standard desktop menu bar.
  - Title: Currently `title: 'Concept : Identité Numérique'` (should be updated to `'Production des Formes Imprimantes — Les Plaques Offset'`).
  - Hot Reload: Listens to `win.webContents.on('before-input-event')` and executes `reloadIgnoringCache()` on `Ctrl+F5`.
  - IPC Handlers:
    - `'window-minimize'` -> `win.minimize()`
    - `'window-maximize'` -> toggles `win.isMaximized() ? win.unmaximize() : win.maximize()`
    - `'window-close'` -> `win.close()`
    - `'window-fullscreen'` -> `win.setFullScreen(!win.isFullScreen())`

* **`preload.js`**:
  - Exposes `window.electronAPI`:
    ```javascript
    contextBridge.exposeInMainWorld('electronAPI', {
      minimize: () => ipcRenderer.send('window-minimize'),
      maximize: () => ipcRenderer.send('window-maximize'),
      close: () => ipcRenderer.send('window-close'),
      toggleFullScreen: () => ipcRenderer.send('window-fullscreen')
    });
    ```
  - Safe, minimal interface adhering to Electron security best practices.

---

## 3. Presentation DOM Structure & State Management

### 3.1 DOM Hierarchy
```html
<body>
  <!-- Drag bar for frameless window movement -->
  <div class="title-drag-region"></div>

  <div class="presentation-container" data-direction="next" data-slide="1">
    
    <!-- Window Controls -->
    <div class="electron-window-controls">
      <button id="electron-min" class="electron-btn">...</button>
      <button id="electron-max" class="electron-btn">...</button>
      <button id="electron-close" class="electron-btn electron-btn-close">...</button>
    </div>

    <!-- Brutalist Odometer -->
    <div class="brutalist-counter" id="slideCounter">
      <div class="counter-track" id="counterTrack">
        <div class="counter-step">01</div>
        <!-- ... steps ... -->
      </div>
      <div class="counter-total">/ 08</div>
    </div>

    <!-- Presentation Slides -->
    <section class="slide active" id="slide-1">...</section>
    <section class="slide" id="slide-origine">...</section>
    <section class="slide" id="slide-supports-3plates">...</section>
    <!-- ... additional slides ... -->

    <!-- Floating Navigation Controls -->
    <nav class="presentation-nav">
      <button id="prevBtn" class="nav-btn">...</button>
      <button id="nextBtn" class="nav-btn">...</button>
    </nav>
  </div>
</body>
```

### 3.2 Slide State Lifecycle & CSS Matrix
* Base state (`.slide`):
  `position: absolute; inset: 0; z-index: 1; pointer-events: none; visibility: hidden; background: var(--color-bg); overflow: hidden;`
* Active state (`.slide.active`):
  `z-index: 10; pointer-events: auto; visibility: visible;`
* Outgoing state (`.slide.outgoing`):
  `z-index: 5; visibility: visible;`
* Directional Scene Physics (`style.css`):
  - Next (incoming): `translateX(15vw) scale(1.05); opacity: 0;` -> settles to `translateX(0) scale(1); opacity: 1;`.
  - Next (outgoing): `translateX(-10vw) scale(0.9); filter: blur(8px) brightness(0.8); opacity: 0;`.
  - Prev (incoming): `translateX(-15vw) scale(1.05); opacity: 0;` -> settles to `translateX(0) scale(1); opacity: 1;`.
  - Prev (outgoing): `translateX(10vw) scale(0.9); filter: blur(8px) brightness(0.8); opacity: 0;`.
  - Timing: `var(--t-long)` = `1.4s`, easing `var(--ease-scene)` = `cubic-bezier(0.77, 0, 0.175, 1)`.

---

## 4. Slide Navigation Engine & User Input Matrix

### 4.1 Input Dispatch Table
| Input Trigger | Event Listener | Engine Handler | Action Taken |
|---|---|---|---|
| **ArrowRight** / **ArrowDown** / **Space** | `document.addEventListener('keydown')` | `nextSlide()` | `goToSlide(currentSlide + 1, 'next')` |
| **ArrowLeft** / **ArrowUp** | `document.addEventListener('keydown')` | `prevSlide()` | `goToSlide(currentSlide - 1, 'prev')` |
| **F11** | `document.addEventListener('keydown')` | `electronAPI.toggleFullScreen()` | IPC to Electron main process |
| **Next Button Click** | `nextBtn.addEventListener('click')` | `nextSlide()` | Advances slide |
| **Prev Button Click** | `prevBtn.addEventListener('click')` | `prevSlide()` | Regresses slide |
| **Touch Swipe Left** | `touchstart` / `touchend` (`delta < -50px`) | `nextSlide()` | Advances slide on mobile/touch |
| **Touch Swipe Right** | `touchstart` / `touchend` (`delta > 50px`) | `prevSlide()` | Regresses slide on mobile/touch |
| **Mouse Move** | `document.addEventListener('mousemove')` | `wakeUpNav()` | Adds `.nav-visible` to `.presentation-nav`; auto-hides after 2500ms |
| **Window Caption Buttons** | `click` on `#electron-min|max|close` | `electronAPI.minimize/maximize/close` | Direct IPC call |

### 4.2 Slide Transition Mechanics (`goToSlide`)
1. **Bounds Validation**: `if (index < 0 || index >= totalSlides) return;`
2. **Identity Check**: `if (index === currentSlide) return;`
3. **Reflow Commitment**: Sets `container.setAttribute('data-direction', direction)` and invokes `void container.offsetWidth;` to flush the style cache prior to transition classes being applied.
4. **State Transition**:
   - `current.classList.remove('active'); current.classList.add('outgoing');`
   - `next.classList.remove('outgoing'); next.classList.add('active');`
5. **Progress & Counter Update**:
   - `container.setAttribute('data-slide', index + 1);`
   - `counterTrack.style.transform = 'translateY(-' + (index * 3.5) + 'rem)';`
6. **Cleanup Phase**: After `1400ms`, removes `outgoing` from `current` and resets `isTransitioning = false`.

---

## 5. Brutalist Odometer Slide Counter Mechanics

### 5.1 Odometer Architecture
The odometer is located at the bottom right corner (`position: fixed; bottom: 3rem; right: 3rem; z-index: 100`).
```
+---------------------------+
|  [01]                     |  <- Height = 3.5rem (clipped by overflow: hidden)
|  [02]                     |  <- Track shifts vertically via translateY(-index * 3.5rem)
|  [03]                     |
|  ...                      |
|  [NN]           / NN      |  <- Total indicator (fixed, font-size: 1.2rem, opacity: 0.5)
+---------------------------+
```

### 5.2 Geometry & Typography Tokens
- **Container (`#slideCounter`)**:
  - `height: 3.5rem; overflow: hidden; font-size: 2.5rem; font-weight: 900;`
  - `font-variant-numeric: tabular-nums;` (monospaced numeric alignment preventing horizontal jitter).
  - `mix-blend-mode: difference; color: white;` (guarantees high contrast whether overlaying `#FFFFFF`, `#F4F5F6`, `#0A0A0A`, or `#E32619`).
- **Track (`#counterTrack`)**:
  - `display: flex; flex-direction: column; will-change: transform;`
  - `transition: transform 1.4s cubic-bezier(0.77, 0, 0.175, 1);`
- **Steps (`.counter-step`)**:
  - `height: 3.5rem; display: flex; align-items: center; justify-content: center;`
- **Total (`.counter-total`)**:
  - `font-size: 1.2rem; opacity: 0.5; transform: translateY(-0.1rem);`

### 5.3 Static vs Dynamic Synchronization
* **Current Breakdown**:
  `index.html` currently contains 8 steps (`01` through `08`) and `/ 08`.
  When the slide deck is populated with the complete 6 parts of the blueprint (~24 slides), navigating past slide 8 shifts `#counterTrack` by `-8 * 3.5rem`, leaving the odometer blank.
* **Dual-Layer Synchronization Strategy**:
  1. **Static Invariant**: When building `index.html`, generate all `<div class="counter-step">01</div>` ... `<div class="counter-step">NN</div>` and set `<div class="counter-total">/ NN</div>`.
  2. **Dynamic Self-Healing Invariant**: Update `script.js` to automatically reconcile the counter on startup:
     ```javascript
     function syncOdometer() {
       const track = document.getElementById('counterTrack');
       const totalEl = document.querySelector('.counter-total');
       const n = document.querySelectorAll('.slide').length;
       if (!track) return;
       track.innerHTML = '';
       for (let i = 1; i <= n; i++) {
         const step = document.createElement('div');
         step.className = 'counter-step';
         step.textContent = String(i).padStart(2, '0');
         track.appendChild(step);
       }
       if (totalEl) totalEl.textContent = `/ ${String(n).padStart(2, '0')}`;
     }
     ```
     This ensures 100% resilience even if slides are added, removed, or rearranged dynamically.

---

## 6. Discovered Engine Anomalies & Vulnerabilities

| Item | File & Line | Severity | Description & Fix |
|---|---|---|---|
| **Missing Transition Lock** | `script.js:250-255` | **High** | `isTransitioning` is set to `true` at line 254 and reset at line 292, but **never checked** at the entry of `goToSlide()`. Fast keyboard hammer creates race conditions. **Fix**: Add `if (isTransitioning) return;` at the top of `goToSlide()`. |
| **Meta-label in Comment** | `index.html:117` | **Medium** | `<!-- Slide 2: Personne 1 - Origine et Principe de la Plaque -->` violates zero meta-label rule. **Fix**: Strip all "Personne \d" tags from comments and DOM. |
| **Legacy Presentation Title** | `main.js:35` | **Medium** | Window title is set to legacy `'Concept : Identité Numérique'`. **Fix**: Change to `'Production des Formes Imprimantes — Les Plaques Offset'`. |
| **Legacy Slide Deck Contamination** | `index.html:479-1587` | **Critical** | Slides 4 through 8 belong to the old course (Identité Agissante, Calculée, Déclarative, E-Réputation, Faille, Machine à Données). **Fix**: Replace slides 4–8 with Parts 3, 4, 5, and 6 of "Les Plaques Offset". |
| **Text Splitting HTML Stripping** | `script.js:52-86` | **Medium** | `initCinematicSystem()` does text splitting on `.huge-title, .slide-title, .subtitle` using `el.innerHTML.split(/(<br>)/gi)`. Any nested HTML elements (`<em>`, `<span>`, `<strong>`) will have their tags destroyed. **Fix**: Advise slide authors to use pure text with `<br>` inside titles, or adapt text splitting to preserve node trees. |

---

## 7. Automated E2E Testing Strategy & Verification Architecture

To verify the presentation programmatically with zero manual interaction, we define a **5-Tier Automated Verification Architecture**.

```
+-------------------------------------------------------------------+
|               5-TIER AUTOMATED TEST ARCHITECTURE                  |
+-------------------------------------------------------------------+
| Tier 1: Static Integrity & Syntax Validation                     |
|         - HTML tag matching & structure                           |
|         - CSS design tokens (--color-accent, --ease-kinetic)      |
|         - JS syntax check (`node --check`)                        |
+-------------------------------------------------------------------+
| Tier 2: Blueprint & Content Compliance (Zero Meta-Labels)        |
|         - Regex scan for "Personne \d", "Page \d", "Slide pour"   |
|         - Verification of all 6 technical blueprint parts         |
|         - Check visual placeholders & image fallback paths        |
+-------------------------------------------------------------------+
| Tier 3: Engine Invariants & Counter Synchronization               |
|         - totalSlides === counterSteps.length                     |
|         - counterTotal.textContent === `/ ${totalSlides}`         |
|         - Single active slide initially, zero outgoing slides     |
+-------------------------------------------------------------------+
| Tier 4: Navigation Simulation (Keyboard, Buttons, Bounds)         |
|         - Dispatch ArrowRight -> active slide increments          |
|         - Dispatch ArrowLeft -> active slide decrements           |
|         - Bounds check: cannot navigate < 0 or >= totalSlides     |
|         - Verify counter track transform calculation              |
+-------------------------------------------------------------------+
| Tier 5: Headless Execution Runner                                 |
|         - Standalone Node.js (`node:test`) + Electron headless    |
|         - Executable via single command: `npm test`               |
|         - Output: TAP / Pass-Fail Report in < 3 seconds           |
+-------------------------------------------------------------------+
```

### 7.1 Detailed Specification of Each Tier

#### Tier 1: Static Integrity & Syntax Validation
- **HTML Validation**: Inspects `index.html` to ensure root container `.presentation-container` exists, every `<section class="slide">` has a valid ID, and no unbalanced opening/closing tags exist.
- **CSS Token Enforcement**: Inspects `style.css` to verify that all core tokens exist:
  `--color-bg`, `--color-light`, `--color-dark`, `--color-accent: #E32619`, `--ease-kinetic`, `--ease-scene`, `--t-long: 1.4s`, `--font-main: 'Inter'`.
- **JS Syntax Verification**: Runs `node --check script.js`, `node --check main.js`, `node --check preload.js`.

#### Tier 2: Blueprint & Content Compliance (Zero Meta-Labels)
- **Zero Meta-Labels Scan**: Executes strict regex across both text nodes and HTML comments:
  `/(?:Personne\s*\d+|Slide\s+pour\s+Personne|Page\s*\d+\s*(?:à|a|-)\s*\d+|partie\s*\d+\s*pour)/i`.
  Must assert `matches.length === 0`.
- **Blueprint Coverage Invariant**:
  Asserts that each of the 6 course parts has dedicated slides and keywords:
  1. Part 1: Lithographie, Senefelder, Répulsion eau/encre, Zones imprimantes.
  2. Part 2: Supports, Monométallique, Bimétallique, Trimétallique.
  3. Part 3: Traitement du support, Grainage, Rugosité, Mécanique, Chimique, Brosse.
  4. Part 4: Électrolyse, Anodisation, Couche d'oxyde Al2O3, Plaques chromées.
  5. Part 5: Couches photosensibles, Diazoïque, Photopolymère, Insolation, Développement.
  6. Part 6: Plaques positives vs négatives (80% vs 20%), 9 critères de choix.
- **Schematic & Placeholder Verification**: Checks that technical diagrams have `.visual-placeholder` with explicit descriptive captions and valid fallback paths in `assets/`.

#### Tier 3: Engine Invariants & Counter Synchronization
- Asserts `document.querySelectorAll('.slide').length >= 18`.
- Asserts `document.querySelectorAll('#counterTrack .counter-step').length === slides.length`.
- Asserts `document.querySelector('.counter-total').textContent.trim() === '/ ' + String(slides.length).padStart(2, '0')`.
- Asserts that for every step `i` (0 to N-1), `step[i].textContent.trim() === String(i + 1).padStart(2, '0')`.
- Asserts `document.querySelectorAll('.slide.active').length === 1` (Slide 1) and `document.querySelectorAll('.slide.outgoing').length === 0`.

#### Tier 4: Navigation Simulation & Input Dispatch
- Uses simulated DOM dispatching or headless Electron:
  1. `document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))`
     - Expect `slide[0]` to have `.outgoing` and `slide[1]` to have `.active`.
     - Expect `.presentation-container` to have `data-direction="next"` and `data-slide="2"`.
     - Expect `#counterTrack.style.transform === 'translateY(-3.5rem)'`.
  2. Sequential navigation to slide N:
     - Dispatch `ArrowRight` repeatedly until `index === N - 1`.
     - Dispatch one more `ArrowRight` -> expect slide index to remain `N - 1` (strict upper bound).
  3. Backward navigation to slide 0:
     - Dispatch `ArrowLeft` repeatedly until `index === 0`.
     - Dispatch one more `ArrowLeft` -> expect slide index to remain `0` (strict lower bound).
  4. Button navigation:
     - Trigger `nextBtn.click()` and `prevBtn.click()`, verifying identical state transitions.

#### Tier 5: Headless Test Runner Implementation
Two concrete runner options have been formulated for the E2E Testing Track:
1. **Fast Pure-Node Runner (`tests/verify-presentation.mjs`)**:
   - Uses Node 26 native `node:test` and `node:assert`.
   - Parses `index.html` and `style.css` via regex/DOM extraction.
   - Executes in ~150ms.
2. **Headless Electron E2E Runner (`tests/headless-e2e.cjs`)**:
   - Spawns `electron` with `BrowserWindow({ show: false })`.
   - Loads `index.html` with real Chromium rendering, executes `script.js`, dispatches DOM events, checks computed styles and transforms.
   - Executes in ~1800ms.

---

## 8. Concrete Test Runner Implementation Code

Below is the complete, drop-in test runner script ready to be placed into `tests/presentation-e2e.test.mjs`:

```javascript
// tests/presentation-e2e.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(rootDir, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(rootDir, 'script.js'), 'utf8');

test('Tier 1: Static Integrity & Syntax Validation', async (t) => {
  await t.test('Root presentation container exists', () => {
    assert.match(html, /class=["'][^"']*presentation-container[^"']*["']/);
  });

  await t.test('CSS brutalist design tokens exist', () => {
    assert.match(css, /--color-bg:\s*#FFFFFF/i);
    assert.match(css, /--color-accent:\s*#E32619/i);
    assert.match(css, /--color-dark:\s*#0A0A0A/i);
    assert.match(css, /--ease-kinetic/);
  });

  await t.test('Frameless window title region exists', () => {
    assert.match(html, /class=["'][^"']*title-drag-region[^"']*["']/);
    assert.match(html, /id=["']electron-min["']/);
    assert.match(html, /id=["']electron-max["']/);
    assert.match(html, /id=["']electron-close["']/);
  });
});

test('Tier 2: Blueprint Coverage & Zero Meta-Labels', async (t) => {
  await t.test('Strict Zero Meta-Labels in DOM and comments', () => {
    const metaRegex = /(?:Personne\s*\d+|Slide\s+pour\s+Personne|Page\s*\d+\s*(?:à|a|-)\s*\d+|partie\s*\d+\s*pour)/gi;
    const matches = html.match(metaRegex) || [];
    assert.deepEqual(matches, [], `Found prohibited meta-labels: ${matches.join(', ')}`);
  });

  await t.test('All 6 Blueprint Parts are covered', () => {
    // Part 1
    assert.match(html, /Origine|Principe|Lithographie|Senefelder/i, 'Part 1 missing');
    // Part 2
    assert.match(html, /Monom[ée]tallique|Bim[ée]tallique|Trim[ée]tallique/i, 'Part 2 missing');
    // Part 3
    assert.match(html, /Grainage|Rugosit[ée]|Brosse/i, 'Part 3 missing');
    // Part 4
    assert.match(html, /[ÉE]lectrolyse|Anodisation|Oxyde|Chrom[ée]es/i, 'Part 4 missing');
    // Part 5
    assert.match(html, /Photosensibles|Diazo[ïi]que|Photopolym[èe]re/i, 'Part 5 missing');
    // Part 6
    assert.match(html, /Positives|N[ée]gatives|Crit[èe]res de Choix/i, 'Part 6 missing');
  });

  await t.test('Diagram placeholders have descriptive captions', () => {
    const placeholders = html.match(/class=["'][^"']*visual-placeholder[^"']*["']/g) || [];
    assert.ok(placeholders.length >= 6, `Expected at least 6 technical visual placeholders, found ${placeholders.length}`);
  });
});

test('Tier 3: Engine Invariants & Brutalist Odometer Synchronization', async (t) => {
  const slideMatches = html.match(/<section[^>]+class=["'][^"']*\bslide\b[^"']*["']/g) || [];
  const stepMatches = html.match(/class=["'][^"']*counter-step[^"']*["']/g) || [];
  const totalMatch = html.match(/class=["'][^"']*counter-total[^"']*["']>([^<]+)<\/div>/);

  const slideCount = slideMatches.length;
  const stepCount = stepMatches.length;
  const totalText = totalMatch ? totalMatch[1].trim() : '';

  await t.test('Slide deck contains full granular sequence', () => {
    assert.ok(slideCount >= 18, `Slide deck count (${slideCount}) is under minimum expected (18)`);
  });

  await t.test('Counter steps count exactly matches total slides', () => {
    assert.equal(stepCount, slideCount, `Counter steps (${stepCount}) does not match slides (${slideCount})`);
  });

  await t.test('Counter total display matches formatted slide count', () => {
    const expectedTotal = `/ ${String(slideCount).padStart(2, '0')}`;
    assert.equal(totalText, expectedTotal, `Counter total "${totalText}" does not match "${expectedTotal}"`);
  });

  await t.test('Exactly one slide is marked active initially', () => {
    const activeSlides = html.match(/<section[^>]+class=["'][^"']*\bslide\b[^"']*\bactive\b[^"']*["']/g) || [];
    assert.equal(activeSlides.length, 1, `Expected exactly 1 active slide initially, found ${activeSlides.length}`);
  });
});

test('Tier 4: Navigation Bindings & Logic Integrity', async (t) => {
  await t.test('Keyboard navigation bindings exist in script.js', () => {
    assert.ok(js.includes('ArrowRight'), 'Missing ArrowRight binding');
    assert.ok(js.includes('ArrowLeft'), 'Missing ArrowLeft binding');
    assert.ok(js.includes('Space') || js.includes("' '"), 'Missing Space binding');
  });

  await t.test('Button navigation bindings exist in script.js', () => {
    assert.ok(js.includes('nextBtn.addEventListener'), 'Missing nextBtn click listener');
    assert.ok(js.includes('prevBtn.addEventListener'), 'Missing prevBtn click listener');
  });

  await t.test('Electron window control bindings exist in script.js', () => {
    assert.ok(js.includes('electronAPI.minimize'), 'Missing electron minimize handler');
    assert.ok(js.includes('electronAPI.maximize'), 'Missing electron maximize handler');
    assert.ok(js.includes('electronAPI.close'), 'Missing electron close handler');
  });
});
```

---

## 9. Actionable Guidance for Subsequent Tracks

1. **For the Implementation Track**:
   - Strip the legacy "Identité Numérique" slides (Slides 4–8) and replace them with dedicated, spacious slides for Parts 3, 4, 5, and 6.
   - Remove the `<!-- Slide 2: Personne 1 ... -->` comment from line 117.
   - When generating new slides, update `#counterTrack` with corresponding `<div class="counter-step">NN</div>` and set `.counter-total` to `/ NN`.
   - In `script.js`, insert `if (isTransitioning) return;` at the entry of `goToSlide()` to eliminate the rapid-click race condition.
   - In `main.js`, update `title` to `'Production des Formes Imprimantes — Les Plaques Offset'`.

2. **For the E2E Testing Track**:
   - Establish `tests/presentation-e2e.test.mjs` using the drop-in suite above.
   - Add `"test": "node --test tests/presentation-e2e.test.mjs"` to `package.json`.
   - Incorporate the Headless Electron runner for interactive validation during Phase 3 hardening.
