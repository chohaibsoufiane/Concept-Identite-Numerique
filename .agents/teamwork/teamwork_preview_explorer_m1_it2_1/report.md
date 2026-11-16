# Technical Investigation Report: SVG XML Remediation & Rendering

**Agent:** M1 Iteration 2 Explorer 1 (SVG XML Remediation & Rendering)  
**Target Milestone:** Milestone 1 (Foundation & Part 1)  
**Date:** 2026-10-23  
**Status:** COMPLETE & EMPIRICALLY VERIFIED  

---

## 1. Executive Summary & Root Cause Analysis

### 1.1 The Failure Mode
During Milestone 1 audit, both technical SVG schematics designed for Slide 04 and Slide 06 failed to display in the Electron presentation:
- `assets/schematic_reaction_pierre.svg` (Slide 04: Coupe Microstructurelle & Réaction du Calcaire)
- `assets/schematic_principe_planographique.svg` (Slide 06: Principe Planographique & Antagonisme Eau/Encre)

Instead of the rendered vector diagrams, users observed only the emergency fallback boxes (`.plate-fallback`) containing emojis (`📐` and `⚖️`) and asset paths.

### 1.2 The Root Cause: XML 1.0 vs HTML5 Entity Specifications
- **SVG is an XML Application**: As defined by W3C SVG 1.1 / SVG 2.0 and XML 1.0 (Fifth Edition, Section 4.6), a standalone XML document without an external DTD recognizes **only five predefined character entity references**:
  1. `&amp;` (`&#38;` — ampersand)
  2. `&lt;` (`&#60;` — less-than)
  3. `&gt;` (`&#62;` — greater-than)
  4. `&quot;` (`&#34;` — quotation mark)
  5. `&apos;` (`&#39;` — apostrophe)
- **HTML5 vs XML Entity Dictionaries**: The named entity `&bull;` (representing Unicode U+2022 BULLET `•`) is defined in the HTML4/HTML5 entity catalog. In standard HTML files parsed by an HTML5 parser, `&bull;` is recognized and decoded. However, **`&bull;` does NOT exist in XML**.
- **Chromium / Electron Image Pipeline Behavior**:
  When an SVG file is referenced by an `<img>` tag (`<img src="assets/*.svg">`) or parsed with `DOMParser.parseFromString(..., 'image/svg+xml')`, Chromium delegates parsing to Blink's strict `XMLDocumentParser`.
  Upon encountering `&bull;`, `XMLDocumentParser` encounters an undeclared entity reference. Under XML 1.0 well-formedness constraints, undeclared entity references are fatal errors. Chromium halts parsing and produces a `<parsererror>` DOM:
  ```html
  <parsererror xmlns="http://www.w3.org/1999/xhtml">
    <h3>This page contains the following errors:</h3>
    <div>error on line 33 at column 64: Entity 'bull' not defined</div>
  </parsererror>
  ```
- **Consequence on DOM & Fallback Contract**:
  Because the XML parser produces a fatal parse error, Chromium's image decoder aborts with decoding failure. The `HTMLImageElement` registers `naturalWidth = 0` and `naturalHeight = 0`, fails to fire `onload`, and immediately dispatches an `error` event.
  The presentation DOM contract on each image box:
  ```html
  <img src="assets/schematic_reaction_pierre.svg" alt="..." onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
  <div class="plate-fallback" style="display: none;">...</div>
  ```
  Immediately executes the inline `onerror` handler on page load, hiding the `<img>` (`style="display: none;"`) and forcing `.plate-fallback` to display (`style="display: flex;"`). The actual vector diagrams were never rendered on screen.

---

## 2. Exhaustive Audit of Both SVG Schematics

A comprehensive line-by-line inspection of all active SVGs in `assets/` was performed to identify every illegal entity and check overall XML structural integrity.

### 2.1 Inventory of Illegal Entities
A total of **8 occurrences** of `&bull;` were identified across the two files:

#### File 1: `assets/schematic_reaction_pierre.svg` (3 occurrences)
| Line # | Column | Element Context | Offending Code Snippet |
|:------:|:------:|:----------------|:-----------------------|
| **33** | 64 | Header subtitle | `<text x="776" y="32" class="subtitle">SOLNHOFEN (1796) &bull; CaCO₃</text>` |
| **45** | 35 | Hydrophilic head | `<text x="175" y="16" class="label-head" fill="#0077B6">Hydrophile &bull; Blancs</text>` |
| **82** | 34 | Oleophilic head | `<text x="155" y="16" class="label-head" fill="#E32619">Oléophile &bull; Encre</text>` |

#### File 2: `assets/schematic_principe_planographique.svg` (5 occurrences)
| Line # | Column | Element Context | Offending Code Snippet |
|:------:|:------:|:----------------|:-----------------------|
| **58** | 53 | Substrate description | `Épaisseur mécanique calibrée : 0,15 mm à 0,30 mm &bull; Cintrable sur cylindre porte-plaque` |
| **68** | 35 | Hydrophilic head | `<text x="175" y="16" class="label-head" fill="#0077B6">Hydrophile &bull; Blancs</text>` |
| **94** | 34 | Oleophilic head | `<text x="155" y="16" class="label-head" fill="#E32619">Oléophile &bull; Graphismes</text>` |
| **128** | 7 | Warning matrix box 1 | `&bull; Déficit d'eau : Graissage immédiat des fonds blancs` |
| **133** | 7 | Warning matrix box 2 | `&bull; Excès d'eau : Émulsion de l'encre &amp; perte de densité` |

### 2.2 Audit of Remaining SVG Structures
Both files were verified against all other XML and SVG requirements:
- **XML Namespace**: Both root elements properly declare `xmlns="http://www.w3.org/2000/svg"` and `viewBox="0 0 800 500"`.
- **Predefined Entities**: Both files contain valid `&amp;` entities (e.g. Line 32 in both files: `&amp; RÉACTION`, `&amp; ANTAGONISME`; Line 133 in schematic 2: `&amp; perte de densité`). These conform strictly to XML 1.0.
- **Unicode Chemical Glyphs**: Chemical formulas use Unicode subscript digits (`CaCO₃`, `HNO₃`, `Ca(NO₃)₂`, `H₂O`, `CO₂↑`, `Al₂O₃`). Under XML 1.0, all valid UTF-8 character points outside of markup delimiters (`<`, `&`) are 100% legal `CharData`.
- **Element Nesting & Tag Closing**: All `<rect>`, `<circle>`, `<line>`, and `<path>` tags are properly self-closed (`/>`). All `<text>`, `<g>`, `<defs>`, and `<style>` blocks have matching end tags.
- **Attribute Quoting**: All attribute values are properly double-quoted.

**Conclusion of Audit**: Eradication of the 8 `&bull;` entity references is necessary and sufficient to make both SVGs 100% compliant XML documents.

---

## 3. Comparative Evaluation of Remediation Approaches

Three technical approaches were evaluated:

| Criterion | Option A: `&#8226;` (Decimal Numeric Entity) | Option B: `•` (Literal UTF-8 Character) | Option C: Internal DTD Entity Declaration |
|:---|:---:|:---:|:---:|
| **XML 1.0 Specification Conformance** | **100% Native** (Section 4.1 Character Reference) | **100% Native** (Valid UTF-8 CharData) | Valid XML, but non-standard for web SVGs |
| **Encoding Robustness** | **Optimal**: 7-bit ASCII safe (`&#8226;`). Immune to UTF-8/ISO-8859 byte corruption or Windows code-page shifts | Moderate: 3-byte sequence (`\xE2\x80\xA2`). Can degrade to `â€¢` if opened with incorrect encoding | Moderate: adds DOCTYPE overhead |
| **Test Suite Compatibility** | **100% Pass**: Explicitly whitelisted in `tests/adversarial-m1.test.mjs` line 79 (`!e.startsWith('&#')`) | **100% Pass**: Not flagged as an entity reference | Fails if DOCTYPE disallowed |
| **Chromium Blink DOMParser** | Parses cleanly into Unicode character `•` (U+2022) with 0 parsererror nodes | Parses cleanly into Unicode character `•` with 0 parsererror nodes | May trigger XML security warnings |
| **Image Decoder Execution** | `naturalWidth: 240, naturalHeight: 150`, `failed: false` | `naturalWidth: 240, naturalHeight: 150`, `failed: false` | Identical |

