# Codebase & Design System Survey: "Les Plaques Offset"

**Date:** 2026-10-23  
**Module:** Production des Formes Imprimantes  
**Target Application:** Interactive Electron Presentation Deck (`c:\Users\lufylon\Documents\antigravity\silly-euclid`)  
**Investigator:** Codebase & Design System Explorer  

---

## 1. Executive Summary & Architectural Overview

The presentation application is a high-performance, frameless Electron desktop deck built on an authentic **Swiss Brutalist** design philosophy. It avoids generic modern web frameworks, bloated UI libraries, and AI-generated rounded cards with drop shadows. Instead, it relies on strict typographic grids, stark high-contrast color palettes (pure white, deep near-black, and a vivid warm red accent `#E32619`), heavy crisp geometric rules, SVG registration target marks, and GPU-accelerated motion choreography.

### Current Repository State & Heritage
- **Origin:** The deck was originally scaffolded for a technical printing presentation ("La Flexographie" / INFO208), which established all fundamental Swiss layout primitives in `original_index.html` and `style.css`.
- **Intermediate State:** A transitional branch adapted parts of the code for "Concept d'Identité Numérique" (including a 3D iceberg model in Three.js).
- **Current Objective:** Rebuild the presentation to comprehensively cover the 6-part course blueprint on **"Les Plaques Offset" (Production des Formes Imprimantes)** without meta-labels (e.g., prohibiting "Personne 1", "Page 19"), external templates, or visual clutter.
- **Current `index.html` Status:** Exactly 8 slides currently exist in `index.html`. Slides 1 to 3 have been partially initiated for "Les Plaques Offset", while Slides 4 to 8 are leftover legacy slides from "Identité Numérique" and must be replaced by new granular Offset plate slides.

---

## 2. Swiss Brutalist Design Tokens & Styling Architecture

All global styling is centralized in `style.css`. Any new slide or component **must** strictly reuse the following tokens.

### 2.1 CSS Custom Properties (Design Tokens)

```css
:root {
    /* Color System */
    --color-bg: #FFFFFF;        /* Pure Paper White */
    --color-light: #F4F5F6;     /* Subtle Cool Industrial Concrete Gray */
    --color-gray: #E0E2E5;      /* Metallic Divider Neutral Gray */
    --color-dark: #0A0A0A;      /* Deep Pitch Industrial Black */
    --color-accent: #E32619;    /* Swiss Vivid Warm Red (Primary Accent) */

    /* Typography */
    --font-main: 'Inter', Helvetica, Arial, sans-serif;

    /* Spacing Scale */
    --space-sm: 1.5rem;         /* 24px */
    --space-md: 3rem;           /* 48px */
    --space-lg: 5rem;           /* 80px */

    /* Temporal Motion System */
    --t-micro: 0.15s;           /* Micro-interactions, button hover states */
    --t-short: 0.4s;            /* Fast element entry and dismissal */
    --t-med: 0.8s;              /* Standard element transitions */
    --t-long: 1.4s;             /* Major slide scene transitions */

    /* Cubic-Bezier Curves */
    --ease-kinetic: cubic-bezier(0.16, 1, 0.3, 1);     /* Aggressive snap start, long decelerating tail */
    --ease-scene: cubic-bezier(0.77, 0, 0.175, 1);      /* Symmetric S-curve for slide translations */
    --ease-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1); /* Elastic punch for interactive triggers */
}
```

