# Spécification Technique & Visual Schematics : Slides 01 à 06 (Milestone 1)
**Auteur :** M1 Explorer 2 (Visual Schematics & Placeholders)  
**Date :** 2026-10-23  
**Dépôt :** `c:\Users\lufylon\Documents\antigravity\silly-euclid`  
**Statut :** Spécification Validée & Prête pour Intégration  

---

## 1. Executive Summary & Objectifs Visuels

Ce rapport établit la spécification authoritative complète pour l'ensemble des conteneurs visuels, graphiques vectoriels, diagrammes techniques et mécanismes de repli d'erreur (*error fallbacks*) pour les **Slides 01 à 06** (Page de Garde, Sommaire Général et Partie 1 : Origine & Principe Planographique).

### Directives Fondamentales
1. **Zéro Méta-Libellés :** Élimination catégorique de toute mention d'enseignement (« Personne X », « Slide pour Personne 1 », « Page 19 à 22 », « INFO208 »). Remplacement exclusif par une nomenclature d'ingénierie des arts graphiques.
2. **Alignement Brutaliste Suisse :** Respect absolu des tokens de `style.css` (`--color-bg: #FFFFFF`, `--color-light: #F4F5F6`, `--color-dark: #0A0A0A`, `--color-accent: #E32619`, `--ease-kinetic`, `--font-main: Inter`). Bannissement des cartes flottantes à coins arrondis mous et ombres floues (« AI slop »).
3. **Résilience Absolue des Images & Schémas :** Chaque conteneur d'image ou de schéma technique (`.plate-img-box`) intègre obligatoirement un gestionnaire d'erreur natif `onerror` qui bascule instantanément vers un conteneur de secours structuré (`.plate-fallback`) en cas de fichier manquant, sans provoquer de décalage de mise en page (*Cumulative Layout Shift*).
4. **Code SVG Autonome & Prêt à l'Emploi :** Le présent document fournit l'intégralité du code SVG pour `assets/schematic_reaction_pierre.svg` (SCH-02) et `assets/schematic_principe_planographique.svg` (SCH-03), pouvant être déployés directement en fichiers physiques ou embarqués *inline*.

---

## 2. Inventaire des Conteneurs Visuels & Cartographie (Slides 01–06)

| Slide ID | Titre Technique | Identifiant Schéma | Fichier Attendu | Dimensions Conteneur | Type de Visuel | Mode de Fallback |
|---|---|---|---|---|---|---|
| `slide-01` | Page de Garde | `HERO-01` | *N/A (Typographique)* | Plein écran (1440×900) | Typographie Brutaliste + Cibles de repérage | N/A |
| `slide-02` | Sommaire Général | `GRID-TOC` | *N/A (Grille 3×2)* | 6 Cartes (100% largeur) | Grille d'Axes Technologiques numérotés | N/A |
| `slide-03` | 1.1 Genèse Historique | `SCH-01` | `assets/senefelder.jpg` | 320px × 420px | Gravure historique (Aloys Senefelder 1796) | `.plate-fallback` avec icône cameo & métadonnées |
| `slide-04` | 1.2 Réaction Chimique | `SCH-02` | `assets/schematic_reaction_pierre.svg` | 440px × 320px | Schéma vectoriel de coupe micro-structurelle | `.plate-fallback` ou SVG vectoriel embarqué |
| `slide-05` | 1.3 Évolution Métallique | `CHRONO-01` | *N/A (Frise 3 blocs)* | 3 Colonnes comparatives | Cartes comparatives Pierre / Zinc / Aluminium | N/A |
| `slide-06` | 1.4 Principe Planographique | `SCH-03` | `assets/schematic_principe_planographique.svg` | 440px × 320px | Schéma vectoriel de surface plane & équilibre | `.plate-fallback` ou SVG vectoriel embarqué |

---

## 3. Slide 03 : Portrait d'Aloys Senefelder (`assets/senefelder.jpg`)

### 3.1 Analyse de l'Asset Existant
- **Chemin :** `assets/senefelder.jpg`
- **État :** Présent dans le dépôt (`size: 1 562 995 bytes`, ~1.56 Mo).
- **Nature :** Reproduction haute résolution d'une gravure d'époque représentant Aloys Senefelder en buste.

### 3.2 Spécification du Cadre & Typographie Brutaliste
Pour préserver la solennité historique sans tomber dans des ombres floues artificielles, le portrait est inséré dans un conteneur net à double bordure contrastée :

