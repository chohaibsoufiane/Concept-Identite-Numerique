# Forensic Investigation & Remediation Report: Swiss Brutalist Anti-Slop Enforcement

**Work Product**: Milestone 1, Iteration 2 Audit Remediation  
**Scope**: Purge all soft diffuse drop-shadows and floating rounded cards; enforce pure Swiss brutalist aesthetics  
**Date**: 2026-10-23  
**Agent**: M1 Iteration 2 Explorer 2  

---

## 1. Executive Summary

Milestone 1's prior iteration received a verdict of **INTEGRITY VIOLATION** from the Forensic Auditor (`teamwork_preview_auditor_m1/report.md`) due to the presence of soft diffuse box-shadows and floating hover states in violation of `ORIGINAL_REQUEST.md` line 25 (*"No AI Slop: No generic floating rounded white box cards with drop-shadows. Use the project's native typography, sharp lines, purposeful geometric layouts, and native CSS motion choreography"*).

This investigation conducted an exhaustive, multi-file code audit across `index.html`, `style.css`, and `script.js`. It verified the two explicit violations cited by the Auditor, identified residual legacy box-shadows in dead styles and admin utilities, and formulated exact, drop-in replacement snippets that restore 100% compliance with pure Swiss brutalist aesthetics:
1. **`index.html:386`**: Inline diffuse drop-shadow on Slide 05 Card 3 is purged, restoring clean geometric borders (`border: 3px solid var(--color-accent); border-radius: 0;`).
2. **`style.css:1781-1792`**: The floating `transform: translateY(-4px);` and diffuse `box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);` on `.sommaire-card:hover` are eliminated; transition rules are streamlined to planar properties (`border-color`, `background-color`).
3. **Comprehensive Tech-Debt Sanitation**: Identified and specified remediation for legacy shadow declarations in `style.css:966`, `style.css:1290`, and `script.js:153`.
4. **Adversarial Test Suite Hardening**: Formulated a dedicated automated assertion for `tests/e2e-presentation.test.mjs` to permanently prevent shadow and floating-card regressions in Milestones M2–M4.

---

## 2. Empirical Observations & Forensic Evidence

### 2.1 Primary Violation 1: Inline Diffuse Shadow in Slide 05 (`index.html:386`)
- **File**: `c:\Users\lufylon\Documents\antigravity\silly-euclid\index.html`
- **Line**: 386
- **Context**: Slide 05 (`#slide-05`, "1.3 Évolution Métallique"), Column 3 card ("3. Aluminium Moderne").
- **Verbatim Code**:
  ```html
  <div style="background: white; border: 3px solid var(--color-accent); border-radius: 0; padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(227, 38, 25, 0.08);">
  ```
- **Analysis**:
  - The property `box-shadow: 0 10px 30px rgba(227, 38, 25, 0.08);` introduces a 30px blur radius diffuse reddish halo.
  - While Column 1 (Stone, line 346) and Column 2 (Zinc, line 366) adhere strictly to planar brutalism (`border: 2px solid var(--color-dark); border-radius: 0;`), Column 3 broke architectural consistency by attempting to simulate optical floating depth.
  - Column 3 already possesses overwhelming visual prominence via `border: 3px solid var(--color-accent)` and its red tag `STANDARD UNIVERSEL • > 95%`. The diffuse shadow was an unnecessary AI-slop artifact.

### 2.2 Primary Violation 2: Floating Hover & Diffuse Shadow on Sommaire Cards (`style.css:1781-1792`)
- **File**: `c:\Users\lufylon\Documents\antigravity\silly-euclid\style.css`
- **Lines**: 1772–1792
- **Context**: Slide 02 (`#slide-02`, "Sommaire Général"), `.sommaire-card` and `.sommaire-card:hover`.
- **Verbatim Code**:
  ```css
  .sommaire-card {
      background: #FFFFFF;
      border: 2px solid var(--color-dark);
      padding: 1.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      border-radius: 0;
      transition: transform var(--t-short) var(--ease-kinetic),
                  border-color var(--t-short) ease,
                  background-color var(--t-short) ease,
                  box-shadow var(--t-short) ease;
  }

  .sommaire-card:hover {
      border-color: var(--color-accent) !important;
      background-color: #FFFFFF;
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  }
  ```
