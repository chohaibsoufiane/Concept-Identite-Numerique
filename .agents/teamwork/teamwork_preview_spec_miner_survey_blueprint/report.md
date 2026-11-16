# Spécification Technique Complète : Présentation "Les Plaques Offset"
**Fichier de référence :** `media_1792426443374_2146cc71.pdf` (Synthèse 3 pages) & `media_1792433460155_9b744693.pdf` (Manuel de cours, Pages 19 à 22)  
**Auteur du rapport :** Blueprint Specification Miner  
**Date :** 2026-10-23  
**Statut :** Spécification Technique Exhaustive & Validée  

---

## 1. Executive Summary & Specification Scope

Ce document établit la spécification authoritative complète pour la réalisation de la présentation interactive Electron du cours **« Production des Formes Imprimantes — Les Plaques Offset »**.

L'investigation a croisé :
1. Le document de synthèse officiel de 3 pages (`media_1792426443374_2146cc71.pdf`).
2. Le manuel de référence complet du module (`media_1792433460155_9b744693.pdf`, pages 19 à 22).
3. L'existant du code (`index.html`, `style.css`, `script.js`, `assets/`).

### Directives d'Assainissement et d'Intégrité
- **Éradication Totale des Méta-Libellés d'Enseignement :** Interdiction absolue de mentions telles que « Personne X », « Intervenant X », « Page 19 à 22 », « Page 20 », « Slide pour Personne 1 ». Remplacement systématique par une titulature technique d'ingénierie graphique.
- **Granularité & Respiration (1 Sujet = 1 Slide) :** Rejet catégorique du compactage (entasser 4 sujets dans une slide). Décomposition aérée en 22 diapositives cohérentes.
- **Respect Strict du Design System Brutaliste Suisse :** Zéro templates externes, zéro cartes génériques à coins arrondis et ombres portées ("AI slop"). Utilisation exclusive des tokens CSS natifs de l'application (`style.css`).
- **Spécification Visuelle & Placeholders Schématiques :** Chaque schéma technique du cours dispose d'un conteneur dédié, d'un chemin d'accès explicite dans `assets/`, d'un libellé technique et d'une légende explicative avec fallback d'erreur.

---

## Features Discovered