```html
<div class="slide-visual" style="background: white; border-left: 3px solid var(--color-dark); padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div class="plate-img-box hero cover-fit" style="width: 320px; height: 420px; border: 3px solid var(--color-dark); border-radius: 4px; box-shadow: 0 15px 35px rgba(0,0,0,0.12); margin-bottom: 1.5rem;">
        <img src="assets/senefelder.jpg" 
             alt="Portrait d'Aloys Senefelder (1771-1834)" 
             class="senefelder-img"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
             style="width: 100%; height: 100%; object-fit: cover; object-position: top center;">
        <div class="plate-fallback">
            <span class="fallback-icon" style="font-size: 2.8rem;">📜</span>
            <strong style="font-size: 1.15rem; margin-top: 0.5rem;">Aloys Senefelder (1771–1834)</strong>
            <p class="fallback-caption" style="font-size: 0.85rem; color: #555; max-width: 260px; line-height: 1.4;">
                Dramaturge bavarois et inventeur de la lithographie en 1796 sur pierre calcaire de Solnhofen.
            </p>
            <small style="font-family: monospace; font-size: 0.75rem; background: #E5E7EB; padding: 0.2rem 0.5rem; border: 1px solid #D1D5DB; margin-top: 0.4rem;">assets/senefelder.jpg</small>
        </div>
    </div>
    <div style="text-align: center; max-width: 340px;">
        <div style="font-size: 1.25rem; font-weight: 900; text-transform: uppercase; color: var(--color-dark); letter-spacing: -0.01em;">
            Aloys Senefelder
        </div>
        <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-accent); margin-top: 0.2rem;">
            Inventeur de la Lithographie (1796)
        </div>
        <p style="font-size: 0.82rem; color: #666; margin-top: 0.5rem; line-height: 1.4;">
            Substrat originel : Pierre calcaire de Solnhofen (Bavière). Ancêtre direct de la forme imprimante offset moderne.
        </p>
    </div>
</div>
```

### 3.3 Cinétique d'Animation
L'image bénéficie d'une transition GPU-accélérée lors de l'activation de la slide :
```css
#slide-03 .senefelder-img {
    opacity: 0;
    transform: translateY(20px) scale(0.96);
    transition: opacity 1.1s var(--ease-kinetic), transform 1.1s var(--ease-kinetic);
}
#slide-03.active .senefelder-img {
    opacity: 1;
    transform: translateY(0) scale(1);
}
```

---

## 4. Slide 04 : Schéma de Réaction Chimique de la Pierre (`assets/schematic_reaction_pierre.svg`, SCH-02)

### 4.1 Fondement Physico-Chimique à Représenter
Le calcaire de Solnhofen ($CaCO_3$) est un substrat poreux.
1. **Zones non-imprimantes (Hydrophiles) :**
   Application d'un mélange de gomme arabique et d'acide nitrique ($HNO_3$).
   Réaction chimique : $CaCO_3 + 2 HNO_3 \rightarrow Ca(NO_3)_2 + H_2O + CO_2 \uparrow$.
   L'acide nitrique et les molécules d'acide arabique réagissent avec le carbonate pour former un sel d'arabate de calcium hydrophile stable qui tapisse les micropores. Ce sel retient l'eau de mouillage qui forme un bouclier repoussant l'encre.
2. **Zones imprimantes (Oléophiles) :**
   L'encre grasse appliquée préalablement s'infiltre dans les pores non mordancés, saturant la pierre de corps gras insolubles (oléomargarate de calcium), créant une zone hydrophobe rejetant l'eau.

### 4.2 Conteneur HTML & Fallback Intégré
```html
<div class="slide-visual" style="background: white; border-left: 3px solid var(--color-dark); padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div class="plate-img-box diagram" style="width: 100%; max-width: 440px; height: 320px; border: 2px dashed rgba(10, 10, 10, 0.3); border-radius: 4px; margin-bottom: 1.5rem;">
        <img src="assets/schematic_reaction_pierre.svg" 
             alt="Schéma de Coupe Micro-Structurelle : Réaction Chimique sur Pierre Calcaire" 
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
             style="width: 100%; height: 100%; object-fit: contain;">
        <div class="plate-fallback">
            <span class="fallback-icon" style="font-size: 2.5rem;">🧪</span>
            <strong style="font-size: 1.05rem; margin-top: 0.4rem;">SCH-02 : Réaction Chimique de la Pierre</strong>
            <p class="fallback-caption" style="font-size: 0.82rem; color: #555; line-height: 1.35; max-width: 340px;">
                Gomme arabique + HNO₃ forment un sel d'arabate de calcium hydrophile, créant l'antagonisme physique avec l'encre grasse.
            </p>
            <small style="font-family: monospace; font-size: 0.72rem; background: #E5E7EB; padding: 0.2rem 0.5rem; border: 1px solid #D1D5DB; margin-top: 0.4rem;">assets/schematic_reaction_pierre.svg</small>
        </div>
    </div>
    <div style="text-align: left; max-width: 440px; border-left: 3px solid var(--color-accent); padding-left: 1rem;">
        <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent);">
            SCH-02 &bull; Mécanisme Réactionnel
        </div>
        <p style="font-size: 0.85rem; color: #444; margin-top: 0.3rem; line-height: 1.4;">
            Pénétration combinée de la gomme arabique et de l'acide nitrique ($HNO_3$) formant un film de sel hydrophile, bloquant l'encre grasse dans les porosités du calcaire.
        </p>
    </div>
</div>
```

