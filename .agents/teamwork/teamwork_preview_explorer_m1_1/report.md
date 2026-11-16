# Rapport d'Architecture & Spécification de Purge — Milestone 1 (Slides 01-06)
**Agent :** M1 Explorer 1 (Markup Architecture & Purge)  
**Date :** 2026-10-23  
**Dépôt :** `c:\Users\lufylon\Documents\antigravity\silly-euclid`  
**Statut :** Spécification Prête pour Implémentation  

---

## 1. Executive Summary & Objectifs M1

Le présent rapport définit l'architecture technique, le balisage sémantique HTML complet pour les **Slides 01 à 06**, la spécification d'éradication des reliquats de l'ancienne présentation ("Identité Numérique", modèle 3D Iceberg, tables d'e-réputation), ainsi que la mise à jour du titre de fenêtre dans `main.js`.

### Principes Directeurs
1. **Zéro Méta-Libellés :** Proscription absolue des mentions pédagogiques ou scolaires telles que « Personne X », « Intervenant X », « Page 19 à 22 », « Page 20 », « Slide pour Personne 1 », « INFO208 », ou « Mme Batioui ». Remplacement systématique par une terminologie professionnelle d'ingénierie des arts graphiques.
2. **Design Brutaliste Suisse Authentique :** Réutilisation exclusive des variables et tokens natifs de `style.css` (`--color-bg: #FFFFFF`, `--color-light: #F4F5F6`, `--color-dark: #0A0A0A`, `--color-accent: #E32619`, `--ease-kinetic`, `--font-main: Inter`). Aucune injection de templates web externes ou de cartes génériques "AI slop".
3. **Respiration & Granularité (1 Sujet = 1 Slide) :** Traitement aéré et spacieux. Part 1 (Origine & Principe) est découpée en 4 diapositives complètes (Slides 03 à 06), précédée de la Page de Garde (Slide 01) et du Sommaire Général des 6 axes (Slide 02).
4. **Schémas Techniques & Conteneurs Dédiés :** Intégration de conteneurs standardisés `.plate-img-box` et `.plate-fallback` pour `SCH-01` (Senefelder), `SCH-02` (Réaction chimique pierre) et `SCH-03` (Principe planographique).

---

## 2. Spécification de Purge Exhaustive (`index.html`)

L'inspection de `index.html` (1624 lignes) a révélé la présence de plus de 1100 lignes d'artefacts obsolètes issus d'un ancien projet sur l'identité numérique, incluant un modèle 3D Three.js/@google/model-viewer, des filtres SVG inutilisés, et des écouteurs JavaScript invasifs capturant les touches de navigation.

### A. Éléments à Purger dans `<head>` et Préambule
1. **Commentaire d'En-tête (Lignes 1-28) :**
   - *Actuel :* Références à "Concept d'Identité Numérique", "INFO208 (Classe 108)", "Mme Batioui".
   - *Action :* Remplacer par un en-tête propre dédié à la présentation "Production des Formes Imprimantes — Les Plaques Offset".
2. **Méta-balises (Lignes 34-39) :**
   - *Actuel :* `<meta name="supervisor" content="Mme Batioui">`, `<meta name="course" content="INFO208">`, `<meta name="description" content="Présentation immersive et interactive sur l'Identité Numérique...">`.
   - *Action :* Purger les tags `supervisor` et `course`. Remplacer `description` par une description technique du module d'impression offset.
3. **Script Externe Model-Viewer (Ligne 43) :**
   - *Actuel :* `<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>`.
   - *Action :* **Supprimer définitivement**. Ce script pèse plusieurs mégaoctets et n'a aucune utilité pour les plaques offset.
4. **Filtre SVG Iceberg Silhouette (Lignes 48-64) :**
   - *Actuel :* `<filter id="iceberg-silhouette">` avec `feMorphology`, `feFlood`, etc.
   - *Action :* **Supprimer définitivement**.

### B. Diapositives Obsolètes à Éradiquer dans `<main class="presentation-container">`
1. **Slide 4 : L'Iceberg Morph & Traces (`#slide-2`, Lignes 478-1510) :**
   - *Contenu :* 1032 lignes de styles CSS embarqués, balises `<model-viewer id="iceberg-viewer" src="iceberg.glb">`, animations SVG de découpe d'iceberg, bouton de développement "dev-copy-cam", et un script JavaScript volumineux interceptant la navigation avec `e.stopImmediatePropagation()` sur `nextBtn`, `prevBtn` et les touches fléchées.
   - *Action :* **Supprimer l'intégralité du bloc `<section class="slide" id="slide-2">` et son script associé**.
