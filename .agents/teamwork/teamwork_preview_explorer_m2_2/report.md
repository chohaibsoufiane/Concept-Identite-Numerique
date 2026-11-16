# Spécification Technique & Visual Schematics : Slides 07 à 12 (Milestone 2)
**Auteur :** M2 Explorer 2 (Visual Schematics & Placeholders)  
**Date :** 2026-10-23  
**Dépôt :** `c:\Users\lufylon\Documents\antigravity\silly-euclid`  
**Statut :** Spécification Validée & Prête pour Intégration (100% Valid XML 1.0)  

---

## 1. Executive Summary & Objectifs Visuels

Ce rapport établit la spécification authoritative complète pour l'ensemble des conteneurs visuels, graphiques vectoriels, diagrammes techniques et mécanismes de repli d'erreur (*error fallbacks*) pour les **Slides 07 à 12** de la présentation interactive Electron :
- **Partie 2 : Supports des Plaques Conventionnelles** (Slides 07, 08, 09 : Monométallique, Polymétallique, Coupes structurales Bimétallique / Trimétallique / Quadrimétallique).
- **Partie 3 : Traitement du Support & Grainage** (Slides 10, 11, 12 : Rôle de la Rugosité & Lois du Mouillage, Grainage Mécanique Oscillant, Grainage Chimique à Brosse).