### 4.3 Code Vectoriel Exhaustif : `assets/schematic_reaction_pierre.svg`
Ce SVG autonome respecte rigoureusement la palette Swiss brutaliste (`#0A0A0A`, `#E32619`, `#0077B6`, `#F4F5F6`) :

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <style>
      .title { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 900; font-size: 16px; fill: #FFFFFF; letter-spacing: 0.05em; }
      .subtitle { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 700; font-size: 12px; fill: #E32619; text-anchor: end; }
      .label-head { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 800; font-size: 13px; text-transform: uppercase; }
      .label-desc { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 500; font-size: 11px; fill: #333333; }
      .formula { font-family: 'Courier New', monospace; font-weight: 700; font-size: 13px; fill: #0A0A0A; }
      .badge-text { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 800; font-size: 10px; fill: #FFFFFF; text-anchor: middle; }
    </style>
    <!-- Crosshair Target Marker -->
    <pattern id="target-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
    </pattern>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#E32619" />
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0077B6" />
    </marker>
    <marker id="arrow-dark" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0A0A0A" />
    </marker>
  </defs>

  <!-- Background Canvas & Grid -->
  <rect width="800" height="500" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="3"/>
  <rect x="0" y="52" width="800" height="448" fill="url(#target-grid)" />

  <!-- Top Header Bar (Brutalist Dark) -->
  <rect x="0" y="0" width="800" height="52" fill="#0A0A0A"/>
  <text x="24" y="32" class="title">SCH-02 : COUPE MICROSTRUCTURELLE &amp; RÉACTION DU CALCAIRE</text>
  <text x="776" y="32" class="subtitle">SOLNHOFEN (1796) &bull; CaCO₃</text>

  <!-- Central Division Line -->
  <line x1="400" y1="52" x2="400" y2="440" stroke="#0A0A0A" stroke-width="2" stroke-dasharray="6 4"/>

  <!-- ====================================================================== -->
  <!-- ZONE GAUCHE : NON-IMPRIMANTE (HYDROPHILE)                              -->
  <!-- ====================================================================== -->
  <g transform="translate(40, 75)">
    <!-- Zone Badge -->
    <rect x="0" y="0" width="160" height="22" fill="#0077B6" rx="2"/>
    <text x="80" y="15" class="badge-text">ZONE NON-IMPRIMANTE</text>
    <text x="175" y="16" class="label-head" fill="#0077B6">Hydrophile &bull; Blancs</text>

    <!-- Infiltration Arrows -->
    <line x1="160" y1="45" x2="160" y2="90" stroke="#0077B6" stroke-width="3" marker-end="url(#arrow-blue)"/>
    <text x="160" y="40" class="label-desc" text-anchor="middle" font-weight="700" fill="#0077B6">Gomme Arabique + HNO₃</text>

    <!-- Water Film Layer (Top of Limestone) -->
    <rect x="0" y="95" width="320" height="18" fill="#90E0EF" stroke="#0077B6" stroke-width="1.5"/>
    <text x="160" y="108" class="label-desc" text-anchor="middle" font-weight="700" fill="#03045E">Film d'Eau de Mouillage (H₂O)</text>

    <!-- Limestone Substrate Block -->
    <rect x="0" y="113" width="320" height="150" fill="#EAE6DF" stroke="#0A0A0A" stroke-width="2"/>
    <text x="16" y="245" class="label-head" fill="#8D8175">Pierre Calcaire (CaCO₃)</text>

    <!-- Pores infiltrated with Hydrophilic Salt (Light Cyan Pores) -->
    <path d="M 40 113 Q 50 145 65 145 Q 80 145 75 113 Z" fill="#0096C7" stroke="#0A0A0A" stroke-width="1"/>
    <path d="M 120 113 Q 135 160 150 160 Q 165 160 160 113 Z" fill="#0096C7" stroke="#0A0A0A" stroke-width="1"/>
    <path d="M 210 113 Q 220 135 240 135 Q 260 135 250 113 Z" fill="#0096C7" stroke="#0A0A0A" stroke-width="1"/>
    <path d="M 280 113 Q 290 150 305 150 Q 315 150 310 113 Z" fill="#0096C7" stroke="#0A0A0A" stroke-width="1"/>

    <!-- Microscopic Reaction Label -->
    <rect x="40" y="180" width="240" height="42" fill="#FFFFFF" stroke="#0077B6" stroke-width="1.5"/>
    <text x="160" y="197" class="label-desc" text-anchor="middle" font-weight="700" fill="#0077B6">Sel d'Arabate de Calcium</text>
    <text x="160" y="212" class="label-desc" text-anchor="middle">Couche hautement hygroscopique</text>

    <!-- Grease Repulsion Arrow -->
    <path d="M 260 55 Q 260 85 290 85" fill="none" stroke="#E32619" stroke-width="2.5" marker-end="url(#arrow-red)"/>
    <text x="295" y="80" class="label-desc" font-weight="700" fill="#E32619">Encre Repoussée</text>
  </g>

  <!-- ====================================================================== -->
  <!-- ZONE DROITE : IMPRIMANTE (OLÉOPHILE)                                  -->
  <!-- ====================================================================== -->
  <g transform="translate(440, 75)">
    <!-- Zone Badge -->
    <rect x="0" y="0" width="140" height="22" fill="#E32619" rx="2"/>
    <text x="70" y="15" class="badge-text">ZONE IMPRIMANTE</text>
    <text x="155" y="16" class="label-head" fill="#E32619">Oléophile &bull; Encre</text>

    <!-- Inking Arrows -->
    <line x1="160" y1="45" x2="160" y2="90" stroke="#E32619" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="160" y="40" class="label-desc" text-anchor="middle" font-weight="700" fill="#E32619">Encre Grasse Lithographique</text>

    <!-- Greasy Ink Layer (Top of Limestone) -->
    <rect x="0" y="95" width="320" height="18" fill="#0A0A0A" stroke="#0A0A0A" stroke-width="1.5"/>
    <text x="160" y="108" class="label-desc" text-anchor="middle" font-weight="700" fill="#FFFFFF">Film d'Encre Grasse (Lipophile)</text>

    <!-- Limestone Substrate Block -->
    <rect x="0" y="113" width="320" height="150" fill="#EAE6DF" stroke="#0A0A0A" stroke-width="2"/>
    <text x="16" y="245" class="label-head" fill="#8D8175">Pierre Calcaire (CaCO₃)</text>

    <!-- Pores infiltrated with Greasy Ink (Black/Charcoal Pores) -->
    <path d="M 40 113 Q 50 155 65 155 Q 80 155 75 113 Z" fill="#0A0A0A" stroke="#0A0A0A" stroke-width="1"/>
    <path d="M 120 113 Q 135 140 150 140 Q 165 140 160 113 Z" fill="#0A0A0A" stroke="#0A0A0A" stroke-width="1"/>
    <path d="M 210 113 Q 220 165 240 165 Q 260 165 250 113 Z" fill="#0A0A0A" stroke="#0A0A0A" stroke-width="1"/>
    <path d="M 280 113 Q 290 135 305 135 Q 315 135 310 113 Z" fill="#0A0A0A" stroke="#0A0A0A" stroke-width="1"/>

    <!-- Oleomargarate Chemical Label -->
    <rect x="40" y="180" width="240" height="42" fill="#FFFFFF" stroke="#E32619" stroke-width="1.5"/>
    <text x="160" y="197" class="label-desc" text-anchor="middle" font-weight="700" fill="#E32619">Oléomargarate de Calcium</text>
    <text x="160" y="212" class="label-desc" text-anchor="middle">Liaisons grasses insolubles</text>

    <!-- Water Repulsion Droplet -->
    <path d="M 25 75 C 25 65 40 50 40 50 C 40 50 55 65 55 75 C 55 83 48 90 40 90 C 32 90 25 83 25 75 Z" fill="#90E0EF" stroke="#0077B6" stroke-width="1.5"/>
    <path d="M 58 70 Q 75 70 85 55" fill="none" stroke="#0077B6" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <text x="90" y="55" class="label-desc" font-weight="700" fill="#0077B6">Eau rejetée</text>
  </g>

  <!-- ====================================================================== -->
  <!-- BANDEAU INFÉRIEUR : ÉQUATION CHIMIQUE & LÉGENDE                        -->
  <!-- ====================================================================== -->
  <g transform="translate(40, 420)">
    <!-- Reaction Box -->
    <rect x="0" y="0" width="720" height="52" fill="#F4F5F6" stroke="#0A0A0A" stroke-width="2"/>
    <text x="20" y="22" class="label-head" fill="#E32619">Équation Clé :</text>
    <text x="125" y="22" class="formula">CaCO₃ + 2 HNO₃ ➔ Ca(NO₃)₂ + H₂O + CO₂↑</text>
    <text x="20" y="42" class="label-desc">
      Formation simultanée de sels d'arabinates hydrophiles dans les blancs et d'acides gras insolubles dans les graphismes.
    </text>

    <!-- Registration Target Bottom Right -->
    <circle cx="690" cy="26" r="14" fill="none" stroke="#0A0A0A" stroke-width="1.5"/>
    <line x1="690" y1="8" x2="690" y2="44" stroke="#0A0A0A" stroke-width="1.5"/>
    <line x1="672" y1="26" x2="708" y2="26" stroke="#0A0A0A" stroke-width="1.5"/>
  </g>
</svg>
```

---

## 5. Slide 05 : Architecture des Composants Visuels (Évolution Métallique)

Slide 05 met en scène la transition technologique en **3 phases chronologiques** à travers une grille à 3 cartes haute visibilité :

```html
<div class="slide-body" style="padding: 2rem 5vw 4rem 5vw; flex: 1; display: flex; align-items: center;">
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; width: 100%;">
        
        <!-- 1. Pierre Calcaire (1796) -->
        <div class="evolution-card" style="background: white; border: 2px solid var(--color-dark); border-radius: 4px; padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="display: inline-block; font-size: 0.8rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.25rem 0.6rem; border-radius: 2px; margin-bottom: 1rem;">
                    1796 &bull; SUBSTRAT ORIGINEL
                </div>
                <h3 style="font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin: 0 0 1rem 0; color: var(--color-dark);">
                    Pierre Calcaire
                </h3>
                <ul class="bullet-list" style="font-size: 0.95rem; line-height: 1.45;">
                    <li><strong>Atout :</strong> Microporosité naturelle parfaite, rétention d'eau sans égale.</li>
                    <li><strong>Poids :</strong> Blocs massifs de 20 à 80 kg très contraignants en atelier.</li>
                    <li><strong>Limite Critique :</strong> Rupture fragile sous pression, impossible à courber sur cylindre rotatif.</li>
                </ul>
            </div>
            <div style="margin-top: 1.5rem; padding-top: 0.8rem; border-top: 1px solid #ddd; font-size: 0.8rem; color: #777;">
                Utilisation : Presses manuelles plates & estampes d'art.
            </div>
        </div>

        <!-- 2. Zinc Monométallique (1860) -->
        <div class="evolution-card" style="background: white; border: 2px solid var(--color-dark); border-radius: 4px; padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="display: inline-block; font-size: 0.8rem; font-weight: 900; background: #666; color: white; padding: 0.25rem 0.6rem; border-radius: 2px; margin-bottom: 1rem;">
                    1860 &bull; TRANSITION MÉTALLIQUE
                </div>
                <h3 style="font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin: 0 0 1rem 0; color: var(--color-dark);">
                    Plaque en Zinc
                </h3>
                <ul class="bullet-list" style="font-size: 0.95rem; line-height: 1.45;">
                    <li><strong>Atout :</strong> Feuille mince cintrable autour du cylindre porte-plaque rotatif.</li>
                    <li><strong>Corrosion :</strong> Forte sensibilité à l'oxydation sous humidité et acidité de l'eau.</li>
                    <li><strong>Limite Critique :</strong> Déformation plastique sous traction machine (décalage du repérage couleur).</li>
                </ul>
            </div>
            <div style="margin-top: 1.5rem; padding-top: 0.8rem; border-top: 1px solid #ddd; font-size: 0.8rem; color: #777;">
                Statut : Totalement supplanté par l'aluminium.
            </div>
        </div>

        <!-- 3. Aluminium Moderne (Standard Universel) -->
        <div class="evolution-card featured" style="background: white; border: 3px solid var(--color-accent); border-radius: 4px; padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(227, 38, 25, 0.08);">
            <div>
                <div style="display: inline-block; font-size: 0.8rem; font-weight: 900; background: var(--color-accent); color: white; padding: 0.25rem 0.6rem; border-radius: 2px; margin-bottom: 1rem;">
                    STANDARD UNIVERSEL &bull; > 95%
                </div>
                <h3 style="font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin: 0 0 1rem 0; color: var(--color-dark);">
                    Aluminium Moderne
                </h3>
                <ul class="bullet-list" style="font-size: 0.95rem; line-height: 1.45;">
                    <li><strong>Origine :</strong> Isolé en 1824, issu du minerai de Bauxite (découvert aux Baux-de-Provence en 1821).</li>
                    <li><strong>Propriétés :</strong> Extrême légèreté, neutralité chimique, couche naturelle d'oxyde ($Al_2O_3$).</li>
                    <li><strong>Stabilité :</strong> Dilatation thermique minime, repérage quadrichrome parfait à haute cadence.</li>
                </ul>
            </div>
            <div style="margin-top: 1.5rem; padding-top: 0.8rem; border-top: 1px solid #fca5a5; font-size: 0.8rem; color: var(--color-accent); font-weight: 700;">
                Support exclusif de l'imprimerie offset contemporaine.
            </div>
        </div>

    </div>
</div>
```

---

## 6. Slide 06 : Schéma du Principe Planographique (`assets/schematic_principe_planographique.svg`, SCH-03)

### 6.1 Fondement Physique à Représenter
La plaque offset est caractérisée par une **planéité rigoureuse** :
- **Niveau zéro absolu ($z = 0$) :** Aucun relief (contrairement à la typographie/flexographie) et aucun creux (contrairement à l'héliogravure).
- **Zone Imprimante :** Oléophile & Hydrophobe. Accepte l'encre grasse, repousse l'eau de mouillage.
- **Zone Non-Imprimante :** Hydrophile & Oléophobe. Retient un film d'eau microscopique (4,5 à 10 µm) qui s'oppose physiquement à l'adhésion de l'encre grasse.
- **L'Équilibre Eau / Encre :**
  - Si excès d'eau $\rightarrow$ Émulsion de l'encre (lavage des aplats, séchage bloqué).
  - Si déficit d'eau $\rightarrow$ Graissage des blancs (salissure indélébile).

### 6.2 Conteneur HTML & Fallback Intégré
```html
<div class="slide-visual" style="background: white; border-left: 3px solid var(--color-dark); padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div class="plate-img-box diagram" style="width: 100%; max-width: 440px; height: 320px; border: 2px dashed rgba(10, 10, 10, 0.3); border-radius: 4px; margin-bottom: 1.5rem;">
        <img src="assets/schematic_principe_planographique.svg" 
             alt="Schéma Coupe Transversale du Principe Planographique Offset" 
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
             style="width: 100%; height: 100%; object-fit: contain;">
        <div class="plate-fallback">
            <span class="fallback-icon" style="font-size: 2.5rem;">⚖️</span>
            <strong style="font-size: 1.05rem; margin-top: 0.4rem;">SCH-03 : Principe Planographique</strong>
            <p class="fallback-caption" style="font-size: 0.82rem; color: #555; line-height: 1.35; max-width: 340px;">
                Surface plane unifiée ($z=0$) : Antagonisme entre le film d'eau de mouillage (blancs) et l'encre grasse (graphismes).
            </p>
            <small style="font-family: monospace; font-size: 0.72rem; background: #E5E7EB; padding: 0.2rem 0.5rem; border: 1px solid #D1D5DB; margin-top: 0.4rem;">assets/schematic_principe_planographique.svg</small>
        </div>
    </div>
    <div style="text-align: left; max-width: 440px; border-left: 3px solid var(--color-accent); padding-left: 1rem;">
        <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent);">
            SCH-03 &bull; Surface Offset Plane
        </div>
        <p style="font-size: 0.85rem; color: #444; margin-top: 0.3rem; line-height: 1.4;">
            Répulsion physique spontanée entre le film d'eau de mouillage recouvrant les zones hydrophiles et l'encre grasse adhérant exclusivement aux zones oléophiles.
        </p>
    </div>
</div>
```

### 6.3 Code Vectoriel Exhaustif : `assets/schematic_principe_planographique.svg`
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <style>
      .title { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 900; font-size: 16px; fill: #FFFFFF; letter-spacing: 0.05em; }
      .subtitle { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 700; font-size: 12px; fill: #E32619; text-anchor: end; }
      .label-head { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 800; font-size: 13px; text-transform: uppercase; }
      .label-sub { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 700; font-size: 11px; }
      .label-desc { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 500; font-size: 11px; fill: #444444; }
      .datum { font-family: 'Courier New', monospace; font-weight: 700; font-size: 12px; fill: #E32619; }
      .badge-text { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 800; font-size: 10px; fill: #FFFFFF; text-anchor: middle; }
    </style>
    <!-- Geometric Target Grid -->
    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
    </pattern>
    <marker id="arrow-down-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#E32619" />
    </marker>
    <marker id="arrow-up-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#E32619" />
    </marker>
    <marker id="arrow-down-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0077B6" />
    </marker>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="500" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="3"/>
  <rect x="0" y="52" width="800" height="448" fill="url(#grid-pattern)" />

  <!-- Top Header Bar -->
  <rect x="0" y="0" width="800" height="52" fill="#0A0A0A"/>
  <text x="24" y="32" class="title">SCH-03 : PRINCIPE PLANOGRAPHIQUE &amp; ANTAGONISME EAU / ENCRE</text>
  <text x="776" y="32" class="subtitle">SURFACE RIGOUREUSEMENT PLANE (z = 0)</text>

  <!-- ====================================================================== -->
  <!-- NIVEAU DE RÉFÉRENCE z = 0 (PLANÉITÉ ABSOLUE)                           -->
  <!-- ====================================================================== -->
  <!-- Horizontal Datum Line -->
  <line x1="30" y1="280" x2="770" y2="280" stroke="#E32619" stroke-width="2" stroke-dasharray="8 4"/>
  <rect x="330" y="268" width="140" height="24" fill="#E32619" rx="2"/>
  <text x="400" y="284" class="badge-text" font-size="11px">PLANÉITÉ z = 0 (AUCUN RELIEF)</text>

  <!-- Base Plate Substrate (Aluminium Grainé & Anodisé) -->
  <rect x="40" y="282" width="720" height="90" fill="#E5E7EB" stroke="#0A0A0A" stroke-width="2.5"/>
  <!-- Metallic Diagonal Hatch Lines -->
  <line x1="50" y1="372" x2="140" y2="282" stroke="#CBD5E1" stroke-width="2"/>
  <line x1="150" y1="372" x2="240" y2="282" stroke="#CBD5E1" stroke-width="2"/>
  <line x1="250" y1="372" x2="340" y2="282" stroke="#CBD5E1" stroke-width="2"/>
  <line x1="350" y1="372" x2="440" y2="282" stroke="#CBD5E1" stroke-width="2"/>
  <line x1="450" y1="372" x2="540" y2="282" stroke="#CBD5E1" stroke-width="2"/>
  <line x1="550" y1="372" x2="640" y2="282" stroke="#CBD5E1" stroke-width="2"/>
  <line x1="650" y1="372" x2="740" y2="282" stroke="#CBD5E1" stroke-width="2"/>
  <text x="400" y="335" class="label-head" fill="#0A0A0A" text-anchor="middle" font-size="14px">
    SUPPORT MÉTALLIQUE : FEUILLE D'ALUMINIUM ANODISÉ (Al₂O₃)
  </text>
  <text x="400" y="355" class="label-desc" text-anchor="middle">
    Épaisseur mécanique calibrée : 0,15 mm à 0,30 mm &bull; Cintrable sur cylindre porte-plaque
  </text>

  <!-- ====================================================================== -->
  <!-- ZONE GAUCHE : NON-IMPRIMANTE (HYDROPHILE & LIPOPHOBE)                  -->
  <!-- ====================================================================== -->
  <g transform="translate(60, 70)">
    <!-- Header Badge -->
    <rect x="0" y="0" width="160" height="22" fill="#0077B6" rx="2"/>
    <text x="80" y="15" class="badge-text">ZONE NON-IMPRIMANTE</text>
    <text x="175" y="16" class="label-head" fill="#0077B6">Hydrophile &bull; Blancs</text>

    <!-- Inking Roller Descending -->
    <circle cx="150" cy="80" r="42" fill="#2B2D42" stroke="#0A0A0A" stroke-width="2.5"/>
    <circle cx="150" cy="80" r="14" fill="#8D99AE" stroke="#0A0A0A" stroke-width="1.5"/>
    <text x="150" y="45" class="label-sub" fill="#0A0A0A" text-anchor="middle">Rouleau Toucheur Encreur</text>

    <!-- Repulsion Forces (Water acts as barrier) -->
    <path d="M 125 145 Q 125 180 110 180" fill="none" stroke="#E32619" stroke-width="3" marker-end="url(#arrow-up-red)"/>
    <path d="M 175 145 Q 175 180 190 180" fill="none" stroke="#E32619" stroke-width="3" marker-end="url(#arrow-up-red)"/>
    <text x="150" y="170" class="label-sub" fill="#E32619" text-anchor="middle">RÉPULSION DE L'ENCRE</text>

    <!-- Water Film on Plate Surface -->
    <rect x="0" y="195" width="300" height="15" fill="#90E0EF" stroke="#0077B6" stroke-width="1.5"/>
    <text x="150" y="206" class="label-desc" text-anchor="middle" font-weight="700" fill="#03045E">
      Film d'Eau de Mouillage (4,5 à 10 µm)
    </text>
  </g>

  <!-- ====================================================================== -->
  <!-- ZONE DROITE : IMPRIMANTE (OLÉOPHILE & HYDROPHOBE)                      -->
  <!-- ====================================================================== -->
  <g transform="translate(440, 70)">
    <!-- Header Badge -->
    <rect x="0" y="0" width="140" height="22" fill="#E32619" rx="2"/>
    <text x="70" y="15" class="badge-text">ZONE IMPRIMANTE</text>
    <text x="155" y="16" class="label-head" fill="#E32619">Oléophile &bull; Graphismes</text>

    <!-- Inking Roller in Direct Contact depositing ink -->
    <circle cx="150" cy="80" r="42" fill="#0A0A0A" stroke="#0A0A0A" stroke-width="2.5"/>
    <circle cx="150" cy="80" r="14" fill="#4A4E69" stroke="#FFFFFF" stroke-width="1.5"/>
    <text x="150" y="45" class="label-sub" fill="#0A0A0A" text-anchor="middle">Dépôt d'Encre Grasse</text>

    <!-- Adhesion Contact Arrows -->
    <line x1="150" y1="130" x2="150" y2="185" stroke="#0A0A0A" stroke-width="3" marker-end="url(#arrow-down-red)"/>
    <text x="150" y="160" class="label-sub" fill="#0A0A0A" text-anchor="middle">ADHÉSION LIPHILE</text>

    <!-- Greasy Ink Layer on Plate Surface -->
    <rect x="0" y="195" width="300" height="15" fill="#0A0A0A" stroke="#0A0A0A" stroke-width="1.5"/>
    <text x="150" y="206" class="label-desc" text-anchor="middle" font-weight="700" fill="#FFFFFF">
      Couche Diazo / Photopolymère Encrée
    </text>

    <!-- Repelled Water Droplet (Rolling Off) -->
    <path d="M 270 170 C 270 160 282 148 282 148 C 282 148 294 160 294 170 C 294 178 288 184 282 184 C 276 184 270 178 270 170 Z" fill="#90E0EF" stroke="#0077B6" stroke-width="1.5"/>
    <text x="282" y="142" class="label-desc" text-anchor="middle" font-weight="700" fill="#0077B6">Eau rejetée</text>
  </g>

  <!-- ====================================================================== -->
  <!-- BANDEAU INFÉRIEUR : ÉQUILIBRE INDUSTRIEL EAU / ENCRE                   -->
  <!-- ====================================================================== -->
  <g transform="translate(40, 395)">
    <rect x="0" y="0" width="720" height="75" fill="#F4F5F6" stroke="#0A0A0A" stroke-width="2"/>
    
    <text x="24" y="26" class="label-head" fill="#0A0A0A">ÉQUILIBRE INDUSTRIEL EAU / ENCRE :</text>
    <text x="320" y="26" class="datum">« Le minimum d'eau pour refuser l'encre »</text>

    <!-- Warning Matrix -->
    <rect x="24" y="38" width="320" height="26" fill="#FEE2E2" stroke="#DC2626" stroke-width="1"/>
    <text x="32" y="55" class="label-desc" font-weight="700" fill="#B91C1C">
      &bull; Déficit d'eau : Graissage immédiat des fonds blancs
    </text>

    <rect x="376" y="38" width="320" height="26" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/>
    <text x="384" y="55" class="label-desc" font-weight="700" fill="#92400E">
      &bull; Excès d'eau : Émulsion de l'encre &amp; perte de densité
    </text>
  </g>

  <!-- Corner Press Registration Target Marks -->
  <g transform="translate(24, 76)">
    <circle cx="0" cy="0" r="10" fill="none" stroke="#0A0A0A" stroke-width="1.5"/>
    <line x1="0" y1="-14" x2="0" y2="14" stroke="#0A0A0A" stroke-width="1.5"/>
    <line x1="-14" y1="0" x2="14" y2="0" stroke="#0A0A0A" stroke-width="1.5"/>
  </g>
  <g transform="translate(776, 76)">
    <circle cx="0" cy="0" r="10" fill="none" stroke="#0A0A0A" stroke-width="1.5"/>
    <line x1="0" y1="-14" x2="0" y2="14" stroke="#0A0A0A" stroke-width="1.5"/>
    <line x1="-14" y1="0" x2="14" y2="0" stroke="#0A0A0A" stroke-width="1.5"/>
  </g>
</svg>
```

---

## 7. Standardisation Globale de `.plate-img-box` et `.plate-fallback`

Pour assurer la cohérence esthétique et fonctionnelle sur l'ensemble des 22 diapositives, les règles suivantes doivent être insérées dans `style.css` :

```css
/* ==========================================================================
   BRUTALIST VISUAL SCHEMATIC & IMAGE CONTAINERS
   ========================================================================== */

.plate-img-box {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 240px;
    background: var(--color-light);
    border: 2px solid var(--color-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-sizing: border-box;
}

/* Modifiers selon le type de diapositive */
.plate-img-box.compact {
    min-height: 140px;
    height: 145px;
}

.plate-img-box.hero {
    min-height: 380px;
    height: 420px;
}

.plate-img-box.diagram {
    min-height: 300px;
    height: 320px;
    background: #FFFFFF;
}

.plate-img-box img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transition: transform var(--t-med) var(--ease-kinetic);
}

.plate-img-box.cover-fit img {
    object-fit: cover;
}

/* Fallback Container déclenché par onerror */
.plate-fallback {
    display: none;
    position: absolute;
    inset: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.5rem;
    background: var(--color-light);
    border: 2px dashed var(--color-dark);
    gap: 0.5rem;
    box-sizing: border-box;
}

.plate-fallback .fallback-icon {
    font-size: 2.4rem;
    line-height: 1;
    margin-bottom: 0.2rem;
}

.plate-fallback strong {
    font-size: 1rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-dark);
}

.plate-fallback .fallback-caption {
    font-size: 0.85rem;
    line-height: 1.4;
    color: #4A4A4A;
    max-width: 85%;
}

.plate-fallback small {
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.72rem;
    color: #666666;
    background: #E5E7EB;
    padding: 0.2rem 0.5rem;
    border: 1px solid #D1D5DB;
    margin-top: 0.4rem;
}
```

---

## 8. Directives d'Intégration & Checklist pour Milestone 1

1. **Création des Fichiers Vectoriels dans `assets/` :**
   - Écrire le contenu de la section 4.3 dans `assets/schematic_reaction_pierre.svg`.
   - Écrire le contenu de la section 6.3 dans `assets/schematic_principe_planographique.svg`.
   - Vérifier la présence de `assets/senefelder.jpg` (déjà validé).
2. **Ajout des Règles CSS dans `style.css` :**
   - Intégrer les classes `.plate-img-box`, `.plate-img-box.diagram`, `.plate-img-box.hero`, `.plate-fallback` (section 7).
3. **Validation du Balisage HTML dans `index.html` :**
   - S'assurer que chaque balise `<img>` dispose de :
     `onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"`
   - Vérifier que le conteneur immédiat suivant est bien `.plate-fallback`.
4. **Test de Résilience :**
   - Tester le comportement visuel en modifiant temporairement le chemin de l'image (ex: `assets/senefelder_fake.jpg`) : la fallback doit apparaître instantanément sans déformation de layout ni message d'erreur bloquant.
