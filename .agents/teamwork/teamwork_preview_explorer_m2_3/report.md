# Rapport d'Architecture de Style & Cinématique : Slides 07 à 12 (Milestone 2)

**Auteur :** M2 Explorer 3 (Styling & Layout Architecture)  
**Destinataire :** Orchestrateur (`ef092575-fdfa-43c8-adf3-ee84ceec1245`) & M2 Builder  
**Date :** 2026-10-23  
**Statut :** Architecture Validée & Spécifications CSS Complètes  
**Cible :** `style.css` (Milestone 2 : Supports des Plaques Conventionnelles & Grainage)

---

## 1. Executive Summary & Objectifs

Le présent rapport établit la formulation exhaustive des classes de mise en page CSS, de la hiérarchie typographique et de la chorégraphie cinématique pour les **Slides 07 à 12** du projet *« Production des Formes Imprimantes — Les Plaques Offset »*.

Toutes les règles formulées appliquent scrupuleusement les principes du **brutalisme suisse** établis par le projet :
1. **Zéro ombre diffuse ("Anti-AI-Slop") :** Proscription formelle de tout `box-shadow` différent de `none` ou de flous d'élévation, conformément au test automatisé `2.12` et au banc `test-anti-slop.test.mjs`.
2. **Géométrie planaire rigoureuse :** Application systématique de `border-radius: 0` sur l'ensemble des conteneurs, cartes, badges, et boutons.
3. **Lignes structurelles franches :** Encadrements nets `2px solid var(--color-dark)` ou `3px solid var(--color-dark)`, et accents directionnels vifs `var(--color-accent)` (`#E32619`).
4. **Cinématique cinétique GPU synchronisée :** Intégration harmonieuse avec le moteur d'animation `script.js` (`--ease-kinetic`, word-splitting, staging de délais par niveau `--base-delay`, et utilitaire `.kinetic-rise`).
5. **Couverture des assertions E2E :** Validation directe des exigences de contenu des tests Tier 1 (3.1 à 3.5 pour Part 2, 4.1 à 4.5 pour Part 3), ainsi que de l'intégrité odométrique à 12 pas.

---

## 2. Analyse des Besoins de Mise en Page par Diapositive

### 2.1 Slide 07 : 2.1 Les Plaques Monométalliques (Aluminium Showcase)
- **Objectif thématique :** Présentation du support unitaire en aluminium, de ses propriétés mécaniques (densité 2,7 g/cm³, ductilité, calage aisé), de sa stabilité thermique dimensionnelle pour la quadrichromie, et de sa passivation naturelle par couche étanche d'alumine ($Al_2O_3$).
- **Garantie d'invariants (Test 3.1) :** Présence impérative des termes `monométallique` et de `légèreté`, `ductile` ou `stabilité`.
- **Architecture de Layout :** Grille asymétrique `.grid-title` (60% texte / 40% média).
  - *Colonne gauche (`.slide-content`) :* `.presenter-tag`, `.slide-title`, `.subtitle`, `.bullet-list`, et conteneur de données physiques clés `.brutalist-stat-strip`.
  - *Colonne droite (`.slide-visual`) :* Encadrement `.schematic-sidebar` avec séparateur vertical `border-left: 3px solid var(--color-dark)`, boîte `.plate-img-box.diagram` intégrant `assets/plaque_monometallique.png` (SCH-04), et cartouche technique `.schematic-caption-box`.

