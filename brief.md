# Identité numérique — brief pour Antigravity

## Commandes `/` : rappel au démarrage

Avant de commencer, rappeler à l’utilisateur d’ouvrir le menu `/` d’Antigravity et d’ajouter les workflows disponibles pour **la planification**, **l’orchestration d’une équipe** et, si nécessaire, **le pilotage du navigateur**. Lire les définitions des workflows locaux s’ils existent. Citer uniquement leurs noms exacts vérifiés ; ne pas inventer des commandes comme `/plan` ou `/team`. Si la liste est inaccessible, demander à l’utilisateur de coller les entrées du menu `/` pour identifier les bonnes commandes. La lecture du projet et la préparation peuvent avancer pendant ce temps. Ne pas prétendre qu’écrire une commande dans un document l’active.

## Objectif

Réorganiser la présentation autour d’une histoire commune, avec peu de texte et des mockups utiles. Respecter l’ordre ci-dessous. **Aucun nombre d’écrans imposé : une partie peut se développer sur plusieurs vues, et plusieurs personnes peuvent intervenir sur le même support.** Ce brief décrit les idées et les relais ; les textes à réciter seront préparés séparément.

## Méthode obligatoire : plan complet, puis réalisation en équipe

**Avant toute modification de la présentation ou création de visuels, constituer une équipe d’agents et produire un plan complet.** La première phase de l’équipe se limite à la lecture du projet et à la préparation. Enregistrer le plan dans `PLAN_EXECUTION_ANTIGRAVITY.md` et le présenter à l’utilisateur avant de commencer la réalisation.

Le plan doit préciser : l’ordre des interventions et leurs transitions, les contenus à déplacer/conserver/raccourcir, les fichiers concernés, les étapes de l’iceberg et de la navigation, les rares emplacements de mockups retenus et leur utilité, puis l’ordre des travaux et leur attribution.

Répartir l’équipe entre **structure et contenu**, **iceberg et navigation**, et **mise en page et emplacements de visuels**. Un coordinateur rassemble le plan et intègre les changements ; attribuer clairement les zones de travail pour éviter des modifications concurrentes dans `index.html`. Si les outils ne permettent pas de lancer une équipe, le signaler sans prétendre l’avoir créée.

## Ordre de passage et liens

1. **BADAOUI — L’histoire commence.** Présenter un étudiant fictif et son profil en ligne. Il veut donner une bonne image de lui. Badaoui raconte avec ses mots et pose une question au public. L’histoire reste ouverte : que voit-on réellement de cet étudiant ?
2. **MHAITATE — Ce qu’il montre.** Décrire simplement sa photo, sa bio et ses publications choisies. Prévoir des phrases courtes, faciles à lire. Relais : son profil ne contient pas tout ce qu’il fait.
3. **MEKKAOUI — Ce qu’il fait et laisse derrière lui.** Montrer quelques activités du même personnage : commentaires, mentions J’aime, recherches ou consultations. Distinguer les traces publiques des données accessibles à la plateforme. Il explique en arabe et lit **au moins un paragraphe en français**. Relais : ces éléments forment quelque chose de plus grand que le profil visible.
4. **VOUS / PRÉSENTATEUR PRINCIPAL — L’iceberg, puis l’e-réputation.** Rassembler les exemples précédents dans les identités déclarative, agissante et calculée. Garder de la place pour développer librement. Passer ensuite à la question : quelle image les autres construisent-ils à partir de ce qu’ils peuvent voir ?
5. **RAYANE — L’image perçue.** Prévoir un paragraphe français préparé, fluide à lire, sur l’écart entre l’image souhaitée et l’image retenue par les autres. Le mockup apporte l’exemple concret. Relais : revenir à ce qui arrive au personnage.
6. **BADAOUI — L’histoire se développe.** Reprendre exactement le même étudiant : une ancienne publication ressort et change une première impression. Faire réfléchir le public, expliquer les conséquences et les choix possibles. Cette intervention doit lui permettre de comprendre et d’expliquer, pas seulement de lire. Relais : comment éviter d’aggraver la situation et protéger son compte ?
7. **BOUAZIZI — Une intervention courte et cadrée.** Prévoir **un paragraphe moyen** sur un faux message qui cherche à voler les accès, puis **un court passage** sur la double authentification. Les deux textes seront fournis par le présentateur principal et lus exactement, sans improvisation. Début, changement de support et fin à son signal. Ne pas ajouter d’autres sujets à Bouazizi.
8. **MHAITATE — Le bilan pratique.** Quelques conseils très simples : réfléchir avant de publier, régler la confidentialité, sécuriser ses accès. Relais vers l’idée finale.
9. **VOUS — La conclusion.** Revenir au personnage et à l’iceberg : notre identité numérique dépasse ce que nous choisissons d’afficher. Prévoir éventuellement une conclusion poétique arabe rimée ; **le poème reste à choisir**.