### 2.2 Typography Rules
- **Font Stack:** Standard body and display font is `'Inter', sans-serif`. For historical / archival slides (such as Aloys Senefelder in Part 1), Google Fonts imports `'IM Fell English'` and `'IM Fell English SC'` are loaded.
- **Headings (`h1`, `h2`, `h3`):** `font-weight: 900; letter-spacing: -0.02em; line-height: 1.1; margin: 0;`
- **Huge Display Titles (`.huge-title`):** `font-size: 5vw; text-transform: uppercase;`
- **Slide Section Titles (`.slide-title`):** `font-size: 3.5vw; font-weight: 900; text-transform: uppercase; margin-bottom: var(--space-md);`
- **Subtitles (`.subtitle`):** `font-size: 2vw; font-weight: 500; color: var(--color-accent); margin-top: 1rem;`
- **Presenter & Section Badges (`.presenter-tag`):**
  ```css
  .presenter-tag {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 0.4rem 0.8rem;
      margin-bottom: var(--space-md);
      background-color: var(--color-dark);
      color: white;
  }
  .bg-dark .presenter-tag {
      background-color: var(--color-accent);
      color: white;
  }
  ```

### 2.3 Borders & Line Weights
- **Standard Structural Border:** `border: 2px solid var(--color-dark);`
- **Heavy Header Separator:** `border-bottom: 3px solid var(--color-dark);` or `border-bottom: 4px solid var(--color-dark);`
- **Hero Statement Accent Stroke:** `border-left: 8px solid var(--color-accent); padding-left: var(--space-md) !important;` (`.border-left-accent`)
- **Card Frames:** Crisp `3px solid var(--color-dark)` with zero or minimal `border-radius: 4px`. **Never** use soft floating borders (`box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-radius: 16px;` is forbidden).

### 2.4 Custom Bullet Points (Printing Registration Mark)
The project replaces generic bullet dots with an inline SVG mask representing a **press registration target mark** (a circle bisected by a crosshair):
```css
.bullet-list {
    list-style: none;
    font-size: 1.5vw;
    line-height: 1.5;
}
.bullet-list li {
    margin-bottom: 1.2rem;
    position: relative;
    padding-left: 2rem;
}
.bullet-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.35em;
    width: 0.9em;
    height: 0.9em;
    background-color: var(--color-accent);
    mask: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" stroke="black" stroke-width="2" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>') no-repeat center / contain;
    -webkit-mask: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" stroke="black" stroke-width="2" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>') no-repeat center / contain;
}
```

### 2.5 Background SVG Geometric Motifs (`.bg-motif`)
Each slide can feature subtle technical vector motifs positioned on corners (`.bg-motif-top-right`, `.bg-motif-bottom-right`, `.bg-motif-bottom-left`, `.bg-motif-top-left`).
- **Opacity:** `0.1` on white/light slides; `0.16` on dark/accent slides.
- **Pointer Events:** `pointer-events: none;`
- **Responsive:** Automatically hidden below 1200px width.

---

## 3. Motion & Animation Choreography Engine

The deck operates with an automated cinematic motion system orchestrated between `script.js` and `style.css`.

### 3.1 Kinetic Typography Splitting
When the deck boots in `script.js`, `initCinematicSystem()` iterates over all `.huge-title, .slide-title, .subtitle` elements:
1. Words are split into `<span class="word-wrapper"><span class="word" style="--word-idx: N">Word</span></span>`.
2. In CSS, inactive words are positioned at `translateY(115%) rotate(4deg)` with `opacity: 0` and `filter: blur(4px)`.
3. When the parent `.slide` receives the `.active` class, each word transitions smoothly to `translateY(0) rotate(0)` with a staggered transition delay calculated as:
   `transition-delay: calc(var(--base-delay) + (var(--word-idx) * 0.035s));`

### 3.2 Automated Layer Delay Staging
`script.js` scans each slide and groups elements into 4 depth tiers:
- **Tier 0:** `.presenter-tag` (`.anim-fade-up`)
- **Tier 1:** Titles / Typography (`.anim-title-container`)
- **Tier 2:** Bullets, list items, meta blocks, comparison titles (`.anim-fade-up`)
- **Tier 3:** Visuals, diagrams, placeholders (`.anim-visual`)

Each group receives a calculated `--base-delay` offset (starting at `0.2s` with `0.15s` sequence steps and `0.05s` staccato item increments).