### 2.2 Slide 08 : 2.2 Les Plaques Polymétalliques (Endurance 1 à 2 Millions)
- **Objectif thématique :** Fondation industrielle des plaques multicouches destinées aux très longs tirages (1 à 2 millions de tours), basée sur la dissociation fonctionnelle (chimique vs mécanique), et décomposition des 4 métaux fondamentaux : Chrome ($Cr$), Cuivre ($Cu$), Laiton (70/30) et Acier ($Fe$).
- **Garantie d'invariants (Test 3.2) :** Présence impérative des termes `polymétallique` et de `1 à 2 millions` ou `longs tirages`.
- **Architecture de Layout :** Layout vertical `.grid-vertical` avec en-tête `.slide-header` et corps `.slide-body` structuré en division 38% / 62% :
  - *Bloc gauche (`.polymetal-philosophy-card`) :* Carte explicative de la spécialisation des affinités chimiques, encadrée en `2px solid var(--color-dark)`, avec cartouche inférieur `.brutalist-callout` spécifiant le domaine industriel (packaging, rotatives d'emballage).
  - *Bloc droit (`.metals-matrix-grid`) :* Grille 2×2 composant 4 cartes `.metal-matrix-card` pour chaque métal, avec contraste accentué pour le Cuivre (`border-color: var(--color-accent)`).

### 2.3 Slide 09 : 2.3 Architecture Comparée des Couches (Bi vs Tri vs Quadrimétallique)
- **Objectif thématique :** Confrontation directe en coupe transversale des 3 architectures conventionnelles : Bimétallique (Chrome/Laiton), Trimétallique (Chrome/Cuivre/Acier ou Alu), et Quadrimétallique (Chrome/Cuivre acide/Cuivre basique/Acier trempé).
- **Garantie d'invariants (Tests 3.3, 3.4, 3.5) :**
  - Test 3.3 : `bimétallique`, `chrome`, `laiton`.
  - Test 3.4 : `trimétallique`, `cuivre`, `acier`.
  - Test 3.5 : `quadrimétallique`, `cuivre acide`, `cuivre basique`.
- **Architecture de Layout :** Grille 3 colonnes symétriques `.multimetal-grid` (`repeat(3, 1fr)`).
  - Chaque carte `.multimetal-card` comporte :
    1. Barre supérieure avec badge du nombre de métaux et palier de tirage machine.
    2. Titre d'architecture h3 en capitales.
    3. Vignette schématique compacte `.plate-img-box.compact` (`145px`).
    4. Empilement visuel normalisé `.plate-layers` matérialisant chaque couche via des pastilles carrées brutalistes `.layer-dot` spécifiquement colorées.
    5. Paragraphe explicatif de la gravure chimique sélective.
    6. Pied de carte avec verdict d'application industrielle.
  - La plaque quadrimétallique est mise en avant via `.multimetal-card.featured` (`border: 3px solid var(--color-accent)`).

### 2.4 Slide 10 : 3.1 Rôle de la Rugosité & Lois de Mouillabilité
- **Objectif thématique :** Exposition de l'inaptitude naturelle de l'aluminium poli (perlage et instabilité de l'eau), de la nécessité des crêtes et creux microscopiques pour piéger le ménisque d'eau, de la règle d'or de l'imprimeur (« minimum d'eau »), et des 3 lois fondamentales du mouillage.
- **Garantie d'invariants (Test 4.1) :** Présence impérative des termes `rugosité`, `minimum d'eau`, et de `crêtes`, `creux` ou `mouillage`.
- **Architecture de Layout :** Grille `.grid-title` (60/40) :
  - *Gauche :* Bannière d'impact `.wetting-golden-rule` avec liseré rouge 6px pour la citation fondamentale, suivie de la liste à puces structurant les 3 lois.
  - *Droite :* Boîte schématique SCH-08 (`assets/schematic_rugosite_grainage.svg`) illustrant la coupe microscopique comparative entre plaque lisse et plaque grainée.

### 2.5 Slide 11 : 3.2 Grainage Mécanique par Brossage Oscillant
- **Objectif thématique :** Procédé de brossage rotatif à sec (fils d'acier ou de bronze), rôle vital de l'oscillation transversale pour briser l'orientation des sillons et empêcher les fuites d'eau capillaires, et plafond d'endurance strict à 500 000 exemplaires.
- **Garantie d'invariants (Tests 4.2 & 4.3) :**
  - Test 4.2 : `grainage mécanique`, `brosses` ou `brossage`.
  - Test 4.3 : `oscillant` ou `oscillation`, et nombre `500 000`.
- **Architecture de Layout :** Grille `.grid-title` (60/40) :
  - *Gauche :* Exposé technique avec encadré d'avertissement cinématique `.process-alert-box` soulignant l'importance vitale du mouvement de va-et-vient, et badge d'endurance `.endurance-tag`.
  - *Droite :* Boîte schématique SCH-09 (`assets/schematic_grainage_mecanique.svg`) matérialisant les vecteurs de rotation et d'oscillation.

### 2.6 Slide 12 : 3.3 Grainage Chimique à Brosse (Poudre de Ponce)
- **Objectif thématique :** Synergie des brosses souples en nylon et de la barbotine acide de poudre de ponce ou quartz, profil d'adhérence mécanique pour couches diazoïques, et limites d'homogénéité confinant l'usage aux tirages moyens (100k à 300k ex).
- **Garantie d'invariants (Tests 4.4 & 4.5) :**
  - Test 4.4 : `grainage chimique`, `ponce` ou `quartz`, et `nylon`.
  - Test 4.5 : `moyens tirages` ou `adhérence`.
- **Architecture de Layout :** Grille `.grid-title` (60/40) :
  - *Gauche :* Spécification de la composition du bain et balance avantages (adhérence, mouillabilité) vs limites (anfractuosités profondes, voile de fond au développement).
  - *Droite :* Boîte schématique SCH-10 (`assets/schematic_grainage_chimique.svg`).

---

## 3. Tokens & Règles Stylistiques du Brutalisme Suisse

### 3.1 Tokens de Couleurs & Contraste
```css
:root {
    --color-bg: #FFFFFF;        /* Fond papier pur */
    --color-light: #F4F5F6;     /* Gris industriel béton */
    --color-gray: #E0E2E5;      /* Filets de délimitation secondaire */
    --color-dark: #0A0A0A;      /* Noir encre profond */
    --color-accent: #E32619;    /* Rouge vif suisse d'accentuation */
    --font-main: 'Inter', Helvetica, Arial, sans-serif;
}
```

### 3.2 Tokens Métalliques Dédiés aux Coupes Multi-Couches
Pour représenter les métaux de manière authentique sans ombrages dégradés, des aplats solides à haut contraste sont attribués :
- **Chrome ($Cr$) :** `#94A3B8` (Gris métallique froid, neutre hydrophile).
- **Cuivre ($Cu$) / Cuivre Acide :** `var(--color-accent)` (`#E32619`) ou `#DC2626` (Rouge cuivré dense, récepteur d'encre oléophile).
- **Cuivre Basique :** `#9A3412` (Bronze cuivré sombre, couche galvanique d'accroche).
- **Laiton (70/30) :** `#D97706` (Ocre doré industriel, alliage Cu/Zn).
- **Acier Mécanique ($Fe$) :** `var(--color-dark)` (`#0A0A0A`) ou `#334155` (Noir métallique trempé, armature).
- **Aluminium ($Al$) :** `#CBD5E1` (Gris argenté léger passivé).

### 3.3 Règles Géométriques Planaire & Solidité
- `border-radius: 0 !important;` : Aucune courbure sur les cartes, les boutons, les pastilles ou les badges.
- `box-shadow: none !important;` : Aucune ombre portée diffuse, aucun effet de flou néomorphique.
- `border: 2px solid var(--color-dark);` : Filets d'ossature principaux.
- `border: 3px solid var(--color-accent);` : Filets de focalisation visuelle (cartes vedettes, avertissements, badges prioritaires).

---

## 4. Spécification Détaillée des Classes CSS pour `style.css`

Voici le bloc de code CSS complet et autonome à intégrer dans `style.css` à la fin de la section M1 (après la ligne 2095) :

```css
/* ========================================================================== */
/* MILESTONE 2 : SUPPORTS CONVENTIONNELS & GRAINAGE (SLIDES 07 À 12)          */
/* Architecture CSS Brutaliste Suisse & Chorégraphie Cinétique                */
/* ========================================================================== */

/* 1. Utilitaires Partagés & Lignes de Structure */
.brutalist-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding: 0.25rem 0.6rem;
    background: var(--color-dark);
    color: #FFFFFF;
    border-radius: 0;
    line-height: 1;
}

.brutalist-tag.accent {
    background: var(--color-accent);
    color: #FFFFFF;
}

.brutalist-tag.outline {
    background: transparent;
    border: 1.5px solid var(--color-dark);
    color: var(--color-dark);
}

.brutalist-mini-badge {
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.15rem 0.45rem;
    border-radius: 0;
}

/* Bandeau latéral pour intégration de schémas (Slides 07, 10, 11, 12) */
.schematic-sidebar {
    background: #FFFFFF;
    border-left: 3px solid var(--color-dark);
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.schematic-sidebar-inner {
    width: 100%;
    max-width: 440px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.schematic-caption-box {
    text-align: left;
    width: 100%;
    max-width: 440px;
    border-left: 3px solid var(--color-accent);
    padding-left: 1rem;
    margin-top: 1.5rem;
}

.schematic-caption-tag {
    font-size: 0.82rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-accent);
}

.schematic-caption-text {
    font-size: 0.85rem;
    color: #444444;
    margin-top: 0.3rem;
    line-height: 1.4;
}

/* 2. Slide 08 : Layout des Plaques Polymétalliques & Matrice 4 Métaux */
.polymetal-split-layout {
    display: grid;
    grid-template-columns: 38% 62%;
    gap: 2.5rem;
    width: 100%;
    align-items: stretch;
}

.polymetal-philosophy-card {
    background: #FFFFFF;
    border: 2px solid var(--color-dark);
    padding: 1.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0;
}

.polymetal-callout {
    margin-top: 1.2rem;
    padding: 0.8rem 1rem;
    background: var(--color-light);
    border-left: 3px solid var(--color-accent);
    font-size: 0.8rem;
    color: #333333;
    line-height: 1.4;
}

.metals-matrix-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
    width: 100%;
}

.metal-matrix-card {
    background: #FFFFFF;
    border: 2px solid var(--color-dark);
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0;
    transition: border-color var(--t-short) ease;
}

.metal-matrix-card.featured {
    border-color: var(--color-accent);
}

.metal-matrix-card:hover {
    border-color: var(--color-accent);
}

.metal-matrix-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.6rem;
}

.metal-matrix-title {
    font-size: 1.15rem;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0 0 0.5rem 0;
    color: var(--color-dark);
    line-height: 1.2;
}

.metal-matrix-desc {
    font-size: 0.85rem;
    color: #555555;
    line-height: 1.42;
    margin: 0;
}

.metal-matrix-footer {
    margin-top: 0.8rem;
    padding-top: 0.5rem;
    border-top: 1px solid #EEEEEE;
    font-size: 0.75rem;
    font-weight: 700;
    color: #777777;
}

.metal-matrix-card.featured .metal-matrix-footer {
    border-top-color: #FECACA;
    color: var(--color-accent);
}

/* 3. Slide 09 : Architecture Comparée des Couches (Grille Multimétaux) */
.multimetal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.8rem;
    width: 100%;
    align-items: stretch;
}

.multimetal-card {
    background: #FFFFFF;
    border: 2px solid var(--color-dark);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0;
    transition: border-color var(--t-short) ease;
}

.multimetal-card.featured {
    border: 3px solid var(--color-accent);
}

.multimetal-card:hover {
    border-color: var(--color-accent);
}

.multimetal-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
}

.multimetal-card-title {
    font-size: 1.3rem;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0 0 1rem 0;
    color: var(--color-dark);
    line-height: 1.2;
}

.multimetal-card-desc {
    font-size: 0.84rem;
    color: #555555;
    line-height: 1.45;
    margin: 0;
}

.multimetal-card-footer {
    margin-top: 1rem;
    padding-top: 0.6rem;
    border-top: 1px solid #EEEEEE;
    font-size: 0.78rem;
    color: #777777;
}

.multimetal-card.featured .multimetal-card-footer {
    border-top-color: #FECACA;
    color: var(--color-accent);
    font-weight: 700;
}

/* Nuances spécifiques des pastilles de couches (.layer-dot) */
.layer-dot.dot-chrome {
    background: #94A3B8;
    border: 1px solid var(--color-dark);
}

.layer-dot.dot-copper {
    background: var(--color-accent);
}

.layer-dot.dot-brass {
    background: #D97706;
}

.layer-dot.dot-steel {
    background: var(--color-dark);
}

.layer-dot.dot-cu-acid {
    background: #DC2626;
}

.layer-dot.dot-cu-basic {
    background: #9A3412;
}

/* 4. Slide 10 : Règle d'Or du Mouillage & Cartouches de Rugosité */
.wetting-golden-rule {
    background: #FFFFFF;
    border: 2px solid var(--color-dark);
    border-left: 6px solid var(--color-accent);
    padding: 1.1rem 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 0;
}

.wetting-golden-rule-label {
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--color-accent);
    display: block;
    margin-bottom: 0.25rem;
}

.wetting-golden-rule-quote {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--color-dark);
    margin: 0;
    line-height: 1.35;
}

/* 5. Slides 11 & 12 : Process Specification Containers */
.process-alert-box {
    background: #FFFFFF;
    border: 2px solid var(--color-dark);
    border-left: 5px solid var(--color-accent);
    padding: 0.9rem 1.2rem;
    margin: 1.2rem 0;
    font-size: 0.92rem;
    line-height: 1.45;
    border-radius: 0;
}

.process-alert-title {
    font-size: 0.8rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-accent);
    margin-bottom: 0.3rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.endurance-tag {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.3rem 0.7rem;
    background: var(--color-dark);
    color: #FFFFFF;
    border-radius: 0;
}

.endurance-tag.accent {
    background: var(--color-accent);
    color: #FFFFFF;
}
```

---

## 5. Chorégraphie Cinétique & Intégration avec `script.js`

### 5.1 Staging Hiérarchique Automatique
Le moteur d'initialisation cinétique dans `script.js` (`initCinematicSystem()`, lignes 76 à 106) partitionne automatiquement le contenu de chaque diapositive en 4 groupes étagés selon la séquence temporelle :

| Groupe | Sélecteurs Détectés | Rôle & Animation | Délai Stagger (`--base-delay`) |
|---|---|---|---|
| **Groupe 0** | `.presenter-tag, .slide-tag` | Apparition nette du badge thématique (`.anim-fade-up`) | `0.20s` |
| **Groupe 1** | `.anim-title-container` (`.huge-title`, `.slide-title`, `.subtitle`) | Révélation mot par mot (`.word-wrapper`, rotation $4^\circ \rightarrow 0^\circ$, `translateY(115%) \rightarrow 0`) | `0.20s + (word_idx \times 0.035s)` |
| **Groupe 2** | `.bullet-list li`, `.polymetal-philosophy-card`, `.metal-matrix-card`, `.multimetal-card`, `.wetting-golden-rule`, `.process-alert-box`, `.kinetic-rise` | Élévation fluide (`.anim-fade-up`, `translateY(3vw) \rightarrow 0`, clip-path unmasking) | `0.35s + (item_idx \times 0.05s)` |
| **Groupe 3** | `.slide-visual`, `.schematic-sidebar`, `.plate-img-box` | Déploiement du visuel (`.anim-visual`, `clip-path: inset(100% \rightarrow 0)`, zoom stabilisateur $1.6 \rightarrow 1.0$) | `0.50s` |

### 5.2 Optimisation du Rendement GPU
- Toutes les transitions s'appuient sur `transform`, `opacity` et `clip-path` sous `will-change`, évitant les recalcules de flux (`layout reflow`).
- Utilisation de la courbe d'accélération brutale `--ease-kinetic` (`cubic-bezier(0.16, 1, 0.3, 1)`), conférant aux éléments une attaque fulgurante suivie d'une longue décélération d'ancrage.
- Zéro dérive de position (`translateY`) au survol souris pour préserver la stricte stabilité de lecture prescrite par le test anti-slop `2.12`.

---

## 6. Vérification des Invariants & Alignement du Banc de Test

| Catégorie de Test | Tests E2E Ciblés | Propriétés CSS & Layout Validées |
|---|---|---|
| **Tier 1 : Part 2 (Supports)** | Tests `3.1`, `3.2`, `3.3`, `3.4`, `3.5` | Layouts dédiés (`.grid-title`, `.polymetal-split-layout`, `.metals-matrix-grid`, `.multimetal-grid`, `.plate-layers`), préservant les marqueurs textuels et typographiques. |
| **Tier 1 : Part 3 (Grainage)** | Tests `4.1`, `4.2`, `4.3`, `4.4`, `4.5` | Bannières et cartouches d'impact (`.wetting-golden-rule`, `.process-alert-box`, `.endurance-tag`) encapsulant les seuils critiques (`minimum d'eau`, `500 000`, `brossage oscillant`, `poudre de ponce`, `nylon`). |
| **Tier 2 : Anti-Slop (2.12)** | `test-anti-slop.test.mjs` & Test `2.12` | Strictement 0 `box-shadow` différent de `none`, strictement 0 `border-radius > 0`. Lignes nettes et angles droits stricts. |
| **Tier 3 : Odomètre (3.6-3.8)** | Tests `3.6`, `3.7`, `3.8`, `3.9` | Compatibilité totale de l'odomètre étendu à 12 pas consécutifs (`01` à `12`, `/ 12`), hauteur d'étape calibrée à `3.5rem` (`translateY(-${currentSlide * 3.5}rem)`). |

---

## 7. Recommandations d'Intégration pour le M2 Builder

1. **Ajout des classes dans `style.css` :** Insérer le bloc CSS de la Section 4 à la suite de `style.css`.
2. **Harmonisation des balises :** Utiliser les nouvelles classes sémantiques (`.schematic-sidebar`, `.polymetal-split-layout`, `.metals-matrix-grid`, `.metal-matrix-card`, `.multimetal-grid`, `.multimetal-card`, `.wetting-golden-rule`, `.process-alert-box`) en complément du markup conçu par Explorer 1 pour éliminer les styles inline redondants et pérenniser la maintenabilité.
3. **Contrôle de validation immédiat :**
   ```powershell
   node --test tests/test-anti-slop.test.mjs
   node --test tests/e2e-presentation.test.mjs
   ```
