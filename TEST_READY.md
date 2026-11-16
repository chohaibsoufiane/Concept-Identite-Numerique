# Test Ready: E2E Automated Verification Suite

**Project:** Les Plaques Offset (Production des Formes Imprimantes)  
**Track:** E2E Testing Track  
**Timestamp:** 2026-10-23T09:02:00Z  
**Status:** READY & OPERATIONAL  

---

## 1. Executive Summary

The standalone, opaque-box automated test suite for "Les Plaques Offset" is complete, verified, and ready for continuous integration and milestone verification.
The test suite is located in `tests/e2e-presentation.test.mjs` and executes via Node.js built-in test runner without any external network or package dependencies.

### Command Line Execution
```bash
node --test tests/e2e-presentation.test.mjs
```

- **Runtime:** ~150 ms
- **Test Engine:** `node:test` & `node:assert/strict` (Node.js v26.7.0 / v22+)
- **Total Test Cases:** 68 tests across 4 tiers
- **Current Baseline:** 41 PASS / 27 TARGETED FAILURES (reflecting pending milestone implementations M1–M4)

---

## 2. Feature Inventory Coverage Matrix

| Feature Area | Features Covered | Tier 1 (Coverage) | Tier 2 (Boundary & Corner) | Tier 3 (Pairwise & Sync) | Tier 4 (Real-World Scenarios) |
|---|---|---|---|---|---|
| **Front Page & Navigation** | F1, F2, F3, F24 | 5 tests (1.1–1.5) | 4 tests (2.6–2.8, 2.10) | 5 tests (3.1–3.5) | 6 tests (4.1–4.6) |
| **Part 1 : Origine & Principe** | F4, F5, F6, F7 | 5 tests (2.1–2.5) | 1 test (2.1) | — | Included in Walkthrough |
| **Part 2 : Supports Conventionnels** | F8, F9, F10 | 5 tests (3.1–3.5) | 2 tests (2.4, 2.5) | — | Included in Walkthrough |
| **Part 3 : Traitement & Grainage** | F11, F12, F13 | 5 tests (4.1–4.5) | 2 tests (2.4, 2.5) | — | Included in Walkthrough |
| **Part 4 : Électrolyse & Anodisation** | F14, F15, F16 | 5 tests (5.1–5.5) | 2 tests (2.4, 2.5) | — | Included in Walkthrough |
| **Part 5 : Couches Photosensibles** | F17, F18, F19 | 5 tests (6.1–6.5) | 2 tests (2.4, 2.5) | — | Included in Walkthrough |
| **Part 6 : Typologie & 9 Critères** | F20, F21, F22, F23 | 5 tests (7.1–7.5) | 1 test (2.1) | — | Included in Walkthrough |
| **Style Tokens & Brutalist Integrity** | F25, F26 | 5 tests (8.1–8.5) | 3 tests (2.2, 2.3, 2.11) | 6 tests (3.6–3.11) | Included in Walkthrough |

---

## 3. Four-Tier Architecture Specification

### Tier 1: Feature Coverage & Content Invariants (40 Tests)
- **Front Page & TOC:** Module identification, Title "LES PLAQUES OFFSET", technical subtitle, Sommaire 6 Axes, navigation buttons and brutalist odometer DOM existence.
- **Part 1 (Origine & Principe):** Senefelder 1796 & Solnhofen Bavarian limestone, chemical reaction (gum arabic + HNO3 forming hydrophilic salt), metallic evolution (Zinc 1860, Aluminium 1824, Bauxite), planographic flat surface principle, oleophilic/hydrophilic surface antagonism.
- **Part 2 (Supports Conventionnels):** Monometallic aluminium properties (lightness, stability, low cost), polymetallic 1–2 million run endurance, bimetallic (Cr/brass 70-30), trimetallic (Cr/Cu/steel or alu), quadrimetallic (Cr/acid Cu/basic Cu/steel).
- **Part 3 (Traitement & Grainage):** Roughness & 3 wetting laws (minimum water rule), mechanical dry brush graining (oscillating brushes, microcavities, 500k ceiling), chemical brush graining (nylon, pumice powder, acid attack, medium runs).
- **Part 4 (Électrolyse & Anodisation):** AC acid bath electrograining, 4.5–10 µm water film, 300 lpi screen fidelity, >1M impressions, surface anodization (Al2O3 alumina formation, corundum hardness, anti-scumming, anti-oxidation), chromed litho plates (natural chromium hydrophilicity, 2x less water, rigid metals/tinplate).
- **Part 5 (Couches Photosensibles):** Diazo photosensitive layers (N2 diazonium UV decomposition, positive workflow with alkaline developer dissolution), photopolymers (monomer crosslinking 3D network, negative workflow for rotary presses >1M), side-by-side photochemical comparative cycle.
- **Part 6 (Typologie & 9 Critères):** Positive plates 80% commercial market share, negative plates newspaper/rotary press dominance, complete 9 selection criteria invariant, structured decision matrix, industrial technical synthesis and close slide.
- **Design Tokens & Markup:** Native CSS tokens (`--color-bg`, `--color-light`, `--color-dark`, `--color-accent: #E32619`, `--ease-kinetic`, `--font-main: Inter`), semantic slide structure, frameless window drag region, Swiss brutalist layout classes.

