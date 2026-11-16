import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the counter
content = content.replace('<div class="counter-step">07</div>', '<div class="counter-step">07</div>\n                <div class="counter-step">08</div>')
content = content.replace('<div class="counter-total">/ 07</div>', '<div class="counter-total">/ 08</div>')

# 2. Shift all slides from slide-7 down to slide-3
for i in range(7, 2, -1):
    content = content.replace(f'id="slide-{i}"', f'id="slide-{i+1}"')

# 3. We need to replace the old slide-2 (which contains the split screen and model viewer) with TWO slides:
# - New Slide 2: Just the title
# - New Slide 3: Fullscreen model viewer arising from bottom

old_slide_2_regex = re.compile(r'<!-- Slide 2: L\'Iceberg -->.*?</section>', re.DOTALL)

new_slides = '''<!-- Slide 2: L'Iceberg Title -->
        <section class="slide" id="slide-2">
            <div class="grid grid-center bg-light text-dark">
                <div class="content-wrapper-center text-center">
                    <h1 class="huge-title" style="font-size: 8rem; color: #000; font-weight: 900; letter-spacing: -0.02em;">L'ICEBERG</h1>
                    <h2 class="subtitle" style="font-size: 2rem; color: #E32619; margin-top: 1rem; font-weight: 700;">Identité Déclarative, Agissante et Calculée</h2>
                </div>
            </div>
        </section>

        <!-- Slide 3: L'Iceberg Fullscreen Model -->
        <section class="slide" id="slide-3" style="background: #F4F5F6; overflow: hidden; position: relative;">
            <style>
                .slide.active #iceberg-viewer {
                    animation: ariseFromBottom 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                #iceberg-viewer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    --poster-color: transparent;
                    transform: translateY(100vh); /* Start below screen */
                }
                @keyframes ariseFromBottom {
                    0% { transform: translateY(100vh); }
                    100% { transform: translateY(0); }
                }
            </style>
            <model-viewer id="iceberg-viewer" src="iceberg.glb" auto-rotate camera-controls shadow-intensity="1" alt="3D model of an Iceberg" camera-orbit="0deg 75deg 150%" interpolation-decay="200">
            </model-viewer>
        </section>'''

content = old_slide_2_regex.sub(new_slides, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
