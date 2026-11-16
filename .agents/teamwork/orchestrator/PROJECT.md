# Project: Les Plaques Offset Interactive Presentation

## Architecture
- **Platform**: Electron 31 frameless presentation application (1440x900 viewport, IPC window controls).
- **Core Presentation Stack**: Vanilla HTML5, native Swiss brutalist CSS (`style.css`), vanilla kinetic JavaScript (`script.js`).
- **Design Tokens**:
  - Background: `--color-bg: #FFFFFF`
  - Container light: `--color-light: #F4F5F6`
  - Border dark: `--color-dark: #0A0A0A`
  - Accent color: `--color-accent: #E32619`
  - Typography: `'Inter', Helvetica, Arial, sans-serif`
  - Animation curves: `--ease-kinetic: cubic-bezier(0.16, 1, 0.3, 1)`
- **Data Flow & Slide Lifecycle**:
  - All slides reside inside `<main class="deck" id="deck">`.
  - Exactly one slide is marked `.slide.active` at any time.
  - `#slideCounter` displays `#counterTrack` with vertical translateY animation plus `.counter-total`.
  - Keyboard handlers (Arrow keys, Space) and touch/button nav invoke `goToSlide(index)` in `script.js`.
  - Missing or loading diagram graphics automatically trigger `.plate-fallback` containers.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Purge Legacy Slides | Remove remnant digital-identity iceberg and tables | M1 | Survey |
| 2 | Front Cover Slide | Title, subtitle, Swiss brutalist layout | M1 | Blueprint p.1 |
| 3 | Table of Contents | Sommaire 6 Axes technologiques | M1 | Blueprint p.1 |
| 4 | Senefelder & Bavarian Limestone | Origin story, 1796, Solnhofen limestone | M1 | Blueprint p.1 |
| 5 | Chemical Reaction of Stone | Gum arabic + HNO3 pore penetration, hydrophilic salt | M1 | Blueprint p.1 |
| 6 | Metallic Evolution | Transition from limestone to Zinc (1860) and Aluminium (1824 Bauxite) | M1 | Blueprint p.1 |
| 7 | Planographic Principle | Flat surface, coexistence of oleophilic and hydrophilic zones | M1 | Blueprint p.1 |
| 8 | Monometallic Plates | Aluminium properties, lightness, thermal stability | M2 | Blueprint p.1 |
| 9 | Polymetallic Plates | 1-2 million impressions, layered metals (Cr, Cu, Steel) | M2 | Blueprint p.1 |
| 10 | Multimetal Architectures | Bimetallic (Cr/Brass), Trimetallic (Cr/Cu/Steel), Quadrimetallic | M2 | Blueprint p.1 |
| 11 | Role of Roughness | 3 wetting laws, smooth vs grained plate comparison | M2 | Blueprint p.2 |
| 12 | Mechanical Graining | Oscillating dry brush, microcavities, max 500k impressions | M2 | Blueprint p.2 |
| 13 | Chemical Brush Graining | Nylon brushes, pumice powder, acid attack, medium runs | M2 | Blueprint p.2 |
| 14 | Electrochemical Graining | AC acid bath, 4.5-10 µm film, 300 lpi screens, >1M runs | M3 | Blueprint p.2 |
| 15 | Surface Anodization | Al2O3 layer formation, surface hardening, anti-corrosion | M3 | Blueprint p.2 |
| 16 | Chromed Litho Plates | Natural chromium hydrophilicity, 2x less water, rigid supports | M3 | Blueprint p.2 |
| 17 | Diazo Photosensitive Layers | N2 diazonium molecules, UV decomposition, positive workflow | M3 | Blueprint p.3 |
| 18 | Photopolymer Layers | Monomer crosslinking, synthetic insoluble network, negative rotatives | M3 | Blueprint p.3 |
| 19 | Photochemical Mechanism Comparison | Step-by-step side-by-side positive vs negative cycle | M3 | Blueprint p.3 |
| 20 | Positive Plates Commercial Market | 80% market share, resolution, contrast, quality criteria | M4 | Blueprint p.3 |
| 21 | Negative Plates Press Market | Web rotary presses, newspapers, long run durability | M4 | Blueprint p.3 |
| 22 | 9 Objective Selection Criteria | Complete technical & economic decision matrix | M4 | Blueprint p.3 |
| 23 | Technical Synthesis & Close | Executive summary slide | M4 | Survey |
| 24 | Odometer & Engine Synchronization | 22-step counter sync, isTransitioning concurrency fix, window title | M4 | Engine Survey |
| 25 | Zero Meta-Labels Compliance | Eradication of "Personne X", "Page XX", authentic technical titles | All (M1-M4) | ORIGINAL_REQUEST |
| 26 | Vector / Schematic Placeholders | 17 structured visual containers with fallback error handling | All (M1-M4) | Blueprint Survey |
| 27 | Comprehensive E2E Test Suite | 4-tier requirement-driven opaque-box verification | Testing Track | ORIGINAL_REQUEST |
| 28 | Final E2E Test Pass & Coverage Hardening | 100% test pass + Tier 5 adversarial hardening | M5 | Project Pattern |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Build test runner and 4-tier automated test suite (`TEST_READY.md`) | none | **DONE** |
| M1 | Foundation & Part 1 | Clean legacy slides, window title, Slides 01-06 (Title, TOC, Part 1 Origine & Principe), zero meta-labels, SVG XML resolution, Swiss brutalist planar styling | none | **DONE** |
| M2 | Supports & Grainage | Slides 07-12 (Part 2 Supports mono/poly/multimétaux, Part 3 Grainage & Rugosité) | M1 | **IN_PROGRESS** |
| M3 | Électrolyse & Couches Sensibles | Slides 13-18 (Part 4 Électrograinage, Anodisation, Chrome; Part 5 Diazo & Photopolymères) | M2 | PLANNED |
| M4 | Typologie, Sélection & Engine | Slides 19-22 (Part 6 Positives/Négatives, 9 Critères, Clôture), sync odometer to 22, script fixes | M3 | PLANNED |
| M5 | Final E2E Pass & Hardening | Pass 100% E2E test suite (Tiers 1-4) + Tier 5 Adversarial Coverage Hardening + Forensic Audit | M4, E2E | PLANNED |