### 3.3 Slide Transition Mechanics
- `.slide`: `position: absolute; inset: 0; visibility: hidden; pointer-events: none;`
- `.slide.active`: `visibility: visible; pointer-events: auto; z-index: 10;`
- `.slide.outgoing`: `visibility: visible; z-index: 5;`
- Slide transitions are directional: `.presentation-container[data-direction="next"]` or `[data-direction="prev"]`.
- The outgoing slide scales down to `0.9` with `blur(8px)` and translates by `10vw`, while the incoming slide glides from `15vw` with scale `1.05` down to `1.0`.

---

## 4. Current Codebase & Slide Inventory

An in-depth line-by-line examination of `c:\Users\lufylon\Documents\antigravity\silly-euclid\index.html` reveals 8 slide sections:

| Index | DOM ID | Category | Current Status | Notes & Structure |
|---|---|---|---|---|
| **1** | `#slide-1` (line 97) | Front Cover | **Offset (Keep & Polish)** | Front cover with title "LES PLAQUES OFFSET", subtitle "Origines, Supports, Grainage & Insolation", and 6 presenter names in a brutalist framed badge. |
| **2** | `#slide-origine` (line 118) | Part 1: Origine | **Offset (Keep & Polish)** | Vintage parchment background (`assets/parchment.jpg`), portrait of Aloys Senefelder (`assets/senefelder.jpg`), 1796 Lithographie on limestone. |
| **3** | `#slide-supports-3plates` (line 181) | Part 2: Supports | **Offset (Keep & Polish)** | Radiant Arc Sunbeam stage with 3 plate cards: Monométallique, Bimétallique, Trimétallique. Features `.plate-fallback` image placeholders. |
| **4** | `#slide-2` (line 479) | 3D Iceberg | **OUTDATED REMNANT** | Legacy slide from "Identité Numérique" with Three.js / Google model-viewer 3D iceberg canvas. Must be replaced with authentic Offset slides. |
| **5** | `#slide-3` (line 1513) | E-Réputation | **OUTDATED REMNANT** | Legacy slide from "Identité Numérique" with LinkedIn Face A / Face B comparison table. Must be replaced. |
| **6** | `#slide-4` (line 1538) | La Faille | **OUTDATED REMNANT** | Legacy slide from "Identité Numérique" with phishing / padlock bullets. Must be replaced. |
| **7** | `#slide-5` (line 1556) | Machine à Données | **OUTDATED REMNANT** | Legacy slide from "Identité Numérique" with RGPD / data conveyor belt text. Must be replaced. |
| **8** | `#slide-6` (line 1575) | Solutions & Conclusion | **OUTDATED REMNANT** | Legacy slide from "Identité Numérique" with 2FA / hygiene numerique text. Must be replaced. |

### 4.1 Asset Inventory (`assets/`)
The `assets/` directory currently contains:
- `parchment.jpg` (157 KB): Authentic background texture used for the historical Senefelder slide.
- `senefelder.jpg` (1.56 MB): Archival portrait of Aloys Senefelder.

All other schematics (e.g., `plaque_monometallique.png`, `plaque_bimetallique.png`, `plaque_trimetallique.png`, `grainage_mecanique.png`, etc.) do not yet exist on disk as files. They are handled cleanly via the **safe fallback placeholder pattern**, which gracefully displays a technical schematic box with icon, label, and target asset path whenever the image file is missing.

---

## 5. Layout Engine Catalog: 9 Production-Ready Slide Archetypes

