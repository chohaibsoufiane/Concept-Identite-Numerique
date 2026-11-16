import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Restore the CSS
old_css_pattern = r'/\* --- RADIAL BURST CSS \(STEP 3\) --- \*/.*?</style>'

restored_css = '''/* Step 3 Overlay (Text and SVG Line) */
                #s3-overlay {
                    position: absolute;
                    top: 0; left: 0; width: 100vw; height: 100vh;
                    opacity: 0; visibility: hidden;
                    transition: opacity 0s 0s, visibility 0s 0s;
                    z-index: 10; pointer-events: none;
                }
                
                #slide-2.step-3 #s3-overlay {
                    opacity: 1; visibility: visible;
                    transition: opacity 0s 0.8s, visibility 0s 0.8s;
                }
                
                .snake-line {
                    stroke-dasharray: var(--path-len, 1000);
                    stroke-dashoffset: var(--path-len, 1000);
                    transition: stroke-dashoffset 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0s;
                }
                
                #slide-2.step-3 .snake-line {
                    stroke-dashoffset: 0;
                    transition-delay: 0.9s;
                }
                
                .snake-dot {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0) !important;
                    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s;
                }
                
                #slide-2.step-3 .snake-dot {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1) !important;
                    transition-delay: 0.8s;
                }
                
                .s3-text-content {
                    position: absolute;
                    top: 13vh;
                    left: 5vw;
                    pointer-events: auto;
                    display: flex;
                    flex-direction: column;
                }
                
                .s3-title-group {
                    position: relative;
                    margin-bottom: 1.5rem;
                    white-space: nowrap; /* Force the title onto one single line */
                    opacity: 0;
                    transform: translateX(-15px);
                    filter: blur(4px);
                    transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.21, 1.02, 0.73, 1), filter 0.6s ease;
                }
                
                #slide-2.step-3 .s3-title-group {
                    opacity: 1;
                    transform: translateX(0);
                    filter: blur(0);
                    transition-delay: 1.3s;
                }
                
                .s3-bullets-container {
                    position: relative;
                    width: 40vw;
                }
                
                .s3-bullet {
                    opacity: 0;
                    transform: translateX(-20px);
                    transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.21, 1.02, 0.73, 1);
                    font-size: 1.5rem;
                    border-left: 4px solid #00A8FF;
                    padding-left: 1rem;
                }
                
                #slide-2.step-3 .s3-bullet-1 { opacity: 1; transform: translateX(0); transition-delay: 1.6s; }
                #slide-2.step-3 .s3-bullet-2 { opacity: 1; transform: translateX(0); transition-delay: 1.75s; }
                #slide-2.step-3 .s3-bullet-3 { opacity: 1; transform: translateX(0); transition-delay: 1.9s; }
                #slide-2.step-3 .s3-bullet-4 { opacity: 1; transform: translateX(0); transition-delay: 2.05s; }

                .s3-horizontal-container {
                    position: absolute;
                    bottom: 8vh; 
                    left: 5vw;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: max-content;
                    gap: 3rem; 
                    z-index: 10;
                    padding: 1.5rem 3rem;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 1);
                    border-radius: 100px;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05), 0 5px 15px rgba(0, 0, 0, 0.03);
                    opacity: 0;
                    transform: translateY(40px);
                    transition: opacity 0.8s ease, transform 1s cubic-bezier(0.21, 1.02, 0.73, 1);
                    transition-delay: 1.2s;
                }
                
                #slide-2.step-3 .s3-horizontal-container {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .h-bullet {
                    opacity: 0;
                    transition: opacity 0.6s ease;
                    width: 70px;
                    height: 70px;
                }
                
                .h-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: #00A8FF;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    transform: scale(0);
                    transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 10px 25px rgba(0, 168, 255, 0.3);
                }
                
                .h-icon svg {
                    width: 32px;
                    height: 32px;
                    stroke-width: 2px;
                }
                
                #slide-2.step-3 .h-bullet-1 { opacity: 1; transition-delay: 1.6s; }
                #slide-2.step-3 .h-bullet-1 .h-icon { transform: scale(1); transition-delay: 1.7s; }
                
                #slide-2.step-3 .h-bullet-2 { opacity: 1; transition-delay: 1.75s; }
                #slide-2.step-3 .h-bullet-2 .h-icon { transform: scale(1); transition-delay: 1.85s; }
                
                #slide-2.step-3 .h-bullet-3 { opacity: 1; transition-delay: 1.9s; }
                #slide-2.step-3 .h-bullet-3 .h-icon { transform: scale(1); transition-delay: 2.0s; }
                
                #slide-2.step-3 .h-bullet-4 { opacity: 1; transition-delay: 2.05s; }
                #slide-2.step-3 .h-bullet-4 .h-icon { transform: scale(1); transition-delay: 2.15s; }
            </style>'''

