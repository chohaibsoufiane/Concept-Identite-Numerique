import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the counter back to 07
content = content.replace('<div class="counter-step">08</div>', '')
content = content.replace('<div class="counter-total">/ 08</div>', '<div class="counter-total">/ 07</div>')

# 2. Extract and replace Slide 2 and Slide 3
slide_regex = re.compile(r'<!-- Slide 2: L\'Iceberg Title -->.*?</section>\s*<!-- Slide 3: L\'Iceberg Fullscreen Model -->.*?</section>', re.DOTALL)

merged_slide = '''<!-- Slide 2: L'Iceberg Title & Model (Morphing) -->
        <section class="slide" id="slide-2" style="background: #F4F5F6; overflow: hidden;">
            <style>
                /* Initial centered text */
                #s2-text-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    width: 100%;
                    transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
                    z-index: 10;
                }
                #s2-text-container h1 {
                    font-size: 8rem;
                    transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
                }
                
                /* Step 2: Left-aligned text */
                #slide-2.step-2 #s2-text-container {
                    left: 5vw;
                    top: 50%;
                    transform: translateY(-50%);
                    text-align: left;
                    width: 40vw;
                }
                #slide-2.step-2 #s2-text-container h1 {
                    font-size: 6rem;
                }

                /* Model Container */
                #s2-model-container {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 60vw;
                    height: 100vh;
                    transform: translateX(100vw);
                    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                    will-change: transform;
                }
                
                /* Step 2: Model slides in */
                #slide-2.step-2 #s2-model-container {
                    transform: translateX(0);
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
            </style>

            <!-- Morphing Text -->
            <div id="s2-text-container">
                <h1 class="huge-title" style="color: #000; font-weight: 900; letter-spacing: -0.02em;">L'ICEBERG</h1>
                <h2 class="subtitle" style="font-size: 1.8rem; color: #E32619; margin-top: 1rem; font-weight: 700;">Identité Déclarative, Agissante et Calculée</h2>
            </div>
            
            <!-- Sliding Model -->
            <div id="s2-model-container">
                <model-viewer id="iceberg-viewer" src="iceberg.glb" shadow-intensity="1" alt="3D model of an Iceberg" camera-orbit="-45deg 75deg 150%" interpolation-decay="200" interaction-prompt="none" loading="eager" reveal="auto">
                </model-viewer>
            </div>
            
            <script>
                // Intercept navigation to handle the morphing step natively
                let s2Step = 0;
                const slide2 = document.getElementById('slide-2');
                
                function handleS2Next(e) {
                    // slides array and currentSlide are global from script.js
                    if (window.slides && window.slides[window.currentSlide].id === 'slide-2') {
                        if (s2Step === 0) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            s2Step = 1;
                            slide2.classList.add('step-2');
                            
                            // Advance the counter visually for the user
                            const track = document.getElementById('counterTrack');
                            if(track) track.style.transform = `translateY(-${window.currentSlide * 2}rem)`;
                        }
                    }
                }
                
                function handleS2Prev(e) {
                    if (window.slides && window.slides[window.currentSlide].id === 'slide-2') {
                        if (s2Step === 1) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            s2Step = 0;
                            slide2.classList.remove('step-2');
                        }
                    }
                }

                // Attach capture-phase listeners to intercept before script.js
                document.getElementById('nextBtn').addEventListener('click', handleS2Next, true);
                document.getElementById('prevBtn').addEventListener('click', handleS2Prev, true);
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
                        handleS2Next(e);
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        handleS2Prev(e);
                    }
                }, true);
            </script>
        </section>'''

content = slide_regex.sub(merged_slide, content)

# 3. Shift slide IDs back (slide-4 becomes slide-3, etc.)
for i in range(4, 9):
    content = content.replace(f'id="slide-{i}"', f'id="slide-{i-1}"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