2. **Slide 5 : Le Miroir de l'E-Réputation (`#slide-3`, Lignes 1512-1535) :**
   - *Contenu :* Table de comparaison LinkedIn vs Shadow Profile vs Score d'e-réputation.
   - *Action :* **Supprimer définitivement**.
3. **Slide 6 : La Faille (`#slide-4`, Lignes 1537-1553) :**
   - *Contenu :* Cadenas fissuré, ingénierie sociale, phishing.
   - *Action :* **Supprimer définitivement**.
4. **Slide 7 : La Machine à Données (`#slide-5`, Lignes 1555-1573) :**
   - *Contenu :* Tapis roulant données, tampon RGPD/CNDP.
   - *Action :* **Supprimer définitivement**.
5. **Slide 8 : Le Panneau de Contrôle (`#slide-6`, Lignes 1575-1586) :**
   - *Contenu :* Hygiène numérique, double authentification.
   - *Action :* **Supprimer définitivement**.

### C. Reclassement du Contenu de l'Ancienne Slide 3 (`#slide-supports-3plates`)
- L'actuelle Slide 3 (Lignes 180-476) traite des "3 Types de Plaques" (Monométalliques, Bimétalliques, Trimétalliques).
- Selon le plan officiel du blueprint validé par le Spec Miner, ce sujet appartient strictement à la **Partie 2 (Milestone 2, Slides 07, 08 et 09)**.
- *Recommandation M1 :* Extraire et sauvegarder ce composant (il sera réutilisé et déployé dans Milestone 2 pour les supports conventionnels). Les Slides 01 à 06 constituent le périmètre actif complet de M1.

---

## 3. Spécification de Mise à Jour de `main.js`

Dans `main.js`, la configuration de la fenêtre principale contient encore le titre de l'ancien projet.

### A. Ligne 35 — Titre de la Fenêtre Electron
```javascript
// AVANT (Ligne 35) :
title: 'Concept : Identité Numérique',

// APRÈS (Modification M1) :
title: 'Production des Formes Imprimantes — Les Plaques Offset',
```

### B. En-tête JSDoc (Lignes 1-22)
Nettoyer les mentions de `Concept d'Identité Numérique`, `INFO208` et `Mme Batioui` au profit de l'intitulé officiel du cours.

---

## 4. Balisage HTML Exact pour les Slides 01 à 06

Voici l'architecture HTML prête au déploiement pour la séquence d'ouverture et l'intégralité de la Partie 1.