### Recommendation
**Option A (`&#8226;`) is strongly recommended**:
It is an unambiguous, 7-bit ASCII-safe numeric character reference recognized natively by any XML 1.0 parser since 1998, eliminates any possibility of mojibake or double-encoding corruption, and is explicitly recognized by the test suite regex.

---

## 4. Empirical Verification & Evidence Chain

### 4.1 Verification 1: Python Standard XML Parser (`xml.etree.ElementTree`)
- **Before Fix**:
  ```
  SVG1 error: undefined entity: line 33, column 57
  SVG2 error: undefined entity: line 58, column 53
  ```
- **After Fix with `&#8226;`**:
  ```
  SVG1 with &#8226;: PARSED SUCCESSFULLY, root tag: {http://www.w3.org/2000/svg}svg
  SVG2 with &#8226;: PARSED SUCCESSFULLY, root tag: {http://www.w3.org/2000/svg}svg
  ```

### 4.2 Verification 2: Chromium Blink DOMParser in Electron
Executed headless Electron verification script `.agents/teamwork/teamwork_preview_explorer_m1_it2_1/verify_svg.cjs`:
```json
--- DOMParser in Chromium result ---
{
  "svg1_has_error": false,
  "svg1_error_text": null,
  "svg2_has_error": false,
  "svg2_error_text": null,
  "sample_text1": [
    "SOLNHOFEN (1796) • CaCO₃",
    "Hydrophile • Blancs",
    "Oléophile • Encre"
  ],
  "sample_text2": [
    "Épaisseur mécanique calibrée : 0,15 mm à 0,30 mm • Cintrable sur cylindre porte-plaque",
    "Hydrophile • Blancs",
    "Oléophile • Graphismes",
    "• Déficit d'eau : Graissage immédiat des fonds blancs",
    "• Excès d'eau : Émulsion de l'encre & perte de densité"
  ]
}
```

### 4.3 Verification 3: Live Image Decoding via `<img>` in Electron
Loaded both SVGs inside actual `.plate-img-box` structures with `onerror` handlers:
```json
--- LIVE RENDER IN CHROMIUM VIA IMG TAG ---
[
  {
    "boxIndex": 1,
    "complete": true,
    "naturalWidth": 240,
    "naturalHeight": 150,
    "imgDisplay": "block",
    "fallbackDisplay": "none"
  },
  {
    "boxIndex": 2,
    "complete": true,
    "naturalWidth": 240,
    "naturalHeight": 150,
    "imgDisplay": "block",
    "fallbackDisplay": "none"
  }
]
```
- Both images decode with `complete: true`.
- Neither `onerror` handler is invoked.
- `imgDisplay` remains `"block"` (visible).
- `fallbackDisplay` remains `"none"` (hidden).

### 4.4 Verification 4: Challenger Test Suite (`tests/adversarial-m1.test.mjs`)
Running simulation with `&#8226;`:
- Adversarial 1 (Zero Meta-Labels): **PASS**
- Adversarial 2 (SVG XML Well-Formedness & Entity Validity): **PASS (0 illegal entities)**
- Adversarial 3 (Image Fallback Contract & Layout Stability): **PASS**
- Adversarial 4 (Zero Mojibake / Double UTF-8): **PASS**
Overall Suite: **4/4 PASS (100%)**.

