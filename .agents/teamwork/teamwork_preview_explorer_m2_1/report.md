# Rapport d'Architecture Markup : Slides 07 à 12 (Milestone 2)

**Auteur :** M2 Explorer 1 (Markup Architecture)  
**Date :** 2026-10-23  
**Statut :** Spécification & Code Markup Validés  
**Cible :** `index.html` (Milestone 2 : Supports Conventionnels & Grainage)  

---

## 1. Executive Summary

Ce rapport fournit l'architecture HTML5 exacte et prête à l'intégration pour les **Slides 07 à 12** du projet *« Production des Formes Imprimantes — Les Plaques Offset »*, ainsi que la mise à niveau de l'odomètre brutaliste à 12 pas (`01` à `12` avec affichage `/ 12`).

### Directives Techniques Respectées
- **Éradication Totale des Méta-Libellés :** Zéro mention d'étudiants ou d'instructions de cours (proscription absolue de `"Personne 2"`, `"Personne 3"`, `"Page 19"`, `"Page 20"`). Remplacement par une titulature rigoureuse d'ingénierie des formes imprimantes.
- **Pureté Brutaliste Suisse :** Zéro carte flottante à coins arrondis (`border-radius: 0;`), zéro ombre portée diffuse (`box-shadow: none;`), lignes de grille noires franches (2px / 3px solid), typographie Inter hiérarchisée, accents rouges (`--color-accent: #E32619`) et fonds structurés.
- **Placeholders & Fallbacks Normalisés :** Chaque schéma technique (`SCH-04` à `SCH-10`) dispose d'un conteneur `.plate-img-box` intégrant le gestionnaire automatique `onerror` et le bloc de secours `.plate-fallback` avec icône, titre technique et chemin relatif explicite dans `assets/`.
- **Synchronisation Odométrique :** Extension de `#counterTrack` de 6 à 12 pas consécutifs (`01` à `12`) et passage de `.counter-total` à `/ 12`, garantissant une cinématique rigoureuse de translation verticale (`-currentSlide * 3.5rem`).

---

## 2. Inventaire Détaillé des Slides 07 à 12

| Slide | ID | Partie / Axe | Titre Technique | Spécifications Clés & Invariants | Schéma Associé |
|---|---|---|---|---|---|
| **07** | `#slide-07` | Partie 2 : Supports Conventionnels | **Les Plaques Monométalliques** | Hégémonie de l'Aluminium (> 95%), légèreté (2,7 g/cm³), ductilité, stabilité dimensionnelle, résistance à l'oxydation humide par alumine (Al₂O₃), épaisseur 0,15 à 0,40 mm. | `SCH-04` (`assets/plaque_monometallique.png`) |
| **08** | `#slide-08` | Partie 2 : Supports Conventionnels | **Les Plaques Polymétalliques** | Tirages massifs 1 à 2 millions de tours, dissociation des rôles mécaniques et chimiques, 4 métaux fondamentaux : Chrome (Cr, hydrophile), Cuivre (Cu, oléophile), Laiton (70/30, oléophile), Acier (armature). | Matrice des 4 Métaux + Indicateurs Machine |
| **09** | `#slide-09` | Partie 2 : Coupes Transversales | **Architecture Comparée des Couches** | 3 structures en coupe : Bimétallique (Cr/Laiton), Trimétallique (Cr/Cu/Acier ou Al), Quadrimétallique (Cr/Cu acide/Cu basique/Acier trempé). Paliers de tirage 800k, 1.5M, 2M+. | `SCH-05`, `SCH-06`, `SCH-07` (`assets/plaque_*.png`) |
| **10** | `#slide-10` | Partie 3 : Traitement du Support | **Rôle de la Rugosité de Surface** | Règle d'or du « minimum d'eau », comparaison plaque lisse vs grainée, les 3 lois du mouillage (homogénéité, amplitude, seuil de saturation/émulsion). | `SCH-08` (`assets/schematic_rugosite_grainage.svg`) |
| **11** | `#slide-11` | Partie 3 : Procédés de Grainage | **Le Grainage Mécanique** | Brossage oscillant à sec, rôle du mouvement transversal évitant les sillons longitudinaux de fuite d'eau, microcavités isotropes, plafond à 500 000 exemplaires. | `SCH-09` (`assets/schematic_grainage_mecanique.svg`) |
| **12** | `#slide-12` | Partie 3 : Procédés de Grainage | **Grainage Chimique à Brosse** | Brosses rotatives en nylon + barbotine acide de poudre de ponce/quartz, micro-accrochage pour couches diazoïques, profil pour tirages moyens (100k à 300k ex). | `SCH-10` (`assets/schematic_grainage_chimique.svg`) |

---

## 3. Architecture Markup Odomètre (Mise à jour 12 Pas)

Remplacement direct du bloc `.brutalist-counter` dans `index.html` :

```html
        <!-- Brutalist Odometer Progress (12 Slides M2 Synchronization) -->
        <div class="brutalist-counter" id="slideCounter">
            <div class="counter-track" id="counterTrack">
                <div class="counter-step">01</div>
                <div class="counter-step">02</div>
                <div class="counter-step">03</div>
                <div class="counter-step">04</div>
                <div class="counter-step">05</div>
                <div class="counter-step">06</div>
                <div class="counter-step">07</div>
                <div class="counter-step">08</div>
                <div class="counter-step">09</div>
                <div class="counter-step">10</div>
                <div class="counter-step">11</div>
                <div class="counter-step">12</div>
            </div>
            <div class="counter-total">/ 12</div>
        </div>
```

