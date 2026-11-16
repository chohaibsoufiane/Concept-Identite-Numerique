import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace from Dev Button up to (but not including) the Intercept navigation script
pattern = r'<!-- Dev Button to copy camera position -->.*?(?=<script>\s*// Intercept navigation)'

restored_html = '''<!-- Dev Button to copy camera position -->
            <button id="dev-copy-cam" style="position: absolute; top: 20px; left: 20px; z-index: 100; padding: 10px 20px; background: #E32619; color: #fff; font-weight: bold; border: none; cursor: pointer;">
                Copy Camera Position
            </button>
            
            <script>
                // Dev tool
                document.getElementById('dev-copy-cam').addEventListener('click', (e) => {
                    const viewer = document.getElementById('iceberg-viewer');
                    if (viewer && typeof viewer.getCameraOrbit === 'function') {
                        const orbit = viewer.getCameraOrbit();
                        const target = viewer.getCameraTarget();
                        const pos = camera-orbit="rad rad m" camera-target="m m m";
                        navigator.clipboard.writeText(pos).then(() => {
                            alert("Copied to clipboard: \\n" + pos);
                        });
                    } else {
                        const pos = camera-orbit="" camera-target="";
                        navigator.clipboard.writeText(pos).then(() => {
                            alert("Fallback copied: \\n" + pos);
                        });
                    }
                    e.stopImmediatePropagation();
                });
            </script>
            
            <!-- Step 3 Overlay (Documentary Snake Line & Text) -->
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
            </div>
            
'''

html = re.sub(pattern, restored_html, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
