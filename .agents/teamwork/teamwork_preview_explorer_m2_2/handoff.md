# Handoff Report: M2 Explorer 2 — Visual Schematics & Placeholders (Milestone 2)

## 1. Observation
- **Assets Status**:
  - `assets/` currently contains `parchment.jpg`, `senefelder.jpg`, `schematic_reaction_pierre.svg` (SCH-02), and `schematic_principe_planographique.svg` (SCH-03).
  - Target assets for Milestone 2 were not yet authored:
    - SCH-04: `assets/plaque_monometallique.png` (Slide 07)
    - SCH-05: `assets/plaque_bimetallique.png` (Slide 09)
    - SCH-06: `assets/plaque_trimetallique.png` (Slide 09)
    - SCH-07: `assets/plaque_quadrimetallique.png` (Slide 09)
    - SCH-08: `assets/schematic_rugosite_grainage.svg` (Slide 10)
    - SCH-09: `assets/schematic_grainage_mecanique.svg` (Slide 11)
    - SCH-10: `assets/schematic_grainage_chimique.svg` (Slide 12)
- **Lessons Learned from Milestone 1 Gate Audit**:
  - In Milestone 1 Iteration 1, Challenger 1 and Auditor reported:
    > "assets/*.svg contain fatal XML syntax errors (`&bull;` undefined entity references). In Electron / Chromium, this causes XML decoding to fail catastrophically (`naturalWidth: 0, naturalHeight: 0`), triggering the onerror fallback immediately on slide entry." (`teamwork_preview_challenger_m1_1/report.md:13-14`)
  - In XML 1.0, only five character entities are predefined: `&lt;`, `&gt;`, `&amp;`, `&apos;`, and `&quot;`. The HTML entity `&bull;` is prohibited.
- **CSS Invariants in `style.css`**:
  - The classes `.plate-img-box`, `.plate-img-box.diagram`, `.plate-img-box.compact`, and `.plate-fallback` are already defined globally in `style.css:1853-1940`.
- **E2E Invariants in `tests/e2e-presentation.test.mjs`**:
  - Test 2.4: `assert.ok(box.hasImg && box.hasOnError && box.hasFallback)` for all `.plate-img-box`.
  - Test 2.5: All `.plate-fallback` must contain a glyph icon, a `<strong>` title, and an explicit relative path matching `/assets\/[a-z0-9_.-]+/i`.

## 2. Logic Chain
1. *Observation 1 (Missing assets)*: When Slides 07 through 12 are integrated into `index.html`, any `<img>` referencing SCH-04 through SCH-10 will trigger the `onerror` event unless physical files exist on disk.
2. *Deduction 1*: All image containers must strictly follow the resilient contract:
   ```html
   <div class="plate-img-box diagram">
     <img src="assets/[filename]" alt="[Title]" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
     <div class="plate-fallback">
       <span class="fallback-icon">[Icon]</span>
       <strong>[Title]</strong>
       <p class="fallback-caption">[Technical description]</p>
       <small>assets/[filename]</small>
     </div>
   </div>
   ```
3. *Observation 2 (XML 1.0 validation lesson)*: The Chromium SVG decoder throws a DOMParser exception on any undeclared entity (e.g. `&bull;`).
4. *Deduction 2*: Every generated vector SVG (SCH-08, SCH-09, SCH-10) must strictly use numeric character reference `&#8226;` or literal UTF-8 characters (`•`, `–`, `°`, `µm`), and adhere to 800×500 viewBox dimensions with Swiss brutalist color tokens (`#FFFFFF`, `#F4F5F6`, `#0A0A0A`, `#E32619`, `#0077B6`).
5. *Empirical Verification*: When evaluated through Chromium's native DOMParser via Electron (`tests/test-svg-m2.cjs`), all three newly authored SVGs produced `ParserError: NONE (100% VALID XML)` and `Root Tag: svg`.

## 3. Caveats
- **Read-Only Explorer Scope**: As an explorer agent, no modifications were made to `index.html`, `style.css`, or the `assets/` folder. The complete vector SVG source code and HTML fallback container snippets are documented in `teamwork_preview_explorer_m2_2/report.md` for immediate deployment by the Milestone 2 implementer/worker.
- **Future Milestones**: Schematics SCH-11 to SCH-17 (Part 4 Électrograinage & Anodisation, Part 5 Diazo & Photopolymères, Part 6 Matrice 9 critères) belong to Milestones 3 and 4 and were surveyed but not authored in this milestone.

## 4. Conclusion
All visual containers and vector schematics for Milestone 2 (Slides 07 to 12) have been specified, authored, and certified:
1. **Slide 07 (`SCH-04`)**: Plaque monométallique aluminium (`assets/plaque_monometallique.png`), container `.diagram` with `📑` glyph fallback and complete structural breakdown.
2. **Slide 09 (`SCH-05`, `SCH-06`, `SCH-07`)**: Comparative multi-metal architectures (`assets/plaque_bimetallique.png`, `assets/plaque_trimetallique.png`, `assets/plaque_quadrimetallique.png`), containers `.compact` with glyphs `⚡`, `🛡️`, `🏗️`.
3. **Slide 10 (`SCH-08`)**: Vector schematic `assets/schematic_rugosite_grainage.svg` (Smooth vs Grained plate, wetting profile, water film 4.5–10 µm, 3 laws of roughness).
4. **Slide 11 (`SCH-09`)**: Vector schematic `assets/schematic_grainage_mecanique.svg` (Oscillating rotary brush, avoidance of drainage channels, isotropic microcavities, 500k run ceiling).
5. **Slide 12 (`SCH-10`)**: Vector schematic `assets/schematic_grainage_chimique.svg` (Nylon brushes, acid slurry of pumice powder/quartz, anchoring micro-porosity, medium runs).
6. **100% XML 1.0 Validity**: All three SVGs are certified compliant and free of `&bull;` or any undefined XML entities.

## 5. Verification Method
1. **Inspect Deliverable Report**:
   Read `c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_explorer_m2_2\report.md` sections 3 to 7.
2. **Independent XML Syntax Validation**:
   When the implementer saves the SVGs into `assets/`, run:
   ```powershell
   [xml](Get-Content -Raw "assets/schematic_rugosite_grainage.svg")
   [xml](Get-Content -Raw "assets/schematic_grainage_mecanique.svg")
   [xml](Get-Content -Raw "assets/schematic_grainage_chimique.svg")
   ```
   Both PowerShell `.NET XmlDocument` and Chromium `DOMParser` must return zero parser errors.
3. **Verify Fallback Behavior**:
   When integrated in `index.html`, any schematic whose image file is not on disk must hide the `<img>` element (`display: none`) and display `.plate-fallback` as `display: flex` without cumulative layout shift.