### Tier 2: Boundary, Corner Cases & Adversarial Invariants (11 Tests)
- **Zero Meta-Labels in DOM Text:** Strictly forbids `Personne \d`, `Slide pour Personne`, `Page \d\d` in visible content.
- **Zero Meta-Labels in Comments & Attributes:** Scans HTML comments and attributes for forbidden instructor tags (caught legacy comment at line 117).
- **Legacy Content Isolation:** Strictly verifies complete excision of old course remnants (`iceberg.glb`, `model-viewer`, `Miroir de l'E-Réputation`, `La Faille`, `La Machine à Données`, `Identité Déclarative`, `dev-copy-cam`).
- **Image Fallback Invariants:** Verifies all `.plate-img-box` feature an `<img>` with `onerror` attribute immediately followed by `.plate-fallback` containing glyph, `<strong>` title, and explicit `assets/` relative path.
- **Navigation Bounds Clamping:** Clamps `index < 0` to 0; clamps `index >= totalSlides` to `totalSlides - 1`; verifies `goToSlide(current)` is a no-op.
- **Transition Concurrency Guard:** Verifies `isTransitioning` re-entrancy lock at entry of `goToSlide()` in `script.js`.
- **Initial Mount Invariant:** Verifies exactly one slide is active on boot (Slide 1).
- **Adversarial Encoding Integrity:** Scans for double-encoded UTF-8 mojibake patterns (`Ã©`, `Ã¨`, `â€™`).

### Tier 3: Pairwise Combinations & Engine Synchronization (11 Tests)
- **Keyboard Event Bindings:** Forward navigation (`ArrowRight`, `ArrowDown`, `Space`), backward navigation (`ArrowLeft`, `ArrowUp`), fullscreen toggle (`F11`).
- **Button & Touch Bindings:** Click listeners on `#nextBtn` and `#prevBtn`; touchstart/touchend with 50px delta swipe threshold.
- **Brutalist Odometer Synchronization:** Step count in `#counterTrack` strictly matches slide count; `.counter-total` text strictly matches formatted `/ ${totalSlides}`; consecutive step numbering (`01`, `02`, ..., `NN`); vertical translation formula matches `-currentSlide * 3.5rem`.
- **System Integration:** Electron window title in `main.js` matches presentation topic (`Production des Formes Imprimantes — Les Plaques Offset`); preload context bridge properly exposes `electronAPI` (`minimize`, `maximize`, `close`, `toggleFullScreen`).

### Tier 4: Real-World Scenarios & Interaction Stress (6 Tests)
- **Initial Deck Mount Lifecycle:** Initial active slide, container attributes (`data-direction="next"`, `data-slide="1"`), odometer at `01`.
- **Full Forward Walkthrough Simulation:** Steps through entire sequence (Slide 1 to Slide N), validating active index, direction, and odometer translation at every step.
- **Reverse Walkthrough Simulation:** Steps backward from final slide to Slide 1, validating reverse direction and odometer translation.
- **Rapid Interaction & Boundary Hammer Scenario:** Rapid alternating commands, navigation spam at boundaries, rejection of commands while transitioning.
- **Adversarial Input Rejections:** Verifies robust rejection of `NaN`, `Infinity`, `-Infinity`, strings, `null`, `undefined`, and extreme out-of-bounds indices.
- **Transition Class Hygiene:** Verifies proper teardown of `.outgoing` and removal of orphan transition classes after `transitionDuration`.

---

## 4. TDD Verification Roadmap for Milestone Implementing Agents

| Milestone | Expected Test Passes to Unlock | Target Features |
|---|---|---|
| **M1: Foundation & Part 1** | Tests 1.4, 2.2, 2.3, 2.4, 2.5, 2.2 (comment meta-label), 2.3 (legacy purge), 3.10 (window title) | Excises legacy iceberg & identity slides; sets window title in `main.js`; removes comment meta-label; implements Slides 01–06 (Front Cover, TOC, Senefelder, Stone Reaction, Metallic Evolution, Planographic Principle). |
| **M2: Supports & Grainage** | Tests 3.1, 3.2, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5 | Implements Slides 07–12 (Part 2 Monometallic, Polymetallic 1–2M, Quadrimetallic; Part 3 Roughness, Mechanical Graining, Chemical Graining). |
| **M3: Électrolyse & Couches** | Tests 5.1, 5.2, 5.3, 5.5, 6.1, 6.2, 6.3, 6.4, 6.5 | Implements Slides 13–18 (Part 4 Electrograining, Anodisation, Chrome; Part 5 Diazo, Photopolymers, Comparison). |
| **M4: Typologie & Engine** | Tests 7.1, 7.2, 7.3, 2.9 (concurrency lock), 3.6, 3.7 | Implements Slides 19–22 (Positive 80%, Negative, 9 Criteria, Close); updates `#counterTrack` to 22 steps & `/ 22`; inserts `if (isTransitioning) return;` in `script.js`. |
| **M5: Final Verification** | **100% Pass (68/68)** | Full regression pass across all 4 tiers; forensic audit. |