From `style.css` and `original_index.html`, nine proven layout archetypes are fully styled and ready for authoring new slides:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ARCHETYPE OVERVIEW MATRIX                       │
├─────────────────────────┬──────────────────────────────────────────────┤
│ 1. Split Title/Content  │ 60/40 Split: Left text, Right image visual   │
│ 2. Split Asymmetric     │ 55/45 or 40/60 Split for rich body text      │
│ 3. Focus Visual Split   │ 50/50 Split: Left technical diagram, Rt list │
│ 4. Horizontal Timeline  │ Top header + Bottom animated process line    │
│ 5. Three Columns        │ Left title block + 2 color-contrasted cols   │
│ 6. 2x2 Quadrant Matrix  │ Title cell + Text cell + 2 visual media cells│
│ 7. Comparison Table     │ Top full header + 2 or 3 structured columns  │
│ 8. Centered Hero Block  │ High-impact summary with 8px accent border   │
│ 9. Radiant Arc Sunbeam  │ 3-card fanned perspective stage for types    │
└─────────────────────────┴──────────────────────────────────────────────┘
```

---

## 6. Reusable Markup Patterns & Authoring Guidelines

### Pattern 1: Title & Visual Split (`.grid-title`)
*Best for: Introducing a major topic with an accompanying schematic or photo on the right.*

```html
<section class="slide" id="slide-X">
    <div class="grid grid-title">
        <div class="slide-content bg-light text-dark">
            <div class="bg-motif bg-motif-top-right">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="20"/>
                    <line x1="0" y1="50" x2="100" y2="50"/><line x1="50" y1="0" x2="50" y2="100"/>
                </svg>
            </div>
            <span class="presenter-tag">Section 03 &bull; Traitement du Support</span>
            <h1 class="huge-title">Le Rôle de la<br>Rugosité</h1>
            <h2 class="subtitle">Adhérence & Rétention d'Eau</h2>
            <ul class="bullet-list" style="margin-top: 2rem;">
                <li><strong>Fixation de la couche :</strong> La rugosité microscopique ancre la couche photosensible sur l'aluminium.</li>
                <li><strong>Réserve d'eau de mouillage :</strong> Les micro-creux retiennent l'eau pour repousser efficacement l'encre grasse.</li>
            </ul>
        </div>
        <div class="slide-visual bg-dark text-light">
            <img src="assets/schema_rugosite_surface.png" alt="Micro-rugosité de l'aluminium" class="bg-image" onerror="this.style.opacity=0">
            <div class="visual-placeholder text-light">
                <span style="font-size: 2.2rem; display: block; margin-bottom: 0.5rem;">🔬</span>
                Schéma de Rugosité
                <small style="display: block; font-size: 0.75rem; opacity: 0.6; margin-top: 0.5rem; font-family: monospace;">assets/schema_rugosite_surface.png</small>
            </div>
        </div>
    </div>
</section>
```

---

### Pattern 2: Focus / Diagrammatic Split (`.grid-focus`)
*Best for: Technical diagrams, physical-chemical reactions, and step-by-step numbered breakdowns.*

```html
<section class="slide" id="slide-X">
    <div class="grid grid-focus">
        <div class="slide-focus-visual border-all" style="background: var(--color-light); padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div class="plate-img-box" style="width: 85%; height: 60%; background: #fff; border: 2px dashed rgba(0,0,0,0.25); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                <img src="assets/principe_eau_encre.png" alt="Principe Répulsion Eau et Encre" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="plate-fallback" style="display: none; flex-direction: column; align-items: center; text-align: center; gap: 0.4rem;">
                    <span style="font-size: 2.2rem;">⚖️</span>
                    <strong style="font-size: 1.1rem; color: var(--color-dark);">Répulsion Eau / Encre</strong>
                    <small style="font-family: monospace; color: #666;">assets/principe_eau_encre.png</small>
                </div>
            </div>
            <p style="margin-top: 1.2rem; font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-accent);">
                Zone hydrophile (Eau) vs Zone oléophile (Encre)
            </p>
        </div>
        <div class="slide-content bg-light">
            <div class="bg-motif bg-motif-top-right">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
            </div>
            <span class="presenter-tag">Partie 1 &bull; Principe Physico-Chimique</span>
            <h2 class="slide-title">L'Antagonisme Eau & Encre</h2>
            <div class="list-grid">
                <div class="list-item">
                    <svg class="bullet-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    <p><strong>Zones Non-Imprimantes :</strong> Hydrophiles (aiment l'eau) et oléophobes (repoussent les corps gras).</p>
                </div>
                <div class="list-item">
                    <svg class="bullet-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                    <p><strong>Zones Imprimantes :</strong> Oléophiles (acceptent l'encre grasse) et hydrophobes (repoussent le mouillage).</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### Pattern 3: Horizontal Header + Animated Timeline / Process (`.grid-horizontal`)