| # | Catégorie | Fonctionnalité / Sujet | Description Technique | Entrées / Paramètres | Sorties / Rendu Attendu | Comportement Limite & Erreurs | Découvert Via |
|---|-----------|------------------------|-----------------------|----------------------|-------------------------|-------------------------------|---------------|
| 1 | Titre & Préface | Page de Garde & Sommaire | Identification académique du module, titre brut et table des matières 6 axes | Titre, sous-titre, équipe de réalisation | Écran d'accueil brutaliste + sommaire structuré | Ne pas afficher de numéros de pages manuelles | Blueprint p.1 & index.html |
| 2 | Part 1 : Origine | Lithographie & Senefelder | Découverte fortuite par Aloys Senefelder (1796) sur Pierre calcaire de Bavière (Solnhofen) | Pierre calcaire, eau, graisse | Diapositive historique sobre avec portrait Senefelder | Mauvais format d'image / fallback svg | Blueprint p.1 & Manuel p.19 |
| 3 | Part 1 : Origine | Réaction Chimique Pierre | Gomme arabique + acide nitrique pénètrent les porosités du calcaire pour former un sel hydrophile | $CaCO_3$, $HNO_3$, gomme, encre | Schéma de pénétration des pores et formation du sel | Confusion entre adsorption et réaction chimique | Blueprint p.1 & Manuel p.19 |
| 4 | Part 1 : Origine | Évolution Métallique | Remplacement de la pierre calcaire par le Zinc (1860), puis émergence de l'Aluminium (découvert en 1824, Bauxite des Baux) | Propriétés Zn vs Al, dates clés | Frise comparative ou double bloc technique | Déformation thermique du zinc sous machine | Blueprint p.1 & Manuel p.19 |
| 5 | Part 1 : Principe | Principe Planographique | Absence de relief et de creux ; coexistence sur surface plane de zones imprimantes (oléophiles) et non-imprimantes (hydrophiles) | Encre grasse, eau de mouillage | Schéma d'antagonisme eau/corps gras à plat | Émulsion d'encre si mouillage excessif | Blueprint p.1 & Manuel p.19 |
| 6 | Part 2 : Supports | Plaques Monométalliques | Support d'un seul métal (Aluminium dominant, léger, hydrophile, résistant à l'oxydation, stable thermiquement) | Support Al + couche photosensible | Carte technique avec structure en couches | Oxydation corrosive si aluminium non protégé | Blueprint p.1 & Manuel p.19 |
| 7 | Part 2 : Supports | Plaques Polymétalliques | Plaques multi-couches pour très longs tirages (1 à 2 millions de tours), combinant métaux hydrophiles et oléophiles | Chrome, Cuivre, Laiton, Acier | Tableau de résistance machine et tirages | Décollement inter-métallique sous tension | Blueprint p.1 & Manuel p.19 |
| 8 | Part 2 : Supports | Architecture Multi-Métaux | Coupes transversales détaillées : Bimétallique (Cr/Laiton), Trimétallique (Cr/Cu/Acier ou Al), Quadrimétallique (Cr/Cu acide/Cu basique/Acier) | Épaisseurs relatives, affinités des métaux | Schéma structural des 4 types de plaques | Inversion des couches fonctionnelles | Blueprint p.1 & Manuel p.19 |
| 9 | Part 3 : Grainage | Rôle de la Rugosité | Traitement de surface créant des crêtes et creux micrométriques pour retenir l'eau avec un film minimal | Indice de rugosité, mouillabilité | Schéma comparatif : Plaque lisse vs Plaque grainée | Plaque lisse incapable de retenir l'eau | Blueprint p.2 & Manuel p.20 |
| 10 | Part 3 : Grainage | Grainage Mécanique | Brossage oscillant à sec évitant l'alignement directionnel des microcavités (tirage max 500 000 ex) | Brosses abrasives oscillantes | Fiche avantages / inconvénients / tirage | Alignement des sillons créant des fuites d'eau | Blueprint p.2 & Manuel p.20 |
| 11 | Part 3 : Grainage | Grainage Chimique à Brosse | Brosses nylon + solution liquide de poudre de ponce/quartz et acide (tirages moyens) | Poudre de ponce, brosses nylon, acide | Fiche avantages / inconvénients / adhérence | Attaque acide non uniforme fragilisant l'aluminium | Blueprint p.2 & Manuel p.20 |
| 12 | Part 4 : Électrolyse | Grainage Électrochimique | Attaque en bain acide sous courant alternatif élevé générant une structure microporeuse homogène (film d'eau 4,5 à 10 µm) | Bain acide, courant alternatif | Schéma de cuve électrolytique + trames 300 lpi | Écart de température dans le bain altérant le grain | Blueprint p.2 & Manuel p.21 |
| 13 | Part 4 : Anodisation | Anodisation de Surface | Électrolyse oxydante créant une couche artificielle d'alumine ($Al_2O_3$) durcie, anti-usure et hautement réceptive à l'eau | Bain sulfurique/phosphorique, anode Al | Schéma microscopique de la barrière d'oxyde | Usure prématurée si couche trop mince | Blueprint p.2 & Manuel p.21 |
| 14 | Part 4 : Plaques Chromées | Plaques Litho Chromées | Dépôt électrochimique de chrome naturel hydrophile retenant 2× moins d'eau que l'aluminium, pour très haute vitesse et métaux | Dépôt électrolytique de Chrome | Fiche avantages (vitesse, métaux) / limites | Sensibilité critique aux rayures mécaniques | Blueprint p.2 & Manuel p.21 |
| 15 | Part 5 : Couches Sensibles | Couches Diazoïques (Positif) | Composés organiques avec groupement $N_2$ décomposés sous UV, devenant solubles au révélateur dans les zones exposées | Rayonnement actinique UV (~365-405 nm), film positif | Schéma d'insolation et développement positif | Voile si temps de pose insuffisant | Blueprint p.3 & Manuel p.21 |
| 16 | Part 5 : Couches Sensibles | Photopolymères (Négatif) | Monomères organiques synthétiques réticulant sous UV pour devenir insolubles, réservés aux rotatives (> 1 million) | Rayonnement actinique UV, film négatif | Schéma de photopolymérisation négative | Oxydation à l'air inhibant la polymérisation | Blueprint p.3 & Manuel p.22 |
| 17 | Part 5 : Mécanismes | Comparaison Photochimique | Confrontation directe Positif (solubilisation de l'insolée) vs Négatif (insolubilisation de l'insolée) | Films positif/négatif, révélateur aqueux alcalin | Schéma double face à face pas-à-pas | Inversion chimique des révélateurs | Blueprint p.3 & Manuel p.21-22 |
| 18 | Part 6 : Typologie | Plaques Positives | 80% du marché commercial et labeur, court temps d'exposition, haut pouvoir de résolution, fort contraste | Résines diazoïques, colorants de contraste | Fiche indicateurs de performance et marché | Sensibilité à la surexposition réduisant les points | Blueprint p.3 & Manuel p.22 |
| 19 | Part 6 : Typologie | Plaques Négatives | Spécifiques aux rotatives presse, travaux monochromes et grands tirages de journaux | Couches photopolymères | Fiche domaine presse / endurance machine | Dégradation du point de trame sur tirage court | Blueprint p.3 & Manuel p.22 |
| 20 | Part 6 : Sélection | 9 Critères Objectifs de Choix | Grille multicritère complète d'évaluation technique et économique pour le choix d'une plaque | 9 paramètres techniques d'atelier | Matrice décisionnelle 3×3 ou tableau structuré | Négligence des coûts de chimie ou de conservation | Blueprint p.3 & Manuel p.22 |
| 21 | Navigation & Moteur | Odomètre Brutaliste Synchrone | Compteur `/ XX` et rail cinétique `#counterTrack` synchronisés sur le nombre exact de diapositives | Touches clavier, clics de navigation | Mise à jour fluide du compteur (ex: 01 / 22) | Désynchronisation de l'offset CSS translateY | ORIGINAL_REQUEST.md & script.js |

---

## Edge Cases

| # | Fonctionnalité | Donnée / Situation d'Entrée | Comportement Observé & Spécifié |
|---|----------------|-----------------------------|---------------------------------|
| 1 | Équilibre eau / encre | Trop d'eau apportée sur plaque lisse | L'eau submerge les graphismes et provoque l'émulsion de l'encre (perte de contraste, séchage impossible, maculage). D'où l'exigence de la rugosité qui retient un film ultra-mince. |
| 2 | Équilibre eau / encre | Pas assez d'eau sur zone non imprimante | Graissage immédiat : l'encre grasse adhère sur les blancs du support, provoquant le salissement de la feuille imprimée. |
| 3 | Durabilité plaque monométallique | Tirage machine dépassant 500 000 tours | Usure par abrasion du grainage et décollement de la couche diazoïque si non cuite au four. D'où le passage impératif aux polymétalliques ou photopolymères. |
| 4 | Insolation plaque positive | Surexposition aux UV sous film positif | La lumière contourne les contours du trait par diffraction et réduit la surface des points de trame (perte de densité dans les ombres). |
| 5 | Insolation plaque négative | Sous-exposition aux UV sous film négatif | Réticulation incomplète du photopolymère : la couche s'arrache au tirage et les points fins disparaissent dès les premiers tours de presse. |
| 6 | Rayure plaque litho chromée | Rayure superficielle de la couche de chrome | Mise à nu du sous-métal (cuivre oléophile) : la rayure attire l'encre et produit une ligne parasite noire indélébile sur tout le tirage. |
| 7 | Brossage mécanique directionnel | Brosses non animées d'un mouvement oscillant | Création de sillons parallèles longitudinaux : l'eau s'écoule par capillarité comme dans des canaux et ne protège plus uniformément la surface contre l'encre. |
| 8 | Conservation de la plaque | Stockage sans gommage protecteur | L'oxygène de l'air oxyde le métal nu et détruit le caractère hydrophile, rendant la réimpression impossible. Nécessite une solution de gomme protectrice. |
| 9 | Élimination au développement | Grainage chimique trop profond / irrégulier | Rétention d'amorces de résine au fond des cavités rugueuses que le révélateur n'atteint pas, entraînant un risque de voile de fond. |

---

## 2. Extraction Technique Exhaustive des 6 Parties

### PART 1 : ORIGINE & PRINCIPE DE LA PLAQUE OFFSET

#### A. Définition Fondamentale
Une plaque offset est un support planographique constitué de deux éléments indissociables :
1. **Un support mécanique (substitut de la pierre) :** Généralement métallique, apportant flexibilité, résistance à la traction et stabilité dimensionnelle sur le cylindre porte-plaque.
2. **Une couche photosensible :** Enduit chimique microscopique réactif aux rayonnements lumineux, permettant de fixer l'image à reproduire.

#### B. Genèse Historique : La Pierre Lithographique
- **Inventeur :** Aloys Senefelder (Munich, Bavière).
- **Date :** Découverte en 1796 (considérée comme l'ancêtre direct de la plaque offset).
- **Substrat originel :** La Pierre calcaire de Bavière (extraite à Solnhofen), calcaire jurassique très pur et poreux possédant la propriété naturelle de retenir l'eau.
- **Amplification chimique :** L'application d'un mélange de solution de **gomme arabique** et d'**acide nitrique** ($HNO_3$) transforme chimiquement la surface pour exacerber son affinité avec l'eau.
- **Réaction physico-chimique :**
  - La solution de mouillage pénètre les microporosités de surface et réagit avec le carbonate de calcium ($CaCO_3$) de la pierre pour former des sels hydrosolubles hautement hydrophiles.
  - L'encre grasse appliquée pour dessiner les graphismes s'infiltre dans les pores non mouillés, les sature et adhère par liaisons lipophiles solides (zones oléophiles).
  - Principe d'antagonisme : Répulsion spontanée entre l'eau et les corps gras (acides gras et huiles minérales de l'encre).

#### C. L'Évolution Métallique : De la Pierre à l'Aluminium
- **1860 :** Naissance de la plaque **monométallique en Zinc**. Le zinc permet de cintrer la plaque sur un cylindre rotatif, mais souffre de fragilité, de forte réactivité corrosive à l'eau acide, d'un allongement excessif sous contrainte mécanique et d'une rentabilité limitée.
- **Apparition des plaques polymétalliques :** Combinaison de métaux pour dissocier la rigidité mécanique de la fonction chimique.
- **Aujourd'hui : Hégémonie de l'Aluminium :**
  - Découvert en 1824 par Hans Christian Ørsted et isolé par Friedrich Wöhler.
  - Minerai de base : **La bauxite**, découverte en 1821 par Pierre Berthier dans le village des Baux-de-Provence (France).
  - Atouts majeurs : Extrême légèreté, neutralité sous humidité, formation naturelle d'une micro-couche d'oxyde protectrice, dilatation thermique très faible sous contrainte de tirage, et coût de revient industriel très compétitif.

#### D. Le Principe Planographique Fondamental
Contrairement à la typographie ou flexographie (formes en relief) et à l'héliogravure (formes en creux), la plaque offset est **plane** :
- **Surface plane :** Ni creux ni relief perceptibles.
- **Coexistence de deux états de surface antagonistes :**
  1. **Zone Imprimante (Graphismes) :** Oléophile (lipophile) et hydrophobe $\rightarrow$ Doit accepter l'encre grasse et refuser / repousser l'eau de mouillage.
  2. **Zone Non-Imprimante (Blancs / Fond) :** Hydrophile (lipophobe) $\rightarrow$ Doit accepter l'eau de mouillage et refuser / repousser totalement l'encre grasse.

---

### PART 2 : LES SUPPORTS DES PLAQUES CONVENTIONNELLES

#### A. Les Plaques Monométalliques
- Support constitué d'une seule feuille métallique uniforme recouverte de la couche photosensible.
- Métaux utilisés à travers l'histoire : Zinc (abandonné), Chrome, Acier et **Aluminium** (standard universel à > 95%).
- Propriétés mécaniques de l'Aluminium :
  - Métal ductile, léger, facilitant le calage sur machine.
  - Plus hydrophile que le zinc après traitement de surface.
  - Excellente résistance à l'oxydation humide.
  - Faible allongement élastique et thermique : maintien du repérage quadrichromique sur les 4 groupes d'impression.

#### B. Les Plaques Polymétalliques
- Destinées aux **très longs tirages industriels** (rotatives de labeur, emballage, grands tirages de 1 à 2 millions d'exemplaires).
- Prix de revient plus élevé compensé par une endurance machine exceptionnelle.
- Principe : Utiliser pour chaque zone le métal possédant naturellement l'affinité chimique recherchée sans compromis :
  - **Chrome ($Cr$) :** Métal naturellement très dur et hydrophile (réservé aux zones non imprimantes).
  - **Cuivre ($Cu$) ou Laiton :** Métal naturellement oléophile (réservé aux zones imprimantes recevant l'encre).
  - **Acier ou Aluminium :** Métal de soutien apportant la résistance à la traction et la rigidité mécanique.

#### C. Architecture Détaillée des 4 Structures Conventionnelles
1. **Plaque Monométallique :**
   - Couche supérieure : Couche photosensible (diazoïque ou photopolymère)
   - Support : Feuille d'Aluminium traitée (épaisseur courante : 0,15 mm à 0,40 mm)
2. **Plaque Bimétallique :**
   - Couche supérieure : **Chrome** (naturellement hydrophile)
   - Support de base : **Laiton** (alliage 70% Cuivre + 30% Zinc, naturellement oléophile)
3. **Plaque Trimétallique :**
   - Couche supérieure : **Chrome** (naturellement hydrophile pour les blancs)
   - Couche intermédiaire : **Cuivre** (naturellement oléophile pour les graphismes)
   - Support de base : **Acier** ou **Aluminium** (support mécanique robuste)
4. **Plaque Quadrimétallique :**
   - Couche supérieure : **Chrome** (hydrophile)
   - Couche intermédiaire haute : **Cuivre acide** (cuivre raffiné électrolytique à forte affinité d'encre)
   - Couche intermédiaire basse : **Cuivre basique** (couche d'accroche électrochimique sur le métal ferreux)
   - Support de base : **Acier** (haute résistance aux cadences extrêmes de rotative)

---

### PART 3 : TRAITEMENT DU SUPPORT & GRAINAGE

#### A. Rôle Fondamental du Traitement et de la Rugosité
L'aluminium brut n'est pas hydrophile au naturel ; laissé sans préparation, il accepte la graisse et se mouille difficilement.
- **Règle d'or de l'imprimeur :** « La meilleure surface hydrophile sera celle qui refusera l'encre avec le **minimum d'eau**. »
- Facteurs régissant la rétention d'eau :
  1. Le type de grainage (mécanique, chimique, électrochimique).
  2. La profondeur et la structure du grain.
  3. L'indice de rugosité (profil crêtes/creux).
  4. La nature de l'oxyde de surface (oxyde d'aluminium $Al_2O_3$ ou oxyde de chrome $Cr_2O_3$).
- **Les 3 Lois Fondamentales de la Rugosité :**
  1. Plus une plaque présente une irrégularité homogène de crêtes et de creux, meilleure est son aptitude hydrophile.
  2. Plus la rugosité est accentuée, plus la capacité de mouillage est stable.
  3. Limite physique : Une plaque ne peut retenir plus d'eau que ne lui autorise sa microporosité de surface (au-delà, l'eau libre émulsionne l'encre).

#### B. Les Procédés de Grainage

##### 1. Grainage Mécanique par Brossage à Sec
- **Procédé :** Action de brosses métalliques rotatives animées impérativement d'un **mouvement oscillant** (va-et-vient transversal).
- **Rôle du mouvement oscillant :** Empêche l'alignement longitudinal des microcavités ; des sillons orientés dans le sens de rotation créeraient des voies de fuite d'eau détruisant la mouillabilité.
- **Avantages :**
  - Structure peu poreuse $\rightarrow$ faible consommation d'eau.
  - Excellente finesse de reproduction des détails.
  - Facilité de copie et rapidité d'obtention de l'équilibre eau/encre au démarrage.
- **Inconvénients :**
  - Résistance limitée : tirages plafonnés à **500 000 exemplaires**.

##### 2. Grainage Chimique à Brosse
- **Procédé :** Action conjuguée de brosses en nylon et d'une barbotine liquide contenant de la **poudre de ponce** ou de quartz en suspension acide.
- **Avantages :**
  - Excellente adhérence de la couche photosensible.
  - Bonne réceptivité hydrophile et très bonne fidélité de reproduction.
  - Rétention d'eau favorable (moins d'eau requise).
  - Équilibre eau/encre rapide, démarrage aisé sur presse.
- **Inconvénients :**
  - Qualité inférieure au grainage électrolytique : l'acide n'attaque pas uniformément la feuille, créant des micro-hétérogénéités.
  - Les composés chimiques formés affaiblissent la dureté superficielle de l'aluminium.
  - Recommandé uniquement pour les tirages moyens.
  - Difficulté d'élimination complète de la couche photosensible dans les anfractuosités profondes lors du développement.

---

### PART 4 : ÉLECTROLYSE, ANODISATION & PLAQUES CHROMÉES

#### A. Grainage Électrochimique (Électrograinage par Électrolyse)
- **Procédé :** Défilement continu de la bande d'aluminium dans un bain d'acide dilué (chlorhydrique $HCl$ ou nitrique $HNO_3$) traversé par un courant alternatif à forte intensité.
- **Mécanisme :** Micro-attaques galvaniques créant des cavités microscopiques hémisphériques parfaitement réparties et isotropes.
- **Paramètres physiques :**
  - Épaisseur du film d'eau retenu : oscille entre **4,5 et 10 microns** selon le fabricant.
  - Permet une adhérence micrométrique parfaite de la couche sensible.
- **Performances :**
  - Maintien de la qualité d'impression à coût optimisé.
  - Capacité d'endurance : dépasse **1 million d'exemplaires**.
  - Pouvoir séparateur élevé : permet le transfert de **trames de grande finesse (trame 300 lignes par pouce / lpi)**.

#### B. L'Anodisation (Oxydation Anodique)
- **Principe :** Création contrôlée par électrolyse en bain d'acide sulfurique ($H_2SO_4$) d'une couche d'alumine protectrice ($Al_2O_3$) à la surface de l'aluminium déjà grainé.
- **Effets physico-chimiques :**
  - **Durcissement de surface :** L'alumine approche la dureté du corindon, augmentant considérablement la résistance à l'abrasion du blanchet et des particules de papier.
  - **Inertie chimique :** Ralentit drastiquement l'oxydation spontanée de l'aluminium au contact de l'air humide et de l'acidité du mouillage.
  - **Excellente mouillabilité :** Très forte réceptivité à l'eau de mouillage.
  - **Résistance au graissage :** Prévient le dépôt d'encre sur les fonds non imprimants.
  - **Ancrage mécanique :** Tenue irréprochable de la couche photosensible sur son support.

#### C. Les Plaques Litho Chromées
- **Principe :** Remplacement de la rugosité de l'aluminium par un dépôt électrolytique d'une pellicule de **chrome** ultra-fine.
- **Propriété exclusive du Chrome :** Le chrome est un métal intrinsèquement hydrophile qui **retient deux fois moins d'eau que l'aluminium** pour repousser la même quantité d'encre.
- **Avantages majeurs :**
  - Surface remarquablement lisse $\rightarrow$ qualité et netteté extrêmes du point de trame.
  - Rétention d'eau minimale $\rightarrow$ équilibre eau/encre quasi instantané et suppression du risque d'émulsion.
  - Stabilité dimensionnelle remarquable sur de très longs tirages industriels.
  - Insensibilité chimique totale aux révélateurs, solvants de lavage et encres spéciales (encres UV, encres métalliques).
  - Adaptées à la très haute vitesse de production sur rotative.
  - Spécialement requises pour l'impression sur supports rigides et non absorbants (métal, fer blanc pour emballage métallique, plastiques, PVC).
- **Inconvénients & Limites :**
  - Temps d'exposition UV plus longs à l'insolation.
  - Sensibilité aiguë aux rayures (la moindre griffe met à nu le cuivre sous-jacent et crée une ligne encrée parasite).
  - Coût de fabrication très onéreux.

---

### PART 5 : LES COUCHES PHOTOSENSIBLES

#### A. Généralités
La couche sensible est une résine photochimique micrométrique dont la structure moléculaire est altérée sous l'action d'un flux de photons ultraviolets (spectre actinique UV, 360 à 420 nm).

#### B. Les Couches Diazoïques (Procédé Positif)
- **Nature chimique :** Composés organiques complexes contenant le groupement diazo, caractérisé par une molécule à deux atomes d'azote ($\mathbf{N_2}$ ou groupement diazonium), associés à des résines novolaques et des colorants indicateurs.
- **Action de la lumière UV :**
  - Les photons UV décomposent les composés diazoïques avec dégagement d'azote gazeux ($N_2$).
  - La molécule se transforme en acide indène-carboxylique hautement **soluble** dans une solution basique aqueuse.
- **Comportement au développement :**
  - **Zones Insolées (frappées par les UV à travers les zones claires du film positif) :** Deviennent solubles dans le révélateur alcalin. Elles sont dissoutes et lavées, mettant à nu le métal hydrophile $\rightarrow$ **Zones non-imprimantes** (blancs).
  - **Zones Non-Insolées (protégées par les zones opaques du film positif) :** Ne subissent aucune décomposition. Elles restent insolubles, conservent leur nature organique lipophile et leur adhérence au support $\rightarrow$ **Zones imprimantes** (encrées).

#### C. Les Photopolymères (Procédé Négatif)
- **Nature chimique :** Résines organiques synthétiques composées de monomères, d'oligomères réactifs et de photo-initiateurs radicalaires.
- **Action de la lumière UV :**
  - L'énergie lumineuse active les photo-initiateurs qui déclenchent une polymérisation en chaîne.
  - Les molécules courtes s'associent et forment un réseau tridimensionnel macromoléculaire compact : le polymère **réticule** et devient totalement **insoluble**.
- **Comportement au développement :**
  - **Zones Insolées (frappées par les UV à travers les fenêtres transparentes du film négatif) :** Réticulent, durcissent et deviennent insolubles dans le révélateur $\rightarrow$ **Zones imprimantes**.
  - **Zones Non-Insolées (masquées par le fond opaque du film négatif) :** Les monomères restent libres et solubles ; ils sont dissous et évacués par le révélateur, dénudant le métal hydrophile $\rightarrow$ **Zones non-imprimantes** (blancs).
- **Atouts des Photopolymères :**
  1. Spécialement destinées aux presses rotatives pour très longs tirages industriels (> 1 million de tours).
  2. Résistance mécanique et chimique extrême à l'usure, aux solvants et au frottement.
  3. Fidélité de reproduction élevée sur originaux au trait ou demi-teintes tramées.
  4. Faible sensibilité aux variations climatiques (température et hygrométrie de l'atelier).

#### D. Schémas de Mécanismes Comparés (Insolation & Développement)
- **Montage Positif (Film Positif + Diazo) :**
  1. *Insolation :* Flux UV $\rightarrow$ Film Positif (traits noirs bloquent les UV, fonds clairs laissent passer les UV) $\rightarrow$ Couche sensible diazoïque (zones exposées solubilisées).
  2. *Développement :* Révélateur alcalin $\rightarrow$ Élimination des zones exposées $\rightarrow$ Résultat : Métal nu hydrophile pour les blancs + résine oléophile restante pour les graphismes.
- **Montage Négatif (Film Négatif + Photopolymère) :**
  1. *Insolation :* Flux UV $\rightarrow$ Film Négatif (fonds noirs bloquent les UV, traits clairs laissent passer les UV) $\rightarrow$ Couche photopolymère (zones exposées réticulées/durcies).
  2. *Développement :* Révélateur $\rightarrow$ Dissolution des monomères masqués $\rightarrow$ Résultat : Métal nu hydrophile pour les blancs + polymère durci oléophile pour les graphismes.

---

### PART 6 : PLAQUES POSITIVES, NÉGATIVES & 9 CRITÈRES DE CHOIX

#### A. Les Plaques Positives
- **Définition :** Plaque insolée sous film positif, dotée d'une couche de résines novolaques, composés diazo et colorants.
- **Importance industrielle :** Représentent **environ 80% des plaques utilisées** dans l'industrie graphique (labeur, édition, packaging commercial).
- **Critères de qualité déterminants :**
  1. Rapidité de copie et court temps d'exposition sous châssis.
  2. Haut pouvoir de résolution et netteté des contours de trame.
  3. Bon contraste visuel après insolation (changement de couleur indicateur facilitant le contrôle).
  4. Qualité de reproduction constante et élevée.
  5. Facilité et tolérance de développement dans divers révélateurs standards du marché.

#### B. Les Plaques Négatives
- **Définition :** Plaque insolée sous film négatif, dotée d'une couche photopolymère réticulable.
- **Domaines d'utilisation privilégiés :**
  - Travaux monochromes à grand volume.
  - Impression des **journaux et presse quotidienne** sur rotatives à très haute cadence.
  - Travaux requérant une endurance kilométrique élevée sans cuisson préalable.

#### C. Les 9 Paramètres Objectifs de Choix d'une Plaque Offset
Pour sélectionner la plaque adéquate face à un cahier des charges d'impression, l'ingénieur/conducteur offset évalue obligatoirement ces 9 paramètres :
1. **Résistance moyenne au nombre de tirages :** Court tirage (< 50 000 ex), moyen tirage (100k - 500k ex) ou très long tirage (> 1 à 2 millions ex).
2. **Nature du support et nature de la couche :** Aluminium grainé/anodisé vs polymétallique (chrome/cuivre/acier) ; couche diazoïque vs photopolymère.
3. **Type de plaque (Positive vs Négative) :** Cohérence avec le flux prépresse (films positifs pour 80% labeur vs films négatifs pour presse rotative).
4. **Paramètres d'insolation :** Spectre de la source lumineuse (lampe aux halogénures métalliques, laser violet, etc.) et temps de pose optimal.
5. **Paramètres de traitement / développement :** Nature chimique du révélateur (aqueux, solvanté, alcalinité, pH, conditions de recyclage écologique).
6. **Capacité de rétention d'eau :** Mouillabilité du métal et stabilité du film d'eau minimal pour éviter le graissage sans émulsionner l'encre.
7. **Capacité de reproductibilité (Linéature de trame copiable) :** Aptitude à restituer les finesses de trame (trame standard 150/175 lpi vs trames fines de 300 lpi) et maintien des valeurs tonales de 1% à 99%.
8. **Conditions de conservation :** 
   - *Avant utilisation :* Durée de vie en stock, tolérance à l'obscurité, à la chaleur et à l'humidité relative.
   - *Après utilisation :* Possibilité de gommage, conservation à l'abri de l'oxydation pour réimpressions ultérieures.
9. **Prix de revient global :** Coût d'achat unitaire, coût de la chimie de traitement, réduction de la gâche papier au démarrage et vitesse d'équilibrage encre/eau.

---

## 3. Plan de Découpage Granulaire (22 Slides — 1 Sujet Majeur par Slide)

Pour obéir à la contrainte de clarté brutale, d'aération et d'absence de compactage, voici la séquence intégrale des 22 diapositives recommandées :

```
[Slide 01] Page de Garde : Production des Formes Imprimantes — Les Plaques Offset
[Slide 02] Sommaire Général : Les 6 Piliers Technologiques de la Plaque Offset
--- PART 1 : ORIGINE & PRINCIPE PLANOGRAPHIQUE ---
[Slide 03] 1.1 Genèse Historique : Aloys Senefelder & La Pierre de Bavière (1796)
[Slide 04] 1.2 Réaction Chimique Fondamentale : Calcaire, Acide Nitrique & Sel Hydrophile
[Slide 05] 1.3 Évolution Métallique : De la Pierre au Zinc (1860) puis à l'Aluminium
[Slide 06] 1.4 Principe Planographique : Antagonisme Eau / Corps Gras sur Surface Plane
--- PART 2 : SUPPORTS DES PLAQUES CONVENTIONNELLES ---
[Slide 07] 2.1 Les Plaques Monométalliques : Propriétés & Hégémonie de l'Aluminium
[Slide 08] 2.2 Les Plaques Polymétalliques : Endurance Extrême (1 à 2 Millions d'Exemplaires)
[Slide 09] 2.3 Architecture Comparée : Bimétalliques, Trimétalliques & Quadrimétalliques
--- PART 3 : TRAITEMENT DU SUPPORT & GRAINAGE ---
[Slide 10] 3.1 Rôle de la Rugosité : Plaque Lisse vs Plaque Grainée
[Slide 11] 3.2 Grainage Mécanique : Brossage Oscillant à Sec & Microcavités
[Slide 12] 3.3 Grainage Chimique à Brosse : Poudre de Ponce & Attaque Acide
--- PART 4 : ÉLECTROLYSE, ANODISATION & PLAQUES CHROMÉES ---
[Slide 13] 4.1 Grainage Électrochimique : Électrolyse en Bain Acide & Trames de 300 lpi
[Slide 14] 4.2 Anodisation de Surface : Couche Protectrice d'Alumine & Durcissement
[Slide 15] 4.3 Plaques Litho Chromées : Affinité Naturelle du Chrome & Supports Rigides
--- PART 5 : COUCHES PHOTOSENSIBLES ---
[Slide 16] 5.1 Couches Diazoïques : Molécules N2 & Décomposition UV (Montage Positif)
[Slide 17] 5.2 Couches Photopolymères : Réticulation Synthétique pour Rotatives (Montage Négatif)
[Slide 18] 5.3 Mécanismes Comparés : Double Cycle d'Insolation et de Développement
--- PART 6 : PLAQUES POSITIVES, NÉGATIVES & 9 CRITÈRES DE CHOIX ---
[Slide 19] 6.1 Les Plaques Positives : 80% du Marché Commercial & Critères de Qualité
[Slide 20] 6.2 Les Plaques Négatives : Presse Quotidienne, Journaux & Grands Tirages
[Slide 21] 6.3 Matrice Décisionnelle : Les 9 Critères Objectifs de Sélection
--- CLÔTURE TECHNIQUE ---
[Slide 22] Synthèse Industrielle : Équilibre des Formes Imprimantes & Clôture
```

---

## 4. Architecture des Visuels, Schémas & Placeholders

Chaque schéma dispose d'un conteneur dédié respectant le design brutaliste, avec fallback automatique pour parer à toute absence de fichier image :

| ID Schéma | Chemin d'Accès Attendu | Type de Visuel | Sujet Représenté | Spécification Technique & Légende |
|-----------|------------------------|----------------|------------------|------------------------------------|
| `SCH-01` | `assets/senefelder.jpg` | Gravure historique | Aloys Senefelder (1771-1834) | Portrait d'Aloys Senefelder, inventeur de la lithographie en 1796 sur pierre calcaire de Bavière. |
| `SCH-02` | `assets/schematic_reaction_pierre.svg` | Schéma vectoriel | Coupe micro-structure calcaire | Pénétration de la gomme et de l'acide nitrique formant un sel hydrophile, colmatage des pores par l'encre grasse. |
| `SCH-03` | `assets/schematic_principe_planographique.svg` | Schéma vectoriel | Coupe de la surface plane offset | Répulsion physique entre le film d'eau de mouillage (zone non-imprimante) et l'encre grasse (zone imprimante). |
| `SCH-04` | `assets/plaque_monometallique.png` | Rendu 3D / Isométrique | Coupe plaque monométallique | Couche sensible supérieure déposée directement sur feuille d'aluminium dépolie et anodisée. |
| `SCH-05` | `assets/plaque_bimetallique.png` | Rendu 3D / Isométrique | Coupe plaque bimétallique | Chrome supérieur (hydrophile) sur support laiton 70/30 (oléophile). |
| `SCH-06` | `assets/plaque_trimetallique.png` | Rendu 3D / Isométrique | Coupe plaque trimétallique | Chrome supérieur (hydrophile), couche intermédiaire de cuivre (oléophile) sur base acier/aluminium. |
| `SCH-07` | `assets/plaque_quadrimetallique.png` | Rendu 3D / Isométrique | Coupe plaque quadrimétallique | Chrome hydrophile + cuivre acide + cuivre basique sur base mécanique d'acier trempé. |
| `SCH-08` | `assets/schematic_rugosite_grainage.svg` | Schéma comparatif | Plaque lisse vs Plaque grainée | Profil de rugosité : crêtes et creux retenant le ménisque d'eau liquide sans ruissellement. |
| `SCH-09` | `assets/schematic_grainage_mecanique.svg` | Schéma technique | Brossage oscillant | Mouvement oscillant combiné des brosses abrasives éliminant l'alignement néfaste des micro-sillons. |
| `SCH-10` | `assets/schematic_grainage_chimique.svg` | Schéma de procédé | Brosses nylon et poudre de ponce | Projection de la barbotine abrasive acide créant des cavités d'ancrage pour tirages moyens. |
| `SCH-11` | `assets/schematic_electrolyse.svg` | Schéma industriel | Cuve d'électrograinage | Bain acide traversé par courant alternatif à haute fréquence, structure de microporosités de 4,5 à 10 µm. |
| `SCH-12` | `assets/schematic_anodisation.svg` | Schéma microstructural | Oxydation anodique de l'aluminium | Formation de la couche d'alumine $Al_2O_3$ dure, étanche et anti-corrosive. |
| `SCH-13` | `assets/schematic_plaque_chromee.svg` | Rendu schématique | Pellicule de chrome poli | Surface lisse et dense retenant 2× moins d'eau que l'aluminium, pour impression sur fer blanc et métaux. |
| `SCH-14` | `assets/schematic_insolation_positif.svg` | Schéma photochimique | Insolation couche Diazoïque | Film positif transparent dans les blancs : décomposition UV des molécules $N_2$ devenant solubles au lavage. |
| `SCH-15` | `assets/schematic_insolation_negatif.svg` | Schéma photochimique | Insolation Photopolymère | Film négatif transparent dans les traits : réticulation macromoléculaire rendant les graphismes insolubles. |
| `SCH-16` | `assets/diagram_marche_plaques.svg` | Graphique brutaliste | Répartition du marché | Jauge brutaliste contrastée : 80% Plaques Positives (Labeur/Édition) vs 20% Plaques Négatives (Rotatives Journaux). |
| `SCH-17` | `assets/matrix_9_criteres.svg` | Grille matricielle | Matrice d'évaluation technique | Tableau de bord synthétisant les 9 paramètres de sélection avec pondération atelier. |

---

## 5. Table de Correspondance & Éradication des Méta-Libellés

Voici la charte de conversion stricte pour purifier l'ensemble de la présentation :

| Libellé Ancien / Méta-Tag Bannis | Titre Technique Normalisé | Sous-Titre / Tag Métier |
|-----------------------------------|----------------------------|-------------------------|
| `PERSONNE 1 : ORIGINE ET PRINCIPE DE LA PLAQUE PAGE 19` | **I. Origine & Principe Planographique** | *Fondements Physico-Chimiques & Découverte de Senefelder* |
| `PERSONNE 2 : LES SUPPORTS DES PLAQUES CONVENTIONNELLES PAGE 19` | **II. Supports des Plaques Conventionnelles** | *Métallurgie Industrielle & Architecture Multicouche* |
| `PERSONNE 3 : TRAITEMENT DU SUPPORT ET GRAINAGE (1/2) PAGE 20` | **III. Traitement du Support & Grainage** | *Micro-Rugosité & Mouillabilité Superficielle* |
| `PERSONNE 4 : ÉLECTROLYSE, ANODISATION ET PLAQUES CHROMÉES PAGE 21` | **IV. Électrolyse, Anodisation & Plaques Chromées** | *Traitements Électrochimiques & Finition Haute Résistance* |
| `PERSONNE 5 : LES COUCHES PHOTOSENSIBLES PAGES 21-22` | **V. Couches Photosensibles** | *Photochimie Diazoïque & Réticulation Photopolymère* |
| `PERSONNE 6 : PLAQUES POSITIVES, NÉGATIVES ET CRITÈRES DE CHOIX PAGE 22` | **VI. Typologie Industrielle & Critères de Choix** | *Comparaison Marché (80/20) & Matrice Décisionnelle* |
| `Slide pour Personne 1` / `Page 19` | **Origine Lithographique** | *Genèse Historique (1796)* |
| `Slide pour Personne 2` / `Page 19` | **Architecture Métallique** | *Coupes structurales Bi, Tri & Quadrimétalliques* |
| `Slide pour Personne 3` / `Page 20` | **Rugosité & Brossage** | *Lois de la Mouillabilité Mécanique* |
| `Slide pour Personne 4` / `Page 21` | **Électrochimie Avancée** | *Anodisation & Dépôt de Chrome* |
| `Slide pour Personne 5` / `Page 21-22` | **Mécanismes Photochimiques** | *Insolation & Développement Positif / Négatif* |
| `Slide pour Personne 6` / `Page 22` | **Paramètres de Sélection** | *Matrice des 9 Critères d'Atelier* |

---

## 6. Spécifications pour les Développeurs et Intégrateurs

1. **Intégrité CSS (`style.css`) :**
   - Aucune dépendance externe (pas de Bootstrap, Tailwind, ou bibliothèques JS inutiles).
   - Utilisation des variables : `--color-bg: #FFFFFF;`, `--color-light: #F4F5F6;`, `--color-dark: #000000;`, `--color-accent: #E32619;`, `--font-main: 'Inter', sans-serif;`.
   - Typographie agressive et lisible, bordures nettes de 2px ou 3px noir massif, étiquettes en capitales avec espacement de lettres (`letter-spacing: 0.15em`).
2. **Synchronisation du Moteur (`script.js`) :**
   - Mise à jour du compteur odométrique : `#slideCounter` doit comporter 22 pas (`.counter-step`) de `01` à `22`, et le total affiché doit être `/ 22`.
   - La translation verticale du conteneur `#counterTrack` doit suivre : `translateY(calc(-1 * currentSlideIndex * 1.5em))` (ou la hauteur unitaire paramétrée).
3. **Contrôles de Navigation :**
   - Prise en charge sans faille des flèches gauche/droite, barre d'espace, et boutons tactiles/clics `.nav-btn`.
   - Boutons de fenêtrage Electron fonctionnels (`#electron-min`, `#electron-max`, `#electron-close`).