- **Analysis**:
  - `transform: translateY(-4px);` causes the card to float 4px above the layout plane on cursor hover.
  - `box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);` casts a 28px blurred shadow underneath the floating card.
  - This pair of properties represents classic generic modern web template behavior, contradicting Swiss brutalist tenets where elements are grounded firmly on the 2D planar grid.

### 2.3 Secondary Finding: Legacy Shadow Residuals
A complete codebase grep across all project files revealed 3 additional legacy shadow declarations:
1. **`style.css:966`**:
   ```css
   .timeline-badge {
       ...
       border-radius: 50%;
       box-shadow: 0 0 0 6px white, 0 10px 25px rgba(0,0,0,0.1);
   }
   ```
   *Status*: Unused in current slides, but retained as dead CSS from the initial template.
2. **`style.css:1290`**:
   ```css
   .print-cylinder {
       ...
       box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), 0 -30px 60px rgba(0, 0, 0, 0.8);
   }
   ```
   *Status*: Unused in current slides; remnant from 3D cylinder template.
3. **`script.js:153`**:
   ```javascript
   <div style="position: fixed; top: 20px; right: 20px; background: var(--color-dark); color: white; padding: 15px 25px; border-radius: 8px; z-index: 99999; font-family: var(--font-main); box-shadow: 0 10px 40px rgba(0,0,0,0.8); display: flex; align-items: center; gap: 20px; border: 1px solid rgba(255,255,255,0.1);">
   ```
   *Status*: Dynamically created only in `initAdminSystem()`, but contains rounded corners (`border-radius: 8px`) and a 40px diffuse drop-shadow.

---

## 3. Swiss Brutalist Aesthetic Principles & Design Rationale

