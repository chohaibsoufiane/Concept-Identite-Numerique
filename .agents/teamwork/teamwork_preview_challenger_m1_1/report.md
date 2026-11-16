# Empirical Challenge Report: Milestone 1 (Foundation & Part 1)

**Agent:** Challenger 1 (Adversarial Markup & Meta-Label Verification)  
**Date:** 2026-10-23  
**Target Milestone:** Milestone 1 (Foundation & Part 1 Implementation)  
**Explicit Verdict:** **REQUEST_CHANGES**  

---

## 1. Challenge Summary

**Overall Risk Assessment:** **HIGH**  
While the worker successfully purged legacy 3D/digital-identity DOM structures from `index.html`, implemented authentic technical French copy with zero meta-labels in user-facing content, and ensured stable image fallback geometry, **both newly crafted vector schematics (`assets/*.svg`) contain fatal XML syntax errors (`&bull;` undefined entity references)**. In Electron / Chromium, this causes XML decoding to fail catastrophically (`naturalWidth: 0, naturalHeight: 0`), triggering the `onerror` fallback immediately on slide entry. As a result, **the presentation never displays either technical diagram to the user**, showing only emoji fallback placeholders.

---

## 2. Challenges & Findings

### [HIGH] Challenge 1: Invalid XML Entity in SVG Schematics (`&bull;`)

- **Assumption Challenged:** Worker claimed in handoff section 1.4 and 4 that *"Both SVGs load cleanly and fallback gracefully upon image missing triggers"*.
- **Empirical Observation:**
  In XML (unlike HTML5), only five character entities are predefined: `&lt;`, `&gt;`, `&amp;`, `&apos;`, and `&quot;`. The HTML entity `&bull;` is undefined in SVG/XML.
  - `assets/schematic_reaction_pierre.svg` contains 3 occurrences of `&bull;`:
    * Line 33: `<text x="776" y="32" class="subtitle">SOLNHOFEN (1796) &bull; CaCO₃</text>`
    * Line 45: `<text x="175" y="16" class="label-head" fill="#0077B6">Hydrophile &bull; Blancs</text>`
    * Line 82: `<text x="155" y="16" class="label-head" fill="#E32619">Oléophile &bull; Encre</text>`
  - `assets/schematic_principe_planographique.svg` contains 5 occurrences of `&bull;`:
    * Line 58: `Épaisseur mécanique calibrée : 0,15 mm à 0,30 mm &bull; Cintrable sur cylindre porte-plaque`
    * Line 68: `<text x="175" y="16" class="label-head" fill="#0077B6">Hydrophile &bull; Blancs</text>`
    * Line 94: `<text x="155" y="16" class="label-head" fill="#E32619">Oléophile &bull; Graphismes</text>`
    * Line 128: `&bull; Déficit d'eau : Graissage immédiat des fonds blancs`
    * Line 133: `&bull; Excès d'eau : Émulsion de l'encre &amp; perte de densité`
- **Attack Scenario & Reproduction:**
  When loaded inside an `<img>` tag in Electron/Chromium, Chromium's XML parser rejects the file with an `undefined entity` error.
  Executed `npx electron tests/test-svg-render.cjs`:
  ```json
  [
    {
      "src": "assets/schematic_reaction_pierre.svg",
      "complete": true,
      "naturalWidth": 0,
      "naturalHeight": 0,
      "imgDisplay": "none",
      "fallbackDisplay": "flex"
    },
    {
      "src": "assets/schematic_principe_planographique.svg",
      "complete": true,
      "naturalWidth": 0,
      "naturalHeight": 0,
      "imgDisplay": "none",
      "fallbackDisplay": "flex"
    }
  ]
  ```
- **Blast Radius:**
  Both core technical schematics for Milestone 1 (Slide 04 "Réaction Chimique Pierre" and Slide 06 "Principe Planographique") are invisible to the user.
- **Mitigation:**
  In `assets/schematic_reaction_pierre.svg` and `assets/schematic_principe_planographique.svg`, replace all instances of `&bull;` with either the standard XML numeric character reference `&#8226;` or the literal UTF-8 bullet character `•`.
  (Verification: replacing with `&#8226;` in simulation proved immediate successful decode in Electron with `naturalWidth: 240, naturalHeight: 150` and `failed: false`).