*Best for: Multi-step linear processes (e.g. Insolation, Dépouillement, Gommag/Finition, or Anodisation stages).*

```html
<section class="slide" id="slide-X">
    <div class="grid grid-horizontal">
        <div class="slide-header">
            <div class="bg-motif bg-motif-top-right">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1"><circle cx="50" cy="50" r="40"/><line x1="0" y1="50" x2="100" y2="50"/></svg>
            </div>
            <span class="presenter-tag">Procédé de Confection</span>
            <h2 class="slide-title" style="margin-bottom: 0;">Les 3 Étapes de Confection de la Forme</h2>
        </div>
        <div class="slide-body timeline-body">
            <div class="timeline-line"></div>
            <div class="timeline-container">
                <div class="timeline-step">
                    <div class="timeline-badge">01</div>
                    <div class="timeline-content">
                        <h3>1. Insolation UV</h3>
                        <p>Exposition sous vide aux rayonnements UV (350-420 nm) à travers un film ou par laser CTP.</p>
                    </div>
                </div>
                <div class="timeline-step">
                    <div class="timeline-badge">02</div>
                    <div class="timeline-content">
                        <h3>2. Développement</h3>
                        <p>Dépouillement chimique révélant les zones imprimantes et éliminant la couche superflue.</p>
                    </div>
                </div>
                <div class="timeline-step">
                    <div class="timeline-badge">03</div>
                    <div class="timeline-content">
                        <h3>3. Rinçage & Gomme</h3>
                        <p>Neutralisation et application d'une gomme arabique protectrice anti-oxydation.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### Pattern 4: Three-Column Categorical Comparison (`.grid-columns`)
*Best for: Comparing three categories (e.g. Grainage Mécanique, Grainage Chimique, Grainage Électrolytique).*

```html
<section class="slide" id="slide-X">
    <div class="grid grid-columns">
        <div class="slide-title-wrapper bg-light text-dark" style="position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: center;">
            <div class="bg-motif bg-motif-bottom-left">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><circle cx="50" cy="50" r="40"/></svg>
            </div>
            <span class="presenter-tag">Section 03 &bull; Grainage</span>
            <h2 class="slide-title">Les 3 Méthodes<br>de Grainage</h2>
            <p style="font-size: 1.1rem; color: #555; margin-top: 1rem; line-height: 1.4;">
                Transformation mécanique, chimique ou électrochimique du support d'aluminium.
            </p>
        </div>
        <div class="col bg-dark text-light">
            <h3 class="col-title flex-title">Mécanique</h3>
            <ul class="bullet-list tight">
                <li><strong>Procédé :</strong> Brossage avec billes de verre/quartz ou abrasifs.</li>
                <li><strong>Aspect :</strong> Rugosité grossière et directionnelle.</li>
                <li><strong>Usage :</strong> Anciennes plaques, faible résolution de trame.</li>
            </ul>
        </div>
        <div class="col bg-accent text-light">
            <h3 class="col-title flex-title">Électrochimique</h3>
            <ul class="bullet-list tight">
                <li><strong>Procédé :</strong> Bain d'acide chlorhydrique ou nitrique sous courant alternatif.</li>
                <li><strong>Aspect :</strong> Micro-rugosité uniforme et multidirectionnelle.</li>
                <li><strong>Usage :</strong> Standard CTP haute définition moderne.</li>
            </ul>
        </div>
    </div>