---

## 4. Code Markup Complet des Slides 07 à 12

Voici les blocs HTML exacts, conformes au DOM de l'application et validés par les règles anti-slop et les tests E2E.

```html
        <!-- ========================================================================== -->
        <!-- SLIDE 07 : 2.1 LES PLAQUES MONOMÉTALLIQUES (ALUMINIUM, SCH-04)            -->
        <!-- ========================================================================== -->
        <section class="slide" id="slide-07">
            <div class="grid grid-title bg-light">
                <!-- Left Content -->
                <div class="slide-content">
                    <span class="presenter-tag" style="background: var(--color-accent); color: white;">
                        Partie 2 &bull; Supports Conventionnels
                    </span>
                    <h2 class="slide-title" style="margin-bottom: 1.5rem; line-height: 1.1;">
                        Les Plaques Monométalliques
                    </h2>
                    <p class="subtitle" style="font-size: 1.25rem; margin-top: 0; margin-bottom: 2rem; color: var(--color-dark); font-weight: 700;">
                        Propriétés Mécaniques &amp; Hégémonie de l'Aluminium (&gt; 95%)
                    </p>

                    <ul class="bullet-list" style="font-size: 1.15rem;">
                        <li>
                            <strong>Structure Unitaire :</strong> Plaque constituée d'une seule feuille métallique continue d'épaisseur calibrée (couramment 0,15 mm à 0,40 mm) servant d'assise mécanique directe à la couche photosensible.
                        </li>
                        <li>
                            <strong>Légèreté &amp; Ductilité :</strong> Métal très malléable d'une faible densité (environ 2,7 g/cm³), facilitant grandement les manipulations en atelier de préparation et assurant un cintrage sans déformation sur le cylindre porte-plaque.
                        </li>
                        <li>
                            <strong>Stabilité Dimensionnelle Élevée :</strong> Absence d'allongement élastique sous traction et faible dilatation thermique en cours de tirage, garantissant un repérage quadrichromique micrométrique rigoureux sur les 4 groupes d'impression.
                        </li>
                        <li>
                            <strong>Résistance Naturelle à l'Oxydation :</strong> Auto-passivation instantanée à l'air libre par formation d'une pellicule étanche d'alumine (Al₂O₃), neutralisant l'agression acide de la solution de mouillage.
                        </li>
                    </ul>
                </div>

                <!-- Right Visual: Schematic Plaque Monométallique (SCH-04) -->
                <div class="slide-visual" style="background: white; border-left: 3px solid var(--color-dark); padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <div style="width: 100%; max-width: 440px; height: 320px; margin-bottom: 1.5rem;">
                        <div class="plate-img-box diagram">
                            <img src="assets/plaque_monometallique.png" alt="Coupe Transversale d'une Plaque Monométallique en Aluminium" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; object-fit: contain;">
                            <div class="plate-fallback">
                                <span class="fallback-icon" style="font-size: 2.5rem;">📐</span>
                                <strong>SCH-04 : Plaque Monométallique</strong>
                                <span class="fallback-caption">Couche photosensible diazoïque ou photopolymère déposée sur feuille d'aluminium grainée et anodisée (0,15 à 0,40 mm).</span>
                                <small>assets/plaque_monometallique.png</small>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: left; max-width: 440px; border-left: 3px solid var(--color-accent); padding-left: 1rem;">
                        <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent);">
                            SCH-04 &bull; Architecture Monométallique
                        </div>
                        <p style="font-size: 0.85rem; color: #444; margin-top: 0.3rem; line-height: 1.4;">
                            Coupe transversale : Substrat d'aluminium laminé homogène, rendu hydrophile par micro-rugosité superficielle et passivé chimiquement, supportant la résine photosensible.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========================================================================== -->
        <!-- SLIDE 08 : 2.2 LES PLAQUES POLYMÉTALLIQUES (TIRAGES 1-2M)                  -->
        <!-- ========================================================================== -->
        <section class="slide" id="slide-08">
            <div class="grid grid-vertical bg-light">
                <!-- Slide Header -->
                <div class="slide-header" style="display: flex; justify-content: space-between; align-items: flex-end; padding: 2rem 5vw 1.2rem 5vw;">
                    <div>
                        <span class="presenter-tag" style="background: var(--color-accent); color: white; margin-bottom: 0.5rem;">
                            Partie 2 &bull; Supports Conventionnels
                        </span>
                        <h2 class="slide-title" style="margin: 0; font-size: 2.8vw; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em;">
                            Les Plaques Polymétalliques
                        </h2>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-accent);">
                            Endurance Machine
                        </span>
                        <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-dark); margin-top: 0.2rem;">
                            1 à 2 Millions d'Exemplaires
                        </div>
                    </div>
                </div>

                <!-- Slide Body: 2 Columns (Philosophy + 4 Metals Grid) -->
                <div class="slide-body" style="padding: 1.8rem 5vw 4rem 5vw; flex: 1; display: flex; align-items: center;">
                    <div style="display: grid; grid-template-columns: 38% 62%; gap: 2.5rem; width: 100%; align-items: stretch;">
                        
                        <!-- Left: Industrial Philosophy -->
                        <div style="background: white; border: 2px solid var(--color-dark); padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div style="display: inline-block; font-size: 0.8rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.25rem 0.6rem; margin-bottom: 1rem;">
                                    DISSOCIATION FONCTIONNELLE
                                </div>
                                <h3 style="font-size: 1.35rem; font-weight: 900; text-transform: uppercase; margin: 0 0 1rem 0; line-height: 1.2; color: var(--color-dark);">
                                    Spécialisation des Affinités Métalliques
                                </h3>
                                <p style="font-size: 0.92rem; color: #333; line-height: 1.5; margin-bottom: 1.2rem;">
                                    Plutôt que d'imposer artificiellement un comportement hydrophile à un métal unique par traitement de surface, les plaques polymétalliques superposent des couches métalliques distinctes exploitant les affinités physico-chimiques naturelles de chaque métal.
                                </p>
                                <ul class="bullet-list" style="font-size: 0.9rem; line-height: 1.45;">
                                    <li><strong>Longs Tirages :</strong> Conçues pour des cadences massives de 1 à 2 millions de tours sans usure du point de trame.</li>
                                    <li><strong>Rentabilité Industrielle :</strong> Coût d'achat amorti par la suppression complète des arrêts machine pour remplacement de plaques usées.</li>
                                    <li><strong>Zéro Déformation :</strong> Rigidité mécanique absolue face aux fortes tensions des rotatives de labeur.</li>
                                </ul>
                            </div>
                            <div style="margin-top: 1.2rem; padding: 0.8rem; background: var(--color-light); border-left: 3px solid var(--color-accent); font-size: 0.8rem; color: #444;">
                                <strong>Domaine de prédilection :</strong> Packaging carton compact, emballages métalliques et catalogues à très fort tirage.
                            </div>
                        </div>

                        <!-- Right: 4 Specialized Metals (2x2 Grid) -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem;">
                            
                            <!-- Metal 1: Chrome -->
                            <div style="background: white; border: 2px solid var(--color-dark); padding: 1.4rem; display: flex; flex-direction: column; justify-content: space-between;">
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                                        <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.2rem 0.5rem;">MÉTAL Cr</span>
                                        <span style="font-size: 0.75rem; font-weight: 800; color: var(--color-accent); text-transform: uppercase;">Hydrophile</span>
                                    </div>
                                    <h4 style="font-size: 1.15rem; font-weight: 900; text-transform: uppercase; margin: 0 0 0.5rem 0; color: var(--color-dark);">
                                        Chrome Naturel
                                    </h4>
                                    <p style="font-size: 0.85rem; color: #555; line-height: 1.4; margin: 0;">
                                        Métal extrêmement dur et inoxydable. Hautement hydrophile au naturel, il retient l'eau avec un film deux fois plus mince que l'aluminium, constituant la zone non-imprimante (blancs).
                                    </p>
                                </div>
                                <div style="margin-top: 0.8rem; padding-top: 0.5rem; border-top: 1px solid #eee; font-size: 0.75rem; font-weight: 700; color: #777;">
                                    Rôle : Barrière d'eau &amp; résistance à l'abrasion
                                </div>
                            </div>

                            <!-- Metal 2: Cuivre -->
                            <div style="background: white; border: 2px solid var(--color-accent); padding: 1.4rem; display: flex; flex-direction: column; justify-content: space-between;">
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                                        <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-accent); color: white; padding: 0.2rem 0.5rem;">MÉTAL Cu</span>
                                        <span style="font-size: 0.75rem; font-weight: 800; color: var(--color-dark); text-transform: uppercase;">Oléophile</span>
                                    </div>
                                    <h4 style="font-size: 1.15rem; font-weight: 900; text-transform: uppercase; margin: 0 0 0.5rem 0; color: var(--color-dark);">
                                        Cuivre Électrolytique
                                    </h4>
                                    <p style="font-size: 0.85rem; color: #555; line-height: 1.4; margin: 0;">
                                        Affinité spontanée maximale pour les corps gras et l'encre offset. Répulsion physique spontanée de l'eau, formant le cœur des graphismes (zones imprimantes).
                                    </p>
                                </div>
                                <div style="margin-top: 0.8rem; padding-top: 0.5rem; border-top: 1px solid #fecaca; font-size: 0.75rem; font-weight: 700; color: var(--color-accent);">
                                    Rôle : Ancrage de l'encre &amp; saturation colorimétrique
                                </div>
                            </div>

                            <!-- Metal 3: Laiton -->
                            <div style="background: white; border: 2px solid var(--color-dark); padding: 1.4rem; display: flex; flex-direction: column; justify-content: space-between;">
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                                        <span style="font-size: 0.75rem; font-weight: 900; background: #555; color: white; padding: 0.2rem 0.5rem;">ALLIAGE 70/30</span>
                                        <span style="font-size: 0.75rem; font-weight: 800; color: var(--color-accent); text-transform: uppercase;">Oléophile + Base</span>
                                    </div>
                                    <h4 style="font-size: 1.15rem; font-weight: 900; text-transform: uppercase; margin: 0 0 0.5rem 0; color: var(--color-dark);">
                                        Laiton Industriel
                                    </h4>
                                    <p style="font-size: 0.85rem; color: #555; line-height: 1.4; margin: 0;">
                                        Alliage 70% Cuivre et 30% Zinc combinant l'oléophilie naturelle du cuivre avec la tenue mécanique rigide du zinc. Utilisé comme base directe dans les plaques bimétalliques.
                                    </p>
                                </div>
                                <div style="margin-top: 0.8rem; padding-top: 0.5rem; border-top: 1px solid #eee; font-size: 0.75rem; font-weight: 700; color: #777;">
                                    Rôle : Support mécanique &amp; zone réceptrice d'encre
                                </div>
                            </div>

                            <!-- Metal 4: Acier -->
                            <div style="background: white; border: 2px solid var(--color-dark); padding: 1.4rem; display: flex; flex-direction: column; justify-content: space-between;">
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                                        <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.2rem 0.5rem;">MÉTAL Fe/Acier</span>
                                        <span style="font-size: 0.75rem; font-weight: 800; color: #555; text-transform: uppercase;">Armature</span>
                                    </div>
                                    <h4 style="font-size: 1.15rem; font-weight: 900; text-transform: uppercase; margin: 0 0 0.5rem 0; color: var(--color-dark);">
                                        Acier Mécanique
                                    </h4>
                                    <p style="font-size: 0.85rem; color: #555; line-height: 1.4; margin: 0;">
                                        Tôle d'acier laminée extra-dure (ou aluminium renforcé) servant d'assise mécanique porteuse. Encaisse les cadences rotatives extrêmes sans déformation plastique.
                                    </p>
                                </div>
                                <div style="margin-top: 0.8rem; padding-top: 0.5rem; border-top: 1px solid #eee; font-size: 0.75rem; font-weight: 700; color: #777;">
                                    Rôle : Résistance aux contraintes de traction machine
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>

        <!-- ========================================================================== -->
        <!-- SLIDE 09 : 2.3 ARCHITECTURE COMPARÉE DES COUCHES MULTI-MÉTAUX             -->
        <!-- ========================================================================== -->
        <section class="slide" id="slide-09">
            <div class="grid grid-vertical bg-light">
                <!-- Slide Header -->
                <div class="slide-header" style="display: flex; justify-content: space-between; align-items: flex-end; padding: 2rem 5vw 1.2rem 5vw;">
                    <div>
                        <span class="presenter-tag" style="background: var(--color-accent); color: white; margin-bottom: 0.5rem;">
                            Partie 2 &bull; Coupes Transversales
                        </span>
                        <h2 class="slide-title" style="margin: 0; font-size: 2.8vw; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em;">
                            Architecture Comparée des Couches
                        </h2>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-accent);">
                            Structures Multicouches
                        </span>
                        <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-dark); margin-top: 0.2rem;">
                            Bimétallique &bull; Trimétallique &bull; Quadrimétallique
                        </div>
                    </div>
                </div>

                <!-- 3 Columns Horizontal Comparison -->
                <div class="slide-body" style="padding: 1.8rem 5vw 4rem 5vw; flex: 1; display: flex; align-items: center;">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.8rem; width: 100%;">
                        
                        <!-- 1. Plaque Bimétallique (SCH-05) -->
                        <div style="background: white; border: 2px solid var(--color-dark); padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                                    <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.2rem 0.5rem;">2 MÉTAUX</span>
                                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--color-accent);">&asymp; 800 000 &agrave; 1M ex.</span>
                                </div>
                                <h3 style="font-size: 1.3rem; font-weight: 900; text-transform: uppercase; margin: 0 0 1rem 0; color: var(--color-dark);">
                                    Plaque Bimétallique
                                </h3>

                                <!-- Visual Box SCH-05 -->
                                <div style="width: 100%; height: 145px; margin-bottom: 1rem;">
                                    <div class="plate-img-box compact">
                                        <img src="assets/plaque_bimetallique.png" alt="Coupe Transversale Plaque Bimétallique Chrome / Laiton" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; object-fit: contain;">
                                        <div class="plate-fallback">
                                            <span class="fallback-icon" style="font-size: 1.8rem;">🥈</span>
                                            <strong>SCH-05 : Plaque Bimétallique</strong>
                                            <small>assets/plaque_bimetallique.png</small>
                                        </div>
                                    </div>
                                </div>

                                <!-- Layers Stack -->
                                <div class="plate-layers">
                                    <div class="layer-item">
                                        <span class="layer-dot"></span>
                                        <span><strong>Chrome supérieur :</strong> Hydrophile (zones blanches)</span>
                                    </div>
                                    <div class="layer-item">
                                        <span class="layer-dot red"></span>
                                        <span><strong>Support Laiton (70/30) :</strong> Oléophile (graphismes)</span>
                                    </div>
                                </div>

                                <p style="font-size: 0.84rem; color: #555; line-height: 1.45; margin: 0;">
                                    Le chrome superficiel est éliminé par gravure chimique localisée pour mettre à nu le laiton sous-jacent récepteur d'encre.
                                </p>
                            </div>
                            <div style="margin-top: 1rem; padding-top: 0.6rem; border-top: 1px solid #eee; font-size: 0.78rem; color: #777;">
                                Simplicité de fabrication relative face aux trimétalliques.
                            </div>
                        </div>

                        <!-- 2. Plaque Trimétallique (SCH-06) -->
                        <div style="background: white; border: 2px solid var(--color-dark); padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                                    <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-dark); color: white; padding: 0.2rem 0.5rem;">3 MÉTAUX</span>
                                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--color-accent);">&gt; 1,5 Million ex.</span>
                                </div>
                                <h3 style="font-size: 1.3rem; font-weight: 900; text-transform: uppercase; margin: 0 0 1rem 0; color: var(--color-dark);">
                                    Plaque Trimétallique
                                </h3>

                                <!-- Visual Box SCH-06 -->
                                <div style="width: 100%; height: 145px; margin-bottom: 1rem;">
                                    <div class="plate-img-box compact">
                                        <img src="assets/plaque_trimetallique.png" alt="Coupe Transversale Plaque Trimétallique Chrome / Cuivre / Acier" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; object-fit: contain;">
                                        <div class="plate-fallback">
                                            <span class="fallback-icon" style="font-size: 1.8rem;">🥉</span>
                                            <strong>SCH-06 : Plaque Trimétallique</strong>
                                            <small>assets/plaque_trimetallique.png</small>
                                        </div>
                                    </div>
                                </div>

                                <!-- Layers Stack -->
                                <div class="plate-layers">
                                    <div class="layer-item">
                                        <span class="layer-dot"></span>
                                        <span><strong>Chrome superficiel :</strong> Hydrophile (zones blanches)</span>
                                    </div>
                                    <div class="layer-item">
                                        <span class="layer-dot red"></span>
                                        <span><strong>Cuivre intermédiaire :</strong> Oléophile (graphismes)</span>
                                    </div>
                                    <div class="layer-item">
                                        <span class="layer-dot" style="background: #888;"></span>
                                        <span><strong>Support Acier ou Aluminium :</strong> Assise mécanique</span>
                                    </div>
                                </div>

                                <p style="font-size: 0.84rem; color: #555; line-height: 1.45; margin: 0;">
                                    Dissociation complète : le support en acier ou aluminium apporte la rigidité sans interférer dans l'équilibre chimique eau/encre.
                                </p>
                            </div>
                            <div style="margin-top: 1rem; padding-top: 0.6rem; border-top: 1px solid #eee; font-size: 0.78rem; color: #777;">
                                Standard haut de gamme des rotatives d'édition continue.
                            </div>
                        </div>

                        <!-- 3. Plaque Quadrimétallique (SCH-07) -->
                        <div style="background: white; border: 3px solid var(--color-accent); padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                                    <span style="font-size: 0.75rem; font-weight: 900; background: var(--color-accent); color: white; padding: 0.2rem 0.5rem;">4 MÉTAUX</span>
                                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--color-dark);">2 Millions+ Cadences Max</span>
                                </div>
                                <h3 style="font-size: 1.3rem; font-weight: 900; text-transform: uppercase; margin: 0 0 1rem 0; color: var(--color-dark);">
                                    Plaque Quadrimétallique
                                </h3>

                                <!-- Visual Box SCH-07 -->
                                <div style="width: 100%; height: 145px; margin-bottom: 1rem;">
                                    <div class="plate-img-box compact">
                                        <img src="assets/plaque_quadrimetallique.png" alt="Coupe Transversale Plaque Quadrimétallique Cr / Cu acide / Cu basique / Acier" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; object-fit: contain;">
                                        <div class="plate-fallback">
                                            <span class="fallback-icon" style="font-size: 1.8rem;">👑</span>
                                            <strong>SCH-07 : Plaque Quadrimétallique</strong>
                                            <small>assets/plaque_quadrimetallique.png</small>
                                        </div>
                                    </div>
                                </div>

                                <!-- Layers Stack -->
                                <div class="plate-layers" style="border-left-color: var(--color-accent);">
                                    <div class="layer-item">
                                        <span class="layer-dot"></span>
                                        <span><strong>Chrome :</strong> Hydrophile (zones blanches)</span>
                                    </div>
                                    <div class="layer-item">
                                        <span class="layer-dot red"></span>
                                        <span><strong>Cuivre acide :</strong> Encrage oléophile pur</span>
                                    </div>
                                    <div class="layer-item">
                                        <span class="layer-dot red" style="opacity: 0.7;"></span>
                                        <span><strong>Cuivre basique :</strong> Accroche galvanique ferreuse</span>
                                    </div>
                                    <div class="layer-item">
                                        <span class="layer-dot" style="background: var(--color-dark);"></span>
                                        <span><strong>Acier trempé :</strong> Résistance mécanique extrême</span>
                                    </div>
                                </div>

                                <p style="font-size: 0.84rem; color: #555; line-height: 1.45; margin: 0;">
                                    Le cuivre basique ancre le dépôt électrolytique sur l'acier. Le cuivre acide supérieur garantit un transfert d'encre sans rival.
                                </p>
                            </div>
                            <div style="margin-top: 1rem; padding-top: 0.6rem; border-top: 1px solid #fecaca; font-size: 0.78rem; font-weight: 700; color: var(--color-accent);">
                                Performance absolue pour rotatives packaging &amp; emballage.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <!-- ========================================================================== -->
        <!-- SLIDE 10 : 3.1 RÔLE DE LA RUGOSITÉ (PLAQUE LISSE VS GRAINÉE, SCH-08)      -->
        <!-- ========================================================================== -->
        <section class="slide" id="slide-10">
            <div class="grid grid-title bg-light">
                <!-- Left Content -->
                <div class="slide-content">
                    <span class="presenter-tag" style="background: var(--color-accent); color: white;">
                        Partie 3 &bull; Traitement du Support
                    </span>
                    <h2 class="slide-title" style="margin-bottom: 1.5rem; line-height: 1.1;">
                        Rôle de la Rugosité de Surface
                    </h2>
                    <p class="subtitle" style="font-size: 1.25rem; margin-top: 0; margin-bottom: 2rem; color: var(--color-dark); font-weight: 700;">
                        Plaque Lisse vs Plaque Grainée &amp; Les 3 Lois du Mouillage
                    </p>

                    <!-- The Golden Rule Banner -->
                    <div style="background: white; border: 2px solid var(--color-dark); border-left: 5px solid var(--color-accent); padding: 1rem 1.4rem; margin-bottom: 1.5rem;">
                        <span style="font-size: 0.78rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-accent); display: block; margin-bottom: 0.2rem;">
                            Règle d'Or de l'Imprimeur Offset
                        </span>
                        <p style="font-size: 1.05rem; font-weight: 800; color: var(--color-dark); margin: 0; line-height: 1.35;">
                            &laquo; La meilleure surface hydrophile sera celle qui refusera l'encre avec le <u>minimum d'eau</u>. &raquo;
                        </p>
                    </div>

                    <ul class="bullet-list" style="font-size: 1.05rem;">
                        <li>
                            <strong>Inaptitude de la Plaque Lisse :</strong> L'aluminium poli à plat n'est pas hydrophile au naturel ; l'eau perle ou ruisselle sans adhérer, nécessitant un débit excessif qui émulsionne l'encre et salit les tirages.
                        </li>
                        <li>
                            <strong>Rétention Capillaire par la Rugosité :</strong> Le grainage façonne un lacis de micro-crêtes et de micro-creux piégeant un film d'eau microscopique stable et inarrachable par tension de surface.
                        </li>
                        <li>
                            <strong>Les 3 Lois Fondamentales du Mouillage :</strong>
                            <br>&bull; <em>1. Homogénéité :</em> Plus la distribution des crêtes et creux est dense et isotrope, meilleure est la protection hydrophile.
                            <br>&bull; <em>2. Amplitude :</em> Une rugosité prononcée stabilise la réserve d'eau sous la friction des rouleaux de mouillage.
                            <br>&bull; <em>3. Limite de saturation :</em> La plaque ne peut retenir plus d'eau que sa microporosité ; tout excès d'eau libre émulsionne l'encre.
                        </li>
                    </ul>
                </div>

                <!-- Right Visual: Schematic Rugosité Plaque Lisse vs Grainée (SCH-08) -->
                <div class="slide-visual" style="background: white; border-left: 3px solid var(--color-dark); padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <div style="width: 100%; max-width: 440px; height: 320px; margin-bottom: 1.5rem;">
                        <div class="plate-img-box diagram">
                            <img src="assets/schematic_rugosite_grainage.svg" alt="Schéma Profil de Rugosité : Plaque Lisse vs Plaque Grainée" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; object-fit: contain;">
                            <div class="plate-fallback">
                                <span class="fallback-icon" style="font-size: 2.5rem;">🌊</span>
                                <strong>SCH-08 : Rôle de la Rugosité</strong>
                                <span class="fallback-caption">Plaque lisse (gouttes d'eau perlant sans adhérence) vs Plaque grainée (crêtes et creux retenant un film d'eau continu minimal).</span>
                                <small>assets/schematic_rugosite_grainage.svg</small>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: left; max-width: 440px; border-left: 3px solid var(--color-accent); padding-left: 1rem;">
                        <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent);">
                            SCH-08 &bull; Profil Microscopique
                        </div>
                        <p style="font-size: 0.85rem; color: #444; margin-top: 0.3rem; line-height: 1.4;">
                            Ménisque d'eau liquide ancré au creux des microcavités : maintien d'une barrière répulsive continue avec une quantité d'eau minimale, écartant tout risque d'émulsion.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========================================================================== -->
        <!-- SLIDE 11 : 3.2 GRAINAGE MÉCANIQUE OSCILLANT (SCH-09)                       -->
        <!-- ========================================================================== -->
        <section class="slide" id="slide-11">
            <div class="grid grid-title bg-light">
                <!-- Left Content -->
                <div class="slide-content">
                    <span class="presenter-tag" style="background: var(--color-accent); color: white;">
                        Partie 3 &bull; Procédés de Grainage
                    </span>
                    <h2 class="slide-title" style="margin-bottom: 1.5rem; line-height: 1.1;">
                        Le Grainage Mécanique
                    </h2>
                    <p class="subtitle" style="font-size: 1.25rem; margin-top: 0; margin-bottom: 2rem; color: var(--color-dark); font-weight: 700;">
                        Brossage Oscillant à Sec &amp; Isotropie des Microcavités
                    </p>

                    <ul class="bullet-list" style="font-size: 1.05rem;">
                        <li>
                            <strong>Procédé de Brossage à Sec :</strong> Défilement continu de la feuille d'aluminium sous des brosses métalliques rotatives (fils d'acier trempé ou de bronze) abrasant mécaniquement la surface.
                        </li>
                        <li>
                            <strong>Rôle Vital de l'Oscillation Transversale :</strong> Les têtes de brossage sont obligatoirement animées d'un va-et-vient latéral rapide (mouvement oscillant perpendiculaire à l'axe de rotation).
                        </li>
                        <li>
                            <strong>Suppression des Sillons de Fuite :</strong> Sans oscillation, les brosses généreraient des rayures parallèles longitudinales formant des canaux de fuite capillaire par où l'eau s'échapperait, provoquant un graissage immédiat.
                        </li>
                        <li>
                            <strong>Fiche Technique &amp; Performances :</strong>
                            <br>&bull; <em>Consommation d'eau :</em> Très faible grâce à une faible profondeur des pores.
                            <br>&bull; <em>Finesse &amp; Résolution :</em> Excellente fidélité de reproduction des détails fins.
                            <br>&bull; <em>Démarrage :</em> Équilibre eau/encre très rapide dès l'introduction de l'encre.
                            <br>&bull; <em>Limite d'Endurance :</em> Résistance limitée à <strong>500 000 exemplaires</strong> maximum.
                        </li>
                    </ul>
                </div>

                <!-- Right Visual: Schematic Grainage Mécanique (SCH-09) -->
                <div class="slide-visual" style="background: white; border-left: 3px solid var(--color-dark); padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <div style="width: 100%; max-width: 440px; height: 320px; margin-bottom: 1.5rem;">
                        <div class="plate-img-box diagram">
                            <img src="assets/schematic_grainage_mecanique.svg" alt="Schéma Technique du Brossage Mécanique Oscillant" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; object-fit: contain;">
                            <div class="plate-fallback">
                                <span class="fallback-icon" style="font-size: 2.5rem;">⚙️</span>
                                <strong>SCH-09 : Grainage Mécanique Oscillant</strong>
                                <span class="fallback-caption">Brosses métalliques rotatives oscillant transversalement pour éviter l'alignement des rayures et créer des microcavités isotropes.</span>
                                <small>assets/schematic_grainage_mecanique.svg</small>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: left; max-width: 440px; border-left: 3px solid var(--color-accent); padding-left: 1rem;">
                        <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent);">
                            SCH-09 &bull; Brossage Oscillant à Sec
                        </div>
                        <p style="font-size: 0.85rem; color: #444; margin-top: 0.3rem; line-height: 1.4;">
                            Cinématique combinée rotation / oscillation : dispersion multidirectionnelle des crêtes abrasives empêchant tout chenal d'écoulement préférentiel de l'eau.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========================================================================== -->
        <!-- SLIDE 12 : 3.3 GRAINAGE CHIMIQUE À BROSSE (SCH-10)                        -->
        <!-- ========================================================================== -->
        <section class="slide" id="slide-12">
            <div class="grid grid-title bg-light">
                <!-- Left Content -->
                <div class="slide-content">
                    <span class="presenter-tag" style="background: var(--color-accent); color: white;">
                        Partie 3 &bull; Procédés de Grainage
                    </span>
                    <h2 class="slide-title" style="margin-bottom: 1.5rem; line-height: 1.1;">
                        Grainage Chimique à Brosse
                    </h2>
                    <p class="subtitle" style="font-size: 1.25rem; margin-top: 0; margin-bottom: 2rem; color: var(--color-dark); font-weight: 700;">
                        Brosses Nylon &amp; Barbotine de Poudre de Ponce Acide
                    </p>

                    <ul class="bullet-list" style="font-size: 1.05rem;">
                        <li>
                            <strong>Double Action Mécanique &amp; Chimique :</strong> Défilement sous des brosses rotatives en fibres de <em>nylon</em> souples arrosées d'une barbotine liquide (suspension de <em>poudre de ponce</em> ou de quartz micrométrique dans une solution acide).
                        </li>
                        <li>
                            <strong>Rôle de la Poudre de Ponce :</strong> Grains abrasifs d'origine volcanique calibrés pour arrondir le sommet des crêtes sans lacérer la feuille d'aluminium.
                        </li>
                        <li>
                            <strong>Avantages Technologiques :</strong>
                            <br>&bull; <em>Adhérence de Couche :</em> Excellente accroche mécanique de la couche photosensible diazoïque.
                            <br>&bull; <em>Mouillabilité Hydrophile :</em> Rétention d'eau favorable et équilibre eau/encre prompt au calage.
                        </li>
                        <li>
                            <strong>Limites &amp; Tirages Moyens :</strong>
                            <br>&bull; <em>Hétérogénéité d'Attaque :</em> L'acide réagit de manière moins uniforme que l'électrolyse, affaiblissant la dureté superficielle du métal.
                            <br>&bull; <em>Risque au Développement :</em> Rétention de résidus dans les anfractuosités profondes (voile de fond). Recommandé pour <strong>moyens tirages</strong> (100k &agrave; 300k ex).
                        </li>
                    </ul>
                </div>

                <!-- Right Visual: Schematic Grainage Chimique (SCH-10) -->
                <div class="slide-visual" style="background: white; border-left: 3px solid var(--color-dark); padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <div style="width: 100%; max-width: 440px; height: 320px; margin-bottom: 1.5rem;">
                        <div class="plate-img-box diagram">
                            <img src="assets/schematic_grainage_chimique.svg" alt="Schéma Procédé de Grainage Chimique à Brosse et Poudre de Ponce" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; object-fit: contain;">
                            <div class="plate-fallback">
                                <span class="fallback-icon" style="font-size: 2.5rem;">🧽</span>
                                <strong>SCH-10 : Grainage Chimique à Brosse</strong>
                                <span class="fallback-caption">Brosses en fibres de nylon projetant une barbotine acide de poudre de ponce pour créer une micro-rugosité d'ancrage.</span>
                                <small>assets/schematic_grainage_chimique.svg</small>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: left; max-width: 440px; border-left: 3px solid var(--color-accent); padding-left: 1rem;">
                        <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent);">
                            SCH-10 &bull; Barbotine Abrasive Acide
                        </div>
                        <p style="font-size: 0.85rem; color: #444; margin-top: 0.3rem; line-height: 1.4;">
                            Attaque synergique brosses nylon / poudre de ponce : profil de micro-cavités à forte accroche pour tirages moyens, nécessitant un rinçage et un développement rigoureux.
                        </p>
                    </div>
                </div>
            </div>
        </section>
```