```html
<!-- ========================================================================== -->
<!-- SLIDE 01 : PAGE DE GARDE                                                  -->
<!-- ========================================================================== -->
<section class="slide active" id="slide-01">
    <div class="grid grid-center text-dark">
        <div class="content-wrapper-center text-center">
            <span class="presenter-tag">Module : Production des Formes Imprimantes</span>
            <h1 class="huge-title" style="margin-top: 1rem; margin-bottom: 1rem; letter-spacing: -0.03em;">
                LES PLAQUES OFFSET
            </h1>
            <p class="subtitle" style="margin-bottom: 3.5rem; font-weight: 600;">
                Origines, Supports, Traitement de Surface & Typologie Industrielle
            </p>
            
            <div style="display: inline-block; padding: 1.8rem 3.5rem; border: 3px solid var(--color-dark); background: var(--color-light); box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);">
                <p style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; margin-bottom: 0.8rem; color: var(--color-accent);">
                    Équipe de Réalisation :
                </p>
                <p style="font-size: 1.25rem; font-weight: 800; line-height: 1.8; margin: 0; color: var(--color-dark); letter-spacing: 0.02em;">
                    MOHAMMED BADAOUI &bull; ABDELHAFIDE ELHOUATE &bull; AMINE AMAL<br>
                    CHOHAIB SOUFIANE &bull; RAYANE EL MAKHLOUFI &bull; MHAITATE AYMEN
                </p>
            </div>
        </div>
    </div>
</section>

<!-- ========================================================================== -->
<!-- SLIDE 02 : SOMMAIRE GÉNÉRAL (6 AXES TECHNOLOGIQUES)                       -->
<!-- ========================================================================== -->
<section class="slide" id="slide-02">
    <div class="grid grid-vertical bg-light">
        <!-- Slide Header -->
        <div class="slide-header" style="display: flex; justify-content: space-between; align-items: flex-end; padding: 2rem 5vw 1.2rem 5vw;">
            <div>
                <span class="presenter-tag" style="background: var(--color-accent); color: white; margin-bottom: 0.5rem;">
                    Programme Technique
                </span>
                <h2 class="slide-title" style="margin: 0; font-size: 2.8vw; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em;">
                    Sommaire Général
                </h2>
            </div>
            <div style="text-align: right;">
                <span style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-accent);">
                    Architecture du Cours
                </span>
                <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-dark); margin-top: 0.2rem;">
                    6 Piliers Technologiques
                </div>
            </div>
        </div>

        <!-- Sommaire Grid: 2 Rows x 3 Columns -->
        <div class="slide-body" style="padding: 2rem 5vw 4rem 5vw; flex: 1; display: flex; align-items: center;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.8rem; width: 100%;">
                
                <!-- Axe 1 -->
                <div class="sommaire-card" style="background: white; border: 2px solid var(--color-dark); padding: 1.4rem; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between; min-height: 170px;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                            <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-accent); color: white; padding: 0.2rem 0.5rem; border-radius: 2px;">PARTIE 01</span>
                            <span style="font-size: 1.2rem; font-weight: 900; color: var(--color-dark); opacity: 0.25;">01</span>
                        </div>
                        <h3 style="font-size: 1.15rem; font-weight: 800; text-transform: uppercase; margin: 0 0 0.5rem 0; line-height: 1.25;">
                            Origine & Principe Planographique
                        </h3>
                        <p style="font-size: 0.85rem; color: #555; line-height: 1.4; margin: 0;">
                            Aloys Senefelder (1796), calcaire de Solnhofen, réaction chimique eau/encre, zones imprimantes & non-imprimantes.
                        </p>
                    </div>
                </div>

                <!-- Axe 2 -->
                <div class="sommaire-card" style="background: white; border: 2px solid var(--color-dark); padding: 1.4rem; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between; min-height: 170px;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                            <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.2rem 0.5rem; border-radius: 2px;">PARTIE 02</span>
                            <span style="font-size: 1.2rem; font-weight: 900; color: var(--color-dark); opacity: 0.25;">02</span>
                        </div>
                        <h3 style="font-size: 1.15rem; font-weight: 800; text-transform: uppercase; margin: 0 0 0.5rem 0; line-height: 1.25;">
                            Supports Conventionnels
                        </h3>
                        <p style="font-size: 0.85rem; color: #555; line-height: 1.4; margin: 0;">
                            Plaques monométalliques (Aluminium), bimétalliques (Chrome/Laiton), trimétalliques et quadrimétalliques (1-2 millions).
                        </p>
                    </div>
                </div>

                <!-- Axe 3 -->
                <div class="sommaire-card" style="background: white; border: 2px solid var(--color-dark); padding: 1.4rem; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between; min-height: 170px;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                            <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.2rem 0.5rem; border-radius: 2px;">PARTIE 03</span>
                            <span style="font-size: 1.2rem; font-weight: 900; color: var(--color-dark); opacity: 0.25;">03</span>
                        </div>
                        <h3 style="font-size: 1.15rem; font-weight: 800; text-transform: uppercase; margin: 0 0 0.5rem 0; line-height: 1.25;">
                            Traitement & Grainage
                        </h3>
                        <p style="font-size: 0.85rem; color: #555; line-height: 1.4; margin: 0;">
                            Rôle de la rugosité, lois de mouillabilité, grainage mécanique par brossage oscillant et chimique à la poudre de ponce.
                        </p>
                    </div>
                </div>

                <!-- Axe 4 -->
                <div class="sommaire-card" style="background: white; border: 2px solid var(--color-dark); padding: 1.4rem; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between; min-height: 170px;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                            <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.2rem 0.5rem; border-radius: 2px;">PARTIE 04</span>
                            <span style="font-size: 1.2rem; font-weight: 900; color: var(--color-dark); opacity: 0.25;">04</span>
                        </div>
                        <h3 style="font-size: 1.15rem; font-weight: 800; text-transform: uppercase; margin: 0 0 0.5rem 0; line-height: 1.25;">
                            Électrolyse & Anodisation
                        </h3>
                        <p style="font-size: 0.85rem; color: #555; line-height: 1.4; margin: 0;">
                            Électrograinage en bain acide (trames 300 lpi), barrière d'alumine protectrice (Al₂O₃) et plaques litho chromées.
                        </p>
                    </div>
                </div>

                <!-- Axe 5 -->
                <div class="sommaire-card" style="background: white; border: 2px solid var(--color-dark); padding: 1.4rem; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between; min-height: 170px;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                            <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.2rem 0.5rem; border-radius: 2px;">PARTIE 05</span>
                            <span style="font-size: 1.2rem; font-weight: 900; color: var(--color-dark); opacity: 0.25;">05</span>
                        </div>
                        <h3 style="font-size: 1.15rem; font-weight: 800; text-transform: uppercase; margin: 0 0 0.5rem 0; line-height: 1.25;">
                            Couches Photosensibles
                        </h3>
                        <p style="font-size: 0.85rem; color: #555; line-height: 1.4; margin: 0;">
                            Photochimie diazoïque (procédé positif, libération N₂), réticulation photopolymère (procédé négatif pour rotatives).
                        </p>
                    </div>
                </div>

                <!-- Axe 6 -->
                <div class="sommaire-card" style="background: white; border: 2px solid var(--color-dark); padding: 1.4rem; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between; min-height: 170px;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                            <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.2rem 0.5rem; border-radius: 2px;">PARTIE 06</span>
                            <span style="font-size: 1.2rem; font-weight: 900; color: var(--color-dark); opacity: 0.25;">06</span>
                        </div>
                        <h3 style="font-size: 1.15rem; font-weight: 800; text-transform: uppercase; margin: 0 0 0.5rem 0; line-height: 1.25;">
                            Typologie & Sélection
                        </h3>
                        <p style="font-size: 0.85rem; color: #555; line-height: 1.4; margin: 0;">
                            Plaques positives (80% labeur) vs plaques négatives (presse/rotatives), et grille des 9 paramètres objectifs de sélection.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

<!-- ========================================================================== -->
<!-- SLIDE 03 : 1.1 GENÈSE HISTORIQUE (ALOYS SENEFELDER 1796)                 -->
<!-- ========================================================================== -->
<section class="slide" id="slide-03">
    <div class="grid grid-split-left bg-light">
        <!-- Left Content -->
        <div class="slide-content" style="padding-right: 3rem;">
            <span class="presenter-tag" style="background: var(--color-accent); color: white;">
                Partie 1 &bull; Origine & Principe
            </span>
            <h2 class="slide-title" style="margin-bottom: 1.5rem; line-height: 1.1;">
                Genèse Historique : La Lithographie
            </h2>
            <p class="subtitle" style="font-size: 1.25rem; margin-top: 0; margin-bottom: 2rem; color: var(--color-dark); font-weight: 700;">
                Aloys Senefelder & Le Calcaire de Solnhofen (1796)
            </p>

            <ul class="bullet-list" style="font-size: 1.15rem;">
                <li>
                    <strong>Découverte Fortuite (Munich, 1796) :</strong> Aloys Senefelder expérimente l'impression sur pierre calcaire bavaroise à Solnhofen, posant les fondations de l'impression planographique moderne.
                </li>
                <li>
                    <strong>Substrat Calcaire Poreux :</strong> Pierre calcaire jurassique particulièrement pure, dotée d'une structure microporeuse capable d'absorber et de retenir naturellement l'eau liquide.
                </li>
                <li>
                    <strong>Rupture Technologique Majeure :</strong> Abandon des formes imprimantes en relief (typographie) et en creux (taille-douce) au profit d'un équilibre physico-chimique sur surface rigoureusement plane.
                </li>
                <li>
                    <strong>Le Processus Originel :</strong> Rédaction inversée à l'encre grasse saponifiée, mouillage de la pierre nue, puis passage du rouleau d'encre grasse repoussée par les zones humides.
                </li>
            </ul>
        </div>

        <!-- Right Visual: Senefelder Portrait (SCH-01) -->
        <div class="slide-visual" style="background: white; border-left: 3px solid var(--color-dark); padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div class="plate-img-box" style="width: 320px; height: 420px; border: 3px solid var(--color-dark); border-radius: 4px; box-shadow: 0 15px 35px rgba(0,0,0,0.12); margin-bottom: 1.5rem;">
                <img src="assets/senefelder.jpg" alt="Portrait d'Aloys Senefelder (1771-1834)" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;">
                <div class="plate-fallback">
                    <span style="font-size: 2.5rem;">📜</span>
                    <strong style="font-size: 1.1rem; margin-top: 0.5rem;">Aloys Senefelder (1771–1834)</strong>
                    <small>assets/senefelder.jpg</small>
                </div>
            </div>
            <div style="text-align: center; max-width: 340px;">
                <div style="font-size: 1.25rem; font-weight: 900; text-transform: uppercase; color: var(--color-dark);">
                    Aloys Senefelder
                </div>
                <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-accent); margin-top: 0.2rem;">
                    Inventeur de la Lithographie (1796)
                </div>
                <p style="font-size: 0.8rem; color: #666; margin-top: 0.5rem; line-height: 1.35;">
                    Substrat originel : Pierre calcaire de Solnhofen (Bavière). Ancêtre direct du support offset contemporain.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- ========================================================================== -->
<!-- SLIDE 04 : 1.2 RÉACTION CHIMIQUE PIERRE (SEL HYDROPHILE, SCH-02)          -->
<!-- ========================================================================== -->
<section class="slide" id="slide-04">
    <div class="grid grid-title bg-light">
        <!-- Left Content -->
        <div class="slide-content">
            <span class="presenter-tag" style="background: var(--color-accent); color: white;">
                Partie 1 &bull; Fondements Chimiques
            </span>
            <h2 class="slide-title" style="margin-bottom: 1.5rem; line-height: 1.1;">
                Réaction Chimique de la Pierre
            </h2>
            <p class="subtitle" style="font-size: 1.25rem; margin-top: 0; margin-bottom: 2rem; color: var(--color-dark); font-weight: 700;">
                Gomme Arabique, Acide Nitrique & Sel Hydrophile
            </p>

            <ul class="bullet-list" style="font-size: 1.15rem;">
                <li>
                    <strong>Substrat Minéral ($CaCO_3$) :</strong> La pierre est composée de carbonate de calcium poreux qui réagit vigoureusement avec les réactifs acides.
                </li>
                <li>
                    <strong>Action de l'Acide Nitrique ($HNO_3$) & Gomme :</strong> L'application d'un mélange d'acide nitrique dilué et de gomme arabique pénètre profondément dans les micropores de surface.
                </li>
                <li>
                    <strong>Formation du Sel Hydrophile :</strong> La réaction chimique donne naissance à de l'arabate de calcium, un sel stable hautement hygroscopique créant les <em>zones non-imprimantes</em> (blancs).
                </li>
                <li>
                    <strong>Fixation Lipophile de l'Encre Grasse :</strong> Dans les zones dessinées, les acides gras de l'encre pénètrent les pores non mouillés pour former un oléomargarate de calcium insoluble, fixant définitivement les <em>zones imprimantes</em>.
                </li>
            </ul>
        </div>

        <!-- Right Visual: Schematic Reaction Pierre (SCH-02) -->
        <div class="slide-visual" style="background: white; border-left: 3px solid var(--color-dark); padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div class="plate-img-box" style="width: 100%; max-width: 440px; height: 320px; border: 2px dashed rgba(10, 10, 10, 0.3); border-radius: 4px; margin-bottom: 1.5rem;">
                <img src="assets/schematic_reaction_pierre.svg" alt="Schéma Réaction Chimique de la Pierre Calcaire" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; object-fit: contain;">
                <div class="plate-fallback">
                    <span style="font-size: 2.5rem;">🧪</span>
                    <strong style="font-size: 1.1rem; margin-top: 0.5rem;">Coupe Micro-Structure Calcaire</strong>
                    <small>assets/schematic_reaction_pierre.svg</small>
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
    </div>
</section>

<!-- ========================================================================== -->
<!-- SLIDE 05 : 1.3 ÉVOLUTION MÉTALLIQUE (PIERRE -> ZINC -> ALUMINIUM)          -->
<!-- ========================================================================== -->
<section class="slide" id="slide-05">
    <div class="grid grid-vertical bg-light">
        <!-- Header -->
        <div class="slide-header" style="display: flex; justify-content: space-between; align-items: flex-end; padding: 2rem 5vw 1.2rem 5vw;">
            <div>
                <span class="presenter-tag" style="background: var(--color-accent); color: white; margin-bottom: 0.5rem;">
                    Partie 1 &bull; Évolution des Matériaux
                </span>
                <h2 class="slide-title" style="margin: 0; font-size: 2.8vw; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em;">
                    L'Évolution Métallique du Support
                </h2>
            </div>
            <div style="text-align: right;">
                <span style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-accent);">
                    Chronologie Industrielle
                </span>
                <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-dark); margin-top: 0.2rem;">
                    1796 &bull; 1860 &bull; Ère Moderne
                </div>
            </div>
        </div>

        <!-- 3 Columns Horizontal Comparison -->
        <div class="slide-body" style="padding: 2rem 5vw 4rem 5vw; flex: 1; display: flex; align-items: center;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; width: 100%;">
                
                <!-- 1. Pierre Calcaire -->
                <div style="background: white; border: 2px solid var(--color-dark); border-radius: 4px; padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: inline-block; font-size: 0.8rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.25rem 0.6rem; border-radius: 2px; margin-bottom: 1rem;">
                            1796 &bull; SUBSTRAT ORIGINEL
                        </div>
                        <h3 style="font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin: 0 0 1rem 0; color: var(--color-dark);">
                            Pierre Calcaire (Solnhofen)
                        </h3>
                        <ul class="bullet-list" style="font-size: 0.95rem; line-height: 1.45;">
                            <li><strong>Atout :</strong> Microporosité naturelle parfaite, rétention d'eau sans égal.</li>
                            <li><strong>Poids :</strong> Blocs massifs de 20 à 80 kg très contraignants en atelier.</li>
                            <li><strong>Limite Critique :</strong> Rupture fragile sous pression, impossible à courber sur cylindre rotatif.</li>
                        </ul>
                    </div>
                    <div style="margin-top: 1.5rem; padding-top: 0.8rem; border-top: 1px solid #ddd; font-size: 0.8rem; color: #777;">
                        Utilisation : Presses manuelles plates & estampes d'art.
                    </div>
                </div>

                <!-- 2. Zinc Monométallique -->
                <div style="background: white; border: 2px solid var(--color-dark); border-radius: 4px; padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between;">
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

                <!-- 3. Aluminium Moderne -->
                <div style="background: white; border: 3px solid var(--color-accent); border-radius: 4px; padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(227, 38, 25, 0.08);">
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
    </div>
</section>

<!-- ========================================================================== -->
<!-- SLIDE 06 : 1.4 PRINCIPE PLANOGRAPHIQUE (ANTAGONISME EAU/GRAS, SCH-03)     -->
<!-- ========================================================================== -->
<section class="slide" id="slide-06">
    <div class="grid grid-title bg-light">
        <!-- Left Content -->
        <div class="slide-content">
            <span class="presenter-tag" style="background: var(--color-accent); color: white;">
                Partie 1 &bull; Physique du Procédé
            </span>
            <h2 class="slide-title" style="margin-bottom: 1.5rem; line-height: 1.1;">
                Le Principe Planographique
            </h2>
            <p class="subtitle" style="font-size: 1.25rem; margin-top: 0; margin-bottom: 2rem; color: var(--color-dark); font-weight: 700;">
                Coexistence Antagoniste Eau / Corps Gras sur Surface Plane
            </p>

            <ul class="bullet-list" style="font-size: 1.15rem;">
                <li>
                    <strong>Planéité Rigoureuse :</strong> Absence totale de creux ou de relief. La sélection de l'encre dépend uniquement des affinités chimiques de surface.
                </li>
                <li>
                    <strong>Zone Imprimante (Graphismes) :</strong> État <em>oléophile</em> (lipophile) et <em>hydrophobe</em>. Accepte l'encre grasse et repousse énergiquement l'eau de mouillage.
                </li>
                <li>
                    <strong>Zone Non-Imprimante (Blancs / Fond) :</strong> État <em>hydrophile</em> et <em>lipophobe</em> (oléophobe). Retient un film d'eau ultra-mince et repousse catégoriquement l'encre grasse.
                </li>
                <li>
                    <strong>L'Équilibre Eau / Encre :</strong>
                    <br>&bull; <em>Manque d'eau :</em> Graissage immédiat des blancs (salissure de la feuille).
                    <br>&bull; <em>Excès d'eau :</em> Émulsion de l'encre (affadissement, perte de densité, séchage entravé).
                </li>
            </ul>
        </div>

        <!-- Right Visual: Schematic Principe Planographique (SCH-03) -->
        <div class="slide-visual" style="background: white; border-left: 3px solid var(--color-dark); padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div class="plate-img-box" style="width: 100%; max-width: 440px; height: 320px; border: 2px dashed rgba(10, 10, 10, 0.3); border-radius: 4px; margin-bottom: 1.5rem;">
                <img src="assets/schematic_principe_planographique.svg" alt="Schéma Coupe Transversale du Principe Planographique" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; object-fit: contain;">
                <div class="plate-fallback">
                    <span style="font-size: 2.5rem;">⚖️</span>
                    <strong style="font-size: 1.1rem; margin-top: 0.5rem;">Antagonisme Eau / Corps Gras</strong>
                    <small>assets/schematic_principe_planographique.svg</small>
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
    </div>
</section>
```