## Key Outputs of Completed Milestones
- **E2E Testing Track**: `tests/e2e-presentation.test.mjs` (68 automated tests across 4 tiers), `TEST_READY.md` published.
- **Milestone 1**: 
  - `index.html`: Purged 1100+ lines of legacy digital-identity code; deployed Slides 01–06 (`#slide-01` to `#slide-06`); updated brutalist odometer; removed diffuse shadows.
  - `style.css`: Added Swiss brutalist layout grids, `.sommaire-grid`, `.chem-formula-box`, `.plate-img-box`, `.plate-fallback`, arc sunbeam layout, and `.kinetic-rise`. Enforced planar styling.
  - `main.js`: Updated window title to `'Production des Formes Imprimantes — Les Plaques Offset'`.
  - `script.js`: Added type validation and `isTransitioning` concurrency lock at entry of `goToSlide()`.
  - `assets/`: Created valid XML 1.0 vector schematics `schematic_reaction_pierre.svg` (SCH-02) and `schematic_principe_planographique.svg` (SCH-03).
  - Gate: Certified CLEAN by Forensic Auditor, APPROVED by Reviewers 1 & 2 and Challengers 1 & 2.

## Interface Contracts
### Slide Structure Contract (HTML ↔ CSS ↔ JS)
- Every slide is a `<section class="slide" id="slide-[id]">` inside `<main class="deck" id="deck">`.
- Slide headers use `.slide-header` with `.slide-tag` (uppercase category tag) and `.slide-title`.
- Content containers use established archetypes: `.split-grid`, `.timeline-grid`, `.card-grid-3`, `.plate-stage`, `.matrix-grid`.
- Every technical diagram/schematic must include:
  ```html
  <div class="plate-img-box">
    <img src="assets/[filename]" alt="[Title]" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
    <div class="plate-fallback">
      <span style="font-size: 1.8rem;">[Icon/Emoji]</span>
      <strong>[Title]</strong>
      <small>assets/[filename]</small>
    </div>
  </div>
  ```

### Odometer Counter Contract (HTML ↔ JS)
- `#slideCounter` has `#counterTrack` containing `<div class="counter-step">01</div>` ... up to `<div class="counter-step">22</div>`.
- `.counter-total` text is strictly `/ 22`.
- `updateProgress()` in `script.js` translates `#counterTrack` vertically by `-currentSlide * 3.5rem`.

### Navigation Concurrency & Type Contract
- `goToSlide(index)` in `script.js` strictly sanitizes input:
  `if (typeof index !== 'number' || !Number.isInteger(index)) return;`
  `if (isTransitioning) return;`
  `if (index < 0 || index >= totalSlides) return;`
  `if (index === currentSlide) return;`