html = re.sub(old_css_pattern, restored_css, html, flags=re.DOTALL)

# 2. Restore the HTML
old_html_pattern = r'<!-- Radial Burst \(Step 3\) -->.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>'

restored_html = '''<!-- Step 3 Overlay (Documentary Snake Line & Text) -->
            <div id="s3-overlay">
                <svg width="100%" height="100%" style="position: absolute; top: 0; left: 0; pointer-events: none;" preserveAspectRatio="none">
                    <path class="snake-line" id="s3-path" fill="none" stroke="#00A8FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                
                <script>
                    function updateSnake() {
                        const path = document.getElementById('s3-path');
                        if (!path) return;
                        
                        const w = window.innerWidth;
                        const h = window.innerHeight;
                        
                        const p1x = w * 0.71; 
                        const p1y = h * 0.23;
                        
                        const p2x = w * 0.55;
                        const p2y = h * 0.18;
                        
                        const p3x = w * 0.05;
                        const p3y = h * 0.18;
                        
                        const d = M   Q    ;
                        path.setAttribute('d', d);
                        
                        const length = path.getTotalLength();
                        path.style.setProperty('--path-len', length);
                    }
                    window.addEventListener('resize', updateSnake);
                    updateSnake();
                </script>
                
                <!-- Perfect circle dot at the tip -->
                <div class="snake-dot" style="position: absolute; left: 71vw; top: 23vh; width: 10px; height: 10px; background: #00A8FF; border-radius: 50%; transform: translate(-50%, -50%) scale(0); z-index: 2; "></div>
                
                <!-- Text Block -->
                <div class="s3-text-content">
                    <div class="s3-title-group">
                        <h2 class="slide-title" style="font-size: 3rem; margin-bottom: 0.5rem;">L'Identite Declarative</h2>
                    </div>
                    <div class="s3-bullets-container">
                        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
                            <div class="s3-bullet s3-bullet-1">
                                <strong>Avatar Public</strong> <span style="opacity: 0.6; font-weight: 400;">(Profils sociaux)</span>
                            </div>
                            <div class="s3-bullet s3-bullet-2">
                                <strong>Traces Actives</strong> <span style="opacity: 0.6; font-weight: 400;">(Publications)</span>
                            </div>
                            <div class="s3-bullet s3-bullet-3">
                                <strong>Traces Passives</strong> <span style="opacity: 0.6; font-weight: 400;">(Invisibles - IP)</span>
                            </div>
                            <div class="s3-bullet s3-bullet-4">
                                <strong>Generation Mecanique</strong> <span style="opacity: 0.6; font-weight: 400;">(Likes)</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="s3-horizontal-container">
                        <!-- Icon 1: User -->
                        <div class="h-bullet h-bullet-1">
                            <div class="h-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                        </div>
                        
                        <!-- Icon 2: Pen/Edit -->
                        <div class="h-bullet h-bullet-2">
                            <div class="h-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </div>
                        </div>
                        
                        <!-- Icon 3: Invisible/Eye Off -->
                        <div class="h-bullet h-bullet-3">
                            <div class="h-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            </div>
                        </div>
                        
                        <!-- Icon 4: Like/Heart -->
                        <div class="h-bullet h-bullet-4">
                            <div class="h-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            </div>
                        </div>
                </div>
            </div>'''

html = re.sub(old_html_pattern, restored_html, html, flags=re.DOTALL)

# 3. Restore the Camera Coordinates
html = re.sub(
    r's2Viewer\.cameraTarget = "0\.77271593980757m 0\.5462645244482018m 0\.016798734138134607m";',
    's2Viewer.cameraTarget = "0.36945186932407825m 0.2798089986348628m 0.7487632920539601m";',
    html
)
html = re.sub(
    r's2Viewer\.cameraOrbit = "-4\.651505401826784rad 1\.5220894639485403rad 2\.846136024189334m";',
    's2Viewer.cameraOrbit = "-4.426236161162396rad 1.4672942432463922rad 3.3600154377893885m";',
    html
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
