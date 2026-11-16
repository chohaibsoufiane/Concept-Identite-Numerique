import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the counter (Total is now 06)
content = content.replace('<div class="counter-total">/ 07</div>', '<div class="counter-total">/ 06</div>')

# 2. Extract Slide 2 and Slide 3
s2_regex = re.compile(r'<!-- Slide 2: L\'Iceberg Title & Model \(Morphing\) -->.*?</section>', re.DOTALL)
s3_regex = re.compile(r'\s*<!-- Slide 3: La Génération des Traces -->\s*<section class="slide" id="slide-3">.*?</section>', re.DOTALL)

# 3. Create the new merged Slide 2 (with step-3)
merged_slide = '''<!-- Slide 2 & 3: L'Iceberg Morph & Traces -->
        <section class="slide" id="slide-2" style="background: #F4F5F6; overflow: hidden;">
            <style>
                /* Initial centered text */
                .s2-text {
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: max-content;
                    text-align: center;
                    transition: left 1.2s cubic-bezier(0.25, 1, 0.5, 1), 
                                top 1.2s cubic-bezier(0.25, 1, 0.5, 1),
                                transform 1.2s cubic-bezier(0.25, 1, 0.5, 1),
                                font-size 1.2s cubic-bezier(0.25, 1, 0.5, 1),
                                opacity 0.6s ease;
                    z-index: 10;
                    margin: 0;
                }
                
                #s2-title {
                    top: 45%;
                    font-size: 8rem;
                    color: #000;
                    font-weight: 900;
                    letter-spacing: -0.02em;
                }
                
                #s2-subtitle {
                    top: 55%;
                    font-size: 2rem;
                    color: #E32619;
                    font-weight: 700;
                }
                
                /* Step 2: Smoothly moved text */
                #slide-2.step-2 .s2-text, #slide-2.step-3 .s2-text {
                    left: 5vw;
                    transform: translate(0%, -50%);
                    text-align: left;
                }
                
                #slide-2.step-2 #s2-title, #slide-2.step-3 #s2-title {
                    top: 45%;
                    font-size: 5.5rem;
                }
                
                #slide-2.step-2 #s2-subtitle, #slide-2.step-3 #s2-subtitle {
                    top: 53%;
                    font-size: 1.5rem;
                }
                
                /* Step 3: Fade out title */
                #slide-2.step-3 .s2-text {
                    opacity: 0;
                    pointer-events: none;
                }

                /* Model Container */
                #s2-model-container {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 60vw;
                    height: 100vh;
                    transform: translateX(100vw);
                    transition: width 1.2s cubic-bezier(0.25, 1, 0.5, 1),
                                transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                    will-change: transform, width;
                    z-index: 5;
                }
                
                /* Step 2: Model slides in */
                #slide-2.step-2 #s2-model-container {
                    transform: translateX(0);
                    width: 60vw;
                }
                
                /* Step 3: Model moves to middle */
                #slide-2.step-3 #s2-model-container {
                    transform: translateX(0);
                    width: 100vw;
                }

                #iceberg-viewer {
                    width: 100%;
                    height: 100%;
                    --poster-color: transparent;
                    --progress-bar-height: 0px;
                    --progress-mask: transparent;
                    background: transparent;
                    border: none;
                    outline: none;
                }
                
                /* Traces Content for Step 3 */
                #s3-traces-content {
                    position: absolute;
                    bottom: 10vh;
                    left: 50%;
                    transform: translateX(-50%) translateY(20px);
                    width: 80vw;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    transition-delay: 0s;
                    z-index: 10;
                    pointer-events: none;
                    display: flex;
                    justify-content: space-between;
                    gap: 2rem;
                }
                
                #slide-2.step-3 #s3-traces-content {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(-50%) translateY(0);
                    transition-delay: 0.6s; /* Wait for iceberg to center */
                    pointer-events: auto;
                }
                
                .s3-card {
                    background: rgba(255, 255, 255, 0.9);
                    padding: 2rem;
                    border: 4px solid #000;
                    box-shadow: 8px 8px 0px #000;
                    flex: 1;
                }
            </style>

            <!-- Morphing Text (Step 1 -> 2) -->
            <h1 id="s2-title" class="s2-text huge-title">L'ICEBERG</h1>
            <h2 id="s2-subtitle" class="s2-text subtitle">Identité Déclarative, Agissante et Calculée</h2>
            
            <!-- Sliding Model -->
            <div id="s2-model-container">
                <!-- Initial camera orbit is -90deg so it has room to pan -->
                <model-viewer id="iceberg-viewer" src="iceberg.glb" shadow-intensity="1" alt="3D model of an Iceberg" camera-orbit="-90deg 75deg 150%" camera-target="auto auto auto" interpolation-decay="200" interaction-prompt="none" loading="eager" reveal="auto">
                </model-viewer>
            </div>
            
            <!-- Traces Content (Step 3) -->
            <div id="s3-traces-content">
                <div class="s3-card">
                    <h2 class="slide-title" style="font-size: 2.5rem; margin-bottom: 1rem;">La Génération des Traces (Mécanique)</h2>
                    <p class="large-text" style="color: #333;">Des particules lumineuses (photos, textes, likes) d'un côté, et un réseau de métadonnées (ombre) de l'autre.</p>
                </div>
                <div class="s3-card" style="background: #000; color: #fff; border-color: #E32619; box-shadow: 8px 8px 0px #E32619;">
                    <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #E32619;">Avatar et Particules</div>
                    <ul class="bullet-list" style="padding-left: 1.5rem;">
                        <li><strong>Traces Actives</strong> (Volontaires)</li>
                        <li><strong>Traces Passives</strong> (Invisibles - IP, Appareil)</li>
                    </ul>
                </div>
            </div>
            
            <script>
                // Intercept navigation to handle the morphing step natively
                let s2Step = 0;
                const slide2 = document.getElementById('slide-2');
                const s2Viewer = document.getElementById('iceberg-viewer');
                
                function handleS2Next(e) {
                    if (slide2.classList.contains('active')) {
                        if (s2Step === 0) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            s2Step = 1;
                            slide2.classList.add('step-2');
                            
                            // Advance the counter visually for the user (index 2 * 3.5rem)
                            const track = document.getElementById('counterTrack');
                            if(track) track.style.transform = `translateY(-7rem)`; 
                            
                            // Trigger slight pan to show 3D volume
                            setTimeout(() => {
                                if(s2Viewer) s2Viewer.cameraOrbit = "-45deg 75deg 150%";
                            }, 50);
                        } else if (s2Step === 1) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            s2Step = 2;
                            slide2.classList.remove('step-2');
                            slide2.classList.add('step-3');
                            
                            // Advance counter to step 3 (index 3 * 3.5rem)
                            const track = document.getElementById('counterTrack');
                            if(track) track.style.transform = `translateY(-10.5rem)`; 
                            
                            // Trigger the massive turn and zoom to the top point!
                            // Turning counter-clockwise (-45deg to 135deg is 180deg turn)
                            setTimeout(() => {
                                if(s2Viewer) {
                                    s2Viewer.cameraTarget = "0m 0.7m 0m";
                                    s2Viewer.cameraOrbit = "135deg 75deg 60%";
                                }
                            }, 50);
                        }
                    }
                }
                
                function handleS2Prev(e) {
                    if (slide2.classList.contains('active')) {
                        if (s2Step === 1) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            s2Step = 0;
                            slide2.classList.remove('step-2');
                            
                            // Revert counter visually (index 1 * 3.5rem)
                            const track = document.getElementById('counterTrack');
                            if(track) track.style.transform = `translateY(-3.5rem)`; 
                            
                            // Revert pan
                            if(s2Viewer) {
                                s2Viewer.cameraTarget = "auto auto auto";
                                s2Viewer.cameraOrbit = "-90deg 75deg 150%";
                            }
                        } else if (s2Step === 2) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            s2Step = 1;
                            slide2.classList.remove('step-3');
                            slide2.classList.add('step-2');
                            
                            // Revert counter visually
                            const track = document.getElementById('counterTrack');
                            if(track) track.style.transform = `translateY(-7rem)`; 
                            
                            // Revert camera to step 2 position
                            if(s2Viewer) {
                                s2Viewer.cameraTarget = "auto auto auto";
                                s2Viewer.cameraOrbit = "-45deg 75deg 150%";
                            }
                        }
                    }
                }

                // Attach capture-phase listeners to intercept before script.js
                document.addEventListener('DOMContentLoaded', () => {
                    const nextBtn = document.getElementById('nextBtn');
                    const prevBtn = document.getElementById('prevBtn');
                    
                    if (nextBtn) nextBtn.addEventListener('click', handleS2Next, true);
                    if (prevBtn) prevBtn.addEventListener('click', handleS2Prev, true);
                    
                    document.addEventListener('keydown', (e) => {
                        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
                            handleS2Next(e);
                        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                            handleS2Prev(e);
                        }
                    }, true);
                });
            </script>
        </section>'''

# Replace slide 2
content = s2_regex.sub(merged_slide, content)

# Remove slide 3
content = s3_regex.sub('', content)

# Shift slide IDs back (slide-4 becomes slide-3, etc.)
for i in range(4, 9):
    content = content.replace(f'id="slide-{i}"', f'id="slide-{i-1}"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
