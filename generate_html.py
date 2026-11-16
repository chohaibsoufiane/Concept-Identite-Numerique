import os

html_content = """<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Concept d'Identité Numérique</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
</head>
<body>
    <div class="presentation-container">
        <!-- Electron Window Controls -->
        <div class="electron-window-controls">
            <button id="electron-min" class="electron-btn" aria-label="Minimize">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <button id="electron-max" class="electron-btn" aria-label="Maximize">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="5" width="14" height="14" rx="2" ry="2"/></svg>
            </button>
            <button id="electron-close" class="electron-btn" aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>

        <!-- Brutalist Odometer Progress -->
        <div class="brutalist-counter" id="slideCounter">
            <div class="counter-track" id="counterTrack">
                <div class="counter-step">01</div>
                <div class="counter-step">02</div>
                <div class="counter-step">03</div>
                <div class="counter-step">04</div>
                <div class="counter-step">05</div>
                <div class="counter-step">06</div>
                <div class="counter-step">07</div>
            </div>
            <div class="counter-total">/ 07</div>
        </div>

        <!-- Slide 1: Team Intro -->
        <section class="slide active" id="slide-1">
            <div class="grid grid-center bg-dark text-light overflow-visible">
                <div class="halftone-bg"></div>
                <div class="content-wrapper-center z-index-10 text-center">
                    <div class="cmyk-press-container">
                        <h1 class="press-title screen-cyan" aria-hidden="true">INFO208</h1>
                        <h1 class="press-title screen-magenta" aria-hidden="true">INFO208</h1>
                        <h1 class="press-title screen-yellow" aria-hidden="true">INFO208</h1>
                        <h1 class="press-title screen-white">INFO208</h1>
                    </div>
                    <div style="margin-top: 2rem;">
                        <p class="subtitle" style="font-size: 1.5rem; line-height: 1.8;">
                            MOHAMMED BADAOUI - MEHDI EL BOUAZIZI - YOUSSEF EL MEKKAOUI<br>
                            CHOHAIB SOUFIANE - RAYANE EL MAKHLOUFI - MHAITATE AYMEN
                        </p>
                    </div>
                    <div class="start-prompt-track" onclick="document.getElementById('nextBtn').click();">
                        <div class="start-arrow-slider">
                            <span class="slider-text">Appuyez pour démarrer</span>
                            <svg class="slider-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 2: L'Iceberg -->
        <section class="slide" id="slide-2">
            <div class="grid grid-title">
                <div class="slide-content">
                    <div class="bg-motif bg-motif-top-right">
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><circle cx="50" cy="50" r="30"/></svg>
                    </div>
                    <div class="presenter-tag">Introduction</div>
                    <h1 class="huge-title">L'Iceberg</h1>
                    <h2 class="subtitle">Identité Déclarative, Agissante et Calculée</h2>
                </div>
                <div class="slide-visual bg-accent text-light">
                    <div class="visual-placeholder">L'Iceberg vu de loin<br>(Partie visible vs immergée)</div>
                    <ul class="bullet-list" style="margin-top: 2rem; padding-left: 2rem;">
                        <li><strong>Surface :</strong> Identité Déclarative (Réseaux, Bio, Noms)</li>
                        <li><strong>Flottaison :</strong> Identité Agissante (Historique, Achats, GPS)</li>
                        <li><strong>Profondeur :</strong> Identité Calculée (Algorithmes, Ciblage)</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Slide 3: La Génération des Traces -->
        <section class="slide" id="slide-3">
            <div class="grid grid-split-right">
                <div class="slide-visual bg-light text-dark">
                    <div class="visual-placeholder">Avatar et Particules</div>
                    <ul class="bullet-list" style="margin-top: 2rem; padding-left: 2rem;">
                        <li>Traces Actives (Volontaires)</li>
                        <li>Traces Passives (Invisibles - IP, Appareil)</li>
                    </ul>
                </div>
                <div class="slide-content bg-dark text-light">
                    <h2 class="slide-title">La Génération des Traces (Mécanique)</h2>
                    <p class="large-text">Des particules lumineuses (photos, textes, likes) d'un côté, et un réseau de métadonnées (ombre) de l'autre.</p>
                </div>
            </div>
        </section>

        <!-- Slide 4: Le Miroir de l'E-Réputation -->
        <section class="slide" id="slide-4">
            <div class="grid grid-vertical bg-light">
                <div class="slide-header-full">
                    <h2 class="slide-title text-center">Le Miroir de l'E-Réputation (Impact Réel)</h2>
                </div>
                <div class="comparison-table flexo-3way-table">
                    <div class="comp-col border-right">
                        <h3 class="comp-title">Face A (Visible)</h3>
                        <p>Le profil professionnel ultra-propre (style LinkedIn).</p>
                        <p><em>Ce que vous pensez que le recruteur voit.</em></p>
                    </div>
                    <div class="comp-col border-right">
                        <h3 class="comp-title" style="color: #666;">Face B (Cachée)</h3>
                        <p>Le Shadow Profile.</p>
                        <p><em>Un collage chaotique (forums, photos oubliées, etc).</em></p>
                    </div>
                    <div class="comp-col">
                        <h3 class="comp-title" style="color: #000;">Analyse</h3>
                        <p>Balayage laser générant un "Score d'e-réputation".</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 5: La Faille -->
        <section class="slide" id="slide-5">
            <div class="grid grid-title bg-accent text-light">
                <div class="slide-content">
                    <h1 class="huge-title">La Faille</h1>
                    <h2 class="subtitle">Cybersécurité & Menaces</h2>
                </div>
                <div class="slide-visual bg-dark text-light">
                    <div class="visual-placeholder">Cadenas fissuré & Phishing</div>
                    <ul class="bullet-list" style="margin-top: 2rem; padding-left: 2rem;">
                        <li>Ingénierie Sociale (Faux pop-up)</li>
                        <li>Usurpation d'identité</li>
                        <li>Fuite de données (Data Leak)</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Slide 6: La Machine à Données -->
        <section class="slide" id="slide-6">
            <div class="grid grid-split">
                <div class="slide-content bg-light text-dark">
                    <h2 class="slide-title">La Machine à Données (Économie & Lois)</h2>
                    <ul class="bullet-list">
                        <li><strong>Tapis roulant :</strong> Les données tombent dessus.</li>
                        <li><strong>Transformation :</strong> Données → Pièces d'or.</li>
                        <li><strong>Régulation :</strong> Le tampon RGPD / CNDP s'écrase pour protéger les données.</li>
                    </ul>
                </div>
                <div class="slide-visual bg-dark text-light" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                    <div class="visual-placeholder" style="border-color: rgba(255,255,255,0.2);">
                        <h2>"Si c'est gratuit,<br>c'est vous le produit."</h2>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 7: Le Panneau de Contrôle -->
        <section class="slide" id="slide-7">
            <div class="grid grid-center bg-dark text-light">
                <div class="content-wrapper-center">
                    <h2 class="slide-title huge-title">Solutions & Conclusion</h2>
                    <ul class="bullet-list large-text border-left-accent">
                        <li><strong>Hygiène Numérique :</strong> Basculer les curseurs au vert (Cookies, Localisation).</li>
                        <li><strong>Double Authentification :</strong> Verrouillage 2FA pour la sécurité.</li>
                        <li><strong>Reprise de contrôle :</strong> Nettoyage des traces et protection active.</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Navigation Controls -->
        <nav class="presentation-nav">
            <button id="prevBtn" class="nav-btn" aria-label="Previous slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button id="nextBtn" class="nav-btn" aria-label="Next slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
        </nav>
    </div>

    <!-- Cinematic Video Fullscreen Overlay (if any needed by scripts) -->
    <div class="video-fullscreen-backdrop" id="videoBackdrop"></div>
    <button class="video-close-btn" id="videoCloseBtn" aria-label="Close video">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>

    <script src="script.js"></script>
</body>
</html>"""

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