### Directives d'Assainissement & Normes Techniques
1. **Éradication Absolue des Méta-Libellés :** Aucune mention de type « Personne 2 », « Personne 3 », « Page 19 », « Page 20 », « Slide pour Personne X » n'est admise dans les conteneurs visuels ou légendes. Tous les libellés adoptent une terminologie d'ingénierie des arts graphiques.
2. **Validité XML 1.0 Stricte à 100% :** Les graphiques vectoriels SVG sont validés selon le standard XML 1.0 du W3C. Aucune entité HTML indéfinie (notamment l'entité `&bull;` qui provoque un crash immédiat du parseur Chromium `parsererror`) n'est autorisée. Utilisation exclusive de l'entité numérique standard `&#8226;` ou du caractère littéral UTF-8 `•`.
3. **Résilience Absolue des Conteneurs d'Images (.plate-fallback) :** Chaque conteneur d'image (`.plate-img-box`) intègre obligatoirement le gestionnaire d'événement inline `onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"`. En cas d'absence physique du fichier image (comme les rendus 3D PNG en cours de rendu), le conteneur de repli brutaliste s'affiche instantanément avec son icône thématique, son titre officiel `<strong>`, sa description technique et son chemin relatif explicite `<small>assets/...</small>`, garantissant l'absence de rupture de mise en page (*Zero Cumulative Layout Shift*).
4. **Code Vectoriel SVG Autonome & Clé en Main :** Le présent document délivre l'intégralité du balisage vectoriel testé et validé sous Chromium pour `assets/schematic_rugosite_grainage.svg` (SCH-08), `assets/schematic_grainage_mecanique.svg` (SCH-09) et `assets/schematic_grainage_chimique.svg` (SCH-10).

---

## 2. Inventaire des Conteneurs Visuels & Cartographie (Slides 07–12)

| Slide ID | Titre Métier | Schéma ID | Fichier Visuel Cible | Dimensions / Classe | Nature du Visuel | Glyph & Mode de Fallback |
|---|---|---|---|---|---|---|
| `slide-07` | 2.1 Les Plaques Monométalliques | `SCH-04` | `assets/plaque_monometallique.png` | 440px × 320px (`.diagram`) | Rendu 3D / Isométrique Coupe Monométallique | `📑` `.plate-fallback` structuré |
| `slide-08` | 2.2 Les Plaques Polymétalliques | *N/A* | *N/A (Card Grid 3 / Tableau)* | 3 Cartes Métaux (`100%`) | Tableau de résistance machine & cadences (1–2M) | Cartes de métaux (Chrome, Cuivre, Acier) |
| `slide-09` | 2.3 Architecture Comparée | `SCH-05` | `assets/plaque_bimetallique.png` | 100% × 145px (`.compact`) | Rendu Coupe Plaque Bimétallique (Cr / Laiton) | `⚡` `.plate-fallback` structuré |
| `slide-09` | 2.3 Architecture Comparée | `SCH-06` | `assets/plaque_trimetallique.png` | 100% × 145px (`.compact`) | Rendu Coupe Plaque Trimétallique (Cr / Cu / Acier) | `🛡️` `.plate-fallback` structuré |
| `slide-09` | 2.3 Architecture Comparée | `SCH-07` | `assets/plaque_quadrimetallique.png` | 100% × 145px (`.compact`) | Rendu Coupe Plaque Quadrimétallique (4 métaux) | `🏗️` `.plate-fallback` structuré |
| `slide-10` | 3.1 Rôle de la Rugosité | `SCH-08` | `assets/schematic_rugosite_grainage.svg` | 440px × 320px (`.diagram`) | Schéma Vectoriel Comparatif (Lisse vs Grainée) | `⚖️` `.plate-fallback` + SVG vectoriel |
| `slide-11` | 3.2 Grainage Mécanique | `SCH-09` | `assets/schematic_grainage_mecanique.svg` | 440px × 320px (`.diagram`) | Schéma Vectoriel Brossage Oscillant & Sillons | `🔄` `.plate-fallback` + SVG vectoriel |
| `slide-12` | 3.3 Grainage Chimique à Brosse | `SCH-10` | `assets/schematic_grainage_chimique.svg` | 440px × 320px (`.diagram`) | Schéma Vectoriel Enceinte Barbotine Ponce/Acide | `🧪` `.plate-fallback` + SVG vectoriel |

---

## 3. Slide 07 : Plaque Monométallique Aluminium (SCH-04)

### 3.1 Fondements Techniques & Métallurgiques
La plaque monométallique représente plus de 95% du parc mondial des formes imprimantes offset conventionnelles.
- **Support métallique :** Feuille d'aluminium pur laminé d'épaisseur calibrée entre 0,15 mm et 0,40 mm (adaptée au diamètre et aux gorges de serrage du cylindre porte-plaque).
- **Propriétés physiques déterminantes :**
  - **Légèreté et ductilité :** Facilite la manipulation, le cintrage aux bords et le montage rapide en atelier sans déformation résiduelle.
  - **Stabilité thermique et dimensionnelle :** Coefficient de dilatation modéré évitant les décalages de repérage entre les 4 groupes d'impression (CMJN) sous l'échauffement des rouleaux.
  - **Résistance à la corrosion :** Formation spontanée d'une micro-pellicule protectrice d'oxyde ($Al_2O_3$), considérablement renforcée par l'anodisation ultérieure.
- **Couche photosensible supérieure :** Résine diazoïque ou photopolymère d'épaisseur 1 à 3 µm assurant la reproduction micrométrique des points de trame.

### 3.2 Balisage HTML & Conteneur de Repli Résilient
```html
<div class="plate-img-box diagram" style="width: 100%; max-width: 440px; height: 320px; border: 2px solid var(--color-dark); margin-bottom: 1.5rem;">
    <img src="assets/plaque_monometallique.png" 
         alt="Schéma Coupe Transversale : Plaque Monométallique en Aluminium" 
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
         style="width: 100%; height: 100%; object-fit: contain;">
    <div class="plate-fallback">
        <span class="fallback-icon" style="font-size: 2.5rem;">📑</span>
        <strong style="font-size: 1.05rem; margin-top: 0.4rem;">SCH-04 : Plaque Monométallique</strong>
        <p class="fallback-caption" style="font-size: 0.82rem; color: #555; line-height: 1.35; max-width: 340px;">
            Couche sensible diazoïque supérieure déposée sur feuille continue d'aluminium dépolie et anodisée (0,15 à 0,40 mm). Standard universel à &gt; 95%.
        </p>
        <small style="font-family: monospace; font-size: 0.72rem; background: #E5E7EB; padding: 0.2rem 0.5rem; border: 1px solid #D1D5DB; margin-top: 0.4rem;">assets/plaque_monometallique.png</small>
    </div>
</div>
<div style="text-align: left; max-width: 440px; border-left: 3px solid var(--color-accent); padding-left: 1rem;">
    <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent);">
        SCH-04 &#8226; Coupe Monométallique
    </div>
    <p style="font-size: 0.85rem; color: #444; margin-top: 0.3rem; line-height: 1.4;">
        Structure unitaire à deux étages : résine photosensible lipophile fixée sur support homogène d'aluminium traité électrochimiquement.
    </p>
</div>
```

---

## 4. Slide 09 : Architecture Comparée des Couches Métalliques (SCH-05, SCH-06, SCH-07)

La Slide 09 confronte en vis-à-vis direct les 3 architectures de plaques polymétalliques pour rotatives industrielles à très fort tirage (1 à 2 millions d'exemplaires).

### 4.1 Plaque Bimétallique (SCH-05 : Chrome / Laiton)
- **Principe :** Exploiter deux métaux dont la nature de surface offre l'affinité recherchée sans nécessiter de couche photosensible permanente.
  - **Couche supérieure :** Pellicule de **Chrome** ($Cr$, 2 à 4 µm), naturellement très dur et hydrophile (blancs non-imprimants).
  - **Substrat de soutien :** Plaque de **Laiton** (alliage 70% Cuivre + 30% Zinc), naturellement oléophile (zones imprimantes recevant l'encre grasse).
- **Gravure :** La couche de chrome est attaquée chimiquement dans les graphismes pour mettre à nu le laiton oléophile sous-jacent.
- **Balisage Conteneur :**
```html
<div class="plate-img-box compact" style="width: 100%; height: 145px; border: 2px solid var(--color-dark); margin-bottom: 0.8rem;">
    <img src="assets/plaque_bimetallique.png" 
         alt="Coupe Transversale Plaque Bimétallique Chrome / Laiton" 
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
         style="width: 100%; height: 100%; object-fit: contain;">
    <div class="plate-fallback">
        <span class="fallback-icon" style="font-size: 2.2rem;">⚡</span>
        <strong style="font-size: 0.95rem; margin-top: 0.3rem;">SCH-05 : Plaque Bimétallique</strong>
        <p class="fallback-caption" style="font-size: 0.78rem; color: #555; line-height: 1.3; max-width: 280px;">
            Chrome supérieur hydrophile (blancs) sur support de Laiton oléophile (70% Cu / 30% Zn).
        </p>
        <small style="font-family: monospace; font-size: 0.7rem; background: #E5E7EB; padding: 0.15rem 0.4rem; border: 1px solid #D1D5DB; margin-top: 0.3rem;">assets/plaque_bimetallique.png</small>
    </div>
</div>
```

### 4.2 Plaque Trimétallique (SCH-06 : Chrome / Cuivre / Acier ou Aluminium)
- **Principe :** Séparer la fonction mécanique de résistance à la traction des fonctions chimiques de mouillage et d'encrage.
  - **Couche supérieure :** **Chrome** ($Cr$, 2 à 3 µm), hydrophile naturel pour les blancs.
  - **Couche intermédiaire :** **Cuivre pur** ($Cu$, 4 à 8 µm), oléophile naturel attirant l'encre.
  - **Substrat de base :** Tôle d'**Acier** doux ou feuille d'**Aluminium** rigide garantissant la tenue aux tensions de rotative.
- **Balisage Conteneur :**
```html
<div class="plate-img-box compact" style="width: 100%; height: 145px; border: 2px solid var(--color-dark); margin-bottom: 0.8rem;">
    <img src="assets/plaque_trimetallique.png" 
         alt="Coupe Transversale Plaque Trimétallique Chrome / Cuivre / Acier" 
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
         style="width: 100%; height: 100%; object-fit: contain;">
    <div class="plate-fallback">
        <span class="fallback-icon" style="font-size: 2.2rem;">🛡️</span>
        <strong style="font-size: 0.95rem; margin-top: 0.3rem;">SCH-06 : Plaque Trimétallique</strong>
        <p class="fallback-caption" style="font-size: 0.78rem; color: #555; line-height: 1.3; max-width: 280px;">
            Chrome (hydrophile) + Cuivre (oléophile) sur âme mécanique d'Acier/Aluminium. Tirages 1–2M.
        </p>
        <small style="font-family: monospace; font-size: 0.7rem; background: #E5E7EB; padding: 0.15rem 0.4rem; border: 1px solid #D1D5DB; margin-top: 0.3rem;">assets/plaque_trimetallique.png</small>
    </div>
</div>
```

### 4.3 Plaque Quadrimétallique (SCH-07 : Chrome / Cuivre Acide / Cuivre Basique / Acier)
- **Principe :** Empêcher le délaminage galvanique entre le cuivre et l'acier sous contraintes thermomécaniques extrêmes.
  - **Couche 1 (Supérieure) :** **Chrome** ($Cr$), mouillabilité supérieure et dureté anti-usure.
  - **Couche 2 (Intermédiaire Haute) :** **Cuivre acide** électrolytique pur à très forte affinité lipophile.
  - **Couche 3 (Intermédiaire Basse) :** **Cuivre basique** (bain cyanuré) formant une sous-couche d'accroche moléculaire sur l'acier.
  - **Couche 4 (Base) :** Tôle d'**Acier** trempé indéformable à très haute vitesse rotative.
- **Balisage Conteneur :**
```html
<div class="plate-img-box compact" style="width: 100%; height: 145px; border: 2px solid var(--color-dark); margin-bottom: 0.8rem;">
    <img src="assets/plaque_quadrimetallique.png" 
         alt="Coupe Transversale Plaque Quadrimétallique 4 Métaux" 
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
         style="width: 100%; height: 100%; object-fit: contain;">
    <div class="plate-fallback">
        <span class="fallback-icon" style="font-size: 2.2rem;">🏗️</span>
        <strong style="font-size: 0.95rem; margin-top: 0.3rem;">SCH-07 : Plaque Quadrimétallique</strong>
        <p class="fallback-caption" style="font-size: 0.78rem; color: #555; line-height: 1.3; max-width: 280px;">
            Chrome + Cuivre acide + Cuivre basique d'accroche sur âme en Acier haute cadence.
        </p>
        <small style="font-family: monospace; font-size: 0.7rem; background: #E5E7EB; padding: 0.15rem 0.4rem; border: 1px solid #D1D5DB; margin-top: 0.3rem;">assets/plaque_quadrimetallique.png</small>
    </div>
</div>
```

---

## 5. Slide 10 : Schéma de Rugosité & Lois du Mouillage (`assets/schematic_rugosite_grainage.svg`, SCH-08)

### 5.1 Rationale Scientifique & Antagonisme Physique
L'aluminium poli miroir est naturellement lipophile : laissé lisse, l'encre grasse y adhère spontanément et l'eau perle en grosses gouttes isolées sans napper la surface (angle de contact $\theta > 70^\circ$).
- Pour repousser l'encre, l'imprimeur doit créer un **film d'eau continu microscopique** dont l'épaisseur optimale est comprise entre **4,5 et 10 microns**.
- **La Règle d'Or de l'Offset :** « La meilleure surface hydrophile sera celle qui refusera l'encre avec le **minimum d'eau**. »
- **Les 3 Lois Fondamentales :**
  1. Plus l'irrégularité crêtes ($R_p$) et creux ($R_v$) est homogène, meilleure est l'affinité hydrophile.
  2. Une rugosité accentuée ($R_a$) stabilise le mouillage en réduisant le volume d'eau libre requis.
  3. Limite physique : Une plaque ne peut retenir plus d'eau que ne lui autorise sa microporosité de surface. L'eau en excès ruisselle et émulsionne l'encre.

### 5.2 Balisage HTML & Fallback Intégré
```html
<div class="plate-img-box diagram" style="width: 100%; max-width: 440px; height: 320px; border: 2px solid var(--color-dark); margin-bottom: 1.5rem;">
    <img src="assets/schematic_rugosite_grainage.svg" 
         alt="Schéma Comparatif : Rôle de la Rugosité - Plaque Lisse vs Plaque Grainée" 
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
         style="width: 100%; height: 100%; object-fit: contain;">
    <div class="plate-fallback">
        <span class="fallback-icon" style="font-size: 2.5rem;">⚖️</span>
        <strong style="font-size: 1.05rem; margin-top: 0.4rem;">SCH-08 : Rôle de la Rugosité</strong>
        <p class="fallback-caption" style="font-size: 0.82rem; color: #555; line-height: 1.35; max-width: 340px;">
            Comparaison entre surface lisse instable (graissage/émulsion) et rugosité grainée calibrée retenant un film d'eau minimal (4,5–10 µm).
        </p>
        <small style="font-family: monospace; font-size: 0.72rem; background: #E5E7EB; padding: 0.2rem 0.5rem; border: 1px solid #D1D5DB; margin-top: 0.4rem;">assets/schematic_rugosite_grainage.svg</small>
    </div>
</div>
<div style="text-align: left; max-width: 440px; border-left: 3px solid var(--color-accent); padding-left: 1rem;">
    <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent);">
        SCH-08 &#8226; Profil de Rugosité
    </div>
    <p style="font-size: 0.85rem; color: #444; margin-top: 0.3rem; line-height: 1.4;">
        Piégeage capillaire de l'eau dans les creux (Rv) et refus de l'encre avec le strict minimum d'eau de mouillage.
    </p>
</div>
```

### 5.3 Balisage Vectoriel SVG Clé en Main : `assets/schematic_rugosite_grainage.svg`
*Validé 100% XML 1.0 (aucun `&bull;`, entités numériques strictes).*

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <style>
      .title { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 900; font-size: 15px; fill: #FFFFFF; letter-spacing: 0.05em; }
      .subtitle { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 700; font-size: 11px; fill: #E32619; text-anchor: end; }
      .label-head { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 800; font-size: 12px; text-transform: uppercase; }
      .label-sub { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 700; font-size: 11px; }
      .label-desc { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 500; font-size: 10px; fill: #333333; }
      .badge-text { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 800; font-size: 9px; fill: #FFFFFF; text-anchor: middle; }
      .param-val { font-family: 'Courier New', monospace; font-weight: 700; font-size: 11px; fill: #0A0A0A; }
    </style>
    <pattern id="grid-pattern-sch08" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
    </pattern>
    <marker id="arrow-red-sch08" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#E32619" />
    </marker>
    <marker id="arrow-blue-sch08" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0077B6" />
    </marker>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="500" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="3"/>
  <rect x="0" y="52" width="800" height="448" fill="url(#grid-pattern-sch08)" />

  <!-- Top Header Bar -->
  <rect x="0" y="0" width="800" height="52" fill="#0A0A0A"/>
  <text x="24" y="32" class="title">SCH-08 : RÔLE DE LA RUGOSITÉ &#8226; PLAQUE LISSE VS PLAQUE GRAINÉE</text>
  <text x="776" y="32" class="subtitle">FILM D'EAU MINIMAL (4,5 À 10 µm) &#8226; LES 3 LOIS DU MOUILLAGE</text>

  <!-- Central Division Line -->
  <line x1="400" y1="52" x2="400" y2="405" stroke="#0A0A0A" stroke-width="2" stroke-dasharray="6 4"/>

  <!-- ====================================================================== -->
  <!-- ZONE GAUCHE : PLAQUE LISSE (NON TRAITÉE) - DÉFAUT CRITIQUE             -->
  <!-- ====================================================================== -->
  <g transform="translate(30, 68)">
    <!-- Zone Badge -->
    <rect x="0" y="0" width="150" height="22" fill="#DC2626" rx="2"/>
    <text x="75" y="15" class="badge-text">SURFACE LISSE (DÉFAUT)</text>
    <text x="165" y="16" class="label-head" fill="#DC2626">Aluminium Brut Non Traité</text>

    <!-- Callout Box -->
    <rect x="0" y="32" width="340" height="38" fill="#FEF2F2" stroke="#DC2626" stroke-width="1"/>
    <text x="10" y="47" class="label-desc" font-weight="700" fill="#991B1B">
      Angle de contact &#952; &gt; 70° &#8226; Rupture spontanée du film liquide
    </text>
    <text x="10" y="62" class="label-desc" fill="#B91C1C">
      Incapacité à retenir une pellicule d'eau régulière sans surdosage.
    </text>

    <!-- Inking Roller Above -->
    <g transform="translate(40, 80)">
      <circle cx="50" cy="30" r="26" fill="#0A0A0A" stroke="#0A0A0A" stroke-width="2"/>
      <circle cx="50" cy="30" r="9" fill="#666666" stroke="#FFFFFF" stroke-width="1"/>
      <text x="85" y="34" class="label-sub" fill="#0A0A0A">Rouleau Encreur</text>
    </g>

    <!-- Beading Droplets (Gouttes d'eau perlées rejetées) -->
    <path d="M 230 135 C 230 115 255 100 255 100 C 255 100 280 115 280 135 C 280 148 268 155 255 155 C 242 155 230 148 230 135 Z" fill="#90E0EF" stroke="#0077B6" stroke-width="1.5"/>
    <text x="255" y="170" class="label-desc" font-weight="700" fill="#0077B6" text-anchor="middle">Gouttelette perlée</text>
    <text x="255" y="182" class="label-desc" fill="#03045E" text-anchor="middle">(Mouillage nul)</text>

    <!-- Substrate Block (Plaque Lisse) -->
    <g transform="translate(0, 195)">
      <!-- Substrate Body -->
      <rect x="0" y="25" width="340" height="70" fill="#E5E7EB" stroke="#0A0A0A" stroke-width="2"/>
      <line x1="0" y1="25" x2="340" y2="25" stroke="#0A0A0A" stroke-width="3"/>
      
      <!-- Dry zone (Graissage risk) -->
      <rect x="20" y="2" width="130" height="23" fill="#0A0A0A" stroke="#0A0A0A" stroke-width="1"/>
      <text x="85" y="17" class="badge-text">DÉPÔT D'ENCRE PARASITE</text>
      
      <!-- Flooded water pool -->
      <path d="M 200 12 Q 220 5 240 12 Q 270 20 300 12 L 300 25 L 200 25 Z" fill="#90E0EF" stroke="#0077B6" stroke-width="1.5"/>
      <text x="250" y="8" class="label-desc" font-weight="700" fill="#0077B6" text-anchor="middle">Émulsion (Excès)</text>

      <text x="170" y="65" class="label-head" fill="#0A0A0A" text-anchor="middle">
        ALUMINIUM POLI SANS RUGOSITÉ (Ra &#8776; 0)
      </text>
    </g>

    <!-- Diagnostic Summary Box -->
    <rect x="0" y="300" width="340" height="32" fill="#FEE2E2" stroke="#DC2626" stroke-width="1"/>
    <text x="170" y="320" class="label-desc" font-weight="800" fill="#991B1B" text-anchor="middle">
      &#10006; GRAISSAGE (manque d'eau) OU ÉMULSION (trop d'eau)
    </text>
  </g>

  <!-- ====================================================================== -->
  <!-- ZONE DROITE : PLAQUE GRAINÉE (CRÊTES &amp; CREUX) - OPTIMUM INDUSTRIEL     -->
  <!-- ====================================================================== -->
  <g transform="translate(430, 68)">
    <!-- Zone Badge -->
    <rect x="0" y="0" width="165" height="22" fill="#059669" rx="2"/>
    <text x="82" y="15" class="badge-text">SURFACE GRAINÉE (OPTIMUM)</text>
    <text x="175" y="16" class="label-head" fill="#059669">Micro-Porosité Homogène</text>

    <!-- Callout Box -->
    <rect x="0" y="32" width="340" height="38" fill="#ECFDF5" stroke="#059669" stroke-width="1"/>
    <text x="10" y="47" class="label-desc" font-weight="700" fill="#065F46">
      Capillarité active &#8226; Film continu minimal de 4,5 à 10 µm
    </text>
    <text x="10" y="62" class="label-desc" fill="#047857">
      Ménisques d'eau piégés entre crêtes (Rp) et creux (Rv).
    </text>

    <!-- Film Thickness Indicator -->
    <g transform="translate(20, 85)">
      <line x1="0" y1="15" x2="300" y2="15" stroke="#0077B6" stroke-width="1.5" stroke-dasharray="4 2"/>
      <rect x="80" y="2" width="140" height="20" fill="#0077B6" rx="2"/>
      <text x="150" y="16" class="badge-text">FILM D'EAU STABLE : 4,5 – 10 µm</text>
    </g>

    <!-- Substrate Block with Rough Profile -->
    <g transform="translate(0, 195)">
      <!-- Grained jagged profile path: Peaks (crêtes) and Valleys (creux) -->
      <path d="M 0 25 
               L 10 5 L 20 25 L 30 7 L 40 25 L 50 4 L 60 25 L 70 6 L 80 25 
               L 90 5 L 100 25 L 110 8 L 120 25 L 130 5 L 140 25 L 150 6 L 160 25 
               L 170 4 L 180 25 L 190 7 L 200 25 L 210 5 L 220 25 L 230 6 L 240 25 
               L 250 4 L 260 25 L 270 7 L 280 25 L 290 5 L 300 25 L 310 6 L 320 25 
               L 330 5 L 340 25 
               L 340 95 L 0 95 Z" 
            fill="#E5E7EB" stroke="#0A0A0A" stroke-width="2"/>

      <!-- Uniform Water Film filling the valleys -->
      <path d="M 0 20 
               Q 10 16 20 20 Q 30 17 40 20 Q 50 16 60 20 Q 70 17 80 20 
               Q 90 16 100 20 Q 110 17 120 20 Q 130 16 140 20 Q 150 17 160 20 
               Q 170 16 180 20 Q 190 17 200 20 Q 210 16 220 20 Q 230 17 240 20 
               Q 250 16 260 20 Q 270 17 280 20 Q 290 16 300 20 Q 310 17 320 20 
               Q 330 16 340 20 
               L 340 25 L 0 25 Z" 
            fill="#90E0EF" opacity="0.85"/>

      <!-- Dimension markers for Crêtes (Rp) and Creux (Rv) -->
      <line x1="45" y1="4" x2="45" y2="25" stroke="#E32619" stroke-width="1.5"/>
      <circle cx="50" cy="4" r="3" fill="#E32619"/>
      <text x="58" y="10" class="param-val" fill="#E32619">Crête (Rp)</text>

      <line x1="140" y1="25" x2="140" y2="40" stroke="#0077B6" stroke-width="1.5"/>
      <circle cx="140" cy="25" r="3" fill="#0077B6"/>
      <text x="148" y="38" class="param-val" fill="#0077B6">Creux (Rv)</text>

      <text x="170" y="70" class="label-head" fill="#0A0A0A" text-anchor="middle">
        ALUMINIUM GRAINÉ ANODISÉ (Ra CALIBRÉ)
      </text>
    </g>

    <!-- Diagnostic Summary Box -->
    <rect x="0" y="300" width="340" height="32" fill="#D1FAE5" stroke="#059669" stroke-width="1"/>
    <text x="170" y="320" class="label-desc" font-weight="800" fill="#065F46" text-anchor="middle">
      &#10004; REFUS TOTAL DE L'ENCRE AVEC LE MINIMUM D'EAU
    </text>
  </g>

  <!-- ====================================================================== -->
  <!-- BANDEAU INFÉRIEUR : LES 3 LOIS FONDAMENTALES DE LA RUGOSITÉ            -->
  <!-- ====================================================================== -->
  <g transform="translate(30, 415)">
    <rect x="0" y="0" width="740" height="68" fill="#F4F5F6" stroke="#0A0A0A" stroke-width="2"/>
    
    <!-- Header Badge -->
    <rect x="15" y="10" width="180" height="18" fill="#0A0A0A"/>
    <text x="105" y="23" class="badge-text">LES 3 LOIS DE LA RUGOSITÉ</text>

    <!-- Law 1 -->
    <g transform="translate(15, 36)">
      <text x="0" y="11" class="label-sub" fill="#E32619">LOI 1 :</text>
      <text x="45" y="11" class="label-desc">
        Plus l'irrégularité crêtes/creux est homogène, plus l'affinité hydrophile est forte.
      </text>
    </g>

    <!-- Law 2 -->
    <g transform="translate(260, 36)">
      <text x="0" y="11" class="label-sub" fill="#E32619">LOI 2 :</text>
      <text x="45" y="11" class="label-desc">
        Une rugosité accentuée réduit le volume d'eau nécessaire pour repousser l'encre.
      </text>
    </g>

    <!-- Law 3 -->
    <g transform="translate(515, 36)">
      <text x="0" y="11" class="label-sub" fill="#E32619">LOI 3 :</text>
      <text x="45" y="11" class="label-desc">
        Limite physique : la plaque ne peut retenir plus d'eau que ses micro-cavités.
      </text>
    </g>
  </g>

  <!-- Corner Press Registration Target Marks -->
  <g transform="translate(20, 72)">
    <circle cx="0" cy="0" r="9" fill="none" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="-12" y1="0" x2="12" y2="0" stroke="#0A0A0A" stroke-width="1.2"/>
  </g>
  <g transform="translate(780, 72)">
    <circle cx="0" cy="0" r="9" fill="none" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="-12" y1="0" x2="12" y2="0" stroke="#0A0A0A" stroke-width="1.2"/>
  </g>
</svg>
```

---

## 6. Slide 11 : Schéma de Grainage Mécanique Oscillant (`assets/schematic_grainage_mecanique.svg`, SCH-09)

### 6.1 Rationale Physique & Cinématique du Brossage
Le grainage mécanique est réalisé par l'action de brosses métalliques rotatives (fils d'acier trempé ou fibres abrasives) attaquant à sec la bande d'aluminium défilant en continu.
- **Le Rôle Vital du Mouvement Oscillant :** Les brosses sont obligatoirement animées d'un mouvement combiné :
  1. Une rotation à haute vitesse ($\omega \approx 1500\text{–}2500\text{ tr/min}$).
  2. Une **oscillation transversale** rapide de va-et-vient perpendiculaire au défilement de la bande.
- **La Conséquence d'un Brossage Sans Oscillation (Défaut Critique) :**
  Des brosses uniquement en rotation créent des sillons rectilignes parallèles orientés dans le sens de défilement. Ces micro-rayures continues forment de véritables **canaux de drainage capillaire** : sous la pression du cylindre d'impression, l'eau s'échappe le long des sillons, rompant la couche de mouillage et provoquant un graissage immédiat et irréversible de la plaque.
- **Performances & Limite :** Structure peu poreuse, très faible consommation d'eau, équilibre eau/encre rapide, mais endurance limitée à **500 000 exemplaires** en raison de l'écrasement mécanique progressif des crêtes d'aluminium sous la pression du blanchet.

### 6.2 Balisage HTML & Fallback Intégré
```html
<div class="plate-img-box diagram" style="width: 100%; max-width: 440px; height: 320px; border: 2px solid var(--color-dark); margin-bottom: 1.5rem;">
    <img src="assets/schematic_grainage_mecanique.svg" 
         alt="Schéma Technique : Grainage Mécanique par Brossage Oscillant" 
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
         style="width: 100%; height: 100%; object-fit: contain;">
    <div class="plate-fallback">
        <span class="fallback-icon" style="font-size: 2.5rem;">🔄</span>
        <strong style="font-size: 1.05rem; margin-top: 0.4rem;">SCH-09 : Grainage Mécanique</strong>
        <p class="fallback-caption" style="font-size: 0.82rem; color: #555; line-height: 1.35; max-width: 340px;">
            Brossage rotatif combiné à une oscillation transversale évitant l'alignement des sillons de fuite. Tirages plafonnés à 500 000 ex.
        </p>
        <small style="font-family: monospace; font-size: 0.72rem; background: #E5E7EB; padding: 0.2rem 0.5rem; border: 1px solid #D1D5DB; margin-top: 0.4rem;">assets/schematic_grainage_mecanique.svg</small>
    </div>
</div>
<div style="text-align: left; max-width: 440px; border-left: 3px solid var(--color-accent); padding-left: 1rem;">
    <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent);">
        SCH-09 &#8226; Cinématique &amp; Isotropie
    </div>
    <p style="font-size: 0.85rem; color: #444; margin-top: 0.3rem; line-height: 1.4;">
        Génération de microcavités multidirectionnelles fermées garantissant la rétention omnidirectionnelle de l'eau.
    </p>
</div>
```

### 6.3 Balisage Vectoriel SVG Clé en Main : `assets/schematic_grainage_mecanique.svg`
*Validé 100% XML 1.0 (aucun `&bull;`, entités numériques strictes).*

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <style>
      .title { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 900; font-size: 15px; fill: #FFFFFF; letter-spacing: 0.05em; }
      .subtitle { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 700; font-size: 11px; fill: #E32619; text-anchor: end; }
      .label-head { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 800; font-size: 12px; text-transform: uppercase; }
      .label-sub { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 700; font-size: 11px; }
      .label-desc { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 500; font-size: 10px; fill: #333333; }
      .badge-text { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 800; font-size: 9px; fill: #FFFFFF; text-anchor: middle; }
      .param-val { font-family: 'Courier New', monospace; font-weight: 700; font-size: 11px; fill: #0A0A0A; }
    </style>
    <pattern id="grid-pattern-sch09" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
    </pattern>
    <marker id="arrow-red-sch09" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#E32619" />
    </marker>
    <marker id="arrow-dark-sch09" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0A0A0A" />
    </marker>
    <marker id="arrow-blue-sch09" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0077B6" />
    </marker>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="500" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="3"/>
  <rect x="0" y="52" width="800" height="448" fill="url(#grid-pattern-sch09)" />

  <!-- Top Header Bar -->
  <rect x="0" y="0" width="800" height="52" fill="#0A0A0A"/>
  <text x="24" y="32" class="title">SCH-09 : GRAINAGE MÉCANIQUE PAR BROSSAGE OSCILLANT</text>
  <text x="776" y="32" class="subtitle">MICROCAVITÉS ISOTROPES &#8226; ÉVITEMENT DES SILLONS DE FUITE</text>

  <!-- ====================================================================== -->
  <!-- ZONE SUPÉRIEURE : MÉCANISME INDUSTRIEL DE BROSSAGE                     -->
  <!-- ====================================================================== -->
  <g transform="translate(30, 68)">
    <rect x="0" y="0" width="740" height="152" fill="#F8FAFC" stroke="#0A0A0A" stroke-width="1.5"/>

    <!-- Section Badge -->
    <rect x="15" y="10" width="180" height="18" fill="#0A0A0A" rx="2"/>
    <text x="105" y="22" class="badge-text">POSTE INDUSTRIEL DE GRAINAGE</text>

    <!-- Aluminum Web advancing -->
    <rect x="30" y="105" width="680" height="26" fill="#E5E7EB" stroke="#0A0A0A" stroke-width="2"/>
    <text x="40" y="122" class="label-head" fill="#4B5563">Feuille d'Aluminium en Défilement Continu</text>
    <line x1="560" y1="118" x2="670" y2="118" stroke="#0A0A0A" stroke-width="3" marker-end="url(#arrow-dark-sch09)"/>
    <text x="615" y="110" class="param-val" fill="#0A0A0A" text-anchor="middle">v_bande = 20 m/min</text>

    <!-- Rotating Cylindrical Brush Center -->
    <g transform="translate(360, 65)">
      <!-- Outer Bristles Circle -->
      <circle cx="0" cy="0" r="42" fill="#F1F5F9" stroke="#0A0A0A" stroke-width="1.5" stroke-dasharray="3 3"/>
      <!-- Radiating Bristles -->
      <line x1="-42" y1="0" x2="42" y2="0" stroke="#64748B" stroke-width="1.2"/>
      <line x1="0" y1="-42" x2="0" y2="42" stroke="#64748B" stroke-width="1.2"/>
      <line x1="-30" y1="-30" x2="30" y2="30" stroke="#64748B" stroke-width="1.2"/>
      <line x1="-30" y1="30" x2="30" y2="-30" stroke="#64748B" stroke-width="1.2"/>
      <!-- Brush Core Shaft -->
      <circle cx="0" cy="0" r="16" fill="#0A0A0A" stroke="#0A0A0A" stroke-width="2"/>
      <circle cx="0" cy="0" r="5" fill="#E32619"/>
      
      <!-- Rotation Circular Arrow -->
      <path d="M 28 -28 A 40 40 0 0 1 38 15" fill="none" stroke="#0A0A0A" stroke-width="2.5" marker-end="url(#arrow-dark-sch09)"/>
      <text x="48" y="-12" class="param-val" fill="#0A0A0A">&#969; = 2 000 tr/min</text>

      <!-- Transversal Oscillation Arrow (Double Red Arrow above) -->
      <line x1="-70" y1="-50" x2="70" y2="-50" stroke="#E32619" stroke-width="3" marker-start="url(#arrow-red-sch09)" marker-end="url(#arrow-red-sch09)"/>
      <rect x="-60" y="-62" width="120" height="15" fill="#FFFFFF" stroke="#E32619" stroke-width="1"/>
      <text x="0" y="-51" class="label-desc" font-weight="800" fill="#E32619" text-anchor="middle">
        OSCILLATION TRANSVERSALE
      </text>
    </g>

    <!-- Technical Note on Left -->
    <g transform="translate(30, 40)">
      <text x="0" y="14" class="label-head" fill="#E32619">Brosses Abrasives Rotatives :</text>
      <text x="0" y="30" class="label-desc">Fils métalliques en acier trempé ou nylon abrasif.</text>
      <text x="0" y="44" class="label-desc">Pression de contact micrométrique régulée.</text>
    </g>

    <!-- Technical Note on Right -->
    <g transform="translate(510, 40)">
      <text x="0" y="14" class="label-head" fill="#0A0A0A">Mouvement Combiné :</text>
      <text x="0" y="30" class="label-desc">Rotation à haute vitesse + va-et-vient latéral.</text>
      <text x="0" y="44" class="label-desc">Empêche tout alignement des microcavités.</text>
    </g>
  </g>

  <!-- ====================================================================== -->
  <!-- ZONE INFÉRIEURE : ANALYSE COMPARATIVE MICROSCOPIQUE                    -->
  <!-- ====================================================================== -->

  <!-- Left: SANS OSCILLATION (DÉFAUT MAJEUR) -->
  <g transform="translate(30, 230)">
    <!-- Header Badge -->
    <rect x="0" y="0" width="160" height="22" fill="#DC2626" rx="2"/>
    <text x="80" y="15" class="badge-text">SANS OSCILLATION (DÉFAUT)</text>
    <text x="170" y="16" class="label-head" fill="#DC2626">Sillons Longitudinaux</text>

    <!-- Texture Box -->
    <g transform="translate(0, 30)">
      <rect x="0" y="0" width="340" height="85" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="1.5"/>
      <!-- Linear Parallel Scratches -->
      <line x1="20" y1="18" x2="320" y2="18" stroke="#94A3B8" stroke-width="2"/>
      <line x1="20" y1="36" x2="320" y2="36" stroke="#94A3B8" stroke-width="2"/>
      <line x1="20" y1="54" x2="320" y2="54" stroke="#94A3B8" stroke-width="2"/>
      <line x1="20" y1="72" x2="320" y2="72" stroke="#94A3B8" stroke-width="2"/>

      <!-- Water Leaking Flow Arrows -->
      <path d="M 220 18 L 290 18" stroke="#0077B6" stroke-width="2.5" marker-end="url(#arrow-blue-sch09)"/>
      <path d="M 220 54 L 290 54" stroke="#0077B6" stroke-width="2.5" marker-end="url(#arrow-blue-sch09)"/>
      <text x="140" y="49" class="param-val" fill="#0077B6">Fuite d'eau</text>
    </g>

    <!-- Physical Explanation -->
    <text x="0" y="132" class="label-desc" font-weight="700" fill="#991B1B">
      &#10006; Les sillons continus agissent comme des canaux de drainage.
    </text>
    <text x="0" y="146" class="label-desc" fill="#4B5563">
      L'eau de mouillage s'écoule par capillarité axiale &#8594; Graissage spontané.
    </text>

    <!-- Status Box -->
    <rect x="0" y="155" width="340" height="24" fill="#FEE2E2" stroke="#DC2626" stroke-width="1"/>
    <text x="170" y="171" class="label-desc" font-weight="800" fill="#B91C1C" text-anchor="middle">
      REJET MACHINE : SILLONS ORIENTÉS NON-CONFORMES
    </text>
  </g>

  <!-- Right: AVEC BROSSAGE OSCILLANT (CONFORME INDUSTRIEL) -->
  <g transform="translate(430, 230)">
    <!-- Header Badge -->
    <rect x="0" y="0" width="165" height="22" fill="#059669" rx="2"/>
    <text x="82" y="15" class="badge-text">AVEC OSCILLATION (VALIDÉ)</text>
    <text x="175" y="16" class="label-head" fill="#059669">Micro-Alvéoles Isotropes</text>

    <!-- Texture Box -->
    <g transform="translate(0, 30)">
      <rect x="0" y="0" width="340" height="85" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="1.5"/>
      <!-- Intersecting Sinusoidal Waves -->
      <path d="M 20 20 Q 50 5 80 20 Q 110 35 140 20 Q 170 5 200 20 Q 230 35 260 20 Q 290 5 320 20" fill="none" stroke="#64748B" stroke-width="1.5"/>
      <path d="M 20 40 Q 50 55 80 40 Q 110 25 140 40 Q 170 55 200 40 Q 230 25 260 40 Q 290 55 320 40" fill="none" stroke="#64748B" stroke-width="1.5"/>
      <path d="M 20 60 Q 50 45 80 60 Q 110 75 140 60 Q 170 45 200 60 Q 230 75 260 60 Q 290 45 320 60" fill="none" stroke="#64748B" stroke-width="1.5"/>
      <path d="M 20 75 Q 50 90 80 75 Q 110 60 140 75 Q 170 90 200 75 Q 230 60 260 75 Q 290 90 320 75" fill="none" stroke="#64748B" stroke-width="1.5"/>

      <!-- Trapped Water Cells (Cyan Dots) -->
      <circle cx="80" cy="30" r="5" fill="#90E0EF" stroke="#0077B6" stroke-width="1"/>
      <circle cx="140" cy="50" r="5" fill="#90E0EF" stroke="#0077B6" stroke-width="1"/>
      <circle cx="200" cy="30" r="5" fill="#90E0EF" stroke="#0077B6" stroke-width="1"/>
      <circle cx="260" cy="50" r="5" fill="#90E0EF" stroke="#0077B6" stroke-width="1"/>
      <text x="210" y="70" class="param-val" fill="#0077B6">Eau piégée</text>
    </g>

    <!-- Physical Explanation -->
    <text x="0" y="132" class="label-desc" font-weight="700" fill="#047857">
      &#10004; Structure fermée multidirectionnelle sans canal d'écoulement.
    </text>
    <text x="0" y="146" class="label-desc" fill="#4B5563">
      Rétention omnidirectionnelle de l'eau et accroche parfaite de la couche.
    </text>

    <!-- Status Box -->
    <rect x="0" y="155" width="340" height="24" fill="#D1FAE5" stroke="#059669" stroke-width="1"/>
    <text x="170" y="171" class="label-desc" font-weight="800" fill="#065F46" text-anchor="middle">
      VALIDÉ : TEXTURE ISOTROPE HOMOGÈNE CONFORME
    </text>
  </g>

  <!-- ====================================================================== -->
  <!-- BANDEAU INFÉRIEUR : PARAMÈTRES TECHNIQUES DU GRAINAGE MÉCANIQUE         -->
  <!-- ====================================================================== -->
  <g transform="translate(30, 420)">
    <rect x="0" y="0" width="740" height="65" fill="#F4F5F6" stroke="#0A0A0A" stroke-width="2"/>
    
    <!-- Parameter 1 -->
    <g transform="translate(20, 12)">
      <text x="0" y="14" class="label-sub" fill="#E32619">PLAFOND DE TIRAGE :</text>
      <text x="160" y="14" class="param-val">500 000 exemplaires</text>
      <text x="0" y="32" class="label-desc">
        Usure progressive des micro-crêtes sous le frottement répété du blanchet caoutchouc.
      </text>
    </g>

    <!-- Parameter 2 -->
    <g transform="translate(390, 12)">
      <text x="0" y="14" class="label-sub" fill="#0A0A0A">CONSOMMATION D'EAU :</text>
      <text x="175" y="14" class="param-val">Faible &#8226; Régulière</text>
      <text x="0" y="32" class="label-desc">
        Structure peu poreuse permettant d'atteindre l'équilibre eau/encre dès les premières feuilles.
      </text>
    </g>
  </g>

  <!-- Corner Press Registration Target Marks -->
  <g transform="translate(20, 72)">
    <circle cx="0" cy="0" r="9" fill="none" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="-12" y1="0" x2="12" y2="0" stroke="#0A0A0A" stroke-width="1.2"/>
  </g>
  <g transform="translate(780, 72)">
    <circle cx="0" cy="0" r="9" fill="none" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="-12" y1="0" x2="12" y2="0" stroke="#0A0A0A" stroke-width="1.2"/>
  </g>
</svg>
```

---

## 7. Slide 12 : Schéma de Grainage Chimique à Brosse (`assets/schematic_grainage_chimique.svg`, SCH-10)

### 7.1 Rationale Physico-Chimique & Formulation de la Barbotine
Le grainage chimique à brosse est un procédé combiné hybride mécano-chimique.
- **Principe du procédé :**
  - La bande d'aluminium défile sous une rampe de buses pulvérisant une **barbotine abrasive** (suspension liquide de micro-grains de poudre de ponce fine $SiO_2$ ou de quartz broyé dans une solution aqueuse d'acide chlorhydrique $HCl$ ou nitrique $HNO_3$ dilué).
  - Des **brosses cylindriques rotatives en fibres de nylon** souples et résistantes entraînent et martèlent les grains abrasifs contre la surface métallique.
- **Double action synergique :**
  1. *Action mécanique :* Micro-érosion et martelage balistique par les arêtes vives des grains de ponce.
  2. *Action chimique :* Morsure acide superficielle qui ronge le métal et crée des anfractuosités profondes offrant une adhérence exceptionnelle pour la résine diazoïque.
- **Avantages vs Inconvénients Métallurgiques :**
  - **Atouts :** Excellente tenue de la couche photosensible, mouillabilité favorable, équilibre eau/encre rapide.
  - **Inconvénients :** Attaque acide hétérogène (micro-irrégularités locales), affaiblissement de la dureté superficielle de l'aluminium, élimination incomplète de la résine au fond des creux lors du développement. Procédé réservé aux **tirages moyens** (< 300 000 exemplaires).

### 7.2 Balisage HTML & Fallback Intégré
```html
<div class="plate-img-box diagram" style="width: 100%; max-width: 440px; height: 320px; border: 2px solid var(--color-dark); margin-bottom: 1.5rem;">
    <img src="assets/schematic_grainage_chimique.svg" 
         alt="Schéma Procédé : Grainage Chimique à Brosse avec Barbotine Acide" 
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
         style="width: 100%; height: 100%; object-fit: contain;">
    <div class="plate-fallback">
        <span class="fallback-icon" style="font-size: 2.5rem;">🧪</span>
        <strong style="font-size: 1.05rem; margin-top: 0.4rem;">SCH-10 : Grainage Chimique</strong>
        <p class="fallback-caption" style="font-size: 0.82rem; color: #555; line-height: 1.35; max-width: 340px;">
            Brosses nylon et projection de barbotine acide (poudre de ponce/quartz). Adhérence supérieure pour tirages moyens.
        </p>
        <small style="font-family: monospace; font-size: 0.72rem; background: #E5E7EB; padding: 0.2rem 0.5rem; border: 1px solid #D1D5DB; margin-top: 0.4rem;">assets/schematic_grainage_chimique.svg</small>
    </div>
</div>
<div style="text-align: left; max-width: 440px; border-left: 3px solid var(--color-accent); padding-left: 1rem;">
    <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent);">
        SCH-10 &#8226; Action Mécano-Chimique
    </div>
    <p style="font-size: 0.85rem; color: #444; margin-top: 0.3rem; line-height: 1.4;">
        Morsure acide conjuguée au martelage des fibres nylon créant des anfractuosités d'ancrage microscopiques.
    </p>
</div>
```

### 7.3 Balisage Vectoriel SVG Clé en Main : `assets/schematic_grainage_chimique.svg`
*Validé 100% XML 1.0 (aucun `&bull;`, entités numériques strictes).*

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <style>
      .title { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 900; font-size: 15px; fill: #FFFFFF; letter-spacing: 0.05em; }
      .subtitle { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 700; font-size: 11px; fill: #E32619; text-anchor: end; }
      .label-head { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 800; font-size: 12px; text-transform: uppercase; }
      .label-sub { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 700; font-size: 11px; }
      .label-desc { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 500; font-size: 10px; fill: #333333; }
      .badge-text { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 800; font-size: 9px; fill: #FFFFFF; text-anchor: middle; }
      .param-val { font-family: 'Courier New', monospace; font-weight: 700; font-size: 11px; fill: #0A0A0A; }
    </style>
    <pattern id="grid-pattern-sch10" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
    </pattern>
    <marker id="arrow-red-sch10" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#E32619" />
    </marker>
    <marker id="arrow-dark-sch10" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0A0A0A" />
    </marker>
    <marker id="arrow-blue-sch10" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0077B6" />
    </marker>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="500" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="3"/>
  <rect x="0" y="52" width="800" height="448" fill="url(#grid-pattern-sch10)" />

  <!-- Top Header Bar -->
  <rect x="0" y="0" width="800" height="52" fill="#0A0A0A"/>
  <text x="24" y="32" class="title">SCH-10 : GRAINAGE CHIMIQUE À BROSSE (BARBOTINE ACIDE)</text>
  <text x="776" y="32" class="subtitle">BROSSES NYLON + POUDRE DE PONCE/QUARTZ &#8226; TIRAGES MOYENS</text>

  <!-- ====================================================================== -->
  <!-- ZONE GAUCHE : ENCEINTE INDUSTRIELLE DE TRAITEMENT                      -->
  <!-- ====================================================================== -->
  <g transform="translate(30, 68)">
    <rect x="0" y="0" width="370" height="335" fill="#F8FAFC" stroke="#0A0A0A" stroke-width="1.5"/>

    <!-- Section Badge -->
    <rect x="15" y="10" width="190" height="18" fill="#0A0A0A" rx="2"/>
    <text x="110" y="22" class="badge-text">ENCEINTE MÉCANO-CHIMIQUE</text>

    <!-- Spray Manifold (Rampe d'aspersion barbotine) -->
    <g transform="translate(30, 45)">
      <rect x="0" y="0" width="310" height="18" fill="#E2E8F0" stroke="#0A0A0A" stroke-width="1.5"/>
      <text x="155" y="13" class="label-desc" font-weight="700" fill="#0A0A0A" text-anchor="middle">
        Rampe d'Aspersion de Barbotine Acide
      </text>

      <!-- Spray Nozzles -->
      <polygon points="40,18 35,26 45,26" fill="#0A0A0A"/>
      <polygon points="110,18 105,26 115,26" fill="#0A0A0A"/>
      <polygon points="180,18 175,26 185,26" fill="#0A0A0A"/>
      <polygon points="250,18 245,26 255,26" fill="#0A0A0A"/>

      <!-- Liquid Droplets & Abrasive Grain Slurry -->
      <g stroke="#E32619" stroke-width="1" stroke-dasharray="2 3">
        <line x1="40" y1="28" x2="35" y2="60"/>
        <line x1="40" y1="28" x2="45" y2="60"/>
        <line x1="110" y1="28" x2="105" y2="60"/>
        <line x1="110" y1="28" x2="115" y2="60"/>
        <line x1="180" y1="28" x2="175" y2="60"/>
        <line x1="180" y1="28" x2="185" y2="60"/>
        <line x1="250" y1="28" x2="245" y2="60"/>
        <line x1="250" y1="28" x2="255" y2="60"/>
      </g>
    </g>

    <!-- Dual Cylindrical Nylon Brushes -->
    <g transform="translate(100, 140)">
      <!-- Brush 1 -->
      <circle cx="0" cy="0" r="32" fill="#FEF3C7" stroke="#0A0A0A" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="12" fill="#D97706"/>
      <text x="0" y="4" class="badge-text">NYLON</text>
      <!-- Rotation 1 -->
      <path d="M 22 -22 A 30 30 0 0 1 30 10" fill="none" stroke="#0A0A0A" stroke-width="2" marker-end="url(#arrow-dark-sch10)"/>

      <!-- Brush 2 -->
      <circle cx="170" cy="0" r="32" fill="#FEF3C7" stroke="#0A0A0A" stroke-width="1.5"/>
      <circle cx="170" cy="0" r="12" fill="#D97706"/>
      <text x="170" y="4" class="badge-text">NYLON</text>
      <!-- Rotation 2 -->
      <path d="M 192 -22 A 30 30 0 0 1 200 10" fill="none" stroke="#0A0A0A" stroke-width="2" marker-end="url(#arrow-dark-sch10)"/>
    </g>

    <!-- Advancing Aluminum Sheet -->
    <rect x="20" y="190" width="330" height="20" fill="#CBD5E1" stroke="#0A0A0A" stroke-width="2"/>
    <text x="25" y="204" class="label-sub" fill="#0A0A0A">Bande d'Aluminium</text>
    <line x1="240" y1="200" x2="330" y2="200" stroke="#E32619" stroke-width="2.5" marker-end="url(#arrow-red-sch10)"/>

    <!-- Chemistry Callout Box -->
    <g transform="translate(20, 225)">
      <rect x="0" y="0" width="330" height="95" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="1.5"/>
      <text x="12" y="18" class="label-head" fill="#E32619">Composition de la Barbotine :</text>
      <text x="12" y="35" class="label-desc">&#8226; <tspan font-weight="700">Abrasif Minéral :</tspan> Poudre de ponce fine (SiO₂) ou quartz broyé.</text>
      <text x="12" y="52" class="label-desc">&#8226; <tspan font-weight="700">Phase Liquide :</tspan> Solution aqueuse acide diluée (HCl ou HNO₃).</text>
      <text x="12" y="69" class="label-desc">&#8226; <tspan font-weight="700">Brosses :</tspan> Poils souples en nylon entraînant les grains abrasifs.</text>
      <text x="12" y="86" class="label-desc">&#8226; <tspan font-weight="700">Rinçage :</tspan> Lavage immédiat à l'eau claire sous haute pression.</text>
    </g>
  </g>

  <!-- ====================================================================== -->
  <!-- ZONE DROITE : MÉCANISME MICROSCOPIQUE &amp; MATRICE AVANTAGES/LIMITES       -->
  <!-- ====================================================================== -->
  <g transform="translate(420, 68)">
    <rect x="0" y="0" width="350" height="335" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="1.5"/>

    <!-- Section Badge -->
    <rect x="15" y="10" width="180" height="18" fill="#E32619" rx="2"/>
    <text x="105" y="22" class="badge-text">ACTION MICROSCOPIQUE</text>

    <!-- Microscopic Interaction Diagram -->
    <g transform="translate(15, 38)">
      <rect x="0" y="0" width="320" height="95" fill="#F1F5F9" stroke="#0A0A0A" stroke-width="1"/>
      
      <!-- Jagged Porous Metal Profile -->
      <path d="M 10 65 
               Q 25 35 40 65 Q 55 45 70 70 Q 90 30 110 65 Q 130 50 150 75 
               Q 175 35 200 65 Q 220 40 240 70 Q 260 30 280 65 Q 295 50 310 65 
               L 310 90 L 10 90 Z" 
            fill="#CBD5E1" stroke="#0A0A0A" stroke-width="1.5"/>

      <!-- Pumice Grain Particles (Brown Diamonds) -->
      <polygon points="55,38 60,33 65,40 58,45" fill="#B45309" stroke="#0A0A0A" stroke-width="0.8"/>
      <polygon points="125,25 132,20 138,28 130,33" fill="#B45309" stroke="#0A0A0A" stroke-width="0.8"/>
      <polygon points="215,30 222,25 228,34 220,38" fill="#B45309" stroke="#0A0A0A" stroke-width="0.8"/>
      
      <!-- Nylon Bristles Pressing Down -->
      <line x1="60" y1="5" x2="60" y2="33" stroke="#D97706" stroke-width="2.5"/>
      <line x1="132" y1="5" x2="132" y2="20" stroke="#D97706" stroke-width="2.5"/>
      <line x1="222" y1="5" x2="222" y2="25" stroke="#D97706" stroke-width="2.5"/>

      <!-- Annotations -->
      <text x="15" y="16" class="param-val" fill="#D97706">Brosses Nylon</text>
      <text x="240" y="16" class="param-val" fill="#B45309">Grains Ponce</text>
      <text x="160" y="85" class="label-desc" font-weight="700" fill="#0A0A0A" text-anchor="middle">
        Anfractuosités d'accroche mécano-chimiques profondes
      </text>
    </g>

    <!-- Tradeoffs Comparison Matrix -->
    <g transform="translate(15, 145)">
      <!-- Advantages Box -->
      <rect x="0" y="0" width="320" height="85" fill="#ECFDF5" stroke="#059669" stroke-width="1"/>
      <text x="10" y="16" class="label-head" fill="#065F46">&#10004; AVANTAGES MAJEURS :</text>
      <text x="10" y="32" class="label-desc">&#8226; <tspan font-weight="700">Excellente adhérence</tspan> de la couche photosensible diazoïque.</text>
      <text x="10" y="48" class="label-desc">&#8226; <tspan font-weight="700">Bonne mouillabilité</tspan> réduisant la quantité d'eau requise.</text>
      <text x="10" y="64" class="label-desc">&#8226; <tspan font-weight="700">Équilibre eau/encre rapide</tspan> et stabilité de calage en machine.</text>
      <text x="10" y="80" class="label-desc">&#8226; Très bonne fidélité de reproduction des finesses de trame.</text>

      <!-- Drawbacks Box -->
      <g transform="translate(0, 95)">
        <rect x="0" y="0" width="320" height="85" fill="#FEF2F2" stroke="#DC2626" stroke-width="1"/>
        <text x="10" y="16" class="label-head" fill="#991B1B">&#10006; INCONVÉNIENTS &amp; LIMITES :</text>
        <text x="10" y="32" class="label-desc">&#8226; <tspan font-weight="700">Attaque acide hétérogène :</tspan> micro-irrégularités locales de rugosité.</text>
        <text x="10" y="48" class="label-desc">&#8226; <tspan font-weight="700">Affaiblissement métallique :</tspan> perte de dureté superficielle de l'Alu.</text>
        <text x="10" y="64" class="label-desc">&#8226; <tspan font-weight="700">Rétention de résine :</tspan> développement incomplet dans les creux.</text>
        <text x="10" y="80" class="label-desc">&#8226; <tspan font-weight="700">Tirages moyens uniquement :</tspan> inférieur à l'électrograinage.</text>
      </g>
    </g>
  </g>

  <!-- ====================================================================== -->
  <!-- BANDEAU INFÉRIEUR : POSITIONNEMENT TECHNIQUE DANS L'INDUSTRIE           -->
  <!-- ====================================================================== -->
  <g transform="translate(30, 418)">
    <rect x="0" y="0" width="740" height="66" fill="#F4F5F6" stroke="#0A0A0A" stroke-width="2"/>
    
    <g transform="translate(20, 14)">
      <text x="0" y="14" class="label-sub" fill="#E32619">POSITIONNEMENT INDUSTRIEL :</text>
      <text x="195" y="14" class="param-val">Tirages Moyens (100 000 – 300 000 ex)</text>
      <text x="0" y="34" class="label-desc">
        Procédé économique intermédiaire supplanté pour les très longs tirages par l'électrograinage en bain acide continu.
      </text>
    </g>
  </g>

  <!-- Corner Press Registration Target Marks -->
  <g transform="translate(20, 72)">
    <circle cx="0" cy="0" r="9" fill="none" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="-12" y1="0" x2="12" y2="0" stroke="#0A0A0A" stroke-width="1.2"/>
  </g>
  <g transform="translate(780, 72)">
    <circle cx="0" cy="0" r="9" fill="none" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#0A0A0A" stroke-width="1.2"/>
    <line x1="-12" y1="0" x2="12" y2="0" stroke="#0A0A0A" stroke-width="1.2"/>
  </g>
</svg>
```

---

## 8. Invariants Brutalistes Suisses & Assurance Qualité

### 8.1 Bannissement Formel du Relâchement Graphique ("Anti-Slop")
- **Zéro ombre diffuse :** Aucun `box-shadow` flou n'est appliqué aux conteneurs de schémas ou aux cartes. Seuls les contours massifs (`border: 2px solid var(--color-dark)` ou `border: 3px solid var(--color-accent)`) sont autorisés.
- **Formes orthogonales rigides :** `border-radius: 0` strict pour tous les blocs schématiques et fiches techniques.
- **Grille de repérage :** Présence de mires de repérage typographiques aux coins pour rappeler la précision du calage offset quadrichromique.

### 8.2 Comportement Dynamique du Fallback
Le test E2E `Tier 2.4` et `Tier 2.5` (`tests/e2e-presentation.test.mjs`) vérifie que :
1. Chaque conteneur possède la classe `.plate-img-box`.
2. L'élément `<img>` porte l'attribut `onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"`.
3. Le conteneur de secours `.plate-fallback` comporte un glyph/icône textuel, un titre en gras `<strong>...</strong>`, et un chemin explicite dans `<small>assets/...</small>`.
4. Tous les conteneurs spécifiés pour SCH-04 à SCH-10 respectent rigoureusement cette signature.

---

## 9. Protocole de Déploiement pour l'Implémenteur M2

Pour déployer physiquement les 3 fichiers SVG dans `assets/`, l'implémenteur exécutera la création de :
1. `assets/schematic_rugosite_grainage.svg` (Section 5.3)
2. `assets/schematic_grainage_mecanique.svg` (Section 6.3)
3. `assets/schematic_grainage_chimique.svg` (Section 7.3)

Ces 3 fichiers ont été testés et certifiés 100% valides XML 1.0 sous le parseur Chromium DOMParser sans aucun `parsererror`.
