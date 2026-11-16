# Dispatch: M1 Iteration 2 Worker (Remediation Implementation)

You are the Worker assigned to implement the remediation fixes for Milestone 1.

Read ORIGINAL_REQUEST.md at:
c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\ORIGINAL_REQUEST.md
Read PROJECT.md at:
c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\orchestrator\PROJECT.md

Read the 3 remediation reports and patches:
1. SVG Entity Fix Patch:
   c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_it2_1\svg_xml_entity_fix.patch
   and report at:
   c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_it2_1\report.md
2. Anti-Slop Drop-Shadow Removal Report:
   c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_it2_2\report.md
3. Navigation Concurrency & Type Sanitization Patch:
   c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_it2_3\fix_script.patch
   and report at:
   c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_it2_3\report.md

## Exclusive File Ownership
You have exclusive write ownership for:
- `assets/schematic_reaction_pierre.svg`
- `assets/schematic_principe_planographique.svg`
- `index.html`
- `style.css`
- `script.js`
- `tests/e2e-presentation.test.mjs`

## Concrete Tasks to Implement
1. **SVG XML Entity Fix**:
   Replace all occurrences of `&bull;` with the standard XML character reference `&#8226;` in:
   - `assets/schematic_reaction_pierre.svg` (lines 33, 45, 82)
   - `assets/schematic_principe_planographique.svg` (lines 58, 68, 94, 128, 133)
   Verify that both SVGs parse as 100% valid XML and decode cleanly in Chromium/Electron (`naturalWidth > 0`) without triggering `onerror`.
2. **Anti-Slop Drop-Shadow Removal**:
   - In `index.html` line 386: remove the inline `box-shadow: 0 10px 30px rgba(227, 38, 25, 0.08);` on Slide 05.
   - In `style.css` lines 1781–1792: remove `box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);` and `transform: translateY(-4px);` on `.sommaire-card:hover`. Ensure hover is purely a crisp border color transition.
   - In `style.css` lines 966 & 1290: set `box-shadow: none;`.
3. **Navigation Engine Input Sanitization**:
   - In `script.js` line 238 at entry of `goToSlide()`: insert:
     `if (typeof index !== 'number' || !Number.isInteger(index)) return;`
     before `if (isTransitioning) return;`.
   - In `tests/e2e-presentation.test.mjs`: update test 4.5 so it tests `script.js` directly per Explorer 3's recommendation.
4. **Verification**:
   Execute:
   - `node --test tests/e2e-presentation.test.mjs`
   - `node --test tests/adversarial-m1.test.mjs`
   - `node --test tests/stress-navigation.test.mjs`
   Confirm 100% pass across all test suites without any unhandled exceptions.

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Deliver your handoff.md in your working directory and notify the orchestrator when complete.


## 2026-10-23T09:52:38Z
You are the M1 Iteration 2 Worker (Remediation Implementation).
Your working directory is: c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_worker_m1_it2
Read your DISPATCH.md at c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_worker_m1_it2\DISPATCH.md,
ORIGINAL_REQUEST.md at c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\ORIGINAL_REQUEST.md,
PROJECT.md at c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\orchestrator\PROJECT.md,
and the three remediation reports:
- c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_it2_1\report.md (and svg_xml_entity_fix.patch)
- c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_it2_2\report.md
- c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_it2_3\report.md (and fix_script.patch)

Apply all 3 remediation tasks:
1. Replace all &bull; with &#8226; in assets/schematic_reaction_pierre.svg and assets/schematic_principe_planographique.svg.
2. Remove diffuse box-shadow in index.html:386 and style.css:1781-1792 (and clean legacy shadows in 966, 1290).
3. Sanitize goToSlide input in script.js line 238: if (typeof index !== 'number' || !Number.isInteger(index)) return;
4. Run verification suites:
   node --test tests/e2e-presentation.test.mjs
   node --test tests/adversarial-m1.test.mjs
   node --test tests/stress-navigation.test.mjs

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Deliver handoff.md in your working directory and notify me (conversation ID ef092575-fdfa-43c8-adf3-ee84ceec1245).