</section>
```

---

### Pattern 5: Multi-Column Comparison Table (`.grid-vertical` + `.flexo-3way-table`)
*Best for: High-density technical comparisons, such as Plaques Positives vs. Plaques Négatives.*

```html
<section class="slide" id="slide-X">
    <div class="grid grid-vertical bg-light">
        <div class="slide-header-full">
            <span class="presenter-tag">Section 06 &bull; Comparatif Industriel</span>
            <h2 class="slide-title text-center" style="margin-bottom: 0;">Plaques Positives vs Plaques Négatives</h2>
        </div>
        <div class="comparison-table flexo-3way-table">
            <div class="comp-col border-right">
                <h3 class="comp-title">Plaques Positives (80%)</h3>
                <ul class="bullet-list tight">
                    <li><strong>Chimie :</strong> Couches diazoïques insolubles devenant solubles aux UV.</li>
                    <li><strong>Marché :</strong> Dominante en Europe (80% des presses offset feuille).</li>
                    <li><strong>Point fort :</strong> Finesse du point de trame, reproduction haute fidélité.</li>
                </ul>
            </div>
            <div class="comp-col border-right">
                <h3 class="comp-title" style="color: var(--color-dark);">Plaques Négatives (20%)</h3>
                <ul class="bullet-list tight">
                    <li><strong>Chimie :</strong> Photopolymères qui durcissent et réticulent sous la lumière.</li>
                    <li><strong>Marché :</strong> Très utilisé aux USA et presse quotidienne rotative.</li>
                    <li><strong>Point fort :</strong> Résistance mécanique extrême aux très forts tirages.</li>
                </ul>
            </div>
            <div class="comp-col bg-dark text-light">
                <h3 class="comp-title" style="color: var(--color-accent);">Verdict Technique</h3>
                <ul class="bullet-list tight">
                    <li><strong>Positif :</strong> Labeur commercial, packaging de luxe, magazines d'art.</li>
                    <li><strong>Négatif :</strong> Journaux rotatifs, emballages carton ondulé grande série.</li>
                </ul>
            </div>
        </div>
    </div>