---

## 5. Intégration CSS & Tokens Brutalistes

Pour garantir le fonctionnement pérenne des conteneurs de schémas et de la mise en page sans dépendre de balises `<style>` locales dans les slides, les classes suivantes doivent être assurées dans `style.css` :

```css
/* ========================================================================== */
/* STANDARDIZED SCHEMATIC & IMAGE CONTAINERS                                  */
/* ========================================================================== */
.plate-img-box {
    width: 100%;
    height: 240px;
    border: 2px dashed rgba(10, 10, 10, 0.25);
    border-radius: 4px;
    background: var(--color-light);
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.plate-img-box img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}

.plate-fallback {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.2rem;
    gap: 0.4rem;
}

.plate-fallback strong {
    font-size: 1rem;
    font-weight: 800;
    color: var(--color-dark);
}

.plate-fallback small {
    font-size: 0.78rem;
    color: #666;
    font-family: monospace;
}

/* Sommaire Cards Interactive Polish */
.sommaire-card {
    transition: transform var(--t-short) var(--ease-kinetic), border-color var(--t-short) ease, box-shadow var(--t-short) ease;
}

.sommaire-card:hover {
    transform: translateY(-4px);
    border-color: var(--color-accent) !important;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}
```

---

## 6. Audit & Conformité "Zéro Méta-Libellés"

