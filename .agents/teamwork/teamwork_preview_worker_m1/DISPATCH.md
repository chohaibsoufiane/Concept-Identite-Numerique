# Dispatch: M1 Worker (Foundation & Part 1 Implementation)

You are the Worker assigned to implement Milestone 1 of "Les Plaques Offset".

Read ORIGINAL_REQUEST.md at:
c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\ORIGINAL_REQUEST.md
Read PROJECT.md at:
c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\orchestrator\PROJECT.md

Read the three M1 Explorer reports:
1. Markup & Purge Report:
   c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_1\report.md
2. Visual Schematics Report:
   c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_2\report.md
3. Styling & Kinetics Report:
   c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_3\report.md

## Exclusive File Ownership
You have exclusive write ownership for:
- `index.html`
- `style.css`
- `main.js`
- `assets/schematic_reaction_pierre.svg`
- `assets/schematic_principe_planographique.svg`
- `script.js`

## Concrete Tasks to Implement
1. **Purge Legacy Code in `index.html`**:
   - Remove legacy slides 4 through 8 (`#slide-2` iceberg scene with 1032 lines of Three.js/model-viewer, `#slide-3` e-reputation, `#slide-4` la faille, `#slide-5` machine à données, `#slide-6` solutions).
   - Remove external `<script>` tag loading `@google/model-viewer` from `index.html:42`.
   - Remove orphan SVG filter `#iceberg-silhouette`.
   - Remove invasive event listeners and key-capturing scripts embedded in the old slides.
   - Clean file header comments and metadata in `index.html` (remove "Mme Batioui", "INFO208", "Identité Numérique").
2. **Implement Slides 01 to 06 in `index.html`**:
   - Slide 01: Front Page (`#slide-01` or `#slide-1`, "Production des Formes Imprimantes — Les Plaques Offset").
   - Slide 02: Sommaire Général (`#slide-02`, 6 technological axes cards matching M1 Explorer 1 markup).
   - Slide 03: 1.1 Genèse Historique (`#slide-03`, Aloys Senefelder 1796, Pierre calcaire Solnhofen, brutalist framed portrait using `assets/senefelder.jpg` with `.plate-fallback`).
   - Slide 04: 1.2 Réaction Chimique de la Pierre (`#slide-04`, $CaCO_3$, $HNO_3$, gomme arabique, formation du sel hydrophile, referencing `assets/schematic_reaction_pierre.svg` with `.plate-fallback`).
   - Slide 05: 1.3 Évolution Métallique (`#slide-05`, 3-column chronological layout: Pierre 1796 -> Zinc 1860 -> Aluminium Bauxite).
   - Slide 06: 1.4 Principe Planographique (`#slide-06`, surface plane $z=0$, antagonisme eau/encre, referencing `assets/schematic_principe_planographique.svg` with `.plate-fallback`).
3. **Window Title Update in `main.js`**:
   - Update line 35 title to `'Production des Formes Imprimantes — Les Plaques Offset'`.
4. **SVG Visual Schematics**:
   - Create `assets/schematic_reaction_pierre.svg` using the complete vector markup from `teamwork_preview_explorer_m1_2\report.md §4.3`.
   - Create `assets/schematic_principe_planographique.svg` using the complete vector markup from `teamwork_preview_explorer_m1_2\report.md §6.3`.
5. **Styling in `style.css`**:
   - Implement the CSS rules specified in `teamwork_preview_explorer_m1_3\report.md §3`:
     * `.plate-img-box`, `.plate-img-box.diagram`, `.plate-img-box.hero`, `.plate-fallback`
     * `.sommaire-grid`, `.sommaire-card`, `.sommaire-card:hover`
     * `.chem-formula-box`
     * `.kinetic-rise` motion choreography
     * Remove any soft blurred shadows or rounded corners; enforce pure Swiss brutalist aesthetic.
6. **Zero Meta-Labels**:
   - Strictly verify that NO text or comments contain "Personne \d", "Page \d\d", or student/instructor tags.
7. **Verification & Testing**:
   - Run tests and builds to verify that `index.html` is valid, syntax errors are zero, and Electron loads cleanly.

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Document your changes, build/test execution results, and deliver handoff.md in your working directory. Send a completion message to the orchestrator when done.

## 2026-10-23T09:01:07Z
You are the M1 Worker (Foundation & Part 1 Implementation).
Your working directory is: c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_worker_m1
Read your DISPATCH.md at c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_worker_m1\DISPATCH.md
and ORIGINAL_REQUEST.md at c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\ORIGINAL_REQUEST.md.

Read the 3 M1 Explorer reports:
- c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_1\report.md
- c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_2\report.md
- c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_3\report.md

Execute all tasks:
1. Purge legacy code (iceberg scene, 3D model-viewer, e-reputation) from index.html.
2. Implement Slides 01 to 06 with zero meta-labels.
3. Update main.js window title.
4. Create assets/schematic_reaction_pierre.svg and assets/schematic_principe_planographique.svg.
5. Add layout, image box, fallback, and kinetic rise CSS to style.css.
6. Verify DOM validity and run build/test checks.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Deliver your handoff.md in your working directory and notify me (conversation ID ef092575-fdfa-43c8-adf3-ee84ceec1245).

## 2026-10-23T09:03:17Z
**Context**: E2E Test Suite Ready for Verification
**Content**: The E2E Testing Track has published `TEST_READY.md` and implemented the 4-tier automated test suite in `tests/e2e-presentation.test.mjs`. You can run `node --test tests/e2e-presentation.test.mjs` to progressively verify your M1 changes (specifically Tier 1 tests 1.1–1.5, 2.1–2.5, Tier 2 zero-meta-labels and legacy content isolation, and Tier 3 window title sync).
**Action**: Use `node --test tests/e2e-presentation.test.mjs` as part of your build/test verification and report results in your handoff.md.