</section>
```

---

### Pattern 6: Centered Hero / Impact Summary (`.grid-center`)
*Best for: Major chapter introductions, concluding takeaways, and 9 criteria overview.*

```html
<section class="slide" id="slide-X">
    <div class="grid grid-center bg-dark text-light">
        <div class="content-wrapper-center">
            <div class="bg-motif bg-motif-bottom-right">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.5"><circle cx="50" cy="50" r="45"/><circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="15"/></svg>
            </div>
            <span class="presenter-tag" style="background: var(--color-accent);">Synthèse Industrielle</span>
            <h2 class="slide-title huge-title" style="margin-top: 1rem; margin-bottom: 2rem;">Les 9 Critères de Choix</h2>
            <ul class="bullet-list large-text border-left-accent">
                <li><strong>Tirage & Durabilité :</strong> Tirage court (mono-métal) vs tirage millionnaire (bi/trimétal).</li>
                <li><strong>Fidélité de Reproduction :</strong> Résolution du point, linéature (jusqu'à 200 LPI).</li>
                <li><strong>Sensibilité & Rapidité :</strong> Temps d'insolation laser CTP et débit horaire de confection.</li>
            </ul>
        </div>
    </div>
</section>
```

---

## 7. Anti-AI-Slop & Zero Meta-Label Rules

### 7.1 Strict Prohibition of Meta-Labels
The presentation is a high-level academic/industrial defense deck. **Meta-labels intended for course coordination or grading are strictly prohibited in user-facing slides.**

| ❌ STRICTLY FORBIDDEN IN HTML/TEXT | ✅ AUTHENTIC TECHNICAL REPLACEMENT |
|---|---|
| `Personne 1`, `Personne 2`, `Pour Personne 3` | `Origine & Principe`, `Supports Conventionnels`, `Traitement & Grainage` |
| `Slide de Badaoui`, `Slide pour Mhaitate` | `Section 01 : Procédé Lithographique`, `Section 04 : Anodisation` |
| `Page 19 à 22 du PDF`, `Page 20` | `Caractéristiques des Métaux`, `Structure Multi-Métallique` |
| `Slide 4 pour l'évaluation` | `Analyse Comparative des Couches Photosensibles` |
| Course notes or speaker cue cards embedded in UI | Clean bullet points with bold leading concepts (`<strong>Concept :</strong>`) |

### 7.2 Anti-AI-Slop Visual Checklist
1. **No Floating Cards with Diffuse Box Shadows:** Do not use `box-shadow: 0 20px 40px rgba(0,0,0,0.06); border-radius: 20px; background: rgba(255,255,255,0.8);`. Use solid `3px solid var(--color-dark);` with crisp corners.
2. **No Generic Gradient Badges:** Use stark black or signature red rectangles (`background: var(--color-accent); color: white; border-radius: 0;` or `border-radius: 4px;`).
3. **No Unstyled Broken Images:** Every schematic must include `onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"` followed by a styled `.plate-fallback` container.
4. **No Inline Font Clutter:** Stick strictly to `--font-main` (`'Inter'`), reserving serif fonts solely for the historical Senefelder slide.

---

## 8. Presentation Engine & Counter Synchronization

### 8.1 Brutalist Odometer Structure (`#slideCounter`)
The counter in the bottom-right corner consists of:
```html
<div class="brutalist-counter" id="slideCounter">
    <div class="counter-track" id="counterTrack">
        <div class="counter-step">01</div>
        <div class="counter-step">02</div>
        <!-- ... Up to final total slide count ... -->
        <div class="counter-step">NN</div>
    </div>
    <div class="counter-total">/ NN</div>
</div>
```

### 8.2 JavaScript Synchronization in `script.js`
In `script.js`:
- `const slides = document.querySelectorAll('.slide');` automatically counts the total number of `.slide` sections in the DOM (`totalSlides = slides.length`).
- `updateProgress()` executes:
  ```javascript
  container.setAttribute('data-slide', currentSlide + 1);
  if (counterTrack) {
      counterTrack.style.transform = `translateY(-${currentSlide * 3.5}rem)`;
  }
  ```
- **Crucial Rule for Slide Authoring Agents:** Whenever new slides are added to `index.html`:
  1. The `.counter-step` elements inside `#counterTrack` must match the exact number of slides (from `01` to `NN`).
  2. The `.counter-total` string must be updated to `/ NN` (padded to two digits, e.g. `/ 18`).
  3. No changes to `script.js` navigation logic are needed because `script.js` dynamically queries `document.querySelectorAll('.slide')`.

---

## 9. Conclusion & Actionable Next Steps

1. **Retain & Polish:** Slide 1 (`#slide-1`), Slide 2 (`#slide-origine`), and Slide 3 (`#slide-supports-3plates`).
2. **Remove & Replace:** Remove remnant slides 4 to 8 (`#slide-2`, `#slide-3`, `#slide-4`, `#slide-5`, `#slide-6`) from `index.html`.
3. **Implement Blueprint Sequence:** Insert dedicated granular slides for:
   - Part 1 completion (Chimie eau/encre, zones imprimantes/non-imprimantes).
   - Part 2 completion (Plaques quadrimétalliques, critères d'affinité eau/encre).
   - Part 3 (Rugosité, grainage mécanique vs chimique vs brosse).
   - Part 4 (Électrolyse, anodisation, couche d'oxyde Al₂O₃, plaques chromées).
   - Part 5 (Diazoïques vs Photopolymères, insolation UV, développement chimique, gommage).
   - Part 6 (Positif 80% vs Négatif 20%, les 9 critères de sélection, conclusion et remerciements).
4. **Synchronize Counter:** Update `#counterTrack` and `.counter-total` to match the final total slide count.