## Adapter l’iceberg existant

Conserver `iceberg.glb`, le modèle interactif et les mouvements de caméra. Faire de l’iceberg une synthèse progressive de l’histoire :

- **Vue d’ensemble :** retrouver le profil du personnage au sommet, puis découvrir la partie immergée.
- **Déclarative :** réutiliser sa photo, sa bio et une publication choisie, déjà présentées par Mhaitate.
- **Agissante :** retrouver les actions montrées par Mekkaoui. Éviter une seconde longue explication identique.
- **Calculée :** montrer comment la plateforme peut déduire des centres d’intérêt à partir de ces actions. Afficher « déduction possible », car une inférence peut être fausse.
- **Sortie :** relier les traces accessibles aux autres à l’image qu’ils se font du personnage, puis donner la parole à Rayane.

L’iceberg est une métaphore : ne pas laisser croire que toute action est cachée, que toute donnée déclarée est publique ou qu’un recruteur voit les données internes d’une plateforme. Distinguer **profil calculé par une plateforme** et **réputation auprès des personnes**.

## Mockups : réserver quelques emplacements, sans en mettre partout

**Par défaut, créer uniquement des emplacements réservés. Ne pas fabriquer les mockups soi-même en HTML/CSS, par dessin ou par génération d’images.** Chaque emplacement doit être facile à remplacer par un visuel fourni ensuite, avec un format adapté, un libellé discret et une courte description du contenu attendu.

**Alternative autorisée pour une conversation Instagram :** utiliser le [générateur Instagram DM de 10015.io](https://10015.io/tools/instagram-dm-generator), via Chrome avec débogage distant ou un autre outil de pilotage du navigateur disponible. Inspecter les possibilités réelles du site avant de l’utiliser. Si le site est inaccessible ou ne permet pas le visuel voulu, conserver l’emplacement réservé. Cette alternative n’autorise pas à fabriquer soi-même d’autres interfaces.

Les idées suivantes sont des **possibilités à sélectionner dans le plan, pas une liste de mockups à produire systématiquement** :

- **Profil du personnage :** un emplacement au début, réutilisable pendant l’explication de Mhaitate.
- **Image perçue :** un emplacement pour une ancienne publication ou un regard extérieur, seulement si cela aide le passage de Rayane et le retour de Badaoui.
- **Message suspect :** un emplacement pour Bouazizi ; c’est le candidat adapté au générateur de conversations Instagram.

Réutiliser le même étudiant fictif, par exemple **Sami** (nom proposé, modifiable). Privilégier la réutilisation d’un visuel à l’ajout de nouveaux mockups. **Aucun mockup obligatoire par personne, par partie ou par niveau de l’iceberg.** Garder l’iceberg comme visuel principal de son passage ; de courts exemples et mots-clés suffisent pour les traces, les déductions et les conseils de sécurité. Aucun score universel d’e-réputation inventé.

Marquer les exemples comme fictifs. Garder les longs paragraphes dans les notes de préparation ; à l’écran, privilégier exemples, mots-clés et détails révélés au clic.

## Repères dans le projet et déplacements

- `index.html` : conserver l’ouverture `slide-1`, raccourcir et adapter `slide-sommaire`, puis installer l’histoire, le profil et les activités **avant l’iceberg**.
- `slide-2` contient l’iceberg, son CSS et sa logique intégrée. Adapter `s3-overlay` (déclarative), `s4-overlay` (agissante), `s5-overlay` (calculée), ainsi que `s2Step`, `handleS2Next` et `handleS2Prev`.
- `slide-3` : prévoir un emplacement de visuel d’e-réputation si retenu dans le plan, selon les règles ci-dessus. Remplacer le « Score d’e-réputation » et clarifier l’actuelle « Face B / Shadow Profile » avec une publication réellement accessible dans le scénario.
- `slide-4` : réutiliser les menaces pour le passage de Bouazizi. `slide-6` : séparer le court passage sur la 2FA, le bilan de Mhaitate et la conclusion du présentateur principal.
- `slide-5` (économie et lois) : si conservé, intégrer son idée utile dans le développement du présentateur principal, avant Rayane. Ne pas en faire un nouveau passage qui casse l’ordre. Vérifier toute affirmation juridique avant d’en ajouter.
- `script.js` gère la navigation générale ; `style.css` le style partagé. Préserver l’identité visuelle actuelle : la demande noir et blanc / Helvetica concernait le document de préparation.

**Navigation :** le présentateur principal garde la main. Aucun passage automatique entre intervenants. Harmoniser les étapes internes de l’iceberg avec la navigation générale, les retours arrière et les décalages actuellement codés en dur pour `counterTrack`. Masquer `dev-copy-cam` hors mode édition. Les changements d’intervenant doivent fonctionner indépendamment du nombre de vues.