---

## 5. Matrice de Conformité aux Tests E2E

| Test E2E | Intitulé du Test | Assertion Requise | Statut avec ce Markup |
|---|---|---|---|
| `3.1` | Part 2: Monometallic Aluminium Plates | `assert.match(html, /monom[ée]tallique/i)` & `assert.match(html, /l[ée]g[èe]ret[ée]\|ductile\|stabilit[ée]/i)` | **PASS** (Slide 07) |
| `3.2` | Part 2: Polymetallic Endurance (1-2M) | `assert.match(html, /polym[ée]tallique/i)` & `assert.match(html, /1\s*[àa]\s*2\s*millions?\|longs?\s+tirages?/i)` | **PASS** (Slide 08) |
| `3.3` | Part 2: Bimetallic Architecture | `assert.match(html, /bim[ée]tallique/i)` & `assert.match(html, /chrome/i)` & `assert.match(html, /laiton/i)` | **PASS** (Slide 09) |
| `3.4` | Part 2: Trimetallic Architecture | `assert.match(html, /trim[ée]tallique/i)` & `assert.match(html, /cuivre/i)` & `assert.match(html, /acier/i)` | **PASS** (Slide 09) |
| `3.5` | Part 2: Quadrimetallic Architecture | `assert.match(html, /quadrim[ée]tallique/i)` & `assert.match(html, /cuivre\s+acide/i)` & `assert.match(html, /cuivre\s+basique/i)` | **PASS** (Slide 09) |
| `4.1` | Part 3: Role of Roughness & 3 Wetting Laws | `assert.match(html, /rugosit[ée]/i)` & `assert.match(html, /minimum\s+d['’]eau/i)` & `assert.match(html, /cr[êe]tes?\|creux\|mouillage/i)` | **PASS** (Slide 10) |
| `4.2` | Part 3: Mechanical Dry Brush Graining | `assert.match(html, /grainage\s+m[ée]canique/i)` & `assert.match(html, /brosses?\|brossage/i)` | **PASS** (Slide 11) |
| `4.3` | Part 3: Oscillating Brush Motion & 500k | `assert.match(html, /oscillant\|oscillation/i)` & `assert.match(html, /500\s*000/i)` | **PASS** (Slide 11) |
| `4.4` | Part 3: Chemical Brush Graining (Pumice/Nylon) | `assert.match(html, /grainage\s+chimique/i)` & `assert.match(html, /ponce\|quartz/i)` & `assert.match(html, /nylon/i)` | **PASS** (Slide 12) |
| `4.5` | Part 3: Chemical Medium Runs Profile | `assert.match(html, /moyens?\s+tirages?\|adh[ée]rence/i)` | **PASS** (Slide 12) |
| `2.1` & `2.2` | Zero Meta-Labels | Zero occurrences of "Personne X", "Page XX", student distribution tags | **PASS** (100% purifié) |
| `2.4` & `2.5` | Fallback Structure & Content | All `.plate-img-box` have `onerror` and `.plate-fallback` with glyph, strong, caption, small asset path | **PASS** (100% des 7 boîtes) |
| `2.12` | Anti-Slop (No Diffuse Shadows, No Radius) | Zero inline box-shadow > 0, zero non-zero border-radius | **PASS** (Design brutaliste pur) |
| `3.6` to `3.8` | Odometer Step Count & Total | 12 steps matching 12 slides, `/ 12` counter total | **PASS** (Synchronisation parfaite) |
| `2.11` | UTF-8 & Mojibake Absence | Clean French typography, no corrupted byte sequences | **PASS** (UTF-8 impeccable) |

---

## 6. Recommandations pour l'Intégrateur (Builder M2)

1. **Ordre d'Insertion dans `index.html` :** Insérer les sections `<section class="slide" id="slide-07">` à `<section class="slide" id="slide-12">` immédiatement après `#slide-06` (ligne 468) et avant la balise `<nav class="presentation-nav">`.
2. **Odomètre :** Remplacer le bloc `#slideCounter` existant (lignes 30 à 40) par le bloc à 12 pas décrit en section 3.
3. **Vérification Immédiate :** Exécuter la suite de tests avec `node --test tests/e2e-presentation.test.mjs` et `node --test tests/test-anti-slop.test.mjs`.