| Élément / Emplacement | Ancien Libellé Banni | Libellé Conforme M1 | Règle Validée |
|---|---|---|---|
| Titre de fenêtre (`main.js:35`) | `Concept : Identité Numérique` | `Production des Formes Imprimantes — Les Plaques Offset` | R2 & R3 |
| En-tête Slide 01 | `Module : INFO208` / `Mme Batioui` | `Module : Production des Formes Imprimantes` | Zéro Méta |
| Slide 02 (Sommaire) | `Personne 1 à 6` / `Pages 19 à 22` | `Sommaire Général — 6 Piliers Technologiques` | Zéro Méta |
| Slide 03 (Genèse) | `Personne 1 : Origine et Principe Page 19` | `1.1 Genèse Historique : La Lithographie` | Zéro Méta |
| Slide 04 (Réaction) | `Slide pour Personne 1` | `1.2 Réaction Chimique de la Pierre` | Zéro Méta |
| Slide 05 (Évolution) | `Page 19 : Supports` | `1.3 L'Évolution Métallique du Support` | Zéro Méta |
| Slide 06 (Principe) | `Personne 1 (Suite)` | `1.4 Le Principe Planographique` | Zéro Méta |

---

## 7. Directives pour l'Implémentateur M1

1. **Supprimer de `index.html`** les balises `<script type="module" src="...model-viewer.min.js">`, le filtre SVG `#iceberg-silhouette`, et l'intégralité des sections `#slide-2`, `#slide-3`, `#slide-4`, `#slide-5`, `#slide-6`.
2. **Insérer les sections `slide-01` à `slide-06`** dans `<main class="presentation-container">` exactement selon le balisage de la section 4.
3. **Mettre à jour `main.js`** ligne 35 avec le titre officiel.
4. **Mettre à jour l'odomètre dans `index.html`** pour refléter la navigation courante (ou préparer les pas 01 à 22 selon la stratégie retenue pour le deck complet).
5. **Vérifier** qu'aucun avertissement console ou erreur 404 ne bloque le chargement de l'application.