---

## 5. Formulated Exact Patch & Remediation Instructions

A complete unified diff patch has been generated and saved to:
`c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m1_it2_1\svg_xml_entity_fix.patch`

### 5.1 Modifications for `assets/schematic_reaction_pierre.svg`

#### Edit 1 (Line 33)
```xml
<<<< BEFORE
  <text x="776" y="32" class="subtitle">SOLNHOFEN (1796) &bull; CaCO₃</text>
==== AFTER
  <text x="776" y="32" class="subtitle">SOLNHOFEN (1796) &#8226; CaCO₃</text>
>>>>
```

#### Edit 2 (Line 45)
```xml
<<<< BEFORE
    <text x="175" y="16" class="label-head" fill="#0077B6">Hydrophile &bull; Blancs</text>
==== AFTER
    <text x="175" y="16" class="label-head" fill="#0077B6">Hydrophile &#8226; Blancs</text>
>>>>
```

#### Edit 3 (Line 82)
```xml
<<<< BEFORE
    <text x="155" y="16" class="label-head" fill="#E32619">Oléophile &bull; Encre</text>
==== AFTER
    <text x="155" y="16" class="label-head" fill="#E32619">Oléophile &#8226; Encre</text>
>>>>
```

---

### 5.2 Modifications for `assets/schematic_principe_planographique.svg`

#### Edit 1 (Line 58)
```xml
<<<< BEFORE
    Épaisseur mécanique calibrée : 0,15 mm à 0,30 mm &bull; Cintrable sur cylindre porte-plaque
==== AFTER
    Épaisseur mécanique calibrée : 0,15 mm à 0,30 mm &#8226; Cintrable sur cylindre porte-plaque
>>>>
```

#### Edit 2 (Line 68)
```xml
<<<< BEFORE
    <text x="175" y="16" class="label-head" fill="#0077B6">Hydrophile &bull; Blancs</text>
==== AFTER
    <text x="175" y="16" class="label-head" fill="#0077B6">Hydrophile &#8226; Blancs</text>
>>>>
```

#### Edit 3 (Line 94)
```xml
<<<< BEFORE
    <text x="155" y="16" class="label-head" fill="#E32619">Oléophile &bull; Graphismes</text>
==== AFTER
    <text x="155" y="16" class="label-head" fill="#E32619">Oléophile &#8226; Graphismes</text>
>>>>
```

#### Edit 4 (Line 128)
```xml
<<<< BEFORE
      &bull; Déficit d'eau : Graissage immédiat des fonds blancs
==== AFTER
      &#8226; Déficit d'eau : Graissage immédiat des fonds blancs
>>>>
```

#### Edit 5 (Line 133)
```xml
<<<< BEFORE
      &bull; Excès d'eau : Émulsion de l'encre &amp; perte de densité
==== AFTER
      &#8226; Excès d'eau : Émulsion de l'encre &amp; perte de densité
>>>>
```

---

## 6. Recommendations for Downstream Implementer & Test Hardening

1. **Apply the Unified Diff Patch**:
   Apply `svg_xml_entity_fix.patch` directly or replace all occurrences of `&bull;` with `&#8226;` in the two target SVG files.
2. **Add Regression Guard to `tests/e2e-presentation.test.mjs`**:
   Add an automated test in Tier 2 that asserts zero undeclared XML entities across all `.svg` files in `assets/`, ensuring that future schematics crafted for Milestones M2, M3, and M4 do not repeat this syntax regression.
3. **Run Pre-Commit Verification**:
   Execute:
   ```bash
   node --test tests/adversarial-m1.test.mjs
   npx electron tests/test-svg-render.cjs
   ```
   Confirm that `tests/test-svg-render.cjs` outputs `naturalWidth > 0`, `imgDisplay: "block"`, and `fallbackDisplay: "none"` for all images.