Swiss brutalism (International Typographic Style infused with neo-brutalist digital design) is governed by strict rules:
1. **Rigorous Planar Integrity**: Elements exist entirely on the 2-dimensional plane. No simulated 3D elevation (no `translateY` hover lifts, no simulated light-source drop-shadows).
2. **High-Contrast Geometric Delimitation**: Card boundaries are marked exclusively by sharp, un-rounded borders (`border-radius: 0;`), standardly `2px solid var(--color-dark)` (#0A0A0A) or `3px solid var(--color-accent)` (#E32619).
3. **Zero Blur Depth**: If depth or elevation is ever expressed in brutalism, it must be an architectural hard offset with zero blur (e.g. `box-shadow: 4px 4px 0px #000;`). For planar cards, `box-shadow: none;` is the canonical standard (as already established in `style.css:1992`).
4. **Tactile Planar Interaction**: Interactive hover states are communicated through instantaneous or kinetic color switches (`border-color: var(--color-accent) !important;` or background shifts) rather than spatial translation.

---

## 4. Exact Remediation Plan & Code Diffs

### Remediation 1: Purge Inline Box-Shadow in `index.html`
**Target**: `index.html` line 386  
**Action**: Drop `box-shadow: 0 10px 30px rgba(227, 38, 25, 0.08);` completely.

```diff
--- a/index.html
+++ b/index.html
@@ -385,3 +385,3 @@
                         <!-- 3. Aluminium Moderne -->
-                        <div style="background: white; border: 3px solid var(--color-accent); border-radius: 0; padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(227, 38, 25, 0.08);">
+                        <div style="background: white; border: 3px solid var(--color-accent); border-radius: 0; padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between;">
                             <div>
```

### Remediation 2: Eliminate Floating Card & Diffuse Shadow in `style.css`
**Target**: `style.css` lines 1781–1792  
**Action**: Remove `transform` and `box-shadow` from `.sommaire-card` transition; remove `transform: translateY(-4px);` and `box-shadow` from `.sommaire-card:hover`.

```diff
--- a/style.css
+++ b/style.css
@@ -1779,8 +1779,6 @@
     position: relative;
     border-radius: 0;
-    transition: transform var(--t-short) var(--ease-kinetic),
-                border-color var(--t-short) ease,
-                background-color var(--t-short) ease,
-                box-shadow var(--t-short) ease;
+    transition: border-color var(--t-short) ease,
+                background-color var(--t-short) ease;
 }

 .sommaire-card:hover {
     border-color: var(--color-accent) !important;
     background-color: #FFFFFF;
-    transform: translateY(-4px);
-    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
 }
```

*Note on Hover Styling*:  
On hover, the card's solid 2px border cleanly transitions to `--color-accent` (`#E32619`), maintaining flat, crisp geometric clarity with zero layout shift or shadow blur.

### Remediation 3: Purge Residual Legacy Shadows in `style.css` & `script.js`
**Target A**: `style.css` line 966 (`.timeline-badge`)
```diff
--- a/style.css
+++ b/style.css
@@ -954,3 +954,3 @@
     height: 90px;
-    border-radius: 50%;
+    border-radius: 0;
     background: var(--color-dark);
@@ -964,3 +964,3 @@
     border: 4px solid var(--color-accent);
     margin-bottom: 2rem;
-    box-shadow: 0 0 0 6px white, 0 10px 25px rgba(0,0,0,0.1);
+    box-shadow: none;
```

**Target B**: `style.css` line 1290 (`.print-cylinder`)
```diff
--- a/style.css
+++ b/style.css
@@ -1288,3 +1288,3 @@
             transparent 100%);
-    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), 0 -30px 60px rgba(0, 0, 0, 0.8);
+    box-shadow: none;
     z-index: 5;
```

**Target C**: `script.js` line 153 (`#adminModeToolbar`)
```diff
--- a/script.js
+++ b/script.js
@@ -153,1 +153,1 @@
-            <div style="position: fixed; top: 20px; right: 20px; background: var(--color-dark); color: white; padding: 15px 25px; border-radius: 8px; z-index: 99999; font-family: var(--font-main); box-shadow: 0 10px 40px rgba(0,0,0,0.8); display: flex; align-items: center; gap: 20px; border: 1px solid rgba(255,255,255,0.1);">
+            <div style="position: fixed; top: 20px; right: 20px; background: var(--color-dark); color: white; padding: 15px 25px; border-radius: 0; z-index: 99999; font-family: var(--font-main); border: 2px solid white; display: flex; align-items: center; gap: 20px;">
```

### Remediation 4: Automated Anti-Slop Assertion for `tests/e2e-presentation.test.mjs`
To ensure that no diffuse shadows or floating cards can re-enter during subsequent milestones (M2–M4), the following test must be added to Tier 2 in `tests/e2e-presentation.test.mjs`:

```javascript
  await t.test('2.12 Anti-Slop Integrity: Zero diffuse box-shadows or floating hover transforms', () => {
    // 1. Scan index.html for any inline box-shadow with blur > 0
    const inlineShadowMatches = [...html.matchAll(/box-shadow:\s*([^;"]+)/gi)];
    const diffuseInline = inlineShadowMatches.map(m => m[1].trim()).filter(s => s !== 'none');
    assert.deepEqual(diffuseInline, [], `Found prohibited inline box-shadow in index.html: ${diffuseInline.join(', ')}`);

    // 2. Scan style.css for card hover shadow and translateY floating animations
    assert.doesNotMatch(css, /\.sommaire-card:hover\s*\{[^}]*box-shadow/i, '.sommaire-card:hover must not declare box-shadow');
    assert.doesNotMatch(css, /\.sommaire-card:hover\s*\{[^}]*translateY/i, '.sommaire-card:hover must not float with translateY');
  });
```

---

## 5. Verification Method

Once the M1 Worker applies these remediation diffs:

1. **Static Analysis & Regex Scan**:
   ```bash
   # Confirm 0 diffuse box-shadows in index.html
   node -e "const html = require('fs').readFileSync('index.html', 'utf8'); const shadows = [...html.matchAll(/box-shadow/gi)]; console.log('index.html shadows count:', shadows.length); process.exit(shadows.length === 0 ? 0 : 1);"

   # Confirm .sommaire-card:hover has no shadow or translateY
   node -e "const css = require('fs').readFileSync('style.css', 'utf8'); const m = css.match(/\.sommaire-card:hover\s*\{([^}]+)\}/); console.log(m ? m[1] : 'not found'); if (/box-shadow|translateY/.test(m[1])) process.exit(1);"
   ```

2. **Automated Test Suite**:
   ```bash
   node --test tests/e2e-presentation.test.mjs
   ```
   Confirm that the new Anti-Slop test case passes with 0 failures.

3. **Visual DOM Inspection**:
   In Electron, navigate to Slide 02 and hover over cards; verify that borders change to `#E32619` with zero vertical shift (`translateY`) and zero shadow. Navigate to Slide 05; verify that all three cards sit on the same level grid with crisp solid borders (`2px solid #0A0A0A` and `3px solid #E32619`) and zero reddish blur.