---

### [LOW] Challenge 2: Residual Course and Project Metadata in Ancillary Files

- **Assumption Challenged:** Worker claimed zero meta-labels and full purge across the workspace.
- **Empirical Observation:**
  While `index.html`, `style.css`, `script.js`, `main.js`, and `preload.js` are 100% clean of meta-labels and instructor notes, residual references exist in ancillary files:
  1. `scripts/run-electron.cjs` line 3: `* @project Concept d'Identité Numérique (INFO208)`
  2. `package.json` line 2 & 4: `"name": "concept-identite-numerique"`, `"description": "Presentation immersive et interactive sur l'Identite Numerique avec moteur antigravite et 3D."`
- **Blast Radius:** Non-visual / developer-facing only. No impact on presentation runtime or user interface.
- **Mitigation:** Clean header JSDoc in `scripts/run-electron.cjs` and synchronize `package.json` metadata to "Production des Formes Imprimantes — Les Plaques Offset".

---

## 3. Stress Test Results

| Test Scenario | Target | Expected Behavior | Actual Behavior | Result |
|---|---|---|---|---|
| **Zero Meta-Labels Deep Scan** | Active files (`index.html`, `style.css`, `script.js`, `main.js`, `preload.js`, SVGs) | Zero matches for `Personne \d+`, `Page \d+`, `Batioui`, `INFO208`, `Slide pour` | 0 violations found across all active presentation files | **PASS** |
| **SVG XML Well-Formedness** | `assets/*.svg` | Standard XML parsers (`ElementTree`, DOMParser) parse without errors | Parse fails: `undefined entity: line 33, column 57` & `line 58, column 53` (`&bull;`) | **FAIL** |
| **Electron SVG Image Rendering** | Chromium `<img>` decoding in Electron | `naturalWidth > 0`, `naturalHeight > 0`, `imgDisplay: block`, `fallbackDisplay: none` | `naturalWidth: 0`, `naturalHeight: 0`, `imgDisplay: none`, `fallbackDisplay: flex` | **FAIL** |
| **Image Fallback Layout Stability** | `.plate-img-box` under simulated failure | 0px layout shift, geometry maintained, correct fallback badges | Dimensions preserved identically (`widthDelta: 0, heightDelta: 0`, 336x441 and 462x336) | **PASS** |
| **Double UTF-8 / Mojibake Scan** | All workspace text files | Zero double-encoded UTF-8 sequences (`Ã©`, `Ã¨`, `â€™`, `ï¿½`) | Zero mojibake found in any presentation source file | **PASS** |
| **Navigation & Odometer Invariant** | `index.html` ↔ `script.js` | 6 slides (`#slide-01` to `#slide-06`), 6 steps (`01` to `06`), counter total `/ 06` | Exact match, smooth translation `-currentSlide * 3.5rem` | **PASS** |
| **Transition Concurrency Guard** | `script.js` | `goToSlide()` guards entry with `if (isTransitioning) return;` | Guard verified present at line 250 | **PASS** |

---

## 4. Unchallenged Areas

- **Slides 07 to 22**: Allocated to subsequent Milestones M2, M3, and M4. Corresponding Tier 1 tests in `tests/e2e-presentation.test.mjs` remain failing by design as documented in the worker handoff.
- **Three.js / WebGL performance**: Deprecated Three.js / model-viewer components were purged in M1, eliminating WebGL overhead.

---

## 5. Verdict & Recommendation

- **Verdict:** **`REQUEST_CHANGES`**
- **Action Required from M1 Worker:**
  1. Fix `assets/schematic_reaction_pierre.svg`: replace 3 instances of `&bull;` with `&#8226;` or `•`.
  2. Fix `assets/schematic_principe_planographique.svg`: replace 5 instances of `&bull;` with `&#8226;` or `•`.
  3. (Optional but recommended): Clean `@project` comment in `scripts/run-electron.cjs` and metadata in `package.json`.
  4. Run `node --test tests/adversarial-m1.test.mjs` and confirm 100% PASS (4/4 tests).
